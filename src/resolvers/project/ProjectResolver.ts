import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Project } from "../../models/project/Project";
import { UserProjects } from "../../models/project/UserProjects";
import { ProjectInput } from "../../inputs/project/ProjectInput";
import projectService from "../../services/projectsService";
import { NewMembersInput } from '../../inputs/project/newMembersInput';

@Resolver((of) => Project)
export class ProjectResolver {
  @Mutation(() => Project)
  async createProject(@Arg("projectInput") projectInput: ProjectInput) {
    return await projectService.create(projectInput);
  }

  @Mutation(() => Number)
  async addProjectMembers(@Arg("memberInput", type => [NewMembersInput!]!) memberInput: [NewMembersInput]) {
    return await projectService.addProjectMember(memberInput);
  }

  @Query(() => [UserProjects])
  async getUserProjects(@Arg("userId") userId: number) {
    return await projectService.getUserProjects(userId);
  }

  @Query(() => Project)
  async getProjectById(@Arg("projectId") id: number) {
    return await projectService.getProjectById(id);
  }

  @Mutation(() => Number)
  async deleteProject(@Arg("projectId") id: number) {
    return await projectService.deleteProject(id);
  }
}
