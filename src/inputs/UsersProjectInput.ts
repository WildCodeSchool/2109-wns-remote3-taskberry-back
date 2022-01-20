import { InputType, Field, Int } from "type-graphql";

@InputType()
export class UsersProjectInput {
  @Field(() => Int)
  userId!: number;

  @Field(() => Int)
  roleId!: number;
}
