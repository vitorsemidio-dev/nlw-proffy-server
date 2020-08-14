import Knex from 'knex';

export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
  return knex.schema
    .table('users', table => {
      table.dropColumn('bio');
      table.dropColumn('whatsapp');
    })
    .then(() =>
      knex.schema.table('users', table => {
        table.string('bio').nullable();
        table.string('whatsapp').nullable();
      }),
    );
}

export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
  return knex.schema
    .table('users', table => {
      table.dropColumn('bio');
      table.dropColumn('whatsapp');
    })
    .then(() =>
      knex.schema.table('users', table => {
        table.string('bio').notNullable();
        table.string('whatsapp').notNullable();
      }),
    );
}
