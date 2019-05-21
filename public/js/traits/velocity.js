import {Trait} from '../entity.js'
import {move} from '../rect.js'

export default class Velocity extends Trait{
    constructor() {
        super('velocity');
    }
    
    update(entity, deltaTime) {
        const subject = move(entity, 
            entity.vel.x * deltaTime,
            entity.vel.y * deltaTime);
        entity.pos.x = subject.x;
        entity.pos.y = subject.y;
    };
}
