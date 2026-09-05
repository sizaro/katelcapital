import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
@InputType() export class LoginInput { @Field() @IsEmail() @MaxLength(254) email!: string; @Field() @IsString() @MinLength(8) @MaxLength(200) password!: string; }
@ObjectType() export class AuthUser { @Field() id!: string; @Field() email!: string; @Field() firstName!: string; @Field() lastName!: string; @Field() role!: string; @Field(() => [String]) permissions!: string[]; }
@ObjectType() export class AuthPayload { @Field() accessToken!: string; @Field(() => AuthUser) user!: AuthUser; }
