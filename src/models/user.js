import { DataTypes } from "sequelize";
import connection from "../config/sequelize.js";

const User = connection.define(
  "User",
  {
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_email: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    user_pwd: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    user_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true,
    },
  },

);

export default User;