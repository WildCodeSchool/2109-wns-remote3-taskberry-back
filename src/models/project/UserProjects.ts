import { ObjectType, Field, ID } from "type-graphql";
import { ProjectMembers } from "../ProjectMembers";

@ObjectType()
export class UserProjects {
  @Field(() => ID)
  id!: number;

  @Field()
  title!: string;

  @Field(() => String, { nullable: true })
  description!: string | null;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  estimateEndAt?: Date;

  @Field(() => [ProjectMembers])
  members!: ProjectMembers[];

}
