"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
/**
 * A note of the Sudoku board.
 */
var Note = (function (_super) {
    __extends(Note, _super);
    function Note(num, value, isInvalid) {
        _super.call(this, value && !isInvalid);
        this._val = false;
        this._isInvalid = false;
        this.num = num;
        this._val = value;
        this._isInvalid = isInvalid;
    }
    Object.defineProperty(Note.prototype, "val", {
        get: function () {
            return (this._val && !this._isInvalid);
        },
        enumerable: true,
        configurable: true
    });
    Note.prototype.toggleValue = function (val) {
        if (typeof val === "undefined")
            val = !this._val;
        if (this.value !== val) {
            this._val = val;
            if (!this._isInvalid) {
                this.next();
            }
        }
    };
    Note.prototype.toggleInvalid = function (val) {
        if (typeof val === "undefined")
            val = !this._isInvalid;
        if (this._isInvalid !== val) {
            this._isInvalid = val;
            this.next();
        }
    };
    Note.prototype.next = function () {
        // console.log("note.next");
        _super.prototype.next.call(this, this.val);
    };
    return Note;
}(BehaviorSubject_1.BehaviorSubject));
exports.Note = Note;
//# sourceMappingURL=note.js.map