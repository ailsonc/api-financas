var db = require('../config/db');

module.exports.getAll = async () => {
    try {
        const { rows } = await db.query('SELECT USERNAME, EMAIL, STATUS FROM F_USER');
        return rows;
    } catch(error) {
        throw error;
    }
}

module.exports.getUser = async (email) => {
    try {
        const { rows } = await db.query('SELECT USERNAME, EMAIL, PASSWORD, STATUS FROM F_USER WHERE EMAIL = $1', [email]);
        return rows[0];
    } catch(error) {
        throw error;
    }
}