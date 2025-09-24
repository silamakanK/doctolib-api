import { PrismaClient } from "@prisma/client";
import express from "express";

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', (req, res) => {
  const users = prisma.user.findMany();
  res.json({ message: 'Welcome to the Doctolib API'});
});

export default router;