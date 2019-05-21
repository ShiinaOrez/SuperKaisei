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
/*            tile.ranges.forEach(([x1, x2, y1, y2]) => {
                for (; x1<x2; x1++) {
                    for (let i=y1; i<y2; i++) {
                        var rect = new Rect(
                            x1 * 16,
                            i * 16,
                            16,
                            16
                        );
                        obstacles.push(rect);
                    }
                }
            })*/
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
/*    return ((rect.l < subject.r < rect.r) && (rect.t < subject.b < rect.b)) ||
    ((rect.l < subject.l < rect.r) && (rect.t < subject.b < rect.b)) ||
    ((rect.l < subject.r < rect.r) && (rect.t < subject.t < rect.b)) ||
    ((rect.l < subject.l < rect.r) && (rect.t < subject.t < rect.b))*/
    return res;
}

export function move(entity, x, y) {
    console.log(mask);

    var subject = new Rect(
        entity.pos.x,
        entity.pos.y,
        16,
        16
    );

    console.log(subject.l, subject.r, subject.t, subject.b);
    subject.x += x;
    var over = overlapForx(subject);
    if (x > 0) {
        for (let i=0; i<16; i++) {
            if (over[i]) {
                subject.r = subject.x - x + i;
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
                break;
            }
        }
    } else if (y < 0) {
        for (let i=15; i>=0; i--) {
            if (over[i]) {
                subject.t = subject.t + i;
                break;
            }
        }
    }
    entity.pos.x = subject.x;
    entity.pos.y = subject.y;
}