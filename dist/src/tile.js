"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var rxjs_1 = require("rxjs");
var Tile = (function (_super) {
    __extends(Tile, _super);
    function Tile(noteType, id, value, blocked, group) {
        if (blocked === void 0) { blocked = false; }
        var _this = _super.call(this, value) || this;
        _this.noteType = noteType;
        _this.isInvalid = false;
        _this.id = id;
        _this.val = value;
        _this.blocked = blocked;
        _this.notes = Array.apply(undefined, Array(9)).map(function (x, idx) { return new _this.noteType(idx + 1, false, false); });
        // this._notes = Array.apply(undefined, Array(9)).map(Boolean); // init an array with length 9 with false as default values
        _this.invalidNotes = Array.apply(undefined, Array(9)).map(Boolean); // init an array with length 9 with false as default values
        _this.col = _this.id % 9;
        _this.row = Math.floor(_this.id / 9);
        _this.region = Math.floor(_this.col / 3) + (_this.row - _this.row % 3);
        return _this;
    }
    Object.defineProperty(Tile.prototype, "val", {
        /** The number of the cell. 0 means empty. Cannot be updated if `blocked === true` */
        get: function () {
            return this._val;
        },
        set: function (val) {
            if (!this.blocked && this._val !== val) {
                this._val = val;
                this.next();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Get which notes has been set in this cell, excluding the notes that has been set as invalid by setInvalidNote
     */
    Tile.prototype.getNotes = function () {
        return this.notes.map(function (x) { return x.value; });
        // return this._notes.map((val, idx) => val && !this.invalidNotes[idx]);
    };
    /**
     * Toggles the note of a cell.
     * @param num {number} A value between 1-9
     * @param val {boolean?} Whether to set or unset the boolean. If not set, it'll set to the opposite of current value.
     */
    Tile.prototype.toggleNote = function (num, val) {
        this.notes[num - 1].toggleValue(val);
        // if (typeof val === "undefined") val = !this._notes[num - 1];
        // this._notes[num - 1] = val;
        // this.subscriber.next(this);
    };
    /**
     * Set a note as invalid for this tile.
     * @param num {number} The value of the note that should be set
     * @param isInvalid {boolean=true} If the note should be set as invalid or not
     */
    Tile.prototype.setInvalidNote = function (num, isInvalid) {
        if (isInvalid === void 0) { isInvalid = true; }
        this.notes[num - 1].toggleInvalid(isInvalid);
        // this.invalidNotes[num - 1] = isInvalid;
        // this.subscriber.next(this);
    };
    /**
     * Set back all note as valid
     */
    Tile.prototype.clearInvalidNotes = function () {
        this.notes.forEach(function (x) { return x.toggleInvalid(false); });
        // this.invalidNotes = this.invalidNotes.map(() => false);
        // this.subscriber.next(this);
    };
    /**
     * Checks if the tile has the same value as the other cell
     * @param other {Tile} The tile to compare with
     */
    Tile.prototype.equals = function (other) {
        return this.val === other.val;
    };
    /** Check if the cell is empty (value === 0) */
    Tile.prototype.isEmpty = function () {
        return this.val === 0;
    };
    /**
     * Clear the value, notes and invalid notes of this tile.
     */
    Tile.prototype.clear = function () {
        if (!this.blocked)
            this.val = 0;
        this.notes.forEach(function (x) { return x.toggleValue(false); });
        // this._notes = this._notes.map(() => false);
        this.clearInvalidNotes();
        this.next();
    };
    Tile.prototype.next = function (val) {
        // console.log("tile.next");
        if (typeof val === "undefined")
            val = this.val;
        _super.prototype.next.call(this, val);
    };
    return Tile;
}(rxjs_1.BehaviorSubject));
exports.Tile = Tile;
//# sourceMappingURL=tile.js.map