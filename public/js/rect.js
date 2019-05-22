import CollisionMask from './collisionMask.js'

export default class Rect { // 矩形类
    constructor(x, y, w, h) { // 坐标和长宽
        this.x = x; // getter and setter is l
        this.y = y; // getter and setter is t
        this.w = w;
        this.h = h;
    }

    get t() {
        return this.y;
    }

    get l() {
        return this.x;
    }

    get r() {
        return this.x + this.w; // (x, y) is left-up point, and the (r, b) is the right-down point
    }

    get b() {
        return this.y + this.h;
    }

    set t(v) {
        this.y = v;
    }

    set l(v) {
        this.x = v;
    }

    set r(v) {
        this.x = v - this.w;
    }

    set b(v) {
        this.y = v - this.h;
    }
}

const mask = new CollisionMask(400, 240);

export function createObstacles(backgounds) {
    backgounds.forEach(tile => {
        if (tile.collision) {
            mask.addTile(tile);
        }
    });
}

function overlapFory(subject) {
    var res = new Array(16).fill(false);
    for (let i=0; i<16; i++) {
        for (let j=0; j<16; j++) {
            if (mask.has(subject.x + i, subject.y + j)) {
                res[j] = true;
            }
        }
    }
    return res;
}

function overlapForx(subject) {
    var res = new Array(16).fill(false);
    for (let i=0; i<16; i++) {
        for (let j=0; j<16; j++) {
            if (mask.has(subject.x + i, subject.y + j)) {
                res[i] = true;
            }
        }
    }
    return res;
}

export function move(entity, x, y) { // offset_x and offset_y from entity.pos
    var subject = new Rect(
        entity.pos.x,
        entity.pos.y,
        16,
        16
    ); // entity now

    console.log(subject.l, subject.r, subject.t, subject.b);
    subject.x += x; // try move by x
    var over = overlapForx(subject); // 获取是否重复数组
    if (x > 0) {
        for (let i=0; i<16; i++) {
            if (over[i]) {
                subject.r = subject.x + i;
                break;
            }
        }
    } else if (x < 0) {
        for (let i=15; i>=0; i--) {
            if (over[i]) {
                subject.l = subject.x + i;
                break;
            }
        }
    }

    subject.y += y;
    over = overlapFory(subject);
    if (y > 0) {
        for (let i=0; i<16; i++) {
            if (over[i]) {
                subject.b = subject.t + i;
                entity.vel.y = 0;
                break;
            }
        }
    } else if (y < 0) {
        for (let i=15; i>=0; i--) {
            if (over[i]) {
                subject.t = subject.t - i;
                entity.vel.y = 1;
                break;
            }
        }
    }
    entity.pos.x = subject.x;
    entity.pos.y = subject.y;
    if (entity.pos.y <= 0) {
        entity.pos.y = 1;
        entity.vel.y = 2;
    }
    if (entity.pos.x <= 0) {
        entity.pos.x = 1;
        entity.vel.x = 0;
    }
}