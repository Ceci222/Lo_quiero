import Pickup from '../../models/pickup.js';
import ObjectModel from '../../models/object.js';
/* import UserModel from '../../models/user.js';*/
import { UserPermissionDenied } from '../../utils/errors.js';

async function getAll() {
    try {
        const pickups = await Pickup.findAll({
            include: [ObjectModel]
        });

        if (!pickups || pickups.length === 0) { //la consulta puede devolver un array vacío, y ya no sería null
            throw new Error('No se encontraron registros');
        }  

        return pickups;  

    } catch (error){ // catch trabaja con o maneja, por asi decirlo, las excepciones que lanza el try
        //console.error(error)
        throw error;
    }
    
}

async function getById(id) {
    try {
        const pickup = await Pickup.findByPk(id, {
            include: [ObjectModel]
        });
        if (!pickup) { //si no se encuentra o es null
            throw new Error('Recogida no encontrada');
            
        }
        return pickup;
    } catch (error) {
        throw error;
    }
    
}

async function create(data, user_id) { //Este es el controlador lógico, estoy creando una función q lo q hace es verificar q los datos recibe cumplan con esas comprobaciones, o de lo contrario lancen esos errores.
    if (!data.pickup_area) {
        throw new Error('Debe indicar el área de recogida');
    }
    if (!data.pickup_start_date) {
        throw new Error('Debe indicar la fecha incial de recogida');
    }
    if (!data.pickup_end_date) {
        throw new Error('Debe indicar la fecha final de recogida');
    }
    if (!data.pickup_object_id) {
        throw new Error('Falta la referencia del objeto a recoger');
    }

    // Verifico que el objeto exista pq lo voy a necesitar luego
    const object = await ObjectModel.findByPk(data.pickup_object_id); //paso la pickup_object_id a asociar al objeto
    if (!object) {
        throw new Error('Object no encontrado');
    }

    if (user_id !== object.object_donor_id) {
        throw new UserPermissionDenied;
    } //El propio middleware va a verificar la id de user

    // Creo el Pickup aislado
    const newPickup = await Pickup.create(data);

    // Asocio el Pickup recién creado con el objeto anterior usando include
    const fullPickup = await Pickup.findByPk(newPickup.pickup_id, {
        include: [ObjectModel]
    });

    return fullPickup;
}


async function edit(id, data, user_id) { //usa porque hace referencia a ese data del q se obtienen las keys
    try {
        
        if (data.pickup_start_date) {
            const start_date = new Date(data.pickup_start_date);
            if (isNaN(start_date.getTime())) {
                throw new Error('Fecha inicial inválida');
            }
        }
        if (data.pickup_end_date) {
            const end_date = new Date(data.pickup_end_date);
            if (isNaN(end_date.getTime())) {
                throw new Error('Fecha final inválida');
            }
        }

        if (data.pickup_area) {
            const pickupArea = data.pickup_area;
            
        }
        
        const pickup = await Pickup.findByPk(id);
        if (!pickup) {
            throw new Error('Información de recogida no encontrada');
        }

        const object = await ObjectModel.findByPk(pickup.pickup_object_id); //busco el objeto y como key le paso la c/foranea asociada

        if (!object) {
            const error = new Error('Objeto no encontrado');
            error.statusCode = 404;
            throw error;
        }

        if (user_id !== object.object_donor_id) {
            throw new UserPermissionDenied();
        } //El propio middleware va a verificar la id de user

        const allowedFields = [
            "pickup_start_date",
            "pickup_end_date",
            "pickup_area"
        ];

        const invalidFields = Object.keys(data).filter(
            key => !allowedFields.includes(key)
            ); //objeto global de JavaScript, no el modelo ObjectModel. Object.keys(data) extrae las claves de data (un objeto JavaScript de req.body

        if (invalidFields.length > 0) {
            const error = new Error(`Campos inválidos: ${invalidFields.join(", ")}`);
            error.statusCode = 400;
            throw error;
        }

        await pickup.update(data);

        return await Pickup.findByPk(id, { include: [ObjectModel] });

    } catch (error) {
        throw error;
    }
    
}

async function remove(id, user_id) {
    try {

        const pickup = await Pickup.findByPk(id); 
        //aquí estoy obteninedo los datos desde el modelo y luego los uso desde la instancia que crea sequelize con la función destroy()
        
        if (!pickup) {
            const error = new Error('Recogida no encontrada');
            error.statusCode = 404;
            throw error;
        }

        const object = await ObjectModel.findByPk(pickup.pickup_object_id); 

        if (!object) {
            const error = new Error('Objeto no encontrado');
            error.statusCode = 404;
            throw error;
        }

        
        if (user_id !== object.object_donor_id) {
            throw new UserPermissionDenied();
        }
        

        const response = await pickup.destroy();
        /* const response = await Pickup.destroy({
            where: { pickup_id: id } 
        });   es lo mismo pero va con mayus pq es el modelo mientras el otro es una instancia q refiere al elemento actual devuelto por sequelize*/

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