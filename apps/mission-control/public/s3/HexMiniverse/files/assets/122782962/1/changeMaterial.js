var ChangeMaterial = pc.createScript('changeMaterial');

ChangeMaterial.attributes.add("materials", {
    type: "asset",
    assetType: "material",
    array: true,
    title: "List Of Materials",
});

ChangeMaterial.attributes.add("emissiveTextures", {
    type: "asset",
    assetType: "texture",
    array: true,
    title: "List Of Materials",
});


/*
var MaterialType = {
	pristine1001: 0, 
	pristine1002: 1, 
	pristine1003: 2, 
	worn1001: 3, 
	worn1002: 4, 
	worn1003: 5, 
	damaged1001: 6,
    damaged1002: 7,
    damaged1003: 8
}; 
*/

ChangeMaterial.prototype.initialize = function () {
    this.emission = this.entity.script.emissivePulse;
    this.rotator = this.entity.parent.parent.parent.script.rotator;
};

// recieves an interger
ChangeMaterial.prototype.setMaterial = function (stage) {

    //stage = Math.max(0, Math.min(stage, this.materials.length - 1));

    if (!Number.isInteger(stage)){ 
        //console.log('we did not recieve any information');
        // Set rover to prestine just incase!
        stage = 0;
    }

    const length = this.entity.render.meshInstances.length;

    for(var i = 0; i < length; i++){
        for(var j = 0; j < length; j++){
            this.entity.render.meshInstances[i].material = this.materials[(length * stage) + j].resource;
        }
    }

    /*switch (stage) {
        case 0:
        //Code here for prestine
            this.entity.render.meshInstances[0].material = this.materials[0].resource;
            this.entity.render.meshInstances[1].material = this.materials[1].resource;
            this.entity.render.meshInstances[2].material = this.materials[2].resource;
        break;
        case 1:
        //Code here for worn
            this.entity.render.meshInstances[0].material = this.materials[3].resource;
            this.entity.render.meshInstances[1].material = this.materials[4].resource;
            this.entity.render.meshInstances[2].material = this.materials[5].resource;
            //this.emission.enabled = true;
            this.emission.pulseSpeed = 5;
        break;
        case 2:
        //Code here damaged
            this.entity.render.meshInstances[0].material = this.materials[6].resource;
            this.entity.render.meshInstances[1].material = this.materials[7].resource;
            this.entity.render.meshInstances[2].material = this.materials[8].resource;
            //this.emission.enabled = true;
            this.emission.pulseSpeed = 10;
        break;
        case 3:
        //Code here for broken // APARENTLY WE ARE NOT USEING IT :D
            this.entity.render.meshInstances[0].material = this.materials[9].resource;
            this.entity.render.meshInstances[1].material = this.materials[10].resource;
            this.entity.render.meshInstances[2].material = this.materials[11].resource;
            this.rotator.enabled = false;
        break;
    }*/
};

//This is a quick script it will NEED to change later on.
ChangeMaterial.prototype.setMaterialEmmisive = function (stage) {

    if(stage == 3){
        this.rotator.enabled = false;
        return;
    }
    //stage = Math.max(0, Math.min(stage, this.materials.length - 1));

    /*this.emission.enabled = true;
    this.emission.pulseSpeed = 10;*/
    //console.log('setMaterialEmmisive');

    if (!Number.isInteger(stage)){ 
        //console.log('we did not recieve any information');
        // Set rover to prestine just incase!
        stage = 0;
    }

    const length = this.entity.render.meshInstances.length;

    for(var i = 0; i < length; i++){
        var materialCopy = this.entity.render.meshInstances[i].material.clone();
        const index = (length * stage) + i;
        materialCopy.emissiveMap = this.emissiveTextures[index].resource;
        this.entity.render.meshInstances[i].material = materialCopy;
    }

    /*this.emission = this.entity.script.emissivePulse;
    var materialCopy    = this.entity.render.meshInstances[0].material.clone();
    var materialCopy2   = this.entity.render.meshInstances[1].material.clone();
    var materialCopy3   = this.entity.render.meshInstances[2].material.clone();

    switch (stage) {
        case 0:
        //Code here for prestine
            materialCopy.emissiveMap = this.emissiveTextures[0].resource;
            materialCopy2.emissiveMap = this.emissiveTextures[1].resource;
            materialCopy3.emissiveMap = this.emissiveTextures[2].resource;
        break;
        case 1:
        //Code here for worn
            materialCopy.emissiveMap = this.emissiveTextures[3].resource;
            materialCopy2.emissiveMap = this.emissiveTextures[4].resource;
            materialCopy3.emissiveMap = this.emissiveTextures[5].resource;
            this.emission.enabled = true;
            this.emission.pulseSpeed = 5;
        break;
        case 2:
        //Code here damaged
            materialCopy.emissiveMap = this.emissiveTextures[6].resource;
            materialCopy2.emissiveMap = this.emissiveTextures[7].resource;
            materialCopy3.emissiveMap = this.emissiveTextures[8].resource;
            this.emission.enabled = true;
            this.emission.pulseSpeed = 10;
        break;
        case 3:
            this.rotator.enabled = false;
        break;
    }

    this.entity.render.meshInstances[0].material = materialCopy;
    this.entity.render.meshInstances[1].material = materialCopy2;
    this.entity.render.meshInstances[2].material = materialCopy3;*/
};