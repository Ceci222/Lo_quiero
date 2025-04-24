import { DataTypes } from "sequelize";
import connection from "../config/sequelize.js";
import User from "./user.js"; //importo el modelo con el que se relaciona

const Object = connection.define(
  "Object",
  {
    object_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    object_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    object_description: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    object_img: {
      type: DataTypes.STRING(255),
      allowNull: false, 
    },
    object_state: {
        type: DataTypes.ENUM('Disponible', 'Reservado'),
        allowNull: false,
        defaultValue: 'Reservado',
      },
    object_donor_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: User,
        key: "user_id",
      },
    },
    object_recipient_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: User,
        key: "user_id",
      },
    },
  },
);

Object.belongsTo(User, { as: "Donor", foreignKey: "object_donor_id" });
Object.belongsTo(User, { as: "Recipient", foreignKey: "object_recipient_id" }); 

export default Object;