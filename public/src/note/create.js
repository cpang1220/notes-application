'use strict';

angular.module('app').component('noteCreate', {
    templateUrl: '/src/note/create.html',
    bindings: {
        session: '<',
    },
    // Edited by CPang (Test 2 note version)
    controller: function(Note, Version, $location) {
        this.createNote = function() {
            this.error = this._validate();

            if (!this.error) {
                Note.save({
                    subject: this.subject,
                    deleted: false
                }).$promise.then((result) => {
                    Version.save({
                        body: this.body,
                        version: 1,
                        note_id: result.id  
                    }).$promise.then(() => {
                        $location.path('/');
                    }).catch(reason => {
                        this.error = 'Error occurred while creating a version.';
                    });
                }).catch(reason => {
                    this.error = 'Error occurred while creating a note.';
                });
            }
        };

        this._validate = function() {
            if (!this.subject) {
                return 'The subject is empty.';
            }

            if (!this.body) {
                return 'The body is empty.';
            }
        };
    },
});
