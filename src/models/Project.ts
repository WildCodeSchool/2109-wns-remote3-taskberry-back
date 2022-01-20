import { ObjectType, Field, ID } from 'type-graphql';
import { UsersProject } from './UsersProject';

@ObjectType()
export class Project {
  @Field(() => ID)
  id!: number;

  @Field()
  name!: string;

  @Field()
  description?: string;

  @Field(() => Date)
  createdAt?: Date;

  @Field(() => Date)
  finishedAt?: Date | null;

  @Field(() => Date)
  estimateEndAt?: Date;

  @Field(() => UsersProject)
  UsersInProject?: UsersProject
}
