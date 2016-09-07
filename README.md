# Sudoku

This is a TypeScript library which gives you the tools for creating a Sudoku or Killer Sudoku game.

## Examples
This is just a quick peek to get you started. Check out the API docs for the full documentation.

### Initialize a Sudoku game
```js
let game = new Sudoku<Tile<IGroup>, Note, Group<ITile>>(Tile, Note, Group);
```

While this might look overly complicated, it gives use great freedom to extend our tiles and group.
For a `Tile` you might for example want to know if you have currently selected the tile. You may then extend the original `Tile` like so:

```js
class CustomTile extends Tile<CustomGroup, CustomNote> {
    isActiveTile: boolean = false;
}
class CustomNote extends Note {
    isHighlighted: boolean: false;
}
class CustomGroup extends Group<CustomTile> {
    isActiveGroup: boolean = false;
}
new Sudoku<CustomTile, CustomNote, CustomGroup>(CustomTile, CustomNote, CustomGroup);
```

And you can of course also mix and match as you wish, for example maybe you just wanna extends the Tile class:

```js
class CustomTile extends Tile<Group<Tile>, Note> {
    isActiveTile: boolean = false;
}
new Sudoku<CustomTile, Note, Group<CustomTile>>(CustomTile, Note, Group);
```

### Setup a board
There are currently two type of modes supported. Regular Sudoku, and Killer Sudoku.

#### Regular Sudoku
```js
game.setupNormalSudoku(board);
// or
game.setupSudoku(board, GameModes.Normal /* 0 */);
```
`board` is an array of 81 values where falsy values represents empty cells.

### Killer Sudoku
```js
game.setupKillerSudoku(board);
// or
game.setupSudoku(board, GameModes.Killer /* 1 */);
```
`board` is an array with all the groups. Each group is an array where the first value is the sum of the group and the remaining values are the ID (0 based) of the cells that's part of the group.

### Values
```js
if (game.setValue(tile, 9)) {
    // successfully set the value 9 to the cell.
    // note that it was not necessarily a correct number, it might result in some tiles being invalid, including itself.
} else {
    // the cell was blocked (e.g. it has a given value).
}
```
While it may be tempting to simply set value on a `Tile`, calling `Sudoku.setValue` updates the invalid status of all tiles and group.
You can of course choose to do this manually instead by calling `Sudoku.updateInvalidTiles()` and `Sudoku.updateInvalidGroups()`.

### Notes
```js
tile.toggleNote(1);
tile.toggleNote(5);
tile.toggleNote(9);
tile.getNotes(); // [true, false, false, false, true, false, false, false, true];

tile.setInvalidNote(5, true);
tile.getNotes(); // [true, false, false, false, false, false, false, false, true];
```

*NOTE: You generally don't need to bother with `Tile.setInvalidNote`, using `Sudoku.setValue` will keep this updated for you. I just used it here to prove a point.*

