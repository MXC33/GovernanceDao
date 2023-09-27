var PlaceablesAssets = pc.createScript('placeablesAssets');

PlaceablesAssets.attributes.add('terrainEntity',{
    type: 'entity',
    default: null
});

PlaceablesAssets.attributes.add('droneEntity',{
    type: 'entity',
    default: null
});

PlaceablesAssets.attributes.add('roverEntity',{
    type: 'entity',
    default: null
});

PlaceablesAssets.attributes.add('energyEntity',{
    type: 'entity',
    default: null
});

PlaceablesAssets.attributes.add('wasteEntity',{
    type: 'entity',
    default: null
});


// initialize code called once per entity
PlaceablesAssets.prototype.initialize = function() {

};

// update code called every frame
PlaceablesAssets.prototype.update = function(dt) {

};