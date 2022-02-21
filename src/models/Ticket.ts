import { ObjectType, Field, ID, Int } from "type-graphql";

@ObjectType()
export class Ticket {
  @Field(() => ID)
  id!: number;

  @Field()
  name!: string;

  @Field(() => String, { nullable: true })
  description!: string | null;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date, { nullable: true })
  finishedAt!: Date | null;

  @Field(() => Int)
  projectId!: number;

  @Field(() => Int)
  statusId!: number;

  @Field(() => Int)
  assigneeId!: number;
}
