import Pickup from '../../models/pickup.js';
import User from '../../models/user.js';
import ObjectModel from '../../models/object.js';
import { UserPermissionDenied } from '../../utils/errors.js';
import connection from '../../config/sequelize.js';


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
    try {
        if (!data.object_name) {
            const error = new Error('Indique de qué objeto se trata');
            error.statusCode = 400;
            throw error;
        }
        if (!data.object_description) {
            const error = new Error('Falta descripción del objeto');
            error.statusCode = 400;
            throw error;
        }
        if (!data.object_img) {
            const error = new Error('Hace falta una imagen del objeto');
            error.statusCode = 400;
            throw error;
        }
        if (!data.pickup_area) {
            const error = new Error('Debe indicar el área de recogida');
            error.statusCode = 400;
            throw error;
        }
        if (!data.pickup_start_date) {
            const error = new Error('Debe indicar la fecha inicial de recogida');
            error.statusCode = 400;
            throw error;
        }
        if (!data.pickup_end_date) {
            const error = new Error('Debe indicar la fecha final de recogida');
            error.statusCode = 400;
            throw error;
        }

        //transaction para poder ejecutar dos crete a la vez
        const result = await connection.transaction(async (t) => {//transaction: conjunto de operaciones. Todas deben completarse correctamente, o ninguna se aplica
            const object = await ObjectModel.create({ //esa (t) para indicar que forman parte de la misma transacción. Si una falla, Sequelize revierte todo.
                object_name: data.object_name,
                object_description: data.object_description,
                object_img: data.object_img,
                object_state: 'Disponible',
                object_donor_id: user_id,
                object_recipient_id: null
            }, { transaction: t });

            await Pickup.create({
                pickup_area: data.pickup_area,
                pickup_start_date: data.pickup_start_date,
                pickup_end_date: data.pickup_end_date,
                pickup_object_id: object.object_id
            }, { transaction: t });

            return object;
        });

        return await ObjectModel.findByPk(result.object_id, {
            include: [
                { model: User, as: 'Donor', attributes: { exclude: ['user_pwd'] } },
                { model: User, as: 'Recipient', attributes: { exclude: ['user_pwd'] } },
                { model: Pickup, as: 'Pickup' }
            ]
        });
    } catch (error) {
        throw error;
    }
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
            throw new UserPermissionDenied();
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


async function remove(id, user_id) {
    try {

        const object = await ObjectModel.findByPk(id)

        if (!object) {
            const error = new Error('Objeto no encontrado');
            error.statusCode = 404;
            throw error;
        }

        if (user_id !== object.object_donor_id) {
            throw new UserPermissionDenied();
        }

        const response = await object.destroy();

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

async function accept(object_id, user_id) {
    try {
        const object = await ObjectModel.findByPk(object_id);
        if (!object) {
            const error = new Error('Objeto no encontrado');
            error.statusCode = 404;
            throw error;
        }
        if (object.object_state !== 'Disponible' || object.object_recipient_id !== null) {
            const error = new Error('Objeto no disponible');
            error.statusCode = 400;
            throw error;
        }
        if (user_id === object.object_donor_id) {
            const error = new Error('El donante no puede ser beneficiario');
            error.statusCode = 403;
            throw error;
        }
        await object.update({ object_recipient_id: user_id, object_state: 'Reservado' });
        return await ObjectModel.findByPk(object_id, {
            include: [
                { model: User, as: 'Donor', attributes: { exclude: ['user_pwd'] } },
                { model: User, as: 'Recipient', attributes: { exclude: ['user_pwd'] } },
                { model: Pickup, as: 'Pickup' }
            ]
        });
    } catch (error) {
        throw error;
    }
}

export default {
    getAll,
    getById,
    create,
    edit,
    remove,
    accept
};