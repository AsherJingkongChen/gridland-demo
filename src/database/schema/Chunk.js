import { db } from '..';
export class Chunk {
    static Indexes = '[worldid+x+y]';
    createdate;
    worldid;
    x;
    y;
    constructor(option) {
        this.createdate = new Date();
        this.worldid = option.worldid;
        this.x = option.x;
        this.y = option.y;
    }
    /**
     * Throws `ConstraintError` if the chunk exists
     */
    static async Create(option) {
        const newChunk = new Chunk(option);
        await db.chunks.add(newChunk);
        return newChunk;
    }
    static async Read(option) {
        return db.chunks.get([
            option.worldid,
            option.x,
            option.y
        ]);
    }
    static async Update(chunk) {
        await db.chunks.put(chunk);
        return chunk;
    }
    static async Delete(option) {
        return db.chunks.delete([
            option.worldid,
            option.x,
            option.y
        ]);
    }
}
//# sourceMappingURL=Chunk.js.map