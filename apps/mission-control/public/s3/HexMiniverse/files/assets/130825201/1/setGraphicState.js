var SetGraphicState = pc.createScript('setGraphicState');

SetGraphicState.attributes.add('graphicsEntity', {
    type: 'entity',
    array: true
})

// initialize code called once per entity
SetGraphicState.prototype.initialize = function() {

};

// update code called every frame
SetGraphicState.prototype.update = function(dt) {

};

SetGraphicState.prototype.setGraphicState = function(state) {
    for(var i = 0; i < this.graphicsEntity.length; i++){
        this.graphicsEntity[i].enabled = false;
    }

    this.graphicsEntity[state].enabled = true;
    //var facilityParticals = this.entity.findByTag("facilityParticals");
};


// swap method called for script hot-reloading
// inherit your script state here
// SetGraphicState.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/