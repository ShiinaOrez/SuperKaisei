export default class Timer {
    constructor(deltaTime = 1/60) {
        let accumulatedTime = 0;
        let lastTime = 200;

        this.updateProxy = time => {
            //console.log(time);
            accumulatedTime += (time - lastTime) / 1000;
            while (accumulatedTime > deltaTime) {
                this.update(deltaTime);
                accumulatedTime -= deltaTime;
            }
            lastTime = time;
            this.enqueue(); // use the requestAnimationFrame is the best way to render
        }
    }

    enqueue() {
        //setTimeout(update, 1000/500, performance.now()); // the number inside smaller, the v kaisei will move slower.        
        requestAnimationFrame(this.updateProxy);
    }

    start() {
        this.enqueue();
    }
}