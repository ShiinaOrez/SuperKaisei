import {Trait} from '../entity.js'
import {move} from '../rect.js'

export default class Velocity extends Trait{
    constructor() {
        super('velocity');
    }
    
    update(entity, deltaTime) {
        move(entity, 
            entity.vel.x * deltaTime,
            entity.vel.y * deltaTime);
    };
}
