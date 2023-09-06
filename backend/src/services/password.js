var bcrypt = require("bcryptjs");

const createPasswordHash = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 8, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const checkPassword = (user, password) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports.createPasswordHash = createPasswordHash;
module.exports.checkPassword = checkPassword;
