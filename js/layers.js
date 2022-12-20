import SpriteSheet from "./SpriteSheet.js"
import TileResolver from "./TileResolver.js"

export function createBufferImageColor(color) {
    const buffer = document.createElement("canvas")
    buffer.width = TileResolver.tileSize
    buffer.height = TileResolver.tileSize
    const context = buffer.getContext("2d")
    context.fillStyle = color
    context.fillRect(0, 0, buffer.width, buffer.height)

    return buffer

}

export function createBckgroundLayer(level) {
    const backgroundSprite = new SpriteSheet()
    const blueBuffer = createBufferImageColor("blue")
    const brownBuffer = createBufferImageColor("brown")

    backgroundSprite.define(blueBuffer,"sky")
    backgroundSprite.define(brownBuffer, "ground")


    const tiles = level.tiles

    return function drawBackground(context) {
        for (let x = 0; x < tiles.grid.length; x++) {
            for (let y = 0; y < tiles.grid[x].length; y++) {
                backgroundSprite.draw(tiles.grid[x][y].name,x * TileResolver.tileSize,y * TileResolver.tileSize,context)
            }
        }
      
    }
}

export function createSpriteLayer(entities){
    
    return function redrawSprite(context){
        entities.forEach(entity => {
            entity.draw(context)
        })
    }
   
}