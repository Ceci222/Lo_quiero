# Lo_quiero

## Descripción General

Esta API gestiona usuarios, objetos y recogidas para una plataforma de donaciones. 

Está desarrollada con Express.js, sequelize para realizar las consultas a la base de datos y JWT para la autenticación. Aún no se encuentra desplegada, por lo que se ejecuta localmente con Docker.

## URL Base

``` 
http://localhost:3001
```

## Autenticación

- **Token JWT**: Requerido para rutas protegidas (ej. `/user/profile`).

- **Cómo autenticarse**:

  1. Usa `POST /login` o `POST /register` para obtener un token.
  2. Incluye el token en el encabezado `Authorization` para rutas protegidas:

    ```
    Authorization: <token> 
    ```
## Endpoints

### **Autenticación**

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
  - `200 OK`: Usuario creado.
    ```json
    {
      "user_id": 1,
      "user_name": "juan",
      "user_email": "juan@ejemplo.com"
    }
    ```
  - `400 Bad Request`: Faltan campos o `user_name`/`user_email` duplicados.
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
    { "token": "jwt_token" }
    ```
  - `401 Unauthorized`: Credenciales inválidas.
    ```json
    { "error": "Credenciales incorrectas" }
    ```
  - `400 Bad Request`: Faltan `user_email`/`user_name` o `user_pwd`.
    ```json
    { "error": "Ingresa un correo" }
    ```

### **Usuarios**

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

#### **GET /user/profile**
Obtiene el perfil del usuario autenticado.

- **Encabezados**:
  - `Authorization: <token>`
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
  - `400 Bad Request`: Faltan campos.
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

### **Objetos**

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
        "object_state": "",
        "Donor": { "user_id": 1, "user_name": "juan" },
        "Recipient": null,
        "Pickup": null
      }
    ]
    ```
  - `404 Not Found`: No se encontraron objetos.
    ```json
    { "error": "No se encontraron objetos" }
    ```
  - `500 Internal Server Error`: Error del servidor.
    ```json
    { "error": "Error del servidor" }
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

- **Cuerpo** (JSON):
  ```json
  {
    "object_name": "string",
    "object_description": "string",
    "object_img": "string",
    "object_state": "string",
    "object_donor_id": integer,
    "object_recipient_id": integer // opcional
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
      "object_state": "Reservado", //sólo admite "Disponible" o "Reservado"
      "Donor": { "user_id": 1, "user_name": "juan" },
      "Recipient": null
    }
    ```
  - `400 Bad Request`: Faltan campos o `object_donor_id`/`object_recipient_id` inválidos.
    ```json
    { "error": "Indique de qué objeto se trata" }
    ```
  - `500 Internal Server Error`: Error del servidor.
    ```json
    { "error": "Error del servidor" }
    ```

#### **PUT /object/:id**
Actualiza un objeto.

- **Parámetros**:
  - `id` (ruta): ID del objeto (entero).
- **Cuerpo** (JSON):
  ```json
  {
    "object_name": "string",
    "object_description": "string",
    "object_img": "string",
    "object_state": "string" //admite "Disponible" o "Reservado"
    
    //pickup se devuelve pero no admite actualizaciones desde este endpoint
    
  }
  ```
- **Respuestas**:
  - `200 OK`: Objeto actualizado.
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

#### **DELETE /object/:id**
Elimina un objeto.

- **Parámetros**:
  - `id` (ruta): ID del objeto (entero).
- **Respuestas**:
  - `200 OK`: Número de objetos eliminados (1 o 0).
    ```json
    1
    ```
  - `404 Not Found`: Objeto no encontrado.
    ```json
    { "error": "Id no encontrado" }
    ```
  - `500 Internal Server Error`: Error del servidor.
    ```json
    { "error": "Error del servidor" }
    ```

### **Recogidas**

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
  - `404 Not Found`: No se encontraron recogidas.
    ```json
    { "error": "No se encontraron registros" }
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
  - `404 Not Found`: Recogida no encontrada.
    ```json
    { "error": "Recogida no encontrada" }
    ```
  - `500 Internal Server Error`: Error del servidor.
    ```json
    { "error": "Error del servidor" }
    ```

#### **POST /pickup**
Crea una nueva recogida.

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
  - `200 OK`: Número de recogidas actualizadas (1 o 0).
    ```json
    1
    ```
  - `400 Bad Request`: Fechas inválidas.
    ```json
    { "error": "Fecha inicial inválida" }
    ```
  - `404 Not Found`: Recogida no encontrada.
    ```json
    { "error": "Información de recogida no encontrada" }
    ```
  - `500 Internal Server Error`: Error del servidor.
    ```json
    { "error": "Error del servidor" }
    ```

#### **DELETE /pickup/:id**
Elimina una recogida.

- **Parámetros**:
  - `id` (ruta): ID de la recogida (entero).
- **Respuestas**:
  - `200 OK`: Número de recogidas eliminadas (1 o 0).
    ```json
    1
    ```
  - `404 Not Found`: Recogida no encontrada.
    ```json
    { "error": "Recogida no encontrada" }
    ```
  - `500 Internal Server Error`: Error del servidor.
    ```json
    { "error": "Error del servidor" }
    ```

## Manejo de Errores

Los errores devuelven un objeto JSON con un campo `error`:
```json
{ "error": "Mensaje de error" }
```

Códigos de estado comunes:
- `200 OK`: Éxito.
- `400 Bad Request`: Parámetros inválidos o ausentes.
- `401 Unauthorized`: Token inválido o ausente.
- `404 Not Found`: Recurso no encontrado.
- `500 Internal Server Error`: Error del servidor.

## Instrucciones de Configuración

1. **Clonar el Repositorio**:
   ```bash
   git clone <url_del_repositorio>
   cd <directorio_del_repositorio>
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
     ```

4. **Ejecutar con Docker**:
   ```bash
   docker compose up --build
   ```

5. **Acceder a la API**:
   - Abre `http://localhost:3001` en el navegador o postman

## Ejemplo de Uso (Postman)

1. **Registrar un Usuario**:
   - **Solicitud**:
     ```
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
       "user_id": 1,
       "user_name": "juan",
       "user_email": "juan@ejemplo.com"
     }
     ```

2. **Iniciar Sesión**:
   - **Solicitud**:
     ```
     POST http://localhost:3001/login
     Content-Type: application/json
     {
       "user_email": "juan@ejemplo.com",
       "user_pwd": "Pass1234"
     }
     ```
   - **Respuesta**:
     ```json
     { "token": "jwt_token" }
     ```

3. **Obtener Perfil del Usuario**:
   - **Solicitud**:
     ```
     GET http://localhost:3001/user/profile
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

