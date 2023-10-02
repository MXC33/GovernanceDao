var LookAtentity = pc.createScript('lookAtentity');

LookAtentity.attributes.add('orbitCameraEntity', {
    type: 'entity'
})
LookAtentity.attributes.add('facilityEntity', {
    type: 'entity'
})

// initialize code called once per entity
LookAtentity.prototype.initialize = function() {
    this.orbitCamera = this.orbitCameraEntity.script.orbitCamera;
    this.startPos = this.entity.getLocalPosition();
};

// update code called every frame
LookAtentity.prototype.update = function(dt) {
    
    const offSet = this.orbitCamera.offsetVector.clone();
    offSet.z = this.startPos.z;
    offSet.x = 0;
    const lookAtPoint = this.facilityEntity.getPosition().clone().sub(offSet);
    this.entity.lookAt(this.facilityEntity);
};

// swap method called for script hot-reloading
// inherit your script state here
// LookAtentity.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/