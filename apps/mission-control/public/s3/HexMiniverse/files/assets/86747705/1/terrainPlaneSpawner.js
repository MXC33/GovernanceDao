var TerrainPlaneSpawner = pc.createScript('terrainPlaneSpawner');

TerrainPlaneSpawner.attributes.add('planePrototypeEntity', {
    type: 'entity',
    default: null, 
    title: 'Plane Prototype Entity'
});

TerrainPlaneSpawner.attributes.add('planesListEntity', {
    type: 'entity',
    default: null, 
    title: 'Plane List Container Entity'
});

TerrainPlaneSpawner.attributes.add('useInstancing', {
    type: 'boolean',
    default: false, 
    title: 'Use instancing'
});

TerrainPlaneSpawner.attributes.add('instancingEntity', {
    type: 'entity',
    default: null, 
    title: 'Instancing Entity'
});

TerrainPlaneSpawner.attributes.add('nrOfPlanes', {
    type: 'number',
    default: 10, 
    title: 'Number of planes to spawn'
});


TerrainPlaneSpawner.attributes.add('planeStepHeight', {
    type: 'number',
    default: 0.1, 
    title: 'Pix Height'
});

// initialize code called once per entity
TerrainPlaneSpawner.prototype.initialize = function() {

    if(this.useInstancing && this.instancingEntity && this.instancingEntity.enabled) {
        const instancingManager = this.instancingEntity.script.dynamicGeometryInstancing;
        const instancePlaneIds = [];
        const tempMatrix = new pc.Mat4().setIdentity();
        const tempPos = new pc.Vec3(0,0,0);
        const pos = this.entity.getPosition();
        const rot = this.planePrototypeEntity.getRotation();
        const scale = this.planePrototypeEntity.getScale();
        //Foreach plane add a new instance to the instance manager, modify its transform, save the instanceIDs
        for(var i = 0; i < this.nrOfPlanes; i++) {
            
            //Add to instance manager
            tempPos.set(0, i*this.planeStepHeight, 0).add(pos);
            tempMatrix.setTRS(tempPos, rot, scale);
            const instanceId = instancingManager.addInstance(tempMatrix);
            
            //Store instanceId reference
            instancePlaneIds.push(instanceId);
        }
        instancingManager.reUpload();

        this.instancePlaneIds = instancePlaneIds;
        this.instancingManager = instancingManager;
        
        //When this entity is destroyed, remove the instances from the manager
        this.on('destroy', function() {
            this.instancePlaneIds.forEach(instanceId => {
                this.instancingManager.removeInstance(instanceId);
            });
            this.instancingManager.reUpload();
        }, this);

        this.on('disable', function() {
            this.instancePlaneIds.forEach(instanceId => {
                this.instancingManager.removeInstance(instanceId);
            });
            this.instancingManager.reUpload();
        }, this);

        this.instancingEntity.on('destroy', function () {
            this.off('disable', null, this);
            this.off('disable', null, this);
        });
    } else {
        if(this.planesListEntity.children.length == 0) {
            for(var i = 0; i < this.nrOfPlanes; i++) {
                var clone = this.planePrototypeEntity.clone();
                clone.name += i.toString();
                clone.setLocalPosition(0, i*this.planeStepHeight, 0);
                this.planesListEntity.addChild(clone);
                clone.enabled = true;
            }
        }
    }
};


TerrainPlaneSpawner.prototype.onPlaneStepHeightChanged = function() {
    var i;
    var stepHeight = this.planeStepHeight;
    //update plane positions
    if(this.entity.enabled) {
        if(this.useInstancing) {
            //Todo: Update instance transforms
        } else {
            for(i = 0; i < this.nrOfPlanes; i++) {
                var plane = this.planesListEntity.children[i];
                plane.setLocalPosition(0, i*stepHeight, 0);
                //plane.enabled = plane.getPosition().y < 0.4;
            }
        }
    }
};
