import TileCollider from './TileCollider.js';
import { Matrix } from './math.js';



export function createTiles(level, backgrounds) {

    function applyRange(background, xStart, xLen, yStart, yLen) {
        const xEnd = xStart + xLen;
        const yEnd = yStart + yLen;
        for (let x = xStart; x < xEnd; x++) {
            for (let y = yStart; y < yEnd; y++) {
                //set the background tiles
                level.tiles.set(x, y, {
                    name: background.tile,
                    type: background.type
                });
            }
        }
    }

    backgrounds.forEach(background => {

        background.ranges.forEach(range => {
            if (range.length === 4) {
                const [xStart, xLen, yStart, yLen] = range;
                applyRange(background, xStart, xLen, yStart, yLen);
            } else if (range.length === 3) {
                const [xStart, xLen, yStart] = range;
                applyRange(background, xStart, xLen, yStart, 1);
            } else if (range.length === 2) {
                const [xStart, yStart] = range;
                applyRange(background, xStart, 1, yStart, 1);
            }
        });

    });

}

export class Level {
    constructor(){
        this.entities = [];
        //the tile grid array
        this.tiles = new Matrix();

        this.tileCollider = new TileCollider(this.tiles);
        
        this.gravity = 10;
    }

    update(deltaTime) {


        this.entities.forEach(entity => {
            //call the traits update function in all entities

            entity.update(deltaTime);

            //update the position of the mario object
            entity.pos.x += entity.vel.x * deltaTime;

            //check the x position of the entity 
            //to not pass the tiles
            this.tileCollider.checkX(entity);

            entity.pos.y += entity.vel.y * deltaTime;

            //check the y position of the entity 
            //to not pass the tiles
            this.tileCollider.checkY(entity);

            //gravity
            entity.vel.y += this.gravity

        });

        this.totalTime += deltaTime;
    }
}