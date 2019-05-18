export function loadImage(url) {
    return new Promise(resolve => { //Promise对象传入resolve参数，将一个匿名对象转化为promise对象
        const image = new Image();
        image.addEventListener('load', () => { //匿名函数，添加一个EventListener，并且设置超时时间，名字为load
            setTimeout(resolve, 2000, image);
            //resolve(image);
        });
        image.src = url;
    });
}

export function loadLevel(name) { // 加载关卡的配置json文件
    return fetch(`/levels/${name}.json`)
    .then(r => r.json())
    .then(json => new Promise(resolve => setTimeout(resolve, 3000, json))) // 异步读取json
}