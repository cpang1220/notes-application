'use strict';

const Sequelize = require('sequelize');
// Edited by CPang (Test 2 note version)
module.exports.define = sequelize => {
    return sequelize.define('Version', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        body: {
            type: Sequelize.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        version: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        note_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    });
};