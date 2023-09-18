var Rotator = pc.createScript('rotator');

Rotator.attributes.add('rotationSpeed', {
    type: 'number',
    default: 15,
});

// initialize code called once per entity
Rotator.prototype.initialize = function() {
    this.entity.setEulerAngles(0, Math.random() * 360, 0);
};

// update code called every frame
Rotator.prototype.update = function(dt) {
    //if(this.app.renderNextFrame)
        this.entity.rotateLocal(0, dt * this.rotationSpeed*360, 0);
};

// swap method called for script hot-reloading
// inherit your script state here
// RotatePlaceholderDrone.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/