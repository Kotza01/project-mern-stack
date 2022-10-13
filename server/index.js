import express, { application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import Postroutes from "./routes/posts.js";
import usersRoutes from "./routes/users.js";

/**Initialize express framework */
const app = express();
dotenv.config();

/**Set parser for jason body when get information for client and url code */
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
/**Set cors for transfer data between server and client */
app.use(cors());

app.use("/posts", Postroutes);
app.use("/users", usersRoutes);

/**Url to connect data base */
/* const URL_CONNECTION =
  "mongodb+srv://luismermproject:luismermproject123@cluster0.zu5dtq3.mongodb.net/?retryWrites=true&w=majority"; */
const PORT = process.env.PORT || 5000;

/**Connect to dataBase, if successfully, listen in port, if not, error message to console */
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`server running in port ${PORT}`))
  )
  .catch((err) => console.log(err));
