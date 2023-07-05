require("dotenv").config();
import express, { json, urlencoded } from "express";
const app = express();
import routes from "./routes";
const port = process.env.PORT || 3000;
import cors from "cors";

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/", routes);

app.listen(port, () => {
   console.log(`run http://localhost:${port}/`);
});
