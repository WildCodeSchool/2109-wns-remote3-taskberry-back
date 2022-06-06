import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Media } from "../models/Media";
import mediaService from "../services/mediaService";
import { MediaInput } from "../inputs/MediaInput";

@Resolver((of) => Media)
export class MediaResolver {
  @Query(() => [Media])
  async getTicketMedia(
    @Arg("ticketId") ticketId: number,
    @Arg("userId") userId: number
  ) {
    return await mediaService.getTicketMedia(ticketId, userId);
  }

  @Mutation(() => Media)
  async createMedia(
    @Arg("mediaInput") mediaInput: MediaInput,
    @Arg("userId") userId: number
  ) {
    return await mediaService.create(mediaInput, userId);
  }

  @Mutation(() => Number)
  async deleteMedia(
    @Arg("mediaId") mediaId: number,
    @Arg("userId") userId: number
  ) {
    return await mediaService.delete(mediaId, userId);
  }
}
