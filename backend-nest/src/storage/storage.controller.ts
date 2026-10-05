import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { StorageService } from './storage.service';

@Controller('uploads')
export class StorageController {
  constructor(private readonly storage: StorageService) {}

  @Post('byu-proof')
  @UseInterceptors(FileInterceptor('file', { limits: { fileSize: 10 * 1024 * 1024 } }))
  uploadByuProof(
    @Body('verificationId') verificationId: string,
    @Body('submissionToken') submissionToken: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.storage.uploadByuProof(verificationId, submissionToken, file);
  }
}
