var CircularProgressBarMaterialSetup = pc.createScript('circularProgressBarMaterialSetup');
CircularProgressBarMaterialSetup.attributes.add('materials', {type: 'asset', array: true});
CircularProgressBarMaterialSetup.attributes.add('shaderStart', {type: 'asset'});
CircularProgressBarMaterialSetup.attributes.add('shaderEnd', {type: 'asset'});
CircularProgressBarMaterialSetup.attributes.add('lolProgress', {type: 'number', min: 0.0, max: 1.0, default: 0.5});

// initialize code called once per entity
CircularProgressBarMaterialSetup.prototype.initialize = function() {
    // get the shader asset
    var fsStart = this.shaderStart.resource;
    var fsEnd = this.shaderEnd.resource;

    // update all the materials with the chunk
    for (var i = 0; i < this.materials.length; i++) {
        var material = this.materials[i].resource;
        material.chunks.APIVersion = pc.CHUNKAPI_1_57;
        material.chunks.startPS = fsStart;
        material.chunks.endPS = fsEnd;
        material.setParameter('uProgress', this.lolProgress);
        // Force the shader generator to generate UV processing code

        material.update();
    }
};

// update code called every frame
CircularProgressBarMaterialSetup.prototype.update = function(dt) {
    /*for (var i = 0; i < this.materials.length; i++) {
        var material = this.materials[i].resource;
        material.setParameter('uProgress', this.lolProgress);
    }*/
};

// swap method called for script hot-reloading
// inherit your script state here
// CircularProgressBarMaterialSetup.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/