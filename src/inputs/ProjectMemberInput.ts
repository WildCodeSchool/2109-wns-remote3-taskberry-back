import { InputType, Field, Int } from "type-graphql";

@InputType()
export class ProjectMemberInput {
  @Field(() => Int)
  userId!: number;

  @Field(() => Int)
  roleId!: number;

  @Field(() => Int)
  projectId!: number;
}
