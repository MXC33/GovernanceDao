var AnimatedTexture = pc.createScript('animatedTexture');

AnimatedTexture.attributes.add('materialAsset', {
    type: 'asset',
    assetType: 'material'
});

AnimatedTexture.attributes.add('numFrames', {
    type: 'number',
    default: 1,
    description: 'Number of frames to play before looping'
});

AnimatedTexture.attributes.add('startFrame', {
    type: 'number',
    default: 0,
    description: 'Frame to start animation from'
});

AnimatedTexture.attributes.add('width', {
    type: 'number',
    default: 1,
    description: 'Number of frames wide'
});

AnimatedTexture.attributes.add('height', {
    type: 'number',
    default: 1,
    description: 'Number of frames high'
});

AnimatedTexture.attributes.add('frameRate', {
    type: 'number',
    default: 1,
    description: 'Playback frames per second'
});

// initialize code called once per entity
AnimatedTexture.prototype.initialize = function() {
    if (this.materialAsset) {
        this.material = this.materialAsset.resource;
    }

    this.timer = 1/this.frameRate;
    this.frame = this.startFrame;

    this.uniform0 = [0, 0, 0];
    this.uniform1 = [0, 0, 0];
    
    this.updateMaterial(this.frame);
};

// update code called every frame
AnimatedTexture.prototype.update = function(dt) {
    // calculate when to animate to next frame
    this.timer -= dt;            
    if (this.timer < 0) {
        // move to next frame
        this.frame++;
        if (this.frame >= (this.numFrames + this.startFrame)) {
            this.frame = this.startFrame;
        }

        this.updateMaterial(this.frame);

        // reset the timer
        this.timer = 1/this.frameRate;
    }
};

AnimatedTexture.prototype.updateMaterial = function (frame) {
    // calculate how much to change UV to go to next frame
    var tileWidth = 1 / this.width;
    var tileHeight = 1 / this.height;

    // Convert frame number into UV co-ordinate
    var tileOffsetX = (frame % this.width) * tileWidth;
    var tileOffsetY = (Math.floor(frame / this.width)) * tileHeight;

    var meshes = this.entity.render.meshInstances;

    // Set the two uniform array datas needed for the material 
    // See https://github.com/playcanvas/engine/blob/master/src/scene/materials/standard-material.js#L824
    // And override the material properties for this mesh
    // This allows us to use different settings for different Entities, but share the same material    
    this.uniform0[0] = tileWidth;
    this.uniform0[1] = 0;
    this.uniform0[2] = tileOffsetX;
    
    this.uniform1[0] = 0; 
    this.uniform1[1] = tileHeight;
    this.uniform1[2] = tileOffsetY;
    
    meshes[0].setParameter("texture_diffuseMapTransform0", this.uniform0);
    meshes[0].setParameter("texture_diffuseMapTransform1", this.uniform1);
    meshes[0].setParameter("texture_emissiveMapTransform0", this.uniform0);
    meshes[0].setParameter("texture_emissiveMapTransform1", this.uniform1);
    meshes[0].setParameter("texture_opacityMapTransform0", this.uniform0);
    meshes[0].setParameter("texture_opacityMapTransform1", this.uniform1);
};
