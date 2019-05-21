import {Trait} from '../entity.js'

export default class Jump extends Trait{
    constructor() {
        super('jump');

        this.duration = 0.2; // 持续时间
        this.velocity = 300; // 
        this.engageTime = 0;
    }

    start() {
        console.log("start")
        this.engageTime = this.duration;
    }

    cancel() {
        console.log("cancel")
        this.engageTime = 0;
    }
    
    update(entity, deltaTime) {
        if (this.engageTime > 0) {
            entity.vel.y = -this.velocity;
            this.engageTime -= deltaTime;
        }
    };

}
