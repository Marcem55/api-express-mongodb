import express from "express";

const courseRoute = express.Router();

courseRoute.get("/", (req, res) => {
  res.json("Get courses ready");
});

export { courseRoute };
