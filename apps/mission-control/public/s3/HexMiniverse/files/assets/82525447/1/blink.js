var Blink = pc.createScript('blink');

Blink.attributes.add('blinkSpeed', {
    type: 'number',
    default: 4,
});


Blink.attributes.add('blinkEnitiy', {
    type: 'entity',
    default: null,
});


// initialize code called once per entity
Blink.prototype.initialize = function() {
    this.totalTime = 0;

};

// update code called every frame
Blink.prototype.update = function(dt) {
    this.blinkEnitiy.enabled = Math.sin(this.totalTime*this.blinkSpeed) > 0;
    this.totalTime += dt;
};

// swap method called for script hot-reloading
// inherit your script state here
// Blink.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/