'use strict';

const _ = require('lodash');
require('should');
const domain = require('../../src/domain');
const model = require('../../src/model');

describe('Tests for domain Version', () => {
    let noteId;
    let domainVersion;

    beforeEach(async () => {
        await model.sequelize.sync({
            force: true
        });

        const version = await domain.Version.createVersion({
            body: 'some body',
            version: 1,
            note_id: 1,
        });
        noteId = 1;
        domainVersion = new domain.Version(version);
    });

    describe('instance method', () => {
        describe('getters', () => {
            it('should get the id', () => {
                domainVersion.id.should.equal(1);
            });
        });

        describe('expose', () => {
            it('should expose the id, body, version, note_id and updatedAt of the version', () => {
                domainVersion.expose().should.match({
                    id: 1
                });
            });
        });

        describe('update', () => {
            it('should update the version', async () => {
                await domain.Version.update({
                    id: 1,
                    body: 'some body',
                    version: 1,
                    note_id: 1,
                });

                domainVersion.expose().should.match({
                    id: 1
                });
            });
        });
    });
});
