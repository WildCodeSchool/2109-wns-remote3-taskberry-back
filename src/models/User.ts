import "reflect-metadata";
import { InputType, Field, ObjectType } from "type-graphql";
import { IsEmail } from "class-validator";

@InputType()
export class UserMutation {
  @Field(() => String)
  id?: number;

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
