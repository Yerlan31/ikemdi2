'use strict';

module.exports = {
  up: async (queryInterface) => {
    const newsData = [
      {
        title: 'First News Title',
        content: 'This is the content of the first news.',
        image_url: '/uploads/sample1.jpg',
      },
      {
        title: 'Second News Title',
        content: 'This is the content of the second news.',
        image_url: '/uploads/sample2.jpg',
      },
      {
        title: 'Third News Title',
        content: 'This is the content of the third news.',
        image_url: '/uploads/sample3.jpg',
      }
    ];

    await queryInterface.bulkInsert('news', newsData);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('news', null, {});
  }
};
