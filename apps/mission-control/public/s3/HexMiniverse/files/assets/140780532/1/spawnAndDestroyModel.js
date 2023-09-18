var SpawnAndDestroyModel = pc.createScript('spawnAndDestroyModel');

SpawnAndDestroyModel.attributes.add('models', {
    type: 'entity',
    array: true
});

// initialize code called once per entity
SpawnAndDestroyModel.prototype.initialize = function() {
    this.currentModel = null;
    this.currentModelIndex = null;
};

SpawnAndDestroyModel.prototype.spawnModels = function(index) {
    index = pc.math.clamp(index, 0 , this.models.length);

    if(this.currentModelIndex == index){
        return;
    }

    this.currentModelIndex = index;

    if(this.currentModel)
        this.currentModel.destroy();
    
    this.currentModel = this.models[index].copy();
    this.entity.addChild(this.currentModel)
    this.currentModel.setPosition(new pc.Vec3(0,0,0))
};