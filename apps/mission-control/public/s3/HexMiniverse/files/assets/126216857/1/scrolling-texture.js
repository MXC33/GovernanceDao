var ScrollingTexture = pc.createScript('scrollingTexture');

ScrollingTexture.attributes.add('materialAsset', {
    type: 'asset',
    array: true
});

ScrollingTexture.attributes.add('speed', {
    type: 'vec2',
});

ScrollingTexture.tmpVec2 = new pc.Vec2();
ScrollingTexture.tmpOffset = new pc.Vec2();

// initialize code called once per entity
ScrollingTexture.prototype.initialize = function() {
    // get the material that we will animate
    if (this.materialAsset != null) {
        this.material = this.materialAsset;
    } 
};

// update code called every frame
ScrollingTexture.prototype.update = function(dt) {
    var velocity = ScrollingTexture.tmpVec2;
    var offset = ScrollingTexture.tmpOffset;
    
    // Calculate how much to offset the texture
    // Speed * dt
    velocity.set(this.speed.x, this.speed.y);
    velocity.scale(dt);

    // Update the diffuse and normal map offset values
    offset.copy(this.materialAsset[0].resource.diffuseMapOffset);
    offset.sub(velocity);
    //https://github.com/playcanvas/engine/blob/main/src/scene/materials/standard-material.js
    
    for(var i = 0; i < this.material.length; i++){
        const material = this.materialAsset[i].resource;
        
        if(material.specularMapOffset){
        material.specularMapOffset = offset;
        } 
        if(material.metalnessMapOffset){
            material.metalnessMapOffset = offset;
        }   
        if(material.glossMapOffset){
            material.glossMapOffset = offset;
        }   
        if(material.refractionMapOffset){
            material.refractionMapOffset = offset;
        }    
        if(material.emissiveMapOffset){
            material.emissiveMapOffset = offset;
        }
        if(material.opacityMapOffset){
            material.opacityMapOffset = offset;
        }
        if(material.heightMapOffset){
            material.heightMapOffset = offset;
        }
        if(material.diffuseMapOffset){
            material.diffuseMapOffset = offset;
        }
        if(material.normalMapOffset){
            material.normalMapOffset = offset;
        }
        
        material.update();
    }


};
