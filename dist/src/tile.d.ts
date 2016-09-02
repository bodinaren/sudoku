import { IGroup } from "./group";
export interface ITile {
    id: number;
    value: number;
    blocked: boolean;
    notes: boolean[];
    group: IGroup;
    isInvalid: boolean;
    col: number;
    row: number;
    region: number;
    getNotes(): boolean[];
    toggleNote(num: number): any;
    setInvalidNote(num: number, isInvalid: boolean): any;
    clearInvalidNotes(): any;
    equals(other: ITile): boolean;
    isEmpty(): boolean;
    clear(): any;
}
/**
 * A tile of the Sudoku board.
 * Normally you'll not want to use the property setters, but use the functions or let `Sudoku` to do this for you.
 */
export declare class Tile<G extends IGroup> {
    /** The ID of the cell, a number between 0 and 80 */
    id: number;
    private _value;
    /** The number of the cell. 0 means empty. Cannot be updated if `blocked === true` */
    value: number;
    /**
     * Whether this cell had an initial value. Cells that are blocked shouldn't ever change value.
     */
    blocked: boolean;
    /**
     * Note: In most cases you should use `getNotes` and `toggleNote`.
     * The notes that has been set on a 0-based index (e.g. `notes[0] === true` means a note for number 1 has been set).
     */
    notes: boolean[];
    private _notes;
    /** Which group the cell belongs to. Only used in Killer Sudoku. */
    group: G;
    isInvalid: boolean;
    private invalidNotes;
    /** Which column the tile belong to. */
    col: number;
    /** Which row the tile belong to. */
    row: number;
    /** Which region the tile belong to. */
    region: number;
    constructor(id: number, value: number, blocked?: boolean, group?: G);
    /**
     * Get which notes has been set in this cell, excluding the notes that has been set as invalid by setInvalidNote
     */
    getNotes(): boolean[];
    /**
     * Toggles the note of a cell.
     * @param num {number} A value between 1-9
     * @param val {boolean?} Whether to set or unset the boolean. If not set, it'll set to the opposite of current value.
     */
    toggleNote(num: number, val?: boolean): void;
    /**
     * Set a note as invalid for this tile.
     * @param num {number} The value of the note that should be set
     * @param isInvalid {boolean=true} If the cell should be set as invalid or not
     */
    setInvalidNote(num: number, isInvalid?: boolean): void;
    /**
     * Set back all note as valid
     */
    clearInvalidNotes(): void;
    /**
     * Checks if the tile has the same value as the other cell
     * @param other {Tile} The tile to compare with
     */
    equals(other: this): boolean;
    /** Check if the cell is empty (value === 0) */
    isEmpty(): boolean;
    /**
     * Clear the value, notes and invalid notes of this tile.
     */
    clear(): void;
    private updateNotes();
}
