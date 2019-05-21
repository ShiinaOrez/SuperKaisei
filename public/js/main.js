import Compositor from './compositor.js';
import Timer from './timer.js'
import {loadLevel} from './loaders.js';
import {loadBackgroundSprites} from './sprites.js';
import {createBackgroundLayer, createSpritesLayer} from './layers.js'
import {createKaisei} from './entities.js';
import {createObstacles} from './rect.js'

import Keyboard from './keyboardState.js'

const canvas = document.getElementById('screen'); // index.html: element id=screen
const context = canvas.getContext('2d'); // context to draw image

Promise.all([
    createKaisei(),
    loadBackgroundSprites(),
    loadLevel('1-1'),
]) // 异步加载，返回sprites和level，分别是瓷砖类和关卡配置文件
.then(([kaisei, backgroundSprites, level,]) => {
    createObstacles(level.backgrounds); // create obstacles

    kaisei.pos.set(0, 160); // init postion and velocity
    kaisei.vel.set(150, -600);    
 
    const comp = new Compositor();
    const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
    comp.layers.push(backgroundLayer);
    const spritesLayer =createSpritesLayer(kaisei);
    comp.layers.push(spritesLayer);

    const timer = new Timer(1/60);
   
    const input = new Keyboard(kaisei);
    input.listenTo(window);

    timer.update = function updateTimer(deltaTime) {
        kaisei.update(deltaTime);
        comp.draw(context);

        if (kaisei.pos.y > 224) {
            kaisei.pos.y = 224;
        }
        if (kaisei.pos.x > 400) {
            kaisei.pos.x = 400;
        }
        if (kaisei.pos.y < 0) {
            kaisei.pos.y = 0;
        }
        if (kaisei.pos.x < 0) {
            kaisei.pos.x = 0;
        }
    }
    timer.start();
});