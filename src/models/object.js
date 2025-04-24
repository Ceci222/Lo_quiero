import { DataTypes } from "sequelize";
import connection from "../config/sequelize.js";
import user from "./user.js"; //importo el modelo (por eso en minus)con el que se relaciona

const Object = connection.define(
  "object",
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
        model: user,
        key: "user_id",
      },
    },
    object_recipient_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: user,
        key: "user_id",
      },
    },
  },
);

Object.belongsTo(user, { as: "Donor", foreignKey: "object_donor_id" });
Object.belongsTo(user, { as: "Recipient", foreignKey: "object_recipient_id" }); 

export default Object;