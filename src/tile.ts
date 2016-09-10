
import {IGroup} from "./group";
import {Note, INote} from "./note";
import {List} from "btypescript";
import {BehaviorSubject, Observable} from "rxjs";

export interface ITile {
    id: number;
    val: number;
    blocked: boolean;
    group: IGroup;
    isInvalid: boolean;
    notes: INote[]
    col: number;
    row: number;
    region: number;
    getNotes(): boolean[];
    toggleNote(num: number, val?: boolean);
    setInvalidNote(num: number, isInvalid: boolean);
    clearInvalidNotes();
    equals(other: ITile): boolean;
    isEmpty(): boolean;
    clear();
}

export class Tile<G extends IGroup, N extends INote> extends BehaviorSubject<number> implements ITile {

    /** The ID of the cell, a number between 0 and 80 */
    id: number;

    protected _val: number;
    /** The number of the cell. 0 means empty. Cannot be updated if `blocked === true` */
    get val(): number {
        return this._val;
    }
    set val(val: number) {
        if (!this.blocked && this._val !== val) {
            this._val = val;

            this.next();
        }
    }

    /** 
     * Whether this cell had an initial value. Cells that are blocked shouldn't ever change value.
     */
    blocked: boolean;

    /** Which group the cell belongs to. Only used in Killer Sudoku. */
    group: G;

    isInvalid: boolean = false;

    notes: N[];
    // private _notes: boolean[];
    private invalidNotes: boolean[];

    /** Which column the tile belong to. */
    col: number;
    /** Which row the tile belong to. */
    row: number;
    /** Which region the tile belong to. */
    region: number;

    constructor(
        private noteType: { new(num: number, value: boolean, isInvalid: boolean) },
        id: number,
        value: number,
        blocked: boolean = false,
        group?: G
    ) {
        super(value);

        this.id = id;
        this.val = value;
        this.blocked = blocked;
        this.notes = Array.apply(undefined, Array(9)).map((x, idx) => new this.noteType(idx + 1, false, false));
        // this._notes = Array.apply(undefined, Array(9)).map(Boolean); // init an array with length 9 with false as default values
        this.invalidNotes = Array.apply(undefined, Array(9)).map(Boolean); // init an array with length 9 with false as default values

        this.col = this.id % 9;
        this.row = Math.floor(this.id / 9);
        this.region = Math.floor(this.col / 3) + (this.row - this.row % 3);
    }

    /**
     * Get which notes has been set in this cell, excluding the notes that has been set as invalid by setInvalidNote
     */
    getNotes(): boolean[] {
        return this.notes.map(x => x.val);
        // return this._notes.map((val, idx) => val && !this.invalidNotes[idx]);
    }

    /**
     * Toggles the note of a cell.
     * @param num {number} A value between 1-9
     * @param val {boolean?} Whether to set or unset the boolean. If not set, it'll set to the opposite of current value.
     */
    toggleNote(num: number, val?: boolean) {
        this.notes[num - 1].toggleValue(val);
        // if (typeof val === "undefined") val = !this._notes[num - 1];
        // this._notes[num - 1] = val;

        // this.subscriber.next(this);
    }
    /**
     * Set a note as invalid for this tile.
     * @param num {number} The value of the note that should be set
     * @param isInvalid {boolean=true} If the cell should be set as invalid or not
     */
    setInvalidNote(num: number, isInvalid: boolean = true) {
        this.notes[num - 1].toggleInvalid(isInvalid);
        // this.invalidNotes[num - 1] = isInvalid;

        // this.subscriber.next(this);
    }
    /**
     * Set back all note as valid
     */
    clearInvalidNotes() {
        this.notes.forEach(x => x.toggleInvalid(false));
        // this.invalidNotes = this.invalidNotes.map(() => false);

        // this.subscriber.next(this);
    }

    /** 
     * Checks if the tile has the same value as the other cell
     * @param other {Tile} The tile to compare with
     */
    equals(other: this): boolean {
        return this.val === other.val;
    }

    /** Check if the cell is empty (value === 0) */
    isEmpty(): boolean {
        return this.val === 0;
    }

    /**
     * Clear the value, notes and invalid notes of this tile.
     */
    clear() {
        if (!this.blocked) this.val = 0;
        this.notes.forEach(x => x.toggleValue(false));
        // this._notes = this._notes.map(() => false);
        this.clearInvalidNotes();

        this.next();
    }

    next(val?: number) {
        // console.log("tile.next");
        if (typeof val === "undefined") val = this.val;
        super.next(val);
    }
}
