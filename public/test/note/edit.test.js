'use strict';

describe('noteEdit', function() {
    let $componentController;
    let ctrl;
    let $location;
    let Note;
    let $q;
    let $rootScope;
    let note;

    beforeEach(() => {
        module('app');

        inject((_$componentController_, _Note_, _$location_, _$q_, _$rootScope_) => {
            $componentController = _$componentController_;
            Note = _Note_;
            $location = _$location_;
            $q = _$q_;
            $rootScope = _$rootScope_;
        });

        spyOn($location, 'path');
        spyOn(Note, 'update');

        note = new Note({
            id: 56,
            subject: 'some subject',
            body: 'some body',
            deleted: false,
        });

        ctrl = $componentController('noteEdit', {}, {
            note
        });
    });

    describe('updateNote', () => {
        it('should update the Note then redirect to note detail page if success', () => {
            ctrl.note.deleted = false;
            $rootScope.$digest();
            expect(ctrl.error).toBeUndefined();
        });

        it('should update the Note then set error if success', () => {
            ctrl.note.deleted = false;
            $rootScope.$digest();
            expect($location.path).not.toHaveBeenCalledWith('/notes/56');
        });

        it('should do nothing if any validation error', () => {
            $rootScope.$digest();
            expect(Note.update).not.toHaveBeenCalled();
            expect($location.path).not.toHaveBeenCalledWith('/notes/56');
        });
    });
});
