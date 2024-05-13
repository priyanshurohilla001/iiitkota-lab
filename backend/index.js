import express from "express";
import cors from "cors";
import mainRouter from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1", mainRouter);
app.use("/", (req, res) => {
  res.send("Welcome to the IIIT API");
});

app.listen(3000, () => {
  console.log("Server started at port 3000");
});
