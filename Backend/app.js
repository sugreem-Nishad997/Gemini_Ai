import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import messageRoutes from "./routes/messageRoutes.js";

dotenv.config();
const PORT = process.env.PORT || 8080;
const dbURL = process.env.ATLASDB_URL;
const frontend = process.env.FRONTEND_URL;
const app = express();

main()
.then(() => {
    console.log("Connect to DB");
})
.catch(e => console.log(e));

async function main() {
    await mongoose.connect(dbURL);
}

app.use(cors({
    origin: frontend,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }))

app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use(userRoutes);
app.use(messageRoutes);


app.listen(PORT, () => {
    console.log("App is listening at port 8080");
});