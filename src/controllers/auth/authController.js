import { Op } from 'sequelize';
import User from '../../models/user.js';
import { hash, compare } from '../../utils/bycrypt.js';
import { createToken } from '../../utils/token.js';
import {
    UserNameNotProvided,
    UserEmailNotProvided,
    UserPasswordNotProvided,
    UserEmailAlreadyExists,
    UserInvalidCredentials,
    UserNameAlreadyExists
} from '../../utils/errors.js';


async function register(data) {
    if (!data.user_name) throw new UserNameNotProvided();
    if (!data.user_email) throw new UserEmailNotProvided();
    if (!data.user_pwd) throw new UserPasswordNotProvided();

    //verificar formato del email
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(data.user_email)) {
        const error = new Error('El correo electrónico no es válido');
        error.statusCode = 400;
        throw error;
    }

    //verificar formato contraseña
    const pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!pwdRegex.test(data.user_pwd)) {
        const error = new Error('La contraseña debe tener al menos 8 caracteres, con letras y números');
        error.statusCode = 400;
        throw error;
    }

    // Validaciones de duplicados p/ nombre usuario y pwd
    const oldUserName = await User.findOne({ where: { user_name: data.user_name } });
    if (oldUserName) throw new UserNameAlreadyExists();

    const oldUserEmail = await User.findOne({ where: { user_email: data.user_email } });
    if (oldUserEmail) throw new UserEmailAlreadyExists();

    // Hashear la contraseña
    const hashedPwd = await hash(data.user_pwd); // importado de bcrypt.js

    // Crear el usuario
    const user = await User.create({
        user_name: data.user_name,
        user_email: data.user_email,
        user_pwd: hashedPwd
    });

    // Devolver el usuario sin la contraseña
    return await User.findByPk(user.user_id, {
        attributes: { exclude: ['user_pwd'] }
    });
}

async function login(data) {
    if (!data.user_name && !data.user_email) throw new UserEmailNotProvided();
    if (!data.user_pwd) throw new UserPasswordNotProvided();
    const user = await User.findOne({
        where: {
            [Op.or]: [ //operador or, no funciona si no lo importo, igual que like
                { user_email: data.user_email || null }, //o null, para que en caso de que no haya, no devuelva "undefined" y de errores 
                { user_name: data.user_name || null }
            ]
        }
    });
    if (!user || !await compare(data.user_pwd, user.user_pwd)) throw new UserInvalidCredentials();

    const token = createToken({ user_id: user.user_id });

    return { token };
}

export default { register, login };


