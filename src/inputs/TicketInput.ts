import { InputType, Field, Int } from "type-graphql";
import { Length } from "class-validator";

@InputType()
export class TicketInput {
  @Field()
  name!: string;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Int)
  projectId!: number;

  @Field(() => Int)
  statusId!: number;

  @Field(() => Int)
  assigneeId!: number;
}

@InputType()
export class PartialUpdateTicketInput {
  @Field()
  id!: number;

  @Field(() => String, { nullable: true })
  @Length(0, 29)
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => Date, { nullable: true })
  finishedAt?: Date | null;

  @Field(() => Int, { nullable: true } )
  statusId?: number;

  @Field(() => Int, { nullable: true } )
  projectId?: number;

  @Field(() => Int, { nullable: true } )
  assigneeId?: number;
}

