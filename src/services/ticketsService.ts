// import { Ticket } from "@prisma/client";
// import { TicketInput } from "../inputs/TicketInput";
// import ticketsRepository from "../repositories/ticketsRepository";


// const ticketService = {
//   create: (ticketInput: TicketInput): Promise<Ticket> => {
//     const { name } = ticketInput;

//     if (!name) {
//       throw new Error("Name is required");
//     }

//     if (name.length > 30) {
//       throw new Error("Name should have at least one character and max 30");
//     }

//     return ticketsRepository.create(ticketInput);
//   }
// }

// export default ticketService;
