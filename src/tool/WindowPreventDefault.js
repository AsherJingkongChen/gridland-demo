export const windowPreventDefault = (eventName) => {
    windowNotPreventDefault(eventName);
    window.addEventListener(eventName, _preventDefault, {
        passive: false
    });
};
export const windowNotPreventDefault = (eventName) => {
    window.removeEventListener(eventName, _preventDefault);
};
const _preventDefault = (e) => {
    e.preventDefault();
};
//# sourceMappingURL=WindowPreventDefault.js.map