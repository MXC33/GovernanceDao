var PixGrid = pc.createScript('pixGrid');

PixGrid.attributes.add('nrOfRings', {
    type: 'number',
    default: 15, 
});

PixGrid.attributes.add('pixSpacing', {
    type: 'number',
    title: 'Pix Spacing',
    description: 'The space between the PIX centres.',
    default: 1.1,
    min: 0.1,
    max: 2
});

PixGrid.attributes.add('companyTileAnchorsStage1', {
    type: 'entity',
    default: null, 
    title: 'Company Tile Anchors First Area'
});

PixGrid.attributes.add('companyTileAnchorsStage2', {
    type: 'entity',
    default: null, 
    title: 'Company Tile Anchors Second Area'
});

PixGrid.attributes.add('gameLogicsEntity', {type: 'entity', default: null, title: 'GameLogics Entity'});

PixGrid.attributes.add('terrainInstancingEntity', {type: 'entity', default: null, title: 'Terrain Instancing Entity'});

PixGrid.prototype.getPixCordFromPosition = function(pos) {
    var layout = this.layout;
    var pixCord = hex_round(pixel_to_hex(layout, new Point(pos.x, pos.z)));
    return pixCord;
};

PixGrid.prototype.getPositionFromPixCord = function(pixCord) {
    var layout = this.layout;
    var hexPoint = hex_to_pixel(layout, pixCord);

    return new pc.Vec3(hexPoint.x, 0.0, hexPoint.y);
};

PixGrid.prototype.hasPix = function(pixCord) {
    return this.pixTable.has(hex_to_string(pixCord));
};

PixGrid.prototype.getPix = function(pixCord) {
    return this.pixTable.get(hex_to_string(pixCord));
};

PixGrid.prototype.setPix = function(pixCord, pix) {
    var key = hex_to_string(pixCord);

    //Destroy old pix
    if(this.pixTable.has(key) && pix != this.pixTable.get(key)) {
        var oldPix = this.pixTable.get(key);
        this.pixTable.delete(key);
        oldPix.enabled = false;
        //Temp fix: Mesh instances doesnt get properly removed on disable/destroyed
        //          so move them far away from the camera 
        oldPix.setPosition(0, 1000,0);
        this.entity.removeChild(oldPix);
        //oldPix.destroy();
    }

    this.pixTable.set(key, pix);
    var pixPos = hex_to_pixel(this.layout, pixCord);
    pix.setPosition(pixPos.x, 0.0, pixPos.y);


    this.entity.addChild(pix);


    const pixScript = pix.script.pixScript;
    pixScript.pixCord = pixCord;

    //Set the text on the pixdisplay
    const pixDisplayTextEntities = pix.findByTag("IndexText");
    pixDisplayTextEntities.forEach(e => {
        const pixDisplayTextElement = e.element;
        const ringNr = Math.max(Math.max(Math.abs(pixCord.q), Math.abs(pixCord.r)), Math.abs(pixCord.s));
        var angle = Math.round((Math.atan2(pixPos.y, pixPos.x)*pc.math.RAD_TO_DEG) + 60.0);
        if(angle < 0)
            angle += 360;
        
        const ringChar = (ringNr + 9).toString(36).toUpperCase();
        const indexNr = (angle/(60.0/ringNr) + 1).toFixed(0);
        pixDisplayTextElement.text = ringChar+indexNr;

        //Hack to not show on company tiles...
        e.parent.enabled = !pixScript.isCompanyTile();
    });
    
    if(pixScript.isStakedPix()) {
        pixScript.droneEntity.enabled = false;
        pixScript.facilityEntity.enabled = false;
        pixScript.setEnergy(0);
        pixScript.setWaste(0);
    }

    pixScript.setGraphicState(this.gameLogics.getCurrentModelQuality());
};

PixGrid.prototype.createPix = function(pixTier, pixTerritory, pixState, graphicsQuality) {
    
    const pixClone = this.pixTypesFactory.getPixOfTier(pixTier);
    const pixScript = pixClone.script.pixScript;
    pixScript.pixTerritoryType = pixTerritory;
    pixScript.pixState = pixState;

    if(pixTier == PixType.Empty ||  pixTier == PixType.CompanyTile || pixTier == PixType.Invisible || pixTier == PixType.MiddleSlot){//
        return pixClone;
    }
    //clone all palceble assets that can spawn on pix
    const terrain = this.placeablesAssets.terrainEntity.clone();
    const drone = this.placeablesAssets.droneEntity.clone();
    const rover = this.placeablesAssets.roverEntity.clone();
    const facility = this.facilityTypesFactory.getFacility(pixTier, graphicsQuality);
    const energy = this.placeablesAssets.energyEntity.clone();
    const waste = this.placeablesAssets.wasteEntity.clone();
    const levelIndicator = this.facilityTypesFactory.facilityBillBoardModelProto.clone();
    //console.log("currentModelGraphicsQuality", this.gameLogics.currentModelGraphicsQuality);
    //facility.findByName("LevelIndicator").addChild(levelIndicator);

    //set all but terrain to false because terrain shuld always be true
    terrain.enabled = true;
    drone.enabled = false;
    rover.enabled = false;
    facility.enabled = false;
    //levelIndicator.enabled = true;
    energy.enabled = false;
    waste.enabled = true;

    //add all assets as children of the pix
    pixClone.addChild(terrain);
    pixClone.addChild(drone);
    pixClone.addChild(rover);
    pixClone.addChild(facility);
    pixClone.addChild(energy);
    pixClone.addChild(waste);

    //add all assets as references in the pixscript
    pixScript.droneEntity = drone;
    pixScript.roverEntity = rover;
    pixScript.facilityEntity = facility;
    pixScript.energyEntity = energy;
    pixScript.wasteEntity = waste;

    /*const facilityLow = facility.findByTag("GraphicsLow");
    const facilityMedium = facility.findByTag("GraphicsMedium");
    const facilityHigh = facility.findByTag("GraphicsHigh");

    console.log("facilityLow", facilityLow);
    console.log("facilityMedium", facilityMedium);
    console.log("facilityHigh", facilityHigh);*/

    /*if(facilityLow[0])
        pixScript.graphicsEntitys.push(facilityLow[0]);
    
    if(facilityMedium[0])
        pixScript.graphicsEntitys.push(facilityMedium[0]);

    if(facilityHigh[0])
        pixScript.graphicsEntitys.push(facilityHigh[0]);*/

    pixScript.levelIndicator = levelIndicator;

    //set all assets positions to 0,0,0
    const zeroCoord = pc.Vec3.ZERO;
    terrain.setLocalPosition(zeroCoord);
    drone.setLocalPosition(zeroCoord);
    rover.setLocalPosition(zeroCoord);
    facility.setLocalPosition(zeroCoord);
    energy.setLocalPosition(zeroCoord);
    waste.setLocalPosition(zeroCoord);
    levelIndicator.setLocalPosition(zeroCoord);

    terrain.script.terrainPlaneSpawner.instancingEntity = this.terrainInstanceManager.getInstanceEntity(pixTier);

    //Update PixState indcator (Active/InActive/etc)
    pixScript.seartchForArraysTags();
    pixScript.updatePixStateIndicator();

    return pixClone;
};

PixGrid.prototype.setPixGraphicsState = function(pixEntity, quality) {
    const pix = pixEntity.script.pixScript;

    //if the pix already has an entity then destroy it to save on ram
    if(pix.facilityEntity){
        //console.log(pixEntity);
        pix.facilityEntity.destroy();
    }

    //set the now null facility to the correct tier and grapics quality.
    const facility = this.facilityTypesFactory.getFacility(pix.pixTier, quality);
    facility.setPosition(0, 0, 0);
    pixEntity.addChild(facility)
    pix.facilityEntity = facility;

    if(!pix.hasFacility)
        facility.enabled = false;
    
    //console.log("pix.facilityLevel", pix.facilityLevel)

    //Set stars under facility to help identify level
    pix.children = pixEntity.findByTag("StarModel");
    pix.billBoardEdges = pixEntity.findByTag("BillBoardEdges");
    pix.setFacility(pix.facilityLevel)
    //pix.setFacilityLevel(pix.facilityLevel);
};

PixGrid.prototype.realignPixSpacing = function() {

};

PixGrid.prototype.realignPixSpacing = function() {
    this.layout = new Layout(this.layout_type, new Point(this.pixSpacing, this.pixSpacing), new Point(0, 0));
    const copy = new Map(this.pixTable);
    copy.forEach((value, key) => {
        console.log(key);
        this.setPix(string_to_hex(key), value);
    });
   
    this.oldPixSpacing = this.pixSpacing;
};

// initialize code called once per entity
PixGrid.prototype.initialize = function() {
    this.oldPixSpacing = this.pixSpacing;
    this.pixTypesFactory = this.entity.script.pixTypesFactory;
    this.companyTilesFactory = this.entity.script.companyTilesFactory;
    this.gameLogics = this.gameLogicsEntity.script.gameLogics;
    
    this.facilityTypesFactory = this.entity.script.facilityTypesFactory;
    this.placeablesAssets = this.entity.script.placeablesAssets;
    this.terrainInstanceManager = this.terrainInstancingEntity.script.terrainInstanceManager;
    
    this.layout_type = layout_pointy;

    this.layout = new Layout(this.layout_type, new Point(this.pixSpacing, this.pixSpacing), new Point(0, 0));

    this.pixTable = new Map();

    //Add center PIX
    this.setPix( new Hex(0, 0, 0), this.createPix(PixType.MiddleSlot, TerritoryType.None, PixState.Active));
};

PixGrid.prototype.spawnCompanyTiles = function(nrOfRings) {
    this.nrOfRings = nrOfRings;

    //Add company tiles
    var companyTileAnchors;
    //Check if more than 1 ring and set Company tiles Anchor point correctly. 
    if(nrOfRings <= 1)
        companyTileAnchors = this.companyTileAnchorsStage1;
    else
        companyTileAnchors = this.companyTileAnchorsStage2;

    companyTileAnchors.children.forEach(e => {
        const companyTile = this.companyTilesFactory.getCompanyTile(e.name);
        if(companyTile == null)
            return;
        companyTile.reparent(this.entity);
        companyTile.setLocalPosition(0, 0,0);
        //Add it to the grid
        this.setPix( this.getPixCordFromPosition(e.getPosition()), companyTile);
        companyTile.enabled = true;
       // this.entity.addChild(companyTile);
    });
};

// update code called every frame
PixGrid.prototype.update = function(dt) {
    if(this.oldPixSpacing != this.pixSpacing) {
        this.realignPixSpacing();
    }
};