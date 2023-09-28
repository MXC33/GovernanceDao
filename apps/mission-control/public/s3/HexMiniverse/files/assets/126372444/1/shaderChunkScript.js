var ShaderChunkScript = pc.createScript('shaderChunkScript');
ShaderChunkScript.attributes.add('updateOnce', {type: 'boolean'});
ShaderChunkScript.attributes.add('aColor', {type: 'rgb'});
ShaderChunkScript.attributes.add('bColor', {type: 'rgb'});
ShaderChunkScript.attributes.add('iAColor', {type: 'rgba'});
ShaderChunkScript.attributes.add('iBColor', {type: 'rgba'});
ShaderChunkScript.attributes.add('opacity', {type: 'number', min: 0, max: 1});
ShaderChunkScript.attributes.add('materials', {type: 'asset', array: true});
ShaderChunkScript.attributes.add('emissiveShader', {type: 'asset'});
ShaderChunkScript.attributes.add('opacityShader', {type: 'asset'});
//ShaderChunkScript.attributes.add('vs', {    type: 'asset',    assetType: 'shader',    title: 'Vertex Shader'});

// initialize code called once per entity
ShaderChunkScript.prototype.initialize = function() {
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
        this.updateMaterial(material);
    }

    this.entity.enabled = !this.updateOnce;
};

// update code called every frame
ShaderChunkScript.prototype.update = function(dt) {
    // update the time uniform in the new shader chunk
    this.time += dt * 10;
    for (var i = 0; i < this.materials.length; i++) {
        var material = this.materials[i].resource;
        this.updateMaterial(material);
    }
};

ShaderChunkScript.prototype.updateMaterial = function(material) {
    material.setParameter('uTime', this.time);
    material.setParameter('aColor', [this.aColor.r, this.aColor.g, this.aColor.b]);
    material.setParameter('bColor', [this.bColor.r, this.bColor.g, this.bColor.b]);
    material.setParameter('opacity', this.opacity);
    material.setParameter('iTime', this.iTime);
    material.setParameter('iAColor', [this.iAColor.r, this.iAColor.g, this.iAColor.b, this.iAColor.a]);
    material.setParameter('iBColor', [this.iBColor.r, this.iBColor.g, this.iBColor.b, this.iBColor.a]);
    material.update();
};