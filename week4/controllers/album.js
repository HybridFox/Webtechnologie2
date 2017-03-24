const Album = require("../models/album");

const create = (res, req, next) => {
};

const list = (req, res, next) => {
    Album.find().exec((err, result) => {
        if (err)
            return res.status(500).send(err);
        return res.json(result)
    });
};

module.exports = {
    create: create,
    list: list
};