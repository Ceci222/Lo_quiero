import { DataTypes } from 'sequelize';
import connection from '../config/sequelize.js';

const ObjectModel = connection.define('object', {
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
            model: 'user',
            key: 'user_id',
        },
    },
    object_recipient_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
            model: 'user',
            key: 'user_id',
        },
    },
});

export default ObjectModel;