class UserNameNotProvided extends Error {
    constructor() {
        super('Ingresa un nombre de usuario');
        this.statusCode = 400;
    }
}

class UserEmailNotProvided extends Error {
    constructor() {
        super('Ingresa un correo');
        this.statusCode = 400;
    }
}

class UserPasswordNotProvided extends Error {
    constructor() {
        super('Ingresa una contraseña');
        this.statusCode = 400;
    }
}

class UserEmailAlreadyExists extends Error {
    constructor() {
        super('El email ya está registrado');
        this.statusCode = 400;
    }
}

class UserInvalidCredentials extends Error {
    constructor() {
        super('Credenciales incorrectas');
        this.statusCode = 401;
    }
}

class UserNotFound extends Error {
    constructor() {
        super('Usuario no encontrado');
        this.statusCode = 404;
    }
}


export {
    UserNameNotProvided,
    UserEmailNotProvided,
    UserPasswordNotProvided,
    UserEmailAlreadyExists,
    UserInvalidCredentials,
    UserNotFound
};