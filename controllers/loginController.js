import { PrismaClient} from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email }
    });


    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ userId: user.id, role: user.role }, 'your_jwt_secret', { expiresIn: '10m' });
      res.json({ message: "Login successful", user, token });
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
}

export default { login };