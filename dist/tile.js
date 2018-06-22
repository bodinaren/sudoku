"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tile = /** @class */ (function () {
    function Tile(NOTE_TYPE, id, value, blocked, group) {
        if (blocked === void 0) { blocked = false; }
        var _this = this;
        this.NOTE_TYPE = NOTE_TYPE;
        this.isInvalid = false;
        this.id = id;
        this.value = value;
        this.blocked = blocked;
        this.notes = Array.apply(undefined, Array(9)).map(function (x, idx) { return new _this.NOTE_TYPE(idx + 1, false, false); });
        // this._notes = Array.apply(undefined, Array(9)).map(Boolean); // init an array with length 9 with false as default values
        this.invalidNotes = Array.apply(undefined, Array(9)).map(Boolean); // init an array with length 9 with false as default values
        this.column = this.id % 9;
        this.row = Math.floor(this.id / 9);
        this.region = Math.floor(this.column / 3) + (this.row - this.row % 3);
    }
    Object.defineProperty(Tile.prototype, "value", {
        /** The number of the cell. 0 means empty. Cannot be updated if `blocked === true` */
        get: function () {
            return this._val;
        },
        set: function (val) {
            if (!this.blocked && this._val !== val) {
                this._val = val;
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
        return this.value === other.value;
    };
    /** Check if the cell is empty (value === 0) */
    Tile.prototype.isEmpty = function () {
        return this.value === 0;
    };
    /**
     * Clear the value, notes and invalid notes of this tile.
     */
    Tile.prototype.clear = function () {
        if (!this.blocked)
            this.value = 0;
        this.notes.forEach(function (x) { return x.toggleValue(false); });
        // this._notes = this._notes.map(() => false);
        this.clearInvalidNotes();
    };
    return Tile;
}());
exports.Tile = Tile;
//# sourceMappingURL=tile.js.map