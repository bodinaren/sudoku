import { IGroup } from "./group";
import { INote } from "./note";
export interface ITile {
    id: number;
    value: number;
    blocked: boolean;
    group: IGroup;
    isInvalid: boolean;
    notes: INote[];
    column: number;
    row: number;
    region: number;
    getNotes(): boolean[];
    toggleNote(num: number, val?: boolean): any;
    setInvalidNote(num: number, isInvalid: boolean): any;
    clearInvalidNotes(): any;
    equals(other: ITile): boolean;
    isEmpty(): boolean;
    clear(): any;
}
export declare class Tile<N extends INote, G extends IGroup> implements ITile {
    private NOTE_TYPE;
    /** The ID of the cell, a number between 0 and 80 */
    id: number;
    protected _val: number;
    /** The number of the cell. 0 means empty. Cannot be updated if `blocked === true` */
    value: number;
    /**
     * Whether this cell had an initial value. Cells that are blocked shouldn't ever change value.
     */
    blocked: boolean;
    /** Which group the cell belongs to. Only used in Killer Sudoku. */
    group: G;
    isInvalid: boolean;
    notes: N[];
    private invalidNotes;
    /** Which column the tile belong to. */
    column: number;
    /** Which row the tile belong to. */
    row: number;
    /** Which region the tile belong to. */
    region: number;
    constructor(NOTE_TYPE: {
        new (num: number, value: boolean, isInvalid: boolean): N;
    }, id: number, value: number, blocked?: boolean, group?: G);
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
     * @param isInvalid {boolean=true} If the note should be set as invalid or not
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
}