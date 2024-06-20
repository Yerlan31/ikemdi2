import { Model, DataTypes } from 'sequelize';
import sequelize from './index';

class News extends Model {
    public id!: number;
    public title!: string;
    public content!: string;
    public imageUrl!: string | undefined; // Changed to Buffer to store binary data
}

News.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    imageUrl: {
        type: DataTypes.TEXT, // Changed to BLOB to store binary data
        allowNull: true,
    },
}, {
    underscored: true,
    sequelize,
    modelName: 'news',
    timestamps: false,
});

export default News;
