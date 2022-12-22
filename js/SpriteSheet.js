import TileResolver from "./TileResolver.js"
export default class SpriteSheet{
    constructor(w, h){
        this.width = w || TileResolver.tileSize
        this.height = h || TileResolver.tileSize
        this.tiles = new Map()
    }

    define(img,name){
        const buffers = ([true,false]).map(flip => {
            const buffer = document.createElement("canvas")
            buffer.width = this.width
            buffer.height = this.height
            const context = buffer.getContext("2d")

            if (flip) {
                context.scale(-1, 1);
                context.translate(-this.width, 0);
            }
            
            context.drawImage(img,0,0,this.width,this.height)

            return buffer
        })
      

        this.tiles.set(name,buffers)

    }

    draw(name,x,y,context,flip = false){
        const buffer = this.tiles.get(name)[flip ? 1 : 0]
        context.drawImage(buffer,x,y)
    }
}