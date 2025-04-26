import Pickup from '../../models/pickup.js';
import User from '../../models/user.js';
import ObjectModel from '../../models/object.js';

async function getAll() {
    try {
        const objects = await ObjectModel.findAll({
            include: [
                { model: User, as: 'Donor' },
                { model: User, as: 'Recipient' },
                { model: Pickup, as: 'Pickup' }
            ]
        }); //en lugar de solo incluir user, pq hay 2 relaciones

        if (!objects || objects.length === 0) {
            throw new Error('No se encontraron objetos');
        }

        return objects;  
    } catch (error) {
        console.error(error);
        throw new Error(error.message);  
    }
}


async function getById(id) {
    try {
        const object = await ObjectModel.findByPk(id, {
            include: [
                { model: User, as: 'Donor' },
                { model: User, as: 'Recipient' },
                { model: Pickup, as: 'Pickup' }
            ]
        });
        if (!object) {
            throw new Error('Objeto no encontrado');
        }
        return object;
    } catch (error) {
        throw error;
    }
}

async function create(data) { 
    if (!data.object_name) {
        throw new Error('Indique de qué objeto se trata');
    }
    if (!data.object_description) {
        throw new Error('Falta descripción del objeto');
    }
    if (!data.object_img) {
        throw new Error('Hace falta una imagen del objeto');
    }
    if (!data.object_state) {
        throw new Error('Indique en qué estado se encuentra el objeto');
    }

    const donor = await User.findByPk(data.object_donor_id);
    if (!donor) {
        throw new Error('Donante no encontrado');
    }

    if (data.object_recipient_id) {
        const recipient = await User.findByPk(data.object_recipient_id);
        if (!recipient) {
            throw new Error('Beneficiario no encontrado');
        }
    }

    const newObject = await ObjectModel.create(data);

    const fullObject = await ObjectModel.findByPk(newObject.object_id, {
        include: [
            { model: User, as: 'Donor' },
            { model: User, as: 'Recipient' }
        ]
    });

    return fullObject;
}


async function edit(id, data) {
    try {
        const object = await ObjectModel.findByPk(id);
        if (!object) throw new Error('Objeto no encontrado');
        await object.update(data);
        if (data.pickup) {
            await Pickup.update(data.pickup, { where: { pickup_object_id: id } });
        }
        return await ObjectModel.findByPk(id, {
            include: [
                { model: User, as: 'Donor' },
                { model: User, as: 'Recipient' },
                { model: Pickup, as: 'Pickup' }
            ]
        });
    } catch (error) {
        throw error;
    }
}


async function remove(id) {
    const response = await ObjectModel.destroy({
        where: { object_id: id }   
    });
    return response;
}

export default {
    getAll,
    getById,
    create,
    edit,
    remove
};