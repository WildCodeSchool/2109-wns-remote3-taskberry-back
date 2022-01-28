import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class UsersProject {
  @Field(() => String)
  firstName!: string;

  @Field(() => String)
  lastName!: string;
}
