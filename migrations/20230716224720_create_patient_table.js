/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('Patient', (table) => {
    table.increments('id')
    table.string('ahvNumber').notNullable()
    table.string('firstname').notNullable()
    table.string('lastname').notNullable()
    table.date('dateOfBirth').notNullable()
    table.string('gender').notNullable()
    table.string('phone').notNullable()
    table.string('email').notNullable()
    table.string('streetName').notNullable()
    table.string('streetNumber').notNullable()
    table.string('postalCode').notNullable()
    table.string('city').notNullable()
    table.string('canton').notNullable()
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('Patient')
}
