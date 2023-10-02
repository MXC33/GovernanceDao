var FacilityTierShaderChunk = pc.createScript('facilityTierShaderChunk');
FacilityTierShaderChunk.attributes.add('updateOnce', {type: 'boolean'});
FacilityTierShaderChunk.attributes.add('aColor', {type: 'rgb'});
FacilityTierShaderChunk.attributes.add('bColor', {type: 'rgb'});
FacilityTierShaderChunk.attributes.add('iAColor', {type: 'rgba'});
FacilityTierShaderChunk.attributes.add('iBColor', {type: 'rgba'});
FacilityTierShaderChunk.attributes.add('opacity', {type: 'number', min: 0, max: 1, array: true});
FacilityTierShaderChunk.attributes.add('materials', {type: 'asset', array: true});
FacilityTierShaderChunk.attributes.add('emissiveShader', {type: 'asset'});
FacilityTierShaderChunk.attributes.add('opacityShader', {type: 'asset'});

// initialize code called once per entity
FacilityTierShaderChunk.prototype.initialize = function() {
    this.time = 0;
    // get the shader asset
    var fsE = this.emissiveShader.resource;
    var fsO = this.opacityShader.resource;

    // update all the materials with the chunk
    for (var i = 0; i < this.materials.length; i++) {
        var material = this.materials[i].resource;
        material.chunks.APIVersion = pc.CHUNKAPI_1_55;
        material.chunks.emissivePS = fsE;
        material.chunks.opacityPS = fsO;
        // Force the shader generator to generate UV processing code
        material.diffuseMap = new pc.Texture(this.app.graphicsDevice, {
            width: 1,
            height: 1,
            format: pc.PIXELFORMAT_R8_G8_B8
        });

        this.updateMaterial(material, i);
    }

    //this.entity.enabled = !this.updateOnce;
};

// update code called every frame
FacilityTierShaderChunk.prototype.update = function(dt) {
    // update the time uniform in the new shader chunk
    if(this.updateOnce){
        return;
    }
    this.time += dt * 10;
    for (var i = 0; i < this.materials.length; i++) {
        var material = this.materials[i].resource;
        this.updateMaterial(material, i);
    }
};

FacilityTierShaderChunk.prototype.updateMaterial = function(material, i) {
    material.setParameter('uTime', this.time);
    material.setParameter('aColor', [this.aColor.r, this.aColor.g, this.aColor.b]);
    material.setParameter('bColor', [this.bColor.r, this.bColor.g, this.bColor.b]);
    material.setParameter('opacity', this.opacity[i]);
    material.setParameter('iTime', this.iTime);
    material.setParameter('iAColor', [this.iAColor.r, this.iAColor.g, this.iAColor.b, this.iAColor.a]);
    material.setParameter('iBColor', [this.iBColor.r, this.iBColor.g, this.iBColor.b, this.iBColor.a]);
    material.update();
};