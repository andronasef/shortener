const shortsDB = require('../db')
const { body, validationResult } = require('express-validator');
const ShortLink = require('../models/shortlink');


const getAllShorts = async (req, res) => {
    const shorts = await shortsDB.fetch()
    res.send(shorts)
}

const createShort = {
    longVaild: body('long').isString().isLength({ min: 5 }),
    shortValid: body('short').isString().isLength({ min: 5, max: 15 }).custom(async (value) => {
        const shorts = await shortsDB.fetch({ short: value })
        if (shorts.items.length > 0) {
            throw new Error('Short Link already exists')
        }
        return true
    }),
    newShortRequest: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        if (await ShortLink.insert(req.body.long, req.body.short)) {
            res.status(201).send({ msg: "Short Link Was Created" })
        } else res.status(400).send({ msg: "Bad Request" })
    }
}
const createShortMild = [createShort.longVaild, createShort.shortValid, createShort.newShortRequest]

const getShort = async (req, res) => {
    const linkData = await ShortLink.getLink(req.params.short)

    if (linkData) {
        res.send(linkData)
    } else res.status(404).send({ msg: "Not Found" })
}

const getShortByKey = async (req, res) => {
    const linkData = await ShortLink.getLinkByKey(req.params.key)

    if (linkData) {
        res.send(linkData)
    } else res.status(404).send({ msg: "Not Found" })
}

const deleteShort = async (req, res) => {
    // Short As A Key
    if (await ShortLink.delete(req.params.short)) {
        res.send({ msg: "Deleted" })
    } else res.status(404).send({ msg: "Not Found" })

}

const updateShort = async (req, res) => {
    // Short As A Key
    const { long, short } = req.body

    if (long || short) {
        if (await ShortLink.update(req.params.short, req.body)) {
            res.send({ msg: "Updated" })
        } else res.status(404).send({ msg: "Not Found" })
    } else res.status(400).send({ msg: "Bad Request" })
}


module.exports = {
    getAllShorts,
    createShortMild,
    getShort,
    deleteShort,
    updateShort,
    getShortByKey
}