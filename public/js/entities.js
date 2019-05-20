import Entity from './entity.js'
import Jump from './traits/jump.js'
import Velocity from './traits/velocity.js'
import {loadKaiseiSprites} from './sprites.js';
import {MoveRight, MoveLeft} from './traits/move.js';

export function createKaisei() {
    return loadKaiseiSprites()
    .then(sprite => {
        const kaisei = new Entity();

        kaisei.addTrait(new Velocity());
        kaisei.addTrait(new Jump());
        kaisei.addTrait(new MoveRight());
        kaisei.addTrait(new MoveLeft())

        kaisei.draw = function drawKaisei(context) {
            sprite.draw('kaisei', context, this.pos.x , this.pos.y);
        }

        return kaisei;
    });
}