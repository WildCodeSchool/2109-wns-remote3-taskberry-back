// import { PrismaClient } from "@prisma/client";
// import { TicketInput } from "../inputs/TicketInput";
// import { Ticket } from "../models/Ticket";

// const prisma = new PrismaClient();

// const ticketsRepository = {
//   create: async (ticketInput: TicketInput): Promise<Ticket> => {
//     const { name, description, createdAt, projectId, assigneeId, statusId } =
//       ticketInput;
//     return await prisma.ticket.create({
//       data: {
//         name,
//         description,
//         createdAt,
//         projectId,
//         statusId,
//         assigneeId
//       },
//     });
//   },
// };

// export default ticketsRepository;
