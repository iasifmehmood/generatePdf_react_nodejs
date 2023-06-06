const QueryDB = require('../config/db_config.js');

exports.createUser = async (name, email, created_at, loginWith) => {
  const data = [name, email, created_at, loginWith];

  return QueryDB(
    'INSERT into users (name,email,created_at,login_with) values(?,?,?,?) ',
    data
  );
};

exports.checkUser = email => {
  return QueryDB('SELECT * FROM users WHERE email = ?', [email]);
};

exports.updateLastAccess = last_accessed => {
  console.log(last_accessed);
  return QueryDB(
    'UPDATE users SET last_accessed = ? WHERE email = ?',
    last_accessed
  );
};
