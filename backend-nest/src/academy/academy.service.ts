import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  AcademyContentBlockType,
  AcademyContentStatus,
  CreateAcademyContentBlockInput,
  CreateAcademyCourseInput,
  CreateAcademySessionInput,
  CreateAcademyWeekInput,
  UpdateAcademyContentBlockInput,
  UpdateAcademyCourseInput,
  UpdateAcademySessionInput,
  UpdateAcademyWeekInput,
} from './academy.types';

@Injectable()
export class AcademyService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly courseInclude = {
    weeks: {
      orderBy: {
        order: 'asc' as const,
      },
      include: {
        sessions: {
          orderBy: {
            order: 'asc' as const,
          },
          include: {
            contentBlocks: {
              orderBy: {
                order: 'asc' as const,
              },
            },
          },
        },
      },
    },
  };

  async listActiveCourses() {
    return this.prisma.academyCourse.findMany({
      where: {
        isActive: true,
      },
      include: this.courseInclude,
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
      include: this.courseInclude,
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
      where: {
        code,
      },
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
      include: this.courseInclude,
    });
  }

  async updateCourse(id: string, input: UpdateAcademyCourseInput) {
    const existingCourse = await this.prisma.academyCourse.findUnique({
      where: {
        id,
      },
    });

    if (!existingCourse) {
      throw new NotFoundException('Academy course not found');
    }

    const title = input.title.trim();

    if (!title) {
      throw new BadRequestException('Course title is required');
    }

    return this.prisma.academyCourse.update({
      where: {
        id,
      },
      data: {
        title,
        description: input.description?.trim() || null,
        ...(input.isActive !== undefined
          ? {
              isActive: input.isActive,
            }
          : {}),
      },
      include: this.courseInclude,
    });
  }

  async createWeek(courseId: string, input: CreateAcademyWeekInput) {
    const course = await this.prisma.academyCourse.findUnique({
      where: {
        id: courseId,
      },
    });

    if (!course) {
      throw new NotFoundException('Academy course not found');
    }

    const title = input.title.trim();

    if (!title) {
      throw new BadRequestException('Week title is required');
    }

    const existingWeek = await this.prisma.academyWeek.findFirst({
      where: {
        courseId,
        order: input.order,
      },
    });

    if (existingWeek) {
      throw new BadRequestException(
        `A week with order ${input.order} already exists in this course`,
      );
    }

    return this.prisma.academyWeek.create({
      data: {
        courseId,
        title,
        description: input.description?.trim() || null,
        order: input.order,
      },
      include: {
        sessions: {
          orderBy: {
            order: 'asc',
          },
          include: {
            contentBlocks: {
              orderBy: {
                order: 'asc',
              },
            },
          },
        },
      },
    });
  }

  async updateWeek(id: string, input: UpdateAcademyWeekInput) {
    const existingWeek = await this.prisma.academyWeek.findUnique({
      where: {
        id,
      },
    });

    if (!existingWeek) {
      throw new NotFoundException('Academy week not found');
    }

    const title = input.title.trim();

    if (!title) {
      throw new BadRequestException('Week title is required');
    }

    if (input.order !== undefined && input.order !== existingWeek.order) {
      const conflictingWeek = await this.prisma.academyWeek.findFirst({
        where: {
          courseId: existingWeek.courseId,
          order: input.order,
          NOT: {
            id,
          },
        },
      });

      if (conflictingWeek) {
        throw new BadRequestException(
          `A week with order ${input.order} already exists in this course`,
        );
      }
    }

    return this.prisma.academyWeek.update({
      where: {
        id,
      },
      data: {
        title,
        description: input.description?.trim() || null,
        ...(input.order !== undefined
          ? {
              order: input.order,
            }
          : {}),
        ...(input.status !== undefined
          ? {
              status: input.status,
            }
          : {}),
      },
      include: {
        sessions: {
          orderBy: {
            order: 'asc',
          },
          include: {
            contentBlocks: {
              orderBy: {
                order: 'asc',
              },
            },
          },
        },
      },
    });
  }

  async createSession(weekId: string, input: CreateAcademySessionInput) {
    const week = await this.prisma.academyWeek.findUnique({
      where: {
        id: weekId,
      },
    });

    if (!week) {
      throw new NotFoundException('Academy week not found');
    }

    const title = input.title.trim();

    if (!title) {
      throw new BadRequestException('Session title is required');
    }

    const existingSession = await this.prisma.academySession.findFirst({
      where: {
        weekId,
        order: input.order,
      },
    });

    if (existingSession) {
      throw new BadRequestException(
        `A session with order ${input.order} already exists in this week`,
      );
    }

    return this.prisma.academySession.create({
      data: {
        weekId,
        title,
        description: input.description?.trim() || null,
        order: input.order,
      },
      include: {
        contentBlocks: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    });
  }

  async updateSession(id: string, input: UpdateAcademySessionInput) {
    const existingSession = await this.prisma.academySession.findUnique({
      where: {
        id,
      },
    });

    if (!existingSession) {
      throw new NotFoundException('Academy session not found');
    }

    const title = input.title.trim();

    if (!title) {
      throw new BadRequestException('Session title is required');
    }

    if (input.order !== undefined && input.order !== existingSession.order) {
      const conflictingSession = await this.prisma.academySession.findFirst({
        where: {
          weekId: existingSession.weekId,
          order: input.order,
          NOT: {
            id,
          },
        },
      });

      if (conflictingSession) {
        throw new BadRequestException(
          `A session with order ${input.order} already exists in this week`,
        );
      }
    }

    return this.prisma.academySession.update({
      where: {
        id,
      },
      data: {
        title,
        description: input.description?.trim() || null,
        ...(input.order !== undefined
          ? {
              order: input.order,
            }
          : {}),
        ...(input.status !== undefined
          ? {
              status: input.status,
            }
          : {}),
      },
      include: {
        contentBlocks: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    });
  }

  async createContentBlock(
    sessionId: string,
    input: CreateAcademyContentBlockInput,
  ) {
    const session = await this.prisma.academySession.findUnique({
      where: {
        id: sessionId,
      },
    });

    if (!session) {
      throw new NotFoundException('Academy session not found');
    }

    const title = input.title?.trim() || null;
    const textContent = input.body?.trim() || null;

    if (input.type === AcademyContentBlockType.TEXT && !textContent) {
      throw new BadRequestException('Text content blocks require body content');
    }

    const existingBlock = await this.prisma.academyContentBlock.findFirst({
      where: {
        sessionId,
        order: input.order,
      },
    });

    if (existingBlock) {
      throw new BadRequestException(
        `A content block with order ${input.order} already exists in this session`,
      );
    }

    return this.prisma.academyContentBlock.create({
      data: {
        sessionId,
        type: input.type,
        title,
        textContent,
        order: input.order,
      },
    });
  }

  async updateContentBlock(id: string, input: UpdateAcademyContentBlockInput) {
    const existingBlock = await this.prisma.academyContentBlock.findUnique({
      where: {
        id,
      },
    });

    if (!existingBlock) {
      throw new NotFoundException('Academy content block not found');
    }

    const type = input.type ?? existingBlock.type;

    const title =
      input.title !== undefined
        ? input.title.trim() || null
        : existingBlock.title;

    const textContent =
      input.body !== undefined
        ? input.body.trim() || null
        : existingBlock.textContent;

    if (type === AcademyContentBlockType.TEXT && !textContent) {
      throw new BadRequestException('Text content blocks require body content');
    }

    if (input.order !== undefined && input.order !== existingBlock.order) {
      const conflictingBlock = await this.prisma.academyContentBlock.findFirst({
        where: {
          sessionId: existingBlock.sessionId,
          order: input.order,
          NOT: {
            id,
          },
        },
      });

      if (conflictingBlock) {
        throw new BadRequestException(
          `A content block with order ${input.order} already exists in this session`,
        );
      }
    }

    return this.prisma.academyContentBlock.update({
      where: {
        id,
      },
      data: {
        ...(input.type !== undefined
          ? {
              type: input.type,
            }
          : {}),
        title,
        textContent,
        ...(input.order !== undefined
          ? {
              order: input.order,
            }
          : {}),
        ...(input.status !== undefined
          ? {
              status: input.status,
            }
          : {}),
      },
    });
  }
}
