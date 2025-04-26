import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../models/user.js';
import { Op } from 'sequelize';

async function register(data) {
    if (!data.user_name) {
        throw new Error('Ingresa un nombre de usuario');
    } 
    if (!data.user_pwd) {
        throw new Error('Ingresa una contraseña');
    } 
    if (!data.user_email) {
        throw new Error('Ingresa un correo');
    } 
    
    const hashedPwd = await bcrypt.hash(data.user_pwd, 10);

    const user = await User.create({
        user_name: data.user_name,
        user_email: data.user_email,
        user_pwd: hashedPwd
    });

    return await User.findByPk(user.user_id, {
        attributes: { exclude: ['user_pwd'] }
    });
}


async function login(data) {

    if (!data.user_name && !data.user_email) {
        throw new Error('Ingrese nombre de uduario o correo');
    } 
    if (!data.user_pwd) {
        throw new Error('Credenciales incorrectas');
    } 

    const user = await User.findOne({ 

        where: { 
            [Op.or]: [  //operador or, no funciona si no lo importo, igual que like
                { user_email: data.user_email || null }, //o null, para que en caso de que no haya, no devuelva "undefined" y de errores 
                { user_name: data.user_name || null }
            ]
            } 
    });


    if (!user) {
        throw new Error('No se ha podido encontrar el usuario');
    } else if (!await bcrypt.compare(data.user_pwd, user.user_pwd)) {
        throw new Error('Contraseña incorrecta');
    }

    const token = jwt.sign({ user_id: user.user_id }, process.env.SESSION_SECRET, { expiresIn: '1h' });
    return { token };
}

export default {
    register,
    login
} 
