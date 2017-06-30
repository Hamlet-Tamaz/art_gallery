var pg = require('pg');

// override the framework prototype
F.database = function(callback) {
  return pg.connect({
    user: 'Hamlet_Tamazian',
    database: 'qbi'
    // database: dbName,
    // password: 'db_secret'
    // password: 'CbyzNlS](Iie'
  }, callback);
};