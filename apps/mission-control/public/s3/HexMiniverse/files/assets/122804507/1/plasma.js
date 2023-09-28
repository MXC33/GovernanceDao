pc.script.attribute('materials', 'asset', [], {
    type: 'material'
});
pc.script.attribute('shader', 'asset', [], {
    type: 'shader',
    max: 1
});

var Plasma = pc.createScript('plasma');

Plasma.attributes.add('materials', {type: 'asset', array: true});
Plasma.attributes.add('emissiveShader', {type: 'asset'});
Plasma.attributes.add('opacityShader', {type: 'asset'});

Plasma.prototype.initialize = function () {
    // get the shader asset
    var fsE = this.emissiveShader.resource;
    //var fsO = this.opacityShader.resource;

    // update all the materials with the chunk
    for (var i = 0; i < this.materials.length; i++) {
        var material = this.materials[i].resource;
        material.chunks.APIVersion = pc.CHUNKAPI_1_55;
        material.chunks.emissivePS = fsE;
        //material.chunks.opacityPS = fsO;
        // Force the shader generator to generate UV processing code
        material.diffuseMap = new pc.Texture(this.app.graphicsDevice, {
            width: 1,
            height: 1,
            format: pc.PIXELFORMAT_R8_G8_B8
        });
        material.setParameter('iGlobalTime', 0);
        material.update();
    }

    this.time = 0;
};

Plasma.prototype.update = function (dt) {
    // update the time uniform in the new shader chunk
    this.time += dt;
    for (var i = 0; i < this.materials.length; i++) {
        var material = this.materials[i].resource;
        material.setParameter('iGlobalTime', this.time);
        material.update(); 
    }
};
