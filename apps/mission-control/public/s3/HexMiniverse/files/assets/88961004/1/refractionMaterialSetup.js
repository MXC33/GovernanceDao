pc.script.attribute('materials', 'asset', [], {
    type: 'material'
});
pc.script.attribute('shader', 'asset', [], {
    type: 'shader',
    max: 1
});

var RefractionMaterialSetup = pc.createScript('refractionMaterialSetup');

RefractionMaterialSetup.attributes.add('materials', {type: 'asset', array: true});
RefractionMaterialSetup.attributes.add('shader', {type: 'asset'});

RefractionMaterialSetup.attributes.add('thickness', {
    type: 'number',
    title: 'Thickness',
    default: 1.5,
    min: 0.1,
    max: 10.0
});

RefractionMaterialSetup.attributes.add('attenuationDistance', {
    type: 'number',
    title: 'Attenuation Distance',
    default: 0.0,
    min: 0.0,
    max: 10.0
});

RefractionMaterialSetup.attributes.add('cameraEntity', {
    type: 'entity',
    default: null, 
    title: 'Camera Entity'
});

RefractionMaterialSetup.prototype.initialize = function () {
    const depthLayer = this.app.scene.layers.getLayerById(pc.LAYERID_DEPTH);
    this.app.scene.layers.remove(depthLayer);
    this.app.scene.layers.insertOpaque(depthLayer, 4);

    this.cameraEntity.camera.requestSceneColorMap(true);
    // get the shader asset
    var fs = this.shader.resource;

    // update all the materials with the chunk
    for (var i = 0; i < this.materials.length; i++) {
        var material = this.materials[i].resource;
        material.chunks.APIVersion = pc.CHUNKAPI_1_56;
       // material.chunks.refractionCubePS = fs;
        material.chunks.refractionDynamicPS = fs;
        //material.setParameter('material_attenuation', 0.5);
        material.blendType = pc.BLEND_NORMAL;
        material.useDynamicRefraction = true;
        material.thickness = this.thickness; 
        material.attenuationDistance = this.attenuationDistance;
        //Commented out because of issues.
        //material.attenuation.set(Math.pow(1.0, 1 / 2.2), Math.pow(1.0, 1 / 2.2), Math.pow(1, 1 / 2.2));

        material.update();
    }

    this.time = 0;
};

RefractionMaterialSetup.prototype.update = function (dt) {
    // update the time uniform in the new shader chunk
    this.time += dt;
    for (var i = 0; i < this.materials.length; i++) {
        var material = this.materials[i].resource;
        material.thickness = this.thickness;
        material.attenuationDistance = this.attenuationDistance;
        material.update(); 
       // var material = this.materials[i].resource;
       // material.setParameter('material_attenuation', this.time);
    }
};
