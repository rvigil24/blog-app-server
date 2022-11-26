'use strict';
const categorias = [
    {
        name: 'Tecnología',
        slug: 'tecnologia',
    },
    {
        name: 'Economía',
        slug: 'economia',
    },
    {
        name: 'Política',
        slug: 'politica',
    },
    {
        name: 'Deporte',
        slug: 'deporte',
    },
    {
        name: 'Cultura',
        slug: 'cultura',
    },
    {
        name: 'Entretenimiento',
        slug: 'entretenimiento',
    },
    {
        name: 'Noticias',
        slug: 'noticias',
    },
    {
        name: 'Otros',
        slug: 'otros',
    },
];
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await queryInterface.bulkInsert('categories', categorias, {
            individualHooks: true,
        });
    },

    async down(queryInterface) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('categories', {
            [Op.or]: categorias,
        });
    },
};
