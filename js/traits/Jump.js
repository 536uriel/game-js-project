import { Trait } from "../Entity.js"

export class Jump extends Trait {
    constructor(name) {
        super(name)
        this.velocity = 12
        //in secs
        this.duration = 1.8
        this.startJump = 0
        this.falling = false
        this.fallingSpeed = 2
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
        entity.vel.y -=  (this.velocity * this.startJump) 
        this.startJump -= deltaTime * this.fallingSpeed

        if(this.startJump < 0){
            this.falling = true
        }
        
    }
}

