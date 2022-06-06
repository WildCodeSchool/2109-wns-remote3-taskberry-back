import { Project } from "../models/Project";
import projectsRepository from "../repositories/projectsRepository";
import { ProjectInput } from "../inputs/ProjectInput";
import { ProjectMemberInput } from "../inputs/ProjectMemberInput";
import { UsersProject } from "../models/UsersProject";
import { UserQuery } from "../models/User";
import isRoleAdmin from "../helpers/isRoleAdmin";
import { PrismaClient } from "@prisma/client";
import isUserAdminOfProject from "../helpers/isUserAdminOfProject";

const prisma = new PrismaClient();

const projectService = {
  create: async (projectInput: ProjectInput): Promise<Project> => {
    const { name } = projectInput;
    const { roleId, userId } = projectInput.UsersInProject;

    if (!name) {
      throw new Error("Name is required");
    }

    if (name.length > 30) {
      throw new Error("Name should have at least one character and max 30");
    }

    if (!(roleId || userId)) {
      throw new Error("At least one user with a role is required");
    }

    if (!(await isRoleAdmin(roleId))) {
      throw new Error("User creating a project should have admin role");
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

  delete: async (projectId: number, userId: number): Promise<Number> => {
    const isProjectExists = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!projectId) {
      throw new Error("Project ID is required");
    }

    if (!userId) {
      throw new Error("User ID is required");
    }

    if (!projectId) {
      throw new Error("Project ID is required");
    }

    if (!isProjectExists) {
      throw new Error("Project doesn't exist");
    }

    if (!(await isUserAdminOfProject(projectId, userId))) {
      throw new Error("User is not the project Administrator");
    }

    return projectsRepository.delete(projectId);
  },

  getUserProjects: (userId: number): Promise<Project[]> => {
    if (!userId) {
      throw new Error("User ID is required");
    }

    return projectsRepository.getUserProjects(userId);
  },

  getProjectById: (projectId: number): Promise<Project | null> => {
    if (!projectId) {
      throw new Error("Project ID is required");
    }
    return projectsRepository.getProjectById(projectId);
  },

  getProjectUsers: (projectId: number): Promise<UserQuery[] | []> => {
    if (!projectId) {
      throw new Error("Project ID is required");
    }

    return projectsRepository.getProjectUsers(projectId);
  },
};

export default projectService;
