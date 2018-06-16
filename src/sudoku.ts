import { Linq, List } from "btypescript";
import { ITile, Tile, INote, Note, IGroup, Group, GameModes, Combination, Calculator } from "./";

export interface ISudoku {
  tiles: ITile[];
  groups: IGroup[];
  mode: GameModes;

  setupSudoku(board: any, mode?: GameModes): this;
  setupNormalSudoku(arr: number[]): this;
  setupKillerSudoku(groups: number[][]): this;
  getTileAt(idx: number): ITile;
  setValue(tile: ITile, value: number): boolean;
  isFinished(): boolean;
  isSameRegion(tile1: ITile, tile2: ITile): boolean;
  getRegion(tile: ITile): ITile[];
  isSameCross(tile1: ITile, tile2: ITile): boolean;
  getCross(tile: ITile): ITile[];
  getTilesWithValue(num: number): ITile[];
  isInvalid(tile1: ITile, tile2: ITile): boolean;
  updateInvalidTiles(lazy?: boolean): boolean;
  updateInvalidNotes(): void;
  isNormalMode(): boolean ;
  isKillerMode(): boolean;
}

/**
 * The base of a Sudoku game.
 * A Sudoku game consists of 81 tiles with values between 1-9 (or 0 for an empty tile).
 * When playing Killer Sudoku, it also contains a number of groups which is the base of the board.
 */
export class Sudoku<T extends ITile, N extends INote, G extends IGroup> {
  /** The 81 tiles of the board. */
  tiles: T[] = [];
  /** The groups of the board. Only used in Killer Sudoku. */
  groups: G[] = [];
  /** The mode of the game. */
  mode: GameModes;

  constructor(
    private tileType: { new<N>(noteType: N, id: number, value: number, blocked?: boolean, group?: G): T },
    private noteType: { new(num: number, value: boolean, isInvalid: boolean) },
    private groupType: { new(id: number, value: number, tiles?: T[]): G }
  ) { }

  /**
   * Shorthand for setupNormalSudoku and setupKillerSudoku
   * @see setupNormalSudoku
   * @see setupKillerSudoku
   */
  setupSudoku(board: any, mode: GameModes = GameModes.Normal): this {
    if (mode === GameModes.Killer) {
      this.setupKillerSudoku(board);
    } else {
      this.setupNormalSudoku(board);
    }

    return this;
  }

  /**
   * Setup a normal sudoku. All the tiles will be filled in with the board that was sent in
   * @param arr {number[]} An array of numbers that represents the board. Use 0 or a falsy value for an empty cell
   */
  setupNormalSudoku(arr: number[]): this {
    this.mode = GameModes.Normal;

    if (arr.length != 81) throw "Invalid board size";

    arr.forEach((val, idx) => {
      this.tiles.push(new this.tileType(this.noteType, idx, val || 0, !!val));
    });

    this.updateInvalidNotes();

    return this;
  }
  /**
   * Setup a killer sudoku. All the tiles will be filled in with the board that was sent in
   */
  setupKillerSudoku(groups: number[][]): this {
    this.mode = GameModes.Killer;

    for (let i = 0; i < 81; i++) {
      this.tiles.push(new this.tileType(this.noteType, i, 0, false));
    }

    groups.forEach((group, idx) => {
      let tiles = [],
        value = group[0];

      for (let i = 1; i < group.length; i++) {
        tiles.push(this.tiles[group[i]]);
      }

      let g = new this.groupType(idx, value, tiles);
      g.combinations = Calculator.getPossibilities(g.value, g.tiles.length);
      this.groups.push(g);

      tiles.forEach(x => x.group = g);
    });

    this.updateInvalidNotes();

    return this;
  }

  /** Get the tile at a certain 0-based index. */
  getTileAt(idx: number): T {
    return this.tiles[idx];
  }

  /** 
   * Set the value of a tile, if the same value was already set, it'll be unset (set to 0).
   * Triggers a check of invalid tiles and groups.
   * @param tile {ITile} The tile to set the value on.
   * @param value {number} The value to set.¨
   * @param updateInvalidTiles {boolean = true} Whether the invalid notes should be updated. Send false for a performance boost.
   */
  setValue(tile: ITile, value: number): boolean {
    if (tile.blocked) return false;

    if (tile.value == value)
      tile.value = 0;
    else tile.value = value;

    this.updateInvalidTiles();
    this.updateInvalidGroups();
    this.updateInvalidNotes();

    return true;
  }

  /** Check if the Sudoku is finished (no empty and no invalid tiles). */
  isFinished(): boolean {
    return Linq.all(this.tiles, x => !x.isEmpty() && !x.isInvalid);

    // let isAllFilled = true;

    // this.board.forEach(x => { if (x.isEmpty()) return isAllFilled = false; })
    // return isAllFilled && this.getInvalidTiles().length == 0;
  }

  /** Check if two tiles are in the same region. */
  isSameRegion(tile1: ITile, tile2: ITile): boolean {
    if (!tile1 && !tile2) return false;

    return (tile1.region == tile2.region);
  }

  /**
   * Get all the tiles that are in the same region (the current tile is excluded).
   * @param tile {ITile} The tile whose region we wanna get. 
   */
  getRegion(tile: ITile): T[] {
    let rs = [],
      start = (tile.region % 3 * 3) + ((tile.region - tile.region % 3) * 9);

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        rs.push(this.tiles[start + col + row * 9]);
      }
    }

    List.removeAll(rs, x => x.id === tile.id); // remove self

    return rs;

    // Simplier, but probably less performant. Does that matter tho with only 81 items?
    // return Linq.filter(this.tiles, x => x.region == tile.region && x.id !== tile.id);
  }

  /** Check if the tiles are in the same row or the same column. */
  isSameCross(tile1: ITile, tile2: ITile): boolean {
    if (!tile1 && !tile2) return false;

    return (tile1.column == tile2.column || tile1.row == tile2.row);
  }

  /** 
   * Get all the tiles that are in the same row or the same column (the current tile excluded).
   * @param tile {ITile} The tile whose row and column we wanna get. 
   */
  getCross(tile: ITile): T[] {
    let rs = [];

    for (let i = 0; i < 9; i++) {
      rs.push(this.tiles[i * 9 + tile.column]);
      rs.push(this.tiles[tile.row * 9 + i]);
    }

    List.removeAll(rs, x => x.id === tile.id); // remove self

    return rs;

    // Simplier, but probably less performant. Does that matter tho with only 81 items?
    // return Linq.filter(this.tiles, x => x.id !== tile.id && (x.col === tile.col || x.row === tile.row));
  }

  /**
   * Gets all the tiles with a certain value.
   * @param num {number} The value to get. 
   */
  getTilesWithValue(num: number): T[] {
    return Linq.filter(this.tiles, x => x.value === num);
  }

  /** Check if two tiles are invalid */
  isInvalid(tile1: ITile, tile2: ITile): boolean {
    if (tile1.id === tile2.id || tile1.isEmpty() || !tile1.equals(tile2)) return false;

    return this.isSameRegion(tile1, tile2) || this.isSameCross(tile1, tile2)
      || (this.isKillerMode() && tile1.group.id === tile2.group.id);
  }

  /**
   * Update the cells that are invalid.
   * @param lazy {boolean} If true it'll stop as soon as it finds an invalid cell.
   * @returns {boolean} true if the board has is valid
   */
  updateInvalidTiles(lazy: boolean = false): boolean {
    let t1: ITile, t2: ITile, isBoardValid = true;

    this.tiles.forEach(x => { x.isInvalid = false; });

    for (let i = 0; i < this.tiles.length; i++) {
      t1 = this.tiles[i];
      for (let j = i + 1; j < this.tiles.length; j++) {
        t2 = this.tiles[j];
        if (this.isInvalid(t1, t2)) {
          t1.isInvalid = t2.isInvalid = true;
          isBoardValid = false;
          if (lazy) return false;
        }
      }
    }

    return isBoardValid;
  }

  /**
   * Update all the notes that are invalid based on values already set.
   * This will affect the result you get from `Tile.getNotes()`.
   */
  updateInvalidNotes(): void {

    let t1: ITile;

    // TODO: this trigger all tiles (almost) to trigger an .next() event, can we be smarter about this?
    this.tiles.forEach(x => { x.clearInvalidNotes(); });

    for (let i = 0; i < this.tiles.length; i++) {
      t1 = this.tiles[i];

      if (t1.value) {
        this.getCross(t1).forEach(x => { x.setInvalidNote(t1.value, true); });
        this.getRegion(t1).forEach(x => { x.setInvalidNote(t1.value, true); });
        if (this.isKillerMode()) t1.group.tiles.forEach(x => { x.setInvalidNote(t1.value, true); });
      }
    }
  }

  /**
   * Updates all the groups that are invalid based on the values of the tiles in that group.
   * It'll only be set as invalid if `Group.sum` is greater than `Group.value` or if all tiles has a value and `Group.sum` does not equal `Group.value`.  
   */
  updateInvalidGroups(): void {
    if (!this.isKillerMode()) return;

    this.groups.forEach((g) => {
      g.isInvalid = false;

      if (g.sum > g.value) {
        g.isInvalid = true;
      } else if (Linq.all(g.tiles, x => x.value > 0) && g.sum !== g.value) {
        g.isInvalid = true;
      }
    });
  }

  /** Check if the board is a normal Sudoku */
  isNormalMode(): boolean { return (this.mode === GameModes.Normal); }
  /** Check if the board is a Killer Sudoku */
  isKillerMode(): boolean { return (this.mode === GameModes.Killer); }
}

/**
 * This class simplify the usage of Sudoku, using the default Tile, Note and Group.
 */
export class DefaultSudoku extends Sudoku<Tile<IGroup, Note>, Note, Group<ITile>> {

  constructor() {
    super(Tile, Note, Group);
  }

}
