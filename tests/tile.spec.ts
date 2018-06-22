import { Tile } from "../src/tile";
import { Note } from "../src/note";

let _ = 0;

describe("Tile", () => {
  it("notes", () => {
    let tile = new Tile(Note, 0, 0);
    
    expect(tile.getNotes()).toEqual([false, false, false, false, false, false, false, false, false]);

    tile.notes.forEach((x, idx) => { tile.toggleNote(idx + 1) });
    expect(tile.getNotes()).toEqual([true, true, true, true, true, true, true, true, true]);

    tile.setInvalidNote(4); //toggles, should default to true
    tile.setInvalidNote(5, true);
    tile.setInvalidNote(6, true);
    expect(tile.getNotes()).toEqual([true, true, true, false, false, false, true, true, true]);
    
    tile.clearInvalidNotes();
    expect(tile.getNotes()).toEqual([true, true, true, true, true, true, true, true, true]);
  });

  it("blocked", () => {
    let tile = new Tile(Note, 0, 5, true);

    expect(tile.blocked).toBe(true);

    tile.value = 1;
    expect(tile.value).toBe(5);
  });

  it("equals", () => {
    let tile1 = new Tile(Note, 0, 5);
    let tile2 = new Tile(Note, 0, 5);

    expect(tile1.equals(tile2)).toBe(true);
  });

  it("isEmpty", () => {
    let tile = new Tile(Note, 0, 5);

    expect(tile.isEmpty()).toBe(false);
    
    tile.value = 0;
    expect(tile.isEmpty()).toBe(true);
  });

  describe("clear", () => {
    it("regular tile", () => {
      let tile = new Tile(Note, 0, 5);

      tile.clear();

      expect(tile.value).toBe(0);
      expect(tile.notes.every(function(x) { return !x.value; })).toBe(true);
    });
    
    it("blocked tile", () => {
      let tile = new Tile(Note, 0, 5, true);

      tile.clear();

      expect(tile.value).toBe(5);
      expect(tile.notes.every(function(x) { return !x.value; })).toBe(true);
    });
  });
});
