import { InputType, Field, Int } from "type-graphql";

@InputType()
export class CommentInput {
  @Field(() => String)
  description!: string;

  @Field(() => Int)
  userId!: number;

  @Field(() => Int)
  ticketId!: number;

  @Field(() => Date)
  createdAt!: Date;
}

@InputType()
export class PartialUpdateCommentInput {
  @Field()
  id!: number;

  @Field(() => String)
  description!: string;
}
