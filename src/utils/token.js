import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

function createToken(userData) { //el nombre de la función es irrelevante, a diferencia de las funciones de sequelize
    return jwt.sign(userData, JWT_SECRET, { expiresIn: '24h' }); // crea un token JWT seguro que contiene los datos de usuario y al que solo se accede con la clave secreta de sesión que tengo en .env
}

function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET); //función de jwt que verifica la validez del token
}

export { createToken, verifyToken };