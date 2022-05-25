import "reflect-metadata";
import { InputType, Field, ObjectType, ID } from "type-graphql";
import { IsEmail } from "class-validator";

@InputType()
export class UserMutation {
  @Field(() => String)
  profilePicture!: string;

  @Field(() => String)
  firstName!: string;

  @Field(() => String)
  lastName!: string;

  @Field()
  @IsEmail()
  email!: string;

  @Field()
  password!: string;
}

@ObjectType()
export class UserQuery {
  @Field(() => ID)
  id!: number;

  @Field(() => String)
  profilePicture!: string;

  @Field(() => String)
  firstName!: string;

  @Field(() => String)
  lastName!: string;

  @Field()
  @IsEmail()
  email!: string;
}

@ObjectType()
export class UserComment {
  @Field(() => String)
  profilePicture!: string;

  @Field(() => String)
  firstName!: string;
}
