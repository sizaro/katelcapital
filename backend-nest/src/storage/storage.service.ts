import {
  BadRequestException,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import { createHash } from 'crypto';
import sharp from 'sharp';
import { ByuPathwayTokenPurpose } from '../../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StorageService {
  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  async uploadByuProof(
    verificationId: string,
    submissionToken: string,
    file: Express.Multer.File | undefined,
  ) {
    if (!file) throw new BadRequestException('A BYU Pathway proof file is required.');
    if (!submissionToken?.trim()) throw new BadRequestException('Proof submission token is required.');
    if (file.size > 10 * 1024 * 1024) throw new BadRequestException('Proof files must be 10 MB or smaller.');
    if (!['image/jpeg', 'image/png', 'image/webp', 'application/pdf'].includes(file.mimetype)) {
      throw new BadRequestException('Proof files must be a JPG, PNG, WebP image, or PDF.');
    }

    const token = await this.prisma.byuPathwayVerificationToken.findUnique({
      where: { tokenHash: this.hash(submissionToken) },
      include: { verification: true },
    });
    if (
      !token ||
      token.verificationId !== verificationId ||
      token.purpose !== ByuPathwayTokenPurpose.PROOF_SUBMISSION ||
      token.usedAt ||
      token.expiresAt <= new Date() ||
      token.verification.status !== 'EMAIL_VERIFIED'
    ) {
      throw new BadRequestException('This proof upload link is invalid or has expired.');
    }

    const uploaded = await this.uploadToCloudinary(verificationId, file);

    await this.prisma.$transaction(async (tx) => {
      const document = await tx.document.create({
        data: {
          storageKey: uploaded.publicId,
          fileName: file.originalname,
          mimeType: file.mimetype,
          category: 'BYU_PATHWAY_PROOF',
          sensitivity: 'SENSITIVE',
        },
      });

      await tx.byuPathwayVerification.update({
        where: { id: verificationId },
        data: { proofDocumentId: document.id, status: 'UNDER_REVIEW' },
      });

      await tx.byuPathwayVerificationToken.update({
        where: { id: token.id },
        data: { usedAt: new Date() },
      });
    });

    return { fileName: file.originalname, previewUrl: uploaded.url };
  }

  previewUrl(storageKey: string) {
    this.configureCloudinary();
    return cloudinary.url(storageKey, { secure: true, resource_type: 'auto' });
  }

  private async uploadToCloudinary(verificationId: string, file: Express.Multer.File) {
    this.configureCloudinary();
    const isImage = file.mimetype.startsWith('image/');
    const buffer = isImage
      ? await sharp(file.buffer).rotate().resize({ width: 2400, height: 2400, fit: 'inside', withoutEnlargement: true }).jpeg({ quality: 82, mozjpeg: true }).toBuffer()
      : file.buffer;
    const format = isImage ? 'jpg' : undefined;

    return new Promise<{ publicId: string; url: string }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'katel/byu-pathway-proofs',
          public_id: `${verificationId}-${Date.now()}`,
          resource_type: isImage ? 'image' : 'raw',
          format,
          overwrite: false,
        },
        (error, result) => {
          if (error || !result) return reject(error ?? new Error('Cloudinary upload failed.'));
          resolve({ publicId: result.public_id, url: result.secure_url });
        },
      );
      stream.end(buffer);
    });
  }

  private configureCloudinary() {
    const cloudName = this.config.get<string>('CLOUDINARY_CLOUD_NAME');
    const apiKey = this.config.get<string>('CLOUDINARY_API_KEY');
    const apiSecret = this.config.get<string>('CLOUDINARY_API_SECRET');
    if (!cloudName || !apiKey || !apiSecret) {
      throw new ServiceUnavailableException('Proof uploads are not configured yet.');
    }
    cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret });
  }

  private hash(value: string) {
    return createHash('sha256').update(value).digest('hex');
  }
}
