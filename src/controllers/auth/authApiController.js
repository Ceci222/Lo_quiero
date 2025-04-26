import authController from "./authController.js";

async function register(req, res) {
    try {
        const user = await authController.register(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function login(req, res) {
    try {
        const result = await authController.login(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}

export default { register, login };