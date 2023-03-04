export class Vec2 {
    x;
    y;
    get key() {
        return Vec2.Key(this);
    }
    constructor(option) {
        this.x = option?.x || 0;
        this.y = option?.y || 0;
    }
    static Key(option) {
        return `Vec2,${option?.x || 0},${option?.y || 0}`;
    }
}
//# sourceMappingURL=Vec2.js.map