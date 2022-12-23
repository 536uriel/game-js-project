import { Trait } from "../Entity.js"

export class Jump extends Trait {
    constructor(name) {
        super(name)
        this.velocity = 5
        //in secs
        this.duration = 2
        this.startJump = 0
        this.falling = false
        this.speed = 2
    }

    start(){
        this.startJump = this.duration
        this.falling = true
    }

    cancel(){
        this.startJump = 0
        this.falling = false
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
        entity.vel.y -=  (this.velocity * this.startJump) * this.speed
        this.startJump -= deltaTime * this.speed

        if(this.startJump < 0){
            this.falling = true
        }
        
    }
}

