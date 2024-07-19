import express from "express";
import User from "../models/userModel.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const authRoute = express.Router();

authRoute.post("/", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(400).json({
        error: true,
        message: "Wrong user or password",
      });
    } else {
      const validPassword = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (validPassword) {
        const token = jwt.sign(
          {
            data: {
              _id: user.id,
              name: user.name,
              email: user.email,
            },
          },
          process.env.SECRET_KEY,
          { expiresIn: process.env.EXPIRES }
        );
        // jwt.sign(
        //   {
        //     _id: user.id,
        //     name: user.name,
        //     email: user.email,
        //   },
        //   "accessToken"
        // );
        res.json({
          id: user.id,
          name: user.name,
          email: user.email,
          token,
        });
      } else {
        return res.status(400).json({
          error: true,
          message: "Wrong user or password",
        });
      }
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

export { authRoute };
