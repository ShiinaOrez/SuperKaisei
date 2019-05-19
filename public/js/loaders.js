export function loadImage(url) {
    return new Promise(resolve => { //Promise对象传入resolve参数，将一个匿名对象转化为promise对象
        const image = new Image();
        image.addEventListener('load', () => { //匿名函数，添加一个EventListener，并且设置超时时间，名字为load
            resolve(image);
        });
        image.src = url;
    });
}

export function loadLevel(name) { // 加载关卡的配置json文件
    return fetch(`/levels/${name}.json`) // fetch方法返回的promise对象，使用then进行异步执行
    .then(r => r.json())
    .then(json => new Promise(resolve => setTimeout(resolve, 0, json))) // 异步读取json
}