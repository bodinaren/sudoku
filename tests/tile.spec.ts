/// <reference path="../typings/main.d.ts" />

import {Tile} from "../src/tile";
import {Note} from "../src/note";
import {expect} from 'chai';

let _ = 0;

describe("Tile", function() {
    it("notes", function() {
        let tile = new Tile(Note, 0, 0);
        
        expect(tile.getNotes()).to.eql([false, false, false, false, false, false, false, false, false]);

        tile.notes.forEach((x, idx) => { tile.toggleNote(idx + 1) });
        expect(tile.getNotes()).to.eql([true, true, true, true, true, true, true, true, true]);

        tile.setInvalidNote(4, true);
        tile.setInvalidNote(5, true);
        tile.setInvalidNote(6, true);
        expect(tile.getNotes()).to.eql([true, true, true, false, false, false, true, true, true]);
        
        tile.clearInvalidNotes();
        expect(tile.getNotes()).to.eql([true, true, true, true, true, true, true, true, true]);
    });

    it("blocked", function() {
        let tile = new Tile(Note, 0, 5, true);

        tile.val = 1;
        expect(tile.val).to.eql(5);
    });
});
