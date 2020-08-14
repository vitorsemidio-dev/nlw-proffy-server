import Knex from 'knex';

export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
  return knex.schema
    .table('classes', table => {
      table.dropColumn('subject');
    })
    .then(() =>
      knex.schema.table('classes', table => {
        table
          .integer('subject_id')
          .nullable()
          .references('id')
          .inTable('subjects')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
      }),
    );
}

export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
  return knex.schema
    .table('classes', table => {
      table.dropColumn('subject_id');
    })
    .then(() =>
      knex.schema.table('classes', table => {
        table.string('subject');
      }),
    );
}
