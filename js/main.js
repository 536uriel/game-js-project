import { Compositor } from "./compositor.js"
import { createPlayer } from "./entities.js"
import { createBckgroundLayer, createSpriteLayer } from "./layers.js"
import Timer from "./timer.js"
import { setUpMouseControl } from "./debug.js"
import { createTiles, Level } from "./Level.js"
import { Input } from "./input.js"

const input = new Input()


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

    const player = await createPlayer()

    input.addKey("d",(keyStatus)=>{
        if(keyStatus == 1){
            player.Go.direction = 100
        }
        if(keyStatus == 0){
            player.Go.direction = 0

        }
    })

    input.addKey("a",(keyStatus)=>{
        if(keyStatus == 1){
            player.Go.direction = -100
        }
        if(keyStatus == 0){
            player.Go.direction = 0

        }
    })

    setUpMouseControl(canvas,player)

    const level = new Level()
    level.entities.push(player)

    createTiles(level,level_1.backgrounds)


 
    const spriteLayer = createSpriteLayer(level.entities)
    const bglayer = createBckgroundLayer(level)


    const comp = new Compositor()
    comp.add(bglayer)
    comp.add(spriteLayer)



    timer.update = () => {
        level.update(1/60)
        comp.draw(context)
    }
   
    return timer

}

 setup().then((timer)=>{
    timer.start()
 })





