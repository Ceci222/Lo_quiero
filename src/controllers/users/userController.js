import User from "../../models/user.js"
import Object from "../../models/object.js"
import Pickup from "../../models/pickup.js"

async function getAll(){
    try {
        const users = await User.findAll({
            include: [
                { model: Object, as: 'DonatedObjects', include: [{ model: Pickup, as: 'Pickup' }] },
                { model: Object, as: 'ReceivedObjects', include: [{ model: Pickup, as: 'Pickup' }] }
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
        include: [
            { model: Object, as: 'DonatedObjects', include: [{ model: Pickup, as: 'Pickup' }] },
            { model: Object, as: 'ReceivedObjects', include: [{ model: Pickup, as: 'Pickup' }] }
        ] //debo usar esta sintáxis pq hay dos realciones con la misma tabla y para diferenciarlas hace falta un alias, no es una asociacion simple con dos tablas diferentes
    });
    if (!user) throw new Error('Usuario no encontrado');
    return user;
}

async function edit(id, data) {
    const user = await User.findByPk(id);
    if (!user) throw new Error('Usuario no encontrado');

    await User.update(data, { 
        where: { 
            user_id: id 
        } 
    });

    return await User.findByPk(id, { //para devolver el usuario actualizado
        include: [
            { model: Object, as: 'DonatedObjects', include: [{ model: Pickup, as: 'Pickup' }] },
            { model: Object, as: 'ReceivedObjects', include: [{ model: Pickup, as: 'Pickup' }] }
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

    const response = await User.create(data);
    return response;
    
};


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