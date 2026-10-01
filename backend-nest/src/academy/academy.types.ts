import {
  CustomScalar,
  Field,
  GraphQLISODateTime,
  ID,
  InputType,
  Int,
  ObjectType,
  Scalar,
  registerEnumType,
} from '@nestjs/graphql';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Kind, ValueNode } from 'graphql';

import {
  AcademyContentBlockType,
  AcademyContentStatus,
  AcademyGradingMode,
  AcademyMediaProvider,
  AcademyMediaSourceType,
  AcademyMediaType,
  AcademyQuestionType,
} from '../../generated/prisma/client';

/**
 * JSON scalar
 *
 * Used for Prisma Json fields such as:
 * - content block configuration
 * - media metadata
 * - question correctAnswer
 */
@Scalar('JSON')
export class AcademyJsonScalar implements CustomScalar<unknown, unknown> {
  description = 'JSON value';

  parseValue(value: unknown): unknown {
    return value;
  }

  serialize(value: unknown): unknown {
    return value;
  }

  parseLiteral(ast: ValueNode): unknown {
    switch (ast.kind) {
      case Kind.STRING:
      case Kind.BOOLEAN:
        return ast.value;

      case Kind.INT:
        return parseInt(ast.value, 10);

      case Kind.FLOAT:
        return parseFloat(ast.value);

      case Kind.NULL:
        return null;

      case Kind.LIST:
        return ast.values.map((value) => this.parseLiteral(value));

      case Kind.OBJECT:
        return Object.fromEntries(
          ast.fields.map((field) => [
            field.name.value,
            this.parseLiteral(field.value),
          ]),
        );

      default:
        return null;
    }
  }
}

registerEnumType(AcademyContentBlockType, {
  name: 'AcademyContentBlockType',
});

registerEnumType(AcademyContentStatus, {
  name: 'AcademyContentStatus',
});

registerEnumType(AcademyGradingMode, {
  name: 'AcademyGradingMode',
});

registerEnumType(AcademyMediaProvider, {
  name: 'AcademyMediaProvider',
});

registerEnumType(AcademyMediaSourceType, {
  name: 'AcademyMediaSourceType',
});

registerEnumType(AcademyMediaType, {
  name: 'AcademyMediaType',
});

registerEnumType(AcademyQuestionType, {
  name: 'AcademyQuestionType',
});

/* -------------------------------------------------------------------------- */
/* MEDIA                                                                      */
/* -------------------------------------------------------------------------- */

@ObjectType()
export class AcademyMedia {
  @Field(() => ID)
  id!: string;

  @Field(() => AcademyMediaSourceType)
  sourceType!: AcademyMediaSourceType;

  @Field(() => AcademyMediaProvider)
  provider!: AcademyMediaProvider;

  @Field(() => AcademyMediaType)
  type!: AcademyMediaType;

  @Field(() => String, { nullable: true })
  publicId?: string | null;

  @Field(() => String)
  url!: string;

  @Field(() => String, { nullable: true })
  thumbnailUrl?: string | null;

  @Field(() => String, { nullable: true })
  fileName?: string | null;

  @Field(() => String, { nullable: true })
  format?: string | null;

  @Field(() => Int, { nullable: true })
  duration?: number | null;

  @Field(() => AcademyJsonScalar, { nullable: true })
  metadata?: unknown;

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;
}

/* -------------------------------------------------------------------------- */
/* QUESTIONS                                                                  */
/* -------------------------------------------------------------------------- */

@ObjectType()
export class AcademyQuestionOption {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  text!: string;

  @Field(() => Int)
  order!: number;

  @Field(() => Boolean)
  isCorrect!: boolean;
}

@ObjectType()
export class AcademyQuestion {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  prompt!: string;

  @Field(() => AcademyQuestionType)
  type!: AcademyQuestionType;

  @Field(() => Int)
  points!: number;

  @Field(() => AcademyGradingMode)
  gradingMode!: AcademyGradingMode;

  @Field(() => AcademyJsonScalar, { nullable: true })
  correctAnswer?: unknown;

  @Field(() => String, { nullable: true })
  explanation?: string | null;

  @Field(() => [AcademyQuestionOption])
  options!: AcademyQuestionOption[];

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;
}

/* -------------------------------------------------------------------------- */
/* CONTENT BLOCK                                                              */
/* -------------------------------------------------------------------------- */

@ObjectType()
export class AcademyContentBlock {
  @Field(() => ID)
  id!: string;

  @Field(() => ID)
  sessionId!: string;

  @Field(() => AcademyContentBlockType)
  type!: AcademyContentBlockType;

  @Field(() => String, { nullable: true })
  title?: string | null;

  @Field(() => String, { nullable: true })
  textContent?: string | null;

  @Field(() => AcademyJsonScalar, { nullable: true })
  configuration?: unknown;

  @Field(() => Int)
  order!: number;

  @Field(() => AcademyContentStatus)
  status!: AcademyContentStatus;

  @Field(() => Boolean)
  isActive!: boolean;

  @Field(() => AcademyMedia, { nullable: true })
  media?: AcademyMedia | null;

  @Field(() => AcademyQuestion, { nullable: true })
  question?: AcademyQuestion | null;

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;
}

/* -------------------------------------------------------------------------- */
/* SESSION                                                                    */
/* -------------------------------------------------------------------------- */

@ObjectType()
export class AcademySession {
  @Field(() => ID)
  id!: string;

  @Field(() => ID)
  weekId!: string;

  @Field(() => String)
  title!: string;

  @Field(() => String, { nullable: true })
  subtitle?: string | null;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => Int)
  order!: number;

  @Field(() => AcademyContentStatus)
  status!: AcademyContentStatus;

  @Field(() => Boolean)
  isActive!: boolean;

  @Field(() => [AcademyContentBlock])
  contentBlocks!: AcademyContentBlock[];

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;
}

/* -------------------------------------------------------------------------- */
/* WEEK                                                                       */
/* -------------------------------------------------------------------------- */

@ObjectType()
export class AcademyWeek {
  @Field(() => ID)
  id!: string;

  @Field(() => ID)
  courseId!: string;

  @Field(() => String)
  title!: string;

  @Field(() => String, { nullable: true })
  subtitle?: string | null;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => Int)
  order!: number;

  @Field(() => AcademyContentStatus)
  status!: AcademyContentStatus;

  @Field(() => Boolean)
  isActive!: boolean;

  @Field(() => [AcademySession])
  sessions!: AcademySession[];

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;
}

/* -------------------------------------------------------------------------- */
/* COURSE                                                                     */
/* -------------------------------------------------------------------------- */

@ObjectType()
export class AcademyCourse {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  code!: string;

  @Field(() => String)
  title!: string;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => Int)
  durationWeeks!: number;

  @Field(() => Boolean)
  isActive!: boolean;

  @Field(() => [AcademyWeek])
  weeks!: AcademyWeek[];

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;
}

/* -------------------------------------------------------------------------- */
/* COURSE INPUTS                                                              */
/* -------------------------------------------------------------------------- */

@InputType()
export class CreateAcademyCourseInput {
  @Field(() => String)
  @IsString()
  code!: string;

  @Field(() => String)
  @IsString()
  title!: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  durationWeeks!: number;
}

@InputType()
export class UpdateAcademyCourseInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  title?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  durationWeeks?: number;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

/* -------------------------------------------------------------------------- */
/* WEEK INPUTS                                                                */
/* -------------------------------------------------------------------------- */

@InputType()
export class CreateAcademyWeekInput {
  @Field(() => String)
  @IsString()
  title!: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  subtitle?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  order!: number;
}

@InputType()
export class UpdateAcademyWeekInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  title?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  subtitle?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  order?: number;

  @Field(() => AcademyContentStatus, { nullable: true })
  @IsOptional()
  @IsEnum(AcademyContentStatus)
  status?: AcademyContentStatus;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

/* -------------------------------------------------------------------------- */
/* SESSION INPUTS                                                             */
/* -------------------------------------------------------------------------- */

@InputType()
export class CreateAcademySessionInput {
  @Field(() => String)
  @IsString()
  title!: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  subtitle?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  order!: number;
}

@InputType()
export class UpdateAcademySessionInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  title?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  subtitle?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  order?: number;

  @Field(() => AcademyContentStatus, { nullable: true })
  @IsOptional()
  @IsEnum(AcademyContentStatus)
  status?: AcademyContentStatus;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

/* -------------------------------------------------------------------------- */
/* CONTENT BLOCK INPUTS                                                       */
/* -------------------------------------------------------------------------- */

@InputType()
export class CreateAcademyContentBlockInput {
  @Field(() => AcademyContentBlockType)
  @IsEnum(AcademyContentBlockType)
  type!: AcademyContentBlockType;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  title?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  textContent?: string;

  @Field(() => AcademyJsonScalar, { nullable: true })
  @IsOptional()
  configuration?: unknown;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  order!: number;

  @Field(() => AcademyContentStatus, { nullable: true })
  @IsOptional()
  @IsEnum(AcademyContentStatus)
  status?: AcademyContentStatus;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsString()
  mediaId?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsString()
  questionId?: string;
}

@InputType()
export class UpdateAcademyContentBlockInput {
  @Field(() => AcademyContentBlockType, { nullable: true })
  @IsOptional()
  @IsEnum(AcademyContentBlockType)
  type?: AcademyContentBlockType;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  title?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  textContent?: string;

  @Field(() => AcademyJsonScalar, { nullable: true })
  @IsOptional()
  configuration?: unknown;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  order?: number;

  @Field(() => AcademyContentStatus, { nullable: true })
  @IsOptional()
  @IsEnum(AcademyContentStatus)
  status?: AcademyContentStatus;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsString()
  mediaId?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsString()
  questionId?: string;
}
