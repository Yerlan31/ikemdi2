import { DataTypes, Model } from 'sequelize';
import sequelize from './index';

class Tournaments extends Model {
    public id!: number;
    public userId!: number;
    public title!: string;
    public description!: string;
    public yandexLocation!: string | undefined; // Changed to Buffer to store binary data
    public startAt!: Date;
    public endAt!: Date;
    public contacts!: string | undefined; // Foreign key for User
}

Tournaments.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    contacts: {
        type: DataTypes.TEXT,
    },
    yandexLocation: {
        type: DataTypes.TEXT, // Changed to BLOB to store binary data
    },
    startAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    endAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    userId: { // Foreign key for User
        type: DataTypes.INTEGER,
        references: {
            model: 'users', // name of the table
            key: 'id',
        },
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'tournaments',
    timestamps: true,
    underscored: true,
});

export default Tournaments;
