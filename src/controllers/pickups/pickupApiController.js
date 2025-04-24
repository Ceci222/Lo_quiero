import pickupController from "./pickupController.js"

//CREATE

async function create(req, res) {
    try {
        const result =  await pickupController.create(req.body);
        res.json(result);
    } catch (error) { 
        console.error(error);
        if (error.statusCode){
            res.status(error.statusCode).json({ error: error.message })
        } else {
            res.status(500).json({ error: "Error del servidor"}) //throw lo usamos en el controlador lógico pq esos errores quedan en el back pero estos van al cliente, por eso son con res
        }

    }
}

async function getAll(req, res) {
    try {
        const pickups = await pickupController.getAll();
        res.json(pickups); //formato en el que quiero q se devuelva la info

    } catch (error){ 
        console.error(error);
        res.status(500).json({ error: "Error del servidor" }); //error genérico, algo falló, sabrá Dios qué...
    }
    
}

async function getById(req, res) {
    try {
        const id = req.params.id;  //importante para que los obtenga de los parámetros de la consulta
        const pickup = await pickupController.getById(id);
        res.json(pickup);

    }catch (error) {
        console.error(error)
        res.status(500).json({ error: "Error del servidor" });
    }
    
}

async function edit(req, res) {
    try {
        const id = req.params.id; 
        const response = await pickupController.edit(id, req.body);
        res.json(response);

    } catch (error) {
        console.error(error);
        if (error.statusCode) {
            res.status(error.statusCode).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Error del servidor" });
        }
    }
    
}


async function remove(req, res) {
    try {
        const id = req.params.id; 
        const response = await pickupController.remove(id);
        res.json(response);

    }catch (error) {
        console.error(error)
        res.status(500).json({ error: "Error del servidor" });
    }
    
}

export default {
    getAll,
    getById,
    create,
    edit,
    remove
};