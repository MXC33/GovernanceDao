var SetRoatation = pc.createScript('setRoatation');

SetRoatation.attributes.add('entityToCompyRotation', {
    type: 'entity'
})

SetRoatation.attributes.add('facilityEntity', {
    type: 'entity'
})

// initialize code called once per entity
SetRoatation.prototype.initialize = function() {
    this.camera = this.entity.findByName("Camera");
    this.startPos = this.camera.getLocalPosition();
    this.orbitCamera = this.entityToCompyRotation.script.orbitCamera;
};

// update code called every frame
SetRoatation.prototype.update = function(dt) {
    this.entity.setRotation(this.entityToCompyRotation.getRotation());
    
    return;
    if(this.camera && this.entityToCompyRotation && this.orbitCamera){
        const offsetVector = this.orbitCamera.offsetVector.clone();
        offsetVector.z = this.startPos.z;
        offsetVector.x = this.startPos.x;
        //this.facilityEntity.setLocalPosition(offsetVector);
        this.camera.lookAt(this.facilityEntity);
        this.camera.setLocalPosition(offsetVector);
        return;
        
        //this.camera.setLocalPosition(offsetVector);
        //return;
        //this._screenSpaceOrigo
        const hScalar = this.orbitCamera._targetScreenSpaceOrigo.x;
        const vScalar = this.orbitCamera._targetScreenSpaceOrigo.y;
        var horizontalVector = this.camera.right.clone().mulScalar(hScalar);
        var verticalVector = this.camera.up.clone().mulScalar(vScalar);
        var newPos = this.startPos.clone();//.add2(horizontalVector, verticalVector);
        newPos.y = vScalar;
        //newPos.x = hScalar;
        
    }else{
        console.log("camera is null" + this.camera + " " + this.entityToCompyRotation + " " + this.orbitCamera);
    }
};

// swap method called for script hot-reloading
// inherit your script state here
// SetRoatation.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/