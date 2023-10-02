var ChangeModelMaterials = pc.createScript('changeModelMaterials');

ChangeModelMaterials.attributes.add('materials' ,{
    type: 'asset',
    assetType: 'material',
    array: true
});

// initialize code called once per entity
ChangeModelMaterials.prototype.initialize = function() {
    this.t = 0;
    this.materialIndex = 0;
    
};

// update code called every frame
ChangeModelMaterials.prototype.update = function(dt) {
    this.t += dt;

    if(this.t >= 1){
        //this.materialIndex = (this.materialIndex + 1) % this.materials.length;
        this.materialIndex++;
        if(this.materialIndex > this.materials.length - 1){
            this.materialIndex = 0;
        }
        this.changeModelMaterial(this.materialIndex);
        this.t = 0;
        console.log("t = " + this.t);
        console.log("index = " + this.materialIndex);
        console.log(this.entity.name);
    }
};
ChangeModelMaterials.prototype.changeModelMaterial = function(index) {
    index = Math.max(0, Math.min(index, this.materials.length - 1));
    var material = this.materials[index];        
    console.log("changeModelMaterial");
    // Assign the material to all the mesh instances in the model
    var allMeshInstances = [];
    var renders = this.entity.findComponents('render');

    var i = 0;
    var j = 0;

    for (i = 0; i < renders.length; ++i) {
        var meshInstances = renders[i].meshInstances;
        for (j = 0; j < meshInstances.length; j++) {
            allMeshInstances.push(meshInstances[j]);
        }
    }
        for (i = 0; i < allMeshInstances.length; ++i) { 
        var mesh = allMeshInstances[i];
        mesh.material = material.resource;
    }

    /*for (i = 0; i < allMeshInstances.length; ++i) { 
        var mesh = allMeshInstances[i];
        mesh.material[0] = material.resource;
    }

    for (i = 0; i < allMeshInstances.length; ++i) { 
        var mesh = allMeshInstances[i];
        //mesh[0].material = material.resource;
        for (j = 0; j < mesh.material.length; j++) {
            mesh.material = material.resource;
        }
    }*/
};

// swap method called for script hot-reloading
// inherit your script state here
// ChangeModelMaterials.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/