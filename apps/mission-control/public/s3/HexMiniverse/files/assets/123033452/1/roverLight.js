var RoverLight = pc.createScript('roverLight');

RoverLight.attributes.add('rotationSpeed', {
    type: 'number',
    default: 4,
});

// initialize code called once per entity
RoverLight.prototype.initialize = function() {
    this.value = 0;
};

// update code called every frame
RoverLight.prototype.update = function(dt) {
    
    if(this.entity.getLocalEulerAngles().z >= 0){
        this.value = -30;
    }
    if(this.entity.getLocalEulerAngles().z <= -30){
        this.value = 30;
    }
    this.entity.rotateLocal(0, 0, (dt/this.rotationSpeed) *this.value);

};
