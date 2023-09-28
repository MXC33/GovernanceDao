var DroneConeMaterialSetup = pc.createScript('droneConeMaterialSetup');

DroneConeMaterialSetup.attributes.add('materials', {type: 'asset', array: true});
DroneConeMaterialSetup.attributes.add('shaderStart', {type: 'asset'});
DroneConeMaterialSetup.attributes.add('shaderEnd', {type: 'asset'});

DroneConeMaterialSetup.attributes.add('liveUpdate', {type: 'boolean', default: false, title: 'Live Update'});

DroneConeMaterialSetup.attributes.add('timeScale', {
    type: 'number',
    title: 'Time Scale',
    min: 0.01,
    max: 10.0,

    default: 1.0,
});

DroneConeMaterialSetup.attributes.add('xzScale', {
    type: 'number',
    title: 'xzScale',
    min: 0.01,
    max: 100.0,

    default: 1.0,
});

DroneConeMaterialSetup.attributes.add('yScale', {
    type: 'number',
    title: 'yScale',
    min: 0.01,
    max: 100.0,

    default: 1.0,
});

DroneConeMaterialSetup.attributes.add('heightCut', {
    type: 'number',
    title: 'Height Cutoff',
    min: -1.0,
    max: 1.0,

    default: 0.5,
});

DroneConeMaterialSetup.attributes.add('normExponent', {
    type: 'number',
    title: 'normal exponent',
    min: 0.01,
    max: 10.0,

    default: 1.0,
});

DroneConeMaterialSetup.prototype.initialize = function () {
    // get the shader asset
    var fsStart = this.shaderStart.resource;
    var fsEnd = this.shaderEnd.resource;

    // update all the materials with the chunk
    for (var i = 0; i < this.materials.length; i++) {
        var material = this.materials[i].resource;
        material.chunks.APIVersion = pc.CHUNKAPI_1_57;
        material.chunks.startPS = fsStart;
        material.chunks.endPS = fsEnd;
        material.setParameter('uTime', 0.0);
        material.setParameter('uTimeScale', this.timeScale);
        material.setParameter('uXZScale', this.xzScale);
        material.setParameter('uYScale', this.yScale);
        material.setParameter('uNormExp', this.normExponent);
        material.setParameter('uHeightCutoff', this.heightCut);
        // Force the shader generator to generate UV processing code

        material.update();
    }

    this.time = 0;
};

DroneConeMaterialSetup.prototype.update = function (dt) {
    // update the time uniform in the new shader chunk
    if(this.liveUpdate) {

        for (var i = 0; i < this.materials.length; i++) {
            var material = this.materials[i].resource;
            material.setParameter('uTime', this.time);
            material.setParameter('uTimeScale', this.timeScale);
            material.setParameter('uXZScale', this.xzScale);
            material.setParameter('uYScale', this.yScale);
            material.setParameter('uNormExp', this.normExponent);
            material.setParameter('uHeightCutoff', this.heightCut);
        }
        this.time += dt;
    }
};
