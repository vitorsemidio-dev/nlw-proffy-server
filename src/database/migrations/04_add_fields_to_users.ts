import Knex from 'knex';

export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
  return knex.schema.table('users', table => {
    table.string('lastname').notNullable().defaultTo('');
    table.string('email').notNullable().defaultTo('');
    table.string('password').notNullable().defaultTo('');
  });
}

export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
  return knex.schema.table('users', table => {
    table.dropColumn('lastname');
    table.dropColumn('email');
    table.string('password');
  });
}
