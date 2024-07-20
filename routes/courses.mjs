import express from "express";
import Joi from "joi";
import {
  createCourse,
  disableCourse,
  getCourses,
  updateCourse,
} from "../controllers/courseController.mjs";
import { verifyToken } from "../middlewares/auth.mjs";

const courseRoute = express.Router();

const schema = Joi.object({
  title: Joi.string().min(3).max(20).required(),
  description: Joi.string().min(10).max(100),
});

courseRoute.get("/", verifyToken, async (req, res) => {
  try {
    const result = await getCourses();
    res.json(result);
  } catch (error) {
    return res.status(400).json(error);
  }
});

courseRoute.post("/", verifyToken, async (req, res) => {
  try {
    // Validar los datos de entrada
    const { title, description } = req;
    if (!title || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }
    // Crear el usuario
    const { error, value } = schema.validate({ title, description });
    if (!error) {
      const result = await createCourse(req);
      res.json(result);
    } else {
      res.status(400).json(error);
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

courseRoute.put("/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: "Parameters missing" });
    }

    const { error, value } = schema.validate({ title, description });
    if (!error) {
      const result = await updateCourse(id, req.body);
      res.json(result);
    } else {
      res.status(400).json(error);
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

courseRoute.delete("/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: "Parameter id is missing" });
    }

    const result = await disableCourse(id);
    res.json(result);
  } catch (error) {
    res.status(400).json(error);
  }
});

export { courseRoute };
