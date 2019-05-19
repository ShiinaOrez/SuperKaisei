import Entity from './entity.js'
import {loadKaiseiSprites} from './sprites.js';

export function createKaisei() {
    return loadKaiseiSprites()
    .then(sprite => {
        const kaisei = new Entity();
 
        kaisei.update = function updateKaisei(deltaTime) {
            this.pos.x += this.vel.x * deltaTime;
            this.pos.y += this.vel.y * deltaTime;
        };

        kaisei.draw = function drawKaisei(context) {
            sprite.draw('kaisei', context, this.pos.x , this.pos.y);
        }

        return kaisei;
    });
}