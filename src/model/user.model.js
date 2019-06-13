var db = require('../config/db');

module.exports.getAll = async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM F_USER');
        res.status(200).send(rows);
    } catch(error) {
        return res.status(400).send(error);
    }
}