import Entity from './entity.js'
import {loadKaiseiSprites} from './sprites.js';

export function createKaisei() {
    return loadKaiseiSprites()
    .then(sprite => {
        const kaisei = new Entity();
        kaisei.pos.set(0, 160);
        kaisei.vel.set(2, -10);

        kaisei.update = function updateKaisei() {
            this.pos.x += this.vel.x;
            this.pos.y += this.vel.y;
        };

        kaisei.draw = function drawKaisei(context) {
            sprite.draw('kaisei', context, this.pos.x , this.pos.y);
        }

        return kaisei;
    });
}