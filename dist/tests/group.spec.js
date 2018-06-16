"use strict";
var group_1 = require("../src/group");
var tile_1 = require("../src/tile");
var note_1 = require("../src/note");
var chai_1 = require("chai");
describe("Group", function () {
    it("isFirstInGroup", function () {
        var tiles = [
            new tile_1.Tile(note_1.Note, 0, 0),
            new tile_1.Tile(note_1.Note, 1, 0)
        ];
        var group = new group_1.Group(1, 10, tiles);
        chai_1.expect(group.isFirstInGroup(tiles[0])).to.eql(true);
        chai_1.expect(group.isFirstInGroup(tiles[1])).to.eql(false);
    });
    it("sum", function () {
        var tiles = [
            new tile_1.Tile(note_1.Note, 0, 4),
            new tile_1.Tile(note_1.Note, 1, 5)
        ];
        var group = new group_1.Group(1, 10, tiles);
        chai_1.expect(group.sum).to.eql(9);
        tiles[1].val = 9;
        chai_1.expect(group.sum).to.eql(13);
    });
});
//# sourceMappingURL=group.spec.js.map