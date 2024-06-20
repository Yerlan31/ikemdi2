import { DataTypes, Model } from 'sequelize';
import sequelize from './index';
import User from "./users";

class Athlete extends Model {
    public id!: number;
    public name!: string;
    public age!: number;
    public weightCategory!: string;
    public city!: string;
    public achievements!: string;
    public imageUrl!: String; // Changed to Buffer to store binary data
    public created_at!: Date;
    public updated_at!: Date;
    public userId!: number; // Foreign key for User
}

Athlete.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
    },
    weightCategory: {
        type: DataTypes.STRING,
    },
    city: {
        type: DataTypes.STRING,
    },
    achievements: {
        type: DataTypes.TEXT,
    },
    imageUrl: {
        type: DataTypes.TEXT, // Changed to BLOB to store binary data
    },
    created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
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
    modelName: 'athlete',
    timestamps: true,
    underscored: true,
});

export default Athlete;
