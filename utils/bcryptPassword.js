const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const comparePassword = async (userPwd, storePwd) => {
  return await bcrypt.compare(userPwd, storePwd);
};

module.exports = { hashPassword, comparePassword };
