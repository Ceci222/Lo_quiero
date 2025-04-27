import Pickup from '../../models/pickup.js';
import ObjectModel from '../../models/object.js';

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

async function create(data) { //Este es el controlador lógico, estoy creando una función q lo q hace es verificar q los datos recibe cumplan con esas comprobaciones, o de lo contrario lancen esos errores.
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
    const object = await ObjectModel.findByPk(data.pickup_object_id);
    if (!object) {
        throw new Error('Object no encontrado');
    }

    // Creo el Pickup aislado
    const newPickup = await Pickup.create(data);

    // Asocio el Pickup recién creado con el objeto anterior usando include
    const fullPickup = await Pickup.findByPk(newPickup.pickup_id, {
        include: [ObjectModel]
    });

    return fullPickup;
}


async function edit(id, data) {
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
        
        const pickup = await Pickup.findByPk(id);
        if (!pickup) {
            throw new Error('Información de recogida no encontrada');
        }
        const result = await Pickup.update(data, {
            where: { pickup_id: id }
        });
        return result;
    } catch (error) {
        throw error;
    }
    
}

async function remove(id) {
    const response = await Pickup.destroy({
        where: { pickup_id: id } 
    });
    if (!response) throw new Error('Recogida no encontrada');
    return response;
}

export default {
    getAll,
    getById,
    create,
    edit,
    remove
};