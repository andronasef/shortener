const shortsDB = require('../db');

class ShortLink {
    static async getLink(short) {
        const link = await (await shortsDB.fetch({ short })).items[0];

        if (link) {
            shortsDB.update({ clicks: Number(link.clicks) + 1 }, String(link.key))
            return {
                url: link.long,
                clicks: Number(link.clicks) + 1
            };
        }
    }

    static async getLinkByKey(key) {
        return await shortsDB.get(key)

    }

    static async insert(long, short) {
        return await shortsDB.insert({
            short: short.trim(),
            long: long.trim(),
            clicks: 0
        }).then(() => true).catch(() => false);
    }
    static update(key, data) {
        return shortsDB.update(data, key).then(() => true).catch(() => false);
    }

    static async delete(key) {
        return await shortsDB.delete(key).then(() => true).catch(() => false);
    }
}

module.exports = ShortLink