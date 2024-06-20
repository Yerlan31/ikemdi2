'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      tournament_id: { // Adding user_id column as a foreign key
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tournaments', // name of the users table
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      athlete1_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'athletes',
          key: 'id',
        },
      },
      athlete2_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'athletes',
          key: 'id',
        },
      },
      athlete_won: {
        type: Sequelize.INTEGER,
        references: {
          model: 'athletes',
          key: 'id',
        },
      },
      round: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      athlete1_score: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      athlete2_score: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      in_progress: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      is_finished: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      youtube_link: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      start_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('matches');
  }
};
