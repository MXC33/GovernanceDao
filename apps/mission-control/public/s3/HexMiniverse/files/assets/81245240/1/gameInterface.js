var GameInterface = pc.createScript('gameInterface');

GameInterface.attributes.add('gameLogicsEntity', {
    type: 'entity',
    default: null,
    title: 'GameLogics Entity'
});

GameInterface.attributes.add('soundManagerEntity', {
    type: 'entity',
    default: null,
    title: 'Sound Manager Entity'
});

// initialize code called once per entity
GameInterface.prototype.initialize = function () {
    this.gameLogics = this.gameLogicsEntity.script.gameLogics;
    var cameraType = [[0.5, 0.5], [0.6, 0.5], [0.5, 0.3]];

    if (pc.platform.mobile) {
        this.setCameraScreenSpaceOrigo(cameraType[2]);
    } else {
        this.setCameraScreenSpaceOrigo(cameraType[0]);
    }
};

//Returns void, takes integer
//example: setRings(2);
GameInterface.prototype.setRings = function (ringNumber) {
    this.gameLogics.setRings(ringNumber);
};

//Returns void, takes integer, integer, integer, integer, integer, integer
//example: setPix(1, 0, -1, 3, 2, 1);
GameInterface.prototype.setPix = function (x, y, z, tierTypeNumber, territoryTypeNumber, pixStateNumber = 1, graphicsQuality) {
    this.gameLogics.setPix(x, y, z, this.getPixTierFromNumber(tierTypeNumber), this.getPixTerritoryTypeFromNumber(territoryTypeNumber), this.getPixStateFromNumber(pixStateNumber), graphicsQuality);
};

//Returns void, takes integer, integer, integer
//example: removePix(1, 0, -1);
GameInterface.prototype.removePix = function (x, y, z) {
    this.gameLogics.removePix(x, y, z);
};

//Returns void, takes integer, integer, integer, integer
//example: setDrone(1, 0, -1, 1);
GameInterface.prototype.setDrone = function (x, y, z, level) {
    this.gameLogics.setDrone(x, y, z, level);
};

//Returns void, takes integer, integer, integer, integer
//example: setRover(1, 0, -1, 1);
/*GameInterface.prototype.setRover = function (x, y, z, level) {
    this.gameLogics.setRover(x, y, z, level);
};*/

GameInterface.prototype.setRover = function (x, y, z, level, durability) {
    this.gameLogics.setRover(x, y, z, level, durability);
};

//Returns void, takes integer, integer, integer, integer
//example: setFacility(1, 0, -1, 1);
GameInterface.prototype.setFacility = function (x, y, z, level) {
    this.gameLogics.setFacility(x, y, z, level);
};

//Returns void, takes integer, integer, integer, float
//example: setProgress(1, 0, -1, 0.5, 0); 
GameInterface.prototype.setProgress = function (x, y, z, progress, type) {
    this.gameLogics.setProgress(x, y, z, progress, type);
};

//Returns void, takes integer, integer, integer
//example: removeAsset(1, 0, -1);
GameInterface.prototype.removeAsset = function (x, y, z) {
    this.gameLogics.setFacility(x, y, z, 0);
    this.gameLogics.setDrone(x, y, z, 0);
    this.gameLogics.setRover(x, y, z, 0, 0);
};

//Returns void, takes integer, integer, integer
//example: hoverPix(1, 0, -1);
GameInterface.prototype.hoverPix = function (x, y, z) {
    this.gameLogics.hoverPix(x, y, z);
};

GameInterface.prototype.getCurrentToolState = function () {
    return this.gameLogics.currentToolState;
};

GameInterface.prototype.getPixScript = function (x, y, z) {
    return this.gameLogics.getPix(x, y, z).script.pixScript;
};

//Returns void, takes integer, integer, integer
//example: selectPix(1, 0, -1);
GameInterface.prototype.selectPix = function (x, y, z) {
    this.gameLogics.selectPix(x, y, z);
    this.gameLogics.updatePixAtCoords(this.highLightedCoords);
};

//Returns void, takes void
//Example: resetHover();
GameInterface.prototype.resetHover = function (x, y, z) {
    this.gameLogics.resetHover(x, y, z);
};

//Returns void, takes void
//Example: resetSelect();
GameInterface.prototype.resetSelect = function () {
    this.gameLogics.resetSelect();
};

//Returns void, takes integer, integer, integer, integer
//example: setWasteOnPix(1, 0, -1, 3);
GameInterface.prototype.setWasteOnPix = function (x, y, z, wasteOnPix) {
    this.gameLogics.setWasteOnPix(x, y, z, wasteOnPix);
};

//Returns void, takes integer, integer, integer
//example: pickWaste(1, 0, -1);
GameInterface.prototype.pickWaste = function (x, y, z) {
    this.gameLogics.pickWaste(x, y, z);
};

//Returns void, takes integer, integer, integer
//example: pickAndDecrementWaste(1, 0, -1);
GameInterface.prototype.pickAndDecrementWaste = function (x, y, z) {
    this.gameLogics.pickAndDecrementWaste(x, y, z);
};

//Returns void, takes integer, integer, integer, integer
//example: setEnergyOnPix(1, 0, -1, 3);
GameInterface.prototype.setEnergyOnPix = function (x, y, z, energyOnPix) {
    this.gameLogics.setEnergyOnPix(x, y, z, energyOnPix);
};

//Returns void, takes string and integer
//example: activateBuildMode("Legendary", 1);
GameInterface.prototype.activateBuildMode = function (pixTierString, pixTerritoryType) {
    this.gameLogics.highLightedCoords = [];
    this.gameLogics.activateBuildModePix(this.getPixTierFromString(pixTierString), this.getPixTerritoryTypeFromNumber(pixTerritoryType));
};

//Returns void, takes integer
//example: activateDronePlacingMode(1);
GameInterface.prototype.activateDronePlacingMode = function (droneLevelNumber) {
    this.gameLogics.highLightedCoords = [];
    this.gameLogics.activateBuildModeDrone(droneLevelNumber);
};

//Returns void, takes string and integer
//example: activateFacilityPlacingMode("Legendary", 1);
GameInterface.prototype.activateFacilityPlacingMode = function (facilityTierString, facilityLevelNumber) {
    this.gameLogics.highLightedCoords = [];
    this.gameLogics.activateBuildModeFacility(this.getPixTierFromString(facilityTierString), facilityLevelNumber);
};

//Returns void
GameInterface.prototype.activateDestroyMode = function () {
    this.gameLogics.highLightedCoords = [];
    this.gameLogics.activateBuildModeDestroy();
};

//Returns void
GameInterface.prototype.activateInspectMode = function () {
    this.gameLogics.highLightedCoords = [];
    this.gameLogics.activateInitialMode();
};

//Returns void
GameInterface.prototype.activateOverviewMode = function () {
    this.gameLogics.highLightedCoords = [];
    this.gameLogics.activateOverviewMode();
};

//Returns void
GameInterface.prototype.activatePixelPushMode = function () {
    this.gameLogics.highLightedCoords = [];
    this.gameLogics.activatePixelPushMode();
};

//Returns void
GameInterface.prototype.activateTaskmanagerMode = function () {
    this.gameLogics.highLightedCoords = [];
    this.gameLogics.activateTaskmanagerMode();
};

//Returns void
GameInterface.prototype.activateBuildModeAny = function () {
    this.gameLogics.highLightedCoords = [];
    this.gameLogics.activatePlanMode();
};


GameInterface.prototype.activatePlanModeDrone = function () {
    this.gameLogics.highLightedCoords = [];
    this.gameLogics.activatePlanModeDrone();
};

//Returns void, takes integer
//example: activateRoverPlacingMode(1);
GameInterface.prototype.activateRoverPlacingMode = function (roverLevelNumber) {
    this.gameLogics.highLightedCoords = [];
    this.gameLogics.activateBuildModeRover(roverLevelNumber);
};

GameInterface.prototype.activatePlanModeRover = function () {
    this.gameLogics.highLightedCoords = [];
    this.gameLogics.activatePlanModeRover();
};

GameInterface.prototype.activatePlanModeFacility = function () {
    this.gameLogics.highLightedCoords = [];
    this.gameLogics.activatePlanModeFacility();
};

GameInterface.prototype.activatePlanModePix = function () {
    this.gameLogics.highLightedCoords = [];
    this.gameLogics.activatePlanModePix();
};

GameInterface.prototype.activateContractMode = function (tiles) {
    this.gameLogics.activateContractMode();

    if (tiles != null) {
        this.gameLogics.highLightedCoords = tiles;
        console.log("tiles", this.gameLogics.highLightedCoords);
        this.gameLogics.deHighlightAllPix();
        this.gameLogics.updatePixAtCoords(this.gameLogics.highLightedCoords);
    }
};


//Returns string
GameInterface.prototype.getInspectedPixInfo = function () {
    return this.gameLogics.inspectedPixName;
};

//Returns void, takes boolean
GameInterface.prototype.setIsRenderActive = function (isRenderActive) {
    this.app.autoRender = isRenderActive;

    //Cursor in screen is used for hover effects logics
    //Disable it while not rendering
    this.gameLogics.isCursorInScreen = isRenderActive;
};

//Returns void, takes boolean
GameInterface.prototype.setIsCursorInCanvas = function (isCursorInCanvas) {
    this.gameLogics.isCursorInScreen = isCursorInCanvas;
};

GameInterface.prototype.placeDroneOnAll = function () {
    this.gameLogics.placeDroneOnAll();
};

GameInterface.prototype.placeRoverOnAll = function () {
    this.gameLogics.placeRoverOnAll();
};

GameInterface.prototype.placeFacilityOnAll = function () {
    this.gameLogics.placeFacilityOnAll();
};



// From orbitCamera.js
// Example usage:
//  const camera = gameInterface.getCamera();
//    camera.pivotPoint = new pc.Vec3(0.0, 0.0, 0.0);
//    camera.lookAtPoint = new pc.Vec3(0.0, 0.0, 0.0);
//    camera.yaw = -180 to 180;
//    camera.pitch = -90 to 90;
//    camera.distance = camera.minDistance to camera.maxDistance
//    camera.minDistance = 0.0 to infinity
//    camera.maxDistance = 0.0 to infinity
GameInterface.prototype.getCamera = function () {

    const hasCameraEntioy = this.gameLogics.cameraEntity;
    const hasScript = this.gameLogics.cameraEntity.script;

    if (hasCameraEntioy && hasScript) {
        return this.gameLogics.cameraEntity.script.orbitCamera;
    }

    return null;
};

// Offset camera in screenspace, [0.5, 0.5] is default
// Returns void, takes number (0-1), number (0-1)
GameInterface.prototype.setCameraScreenSpaceOrigo = function (x, y) {
    const camera = this.getCamera();
    if (camera) {
        camera.screenSpaceOrigo = new pc.Vec2(x, y);
    }
};

//Temp: Offset camera height
// Returns void, takes number (0-1), number (0-1)
GameInterface.prototype.setCameraHeightOffset = function (h) {
    const camera = this.getCamera();
    if (camera) {
        camera.pivotOffsetY = h;
    }

};

GameInterface.prototype.getSoundManager = function () {

    if (this.soundManagerEntity) {
        return this.soundManagerEntity.sound;
    } else {
        const soundManager = this.app.root.findByName("SoundManager").sound;
        if (soundManager) {
            return soundManager;
        }
    }

    return null;
};

GameInterface.prototype.setGraphicState = function (graphicsQuality) {
    //console.log("setGraphicState");
    this.gameLogics.setGraphicState(parseInt(graphicsQuality));
};

GameInterface.prototype.setReselutionQuality = function (graphicsQuality) {
    //console.log("setReselutionQuality");
    this.gameLogics.setReselutionQuality(parseInt(graphicsQuality));
};

GameInterface.prototype.setModelGraphicsQuality = function (graphicsQuality) {
    //console.log("setModelGraphicsQuality");
    this.gameLogics.setModelGraphicsQuality(parseInt(graphicsQuality));
};

GameInterface.prototype.getGraphicState = function () {
    return this.gameLogics.getGraphicState();
};


GameInterface.prototype.muteSound = function () {
    const soundManager = this.getSoundManager();
    if (soundManager) {
        soundManager.enabled = false;
    }
};

GameInterface.prototype.unMuteSound = function () {
    const soundManager = this.getSoundManager();
    if (soundManager) {
        soundManager.enabled = true;
    }
};

//Value between 0 - 1
GameInterface.prototype.setMasterVolume = function (volume) {
    //Default is 0.25
    const soundManager = this.getSoundManager();
    if (soundManager) {
        soundManager.volume = volume;
    }

};

//Value between 0 - 1
GameInterface.prototype.setMusicVolume = function (volume) {
    //Default is 0.5
    const soundManager = this.getSoundManager();
    if (soundManager) {
        soundManager.slot("Music").volume = volume;
    }
};

GameInterface.prototype.placePixOnAll = function () {
    this.gameLogics.placePixOnAll();
};

GameInterface.prototype.removeAll = function () {
    this.gameLogics.removeAll();
};



//Value between 0 - 1
GameInterface.prototype.setEffectsVolume = function (volume) {
    //Default is 1.0
    const soundManager = this.getSoundManager();
    if (soundManager) {
        soundManager.slot("HoverOn").volume = volume;
        soundManager.slot("HoverOff").volume = volume;
        soundManager.slot("Click1").volume = volume;
        soundManager.slot("Click2").volume = volume;
        soundManager.slot("Click3").volume = volume;
        soundManager.slot("Loot").volume = volume;
        soundManager.slot("Place").volume = volume;
        soundManager.slot("Back1").volume = volume;
        soundManager.slot("Back2").volume = volume;
    }

};

//Value between 0 - 1
GameInterface.prototype.setAmbientVolume = function (volume) {
    //Default is 0.5
    const soundManager = this.getSoundManager();
    if (soundManager) {
        soundManager.slot("ZoomIn").volume = volume;
        soundManager.slot("ZoomOut").volume = volume;
    }
};

GameInterface.prototype.playSound = function (soundName) {
    /*  "Music",
        "HoverOn",
        "HoverOff",
        "Click1",
        "Click2",
        "Click3",
        "Loot",
        "Place",
        "Back1",
        "Back2",
        "ZoomIn",
        "ZoomOut" */
    this.getSoundManager().play(soundName);
};


GameInterface.prototype.getPixTierFromString = function (name) {
    var pixTier;
    switch (name.toLowerCase()) {
        case "legendary":
            pixTier = PixType.Legendary;
            break;
        case "rare":
            pixTier = PixType.Rare;
            break;
        case "uncommon":
            pixTier = PixType.Uncommon;
            break;
        case "common":
            pixTier = PixType.Common;
            break;
        case "outlier":
        default:
            pixTier = PixType.Outlier;
            break;
    }
    return pixTier;
};


GameInterface.prototype.getPixTerritoryTypeFromNumber = function (number) {
    var territoryType;
    switch (number) {
        case 0:
            territoryType = TerritoryType.None;
            break;
        case 1:
            territoryType = TerritoryType.Pix;
            break;
        case 2:
            territoryType = TerritoryType.Cluster;
            break;
        case 3:
            territoryType = TerritoryType.Area;
            break;
        case 4:
            territoryType = TerritoryType.Sector;
            break;
        case 5:
            territoryType = TerritoryType.Zone;
            break;
        case 6:
            territoryType = TerritoryType.Domain;
            break;
        default:
            territoryType = TerritoryType.None;
    }
    return territoryType;
};


GameInterface.prototype.getPixTierFromNumber = function (number) {
    var pixTier;
    switch (number) {
        case 8:
            pixTier = PixType.Invisible;
            break;
        case 5:
            pixTier = PixType.Legendary;
            break;
        case 4:
            pixTier = PixType.Rare;
            break;
        case 3:
            pixTier = PixType.Uncommon;
            break;
        case 2:
            pixTier = PixType.Common;
            break;
        case 1:
            pixTier = PixType.Outlier;
            break;
        case 0:
        default:
            pixTier = PixType.Empty;
            break;
    }
    return pixTier;
};

GameInterface.prototype.getPixStateFromNumber = function (number) {
    var pixState;
    switch (number) {
        case 0:
            pixState = PixState.InActive;
            break;
        case 1:
            pixState = PixState.Active;
            break;
        case 2:
            pixState = PixState.PendingActive;
            break;
        case 3:
            pixState = PixState.PendingInActive;
            break;
        case 4:
            pixState = PixState.NoContract;
            break;
        case 5:
            pixState = PixState.NotStaked;
            break;
        default:
            pixState = PixState.Active;
            break;
    }
    return pixState;
};

GameInterface.prototype.dontResetCamera = function () {
    this.gameLogics.dontResetCamera();
};
