/**
 * KeyInput a.k.a. KI
 *
 * Type to compare with types including
 * KeyboardEvent, MouseEvent and etc.
 */
export class KeyInput {
    code;
    altKey;
    ctrlKey;
    metaKey;
    shiftKey;
    /**
     * Build a KeyInput object from `option`
     *
     * @param option.code
     * must be one of KeyInputCodes
     */
    constructor(option) {
        this.code = option?.code;
        this.altKey = option?.altKey || false;
        this.ctrlKey = option?.ctrlKey || false;
        this.metaKey = option?.metaKey || false;
        this.shiftKey = option?.shiftKey || false;
    }
    /**
     * Build a KeyInput object
     * from an KeyInputReadOption onject
     *
     * @param input.code
     * must be one of KeyInputCodes,
     * otherwise KeyInput.code will be undefined
     */
    static From(input) {
        return new KeyInput({
            code: input?.code in KeyInputCodes
                ? input?.code
                : undefined,
            altKey: input?.altKey,
            ctrlKey: input?.ctrlKey,
            metaKey: input?.metaKey,
            shiftKey: input?.shiftKey
        });
    }
    /**
     * Compare two KeyInputReadOption objects
     */
    static Equal(input1, input2) {
        return (input1.code === input2.code &&
            (input1.altKey || false) ===
                (input2.altKey || false) &&
            (input1.ctrlKey || false) ===
                (input2.ctrlKey || false) &&
            (input1.metaKey || false) ===
                (input2.metaKey || false) &&
            (input1.shiftKey || false) ===
                (input2.shiftKey || false));
    }
    /**
     * Compare to the other KeyInputReadOption object
     */
    equal(input) {
        return KeyInput.Equal(this, input);
    }
}
/**
 * Valid values of KeyboardEvent.code
 */
export const KeyInputCodes = {
    Backquote: undefined,
    Digit1: undefined,
    Digit2: undefined,
    Digit3: undefined,
    Digit4: undefined,
    Digit5: undefined,
    Digit6: undefined,
    Digit7: undefined,
    Digit8: undefined,
    Digit9: undefined,
    Digit0: undefined,
    Minus: undefined,
    Equal: undefined,
    KeyQ: undefined,
    KeyW: undefined,
    KeyE: undefined,
    KeyR: undefined,
    KeyT: undefined,
    KeyY: undefined,
    KeyU: undefined,
    KeyI: undefined,
    KeyO: undefined,
    KeyP: undefined,
    BracketLeft: undefined,
    BracketRight: undefined,
    Backslash: undefined,
    KeyA: undefined,
    KeyS: undefined,
    KeyD: undefined,
    KeyF: undefined,
    KeyG: undefined,
    KeyH: undefined,
    KeyJ: undefined,
    KeyK: undefined,
    KeyL: undefined,
    Semicolon: undefined,
    Quote: undefined,
    KeyZ: undefined,
    KeyX: undefined,
    KeyC: undefined,
    KeyV: undefined,
    KeyB: undefined,
    KeyN: undefined,
    KeyM: undefined,
    Comma: undefined,
    Period: undefined,
    Slash: undefined,
    Escape: undefined,
    F1: undefined,
    F2: undefined,
    F3: undefined,
    F4: undefined,
    F5: undefined,
    F6: undefined,
    F7: undefined,
    F8: undefined,
    F9: undefined,
    F10: undefined,
    F12: undefined,
    Backspace: undefined,
    Tab: undefined,
    CapsLock: undefined,
    Enter: undefined,
    Space: undefined,
    ArrowLeft: undefined,
    ArrowUp: undefined,
    ArrowDown: undefined,
    ArrowRight: undefined
};
//# sourceMappingURL=KeyInput.js.map