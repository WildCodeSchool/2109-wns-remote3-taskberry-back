import { InputType, Field } from "type-graphql";
import { UsersProjectInput } from "./UsersProjectInput";

@InputType()
export class ProjectInput {
  @Field()
  name!: string;

  @Field()
  description!: string;

  @Field()
  createdAt!: Date;

  @Field()
  estimateEndAt!: Date;

  @Field(() => UsersProjectInput)
  UsersInProject!: UsersProjectInput;
}