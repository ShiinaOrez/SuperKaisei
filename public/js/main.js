import Compositor from './compositor.js';
import Timer from './timer.js'
import {loadLevel} from './loaders.js';
import {loadBackgroundSprites} from './sprites.js';
import {createBackgroundLayer, createSpritesLayer} from './layers.js'
import {createKaisei} from './entities.js';

import Keyboard from './keyboardState.js'
import CollisionMask from './collisionMask.js';

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

    const collision = new CollisionMask(400, 240);
    collision.addTile(level.backgrounds);

    const timer = new Timer(1/60);

    const gravity = 2000;
    const friction = 300;
    kaisei.pos.set(0, 160);
    kaisei.vel.set(150, -600);

    const SPACE = 32;
    const LEFT = 37;
    const RIGHT = 39;
    
    const input = new Keyboard();

    input.addMapping(SPACE, keyState => {
        if (keyState) {
            kaisei.jump.start();
        } else {
            kaisei.jump.cancel();
        }
        console.log(keyState);
    })
    input.addMapping(LEFT, keyState => {
        if (keyState) {
            kaisei.moveLeft.start();
        } else {
            kaisei.moveLeft.cancel();
        }
        console.log("Move left state:", keyState);
    })
    input.addMapping(RIGHT, keyState => {
        if (keyState) {
            kaisei.moveRight.start();
        } else {
            kaisei.moveRight.cancel();
        }
        console.log("Move right state:", keyState);
    })

    input.listenTo(window);

    const spritesLayer =createSpritesLayer(kaisei);
    comp.layers.push(spritesLayer);

    timer.update = function updateTimer(deltaTime) {
        kaisei.update(deltaTime);
        comp.draw(context);
        kaisei.vel.y += gravity * deltaTime;
        if (kaisei.vel.x > 0.001) {
            kaisei.vel.x -= friction * deltaTime;
        } else if (kaisei.vel.x < -0.001) {
            kaisei.vel.x += friction * deltaTime;
        } else {
            kaisei.vel.x = 0;
        }
    }

    timer.start();
});