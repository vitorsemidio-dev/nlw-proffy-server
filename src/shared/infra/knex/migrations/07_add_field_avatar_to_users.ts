import Knex from 'knex';

export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
  return knex.schema.table('users', table => {
    table.string('avatar').nullable();
  });
}

export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
  return knex.schema.table('users', table => {
    table.dropColumn('avatar');
  });
}
