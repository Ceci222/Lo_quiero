import User from "../../models/user.js"
import ObjectModel from "../../models/object.js"
import Pickup from "../../models/pickup.js"
import { hash } from '../../utils/bycrypt.js';
import {
    UserNameNotProvided,
    UserEmailNotProvided,
    UserPasswordNotProvided,
    UserNotFound
} from '../../utils/errors.js';


async function getProfile(user_id) {
    const user = await User.findByPk(user_id, { 
        attributes: { exclude: ['user_pwd'] },
        include: [
            { model: ObjectModel, as: 'DonatedObjects', include: [{ model: Pickup, as: 'Pickup' }] },
            { model: ObjectModel, as: 'ReceivedObjects', include: [{ model: Pickup, as: 'Pickup' }] }
        ]
    });
    if (!user) throw new UserNotFound();
    
    return user;
}

async function getAll(){
    try {
        const users = await User.findAll({
            include: [
                { model: ObjectModel, as: 'DonatedObjects', include: [{ model: Pickup, as: 'Pickup' }] },
                { model: ObjectModel, as: 'ReceivedObjects', include: [{ model: Pickup, as: 'Pickup' }] }
            ]
        });
        if (users.length === 0) {
            throw new UserNotFound();
        }
        return users;

    } catch(error) {
        throw error //para que aproveche el error personalizado del try y lo reutilice
    }

}

async function getById(id) {
    const user = await User.findByPk(id, {
        attributes: { exclude: ['user_pwd'] },
        include: [
            { model: ObjectModel, as: 'DonatedObjects', include: [{ model: Pickup, as: 'Pickup' }] },
            { model: ObjectModel, as: 'ReceivedObjects', include: [{ model: Pickup, as: 'Pickup' }] }
        ] //debo usar esta sintáxis pq hay dos realciones con la misma tabla y para diferenciarlas hace falta un alias, no es una asociacion simple con dos tablas diferentes
    });
    if (!user) throw new UserNotFound();
    return user;
}

async function edit(id, data) {
    const user = await User.findByPk(id);
    if (!user) throw new UserNotFound();

    // Verifico si user_pwd está presente y hashearlo
    const updateData = { ...data }; //IMPORTANTE: le paso data usando el operador de propagación pq así se crea una copia de data, y no se modifica el original
    if (updateData.user_pwd) {
        updateData.user_pwd = await hash(updateData.user_pwd);
    }

    await User.update(updateData, { 
        where: {
            user_id: id
        }
    });

    return await User.findByPk(id, { 
        attributes: { exclude: ['user_pwd'] }, 
        include: [
            { model: ObjectModel, as: 'DonatedObjects', include: [{ model: Pickup, as: 'Pickup' }] },
            { model: ObjectModel, as: 'ReceivedObjects', include: [{ model: Pickup, as: 'Pickup' }] }
        ]
    });
}

async function create(data){
    if(!data.user_name){
        throw new UserNameNotProvided();
    }
    if(!data.user_pwd){
        throw new UserPasswordNotProvided();
    }
    if (!data.user_email) {
        throw new UserEmailNotProvided();
    }

    const hashedPwd = await hash(data.user_pwd);// requiere importar el hash desde bycrypt, es lo mismo que la linea anterior pero se separa por modularidad

    // Crear usuario con la contraseña hasheada
    const user = await User.create({
        user_name: data.user_name,
        user_email: data.user_email,
        user_pwd: hashedPwd //necesito usar los datos explicitos para poder hashear la contraseña, no puedo usar data
    });

    return await User.findByPk(user.user_id, {
        attributes: { exclude: ['user_pwd'] }
    });
}


async function remove(id) {
    const response = await User.destroy({
        where: {
            user_id: id
        }
    })
    if (!response) throw new UserNotFound();
    return response;
    
};

export default {
    getById,
    edit,
    remove,
    create,
    getAll,
    getProfile
};

//Que el user no pueda aceptar su propia donación
//Que un user no pueda modificar el objeto o la recogida de otro