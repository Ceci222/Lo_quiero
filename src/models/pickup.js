import { DataTypes } from "sequelize";
import connection from "../config/sequelize.js";

const Pickup = connection.define("pickup", {
  pickup_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  pickup_object_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: 'object', //indico que se relaciona con la tabla object
      key: "object_id", //es la columna en la tabla referenciada que actúa como clave primaria
    },
  },
  pickup_area: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  pickup_start_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  pickup_end_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

export default Pickup;
