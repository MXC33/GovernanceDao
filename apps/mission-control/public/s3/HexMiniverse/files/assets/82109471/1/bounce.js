var Bounce = pc.createScript('bounce');

Bounce.attributes.add('bounceSpeed', {
    type: 'number',
    default: 4,
});


Bounce.attributes.add('bounceMagnitude', {
    type: 'number',
    default: 1,
    description: "Bounse height",
});

// initialize code called once per entity
Bounce.prototype.initialize = function() {
    this.totalTime = 0;
    this.startPosition = this.entity.getLocalPosition().clone();
};

// update code called every frame
Bounce.prototype.update = function(dt) {
    //if(this.app.renderNextFrame)
        this.totalTime += dt;
    var newPos = new pc.Vec3(0,Math.sin(this.totalTime* this.bounceSpeed*Math.PI*2.0)*this.bounceMagnitude, 0).add(this.startPosition);
    this.entity.setLocalPosition(newPos);
};

// swap method called for script hot-reloading
// inherit your script state here
// Bounce.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/