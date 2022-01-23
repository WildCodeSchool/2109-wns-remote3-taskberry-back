import { PrismaClient } from "@prisma/client";
import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Project } from "../models/Project";
import projectService from "../services/projectsService";
import { ProjectInput } from "../inputs/ProjectInput";
import { ProjectMemberInput } from "../inputs/ProjectMemberInput";
import { UsersProject } from "../models/UsersProject";

const prisma = new PrismaClient();

@Resolver((of) => Project)
export class ProjectResolver {
  @Mutation(() => Project)
  async createProject(@Arg("projectInput") projectInput: ProjectInput) {
    return await projectService.create(projectInput);
  }

  @Mutation(() => UsersProject)
  async addProjectMember(@Arg("memberInput") memberInput: ProjectMemberInput) {
    return await projectService.addProjectMember(memberInput);
  }

  @Query(() => [Project])
  async getProjects() {
    return prisma.project.findMany();
  }

  @Query(() => [Project])
  async getUserProjects(@Arg("userId") userId: number) {
    return await projectService.getUserProjects(userId);
  }
  
  @Query(() => Project)
  async getProjectById(@Arg("projectId") projectId: number) {
    return await projectService.getProjectById(projectId);
  }
}
