import Compositor from './compositor.js';
import Timer from './timer.js'
import {loadLevel} from './loaders.js';
import {loadBackgroundSprites} from './sprites.js';
import {createBackgroundLayer, createSpritesLayer} from './layers.js'
import {createKaisei} from './entities.js';

import Keyboard from './keyboardState.js'

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

    const timer = new Timer(1/60);

    const gravity = 2000;
    kaisei.pos.set(0, 160);
    kaisei.vel.set(170, -600);

    const SPACE = 32;
    const input = new Keyboard();
    input.addMapping(SPACE, keyState => {
        if (keyState) {
            kaisei.jump.start();
        } else {
            kaisei.jump.cancel();
        }
        console.log(keyState);
    })
    input.listenTo(window);

    const spritesLayer =createSpritesLayer(kaisei);
    comp.layers.push(spritesLayer);

    timer.update = function updateTimer(deltaTime) {
        kaisei.update(deltaTime);
        comp.draw(context);
        kaisei.vel.y += gravity * deltaTime;
    }

    timer.start();
});