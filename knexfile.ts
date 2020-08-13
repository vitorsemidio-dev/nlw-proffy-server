import path from 'path';

module.exports = {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(
      __dirname,
      'src',
      'shared',
      'infra',
      'knex',
      'database.sqlite',
    ),
  },
  migrations: {
    directory: path.resolve(
      __dirname,
      'src',
      'shared',
      'infra',
      'knex',
      'migrations',
    ),
  },
  useNullAsDefault: true,
};
