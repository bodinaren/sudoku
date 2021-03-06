/// <reference path="../typings/main.d.ts" />
"use strict";
var tile_1 = require("../src/tile");
var chai_1 = require('chai');
var _ = 0;
describe("Tile", function () {
    it("notes", function () {
        var tile = new tile_1.Tile(0, 0);
        chai_1.expect(tile.notes).to.eql([false, false, false, false, false, false, false, false, false]);
        tile.notes.forEach(function (x, idx) { tile.toggleNote(idx + 1); });
        chai_1.expect(tile.notes).to.eql([true, true, true, true, true, true, true, true, true]);
        tile.setInvalidNote(4, true);
        tile.setInvalidNote(5, true);
        tile.setInvalidNote(6, true);
        chai_1.expect(tile.notes).to.eql([true, true, true, false, false, false, true, true, true]);
        tile.clearInvalidNotes();
        chai_1.expect(tile.notes).to.eql([true, true, true, true, true, true, true, true, true]);
    });
    it("blocked", function () {
        var tile = new tile_1.Tile(0, 5, true);
        tile.value = 1;
        chai_1.expect(tile.value).to.eql(5);
    });
});
//# sourceMappingURL=tile.spec.js.map