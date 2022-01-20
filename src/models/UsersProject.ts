import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
export class UsersProject {
  @Field(() => Int)
  userId!: number;

  @Field(() => Int)
  projectId!: number;

  @Field(() => Int)
  roleId!: number;
}
