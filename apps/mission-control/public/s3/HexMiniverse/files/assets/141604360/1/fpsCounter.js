var FpsCounter = pc.createScript('fpsCounter');

// initialize code called once per entity
FpsCounter.prototype.initialize = function() {
    this.entity.element.text = "FPS: -";
    
    this.sampleSize = 10;

    this.frameTimers = [];

    this.wasRenderingLastFrame= false;
};

// update code called every frame
FpsCounter.prototype.update = function(dt) {

};

FpsCounter.prototype.postUpdate = function(dt) {
    const isRenderNextFrame = this.app.renderNextFrame;

    this.frameTimers.push(dt);
    if(this.frameTimers.length > this.sampleSize)
        this.frameTimers.shift();


    if(!isRenderNextFrame && this.wasRenderingLastFrame) {
        this.entity.element.text = "-";
        this.app.renderNextFrame = true;

    } else {
        
        const sum = this.frameTimers.reduce((partialSum, a) => partialSum + a, 0);
        const avgFps = 1.0/(sum/this.frameTimers.length);
        this.entity.element.text =avgFps.toFixed(2);
    }
    
    this.wasRenderingLastFrame = isRenderNextFrame;
};

// swap method called for script hot-reloading
// inherit your script state here
// FpsCounter.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/