import userController from "./userController.js"

async function create(req, res) {
    try {
        const newUser = await userController.create(req.body);
        res.json(newUser);
    } catch (error) {
        console.error(error)
    if (error.statusCode) { //statusCode no viene por defecto, para que lo tengan lo tengo que definir yo
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
        console.error(error)
        res.status(500).json({error: "Error del servidor"});
    }

}
 
async function getById(req, res) {
    try {
        const id = req.params.id;  //hac referencia a este id /user/:id
        const user = await userController.getById(id)
        res.json(user);
    } catch (error) {
        console.error(error)
        res.status(404).json({error: "Usuario no encontrado"});
    }

}

async function edit(req, res) {
    try {
        const id = req.params.id;
        const result = await userController.edit(id, req.body);
        res.json(result);  
    } catch (error) {
        console.error(error)
        res.status(500).json({error : "Error del servidor"})
    }
       
}

async function remove(req, res) {
    try {
        const id = req.params.id; 
        const result = await userController.remove(id);
        res.json(result);
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Error del servidor"});
    }
    
}

export default {
    getAll,
    getById,
    create,
    remove,
    edit
}