import { InputType, Field, Int } from "type-graphql";

@InputType()
export class MembersInput {
  @Field(() => Int)
  userId!: number;

  @Field()
  role!: string;
}
