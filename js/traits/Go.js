import { Trait } from "../Entity.js"

export class Go extends Trait {
    constructor(name) {
        super(name)
        this.direction = 0
        this.velocitiy = 10
    }

 

    update(entity,deltaTime) {
        entity.vel.x = this.direction * this.velocitiy
    }
}

