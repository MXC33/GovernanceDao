var ChangeWheelMaterial = pc.createScript('changeWheelMaterial');

ChangeWheelMaterial.attributes.add("materials", {
    type: "asset",
    assetType: "material",
    array: true,
    title: "List Of Materials",
});

// recieves an interger
ChangeWheelMaterial.prototype.setMaterial = function (stage) {

    //stage = Math.max(0, Math.min(stage, this.materials.length - 1));

    if (!Number.isInteger(stage)){ 
        console.log('we did not recieve any information');
        // Set rover to prestine just incase!
        stage = 0;
    }

    this.entity.render.meshInstances[0].material = this.materials[stage].resource;
};


