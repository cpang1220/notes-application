'use strict';

const _ = require('lodash');
const model = require('../model');
const domain = require('../domain');
// Edited by CPang (Test 2 note version)
class Version {
    constructor(version) {
        this._version = version;
    }

    get id() {
        return this._version.id;
    }

    expose() {
        return _.pick(this._version, [
            'id',
            'body',
            'version',
            'note_id',
            'updatedAt',
        ]);
    }

    static async update(versionObj) {
        try
        {
            await model.Version.update(versionObj,
                {where: {note_id: versionObj.note_id},
                fields:['updatedAt']});
        }catch(e){
            throw e;
        }
    }
    
    static async versions(noteid) {
        let versions = '';
        try{
            versions = await model.Version.findAll({
                order: [
                    ['version', 'DESC']
                ],
                where: {
                    note_id: noteid
                }
              });
        }catch(e){
         throw(e);
        }
        return _.map(versions, version => new domain.Version(version));
    }

    static async createVersion(versionObj) {
        let createdVersion = '';
        try{
            const builtVersion = model.Version.build(versionObj);
            createdVersion = await builtVersion.save();
        }catch(e){
            throw e;
        }
        return new domain.Version(createdVersion);
    }
}

module.exports = Version;