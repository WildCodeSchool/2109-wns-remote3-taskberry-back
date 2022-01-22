import { InputType, Field, Int } from "type-graphql";

@InputType()
export class TicketInput {
  @Field()
  name!: string;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Int)
  projectId!: number;

  @Field(() => Int)
  statusId!: number;

  @Field(() => Int)
  assigneeId!: number;
}
