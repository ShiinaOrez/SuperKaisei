export default class CollisionMask {
    constructor(width, height) {
        this.width = 16;
        this.height = 16;
        this.collisionMap = new Array();
        for (let x=0; x<=width+1; x++) {
            this.collisionMap[x] = new Array();
            this.collisionMap[x][0] = true;
            this.collisionMap[x][height+1] = true;
        }
    }

    drawCollision(x, y) {
        this.collisionMap[x][y] = true;
    }

    drawTileCollision(x, y) {
        for (let i=1; i<=this.width; i++) {
            for (let j=1; j<=this.height; j++) {
                this.drawCollision(this.width*this.width+i, this.height*this.height+j);
            }
        }
    }

    addTile(tile) {
        if (tile.collision) {
            tile.ranges.forEach(([x1, x2, y1, y2]) => {
                for (; x1<x2; x1++) {
                    for (let i=y1; i<y2; i++) {
                        drawTileCollision(x1, i);
                    }
                }
            });
        }
        console.log(this.collisionMap);
    }
}