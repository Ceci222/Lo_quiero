import express from "express";
import dotenv from "dotenv";
import router from "../routes/api/apiRouter.js";

dotenv.config();

const APP_PORT = process.env.APP_PORT;
const app = express();

app.use("/",router);

app.get('/test', (req, res) => {  
    res.send('¡Funciona!');
});

app.listen(3000, '0.0.0.0', () => { //TODO: verificar sin los ceros
    console.log(`Backend conectado al puerto ${APP_PORT}`);
});

