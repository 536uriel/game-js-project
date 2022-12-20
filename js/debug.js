export function setUpMouseControl(canvas, entity) {
    ['mousedown', 'mousemove'].forEach(eventNmae => {
        canvas.addEventListener(eventNmae, event => {



            if (event.buttons === 1) {
                entity.vel.set(0, 0);
                entity.pos.set(
                    event.offsetX,
                    event.offsetY
                );
            }
        })
    })
}