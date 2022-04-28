import { ObjectType, Field, ID, Int } from "type-graphql";

@ObjectType()
export class Media {
  @Field(() => ID)
  id!: number;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  type!: string;

  @Field(() => String)
  url!: string;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Int)
  ticketId!: number;
}
