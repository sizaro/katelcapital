import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AcademyContentBlockType, Prisma } from '../../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import {
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
              include: {
                media: true,
                question: {
                  include: {
                    options: {
                      orderBy: {
                        order: 'asc' as const,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  } satisfies Prisma.AcademyCourseInclude;

  /* ------------------------------------------------------------------------ */
  /* COURSE                                                                    */
  /* ------------------------------------------------------------------------ */

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
      throw new NotFoundException('Academy course not found.');
    }

    return course;
  }

  async listMyCourses(userId: string) {
    const enrollments = await this.prisma.academyEnrollment.findMany({
      where: {
        userId,
        status: {
          in: ['ENROLLED', 'IN_PROGRESS', 'COMPLETED'],
        },
        course: {
          isActive: true,
        },
      },
      include: {
        course: {
          include: {
            weeks: {
              where: {
                isActive: true,
                status: 'PUBLISHED',
              },
              orderBy: {
                order: 'asc',
              },
              include: {
                sessions: {
                  where: {
                    isActive: true,
                    status: 'PUBLISHED',
                  },
                  orderBy: {
                    order: 'asc',
                  },
                  include: {
                    contentBlocks: {
                      where: {
                        isActive: true,
                        status: 'PUBLISHED',
                      },
                      orderBy: {
                        order: 'asc',
                      },
                      include: {
                        media: true,
                        question: {
                          select: {
                            id: true,
                            prompt: true,
                            type: true,
                            points: true,
                            gradingMode: true,
                            explanation: true,
                            createdAt: true,
                            updatedAt: true,
                            options: {
                              select: {
                                id: true,
                                text: true,
                                order: true,
                              },
                              orderBy: {
                                order: 'asc',
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        enrolledAt: 'desc',
      },
    });

    return enrollments.map((enrollment) => enrollment.course);
  }

  async createCourse(input: CreateAcademyCourseInput) {
    const code = input.code.trim().toUpperCase();
    const title = input.title.trim();
    const description = this.cleanOptionalString(input.description);

    if (!code) {
      throw new BadRequestException('Course code is required.');
    }

    if (!title) {
      throw new BadRequestException('Course title is required.');
    }

    if (!Number.isInteger(input.durationWeeks) || input.durationWeeks < 1) {
      throw new BadRequestException('Course duration must be at least 1 week.');
    }

    const existingCourse = await this.prisma.academyCourse.findUnique({
      where: {
        code,
      },
    });

    if (existingCourse) {
      throw new BadRequestException(
        `An academy course with code "${code}" already exists.`,
      );
    }

    return this.prisma.academyCourse.create({
      data: {
        code,
        title,
        description,
        durationWeeks: input.durationWeeks,
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
      throw new NotFoundException('Academy course not found.');
    }

    const data: Prisma.AcademyCourseUpdateInput = {};

    if (input.title !== undefined) {
      const title = input.title.trim();

      if (!title) {
        throw new BadRequestException('Course title cannot be empty.');
      }

      data.title = title;
    }

    if (input.description !== undefined) {
      data.description = this.cleanOptionalString(input.description);
    }

    if (input.durationWeeks !== undefined) {
      if (!Number.isInteger(input.durationWeeks) || input.durationWeeks < 1) {
        throw new BadRequestException(
          'Course duration must be at least 1 week.',
        );
      }

      data.durationWeeks = input.durationWeeks;
    }

    if (input.isActive !== undefined) {
      data.isActive = input.isActive;
    }

    return this.prisma.academyCourse.update({
      where: {
        id,
      },
      data,
      include: this.courseInclude,
    });
  }

  /* ------------------------------------------------------------------------ */
  /* WEEK                                                                      */
  /* ------------------------------------------------------------------------ */

  async createWeek(courseId: string, input: CreateAcademyWeekInput) {
    await this.ensureCourseExists(courseId);

    const title = input.title.trim();
    const subtitle = this.cleanOptionalString(input.subtitle);
    const description = this.cleanOptionalString(input.description);

    if (!title) {
      throw new BadRequestException('Week title is required.');
    }

    await this.ensureUniqueWeekOrder(courseId, input.order);

    return this.prisma.academyWeek.create({
      data: {
        courseId,
        title,
        subtitle,
        description,
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
              include: {
                media: true,
                question: {
                  include: {
                    options: {
                      orderBy: {
                        order: 'asc',
                      },
                    },
                  },
                },
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
      throw new NotFoundException('Academy week not found.');
    }

    if (input.title !== undefined) {
      const title = input.title.trim();

      if (!title) {
        throw new BadRequestException('Week title cannot be empty.');
      }
    }

    if (input.order !== undefined && input.order !== existingWeek.order) {
      await this.ensureUniqueWeekOrder(existingWeek.courseId, input.order, id);
    }

    const data: Prisma.AcademyWeekUpdateInput = {};

    if (input.title !== undefined) {
      data.title = input.title.trim();
    }

    if (input.subtitle !== undefined) {
      data.subtitle = this.cleanOptionalString(input.subtitle);
    }

    if (input.description !== undefined) {
      data.description = this.cleanOptionalString(input.description);
    }

    if (input.order !== undefined) {
      data.order = input.order;
    }

    if (input.status !== undefined) {
      data.status = input.status;
    }

    if (input.isActive !== undefined) {
      data.isActive = input.isActive;
    }

    return this.prisma.academyWeek.update({
      where: {
        id,
      },
      data,
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
              include: {
                media: true,
                question: {
                  include: {
                    options: {
                      orderBy: {
                        order: 'asc',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  /* ------------------------------------------------------------------------ */
  /* SESSION                                                                   */
  /* ------------------------------------------------------------------------ */

  async createSession(weekId: string, input: CreateAcademySessionInput) {
    await this.ensureWeekExists(weekId);

    const title = input.title.trim();
    const subtitle = this.cleanOptionalString(input.subtitle);
    const description = this.cleanOptionalString(input.description);

    if (!title) {
      throw new BadRequestException('Session title is required.');
    }

    await this.ensureUniqueSessionOrder(weekId, input.order);

    return this.prisma.academySession.create({
      data: {
        weekId,
        title,
        subtitle,
        description,
        order: input.order,
      },
      include: {
        contentBlocks: {
          orderBy: {
            order: 'asc',
          },
          include: {
            media: true,
            question: {
              include: {
                options: {
                  orderBy: {
                    order: 'asc',
                  },
                },
              },
            },
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
      throw new NotFoundException('Academy session not found.');
    }

    if (input.title !== undefined) {
      const title = input.title.trim();

      if (!title) {
        throw new BadRequestException('Session title cannot be empty.');
      }
    }

    if (input.order !== undefined && input.order !== existingSession.order) {
      await this.ensureUniqueSessionOrder(
        existingSession.weekId,
        input.order,
        id,
      );
    }

    const data: Prisma.AcademySessionUpdateInput = {};

    if (input.title !== undefined) {
      data.title = input.title.trim();
    }

    if (input.subtitle !== undefined) {
      data.subtitle = this.cleanOptionalString(input.subtitle);
    }

    if (input.description !== undefined) {
      data.description = this.cleanOptionalString(input.description);
    }

    if (input.order !== undefined) {
      data.order = input.order;
    }

    if (input.status !== undefined) {
      data.status = input.status;
    }

    if (input.isActive !== undefined) {
      data.isActive = input.isActive;
    }

    return this.prisma.academySession.update({
      where: {
        id,
      },
      data,
      include: {
        contentBlocks: {
          orderBy: {
            order: 'asc',
          },
          include: {
            media: true,
            question: {
              include: {
                options: {
                  orderBy: {
                    order: 'asc',
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  /* ------------------------------------------------------------------------ */
  /* CONTENT BLOCK                                                             */
  /* ------------------------------------------------------------------------ */

  async createContentBlock(
    sessionId: string,
    input: CreateAcademyContentBlockInput,
  ) {
    await this.ensureSessionExists(sessionId);

    this.validateContentBlockInput(input.type, input.textContent);

    await this.ensureUniqueContentBlockOrder(sessionId, input.order);

    const mediaId = this.cleanOptionalId(input.mediaId);
    const questionId = this.cleanOptionalId(input.questionId);

    if (mediaId) {
      await this.ensureMediaExists(mediaId);
    }

    if (questionId) {
      await this.ensureQuestionExists(questionId);
      await this.ensureQuestionNotAlreadyAttached(questionId);
    }

    return this.prisma.academyContentBlock.create({
      data: {
        sessionId,
        type: input.type,
        title: this.cleanOptionalString(input.title),
        textContent: this.cleanOptionalString(input.textContent),
        configuration:
          input.configuration === undefined
            ? Prisma.JsonNull
            : (input.configuration as Prisma.InputJsonValue),
        order: input.order,
        status: input.status,
        isActive: input.isActive,
        mediaId,
        questionId,
      },
      include: {
        media: true,
        question: {
          include: {
            options: {
              orderBy: {
                order: 'asc',
              },
            },
          },
        },
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
      throw new NotFoundException('Academy content block not found.');
    }

    const nextType = input.type ?? existingBlock.type;

    const nextTextContent =
      input.textContent !== undefined
        ? input.textContent
        : existingBlock.textContent;

    this.validateContentBlockInput(nextType, nextTextContent);

    if (input.order !== undefined && input.order !== existingBlock.order) {
      await this.ensureUniqueContentBlockOrder(
        existingBlock.sessionId,
        input.order,
        id,
      );
    }

    const mediaId =
      input.mediaId !== undefined
        ? this.cleanOptionalId(input.mediaId)
        : undefined;

    const questionId =
      input.questionId !== undefined
        ? this.cleanOptionalId(input.questionId)
        : undefined;

    if (mediaId) {
      await this.ensureMediaExists(mediaId);
    }

    if (questionId) {
      await this.ensureQuestionExists(questionId);
      await this.ensureQuestionNotAlreadyAttached(questionId, id);
    }

    const data: Prisma.AcademyContentBlockUpdateInput = {};

    if (input.type !== undefined) {
      data.type = input.type;
    }

    if (input.title !== undefined) {
      data.title = this.cleanOptionalString(input.title);
    }

    if (input.textContent !== undefined) {
      data.textContent = this.cleanOptionalString(input.textContent);
    }

    if (input.configuration !== undefined) {
      data.configuration = input.configuration as Prisma.InputJsonValue;
    }

    if (input.order !== undefined) {
      data.order = input.order;
    }

    if (input.status !== undefined) {
      data.status = input.status;
    }

    if (input.isActive !== undefined) {
      data.isActive = input.isActive;
    }

    if (input.mediaId !== undefined) {
      data.media = mediaId
        ? {
            connect: {
              id: mediaId,
            },
          }
        : {
            disconnect: true,
          };
    }

    if (input.questionId !== undefined) {
      data.question = questionId
        ? {
            connect: {
              id: questionId,
            },
          }
        : {
            disconnect: true,
          };
    }

    return this.prisma.academyContentBlock.update({
      where: {
        id,
      },
      data,
      include: {
        media: true,
        question: {
          include: {
            options: {
              orderBy: {
                order: 'asc',
              },
            },
          },
        },
      },
    });
  }

  /* ------------------------------------------------------------------------ */
  /* VALIDATION                                                                */
  /* ------------------------------------------------------------------------ */

  private validateContentBlockInput(
    type: AcademyContentBlockType,
    textContent?: string | null,
  ) {
    if (type === AcademyContentBlockType.TEXT && !textContent?.trim()) {
      throw new BadRequestException(
        'TEXT content blocks require text content.',
      );
    }
  }

  private async ensureCourseExists(courseId: string) {
    const course = await this.prisma.academyCourse.findUnique({
      where: {
        id: courseId,
      },
    });

    if (!course) {
      throw new NotFoundException('Academy course not found.');
    }

    return course;
  }

  private async ensureWeekExists(weekId: string) {
    const week = await this.prisma.academyWeek.findUnique({
      where: {
        id: weekId,
      },
    });

    if (!week) {
      throw new NotFoundException('Academy week not found.');
    }

    return week;
  }

  private async ensureSessionExists(sessionId: string) {
    const session = await this.prisma.academySession.findUnique({
      where: {
        id: sessionId,
      },
    });

    if (!session) {
      throw new NotFoundException('Academy session not found.');
    }

    return session;
  }

  private async ensureMediaExists(mediaId: string) {
    const media = await this.prisma.academyMedia.findUnique({
      where: {
        id: mediaId,
      },
    });

    if (!media) {
      throw new NotFoundException('Academy media not found.');
    }

    return media;
  }

  private async ensureQuestionExists(questionId: string) {
    const question = await this.prisma.academyQuestion.findUnique({
      where: {
        id: questionId,
      },
    });

    if (!question) {
      throw new NotFoundException('Academy question not found.');
    }

    return question;
  }

  private async ensureQuestionNotAlreadyAttached(
    questionId: string,
    excludeContentBlockId?: string,
  ) {
    const existing = await this.prisma.academyContentBlock.findFirst({
      where: {
        questionId,
        ...(excludeContentBlockId
          ? {
              id: {
                not: excludeContentBlockId,
              },
            }
          : {}),
      },
      select: {
        id: true,
      },
    });

    if (existing) {
      throw new BadRequestException(
        'This question is already attached to another content block.',
      );
    }
  }

  private async ensureUniqueWeekOrder(
    courseId: string,
    order: number,
    excludeId?: string,
  ) {
    const existing = await this.prisma.academyWeek.findFirst({
      where: {
        courseId,
        order,
        ...(excludeId
          ? {
              id: {
                not: excludeId,
              },
            }
          : {}),
      },
      select: {
        id: true,
      },
    });

    if (existing) {
      throw new BadRequestException(
        `Week order ${order} is already used in this course.`,
      );
    }
  }

  private async ensureUniqueSessionOrder(
    weekId: string,
    order: number,
    excludeId?: string,
  ) {
    const existing = await this.prisma.academySession.findFirst({
      where: {
        weekId,
        order,
        ...(excludeId
          ? {
              id: {
                not: excludeId,
              },
            }
          : {}),
      },
      select: {
        id: true,
      },
    });

    if (existing) {
      throw new BadRequestException(
        `Session order ${order} is already used in this week.`,
      );
    }
  }

  private async ensureUniqueContentBlockOrder(
    sessionId: string,
    order: number,
    excludeId?: string,
  ) {
    const existing = await this.prisma.academyContentBlock.findFirst({
      where: {
        sessionId,
        order,
        ...(excludeId
          ? {
              id: {
                not: excludeId,
              },
            }
          : {}),
      },
      select: {
        id: true,
      },
    });

    if (existing) {
      throw new BadRequestException(
        `Content block order ${order} is already used in this session.`,
      );
    }
  }

  private cleanOptionalId(value?: string | null): string | null {
    if (value === undefined || value === null) {
      return null;
    }

    const trimmed = value.trim();

    return trimmed || null;
  }

  private cleanOptionalString(value?: string | null): string | null {
    if (value === undefined || value === null) {
      return null;
    }

    const trimmed = value.trim();

    return trimmed || null;
  }
}
