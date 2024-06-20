import {Model, DataTypes} from 'sequelize';
import db from '.';
import Athletes from './athletes';

class Matches extends Model {
    public id!: number;
    public tournamentId!: number;
    public startAt!: Date;
    public athlete1Id!: number;
    public athlete2Id!: number;
    public athlete1Score!: number;
    public athlete2Score!: number;
    public athleteWon!: number;
    public inProgress!: boolean;
    public isFinished!: boolean;
    public round!: number;
    public youtubeLink: string;
    public created_at!: Date;
    public updated_at!: Date;
}

Matches.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    tournamentId: { // Foreign key for User
        type: DataTypes.INTEGER,
        references: {
            model: 'tournaments', // name of the table
            key: 'id',
        },
        allowNull: false,
    },
    athlete1Id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: 'athletes',
            key: 'id',
        },
    },
    athlete2Id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: 'athletes',
            key: 'id',
        },
    },
    athleteWon: {
        type: DataTypes.INTEGER,
        references: {
            model: 'athletes',
            key: 'id',
        },
    },
    athlete1Score: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    athlete2Score: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    round: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    inProgress: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
    },
    isFinished: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
    },
    youtubeLink: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    startAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    underscored: true,
    sequelize: db,
    modelName: 'matches',
    timestamps: true,
});

Matches.belongsTo(Athletes, {foreignKey: 'athlete1Id', as: 'athlete1'});
Matches.belongsTo(Athletes, {foreignKey: 'athlete2Id', as: 'athlete2'});
Matches.belongsTo(Athletes, {foreignKey: 'athleteWon', as: 'athlete'});

Athletes.hasMany(Matches, {foreignKey: 'athlete1Id', as: 'athlete1Matches'});
Athletes.hasMany(Matches, {foreignKey: 'athlete2Id', as: 'athlete2Matches'});
Athletes.hasMany(Matches, {foreignKey: 'athleteWon', as: 'athleteMatches'});

export default Matches;
