import TileResolver from "./TileResolver.js"
export default class SpriteSheet{
    constructor(w, h){
        this.width = w || TileResolver.tileSize
        this.height = h || TileResolver.tileSize
        this.tiles = new Map()
    }

    define(img,name){
        const buffer = document.createElement("canvas")
        buffer.width = this.width
        buffer.height = this.height
        buffer.getContext("2d")
        .drawImage(img,0,0,this.width,this.height)

        this.tiles.set(name,buffer)

    }

    draw(name,x,y,context){
        const buffer = this.tiles.get(name)
        context.drawImage(buffer,x,y)
    }
}