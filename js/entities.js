import { Entity } from "./Entity.js"
import { loadImage } from "./helpers.js"
import SpriteSheet from "./SpriteSheet.js"


export async function createPlayer(){
    const img = await loadImage('./img/idle.png')
    const player = new Entity()
    player.size.set(64,64)
    player.pos.set(200,200)
    const playerSprite = new SpriteSheet(player.size.x,player.size.y)
    playerSprite.define(img,"player")
    player.draw = function(context){
       playerSprite.draw("player",this.pos.x,this.pos.y,context)
       
    }

    return player

}