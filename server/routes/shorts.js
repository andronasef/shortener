const express = require('express');
const { getAllShorts, getShort, createShortMild, deleteShort, updateShort, getShortByKey } = require('../controllers/shortController');
const shortsRouter = express.Router();


shortsRouter.route('/').get(getAllShorts).post(...createShortMild);
shortsRouter.route('/:short').get(getShort).delete(deleteShort).patch(updateShort);
shortsRouter.route('/key/:key').get(getShortByKey);

module.exports = shortsRouter;