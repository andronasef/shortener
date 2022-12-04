const { Deta } = require('deta'); // import Deta
require('dotenv').config()

const deta = Deta(process.env.DB_KEY);

const shortsDB = deta.Base('shortener');



module.exports = shortsDB;