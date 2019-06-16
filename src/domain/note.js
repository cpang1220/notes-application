'use strict';

const _ = require('lodash');

class Note {
    constructor(note) {
        this._note = note;
    }

    get id() {
        return this._note.id;
    }

    expose() {
        return _.pick(this._note, [
            'id',
            'subject',
            'body',
            'updatedAt',
        ]);
    }

    async update(note) {
        // Edited by CPang (Test 1 note subject allow update fix)
        await this._note.update(
            {body: note.body},
            {updatedAt: note.updatedAt});

    }

    async delete() {
        await this._note.destroy();
    }
}

module.exports = Note;
