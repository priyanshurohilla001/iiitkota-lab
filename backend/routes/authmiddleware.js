import express from "express";
import jwt from "jsonwebtoken";

const authmiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const data = jwt.verify(token, process.env.jwtkey);

    if (req.body.email == data.email) {
      next();
    } else {
      return res.status(469).send("Please login again)");
    }
  } catch (error) {
    return res
      .status(469)
      .send("Some other error occurred in your token so login again");
  }
};

export default authmiddleware;
