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

        tile.setInvalidNote(4); //toggles, should default to true
        tile.setInvalidNote(5, true);
        tile.setInvalidNote(6, true);
        expect(tile.getNotes()).to.eql([true, true, true, false, false, false, true, true, true]);
        
        tile.clearInvalidNotes();
        expect(tile.getNotes()).to.eql([true, true, true, true, true, true, true, true, true]);
    });

    it("blocked", function() {
        let tile = new Tile(Note, 0, 5, true);

        expect(tile.blocked).to.eql(true);

        tile.value = 1;
        expect(tile.value).to.eql(5);
    });

    it("equals", function() {
        let tile1 = new Tile(Note, 0, 5);
        let tile2 = new Tile(Note, 0, 5);

        expect(tile1.equals(tile2)).to.eql(true);
    });

    it("isEmpty", function() {
        let tile = new Tile(Note, 0, 5);

        expect(tile.isEmpty()).to.eql(false);
        
        tile.value = 0;
        expect(tile.isEmpty()).to.eql(true);
    });

    describe("clear", function() {
        it("regular tile", function () {
            let tile = new Tile(Note, 0, 5);

            tile.clear();

            expect(tile.value).to.eql(0);
            expect(tile.notes.every(function(x) { return !x.value; })).to.eql(true);
        });
        
        it("blocked tile", function () {
            let tile = new Tile(Note, 0, 5, true);

            tile.clear();

            expect(tile.value).to.eql(5);
            expect(tile.notes.every(function(x) { return !x.value; })).to.eql(true);
        });
    });
});
