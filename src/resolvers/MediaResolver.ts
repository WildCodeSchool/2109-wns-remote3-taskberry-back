import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Media } from "../models/Media";
import mediaService from "../services/mediaService";
import { MediaInput } from "../inputs/MediaInput";

@Resolver((of) => Media)
export class MediaResolver {
  @Query(() => [Media])
  async getTicketMedia(@Arg("ticketId") ticketId: number) {
    return await mediaService.getTicketMedia(ticketId);
  }

  @Mutation(() => Media)
  async createMedia(@Arg("mediaInput") mediaInput: MediaInput) {
    return await mediaService.create(mediaInput);
  }

  @Mutation(() => Number)
  async deleteMedia(@Arg("mediaId") mediaId: number) {
    return await mediaService.delete(mediaId);
  }
}