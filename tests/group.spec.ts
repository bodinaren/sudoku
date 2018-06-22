import { Group } from "../src/group";
import { ITile, Tile } from "../src/tile";
import { Note } from "../src/note";

describe("Group", () => {
  it("isFirstInGroup", () => {
    var tiles = [
      new Tile(Note, 0, 0),
      new Tile(Note, 1, 0)
    ];

    var group = new Group<ITile>(1, 10, tiles);

    expect(group.isFirstInGroup(tiles[0])).toBe(true);
    expect(group.isFirstInGroup(tiles[1])).toBe(false);
  });
  
  it("sum", () => {
    var tiles = [
      new Tile(Note, 0, 4),
      new Tile(Note, 1, 5)
    ];

    var group = new Group<ITile>(1, 10, tiles);

    expect(group.sum).toBe(9);

    tiles[1].value = 9;

    expect(group.sum).toBe(13);
  });
});
