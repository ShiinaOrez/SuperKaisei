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

const obstacles = new Array();

export function createObstacles(backgounds) {
    var obstacles = new Array();
    backgounds.forEach(tile => {
        if (tile.collision) {
            tile.ranges.forEach(([x1, x2, y1, y2]) => {
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
            })
        }
    });

    console.log(obstacles);    
}

export function overlap(subject, rect) {
    return subject.b > rect.t
        && subject.t < rect.b
        && subject.r > rect.l
        && subject.l < rect.r;
}

export function intersection(subject, fn) { // got a rect and a function
    obstacles.filter(obstacle => overlap(subject, obstacle)).forEach(fn);
}

export function move(entity, x, y) {
    var subject = new Rect(
        entity.pos.x,
        entity.pos.y,
        16,
        16
    );
    console.log(x, y, subject)
    subject.x += x;
    if (x > 0) { // also in the canvas
        intersection(subject, rect => {
            if (subject.r > rect.l) {
                subject.r = rect.l;
            }
        });
    } else if (x < 0) {
        intersection(subject, rect => {
            if (subject.l < rect.r) {
                subject.l = rect.r;
            }
        });
    }

    subject.y += y;
    if (y > 0) {
        intersection(subject, rect => {
            if (subject.b > rect.t) {
                subject.b = rect.t;
            }
        });
    } else if (y < 0) {
        intersection(subject, rect => {
            if (subject.t < rect.b) {
                subject.t = rect.b;
            }
        });
    }
    return subject;
}