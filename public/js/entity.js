import {Vec2} from './math.js';

export class Trait {
    constructor(name) {
        this.NAME = name;
    }

    update() {
        console.warn("Unhandled update call in trait.")
    }
}

export default class Entity {
    constructor() {
        this.pos = new Vec2(0, 0);
        this.vel = new Vec2(0, 0);
        this.gravity = 2000;
        this.friction = 300;
        this.traits = [];
    }

    addTrait(trait) {
        this.traits.push(trait);
        this[trait.NAME] = trait;
    }

    update(deltaTime) {
        this.traits.forEach(trait => {
            trait.update(this, deltaTime);
        })

        this.vel.y += this.gravity * deltaTime;
        if (this.vel.x > 0.001) {
            this.vel.x -= this.friction * deltaTime;
        } else if (this.vel.x < -0.001) {
            this.vel.x += this.friction * deltaTime;
        } else {
            this.vel.x = 0;
        }

        if (this.pos.y > 240) {
            this.pos.y = 240;
            this.vel.y = 0;
        }
        if (this.pos.x > 400) {
            this.pos.x = 400;
            this.vel.x = 0;
        }
        if (this.pos.y < 0) {
            this.pos.y = 0;
        }
        if (this.pos.x < 0) {
            this.pos.x = 0;
            this.vel.x = 0;
        }
    }
}