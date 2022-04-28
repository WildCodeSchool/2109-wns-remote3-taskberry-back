import { InputType, Field, Int } from "type-graphql";

@InputType()
export class MediaInput {
  @Field(() => String)
  name!: string;

  @Field(() => String)
  type!: string;

  @Field(() => String)
  url!: string;

  @Field(() => Int)
  ticketId!: number;

  @Field(() => Date)
  createdAt!: Date;
}
