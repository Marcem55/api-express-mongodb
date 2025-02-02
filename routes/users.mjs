import express from "express";
import jwt, { decode } from "jsonwebtoken";
import Joi from "joi";
import "dotenv/config";
import {
  createUser,
  disableUser,
  getUsers,
  updateUser,
} from "../controllers/userController.mjs";
import { verifyToken } from "../middlewares/auth.mjs";

const userRoute = express.Router();

const schema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});

userRoute.get("/", verifyToken, async (req, res) => {
  try {
    const result = await getUsers();
    res.json(result);
  } catch (error) {
    return res.status(400).json(error);
  }
});

userRoute.post("/", async (req, res) => {
  try {
    // Validar los datos de entrada
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    // Crear el usuario
    const { error, value } = schema.validate({ name, email, password });
    if (!error) {
      const result = await createUser(req.body);
      res.json({
        name: result.name,
        email: result.email,
      });
    } else {
      res.status(400).json(error);
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

userRoute.put("/:email", verifyToken, async (req, res) => {
  try {
    const email = req.params.email;
    const { name, password } = req.body;
    if (!email || !name || !password) {
      return res.status(400).json({ error: "Parameters missing" });
    }

    const { error, value } = schema.validate({ name, email, password });
    if (!error) {
      const result = await updateUser(email, req.body);
      res.json({
        name: result.name,
        email: result.email,
      });
    } else {
      res.status(400).json(error);
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

userRoute.delete("/:email", verifyToken, async (req, res) => {
  try {
    const email = req.params.email;
    if (!email) {
      return res.status(400).json({ error: "Parameter email is missing" });
    }

    const result = await disableUser(email);
    res.json({
      name: result.name,
      email: result.email,
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

export { userRoute };
