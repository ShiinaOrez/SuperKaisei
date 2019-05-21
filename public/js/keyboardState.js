const PRESSED = 1;
const RELEASED = 0;

export default class Keyboard {
    constructor(kaisei) {
        // holds the current state of a given key
        this.keyStates = new Map();
        // holds the callback functions for a key code
        this.keyMap = new Map();
        this.SPACE = 32;
        this.LEFT = 37;
        this.RIGHT = 39;
        
        this.init(kaisei);
    }

    addMapping(keyCode, callback) {
        this.keyMap.set(keyCode, callback); // add the callback function to keyCode
    }

    handleEvent(event) { // 监听到的keyup和keydown的Event
        const {keyCode} = event; // 拿到keyCode

        if (!this.keyMap.has(keyCode)) { // 判断我们是否对于keyCode有特殊处理
            return false;
        }

        event.preventDefault(); // 抑制网页中使用其它按键时的原本操作：比如F5是刷新

        const keyState = event.type === 'keydown' ? PRESSED : RELEASED; // 究竟是down还是up

        if (this.keyStates.get(keyCode) === keyState) { // 保持了原来的state
            return;
        }

        this.keyStates.set(keyCode, keyState); // 更新keyCode的keyState
        this.keyMap.get(keyCode)(keyState); // 获取相应的回调函数并且，传入keyState
    }

    listenTo(window) {
        ['keydown', 'keyup'].forEach(eventName => {
            window.addEventListener(eventName, event => {
                this.handleEvent(event);
            });
        });
    }

    init(kaisei) {
        this.addMapping(this.SPACE, keyState => {
            if (keyState) {
                kaisei.jump.start();
            } else {
                kaisei.jump.cancel();
            }
            console.log(keyState);
        })
        this.addMapping(this.LEFT, keyState => {
            if (keyState) {
                kaisei.moveLeft.start();
            } else {
                kaisei.moveLeft.cancel();
            }
            console.log("Move left state:", keyState);
        })
        this.addMapping(this.RIGHT, keyState => {
            if (keyState) {
                kaisei.moveRight.start();
            } else {
                kaisei.moveRight.cancel();
            }
            console.log("Move right state:", keyState);
        })    
    }
}