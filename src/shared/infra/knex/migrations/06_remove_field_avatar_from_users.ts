import Knex from 'knex';

export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
  return knex.schema.table('users', table => {
    table.dropColumn('avatar');
  });
  // return knex.schema.alterTable('users', table => {
  //   table.string('avatar').nullable().alter();
  // });
}

export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
  return knex.schema.table('users', table => {
    table.string('avatar').notNullable();
  });
  // return knex.schema.alterTable('users', table => {
  //   table.string('avatar').notNullable().alter();
  // });
}
