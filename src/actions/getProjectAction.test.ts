import { PrismaClient } from "@prisma/client";
import createProjectAction from "./createProjectAction";
import getProjectAction from "./getProjectAction";
import getUsersProject from "./getUsersProjectAction";
import createUserAction from "./createUserAction";
import createRoleAction from "./createRoleAction";
const faker = require("@faker-js/faker");

type savedProjectType = {
    id: number,
    name: string,
    description: string | null,
    createdAt: Date,
    estimateEndAt: Date | null,
};
  
type savedUserType = {
    id: number,
    profilePicture: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
}

type savedRoleType = {
    id: number,
    name: string
}

const initialValues = {
    name : faker.internet.domainName(),
     description : faker.random.words(10),
     createdAt :  faker.date.recent(),
    estimateEndAt: faker.date.future(),
     profilePicture :faker.image.people(500, 500),
    firstName: faker.name.firstName(),
     lastName : faker.name.lastName(),
     password : faker.internet.password(),
}

const prisma = new PrismaClient();
afterAll(() => {
  return expect(prisma.$disconnect()).resolves;
});

let savedProject: savedProjectType;
let savedUser: savedUserType;
let savedRole: savedRoleType;
beforeAll(async () => {
    const { name, description, createdAt, estimateEndAt, profilePicture, firstName, lastName, password } = initialValues
     savedProject = await createProjectAction({
        prisma,
        name,
        description,
        createdAt,
        estimateEndAt,
     });
    
     const email = faker.internet.email(firstName, lastName);
       
    savedUser = await createUserAction({
         prisma,
         profilePicture,
         firstName,
         lastName,
         email,
         password,
    });

     savedRole = await createRoleAction({
        prisma,
        name:faker.random.word(),
      });
} )

describe("project action - unit", () => {
    const { name, description, createdAt, estimateEndAt, profilePicture, firstName, lastName} = initialValues
    it("get project from an existing project", async () => {
      const projectId= savedProject.id;
      const getProject = await getProjectAction({
        prisma,
        projectId,
      });
        
      const project = {
          projectId,
          name,
          description,
          createdAt,
          estimateEndAt
      };
        expect(getProject).toBeTruthy();
        expect(getProject).toEqual(
            expect.objectContaining({
              id: project.projectId,
                name: project.name,
                description: project.description,
            })
        );
    });
  
    it('should return an empty array from an existing project without users assignee', async () => { 
        const projectId = savedProject.id;
        const getUserByProjectId = await getUsersProject({
        prisma,
        projectId,
        });
        expect(getUserByProjectId).toEqual(expect.arrayContaining([]));
    })
    
    it('should return an array of user from an existing project with users assignee ', async () => { 
        const projectId= savedProject.id;
        const userId = savedUser.id
        const roleId = savedRole.id
      await prisma.usersInProjects.create({
            data: {
            userId,
            projectId,
            roleId,
            },
          });
        
        const getUserByProjectId = await getUsersProject({
        prisma,
        projectId,
        });

        const userProject = {
            firstName,
            lastName,
            profilePicture,
        }
        expect(getUserByProjectId).toEqual(expect.arrayContaining([expect.objectContaining(userProject),]));
     })
    it("get null from a non-existing project", async () => {
      const projectId = faker.mersenne.rand(100000000, 999999999);
      const project = await getProjectAction({
        prisma,
        projectId,
      });
  
      expect(project).toBeNull();
    });
  });