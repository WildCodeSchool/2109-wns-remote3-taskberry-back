import { InputType, Field } from "type-graphql";
import { MembersInput } from "./MembersInput";

@InputType()
export class ProjectInput {
  @Field()
  title!: string;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  estimateEndAt!: Date;

  @Field(() => MembersInput)
  members!: MembersInput;
}
