var PixScript = pc.createScript('pixScript');

//====== 
//======   Uncomment these enums if you need to parse the script in the editor (see constants.js) ====
//====== 
/*
var PixType = {
	Empty: 0, 
	Outlier: 1, 
	Common: 2, 
	Uncommon: 3, 
	Rare: 4, 
	Legendary: 5, 
	MiddleSlot: 6, 
	CompanyTile: 7, 
	Invisible: 8
}; 

var TerritoryType = { 
	None: 0, 
	Pix: 1, 
	Cluster: 2, 
	Area: 3, 
	Sector: 4, 
	Zone: 5, 
	Domain: 6
};

var PixState = {
	InActive: 0,
	Active: 1,
    PendingActive: 2,
	PendingInActive: 3,
	NoContract: 4,
	NotStaked: 5
};
*/
//====== 


PixScript.attributes.add('pixTier', {
    type: 'number',
    enum: Object.entries(PixType).map(kvp => {var e = {}; e[kvp[0]] = kvp[1]; return e;}),
    default: 1
});

PixScript.attributes.add('pixTerritoryType', {
    type: 'number',
    enum: Object.entries(TerritoryType).map(kvp => {var e = {}; e[kvp[0]] = kvp[1]; return e;}),
    default: 1
});

PixScript.attributes.add('pixState', {
    type: 'number',
    enum: Object.entries(PixState).map(kvp => {var e = {}; e[kvp[0]] = kvp[1]; return e;}),
    default: 1
});

PixScript.attributes.add('wasteEntity', {
    type: 'entity',
    default: null
});

PixScript.attributes.add('energyEntity', {
    type: 'entity',
    default: null
});

PixScript.attributes.add('droneEntity', {
    type: 'entity',
    default: null
});

PixScript.attributes.add('roverEntity', {
    type: 'entity',
    default: null
});

PixScript.attributes.add('facilityEntity', {
    type: 'entity',
    default: null
});

// initialize code called once per entity
PixScript.prototype.initialize = function() {
    this.graphicsEntitys = [];
    
    this.currentWaste = 0;
    this.currentEnergy = 0;
    this.facilityLevel = 0;
    this.droneLevel = 0;
    this.roverLevel = 0;
    
    if(this.roverEntity == null){
        this.roverEntity = this.entity.findByName("Rover");
    }
        
    this.seartchForArraysTags();
    this.deHighlight();
};

PixScript.prototype.seartchForArraysTags = function() {
    this.onHighlight = this.entity.findByTag("OnHighlight");
    this.onHighlightBuild = this.entity.findByTag("OnHighlightBuild");
    this.onHighlightAction = this.entity.findByTag("OnHighlightAction");
    this.onHighlightInit = this.entity.findByTag("OnHighlightInit");
    this.onHighlightContract = this.entity.findByTag("OnHighlightContract");
    this.billBoardEdges = this.entity.findByTag("BillBoardEdges");
    this.children = this.entity.findByTag("StarModel");
};

PixScript.prototype.highlight = function() {
    this.onHighlight.forEach(e => e.enabled = true);
    //console.log("OnHighlight");
};
PixScript.prototype.highlightBuild = function() {
    this.onHighlightBuild.forEach(e => e.enabled = true);
    //console.log("OnHighlightBuild");
};
PixScript.prototype.highlightAction = function() {
    this.onHighlightAction.forEach(e => e.enabled = true);
    //console.log("OnHighlightAction");
};
PixScript.prototype.highlightInitial = function() {
    this.onHighlightInit.forEach(e => e.enabled = true);
    //console.log('Hello, is it me you are lookig for?'); 
    //console.log("OnHighlightInit");
};
PixScript.prototype.highlightContract = function () {
    this.onHighlightContract.forEach(e => e.enabled = true);
    //this.onHighlightContract.forEach(e => e.enabled = false);
    //console.log("OnHighlightContract");
};

PixScript.prototype.deHighlight = function () {
    this.onHighlight.forEach(e => e.enabled = false);
    this.onHighlightBuild.forEach(e => e.enabled = false);
    this.onHighlightAction.forEach(e => e.enabled = false);
    this.onHighlightInit.forEach(e => e.enabled = false);
    this.onHighlightContract.forEach(e => e.enabled = false);
};

PixScript.prototype.updatePixStateIndicator = function () {
    //Hack: Show/Hide visibility
    //console.log("pixScript.pixState", this.pixCord, GetStringFromState(this.pixState));
    this.enabledEntityOnPixState("ActiveIndicator", PixState.Active);
    this.enabledEntityOnPixState("InActiveIndicator", PixState.InActive);
    this.enabledEntityOnPixState("PendingInActiveIndicator", PixState.PendingInActive);
    this.enabledEntityOnPixState("PendingActiveIndicator", PixState.PendingActive);
    this.enabledEntityOnPixState("NoContractIndicator", PixState.NoContract);
    this.enabledEntityOnPixState("NotStakedIndicator", PixState.NotStaked);
};

PixScript.prototype.enabledEntityOnPixState = function (entityName, pixState) {
    const entity = this.entity.findByName(entityName);
    if (entity) {
        const state = this.pixState == pixState
        entity.enabled = state;
    }
};

PixScript.prototype.getWaste = function() {
    return this.currentWaste;
};

PixScript.prototype.getEnergy = function() {
    return this.currentEnergy;
};

PixScript.prototype.pickWaste = function() {
    if(this.wasteEntity != null)
        this.wasteEntity.script.pixWasteScript.pickWaste();
};

PixScript.prototype.setWaste = function(waste) {
    this.currentWaste = Math.max(waste, 0);
    if(this.wasteEntity == null)
        return;
    this.wasteEntity.script.pixWasteScript.setWaste(this.currentWaste);
};

PixScript.prototype.setEnergy = function(energy) {
    this.currentEnergy = energy;
    console.log("setEnergy", this.currentEnergy);
    /*if(this.energyEntity == null)
        return;
    for(var i = 0; i < 5; i++) {
        this.energyEntity.children[i].enabled = this.currentEnergy >= i + 1;      
    }*/  
};

PixScript.prototype.setProgress = function(progress, type) {
    if (!Number.isInteger(type)){ 
        //console.log('we dont know type');
        //Set progess on drone.
        type = 0;
    }
    if(this.hasDrone() && type == 0)
        this.droneEntity.script.assetProgress.setProgress(progress);
    if(this.hasRover() && type == 1)
        this.roverEntity.script.assetProgress.setProgress(progress);
    if(this.hasFacility() && type == 2)
        this.facilityEntity.script.assetProgress.setProgress(progress);
};

PixScript.prototype.getProgress = function() {
    if(this.hasDrone())
        return this.droneEntity.script.assetProgress.getProgress();
    if(this.hasRover())
        return this.roverEntity.script.assetProgress.getProgress();
    if(this.hasFacility())
        return this.facilityEntity.script.assetProgress.getProgress();
    return 0.0;
};

PixScript.prototype.hover = function() {
    const particles = this.facilityEntity != null ? this.facilityEntity.script.enabledEntitysWithTag : false;
    if(particles && particles.enabled){
        particles.highLight();
    }
};

PixScript.prototype.endHover = function() {
    const particles = this.facilityEntity != null ? this.facilityEntity.script.enabledEntitysWithTag : false;
    if(particles && particles.enabled){
        particles.deHighLight();
    }
};

PixScript.prototype.hasDrone = function() {
    return this.droneEntity != null && this.droneEntity.enabled && this.droneLevel > 0;
};

PixScript.prototype.hasRover = function() {
    return this.roverEntity != null && this.roverEntity.enabled && this.roverLevel > 0;
};

PixScript.prototype.hasFacility = function() {
    return this.facilityEntity != null && this.facilityEntity.enabled && this.facilityLevel > 0;
};

PixScript.prototype.setFacility = function(level) {
    //cheak to see if the pix type should have a facility
    if (this.pixTier < 1 || this.pixTier > 5){
        console.log("can not place facility on pix");
        return;
    } 
    //cheak to see if the pix has a facility
    if(this.facilityEntity == null){
        console.log("no Facility entity");
        return;
    } 

    this.facilityLevel = level;
    this.facilityEntity.enabled = level > 0;
    this.setWaste(0);

    if(level == 0 && this.levelIndicator != null){
        this.levelIndicator.enabled = false;
    }else{
        this.setFacilityLevel(level);
        this.facilityEntity.script.setEntitysMaterial.setMaterialIndex(level - 1);
    }

    this.facilityEntity.script.enabledEntitysWithTag.enabledEntityByIndex(level - 1);
    let bloom = this.facilityEntity.findByTag("FacilityBloom");
    const index = Math.floor(Math.random() * 6);

    for(var i = 0; i < bloom.length; i++){
        if(bloom[i] && bloom[i].script){
            bloom[i].script.setEntitysMaterial.setMaterialIndex(level - 1);    
        }
    }
    //}
};

//This is an ugly hack, ran into initilazation problems with playcanvas when seperation this into it's own script file. And therefore put this here instead.
PixScript.prototype.setFacilityLevel = function(level) {
    console.log("setFacilityLevel", level);

    const childrenLength = this.children.length;
    for (let i = 0; i < childrenLength; i++) {
        this.children[i].enabled = false;
    }

    if (!this.billBoardEdges || !this.children) {
        console.log("billBoardEdges || this.children is null");
        return;
    }
    
    this.spaceBetween = 0.2;
    this.billBoardEdges[0].setLocalPosition(0.2 * -level, 0, 0);
    this.billBoardEdges[1].setLocalPosition(0.2 * level, 0, 0);

    if (level <= 1) {
        this.children[0].enabled = true;
        const t = 0.5;
        let lerpValue = Lerp(this.billBoardEdges[0].getLocalPosition().x, this.billBoardEdges[1].getLocalPosition().x, t);
        this.children[0].setLocalPosition(lerpValue, 0, 0);
        return;
    }

    const percent = (1 / level);
    for (let i = 0; i < level; i++) {
        this.children[i].enabled = true;
        const index = i + 1;
        const t = (percent * index) - (percent *  0.5);
        let lerpValue = Lerp(this.billBoardEdges[0].getLocalPosition().x, this.billBoardEdges[1].getLocalPosition().x, t);
        this.children[i].setLocalPosition(lerpValue, 0, 0);
    }
};

PixScript.prototype.setDrone = function(level) {
    if(this.droneEntity == null)
        return;
    this.droneLevel = level;
    this.droneEntity.enabled = level > 0;
    if(level > 0) {
        const droneModels = this.droneEntity.findByName("DroneModels");
        droneModels.children.forEach(c => c.enabled = false);
        droneModels.children[level - 1].enabled = true;
    }
    this.setWaste(0);
};
//@HERE - function(level, state) - Make it have an extra variable to decide what skin/material to use
PixScript.prototype.setRover = function(level, durability) {
    
    if(!this.roverEntity) {
        return;
    }

    this.roverLevel = level;
    this.roverEntity.enabled = level > 0;

    if(durability === 3) {
        const roverModels = this.roverEntity.findByName("RoverModels");
        roverModels.script.setDamagedRover.activate();
    } 
    else if(level > 0) {
        const roverModelsByTag = this.roverEntity.findByName("RoverModels").findByTag("Rover");
        const currentRoverModel = roverModelsByTag[level - 1];
        currentRoverModel.enabled = true;

        const roverMaterials = currentRoverModel.findByTag("RoverMaterial");
        roverMaterials.forEach(mat => mat.script.changeMaterial.setMaterialEmmisive(durability));
        const glowPlanes = currentRoverModel.findByTag("Glow");

        const pulseSpeed = [0, 5, 10, 0];
        glowPlanes.forEach(plane => {
            plane.script.changeWheelMaterial.setMaterial(durability);
            
            const isEmissivePulseEnabled = durability !== 0;
            plane.script.emissivePulse.enabled = isEmissivePulseEnabled;
            if(isEmissivePulseEnabled) {
                plane.script.emissivePulse.pulseSpeed = pulseSpeed[durability];
            }
        });
    }

    const statusBars = this.roverEntity.findByName("Status").findByTag("RoverDurabilityUI");
    statusBars.forEach(bar => bar.enabled = false);
    statusBars[durability].enabled = true;

    this.setWaste(0);
};


function getString(state) {
    switch(state){
        case GraphicsQuality.Low: 
        return "Low";
        case GraphicsQuality.Medium: 
        return "Medium";
        case GraphicsQuality.High: 
        return "High";
    }
};

PixScript.prototype.getFacilityLevel = function() {
    return this.facilityLevel;
};

PixScript.prototype.getDroneLevel = function() {
    return this.droneLevel;
};
PixScript.prototype.getRoverLevel = function() {
    return this.roverLevel;
};

//PixState functions
PixScript.prototype.isActive = function() {
    return this.pixState == PixState.Active; 
};

PixScript.prototype.isActive = function() {
    return this.pixState == PixState.Active; 
};

PixScript.prototype.isActivateableTile = function() {
    const isStakedTileSlot = (this.isEmpty() || this.isStakedPix());
    const isNonActiveStakedTileSlot = this.pixState != PixState.Active && isStakedTileSlot;

    return  isNonActiveStakedTileSlot;
};

PixScript.prototype.isInCurrentContractPix = function() {
    //Todo: Replace this function with a list of "current contract pixs"
    //      that is called like setActiveContract(listOfPixCords);
    //      then have this function simply return
    //      return listOfPixCords.contains(this.pixCord);
    
    const isFirstRing = Math.abs(this.pixCord.q) + Math.abs(this.pixCord.r) + Math.abs(this.pixCord.s) <= 2;
    const isStakedTileSlot = (this.isEmpty() || this.isStakedPix());
    const isSecondRingStakedTileSlot = !isFirstRing && isStakedTileSlot;
    
    return isSecondRingStakedTileSlot;
};

PixScript.prototype.isContractPix = function() {
    return this.isActivateableTile() || this.isInCurrentContractPix();
};



//PixType functions
PixScript.prototype.isInvisible = function() {
    return this.pixTier == PixType.Invisible; 
};

PixScript.prototype.isEmpty = function() {
    return this.pixTier == PixType.Empty; 
};

PixScript.prototype.isCompanyTile = function() {
    return this.pixTier == PixType.CompanyTile;
};

PixScript.prototype.isStakedPix = function() {
    return  this.pixTier == PixType.Legendary || 
            this.pixTier == PixType.Rare || 
            this.pixTier == PixType.Uncommon || 
            this.pixTier == PixType.Common || 
            this.pixTier == PixType.Outlier;
};

PixScript.prototype.isCenterTile = function() {
    return this.pixTier == PixType.MiddleSlot;
};

PixScript.prototype.getTerritoryType = function() {
    return this.pixTerritoryType; 
};
PixScript.prototype.getPixTier = function() {
    return this.pixTier; 
};

PixScript.prototype.canPlaceObject = function() {
    return  this.isStakedPix() && !this.hasDrone() && !this.hasRover() && !this.hasFacility();
};

PixScript.prototype.canPlaceDrone = function() {
    return  this.isStakedPix() && !this.hasDrone() && !this.hasFacility();
};

PixScript.prototype.canPlaceRover = function() {
    //const bool = this.isStakedPix() && !this.hasRover() && !this.hasFacility();
    //console.log("has rover = " + this.hasRover() + " has facility = " + this.hasFacility());
    return  this.isStakedPix() && !this.hasRover() && !this.hasFacility();
};

PixScript.prototype.canSpawnWaste = function() {
    return  this.isStakedPix() && !this.hasDrone() && !this.hasRover() && !this.hasFacility();
};

PixScript.prototype.canBeLooted = function() {
    return  this.isStakedPix() && this.currentWaste > 0 || this.getProgress() >= 1.0; 
};

function GetStringFromState(state) {
    switch(state){
        case PixState.Active: 
            return 'Active'
        case PixState.InActive: 
            return 'InActive'
        case PixState.NoContract: 
            return 'NoContract'
        case PixState.NotStaked: 
            return 'NotStaked'
        case PixState.PendingActive: 
            return 'PendingActive'
        case PixState.PendingInActive: 
            return 'PendingInActive'
    }
};