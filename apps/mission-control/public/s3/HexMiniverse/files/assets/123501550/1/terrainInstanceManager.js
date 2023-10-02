var TerrainInstanceManager = pc.createScript('terrainInstanceManager');

TerrainInstanceManager.attributes.add('legendaryTerrainInstance', {
    type: 'entity',
    default: null, 
    title: 'Legendary Facility Prototype'
});

TerrainInstanceManager.attributes.add('rareTerrainInstance', {
    type: 'entity',
    default: null, 
    title: 'Rare Facility Prototype'
});

TerrainInstanceManager.attributes.add('unCommonTerrainInstance', {
    type: 'entity',
    default: null, 
    title: 'Uncommon Facility Prototype'
});

TerrainInstanceManager.attributes.add('commonTerrainInstance', {
    type: 'entity',
    default: null, 
    title: 'Common Facility Prototype'
});

TerrainInstanceManager.attributes.add('outlierTerrainInstance', {
    type: 'entity',
    default: null, 
    title: 'Outlier Facility Prototype'
});

// initialize code called once per entity
TerrainInstanceManager.prototype.initialize = function() {

};

// update code called every frame
TerrainInstanceManager.prototype.update = function(dt) {

};

TerrainInstanceManager.prototype.getInstanceEntity = function(tier) {
    switch(tier){
        case PixType.Outlier:
            return this.outlierTerrainInstance;
        case PixType.Common:
            return this.commonTerrainInstance;
        case PixType.Uncommon:
            return this.unCommonTerrainInstance;
        case PixType.Rare:
            return this.rareTerrainInstance;
        case PixType.Legendary:
            return this.legendaryTerrainInstance;
    }
};

// swap method called for script hot-reloading
// inherit your script state here
// TerrainInstanceManager.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/