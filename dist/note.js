"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A note of the Sudoku board.
 */
var Note = /** @class */ (function () {
    function Note(num, value, isInvalid) {
        this._val = false;
        this._isInvalid = false;
        this.num = num;
        this._val = value;
        this._isInvalid = isInvalid;
    }
    Object.defineProperty(Note.prototype, "value", {
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
}());
exports.Note = Note;
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