import { ITile } from "./tile";
import { Combination } from "./combination";
export interface IGroup {
    tiles: ITile[];
    id: number;
    value: number;
    combinations: Combination[];
    isInvalid: boolean;
    sum: number;
    isFirstInGroup(tile: ITile): any;
}
/**
 * A group in Killer Sudoku.
 * A group consists of 1-9 tiles in which the total value of the tiles is given as the only clue.
 * Two identical values may not exist twice in a group.
 */
export declare class Group<T extends ITile> {
    /** The tiles that this group consist of. */
    tiles: T[];
    /** The ID of the group. */
    id: number;
    /** The expected sum of the group, e.g. the sum values of all the tiles. */
    value: number;
    /** Which combinations that are possible in this group. */
    combinations: Combination[];
    /** If all the tiles are filled but the total value of the tiles doesn't add up to the expected sum. */
    isInvalid: boolean;
    /** The current sum of the tiles in the group. */
    readonly sum: number;
    constructor(id: number, value: number, tiles?: T[]);
    /** Check if the tile is the first tile in the group (generally where you're expected to print the `value`) */
    isFirstInGroup(tile: T): boolean;
}
