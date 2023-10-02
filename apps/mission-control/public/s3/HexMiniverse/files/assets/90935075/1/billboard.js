var Billboard = pc.createScript('billboard');
Billboard.attributes.add('cameraEntity', {type: 'entity', default: null, title: 'Camera Entity'});

// initialize code called once per entity
Billboard.prototype.initialize = function() {
    if(this.cameraEntity == null){
        this.cameraEntity = this.app.root.findByName("WorldCamera");
    }
};

// update code called every frame
Billboard.prototype.postUpdate  = function(dt) {
    this.entity.setRotation(this.cameraEntity.getRotation().clone());
};

// swap method called for script hot-reloading
// inherit your script state here
// Billboard.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/