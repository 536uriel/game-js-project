import { Entity } from "./Entity.js"
import { loadImage } from "./helpers.js"
import SpriteSheet from "./SpriteSheet.js"
import { Go } from "./traits/Go.js"
import { Jump } from "./traits/Jump.js"


export async function createPlayer(){
    const idleImg = await loadImage('./img/idle.png')
    const jumpImg = await loadImage('./img/jump.png')
    const run_1Img = await loadImage('./img/run-1.png')
    const run_2Img = await loadImage('./img/run-2.png')
    const run_3Img = await loadImage('./img/run-3.png')

    const player = new Entity()
    player.size.set(64,64)
    player.pos.set(200,200)

    player.addTrait(new Go("Go"))
    player.addTrait(new Jump("Jump"))

    const playerSprite = new SpriteSheet(player.size.x,player.size.y)
   
    playerSprite.define(idleImg,"idle")
    playerSprite.define(jumpImg,"jump")
    playerSprite.define(run_1Img,"run-1")
    playerSprite.define(run_2Img,"run-2")
    playerSprite.define(run_3Img,"run-3")

    function createAnim(frames, frameLen) {
        //charge on what frame sould be displayed
        return function resolveFrame(distance) {
            console.log(distance)
            const frameIndex = Math.floor(distance / frameLen) % frames.length;
            const frameName = frames[frameIndex];
            return frameName;
        }
    }

     //responsible for what frame of animation should draw
    function routeFrame(character) {
        const runAnim = createAnim(['run-1','run-2','run-3'],8)
        
        if (character.Jump.falling) {
            return 'jump';
            
        }

        if (character.Go.direction != 0) {

            //divide the frames between the distance
            return runAnim(Math.abs(character.pos.x));
        }
        return "idle";
    }

    player.draw = function(context){
        if(this.Go.direction > 0) {
            playerSprite.draw(routeFrame(this),this.pos.x,this.pos.y,context,false)
        }else{
            playerSprite.draw(routeFrame(this),this.pos.x,this.pos.y,context,true)

        }

       
    }

    

    return player

}