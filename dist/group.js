"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A group in Killer Sudoku.
 * A group consists of 1-9 tiles in which the total value of the tiles is given as the only clue.
 * Two identical values may not exist twice in a group.
 */
var Group = /** @class */ (function () {
    function Group(id, value, tiles) {
        /** If all the tiles are filled but the total value of the tiles doesn't add up to the expected sum. */
        this.isInvalid = false;
        this.id = id;
        this.value = value;
        this.tiles = tiles;
    }
    Object.defineProperty(Group.prototype, "sum", {
        /** The current sum of the tiles in the group. */
        get: function () {
            var s = 0;
            for (var _i = 0, _a = this.tiles; _i < _a.length; _i++) {
                var tile = _a[_i];
                s += tile.value;
            }
            return s;
        },
        enumerable: true,
        configurable: true
    });
    /** Check if the tile is the first tile in the group (generally where you're expected to print the `value`) */
    Group.prototype.isFirstInGroup = function (tile) {
        return (this.tiles[0].id === tile.id);
    };
    return Group;
}());
exports.Group = Group;
//# sourceMappingURL=group.js.map