import { InputType, Field, Int } from "type-graphql";

@InputType()
export class NewMembersInput {
  @Field(() => Int)
  projectId!: number;

  @Field(() => Int)
  userId!: number;

  @Field()
  role!: string;
}
