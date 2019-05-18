export default class Compositor { // 组合各个层的组合器
    constructor() {
        this.layers = []; // 层是一个array
    }

    draw(context) {
        this.layers.forEach(layer => { // 对于每个层进行渲染
            layer(context);
        });
    }
}
