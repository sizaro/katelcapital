import {
  Field,
  ID,
  InputType,
  Int,
  ObjectType,
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

export enum AcademyContentBlockType {
  TEXT = 'TEXT',
  VIDEO = 'VIDEO',
  IMAGE = 'IMAGE',
  PDF = 'PDF',
  CALLOUT = 'CALLOUT',
  TABLE = 'TABLE',
  QUICK_CHECK = 'QUICK_CHECK',
}

registerEnumType(AcademyContentBlockType, {
  name: 'AcademyContentBlockType',
});

export enum AcademyContentStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

registerEnumType(AcademyContentStatus, {
  name: 'AcademyContentStatus',
});

@ObjectType()
export class AcademyContentBlock {
  @Field(() => ID)
  id!: string;

  @Field(() => AcademyContentBlockType)
  type!: AcademyContentBlockType;

  @Field(() => String, { nullable: true })
  title?: string | null;

  @Field(() => String, { nullable: true })
  body?: string | null;

  @Field(() => Int)
  order!: number;

  @Field(() => AcademyContentStatus)
  status!: AcademyContentStatus;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;
}

@ObjectType()
export class AcademySession {
  @Field(() => ID)
  id!: string;

  @Field(() => ID)
  weekId!: string;

  @Field(() => String)
  title!: string;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => Int)
  order!: number;

  @Field(() => AcademyContentStatus)
  status!: AcademyContentStatus;

  @Field(() => [AcademyContentBlock])
  contentBlocks!: AcademyContentBlock[];

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;
}

@ObjectType()
export class AcademyWeek {
  @Field(() => ID)
  id!: string;

  @Field(() => ID)
  courseId!: string;

  @Field(() => String)
  title!: string;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => Int)
  order!: number;

  @Field(() => AcademyContentStatus)
  status!: AcademyContentStatus;

  @Field(() => [AcademySession])
  sessions!: AcademySession[];

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;
}

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

  @Field(() => Boolean)
  isActive!: boolean;

  @Field(() => [AcademyWeek])
  weeks!: AcademyWeek[];

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;
}

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
}

@InputType()
export class UpdateAcademyCourseInput {
  @Field(() => String)
  @IsString()
  title!: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

@InputType()
export class CreateAcademyWeekInput {
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
  order!: number;
}

@InputType()
export class UpdateAcademyWeekInput {
  @Field(() => String)
  @IsString()
  title!: string;

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
}

@InputType()
export class CreateAcademySessionInput {
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
  order!: number;
}

@InputType()
export class UpdateAcademySessionInput {
  @Field(() => String)
  @IsString()
  title!: string;

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
}

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
  body?: string;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  order!: number;
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
  body?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  order?: number;

  @Field(() => AcademyContentStatus, { nullable: true })
  @IsOptional()
  @IsEnum(AcademyContentStatus)
  status?: AcademyContentStatus;
}
