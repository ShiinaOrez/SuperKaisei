export default class SpriteSheet {
    constructor(image, w = 16, h = 16) {
        this.image = image;
        this.width = w;
        this.height = h;
        this.tiles = new Map(); // 渲染的canvas和名字的映射，整个sheet是一块块拼接起来的
    }

    define(name, x, y, width, height) {
        const buffer = document.createElement('canvas'); // canvas标签用于定义图形
        buffer.height = height; // buffer这个canvas的height
        buffer.width = width; // 同上
        buffer
            .getContext('2d') // canvas对象的二维渲染上下文
            .drawImage( // 这里使用全部的参数
                this.image, // 原图像，来自loadImage
                x, // 开始剪切的点（x，y）
                y,
                width, // 被剪切的宽度和高度
                height,
                0, // 放置图像的起始点（x，y）
                0,
                width, // 伸缩之后的图像的宽度和高度
                height);
        this.tiles.set(name, buffer); // 
    }

    defineTile(name, x, y) {
        this.define(name, x * this.width, y * this.height, this.width, this.height);
    }

    draw(name, context, x, y) {
        const buffer = this.tiles.get(name); // 根据名字提取出canvas，在这之前必须define canvas
        context.drawImage(buffer, x, y); // 画图，在（x，y）上开始
    }

    drawTile(name, context, x, y) {
        this.draw(name, context, x * this.width, y * this.height); // 相对比例的放大后的坐标，因为是一块一块的，所以叫做画瓷砖吧w
    }
}