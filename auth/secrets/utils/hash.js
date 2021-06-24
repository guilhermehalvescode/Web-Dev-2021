const bcrypt = require("bcrypt");

module.exports = {
  hash: async (password) => {
    if(!password) throw new Error("Invalid password");
    return await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
  },
  compare: async (password, hash) => {
    if(!password || !hash) throw new Error("Invalid password/hash");
    return await bcrypt.compare(password, hash);
  }
}