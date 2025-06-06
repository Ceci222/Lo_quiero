import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();
const DB_HOST=process.env.DB_HOST;
const DB_PORT = 3306;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_DIALECT = "mysql";

const connection = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    {
        host: DB_HOST,
        dialect: DB_DIALECT,
        port: DB_PORT,
        define: {
            timestamps: false,
            freezeTableName: true
        }
    }
);

async function testConnection() {
    try {
        await connection.authenticate(); //connection.authenticate(); método predefinido de sequelize
        console.log('Conexión con MySQL hecha.');
    } catch (error) {
        console.error('Imposible conectarse a la base de datos:', error);
    }
}

testConnection();

setTimeout(async () => {
    try {
      await connection.authenticate();
      console.log('Conexión con MySQL hecha.');
  
      await connection.sync({ force: false }); 
      console.log('Base de datos sincronizada.');
  
    } catch (error) {
      console.error('Error al conectar o sincronizar la base de datos:', error);
    }
  }, 10000); // Espera 5 segundos antes de ejecutar todo

export default connection;