'use strict';

const _ = require('lodash');
// Edited by CPang (Test 2 note version)
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
            'updatedAt',
            'deleted',
        ]);
    }

    async update(note) {
        // Edited by CPang (Test 1 note subject update fix)
        await this._note.update(note,
            {fields:['deleted','updatedAt']});
    }

    async delete() {
        await this._note.destroy();
    }
}

module.exports = Note;
