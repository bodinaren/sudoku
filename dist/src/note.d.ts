import { BehaviorSubject } from "rxjs/BehaviorSubject";
export interface INote {
    num: number;
    value: boolean;
    isInvalid: boolean;
    toggleValue(setValue?: boolean): any;
    toggleInvalid(setInvalid?: boolean): any;
}
/**
 * A note of the Sudoku board.
 */
export declare class Note extends BehaviorSubject<boolean> {
    num: number;
    protected _val: boolean;
    protected _isInvalid: boolean;
    readonly val: boolean;
    readonly isInvalid: boolean;
    constructor(num: number, value: boolean, isInvalid: boolean);
    toggleValue(setValue?: boolean): void;
    toggleInvalid(setInvalid?: boolean): void;
}
export declare class ObservableNote extends BehaviorSubject<boolean> implements INote {
    num: number;
    protected _val: boolean;
    protected _isInvalid: boolean;
    readonly value: boolean;
    readonly isInvalid: boolean;
    constructor(num: number, value: boolean, isInvalid: boolean);
    toggleValue(setValue?: boolean): void;
    toggleInvalid(setInvalid?: boolean): void;
}
