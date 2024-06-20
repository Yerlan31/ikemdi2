'use strict';

module.exports = {
  up: async (queryInterface) => {
    // await queryInterface.bulkInsert(
    //   'matches',
    //   [
    //     {
    //       athlete1_id: 1,
    //       athlete1_score: 10,
    //       athlete2_id: 2,
    //       athlete2_score: 8,
    //       in_progress: false,
    //       created_at: new Date(),
    //       updated_at: new Date()
    //     },
    //     {
    //       athlete1_id: 3,
    //       athlete1_score: 12,
    //       athlete2_id: 4,
    //       athlete2_score: 9,
    //       in_progress: false,
    //       created_at: new Date(),
    //       updated_at: new Date()
    //     },
    //     {
    //       athlete1_id: 5,
    //       athlete1_score: 7,
    //       athlete2_id: 1,
    //       athlete2_score: 6,
    //       in_progress: false,
    //       created_at: new Date(),
    //       updated_at: new Date()
    //     },
    //     {
    //       athlete1_id: 2,
    //       athlete1_score: 8,
    //       athlete2_id: 3,
    //       athlete2_score: 10,
    //       in_progress: true,
    //       created_at: new Date(),
    //       updated_at: new Date()
    //     },
    //     {
    //       athlete1_id: 4,
    //       athlete1_score: 6,
    //       athlete2_id: 5,
    //       athlete2_score: 9,
    //       in_progress: true,
    //       created_at: new Date(),
    //       updated_at: new Date()
    //     },
    //   ],
    //   {},
    // );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('matches', null, {});
  },
};
