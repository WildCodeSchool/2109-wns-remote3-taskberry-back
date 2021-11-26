import "reflect-metadata";
import { ObjectType, Field, ID } from "type-graphql";
import { IsEmail } from "class-validator";

@ObjectType()
export class User {
  @Field(() => ID)
  id!: number;

  @Field(() => String)
  profilePicture?: string;

  @Field(() => String)
  firstName?: string;

  @Field(() => String)
  lastName?: string;

  @Field()
  @IsEmail()
  email!: string;

  @Field(() => String)
  password!: string;
}
