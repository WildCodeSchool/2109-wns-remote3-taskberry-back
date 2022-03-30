import { ObjectType, Field, ID, Int } from "type-graphql";

@ObjectType()
export class Comment {
  @Field(() => ID)
  id!: number;

  @Field(() => String)
  description!: string;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Int)
  ticketId!: number;

  @Field(() => Int)
  userId!: number;
}
