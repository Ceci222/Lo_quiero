import { verifyToken } from '../utils/token.js';



function isLoggedInAPI(req, res, next) {
    // 1. Obtener el token desde el encabezado de la solicitud
    const authorization = req.headers.authorization;
    console.log("authorization", authorization);  // 2. Verificar qué pasa con el token recibido

    if (!authorization) {
        return res.status(401).json({ error: 'Falta token' });
    }

    // 2. Procesar el token: se espera un "Bearer token"
    let token = authorization.split(" ");  // Si no hay espacio, esto fallará
    token = token.pop();  // Obtener el token

    // 3. Verificar el token usando la función `verifyToken`
    try {
        const result = verifyToken(token);
        console.log("token verified", result);  // Verifica el resultado de la verificación del token

        // 4. Si la verificación es exitosa, agregar la información dl usuario a `req`
        if (result) {
            req.user = {
                user_id: result.user_id,   // Asignar el user_id al objeto de la solicitud
            };
            next();  // Continúa con el siguiente middleware o controlador, aunq no hay en este caso
        } else {
            return res.status(401).json({ error: 'Token inválido' });  // Si la verificación falla
        }
    } catch (error) {
        console.error(error);
        return res.status(401).json({ error: 'Token inválido' });
    }
}

export default isLoggedInAPI;
