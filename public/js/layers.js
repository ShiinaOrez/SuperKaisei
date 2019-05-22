export function createBackgroundLayer(backgrounds, sprites) { // create background layer, and then push it to the layers.
    const buffer = document.createElement('canvas');
    buffer.width = 400;
    buffer.height = 240;

    backgrounds.forEach(bg => { 
        drawBackground(bg, buffer.getContext('2d'), sprites); // json中的值作为drawBackground的参数
    });

    return function drawBackgroundLayer(context) {
        context.drawImage(buffer, 0, 0);
    };
}

export function createCollisionLayer(collisionMask) {
    return function drawCollisionLayer(context) {
        collisionMask.draw(context);
    }
}

function drawBackground(background, context, sprites) { // 描绘背景，参数中的background来自json配置文件
    background.ranges.forEach(([x1, x2, y1, y2]) => {
        for (let x = x1; x < x2; ++x) {
            for (let y = y1; y < y2; ++y) {
                sprites.drawTile(background.tile, context, x, y); // 分别draw
            }
        }
    });
}

export function createSpritesLayer(entity) {
    return function drawSpriteLayer(context) {
        entity.draw(context);
    };
}