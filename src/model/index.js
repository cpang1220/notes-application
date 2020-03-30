'use strict';

const Sequelize = require('sequelize');
const config = require('../config');
const sequelize = new Sequelize(config.postgresql.url, {
    logging: false
});
// Edited by CPang (Test 2 note version)
const User = require('./user');
const Note = require('./note');
const Version = require('./version');
const userNoteAssociation = require('./userNote');

const models = {
    sequelize,
    User: User.define(sequelize),
    Note: Note.define(sequelize),
    Version: Version.define(sequelize),
};

userNoteAssociation.define(models);

module.exports = models;
