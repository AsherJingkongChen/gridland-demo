import { db } from '..';
export class World {
    static Indexes = '++&id,' + 'name';
    createdate;
    id;
    name;
    constructor(option) {
        this.createdate = new Date();
        this.name = option.name;
    }
    /**
     * Throws `ConstraintError` if the world exists
     */
    static async Create(option) {
        const newWorld = new World(option);
        await db.worlds.add(newWorld);
        return newWorld;
    }
    static async Read(option) {
        const { id, name } = option;
        if (id !== undefined) {
            return db.worlds.get(id);
        }
        else if (name !== undefined) {
            return db.worlds.where({ name }).toArray();
        }
        else {
            throw new Error('World.Read: id and name are both undefined');
        }
    }
    static async Update(world) {
        await db.worlds.put(world);
        return world;
    }
    static async Delete(option) {
        const { id, name } = option;
        if (id !== undefined) {
            return db.worlds.delete(id);
        }
        else if (name !== undefined) {
            await db.worlds.where({ name }).delete();
        }
        else {
            throw new Error('World.Read: id and name are both undefined');
        }
    }
}
//# sourceMappingURL=World.js.map