export class Input {
    constructor() {
        this.keyStatus = 1
        this.canPress = new Map()
        this.keyMap = new Map()
    }
   

    addKey(keyName,cb) {
        this.keyMap.set(keyName,cb);
        this.canPress.set(keyName,true);

        (["keyup", "keydown"]).forEach(key => {
            addEventListener(key, (event) => {

                event.preventDefault()

                if (event.type == "keydown") {
                    this.keyStatus = 1
                }

                if(event.type == "keyup"){
                    this.keyStatus = 0
                    this.canPress.set(keyName,true)
                }

                if (event.key.toUpperCase() == keyName.toUpperCase() && this.keyStatus == 1 && this.canPress.get(keyName)) {
                   this.keyMap.get(keyName)(this.keyStatus)
                    this.canPress.set(keyName,false)
                }

                if (event.key.toUpperCase() == keyName.toUpperCase() && this.keyStatus == 0 && this.canPress.get(keyName)) {
                    this.keyMap.get(keyName)(this.keyStatus)
                }

              
            })
        })
    }


    setupPlayer(entity){

        this.addKey("d",(keyStatus)=>{
            if(keyStatus == 1){
                entity.Go.direction = 20
            }
            if(keyStatus == 0){
                entity.Go.direction = 0
    
            }
        })
    
        this.addKey("a",(keyStatus)=>{
            if(keyStatus == 1){
                entity.Go.direction = -20
            }
            if(keyStatus == 0){
                entity.Go.direction = 0
    
            }
        })
    
        this.addKey("p",(keyStatus)=>{
            if(keyStatus == 1 && entity.Jump.falling != true){
                entity.Jump.start()
            }
        })
    }

}