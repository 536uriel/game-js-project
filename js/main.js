import { Compositor } from "./compositor.js"
import { createPlayer } from "./entities.js"
import { createBckgroundLayer, createSpriteLayer } from "./layers.js"
import Timer from "./timer.js"
import { setUpMouseControl } from "./debug.js"
import { createTiles, Level } from "./Level.js"
import { Input } from "./input.js"
import { Vec2 } from "./math.js"
import TileResolver from "./TileResolver.js"


const level_1 = {
    "spriteSheet": "overworld",
    "backgrounds":[
        {
            "tile": "sky",
            "ranges": [
                [
                    0,
                    212,
                    0,
                    13
                ]
            ]
        },
        {
            "tile": "ground",
            "type": "ground",
            "ranges": [
                [
                    0,
                    212,
                    13,
                    2
                ]
            ]
        },
        {
            "tile": "sky",
            "ranges": [
                [
                    70,
                    12,
                    13,
                    2
                ],
                [
                    92,
                    2,
                    13,
                    2
                ],
                [
                    157,
                    2,
                    13,
                    2
                ]
            ]
        },
        {
            "tile": "ground",
            "type": "ground",
            "ranges": [
                [
                    29,
                    5
                ],
                [
                    5,
                    7,
                    9
                ],
                [
                    12,
                    6,
                    11,
                    1
                ],
                [
                    2,
                    1,
                    11,
                    1
                ],
                [
                    10,
                    2,
                    10,
                    1
                ],
                [
                    10,
                    2,
                    10
                ],
                [
                    9,
                    1,
                    0,
                    7
                ]
            ]
        }
    ]
}



async function setup() {

    const canvas = document.getElementById("screen")
    const context = canvas.getContext("2d")
    const timer = new Timer(1/60)
    const camera = new Vec2(0,0)
    camera.size = TileResolver.tileSize * TileResolver.screenWidthIndex
    camera.middle = camera.size / 2

    const player = await createPlayer()


    const input = new Input()

    input.setupPlayer(player,camera)

    setUpMouseControl(canvas,player,camera)

    const level = new Level()
    level.entities.push(player)

    createTiles(level,level_1.backgrounds)


 
    const spriteLayer = createSpriteLayer(level.entities,camera)
    const bglayer = createBckgroundLayer(level,camera)


    const comp = new Compositor()
    comp.add(bglayer)
    comp.add(spriteLayer)


    timer.update = () => {
        player.updateCamera(camera)
        level.update(1/60)
        comp.draw(context)
    }
   
    return timer

}

 setup().then((timer)=>{
    timer.start()
 })





