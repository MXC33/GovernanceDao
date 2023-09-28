var CompanyTilesFactory = pc.createScript('companyTilesFactory');

CompanyTilesFactory.attributes.add('companyTileProtos', {
    type: 'entity',
    default: null, 
    title: 'Company Tile Prototypes'
});

// initialize code called once per entity
CompanyTilesFactory.prototype.initialize = function() {

};

// update code called every frame
CompanyTilesFactory.prototype.update = function(dt) {

};

CompanyTilesFactory.prototype.getCompanyTile = function(name) {
    const companyTile = this.companyTileProtos.findByName(name);
    if(companyTile == null)
        return;
    companyTile.enabled = false;
    const instancedEntity = companyTile.findByName("SkyscraperCompanyColorInstanced");
    instancedEntity.script.geometryInstancing.initialized = false;
    return companyTile;
};
