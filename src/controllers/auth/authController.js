import { Op } from 'sequelize';
import User from '../../models/user.js';
import { hash, compare } from '../../utils/bycrypt.js';
import { createToken } from '../../utils/token.js';
import {
    UserNameNotProvided,
    UserEmailNotProvided,
    UserPasswordNotProvided,
    UserEmailAlreadyExists,
    UserInvalidCredentials
} from '../../utils/errors.js';


async function register(data) {
    if (!data.user_name) throw new UserNameNotProvided();
    if (!data.user_email) throw new UserEmailNotProvided();
    if (!data.user_pwd) throw new UserPasswordNotProvided();
    
    const oldUserName = await User.findOne({ where: { user_name: data.user_name } });
    if (oldUserName) throw new UserNameAlreadyExists();

    const oldUserEmail = await User.findOne({ where: { user_email: data.user_email } });
    if (oldUserEmail) throw new UserEmailAlreadyExists();

    const hashedPwd = await hash(data.user_pwd); //importado de bycrypt.js

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


