import { Project } from "../models/Project";
import projectsRepository from "../repositories/projectsRepository";
import { ProjectInput } from "../inputs/ProjectInput";
import { ProjectMemberInput } from "../inputs/ProjectMemberInput";
import { UsersProject } from "../models/UsersProject";

const projectService = {
  create: (projectInput: ProjectInput): Promise<Project> => {
    const { name } = projectInput;

    if (!name) {
      throw new Error("Name is required");
    }

    if (name.length > 30) {
      throw new Error("Name should have at least one character and max 30");
    }

    return projectsRepository.create(projectInput);
  },

  addProjectMember: (
    memberInput: ProjectMemberInput
  ): Promise<UsersProject> => {
    const { roleId, userId, projectId } = memberInput;

    if (!roleId) {
      throw new Error("Role ID is required");
    }

    if (!userId) {
      throw new Error("User ID is required");
    }

    if (!projectId) {
      throw new Error("Project ID is required");
    }

    return projectsRepository.addProjectMember(memberInput);
  },

  getUserProjects: (userId: number): Promise<Project[]> => {
    if (!userId) {
      throw new Error("User ID is required");
    }

    return projectsRepository.getUserProjects(userId);
  },
};

export default projectService;
