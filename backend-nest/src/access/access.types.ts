import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsArray, IsIn, IsOptional, IsString, Matches, MinLength } from 'class-validator';

@ObjectType()
export class AccessPermission {
  @Field() id!: string;
  @Field() key!: string;
  @Field({ nullable: true }) description?: string;
}

@ObjectType()
export class AccessRole {
  @Field() id!: string;
  @Field() name!: string;
  @Field() displayName!: string;
  @Field({ nullable: true }) description?: string;
  @Field() isSystem!: boolean;
  @Field(() => [String]) permissionKeys!: string[];
  @Field() userCount!: number;
}

@ObjectType()
export class PermissionOverrideView {
  @Field() permission!: string;
  @Field() effect!: string;
  @Field({ nullable: true }) reason?: string;
}

@ObjectType()
export class AccessUser {
  @Field() id!: string;
  @Field() email!: string;
  @Field() firstName!: string;
  @Field() lastName!: string;
  @Field() status!: string;
  @Field() roleId!: string;
  @Field() role!: string;
  @Field(() => [String]) effectivePermissions!: string[];
  @Field(() => [PermissionOverrideView]) overrides!: PermissionOverrideView[];
}

@InputType()
export class CreateRoleInput {
  @Field() @IsString() @Matches(/^[A-Z][A-Z0-9_]*$/) name!: string;
  @Field() @IsString() @MinLength(2) displayName!: string;
  @Field({ nullable: true }) @IsOptional() @IsString() description?: string;
  @Field(() => [String], { defaultValue: [] }) @IsArray() permissionKeys!: string[];
}

@InputType()
export class SetRolePermissionsInput {
  @Field() @IsString() roleId!: string;
  @Field(() => [String]) @IsArray() permissionKeys!: string[];
}

@InputType()
export class AssignUserRoleInput {
  @Field() @IsString() userId!: string;
  @Field() @IsString() roleId!: string;
}

@InputType()
export class SetPermissionOverrideInput {
  @Field() @IsString() userId!: string;
  @Field() @IsString() permissionKey!: string;
  @Field() @IsIn(['GRANT', 'DENY']) effect!: string;
  @Field({ nullable: true }) @IsOptional() @IsString() reason?: string;
}

@InputType()
export class RemovePermissionOverrideInput {
  @Field() @IsString() userId!: string;
  @Field() @IsString() permissionKey!: string;
}
