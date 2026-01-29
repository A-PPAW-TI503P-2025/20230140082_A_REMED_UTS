'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Books', [
      {
        title: 'Laskar Pelangi',
        author: 'Andrea Hirata',
        stock: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Bumi Manusia',
        author: 'Pramoedya Ananta Toer',
        stock: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Negeri 5 Menara',
        author: 'Ahmad Fuadi',
        stock: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Perahu Kertas',
        author: 'Dee Lestari',
        stock: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Ayat-Ayat Cinta',
        author: 'Habiburrahman El Shirazy',
        stock: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Sang Pemimpi',
        author: 'Andrea Hirata',
        stock: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Books', null, {});
  }
};
