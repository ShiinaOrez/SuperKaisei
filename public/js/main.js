import Compositor from './compositor.js';
import {loadLevel} from './loaders.js';
import {loadBackgroundSprites} from './sprites.js';
import {createBackgroundLayer, createSpritesLayer} from './layers.js'
import {createKaisei} from './entities.js';

const canvas = document.getElementById('screen'); // index.html: element id=screen
const context = canvas.getContext('2d'); // context to draw image

Promise.all([
    createKaisei(),
    loadBackgroundSprites(),
    loadLevel('1-1'),
]) // 异步加载，返回sprites和level，分别是瓷砖类和关卡配置文件
.then(([kaisei, backgroundSprites, level,]) => {
    const comp = new Compositor();

    const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
    comp.layers.push(backgroundLayer);

    const gravity = -0.5;

    const spritesLayer =createSpritesLayer(kaisei);
    comp.layers.push(spritesLayer);

    function update() {
        comp.draw(context);
        kaisei.update();
        kaisei.vel.y -= gravity;
        requestAnimationFrame(update); // use the requestAnimationFrame is the best way to render
    }

    update(); // please make sure your update function run at least once.
});