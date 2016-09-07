import { ITile } from "./tile";
import { IGroup } from "./group";
import { GameModes } from "./gameModes";
import { INote } from "./note";
/**
 * The base of a Sudoku game.
 * A Sudoku game consists of 81 tiles with values between 1-9 (or 0 for an empty tile).
 * When playing Killer Sudoku, it also contains a number of groups which is the base of the board.
 */
export declare class Sudoku<T extends ITile, N extends INote, G extends IGroup> {
    private tileType;
    private noteType;
    private groupType;
    /** The 81 tiles of the board. */
    tiles: T[];
    /** The groups of the board. Only used in Killer Sudoku. */
    groups: G[];
    /** The mode of the game. */
    mode: GameModes;
    constructor(tileType: {
        new <N>(noteType: N, id: number, value: number, blocked?: boolean, group?: G): T;
    }, noteType: {
        new (num: number, value: boolean, isInvalid: boolean);
    }, groupType: {
        new (id: number, value: number, tiles?: T[]): G;
    });
    /**
     * Shorthand for setupNormalSudoku and setupKillerSudoku
     * @see setupNormalSudoku
     * @see setupKillerSudoku
     */
    setupSudoku(board: any, mode?: GameModes): this;
    /**
     * Setup a normal sudoku. All the tiles will be filled in with the board that was sent in
     * @param arr {number[]} An array of numbers that represents the board. Use 0 or a falsy value for an empty cell
     */
    setupNormalSudoku(arr: number[]): this;
    /**
     * Setup a killer sudoku. All the tiles will be filled in with the board that was sent in
     */
    setupKillerSudoku(groups: number[][]): this;
    /** Get the tile at a certain 0-based index. */
    getTileAt(idx: number): T;
    /**
     * Set the value of a tile, if the same value was already set, it'll be unset (set to 0).
     * Triggers a check of invalid tiles and groups.
     * @param tile {ITile} The tile to set the value on.
     * @param value {number} The value to set.¨
     * @param updateInvalidTiles {boolean = true} Whether the invalid notes should be updated. Send false for a performance boost.
     */
    setValue(tile: ITile, value: number): boolean;
    /** Check if the Sudoku is finished (no empty and no invalid tiles). */
    isFinished(): boolean;
    /** Check if two tiles are in the same region. */
    isSameRegion(tile1: ITile, tile2: ITile): boolean;
    /**
     * Get all the tiles that are in the same region (the current tile is excluded).
     * @param tile {ITile} The tile whose region we wanna get.
     */
    getRegion(tile: ITile): T[];
    /** Check if the tiles are in the same row or the same column. */
    isSameCross(tile1: ITile, tile2: ITile): boolean;
    /**
     * Get all the tiles that are in the same row or the same column (the current tile excluded).
     * @param tile {ITile} The tile whose row and column we wanna get.
     */
    getCross(tile: ITile): T[];
    /**
     * Gets all the tiles with a certain value.
     * @param num {number} The value to get.
     */
    getTilesWithValue(num: number): T[];
    /** Check if two tiles are invalid */
    isInvalid(tile1: ITile, tile2: ITile): boolean;
    /**
     * Update the cells that are invalid.
     * @param lazy {boolean} If true it'll stop as soon as it finds an invalid cell.
     * @returns {boolean} true if the board has is valid
     */
    updateInvalidTiles(lazy?: boolean): boolean;
    /**
     * Update all the notes that are invalid based on values already set.
     * This will affect the result you get from `Tile.getNotes()`.
     */
    updateInvalidNotes(): void;
    /**
     * Updates all the groups that are invalid based on the values of the tiles in that group.
     * It'll only be set as invalid if `Group.sum` is greater than `Group.value` or if all tiles has a value and `Group.sum` does not equal `Group.value`.
     */
    updateInvalidGroups(): void;
    /** Check if the board is a normal Sudoku */
    isNormalMode(): boolean;
    /** Check if the board is a Killer Sudoku */
    isKillerMode(): boolean;
}
