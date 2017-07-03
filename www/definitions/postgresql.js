var pg = require('pg');

// override the framework prototype
F.database = function(callback) {
  return pg.connect({
    user: 'Hamlet_Tamazian',
    database: 'qbi'
  }, callback);
};