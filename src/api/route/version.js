'use strict';

// Edited by CPang (Test 2 note version)
const _ = require('lodash');
const domain = require('../../domain');

module.exports.create = async (req, res) => {
    try {
        const version = await domain.Version.createVersion(req.body);
        res.json(version.expose());
    }
    catch (e) {
        throw e;
    }
};

module.exports.get = async (req, res) => {
    try {
        const versionsArr = await domain.Version.versions(req.params.noteId);
        res.json(_.invokeMap(versionsArr, 'expose'));
    }
    catch (e) {
        throw e;
    }
};

module.exports.update = async (req, res) => {
    try {
        const version = await domain.Version.update(req.body);
        res.json(version.expose());
    }
    catch (e) {
        throw e;
    }
};

module.exports.delete = async (req, res) => {
    res.sendStatus(204);
};
