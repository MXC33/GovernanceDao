var InstancedRenderEntity = pc.createScript('instancedRenderEntity');

InstancedRenderEntity.attributes.add('useInstancing', {
    type: 'boolean',
    default: false, 
    title: 'Use instancing'
});

InstancedRenderEntity.attributes.add('instancingEntity', {
    type: 'entity',
    default: null, 
    title: 'Instancing Entity'
});

InstancedRenderEntity.attributes.add('entityName', {
    type: 'string',
    default: "",
    title: 'entity to find Name'
});


InstancedRenderEntity.prototype.resetInstanceTransform = function() {
    if(this.isAdded) {
        this.instancingManager.setInstanceTransform(this.instanceId, this.entity.getWorldTransform());
    }
};

// initialize code called once per entity
InstancedRenderEntity.prototype.initialize = function() {
    this.isAdded = false;

    if(this.useInstancing && this.entityName != "" && this.instancingEntity == null) {
        //console.log("Find instancing entity");
        this.instancingEntity = this.app.root.findByName(this.entityName);
    }

    if(this.useInstancing && this.instancingEntity && this.instancingEntity.enabled) {
        //Turn off this entitys render component
        this.entity.render.enabled = false;
        this.instancingManager = this.instancingEntity.script.dynamicGeometryInstancing;

        if(this.instancingManager == null){
            //console.log("instancingEntity dosen't have dynamicGeometryInstancing script");
            return;
        }

        //console.log(this.instancingEntity.name + " has dynamicGeometryInstancing script");

        if(!this.isAdded) {
            this.instanceId = this.instancingManager.addInstance(this.entity.getWorldTransform());
            this.instancingManager.reUpload();
            this.isAdded = true;
        }

        this.on('enable', function () {
            if(!this.isAdded) {
                this.instanceId = this.instancingManager.addInstance(this.entity.getWorldTransform());
                this.instancingManager.reUpload();
                this.isAdded = true;
                //console.log("enable " + this.entity.name);
            }
        }, this);

        this.on('destroy', function () {
            if(this.isAdded) {
                this.instancingManager.removeInstance(this.instanceId);
                this.instancingManager.reUpload();
                this.isAdded = false;
                this.instanceId = null;
                //console.log("destroy " + this.entity.name);
            }
        }, this);

        this.on('disable', function () {
            if(this.isAdded) {
                this.instancingManager.removeInstance(this.instanceId);
                this.instancingManager.reUpload();
                this.isAdded = false;
                this.instanceId = null;
                //console.log("disable " + this.entity.name);
            }
        }, this);

        this.instancingEntity.on('destroy', function () {
            this.off('destroy', null, this);
            this.off('disable', null, this);
        });
    } else {
        this.entity.render.enabled = true;
    }

};
