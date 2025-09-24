import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Impossible de récupérer les users !" });
  }
};  

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) }
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

const createUser = async (req, res) => {
  const { email, name, phoneNumber, password, role, establishment, speciality } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await prisma.user.create({
      data: { email, name, phoneNumber, password: hashedPassword, role, establishment, speciality }
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, name, phoneNumber, password, role, establishment, speciality } = req.body;

  try {
    const dataToUpdate = {};

    if(email) dataToUpdate.email = email;
    if(name) dataToUpdate.name = name;
    if(phoneNumber) dataToUpdate.phoneNumber = phoneNumber;
    if(password) dataToUpdate.password = await bcrypt.hash(password, 10);
    if(role) dataToUpdate.role = role;
    if(establishment) dataToUpdate.establishment = establishment;
    if(speciality) dataToUpdate.speciality = speciality;

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: dataToUpdate
    });
    
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({
      where: { id: parseInt(id) }
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};

export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};