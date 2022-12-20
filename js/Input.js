export class Input {
    constructor() {
        this.keyStatus = 1
        this.canPress = true
        this.keyMap = new Map()
    }

   

    addKey(keyName,cb) {
        this.keyMap.set(keyName,cb);

        (["keyup", "keydown"]).forEach(key => {
            addEventListener(key, (event) => {
                if (event.type == "keydown") {
                    this.keyStatus = 1
                }

                if(event.type == "keyup"){
                    this.keyStatus = 0
                    this.canPress = true
                }

                if (event.key == keyName && this.keyStatus == 1 && this.canPress) {
                   this.keyMap.get(keyName)(this.keyStatus)
                    this.canPress = false
                }

                if (event.key == keyName && this.keyStatus == 0 && this.canPress) {
                    this.keyMap.get(keyName)(this.keyStatus)
                }


            })
        })
    }

}