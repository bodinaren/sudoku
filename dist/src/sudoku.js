"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var btypescript_1 = require("btypescript");
var _1 = require("./");
/**
 * The base of a Sudoku game.
 * A Sudoku game consists of 81 tiles with values between 1-9 (or 0 for an empty tile).
 * When playing Killer Sudoku, it also contains a number of groups which is the base of the board.
 */
var Sudoku = (function () {
    function Sudoku(tileType, noteType, groupType) {
        this.tileType = tileType;
        this.noteType = noteType;
        this.groupType = groupType;
        /** The 81 tiles of the board. */
        this.tiles = [];
        /** The groups of the board. Only used in Killer Sudoku. */
        this.groups = [];
    }
    /**
     * Shorthand for setupNormalSudoku and setupKillerSudoku
     * @see setupNormalSudoku
     * @see setupKillerSudoku
     */
    Sudoku.prototype.setupSudoku = function (board, mode) {
        if (mode === void 0) { mode = _1.GameModes.Normal; }
        if (mode === _1.GameModes.Killer) {
            this.setupKillerSudoku(board);
        }
        else {
            this.setupNormalSudoku(board);
        }
        return this;
    };
    /**
     * Setup a normal sudoku. All the tiles will be filled in with the board that was sent in
     * @param arr {number[]} An array of numbers that represents the board. Use 0 or a falsy value for an empty cell
     */
    Sudoku.prototype.setupNormalSudoku = function (arr) {
        var _this = this;
        this.mode = _1.GameModes.Normal;
        if (arr.length != 81)
            throw "Invalid board size";
        arr.forEach(function (val, idx) {
            _this.tiles.push(new _this.tileType(_this.noteType, idx, val || 0, !!val));
        });
        this.updateInvalidNotes();
        return this;
    };
    /**
     * Setup a killer sudoku. All the tiles will be filled in with the board that was sent in
     */
    Sudoku.prototype.setupKillerSudoku = function (groups) {
        var _this = this;
        this.mode = _1.GameModes.Killer;
        for (var i = 0; i < 81; i++) {
            this.tiles.push(new this.tileType(this.noteType, i, 0, false));
        }
        groups.forEach(function (group, idx) {
            var tiles = [], value = group[0];
            for (var i = 1; i < group.length; i++) {
                tiles.push(_this.tiles[group[i]]);
            }
            var g = new _this.groupType(idx, value, tiles);
            g.combinations = _1.Calculator.getPossibilities(g.value, g.tiles.length);
            _this.groups.push(g);
            tiles.forEach(function (x) { return x.group = g; });
        });
        this.updateInvalidNotes();
        return this;
    };
    /** Get the tile at a certain 0-based index. */
    Sudoku.prototype.getTileAt = function (idx) {
        return this.tiles[idx];
    };
    /**
     * Set the value of a tile, if the same value was already set, it'll be unset (set to 0).
     * Triggers a check of invalid tiles and groups.
     * @param tile {ITile} The tile to set the value on.
     * @param value {number} The value to set.¨
     * @param updateInvalidTiles {boolean = true} Whether the invalid notes should be updated. Send false for a performance boost.
     */
    Sudoku.prototype.setValue = function (tile, value) {
        if (tile.blocked)
            return false;
        if (tile.val == value)
            tile.val = 0;
        else
            tile.val = value;
        this.updateInvalidTiles();
        this.updateInvalidGroups();
        this.updateInvalidNotes();
        return true;
    };
    /** Check if the Sudoku is finished (no empty and no invalid tiles). */
    Sudoku.prototype.isFinished = function () {
        return btypescript_1.Linq.all(this.tiles, function (x) { return !x.isEmpty() && !x.isInvalid; });
        // let isAllFilled = true;
        // this.board.forEach(x => { if (x.isEmpty()) return isAllFilled = false; })
        // return isAllFilled && this.getInvalidTiles().length == 0;
    };
    /** Check if two tiles are in the same region. */
    Sudoku.prototype.isSameRegion = function (tile1, tile2) {
        if (!tile1 && !tile2)
            return false;
        return (tile1.region == tile2.region);
    };
    /**
     * Get all the tiles that are in the same region (the current tile is excluded).
     * @param tile {ITile} The tile whose region we wanna get.
     */
    Sudoku.prototype.getRegion = function (tile) {
        var rs = [], start = (tile.region % 3 * 3) + ((tile.region - tile.region % 3) * 9);
        for (var row = 0; row < 3; row++) {
            for (var col = 0; col < 3; col++) {
                rs.push(this.tiles[start + col + row * 9]);
            }
        }
        btypescript_1.List.removeAll(rs, function (x) { return x.id === tile.id; }); // remove self
        return rs;
        // Simplier, but probably less performant. Does that matter tho with only 81 items?
        // return Linq.filter(this.tiles, x => x.region == tile.region && x.id !== tile.id);
    };
    /** Check if the tiles are in the same row or the same column. */
    Sudoku.prototype.isSameCross = function (tile1, tile2) {
        if (!tile1 && !tile2)
            return false;
        return (tile1.col == tile2.col || tile1.row == tile2.row);
    };
    /**
     * Get all the tiles that are in the same row or the same column (the current tile excluded).
     * @param tile {ITile} The tile whose row and column we wanna get.
     */
    Sudoku.prototype.getCross = function (tile) {
        var rs = [];
        for (var i = 0; i < 9; i++) {
            rs.push(this.tiles[i * 9 + tile.col]);
            rs.push(this.tiles[tile.row * 9 + i]);
        }
        btypescript_1.List.removeAll(rs, function (x) { return x.id === tile.id; }); // remove self
        return rs;
        // Simplier, but probably less performant. Does that matter tho with only 81 items?
        // return Linq.filter(this.tiles, x => x.id !== tile.id && (x.col === tile.col || x.row === tile.row));
    };
    /**
     * Gets all the tiles with a certain value.
     * @param num {number} The value to get.
     */
    Sudoku.prototype.getTilesWithValue = function (num) {
        return btypescript_1.Linq.filter(this.tiles, function (x) { return x.value === num; });
    };
    /** Check if two tiles are invalid */
    Sudoku.prototype.isInvalid = function (tile1, tile2) {
        if (tile1.id === tile2.id || tile1.isEmpty() || !tile1.equals(tile2))
            return false;
        return this.isSameRegion(tile1, tile2) || this.isSameCross(tile1, tile2)
            || (this.isKillerMode() && tile1.group.id === tile2.group.id);
    };
    /**
     * Update the cells that are invalid.
     * @param lazy {boolean} If true it'll stop as soon as it finds an invalid cell.
     * @returns {boolean} true if the board has is valid
     */
    Sudoku.prototype.updateInvalidTiles = function (lazy) {
        if (lazy === void 0) { lazy = false; }
        var t1, t2, isBoardValid = true;
        this.tiles.forEach(function (x) { x.isInvalid = false; });
        for (var i = 0; i < this.tiles.length; i++) {
            t1 = this.tiles[i];
            for (var j = i + 1; j < this.tiles.length; j++) {
                t2 = this.tiles[j];
                if (this.isInvalid(t1, t2)) {
                    t1.isInvalid = t2.isInvalid = true;
                    isBoardValid = false;
                    if (lazy)
                        return false;
                }
            }
        }
        return isBoardValid;
    };
    /**
     * Update all the notes that are invalid based on values already set.
     * This will affect the result you get from `Tile.getNotes()`.
     */
    Sudoku.prototype.updateInvalidNotes = function () {
        var t1;
        // TODO: this trigger all tiles (almost) to trigger an .next() event, can we be smarter about this?
        this.tiles.forEach(function (x) { x.clearInvalidNotes(); });
        for (var i = 0; i < this.tiles.length; i++) {
            t1 = this.tiles[i];
            if (t1.val) {
                this.getCross(t1).forEach(function (x) { x.setInvalidNote(t1.val, true); });
                this.getRegion(t1).forEach(function (x) { x.setInvalidNote(t1.val, true); });
                if (this.isKillerMode())
                    t1.group.tiles.forEach(function (x) { x.setInvalidNote(t1.val, true); });
            }
        }
    };
    /**
     * Updates all the groups that are invalid based on the values of the tiles in that group.
     * It'll only be set as invalid if `Group.sum` is greater than `Group.value` or if all tiles has a value and `Group.sum` does not equal `Group.value`.
     */
    Sudoku.prototype.updateInvalidGroups = function () {
        if (!this.isKillerMode())
            return;
        this.groups.forEach(function (g) {
            g.isInvalid = false;
            if (g.sum > g.value) {
                g.isInvalid = true;
            }
            else if (btypescript_1.Linq.all(g.tiles, function (x) { return x.value > 0; }) && g.sum !== g.value) {
                g.isInvalid = true;
            }
        });
    };
    /** Check if the board is a normal Sudoku */
    Sudoku.prototype.isNormalMode = function () { return (this.mode === _1.GameModes.Normal); };
    /** Check if the board is a Killer Sudoku */
    Sudoku.prototype.isKillerMode = function () { return (this.mode === _1.GameModes.Killer); };
    return Sudoku;
}());
exports.Sudoku = Sudoku;
/**
 * This class simplify the usage of Sudoku, using the default Tile, Note and Group.
 */
var DefaultSudoku = (function (_super) {
    __extends(DefaultSudoku, _super);
    function DefaultSudoku() {
        return _super.call(this, _1.Tile, _1.Note, _1.Group) || this;
    }
    return DefaultSudoku;
}(Sudoku));
exports.DefaultSudoku = DefaultSudoku;
//# sourceMappingURL=sudoku.js.map