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

async function create(data, user_id) { 
    if (!data.object_name) {
        throw new Error('Indique de qué objeto se trata');
    }
    if (!data.object_description) {
        throw new Error('Falta descripción del objeto');
    }
    if (!data.object_img) {
        throw new Error('Hace falta una imagen del objeto');
    }

    if (!user_id) {
        throw new Error('Usuario no autenticado');
    }

    const objectData = {
        object_name: data.object_name,
        object_description: data.object_description,
        object_img: data.object_img,
        object_state: 'Disponible',
        object_donor_id: user_id, 
        object_recipient_id: null 
    };

    const newObject = await ObjectModel.create(objectData); //variable interna en la que s eva a almacenar la info

    const fullObject = await ObjectModel.findByPk(newObject.object_id, { //buscar en la db y devolver
        include: [
            { model: User, as: 'Donor' },
            { model: User, as: 'Recipient' }
        ]
    });

    return fullObject;
}


async function edit(id, data, user_id) {
    try {
        const object = await ObjectModel.findByPk(id); //verificar el objeto

        if (!object) throw new Error('Objeto no encontrado');

        const user = await User.findByPk(id); // idem user

        if (!user_id) {
            throw new Error('Usuario no autenticado'); //el middleware ya al proteger la ruta hace esta verificación , la puedo obviar
        }

        if (user_id !== object.object_donor_id) { //importante: lo que compara es el param de jwt con el campo delmodelo del objeto, por eso no es user.user_id
        }


        const allowedFields = [
            "object_name",
            "object_description",
            "object_img"
        ];
        
        const invalidFields = Object.keys(data).filter(
        key => !allowedFields.includes(key)
        );
        
        if (invalidFields.length > 0) {
            const error = new Error(`Campos inválidos: ${invalidFields.join(", ")}`);
            error.statusCode = 400;
            throw error;
        }

        await object.update(data);

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
    try {
        const response = await ObjectModel.destroy({
            where: { object_id: id }
        });
        if (response === 0) {
            const error = new Error('Id no encontrado');
            error.statusCode = 404;
            throw error;
        }
        return response;
    } catch (error) {
        throw error; // Envío el error al controlador API
    }
}

export default {
    getAll,
    getById,
    create,
    edit,
    remove
};