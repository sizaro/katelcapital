import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsInt, Min } from 'class-validator';

@ObjectType()
export class AcademyFeeSettings {
  @Field(() => Int)
  firstTimeRegistrationFee!: number;

  @Field(() => Int)
  reEnrollmentFee!: number;

  @Field(() => Int)
  byuPathwayFee!: number;
}

@InputType()
export class UpdateAcademyFeeSettingsInput {
  @Field(() => Int)
  @IsInt()
  @Min(0)
  firstTimeRegistrationFee!: number;

  @Field(() => Int)
  @IsInt()
  @Min(0)
  reEnrollmentFee!: number;

  @Field(() => Int)
  @IsInt()
  @Min(0)
  byuPathwayFee!: number;
}
