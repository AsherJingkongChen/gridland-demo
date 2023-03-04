import { Dexie } from 'dexie';
import { Chunk, World } from './schema';
export * from './schema';
export const db = new (class db extends Dexie {
    get chunks() {
        return this.table(Chunk.name);
    }
    get worlds() {
        return this.table(World.name);
    }
    constructor() {
        super('db');
        this.version(1).stores(Object.fromEntries([
            [Chunk.name, Chunk.Indexes],
            [World.name, World.Indexes]
        ]));
        this.chunks.mapToClass(Chunk);
        this.worlds.mapToClass(World);
    }
})();
//# sourceMappingURL=index.js.map