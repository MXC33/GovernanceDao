var PlanarPulse = pc.createScript('planarPulse');

PlanarPulse.attributes.add('pulseSpeed', {
    type: 'number',
    default: 1,
});


PlanarPulse.attributes.add('pulseMagnitude', {
    type: 'number',
    default: 0.1,
});

// initialize code called once per entity
PlanarPulse.prototype.initialize = function() {
    this.initScale = this.entity.getLocalScale().clone();
    this.t = 0.0;
};

// update code called every frame
PlanarPulse.prototype.update = function(dt) {
    const offset = Math.sin(this.t*Math.PI*this.pulseSpeed)*this.pulseMagnitude;
    this.entity.setLocalScale(this.initScale.x + offset, this.initScale.y, this.initScale.z + offset);
    this.t += dt;
};

// swap method called for script hot-reloading
// inherit your script state here
// PlanarPulse.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/