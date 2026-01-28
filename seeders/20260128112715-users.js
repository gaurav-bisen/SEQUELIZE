'use strict';

/** @type {import('sequelize-cli').Migration} */

export async function up(queryInterface, Sequelize) {
  /**
   * Add seed commands here.
   *
   * Example:
   * await queryInterface.bulkInsert('People', [{
   *   name: 'John Doe',
   *   isBetaMember: false
   * }], {});
  */
  await queryInterface.bulkInsert('Users', [{
    name: "Gaurav",
    email: "gaurav@example.com",
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Ravi",
    email: "ravi@example.com",
    status: "de-activate",
    createdAt: new Date(),
    updatedAt: new Date()
  }
  ]);
}

export async function down(queryInterface, Sequelize) {
  /**
   * Add commands to revert seed here.
   *
   * Example:
   * await queryInterface.bulkDelete('People', null, {});
   */
  await queryInterface.bulkDelete('Users', null, {});
}

