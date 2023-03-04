import { Vec2, PixelPerChunk } from '../entity';
import { Container, TilingSprite } from 'pixi.js';
import { gridLightTexture } from '../resource';
export class Zone extends Container {
    world;
    center; // [TODO]
    _chunks;
    _chunkSprites;
    constructor(world) {
        super();
        this.world = world;
        this.center = new Vec2();
        this._chunks = new Map();
        this._chunkSprites = new Map();
    }
    destroy() {
        super.destroy({ children: true });
        this.center = undefined;
        this._chunks.clear();
        this._chunks = undefined;
        this._chunkSprites.clear();
        this._chunkSprites = undefined;
        this.world = undefined;
    }
    getChunks() {
        return this._chunks;
    }
    getChunk(keyOrPos) {
        if (typeof keyOrPos === 'string') {
            return this._chunks.get(keyOrPos);
        }
        else {
            return this._chunks.get(Vec2.Key(keyOrPos));
        }
    }
    setChunk(chunk) {
        const key = Vec2.Key(chunk);
        this._chunks.set(key, chunk);
        if (!this._chunkSprites.has(key)) {
            const chunkSprite = TilingSprite.from(gridLightTexture, {
                width: PixelPerChunk,
                height: PixelPerChunk
            });
            chunkSprite.position.set(chunk.x * PixelPerChunk, chunk.y * PixelPerChunk);
            this._chunkSprites.set(key, this.addChild(chunkSprite));
        }
    }
    deleteChunk(chunk) {
        const key = Vec2.Key(chunk);
        const exist = this._chunks.delete(key);
        if (exist) {
            this.removeChild(this._chunkSprites.get(key));
            this._chunkSprites.delete(key);
        }
        return exist;
    }
}
//# sourceMappingURL=Zone.js.map