
// export interface INote {
//     value: boolean;
//     toggleValue(val?: boolean);
//     toggleInvalid(val?: boolean);
// }

// /**
//  * A tile of the Sudoku board.
//  * Normally you'll not want to use the property setters, but use the functions or let `Sudoku` to do this for you.
//  */
// export class Tile<N extends INote> {
//     private _raw: boolean = false;
//     private _val: boolean = false;
//     private _invalid: boolean = false;

//     constructor(value: boolean, isInvalid: boolean) {
//         this._raw = value;
//         this._invalid = isInvalid;
        
//         this.update();
//     }

//     get value(): boolean {
//         return this._val;
//     }

//     toggleValue(val?: boolean) {
//         if (typeof val === "undefined") val = !this._val;
//         this._raw = val;
//     }

//     toggleInvalid(val?: boolean) {
//         if (typeof val === "undefined") val = !this._invalid;
//         this._invalid = val;
//     }

//     private update() {
//         if (!this._invalid) {
//             this._val = this._raw;
//         } else {
//             this._val = false;
//         }
//     }
// }
