export default class CollisionMask {
    constructor(w, h) {
        this.width = 16;
        this.height = 16;
        this.collisionMap = new Array(w+2);
        this.collisionMap[0] = new Array(h+2).fill(1);
        for (let x=1; x<=w; x++) {
            this.collisionMap[x] = new Array(h+2).fill(0);
            this.collisionMap[x][0] = 1;
            this.collisionMap[x][h] = 1;
        }
        this.collisionMap[w+1] = new Array(h+2).fill(1);
    }

    has(x, y) {
        if (x < 0 || y < 0 || x > 401 || y > 241) {
            return true;
        }
        return this.collisionMap[parseInt(x)][parseInt(y)] === 1;
    }

    drawCollision(x, y) {
        this.collisionMap[x][y] = 1;
    }

    drawTileCollision(x, y) {
        for (let i=1; i<=this.width; i++) {
            for (let j=1; j<=this.height; j++) {
                this.drawCollision(x*this.width+i, y*this.height+j);
            }
        }
    }

    addTile(tile) {
        console.log(tile);
        if (tile.collision) {
            console.log("Ready to add tile:", tile.tile);
            tile.ranges.forEach(([x1, x2, y1, y2]) => {
                for (; x1<x2; x1++) {
                    for (let i=y1; i<y2; i++) {
                        this.drawTileCollision(x1, i);
                        console.log("Draw:", x1, i);
                    }
                }
            });
        }
        console.log(this.collisionMap);
    }
}