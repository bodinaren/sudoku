import {BehaviorSubject} from "rxjs/BehaviorSubject";

export interface INote {
    val: boolean;
    toggleValue(val?: boolean);
    toggleInvalid(val?: boolean);
}

/**
 * A note of the Sudoku board.
 */
export class Note extends BehaviorSubject<boolean> {
    num: number;

    protected _val: boolean = false;
    protected _isInvalid: boolean = false;

    constructor(num: number, value: boolean, isInvalid: boolean) {
        super(value && !isInvalid);

        this.num = num;
        this._val = value;
        this._isInvalid = isInvalid;
    }

    get val(): boolean {
        return (this._val && !this._isInvalid);
    }

    toggleValue(val?: boolean) {
        if (typeof val === "undefined") val = !this._val;
        if (this.value !== val) {
            this._val = val;

            if (!this._isInvalid) {
                this.next();
            }
        }
    }

    toggleInvalid(val?: boolean) {
        if (typeof val === "undefined") val = !this._isInvalid;
        if (this._isInvalid !== val) {
            this._isInvalid = val;

            this.next();
        }
    }
    
    next() {
        // console.log("note.next");
        super.next(this.val);
    }
}
