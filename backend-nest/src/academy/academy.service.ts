import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateAcademyCourseInput,
  CreateAcademyLessonInput,
  CreateAcademyModuleInput,
  UpdateAcademyCourseInput,
  UpdateAcademyLessonInput,
  UpdateAcademyModuleInput,
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
        ...(input.isActive !== undefined ? { isActive: input.isActive } : {}),
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

  async createModule(courseId: string, input: CreateAcademyModuleInput) {
    const course = await this.prisma.academyCourse.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      throw new NotFoundException('Academy course not found');
    }

    const title = input.title.trim();

    if (!title) {
      throw new BadRequestException('Module title is required');
    }

    const existingModule = await this.prisma.academyModule.findFirst({
      where: {
        courseId,
        order: input.order,
      },
    });

    if (existingModule) {
      throw new BadRequestException(
        `A module with order ${input.order} already exists in this course`,
      );
    }

    return this.prisma.academyModule.create({
      data: {
        courseId,
        title,
        description: input.description?.trim() || null,
        order: input.order,
      },
      include: {
        lessons: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    });
  }

  async updateModule(id: string, input: UpdateAcademyModuleInput) {
    const existingModule = await this.prisma.academyModule.findUnique({
      where: { id },
    });

    if (!existingModule) {
      throw new NotFoundException('Academy module not found');
    }

    const title = input.title.trim();

    if (!title) {
      throw new BadRequestException('Module title is required');
    }

    if (input.order !== undefined && input.order !== existingModule.order) {
      const conflictingModule = await this.prisma.academyModule.findFirst({
        where: {
          courseId: existingModule.courseId,
          order: input.order,
          NOT: {
            id,
          },
        },
      });

      if (conflictingModule) {
        throw new BadRequestException(
          `A module with order ${input.order} already exists in this course`,
        );
      }
    }

    return this.prisma.academyModule.update({
      where: { id },
      data: {
        title,
        description: input.description?.trim() || null,
        ...(input.order !== undefined ? { order: input.order } : {}),
        ...(input.isActive !== undefined ? { isActive: input.isActive } : {}),
      },
      include: {
        lessons: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    });
  }

  async createLesson(moduleId: string, input: CreateAcademyLessonInput) {
    const module = await this.prisma.academyModule.findUnique({
      where: { id: moduleId },
    });

    if (!module) {
      throw new NotFoundException('Academy module not found');
    }

    const title = input.title.trim();

    if (!title) {
      throw new BadRequestException('Lesson title is required');
    }

    const existingLesson = await this.prisma.academyLesson.findFirst({
      where: {
        moduleId,
        order: input.order,
      },
    });

    if (existingLesson) {
      throw new BadRequestException(
        `A lesson with order ${input.order} already exists in this module`,
      );
    }

    return this.prisma.academyLesson.create({
      data: {
        moduleId,
        title,
        description: input.description?.trim() || null,
        content: input.content?.trim() || null,
        order: input.order,
      },
    });
  }

  async updateLesson(id: string, input: UpdateAcademyLessonInput) {
    const existingLesson = await this.prisma.academyLesson.findUnique({
      where: { id },
    });

    if (!existingLesson) {
      throw new NotFoundException('Academy lesson not found');
    }

    const title = input.title.trim();

    if (!title) {
      throw new BadRequestException('Lesson title is required');
    }

    if (input.order !== undefined && input.order !== existingLesson.order) {
      const conflictingLesson = await this.prisma.academyLesson.findFirst({
        where: {
          moduleId: existingLesson.moduleId,
          order: input.order,
          NOT: {
            id,
          },
        },
      });

      if (conflictingLesson) {
        throw new BadRequestException(
          `A lesson with order ${input.order} already exists in this module`,
        );
      }
    }

    return this.prisma.academyLesson.update({
      where: { id },
      data: {
        title,
        description: input.description?.trim() || null,
        content: input.content?.trim() || null,
        ...(input.order !== undefined ? { order: input.order } : {}),
        ...(input.isActive !== undefined ? { isActive: input.isActive } : {}),
      },
    });
  }
}
