import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import cors from "cors";
import bodyParser from "body-parser";

import connectDb from "./connectionAndDatabase/connection.js";
import route from "./router/note.router.js";

const port = process.env.PORT || 5000;
const uri = process.env.mongodb_uri;
const dbName = process.env.DATABASE_NAME;

//using middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/api", route);

// call  to run connection function from above
connectDb(port, uri, dbName, app);
