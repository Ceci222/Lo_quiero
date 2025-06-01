# Lo_quiero

## Descripción General

Inspirada en el grupo de Facebook *"Si lo venís a buscar es tuyo"*, esta API promueve la economía circular y facilita el intercambio gratuito de objetos entre personas, fomentando la reutilización y reduciendo residuos. A través de esta plataforma, los usuarios pueden ofrecer artículos que ya no necesitan y donar objetos a otros de manera sencilla y accesible.

La API gestiona usuarios, objetos y recogidas para una plataforma de donaciones. Está desarrollada con **Express.js**, **Sequelize** para consultas a la base de datos, y **JWT** para autenticación. Actualmente, no está desplegada y se ejecuta localmente con **Docker**.

## Índice

- [URL Base](#url-base)
- [Autenticación](#autenticación)
- [Endpoints](#endpoints)
  - [Autenticación](#autenticación-1)
  - [Usuarios](#usuarios)
  - [Objetos](#objetos)
  - [Recogidas](#recogidas)
  - [Cloudinary](#cloudinary)
- [Manejo de Errores](#manejo-de-errores)
- [Instrucciones de Configuración](#instrucciones-de-configuración)
- [Ejemplo de Uso](#ejemplo-de-uso)

## URL Base

```
http://localhost:3001
```

## Autenticación

- **Token JWT**: Requerido para rutas protegidas (por ejemplo, `/user/profile/:id`, `/object/:id/accept`).
- **Cómo autenticarse**:
  1. Usa `POST /login` o `POST /register` para obtener un token.
  2. Incluye el token en el encabezado `Authorization` para rutas protegidas:
     ```
     Authorization: <token>
     ```

## Endpoints

### Autenticación

#### **POST /register**

Registra un nuevo usuario.

- **Cuerpo** (JSON):
  ```json
  {
    "user_name": "string",
    "user_email": "string",
    "user_pwd": "string"
  }
  ```
- **Respuestas**:
  - `201 Created`: Usuario creado.
    ```json
    {
      "token": "jwt_token",
      "user": {
        "user_id": 1,
        "user_name": "juan",
        "user_email": "juan@ejemplo.com"
      }
    }
    ```
  - `400 Bad Request`: Faltan campos, formato inválido (email o contraseña), o `user_name`/`user_email` duplicados.
    ```json
    { "error": "Nombre de usuario ya existe" }
    ```
  - `500 Internal Server Error`: Error del servidor.
    ```json
    { "error": "Error del servidor" }
    ```

#### **POST /login**

Inicia sesión y devuelve un token JWT.

- **Cuerpo** (JSON):
  ```json
  {
    "user_email": "string", // o "user_name"
    "user_pwd": "string"
  }
  ```
- **Respuestas**:
  - `200 OK`: Inicio de sesión exitoso.
    ```json
    {
      "token": "jwt_token",
      "user_name": "juan"
    }
    ```
  - `400 Bad Request`: Faltan campos o credenciales inválidas.
    ```json
    { "error": "Debe proporcionar email o nombre de usuario" }
    ```
  - `500 Internal Server Error`: Error del servidor.
    ```json
    { "error": "Error del servidor" }
    ```

### Usuarios

#### **GET /user**

Obtiene todos los usuarios.

- **Respuestas**:
  - `200 OK`: Lista de usuarios.
    ```json
    [
      {
        "user_id": 1,
        "user_name": "juan",
        "user_email": "juan@ejemplo.com",
        "DonatedObjects": [],
        "ReceivedObjects": []
      }
    ]
    ```
  - `404 Not Found`: No se encontraron usuarios.
    ```json
    { "error": "Usuario no encontrado" }
    ```
  - `500 Internal Server Error`: Error del servidor.
    ```json
    { "error": "Error del servidor" }
    ```

#### **GET /user/:id**

Obtiene un usuario por ID.

- **Parámetros**:
  - `id` (ruta): ID del usuario (entero).
- **Respuestas**:
  - `200 OK`: Datos del usuario.
    ```json
    {
      "user_id": 1,
      "user_name": "juan",
      "user_email": "juan@ejemplo.com",
      "DonatedObjects": [],
      "ReceivedObjects": []
    }
    ```
  - `404 Not Found`: Usuario no encontrado.
    ```json
    { "error": "Usuario no encontrado" }
    ```
  - `500 Internal Server Error`: Error del servidor.
    ```json
    { "error": "Error del servidor" }
    ```

#### **GET /user/profile/:id**

Obtiene el perfil del usuario autenticado.

- **Encabezados**:
  - `Authorization: <token>`
- **Parámetros**:
  - `id` (ruta): ID del usuario (entero).
- **Respuestas**:
  - `200 OK`: Perfil del usuario.
    ```json
    {
      "user_id": 1,
      "user_name": "juan",
      "user_email": "juan@ejemplo.com",
      "DonatedObjects": [],
      "ReceivedObjects": []
    }
    ```
  - `401 Unauthorized`: Token inválido o ausente.
    ```json
    { "error": "Falta token" }
    ```
  - `404 Not Found`: Usuario no encontrado.
    ```json
    { "error": "Usuario no encontrado" }
    ```
  - `500 Internal Server Error`: Error del servidor.
    ```json
    { "error": "Error del servidor" }
    ```

#### **GET /user/donations**

Obtiene los objetos donados por el usuario autenticado.

- **Encabezados**:
  - `Authorization: <token>`
- **Respuestas**:
  - `200 OK`: Lista de objetos donados.
    ```json
    [
      {
        "object_id": 1,
        "object_name": "Libro",
        "object_description": "Una novela",
        "object_img": "url",
        "object_state": "Disponible",
        "Donor": { "user_id": 1, "user_name": "juan" },
        "Recipient": null,
        "Pickup": null
      }
    ]
    ```
  - `404 Not Found`: No se encontraron donaciones.
    ```json
    { "error": "No se encontraron donaciones asociadas a este usuario" }
    ```
  - `500 Internal Server Error`: Error del servidor.
    ```json
    { "error": "Error del servidor" }
    ```

#### **GET /user/pickups**

Obtiene las recogidas asociadas al usuario autenticado.

- **Encabezados**:
  - `Authorization: <token>`
- **Respuestas**:
  - `200 OK`: Lista de recogidas.
    ```json
    [
      {
        "pickup_id": 1,
        "pickup_area": "Centro",
        "pickup_start_date": "2025-05-01",
        "pickup_end_date": "2025-05-02",
        "pickup_object_id": 1,
        "ObjectModel": {
          "object_id": 1,
          "object_name": "Libro",
          "Donor": { "user_id": 2, "user_name": "ana" },
          "Recipient": { "user_id": 1, "user_name": "juan" }
        }
      }
    ]
    ```
  - `404 Not Found`: No se encontraron recogidas.
    ```json
    { "error": "No se encontraron recogidas asociadas a este usuario" }
    ```
  - `500 Internal Server Error`: Error del servidor.
    ```json
    { "error": "Error del servidor" }
    ```

#### **POST /user**

Crea un nuevo usuario.

- **Cuerpo** (JSON):
  ```json
  {
    "user_name": "string",
    "user_email": "string",
    "user_pwd": "string"
  }
  ```
- **Respuestas**:
  - `200 OK`: Usuario creado.
    ```json
    {
      "user_id": 1,
      "user_name": "juan",
      "user_email": "juan@ejemplo.com"
    }
    ```
  - `400 Bad Request`: Faltan campos o formato inválido.
    ```json
    { "error": "Ingresa un nombre de usuario" }
    ```
  - `500 Internal Server Error`: Error del servidor.
    ```json
    { "error": "Error del servidor" }
    ```

#### **PUT /user/:id**

Actualiza un usuario.

- **Parámetros**:
  - `id` (ruta): ID del usuario (entero).
- **Cuerpo** (JSON):
  ```json
  {
    "user_name": "string",
    "user_email": "string",
    "user_pwd": "string"
  }
  ```
- **Respuestas**:
  - `200 OK`: Usuario actualizado.
    ```json
    {
      "user_id": 1,
      "user_name": "juan_actualizado",
      "user_email": "juan@ejemplo.com",
      "DonatedObjects": [],
      "ReceivedObjects": []
    }
    ```
  - `404 Not Found`: Usuario no encontrado.
    ```json
    { "error": "Usuario no encontrado" }
    ```
  - `500 Internal Server Error`: Error del servidor.
    ```json
    { "error": "Error del servidor" }
    ```

#### **DELETE /user/:id**

Elimina un usuario.

- **Parámetros**:
  - `id` (ruta): ID del usuario (entero).
- **Respuestas**:
  - `200 OK`: Número de usuarios eliminados (1 o 0).
    ```json
    1
    ```
  - `404 Not Found`: Usuario no encontrado.
    ```json
    { "error": "Usuario no encontrado" }
    ```
  - `500 Internal Server Error`: Error del servidor.
    ```json
    { "error": "Error del servidor" }
    ```

### Objetos

#### **GET /object**

Obtiene todos los objetos.

- **Respuestas**:
  - `200 OK`: Lista de objetos.
    ```json
    [
      {
        "object_id": 1,
        "object_name": "Libro",
        "object_description": "Una novela",
        "object_img": "url",
        "object_state": "Disponible",
        "Donor": { "user_id": 1, "user_name": "juan" },
        "Recipient": null,
        "Pickup": null
      }
    ]
    ```
  - `404 Not Found`: No se encontraron objetos.
    ```json
    { "error": "Objetos no encontrados" }
    ```
  - `500 Internal Server Error`: Error del servidor.
    ```json
    { "error": "Error del servidor" }
    ```

#### **GET /object/available**

Obtiene los objetos disponibles para el usuario autenticado (excluye los donados por el propio usuario).

- **Encabezados**:
  - `Authorization: <token>`
- **Respuestas**:
  - `200 OK`: Lista de objetos disponibles.
    ```json
    [
      {
        "object_id": 1,
        "object_name": "Libro",
        "object_description": "Una novela",
        "object_img": "url",
        "object_state": "Disponible",
        "Donor": { "user_id": 2, "user_name": "ana" },
        "Recipient": null,
        "Pickup": null
      }
    ]
    ```
  - `500 Internal Server Error`: Error del servidor.
    ```json
    { "error": "Error al obtener objetos disponibles para el usuario" }
    ```

#### **GET /object/:id**

Obtiene un objeto por ID.

- **Parámetros**:
  - `id` (ruta): ID del objeto (entero).
- **Respuestas**:
  - `200 OK`: Datos del objeto.
    ```json
    {
      "object_id": 1,
      "object_name": "Libro",
      "object_description": "Una novela",
      "object_img": "url",
      "object_state": "Disponible",
      "Donor": { "user_id": 1, "user_name": "juan" },
      "Recipient": null,
      "Pickup": null
    }
    ```
  - `404 Not Found`: Objeto no encontrado.
    ```json
    { "error": "Objeto no encontrado" }
    ```
  - `500 Internal Server Error`: Error del servidor.
    ```json
    { "error": "Error del servidor" }
    ```

#### **POST /object**

Crea un nuevo objeto.

- **Encabezados**:
  - `Authorization: <token>`
- **Cuerpo** (JSON):
  ```json
  {
    "object_name": "string",
    "object_description": "string",
    "object_img": "string",
    "pickup_area": "string",
    "pickup_start_date": "string",
    "pickup_end_date": "string"
  }
  ```
- **Respuestas**:
  - `200 OK`: Objeto creado.
    ```json
    {
      "object_id": 1,
      "object_name": "Libro",
      "object_description": "Una novela",
      "object_img": "url",
      "object_state": "Disponible",
      "Donor": { "user_id": 1, "user_name": "juan" },
      "Recipient": null,
      "Pickup": {
        "pickup_id": 1,
        "pickup_area": "Centro",
        "pickup_start_date": "2025-05-01",
        "pickup_end_date": "2025-05-02"
      }
    }
    ```
  - `400 Bad Request`: Faltan campos o datos inválidos.
    ```json
    { "error": "Indique de qué objeto se trata" }
    ```
  - `500 Internal Server Error`: Error del servidor.
    ```json
    { "error": "Error del servidor" }
    ```

#### **POST /object/:id/accept**

Reserva un objeto, cambiando su estado a "Reservado".

- **Encabezados**:
  - `Authorization: <token>`
- **Parámetros**:
  - `id` (ruta): ID del objeto (entero).
- **Respuestas**:
  - `200 OK`: Objeto reservado.
    ```json
    {
      "object_id": 1,
      "object_name": "Libro",
      "object_description": "Una novela",
      "object_img": "url",
      "object_state": "Reservado",
      "Donor": { "user_id": 2, "user_name": "ana" },
      "Recipient": { "user_id": 1, "user_name": "juan" },
      "Pickup": null
    }
    ```
  - `400 Bad Request`: Objeto no disponible o usuario es el donante.
    ```json
    { "error": "Objeto no disponible" }
    ```
  - `404 Not Found`: Objeto no encontrado.
    ```json
    { "error": "Objeto no encontrado" }
    ```
  - `500 Internal Server Error`: Error del servidor.
    ```json
    { "error": "Error del servidor" }
    ```

#### **POST /object/:id/reject**

Cancela la reserva de un objeto, devolviéndolo a "Disponible".

- **Encabezados**:
  - `Authorization: <token>`
- **Parámetros**:
  - `id` (ruta): ID del objeto (entero).
- **Respuestas**:
  - `200 OK`: Reserva cancelada.
    ```json
    {
      "object_id": 1,
      "object_name": "Libro",
      "object_description": "Una novela",
      "object_img": "url",
      "object_state": "Disponible",
      "Donor": { "user_id": 2, "user_name": "ana" },
      "Recipient": null,
      "Pickup": null
    }
    ```
  - `400 Bad Request`: Objeto no reservado o usuario no autorizado.
    ```json
    { "error": "Objeto no reservado" }
    ```
  - `404 Not Found`: Objeto no encontrado.
    ```json
    { "error": "Objeto no encontrado" }
    ```
  - `500 Internal Server Error`: Error del servidor.
    ```json
    { "error": "Error del servidor" }
    ```

#### **PUT /object/:id**

Actualiza un objeto (solo por el donante).

- **Encabezados**:
  - `Authorization: <token>`
- **Parámetros**:
  - `id` (ruta): ID del objeto (entero).
- **Cuerpo** (JSON):
  ```json
  {
    "object_name": "string",
    "object_description": "string",
    "object_img": "string"
  }
  ```
- **Respuestas**:
  - `200 OK`: Objeto actualizado.
    ```json
    {
      "object_id": 1,
      "object_name": "Libro actualizado",
      "object_description": "Una novela",
      "object_img": "url",
      "object_state": "Disponible",
      "Donor": { "user_id": 1, "user_name": "juan" },
      "Recipient": null,
      "Pickup": null
    }
    ```
  - `400 Bad Request`: Campos inválidos o usuario no autorizado.
    ```json
    { "error": "Campos inválidos: object_state" }
    ```
  - `404 Not Found`: Objeto no encontrado.
    ```json
    { "error": "Objeto no encontrado" }
    ```
  - `500 Internal Server Error`: Error del servidor.
    ```json
    { "error": "Error del servidor" }
    ```

#### **DELETE /object/:id**

Elimina un objeto (solo por el donante).

- **Encabezados**:
  - `Authorization: <token>`
- **Parámetros**:
  - `id` (ruta): ID del objeto (entero).
- **Respuestas**:
  - `200 OK`: Número de objetos eliminados (1 o 0).
    ```json
    1
    ```
  - `404 Not Found`: Objeto no encontrado.
    ```json
    { "error": "Objeto no encontrado" }
    ```
  - `403 Forbidden`: Usuario no autorizado.
    ```json
    { "error": "Permiso denegado" }
    ```
  - `500 Internal Server Error`: Error del servidor.
    ```json
    { "error": "Error del servidor" }
    ```

### Recogidas

#### **GET /pickup**

Obtiene todas las recogidas.

- **Respuestas**:
  - `200 OK`: Lista de recogidas.
    ```json
    [
      {
        "pickup_id": 1,
        "pickup_area": "Centro",
        "pickup_start_date": "2025-05-01",
        "pickup_end_date": "2025-05-02",
        "pickup_object_id": 1,
        "ObjectModel": { "object_id": 1, "object_name": "Libro" }
      }
    ]
    ```
  - `500 Internal Server Error`: Error del servidor.
    ```json
    { "error": "Error del servidor" }
    ```

#### **GET /pickup/:id**

Obtiene una recogida por ID.

- **Parámetros**:
  - `id` (ruta): ID de la recogida (entero).
- **Respuestas**:
  - `200 OK`: Datos de la recogida.
    ```json
    {
      "pickup_id": 1,
      "pickup_area": "Centro",
      "pickup_start_date": "2025-05-01",
      "pickup_end_date": "2025-05-02",
      "pickup_object_id": 1,
      "ObjectModel": { "object_id": 1, "object_name": "Libro" }
    }
    ```
  - `500 Internal Server Error`: Error del servidor.
    ```json
    { "error": "Error del servidor" }
    ```

#### **POST /pickup**

Crea una nueva recogida.

- **Encabezados**:
  - `Authorization: <token>`
- **Cuerpo** (JSON):
  ```json
  {
    "pickup_area": "string",
    "pickup_start_date": "string",
    "pickup_end_date": "string",
    "pickup_object_id": integer
  }
  ```
- **Respuestas**:
  - `200 OK`: Recogida creada.
    ```json
    {
      "pickup_id": 1,
      "pickup_area": "Centro",
      "pickup_start_date": "2025-05-01",
      "pickup_end_date": "2025-05-02",
      "pickup_object_id": 1,
      "ObjectModel": { "object_id": 1, "object_name": "Libro" }
    }
    ```
  - `400 Bad Request`: Faltan campos o `pickup_object_id` inválido.
    ```json
    { "error": "Debe indicar el área de recogida" }
    ```
  - `500 Internal Server Error`: Error del servidor.
    ```json
    { "error": "Error del servidor" }
    ```

#### **PUT /pickup/:id**

Actualiza una recogida.

- **Encabezados**:
  - `Authorization: <token>`
- **Parámetros**:
  - `id` (ruta): ID de la recogida (entero).
- **Cuerpo** (JSON):
  ```json
  {
    "pickup_area": "string",
    "pickup_start_date": "string",
    "pickup_end_date": "string",
    "pickup_object_id": integer
  }
  ```
- **Respuestas**:
  - `200 OK`: Recogida actualizada.
    ```json
    1
    ```
  - `400 Bad Request`: Fechas inválidas o datos incorrectos.
    ```json
    { "error": "Fecha inicial inválida" }
    ```
  - `500 Internal Server Error`: Error del servidor.
    ```json
    { "error": "Error del servidor" }
    ```

#### **DELETE /pickup/:id**

Elimina una recogida.

- **Encabezados**:
  - `Authorization: <token>`
- **Parámetros**:
  - `id` (ruta): ID de la recogida (entero).
- **Respuestas**:
  - `200 OK`: Número de recogidas eliminadas (1 o 0).
    ```json
    1
    ```
  - `500 Internal Server Error`: Error del servidor.
    ```json
    { "error": "Error del servidor" }
    ```

### Cloudinary

#### **GET /cloudinary/config**

Obtiene la configuración de Cloudinary para subir imágenes.

- **Respuestas**:
  - `200 OK`: Configuración de Cloudinary.
    ```json
    {
      "cloud_name": "string",
      "upload_preset": "string"
    }
    ```
  - `500 Internal Server Error`: Error del servidor.
    ```json
    { "error": "Error interno" }
    ```

## Manejo de Errores

Los errores devuelven un objeto JSON con un campo `error`:
```json
{ "error": "Mensaje de error" }
```

Códigos de estado comunes:
- `200 OK`: Éxito.
- `201 Created`: Recurso creado.
- `400 Bad Request`: Parámetros inválidos o ausentes.
- `401 Unauthorized`: Token inválido o ausente.
- `403 Forbidden`: Permiso denegado.
- `404 Not Found`: Recurso no encontrado.
- `500 Internal Server Error`: Error del servidor.

## Instrucciones de Configuración

1. **Clonar el Repositorio**:
   ```bash
   git clone https://github.com/Ceci222/Lo_quiero.git
   cd Lo_quiero
   ```

2. **Instalar Dependencias**:
   ```bash
   npm install
   ```

3. **Configurar Entorno**:
   - Crea un archivo `.env` con las siguientes variables (valores de ejemplo):
     ```
     APP_HOST=localhost
     APP_PORT=3001
     DB_HOST=mysql
     DB_PORT=3306
     DB_ROOT_PASSWORD=****
     DB_NAME=****
     DB_USER=****
     DB_PASSWORD=****
     NODE_ENV=development
     JWT_SECRET=****
     CLOUDINARY_CLOUD_NAME=****
     CLOUDINARY_UPLOAD_PRESET=****
     ```

4. **Ejecutar con Docker**:
   ```bash
   docker compose up --build
   ```

5. **Acceder a la API**:
   - Abre `http://localhost:3001` en un navegador o en Postman.

## Ejemplo de Uso 
###Postman:

1. **Registrar un Usuario**:
   - **Solicitud**:
     ```http
     POST http://localhost:3001/register
     Content-Type: application/json
     {
       "user_name": "juan",
       "user_email": "juan@ejemplo.com",
       "user_pwd": "Pass1234"
     }
     ```
   - **Respuesta**:
     ```json
     {
       "token": "jwt_token",
       "user": {
         "user_id": 1,
         "user_name": "juan",
         "user_email": "juan@ejemplo.com"
       }
     }
     ```

2. **Iniciar Sesión**:
   - **Solicitud**:
     ```http
     POST http://localhost:3001/login
     Content-Type: application/json
     {
       "user_email": "juan@ejemplo.com",
       "user_pwd": "Pass1234"
     }
     ```
   - **Respuesta**:
     ```json
     {
       "token": "jwt_token",
       "user_name": "juan"
     }
     ```

3. **Obtener Perfil del Usuario**:
   - **Solicitud**:
     ```http
     GET http://localhost:3001/user/profile/1
     Authorization: <jwt_token>
     ```
   - **Respuesta**:
     ```json
     {
       "user_id": 1,
       "user_name": "juan",
       "user_email": "juan@ejemplo.com",
       "DonatedObjects": [],
       "ReceivedObjects": []
     }
     ```

4. **Crear un Objeto**:
   - **Solicitud**:
     ```http
     POST http://localhost:3001/object
     Authorization: <jwt_token>
     Content-Type: application/json
     {
       "object_name": "Libro",
       "object_description": "Una novela",
       "object_img": "url",
       "pickup_area": "Centro",
       "pickup_start_date": "2025-05-01",
       "pickup_end_date": "2025-05-02"
     }
     ```
   - **Respuesta**:
     ```json
     {
       "object_id": 1,
       "object_name": "Libro",
       "object_description": "Una novela",
       "object_img": "url",
       "object_state": "Disponible",
       "Donor": { "user_id": 1, "user_name": "juan" },
       "Recipient": null,
       "Pickup": {
         "pickup_id": 1,
         "pickup_area": "Centro",
         "pickup_start_date": "2025-05-01",
         "pickup_end_date": "2025-05-02"
       }
     }
     ```
