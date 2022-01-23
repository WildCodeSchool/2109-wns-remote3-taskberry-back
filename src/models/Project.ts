import { ObjectType, Field, ID } from "type-graphql";
import { UsersProject } from "./UsersProject";

@ObjectType()
export class Project {
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

  @Field(() => Date, { nullable: true })
  estimateEndAt!: Date | null;

  @Field(() => UsersProject)
  UsersInProject?: UsersProject;
}
