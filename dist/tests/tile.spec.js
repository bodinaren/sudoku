"use strict";
var tile_1 = require("../src/tile");
var note_1 = require("../src/note");
var chai_1 = require("chai");
var _ = 0;
describe("Tile", function () {
    it("notes", function () {
        var tile = new tile_1.Tile(note_1.Note, 0, 0);
        chai_1.expect(tile.getNotes()).to.eql([false, false, false, false, false, false, false, false, false]);
        tile.notes.forEach(function (x, idx) { tile.toggleNote(idx + 1); });
        chai_1.expect(tile.getNotes()).to.eql([true, true, true, true, true, true, true, true, true]);
        tile.setInvalidNote(4); //toggles, should default to true
        tile.setInvalidNote(5, true);
        tile.setInvalidNote(6, true);
        chai_1.expect(tile.getNotes()).to.eql([true, true, true, false, false, false, true, true, true]);
        tile.clearInvalidNotes();
        chai_1.expect(tile.getNotes()).to.eql([true, true, true, true, true, true, true, true, true]);
    });
    it("blocked", function () {
        var tile = new tile_1.Tile(note_1.Note, 0, 5, true);
        chai_1.expect(tile.blocked).to.eql(true);
        tile.val = 1;
        chai_1.expect(tile.val).to.eql(5);
    });
    it("equals", function () {
        var tile1 = new tile_1.Tile(note_1.Note, 0, 5);
        var tile2 = new tile_1.Tile(note_1.Note, 0, 5);
        chai_1.expect(tile1.equals(tile2)).to.eql(true);
    });
    it("isEmpty", function () {
        var tile = new tile_1.Tile(note_1.Note, 0, 5);
        chai_1.expect(tile.isEmpty()).to.eql(false);
        tile.val = 0;
        chai_1.expect(tile.isEmpty()).to.eql(true);
    });
    describe("clear", function () {
        it("regular tile", function () {
            var tile = new tile_1.Tile(note_1.Note, 0, 5);
            tile.clear();
            chai_1.expect(tile.val).to.eql(0);
            chai_1.expect(tile.notes.every(function (x) { return !x.value; })).to.eql(true);
        });
        it("blocked tile", function () {
            var tile = new tile_1.Tile(note_1.Note, 0, 5, true);
            tile.clear();
            chai_1.expect(tile.val).to.eql(5);
            chai_1.expect(tile.notes.every(function (x) { return !x.value; })).to.eql(true);
        });
    });
});
//# sourceMappingURL=tile.spec.js.map