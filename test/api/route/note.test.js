'use strict';

require('should');
const sinon = require('sinon');
const route = require('../../../src/api/route');

describe('Tests for api route note', () => {
    let req;
    let res;
    let note;
    let user;

    beforeEach(() => {
        req = {};
        res = {
            json: sinon.spy(),
            sendStatus: sinon.spy(),
        };

        note = {
            expose: sinon.stub().returns('exposedNote'),
            update: sinon.stub().resolves(),
            delete: sinon.stub().resolves(),
        };

        user = {
            createNote: sinon.stub().resolves(note),
            notes: sinon.stub().resolves([
                note,
                note,
                note,
            ]),
        };
    });

    describe('create', () => {
        it('should create a note then json expose it', async () => {
            req.currentUser = user;
            req.body = {
                subject: 'some subject',
                body: 'some body',
            };

            await route.note.create(req, res);

            req.currentUser.createNote.calledWithExactly(req.body).should.be.true();
            res.json.calledWithExactly('exposedNote').should.be.true();
        });
    });

    describe('list', () => {
        it('should the json the list of exposed notes', async () => {
            req.currentUser = user;

            await route.note.list(req, res);

            req.currentUser.notes.calledWithExactly().should.be.true();
            res.json.calledWithExactly([
                'exposedNote',
                'exposedNote',
                'exposedNote',
            ]).should.be.true();
        });
    });

    describe('get', () => {
        it('should json the exposed note', () => {
            req.note = note;

            route.note.get(req, res);

            res.json.calledWithExactly('exposedNote').should.be.true();
        });
    });

    describe('update', () => {
        it('should update a note then json the exposed note', async () => {
            req.note = note;

            req.body = {
                body: 'some body',
            };

            await route.note.update(req, res);

            req.note.update.calledWithExactly(req.body).should.be.true();
            res.json.calledWithExactly('exposedNote').should.be.true();
        });
    });

    // Edited by CPang (Unit Test: Test 1 note subject allow update fix)
    describe('update with note subject', () => {
        it('should update a note without update the note subject, then json the exposed note', async () => {
            req.note = note;
            
            // Note Subject is included, but the Note Subject should remain not updated after api update
            req.body = {
                subject: 'some subject updated',
                body: 'some body',
            };

            await route.note.update(req, res);

            req.note.update.calledWithExactly(req.body).should.be.true();
            res.json.calledWithExactly('exposedNote').should.be.true();
        });
    });

    describe('delete', () => {
        it('should delete a note then send 204 status', async () => {
            req.note = note;

            await route.note.delete(req, res);

            req.note.delete.calledWithExactly().should.be.true();
            res.sendStatus.calledWithExactly(204).should.be.true();
        });
    });
});
