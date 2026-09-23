import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateAcademyCourseInput,
  UpdateAcademyCourseInput,
} from './academy.types';

@Injectable()
export class AcademyService {
  constructor(private readonly prisma: PrismaService) {}

  async listActiveCourses() {
    return this.prisma.academyCourse.findMany({
      where: {
        isActive: true,
      },
      include: {
        modules: {
          where: {
            isActive: true,
          },
          orderBy: {
            order: 'asc',
          },
          include: {
            lessons: {
              where: {
                isActive: true,
              },
              orderBy: {
                order: 'asc',
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getActiveCourse(id: string) {
    const course = await this.prisma.academyCourse.findFirst({
      where: {
        id,
        isActive: true,
      },
      include: {
        modules: {
          where: {
            isActive: true,
          },
          orderBy: {
            order: 'asc',
          },
          include: {
            lessons: {
              where: {
                isActive: true,
              },
              orderBy: {
                order: 'asc',
              },
            },
          },
        },
      },
    });

    if (!course) {
      throw new NotFoundException('Academy course not found');
    }

    return course;
  }

  async createCourse(input: CreateAcademyCourseInput) {
    const code = input.code.trim().toUpperCase();
    const title = input.title.trim();

    if (!code) {
      throw new BadRequestException('Course code is required');
    }

    if (!title) {
      throw new BadRequestException('Course title is required');
    }

    const existingCourse = await this.prisma.academyCourse.findUnique({
      where: { code },
    });

    if (existingCourse) {
      throw new BadRequestException(
        `A course with code "${code}" already exists`,
      );
    }

    return this.prisma.academyCourse.create({
      data: {
        code,
        title,
        description: input.description?.trim() || null,
      },
      include: {
        modules: {
          orderBy: {
            order: 'asc',
          },
          include: {
            lessons: {
              orderBy: {
                order: 'asc',
              },
            },
          },
        },
      },
    });
  }

  async updateCourse(id: string, input: UpdateAcademyCourseInput) {
    const existingCourse = await this.prisma.academyCourse.findUnique({
      where: { id },
    });

    if (!existingCourse) {
      throw new NotFoundException('Academy course not found');
    }

    const title = input.title.trim();

    if (!title) {
      throw new BadRequestException('Course title is required');
    }

    return this.prisma.academyCourse.update({
      where: { id },
      data: {
        title,
        description: input.description?.trim() || null,
        ...(input.isActive !== undefined
          ? { isActive: input.isActive }
          : {}),
      },
      include: {
        modules: {
          orderBy: {
            order: 'asc',
          },
          include: {
            lessons: {
              orderBy: {
                order: 'asc',
              },
            },
          },
        },
      },
    });
  }
}
