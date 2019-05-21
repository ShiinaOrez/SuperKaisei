export default class CollisionMask {
    constructor(w, h) {
        this.width = 16;
        this.height = 16;
        this.collisionMap = new Array(w+2);
        for (let x=0; x<=w+1; x++) {
            this.collisionMap[x] = new Array(h+2).fill(false);
            this.collisionMap[x][0] = true;
            this.collisionMap[x][h+1] = true;
        }
    }

    has(x, y) {
    //    console.log(x, y);
        if (x < 0 || y < 0) {
            return true;
        }
        return this.collisionMap[parseInt(x)][parseInt(y)];
    }

    drawCollision(x, y) {
        this.collisionMap[x][y] = true;
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
                for (; x1<=x2; x1++) {
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