import userController from "./userController.js"


async function getProfile(req, res) {
    try {getDonations
        const user = await userController.getProfile(req.user.user_id);// JWT, extrae el user_id del usuario logueado y lo guarda en req.user = { user_id }
        res.json(user)
    } catch (error) {
        console.error(error);
        res.status(error.statusCode || 500).json({ error: error.message }); //res.status(error.statusCode para que recoja y reutilice el error personalizado de user
    }
}


async function getDonations(req, res) {
    try {
        const donations = await userController.getDonations(req.user.user_id);
        res.json(donations)
    } catch (error) {
        console.error(error);
        res.status(error.statusCode || 500).json({ error: error.message }); 
    }
}


async function getPickups(req, res) {
    try {
        const pickups = await userController.getPickups(req.user.user_id);
        res.json(pickups)
    } catch (error) {
        console.error(error);
        res.status(error.statusCode || 500).json({ error: error.message }); 
    }
}

async function create(req, res) {
    try {
        const newUser = await userController.create(req.body);
        res.json(newUser);
    } catch (error) {
        console.error(error)
    if (error.statusCode) { //statusCode es el error personalizado personalizado que viene desde el user controller y se reutiliza aqí
            res.status(error.statusCode).json({ error: error.message }); //lo que hago es extender la clase error de js, y dare las propiedades que me hagan falta como doce y message
        } else {
            res.status(500).json({ error: "Error del servidor" });
        }
    }
}

async function getAll(req, res) {
    try {
        const users = await userController.getAll();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(error.statusCode || 500).json({ error: error.message }); //res.status(error.statusCode para que recoja y reutilice el error personalizado de user
    }

}
 
async function getById(req, res) {
    try {
        const id = req.params.id;  //hace referencia a este id /user/:id
        const user = await userController.getById(id)
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(error.statusCode || 500).json({ error: error.message }); 
    }

}

async function edit(req, res) {
    try {
        const id = req.params.id;
        const result = await userController.edit(id, req.body);
        res.json(result);  
    } catch (error) {
        console.error(error);
        res.status(error.statusCode || 500).json({ error: error.message }); 
    }
       
}

async function remove(req, res) {
    try {
        const id = req.params.id; 
        const result = await userController.remove(id);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(error.statusCode || 500).json({ error: error.message }); 
    }
    
}

export default {
    getAll,
    getById,
    create,
    remove,
    edit,
    getProfile, 
    getDonations,
    getPickups
}