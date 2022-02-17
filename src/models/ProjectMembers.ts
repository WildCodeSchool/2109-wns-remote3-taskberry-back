import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class MemberInfo {
  @Field()
  firstName!: string;

  @Field()
  lastName!: string;

  @Field()
  profilePicture!: string;

}

@ObjectType()
export class ProjectMembers {
  @Field()
  role!: string;

  @Field(() => MemberInfo)
  user!: MemberInfo;
}
