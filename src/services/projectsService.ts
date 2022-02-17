import { Project } from "../models/project/Project";
import { UserProjects } from "../models/project/UserProjects";
import projectsRepository from "../repositories/projectsRepository";
import { ProjectInput } from "../inputs/project/ProjectInput";
import { NewMembersInput } from '../inputs/project/newMembersInput';

const projectService = {
  create: (projectInput: ProjectInput): Promise<Project> => {
    const { title } = projectInput;

    if (!title) {
      throw new Error("Title is required");
    }

    if (title.length > 30) {
      throw new Error("Title should have at least one character and max 30");
    }

    return projectsRepository.create(projectInput);
  },

  addProjectMember: (
    data: [NewMembersInput]
  ): Promise<number> => {
    // const { role, userId, projectId } = data;

    // if (!role) {
    //   throw new Error("Role ID is required");
    // }

    // if (!userId) {
    //   throw new Error("User ID is required");
    // }

    // if (!projectId) {
    //   throw new Error("Project ID is required");
    // }

    return projectsRepository.addMembers(data);
  },

  getUserProjects: (userId: number): Promise<UserProjects[]> => {
    if (!userId) {
      throw new Error("User ID is required");
    }

    return projectsRepository.findUserProjects(userId);
  },

  getProjectById: (id: number): Promise<Project | null> => {
    if (!id) {
      throw new Error("Project ID is required");
    }
    return projectsRepository.findById(id);
  },

  deleteProject: (id: number): Promise<number> => {
    if (!id) {
      throw new Error("Project ID is required");
    }
    return projectsRepository.delete(id);
  },
};

export default projectService;
