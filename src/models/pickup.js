import { DataTypes } from "sequelize";
import connection from "../config/sequelize.js";
import Objects from "./Objects.js"; // Import Objects for association

const Pickup = connection.define(
  "Pickup",
  {
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
        model: Objects,
        key: "object_id",
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
  },
);

Pickup.belongsTo(Objects, { foreignKey: "pickup_object_id" }); 

export default Pickup; 