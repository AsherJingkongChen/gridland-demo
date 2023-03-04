import { EventEmitter } from '../design';
import { KeyInput } from '../entity';
import { Container, Point } from 'pixi.js';
import { windowPreventDefault } from '../tool';
windowPreventDefault('keydown');
windowPreventDefault('wheel');
/**
 * Simple auto camera, moves via x and y, zooms via zoom
 */
export class Camera extends Container {
    event;
    maxzoom;
    minzoom;
    zoominKI;
    zoomoutKI;
    zoomwheelKI;
    _client;
    _dragging;
    _viewport;
    _zoominout;
    /**
     * Camera's target
     */
    get stage() {
        return this._viewport.children[0];
    }
    /**
     * Camera's target
     */
    set stage(stage) {
        if (this._viewport.children.length === 1) {
            this._viewport.removeChildAt(0);
        }
        if (stage) {
            this._viewport.addChildAt(stage, 0);
        }
    }
    /**
     * x of the local position
     */
    get x() {
        return this._viewport.pivot.x;
    }
    /**
     * x of the local position
     */
    set x(x) {
        this._viewport.pivot.x = x;
    }
    /**
     * y of the local position
     */
    get y() {
        return this._viewport.pivot.y;
    }
    /**
     * y of the local position
     */
    set y(y) {
        this._viewport.pivot.y = y;
    }
    /**
     * Scale
     */
    get zoom() {
        return this._viewport.scale.x;
    }
    /**
     * Scale
     */
    set zoom(zoom) {
        this._viewport.scale.x = zoom;
        this._viewport.scale.y = zoom;
    }
    /**
     * @param option.maxzoom
     * Maximum of zoom, by default it's 10.0 (1000%)
     *
     * @param option.minzoom
     * Minimum of zoom, by default it's 0.1 (10%)
     *
     * @param option.stage
     * The Container inside Camera
     *
     * @param option.zoominKI
     * KI to zoom in, by default it's { ctrlKey, Equal }
     *
     * @param option.zoomoutKI
     * KI to zoom out, by default it's { ctrlKey, Minus }
     *
     * @param option.zoomwheelKI
     * KI to zoom with wheel, by default it's { ctrlKey }
     */
    constructor(option) {
        super();
        this._client = new Point();
        this._dragging = false;
        this._viewport = new Container();
        this._zoominout = (e) => {
            if (this.zoominKI.equal(e)) {
                this._zoomOnWindow(+10);
            }
            else if (this.zoomoutKI.equal(e)) {
                this._zoomOnWindow(-10);
            }
        };
        this.event = new EventEmitter();
        this.maxzoom = option?.maxzoom || 10;
        this.minzoom = option?.minzoom || 0.1;
        this.stage = option?.stage;
        this.zoominKI =
            option?.zoominKI ||
                new KeyInput({
                    ctrlKey: true,
                    code: 'Equal'
                });
        this.zoomoutKI =
            option?.zoomoutKI ||
                new KeyInput({
                    ctrlKey: true,
                    code: 'Minus'
                });
        this.zoomwheelKI =
            option?.zoomwheelKI ||
                new KeyInput({ ctrlKey: true });
        this.addChild(this._viewport);
        this.on('added', this.attach).on('removed', this.detach);
    }
    destroy() {
        super.destroy();
        this.detach();
        this._client = undefined;
        this._dragging = false;
        this._viewport.destroy();
        this._viewport = undefined;
        this._zoominout = undefined;
        this.event.removeAllListeners();
        this.event = undefined;
        this.maxzoom = Infinity;
        this.minzoom = 0;
        this.zoominKI = undefined;
        this.zoomoutKI = undefined;
        this.zoomwheelKI = undefined;
    }
    attach() {
        this.detach();
        this.interactive = true;
        this.visible = true;
        this.on('mousedown', this._onmousedown)
            .on('mousemove', this._onmousemove)
            .on('mouseup', this._onmouseup)
            .on('mouseupoutside', this._onmouseupoutside)
            .on('wheel', this._onwheel);
        window.addEventListener('keydown', this._zoominout);
    }
    detach() {
        this.interactive = false;
        this.visible = false;
        this.off('mousedown', this._onmousedown)
            .off('mousemove', this._onmousemove)
            .off('mouseup', this._onmouseup)
            .off('mouseupoutside', this._onmouseupoutside)
            .off('wheel', this._onwheel);
        window.removeEventListener('keydown', this._zoominout);
    }
    _onmousedown(e) {
        if (e.button == 0) {
            this._dragging = true;
        }
    }
    _onmousemove(e) {
        if (this._dragging) {
            this._dragOnWindow(e.client);
        }
        else {
            this._moveOnWindow(e.client);
        }
    }
    _onmouseup() {
        if (this._dragging) {
            this._dragging = false;
        }
    }
    _onmouseupoutside(e) {
        if (this._dragging) {
            this._dragOnWindow(e.client);
            this._dragging = false;
        }
    }
    _onwheel(e) {
        if (this.zoomwheelKI.equal(e)) {
            this._zoomOnWindow(-e.deltaY);
        }
    }
    _dragOnWindow(client) {
        const { x: newX, y: newY } = this.toLocal(client);
        const { x: oldX, y: oldY } = this.toLocal(this._client);
        this._viewport.position.x += newX - oldX;
        this._viewport.position.y += newY - oldY;
        this._client.copyFrom(client);
        this.event.emit('drag', this);
    }
    _moveOnWindow(client) {
        this._viewport.toLocal(client, undefined, this._viewport.pivot);
        this.toLocal(client, undefined, this._viewport.position);
        this._client.copyFrom(client);
        this.event.emit('move', this);
    }
    /**
     * zoom by approximation
     */
    _zoomOnWindow(delta) {
        if (delta >= 0) {
            this.zoom = Math.min(this.maxzoom, this.zoom * (1 + delta / 50));
        }
        else {
            this.zoom = Math.max(this.minzoom, this.zoom / (1 + -delta / 50));
        }
        this.event.emit('zoom', this);
    }
}
//# sourceMappingURL=Camera.js.map