// import { PrismaClient } from "@prisma/client";

// import dotenv from "dotenv";

// dotenv.config({ path: "../.env" });

// console.log("DATABASE_URL:", process.env.DATABASE_URL);

// let prisma: PrismaClient;
// declare global {
//   // eslint-disable-next-line no-var
//   var __db: PrismaClient | undefined;
// }

// if (process.env.ENVIRONMENT === "production") {
//   prisma = new PrismaClient();
//   prisma.$connect();
// } else {
//   if (!global.__db) {
//     global.__db = new PrismaClient();
//     global.__db.$connect();
//   }
//   prisma = global.__db;
// }

// export default prisma;
