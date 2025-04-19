import express from "express";
import dotenv from "dotenv";

dotenv.config();

const APP_PORT = process.env.APP_PORT;
const app = express();

app.listen(APP_PORT, () => {
    console.log(`Backend conectado al puerto ${APP_PORT}`);
});

