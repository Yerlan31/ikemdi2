'use strict';

module.exports = {
  up: async (queryInterface) => {
    // // Fetch user IDs from the users table
    // const users = await queryInterface.sequelize.query(
    //   `SELECT id FROM users;`
    // );
    //
    // const userRows = users[0];
    //
    // const athleteData = [
    //   {
    //     name: 'John Doe',
    //     age: 28,
    //     weight_category: 'Lightweight',
    //     city: 'USA',
    //     achievements: 'Gold medal in national championship',
    //     image_url: '/uploads/john_doe.jpg',
    //     user_id: userRows[0]?.id,
    //     created_at: new Date(),
    //     updated_at: new Date()
    //   },
    //   {
    //     name: 'Jane Smith',
    //     age: 26,
    //     weight_category: 'Middleweight',
    //     city: 'Canada',
    //     achievements: 'Silver medal in international tournament',
    //     image_url: '/uploads/jane_smith.jpg',
    //     user_id: userRows[1]?.id,
    //     created_at: new Date(),
    //     updated_at: new Date()
    //   },
    //   {
    //     name: 'Jordan Smooth',
    //     age: 22,
    //     weight_category: 'Middleweight',
    //     city: 'Canada',
    //     achievements: 'Silver medal in international tournament',
    //     image_url: '/uploads/jordan_smooth.jpg',
    //     user_id: userRows[2]?.id,
    //     created_at: new Date(),
    //     updated_at: new Date()
    //   },
    //   {
    //     name: 'Mike Smith',
    //     age: 16,
    //     weight_category: 'Middleweight',
    //     city: 'Canada',
    //     achievements: 'Silver medal in international tournament',
    //     image_url: '/uploads/mike_smith.jpg',
    //     user_id: userRows[3]?.id,
    //     created_at: new Date(),
    //     updated_at: new Date()
    //   },
    //   {
    //     name: 'Lio Jane',
    //     age: 25,
    //     weight_category: 'Middleweight',
    //     city: 'Canada',
    //     achievements: 'Silver medal in international tournament',
    //     image_url: '/uploads/lio_jane.jpg',
    //     user_id: userRows[4]?.id,
    //     created_at: new Date(),
    //     updated_at: new Date()
    //   },
    // ];
    //
    // await queryInterface.bulkInsert('athletes', athleteData, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('athletes', null, {});
  }
};
