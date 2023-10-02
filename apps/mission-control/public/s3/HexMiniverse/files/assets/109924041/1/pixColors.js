var PixColors = pc.createScript('pixColors');

PixColors.attributes.add('pixEntity', { type: 'entity', default: null});

PixColors.attributes.add('diffuseMaterial', { type: 'asset', assetType: 'material'});
PixColors.attributes.add('metalMaterial', { type: 'asset', assetType: 'material'});
PixColors.attributes.add('emissiveMaterial', { type: 'asset', assetType: 'material'});
PixColors.attributes.add('transparentMaterial', { type: 'asset', assetType: 'material'});
PixColors.attributes.add('terrainMaterial', { type: 'asset', assetType: 'material'});


// initialize code called once per entity
PixColors.prototype.initialize = function() {
    this.pixEntity.findByTag("PixColorsDiffuse").forEach(e => {
        e.render.meshInstances[0].material = this.diffuseMaterial.resource;
    });
    
    this.pixEntity.findByTag("PixColorsMetal").forEach(e => {
        e.render.meshInstances[0].material = this.metalMaterial.resource;
    });
    
    this.pixEntity.findByTag("PixColorsEmissive").forEach(e => {
        e.render.meshInstances[0].material = this.emissiveMaterial.resource;
    });
    
    this.pixEntity.findByTag("PixColorsTrans").forEach(e => {
        e.render.meshInstances[0].material = this.transparentMaterial.resource;
    });

    this.pixEntity.findByTag("PixColorsTerrain").forEach(e => {
        e.render.meshInstances[0].material = this.terrainMaterial.resource;
    });
};
