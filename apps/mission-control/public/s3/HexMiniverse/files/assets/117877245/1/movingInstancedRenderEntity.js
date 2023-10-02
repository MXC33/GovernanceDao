var MovingInstancedRenderEntity = pc.createScript('movingInstancedRenderEntity');

// initialize code called once per entity
MovingInstancedRenderEntity.prototype.initialize = function() {
    this.instancedRenderer = this.entity.script.instancedRenderEntity;
    
};

// update code called every frame
MovingInstancedRenderEntity.prototype.update = function(dt) {
    this.instancedRenderer.resetInstanceTransform();
};

// swap method called for script hot-reloading
// inherit your script state here
// MovingInstancedRenderEntity.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/