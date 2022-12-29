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

export function createBckgroundLayer(level, camera) {
    const backgroundSprite = new SpriteSheet()
    const blueBuffer = createBufferImageColor("blue")
    const brownBuffer = createBufferImageColor("brown")
    const backgroundBuffer = document.createElement("canvas")

    const tiles = level.tiles
    const tileCollider = level.tileCollider

    backgroundBuffer.width = level.tiles.grid.length * TileResolver.tileSize
    backgroundBuffer.height = camera.size
    const backgroundContext = backgroundBuffer.getContext("2d")

    backgroundSprite.define(blueBuffer, "sky")
    backgroundSprite.define(brownBuffer, "ground")




    return function drawBackground(context) {
        const drawFrom = tileCollider.tiles.toIndex(camera.x)
        const drawTo = drawFrom + tileCollider.tiles.toIndex(camera.size)

        for (let x = drawFrom; x < drawTo; x++) {

            const col = tiles.grid[x]
            if (col) {
                col.forEach((tile, y) => {
                    backgroundSprite.draw(tile.name, x * TileResolver.tileSize, y * TileResolver.tileSize, backgroundContext)
                })

            }

        }

        context.drawImage(backgroundBuffer, -camera.x, -camera.y)

    }
}

export function createSpriteLayer(entities, camera) {

    return function redrawSprite(context) {
        entities.forEach(entity => {
            entity.draw(context, camera)
        })
    }

}