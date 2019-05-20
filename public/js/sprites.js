import SpriteSheet from './SpriteSheet.js';
import {loadImage} from './loaders.js';


export function loadKaiseiSprites() {
    return loadImage('/img/tiles.png')
    .then(image => {
        console.log("Kaisei sprites image loaded.", image);
        const kaisei = new SpriteSheet(image);
        kaisei.define('kaisei', 0, 112, 16, 16);
        return kaisei
    });
}

export function loadBackgroundSprites() {
    return loadImage('/img/tiles.png')
    .then(image => { // 加载image成功之后的回调函数
        console.log('Image loaded', image); // 成功了所以打印log
        const sprites = new SpriteSheet(image); // 新建一个画“瓷砖”的类，w和h默认都是16px
        sprites.defineTile('groundDirt', 1, 1); // 定义地面的小方块：根据SpriteSheet的基础的大小来进行相乘
        sprites.defineTile('groundLawn', 1, 0)
        sprites.defineTile('sky', 7, 4); // get (112, 80)
        sprites.defineTile('scale', 7, 5);
        return sprites // 返回一个定义了ground和sky这两类瓷砖的类
    });
}