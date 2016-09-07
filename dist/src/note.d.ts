import { BehaviorSubject } from "rxjs/BehaviorSubject";
export interface INote {
    val: boolean;
    toggleValue(val?: boolean): any;
    toggleInvalid(val?: boolean): any;
}
/**
 * A note of the Sudoku board.
 */
export declare class Note extends BehaviorSubject<boolean> {
    num: number;
    protected _val: boolean;
    protected _isInvalid: boolean;
    constructor(num: number, value: boolean, isInvalid: boolean);
    val: boolean;
    toggleValue(val?: boolean): void;
    toggleInvalid(val?: boolean): void;
    next(): void;
}
