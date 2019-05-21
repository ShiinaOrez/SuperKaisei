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
