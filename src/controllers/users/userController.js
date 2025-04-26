import User from "../../models/user.js"
import ObjectModel from "../../models/object.js"
import Pickup from "../../models/pickup.js"
import bcrypt from 'bcrypt';

async function getAll(){
    try {
        const users = await User.findAll({
            include: [
                { model: ObjectModel, as: 'DonatedObjects', include: [{ model: Pickup, as: 'Pickup' }] },
                { model: ObjectModel, as: 'ReceivedObjects', include: [{ model: Pickup, as: 'Pickup' }] }
            ]
        });
        if (users.length === 0) {
            throw new Error('No hay usuarios para mostrar');
        }
        return users;

    } catch(error) {
        throw new Error(error.message)
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
    if (!user) throw new Error('Usuario no encontrado');
    return user;
}

async function edit(id, data) {
    const user = await User.findByPk(id);
    if (!user) throw new Error('Usuario no encontrado');

    // Verifico si user_pwd está presente y hashearlo
    const updateData = { ...data }; //IMPORTANTE: le paso data usando el operador de propagación pq así se crea una copia de data, y no se modifica el original
    if (updateData.user_pwd) {
        updateData.user_pwd = await bcrypt.hash(updateData.user_pwd, 10);
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
        throw new Error('Se requiere un nombre de usuario');
    }
    if(!data.user_pwd){
        throw new Error('Se requiere una contraseña');
    }
    if (!data.user_email) {
        throw new Error('Se requiere una dirección de correo');
    }

    // Hashear la contraseña con bcrypt
    const hashedPwd = await bcrypt.hash(data.user_pwd, 10);

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
    return response;
};

export default {
    getById,
    edit,
    remove,
    create,
    getAll
};