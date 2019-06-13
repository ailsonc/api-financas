const bcrypt = require("bcrypt")
     ,saltRounds = 10; 

module.exports.encrypt = async (data) => {
    return bcrypt.hashSync(data, bcrypt.genSaltSync(saltRounds));
};

module.exports.compare = async (data, hash) => {
    return bcrypt.compareSync(data, hash);
};