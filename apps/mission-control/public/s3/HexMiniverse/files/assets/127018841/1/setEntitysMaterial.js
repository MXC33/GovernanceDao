var SetEntitysMaterial = pc.createScript('setEntitysMaterial');

SetEntitysMaterial.attributes.add('print', {type: 'boolean', default: false});
SetEntitysMaterial.attributes.add('tag', {type: 'string', default: "AururaPlane"});
SetEntitysMaterial.attributes.add('materials', {type: 'asset', array: true});
SetEntitysMaterial.attributes.add('useLocalEmmisiveStrength', {type: 'boolean', default: false});
SetEntitysMaterial.attributes.add('emmisiveStrength', {type: 'number', min: 0, max: 10, array: true});

// initialize code called once per entity
SetEntitysMaterial.prototype.initialize = function() {

};

// update code called every frame
SetEntitysMaterial.prototype.update = function(dt) {

};

SetEntitysMaterial.prototype.setMaterialIndex = function(index) {
    
    if(this.materials.length == 0 && this.tag == ""){
        return;
    }
    
    if(this.tag == ""){
        this.setEntitysMaterialIndex(this.entity, index);
        return;
    }

    const entitys = this.entity.findByTag(this.tag);
    //this.setEntitysMaterialIndex(entitys[0], index);
    for(var i = 0; i < entitys.length; i++){
        this.setEntitysMaterialIndex(entitys[i], index);
    }
};

SetEntitysMaterial.prototype.setEntitysMaterialIndex = function(entity, index) {

    const length = this.materials.length;
    //console.log("index = " + index)
    index = Math.max(0, Math.min(index, length));
    
    if(this.materials[index] == null){
        return;
    }
    //console.log()
    if(this.print){
        //console.log("index = " + index + " " + this.materials[index].name + " emissiveIntensity " + this.materials[index].resource.emissiveIntensity);
    }
    
    // Assign the material to all the mesh instances in the model
    var allMeshInstances = [];
    var renders = [];
    
    var allMeshInstances = [];
    var renders = entity.findComponents('render');
    var i = 0, j = 0;
    
    for (i = 0; i < renders.length; ++i) {
        var meshInstances = renders[i].meshInstances;
        for (j = 0; j < meshInstances.length; j++) {
            allMeshInstances.push(meshInstances[j]);
        }
    }      

    const materialCopy = this.materials[index];//.clone();
    //console.log(this.materials[index].name);
    if(this.useLocalEmmisiveStrength){
        materialCopy.resource.emissiveIntensity = this.emmisiveStrength[index];
    }

    for (i = 0; i < allMeshInstances.length; ++i) { 
        var mesh = allMeshInstances[i];
        mesh.material = materialCopy.resource;
    }
    //console.log("index = " + index)
    //console.log(materialCopy.name + " " + materialCopy.resource.emissiveIntensity);
};
