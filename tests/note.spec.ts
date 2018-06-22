import { Note } from "../src/note";

let _ = 0;

describe("Tile", () => {

  it("toggleValue", () => {
    let note = new Note(1, false, false);

    note.toggleValue();
    expect(note.value).toBe(true);

    note.toggleValue();
    expect(note.value).toBe(false);

    note.toggleValue(false);
    expect(note.value).toBe(false);

    note.toggleValue(true);
    expect(note.value).toBe(true);
  });

  it("toggleInvalid", () => {
    let note = new Note(1, false, false);

    note.toggleInvalid();
    expect(note.isInvalid).toBe(true);

    note.toggleInvalid();
    expect(note.isInvalid).toBe(false);

    note.toggleInvalid(false);
    expect(note.isInvalid).toBe(false);

    note.toggleInvalid(true);
    expect(note.isInvalid).toBe(true);
  });

  it("invalid note always returns value false", () => {
    
    let note = new Note(1, true, true);
    expect(note.value).toBe(false);
  });
});
