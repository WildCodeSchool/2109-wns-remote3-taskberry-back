import { InputType, Field } from "type-graphql";
import { UsersProjectInput } from "./UsersProjectInput";

@InputType()
export class ProjectInput {
  @Field()
  name!: string;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date, { nullable: true })
  estimateEndAt?: Date | null;

  @Field(() => UsersProjectInput)
  user!: UsersProjectInput;
}
