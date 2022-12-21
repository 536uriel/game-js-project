import { Trait } from "../Entity.js"

export class Jump extends Trait {
    constructor(name) {
        super(name)
        this.velocity = 2
        //in secs
        this.duration = 2
        this.startJump = 0
    }

    start(){
        this.startJump = this.duration
    }

    cancel(){
        this.startJump = 0
    }

    obstruct(entity,side){
        if(side == "top"){
            this.startJump = -1
        }
        if(side == "bottom"){
            this.cancel()
        }
    }

    update(entity,deltaTime) {
        entity.vel.y -=  this.velocity * this.startJump
        this.startJump -= deltaTime
        
    }
}

