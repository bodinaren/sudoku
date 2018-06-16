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
        var _this = _super.call(this, value && !isInvalid) || this;
        _this._val = false;
        _this._isInvalid = false;
        _this.num = num;
        _this._val = value;
        _this._isInvalid = isInvalid;
        return _this;
    }
    Object.defineProperty(Note.prototype, "val", {
        get: function () {
            return (this._val && !this._isInvalid);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Note.prototype, "isInvalid", {
        get: function () {
            return this._isInvalid;
        },
        enumerable: true,
        configurable: true
    });
    Note.prototype.toggleValue = function (setValue) {
        if (setValue === void 0) { setValue = !this._val; }
        this._val = setValue;
    };
    Note.prototype.toggleInvalid = function (setInvalid) {
        if (setInvalid === void 0) { setInvalid = !this._isInvalid; }
        this._isInvalid = setInvalid;
    };
    return Note;
}(BehaviorSubject_1.BehaviorSubject));
exports.Note = Note;
var ObservableNote = (function (_super) {
    __extends(ObservableNote, _super);
    function ObservableNote(num, value, isInvalid) {
        var _this = _super.call(this, value && !isInvalid) || this;
        _this._val = false;
        _this._isInvalid = false;
        _this.num = num;
        _this._val = value;
        _this._isInvalid = isInvalid;
        return _this;
    }
    Object.defineProperty(ObservableNote.prototype, "value", {
        get: function () {
            return (this._val && !this._isInvalid);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObservableNote.prototype, "isInvalid", {
        get: function () {
            return this._isInvalid;
        },
        enumerable: true,
        configurable: true
    });
    ObservableNote.prototype.toggleValue = function (setValue) {
        if (setValue === void 0) { setValue = !this._val; }
        if (this._val !== setValue) {
            this._val = setValue;
            this.next(this.value);
        }
    };
    ObservableNote.prototype.toggleInvalid = function (setInvalid) {
        if (setInvalid === void 0) { setInvalid = !this._isInvalid; }
        if (this._isInvalid !== setInvalid) {
            this._isInvalid = setInvalid;
            this.next(this.value);
        }
    };
    return ObservableNote;
}(BehaviorSubject_1.BehaviorSubject));
exports.ObservableNote = ObservableNote;
// /**
//  * A note of the Sudoku board.
//  */
// export class Note implements INote {
//   num: number;
//   protected _val: boolean = false;
//   protected _isInvalid: boolean = false;
//   constructor(num: number, value: boolean, isInvalid: boolean) {
//     this.num = num;
//     this._val = value;
//     this._isInvalid = isInvalid;
//   }
//   get val(): boolean {
//     return (this._val && !this._isInvalid);
//   }
//   get isInvalid(): boolean {
//     return this._isInvalid;
//   }
//   toggleValue(setValue?: boolean) {
//     if (typeof setValue === "undefined") setValue = !this._val;
//     if (this._val !== setValue) {
//       this._val = setValue;
//     }
//   }
//   toggleInvalid(setInvalid?: boolean) {
//     if (typeof setInvalid === "undefined") setInvalid = !this._isInvalid;
//     if (this._isInvalid !== setInvalid) {
//       this._isInvalid = setInvalid;
//     }
//   }
// }
// export class ObservableNote extends BehaviorSubject<boolean> implements INote {
//   private _note: Note;
//   constructor(num: number, value: boolean, isInvalid: boolean) {
//     super(value && !isInvalid);
//     this._note = new Note(num, value, isInvalid);
//   }
//   get num(): number {
//     return this._note.num;
//   }
//   set num(value: number) {
//     this._note.num = value;
//   }
//   get val(): boolean {
//     return this._note.val;
//   }
//   get isInvalid(): boolean {
//     return this._note.isInvalid;
//   }
//   toggleValue(setValue?: boolean) {
//     var before = this._note.val;
//     this._note.toggleValue(setValue);
//     if (this._note.val !== before) this.next(this._note.val);
//   }
//   toggleInvalid(setInvalid?: boolean) {
//     var before = this._note.isInvalid;
//     this._note.toggleInvalid(setInvalid);
//     if (this._note.isInvalid !== before) this.next(this._note.isInvalid);
//   }
// }
//# sourceMappingURL=note.js.map