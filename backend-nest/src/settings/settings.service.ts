import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateAcademyFeeSettingsInput } from './settings.types';

const ACADEMY_FIRST_TIME_REGISTRATION_FEE =
  'academy.registration_fee.first_time';

const ACADEMY_RE_ENROLLMENT_FEE = 'academy.registration_fee.re_enrollment';

const ACADEMY_BYU_PATHWAY_FEE = 'academy.registration_fee.byu_pathway';

const DEFAULT_ACADEMY_FEE_SETTINGS = {
  firstTimeRegistrationFee: 0,
  reEnrollmentFee: 0,
  byuPathwayFee: 0,
};

@Injectable()
export class SettingsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAcademyFeeSettings() {
    const settings = await this.prisma.systemSetting.findMany({
      where: {
        key: {
          in: [
            ACADEMY_FIRST_TIME_REGISTRATION_FEE,
            ACADEMY_RE_ENROLLMENT_FEE,
            ACADEMY_BYU_PATHWAY_FEE,
          ],
        },
      },
    });

    const values = new Map(
      settings.map((setting) => [setting.key, setting.value]),
    );

    return {
      firstTimeRegistrationFee: this.readFee(
        values.get(ACADEMY_FIRST_TIME_REGISTRATION_FEE),
      ),
      reEnrollmentFee: this.readFee(values.get(ACADEMY_RE_ENROLLMENT_FEE)),
      byuPathwayFee: this.readFee(values.get(ACADEMY_BYU_PATHWAY_FEE)),
    };
  }

  async updateAcademyFeeSettings(input: UpdateAcademyFeeSettingsInput) {
    this.validateFee(input.firstTimeRegistrationFee);
    this.validateFee(input.reEnrollmentFee);
    this.validateFee(input.byuPathwayFee);

    await this.prisma.$transaction([
      this.prisma.systemSetting.upsert({
        where: {
          key: ACADEMY_FIRST_TIME_REGISTRATION_FEE,
        },
        update: {
          value: input.firstTimeRegistrationFee,
          description: 'Academy first-time registration fee in UGX.',
        },
        create: {
          key: ACADEMY_FIRST_TIME_REGISTRATION_FEE,
          value: input.firstTimeRegistrationFee,
          description: 'Academy first-time registration fee in UGX.',
        },
      }),

      this.prisma.systemSetting.upsert({
        where: {
          key: ACADEMY_RE_ENROLLMENT_FEE,
        },
        update: {
          value: input.reEnrollmentFee,
          description: 'Academy re-enrollment fee after a failed course.',
        },
        create: {
          key: ACADEMY_RE_ENROLLMENT_FEE,
          value: input.reEnrollmentFee,
          description: 'Academy re-enrollment fee after a failed course.',
        },
      }),

      this.prisma.systemSetting.upsert({
        where: {
          key: ACADEMY_BYU_PATHWAY_FEE,
        },
        update: {
          value: input.byuPathwayFee,
          description:
            'Academy registration fee for eligible BYU Pathway students.',
        },
        create: {
          key: ACADEMY_BYU_PATHWAY_FEE,
          value: input.byuPathwayFee,
          description:
            'Academy registration fee for eligible BYU Pathway students.',
        },
      }),
    ]);

    return this.getAcademyFeeSettings();
  }

  private readFee(value: unknown) {
    if (typeof value !== 'number' || !Number.isInteger(value) || value < 0) {
      return DEFAULT_ACADEMY_FEE_SETTINGS.firstTimeRegistrationFee;
    }

    return value;
  }

  private validateFee(value: number) {
    if (!Number.isInteger(value) || value < 0) {
      throw new BadRequestException(
        'Academy fees must be whole numbers greater than or equal to 0.',
      );
    }
  }
}
