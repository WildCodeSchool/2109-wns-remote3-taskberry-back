import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Comment } from "../models/Comment";
import {
  CommentInput,
  PartialUpdateCommentInput,
} from "../inputs/CommentInput";
import commentService from "../services/commentService";

@Resolver((of) => Comment)
export class CommentResolver {
  @Query(() => [Comment])
  async getTicketComments(
    @Arg("ticketId") ticketId: number,
    @Arg("userId") userId: number
  ) {
    return await commentService.getTicketComments(ticketId, userId);
  }

  @Mutation(() => Comment)
  async createComment(
    @Arg("commentInput") commentInput: CommentInput,
    @Arg("userId") userId: number
  ) {
    return await commentService.create(commentInput, userId);
  }

  @Mutation(() => Comment)
  async updateComment(
    @Arg("partialInput") partialInput: PartialUpdateCommentInput,
    @Arg("userId") userId: number
  ) {
    return await commentService.update(partialInput, userId);
  }

  @Mutation(() => Number)
  async deleteComment(
    @Arg("commentId") commentId: number,
    @Arg("userId") userId: number
  ) {
    return await commentService.delete(commentId, userId);
  }
}
