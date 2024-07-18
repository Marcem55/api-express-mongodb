import express from "express";
import { createUser, updateUser } from "../controllers/userController.mjs";

const userRoute = express.Router();

userRoute.get("/", (req, res) => {
  res.json("Get users ready");
});

userRoute.post("/", async (req, res) => {
  try {
    // Validar los datos de entrada
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    // Crear el usuario
    const result = await createUser(req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error });
  }
});

userRoute.put("/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const { name, password } = req.body;
    if (!email || !name || !password) {
      return res.status(400).json({ error: "Parameters missing" });
    }

    const result = await updateUser(email, req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error });
  }
});

export { userRoute };
