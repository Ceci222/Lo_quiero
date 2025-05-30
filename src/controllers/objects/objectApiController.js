import objectController from "./objectController.js";


async function getAll(req, res) {
    try {
        const objects = await objectController.getAll();
        res.json(objects)
    } catch (error) {
        console.error(error)
        res.status(404).json({error: "Objetos no encontrados"});
    }
     
}

export async function getAvailableForUser(req, res) {
  try {
    const user_id = req.user.id; // desde middleware auth
    const objects = await objectController.getAll(user_id);
    res.json(objects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener objetos disponibles para el usuario' });
  }
}


async function getById(req, res) {
    try {
        const id = req.params.id;
        const object = await objectController.getById(id);
        res.json(object)
    } catch (error) {
        console.error(error)
        res.status(404).json({error: "Objeto no encontrado"});
    }
     
}

async function create(req, res) {
    try {
        const result = await objectController.create(req.body, req.user.user_id); //de ahí coge los args
        res.json(result);
    } catch (error) {
        console.error(error);
        if (error.statusCode) {
            res.status(error.statusCode).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Error del servidor" });
        }
    }
     
}

async function accept(req, res) {
    try {
        const object_id = req.params.id; //pq lo necesito del endpoint
        const result = await objectController.accept(object_id, req.user.user_id);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(error.statusCode || 500).json({ error: error.message });
    }
}

async function reject(req, res) {
    try {
        const object_id = req.params.id; 
        const result = await objectController.reject(object_id, req.user.user_id);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(error.statusCode || 500).json({ error: error.message });
    }
}

async function edit(req, res) {
    try {
        const object_id = req.params.id;
        const object = await objectController.edit(object_id, req.body, req.user.user_id); //req.user.user_id debe coincidir con el middleware
        res.json(object);
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
        const id = req.params.id //asocio la request al id
        const result = await objectController.remove(id, req.user.user_id);
        res.json(result);
    } catch (error) {
        console.error(error);
        if (error.statusCode) {
            res.status(error.statusCode).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Error del servidor" });
        }
    }

}


export default {
    getAll,
    getAvailableForUser,
    getById,
    create,
    edit,
    remove,
    accept,
    reject
};
