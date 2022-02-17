import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class Project {
  @Field(() => ID)
  id!: number;

  @Field()
  title!: string;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  estimateEndAt!: Date;

}
