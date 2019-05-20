import {Trait} from '../entity.js'

export class MoveRight extends Trait{
    constructor() {
        super('moveRight');

        this.velocity = 100;
        this.over = 1;
        this.moveVelocity = 0;
    }

    start() {
        console.log("Move right start")
        this.moveVelocity = this.velocity;
        this.over = 0;
    }

    cancel() {
        console.log("Move right cancel")
        this.moveVelocity = 0;
        this.over = 1;
    }
    
    update(entity, deltaTime) {
        if (this.over === 0) {
            entity.vel.x = this.moveVelocity;
            console.log(entity.vel.x)
        }
    };

}

export class MoveLeft extends Trait{
    constructor() {
        super('moveLeft');

        this.velocity = -100;
        this.over = 1;
        this.moveVelocity = 0;
    }

    start() {
        console.log("Move left start")
        this.moveVelocity = this.velocity;
        this.over = 0;
    }

    cancel() {
        console.log("Move left cancel")
        this.moveVelocity = 0;
        this.over = 1;
    }
    
    update(entity, deltaTime) {
        if (this.over === 0) {
            entity.vel.x = this.moveVelocity;
        }
    };

}
