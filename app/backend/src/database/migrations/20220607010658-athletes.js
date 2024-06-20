'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('athletes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.INTEGER
      },
      weight_category: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      achievements: {
        type: Sequelize.TEXT
      },
      image_url: {
        type: Sequelize.TEXT, // Correct type for storing binary data
        allowNull: true
      },
      user_id: { // Adding user_id column as a foreign key
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users', // name of the users table
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('athletes');
  }
};
