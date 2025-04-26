import express from "express";
import dotenv from "dotenv";
import router from "../routes/api/apiRouter.js";
import '../models/associations.js';

dotenv.config();

const APP_PORT = process.env.APP_PORT;
const app = express();



app.get('/test', (req, res) => {  
    res.send('¡Funciona!');
}); 

app.use(express.json()); // para API (formato json)
app.use(express.urlencoded({extended:true})); // para Vistas (formato formulario)

app.use("/",router); //importante, va después del middleware o el cuerpo de la solcitud viene vacía y da error 500

app.listen(3000, '0.0.0.0', () => { //TODO: verificar sin los ceros
    console.log(`Backend conectado al puerto ${APP_PORT}`);
});

