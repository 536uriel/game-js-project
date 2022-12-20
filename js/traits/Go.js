import { Trait } from "../Entity.js"

export class Go extends Trait {
    constructor(name) {
        super("Go")
        this.direction = 0
    }

    update(entity, deltaTime) {
        entity.vel.x = this.direction
    }
}

