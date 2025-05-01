import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { notFound, errorHandler } from './coreMiddlewares/errorMiddlewares.js';
import studentRoutes from "./apiControllers/userRoutes.js";
import assignmentRoutes from "./apiControllers/assignmentRoutes.js";
import progressRoutes from "./apiControllers/progressRoutes.js";
import questionRoutes from './apiControllers/questionRoutes.js';
import connectDB from "./infrastructure/db.js";

dotenv.config();
const port = process.env.PORT
const app = express();

connectDB();

app.use(cors()); 
app.use(bodyParser.json());
app.use(express.json());

app.use("/app/student", studentRoutes);
app.use("/app/assignment", assignmentRoutes);


app.use(notFound);
app.use(errorHandler);


app.listen(port, () => console.log(`Server started at port ${port}`));
