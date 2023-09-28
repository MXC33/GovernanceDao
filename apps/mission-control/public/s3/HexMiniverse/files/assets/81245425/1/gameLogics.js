var GameLogics = pc.createScript('gameLogics');

// var pixTypesEnum = { Pix: 0, Cluster: 1, Territory: 3};

GameLogics.attributes.add('resolutionScalingEntity', {
    type: 'entity',
    default: null,
    title: 'resolutionScalingEntity'
});

GameLogics.attributes.add('resolutionScalingArray', {
    type: 'number',
    default: [0.4, 0.65, 1.0],
    title: 'resolutionScalingArray',
    array: true
});

GameLogics.attributes.add('pixGridEntity', {
    type: 'entity',
    default: null,
    title: 'Pix Grid Entity'
});

GameLogics.attributes.add('gameUtilitiesEntity', {
    type: 'entity',
    default: null,
    title: 'Game Utilities Entity'
});

GameLogics.attributes.add('inputManagerEntity', {
    type: 'entity',
    default: null,
    title: 'Input Manager Entity'
});

GameLogics.attributes.add('cameraEntity', {
    type: 'entity',
    default: null,
    title: 'Camera Entity'
});

GameLogics.attributes.add('pixClicker', {
    type: 'entity',
    default: null,
    title: 'PixClicker Entity'
});
//Camera map settings
GameLogics.attributes.add('cameraDistMap', {
    type: 'number',
    default: 15,
    title: "Map Dist",
    min: 1,
    max: 30
});

GameLogics.attributes.add('cameraYawMap', {
    type: 'number',
    default: 15,
    title: "Map Yaw",
    min: -180,
    max: 180
});

GameLogics.attributes.add('cameraPitchMap', {
    type: 'number',
    default: 15,
    title: "Map Pitch",
    min: 0,
    max: 90
});
//Camera overview settings
GameLogics.attributes.add('cameraDistOverview', {
    type: 'number',
    default: 15,
    title: "Overview Dist",
    min: 1,
    max: 30
});

GameLogics.attributes.add('cameraYawOverview', {
    type: 'number',
    default: 15,
    title: "Overview Yaw",
    min: -180,
    max: 180
});

GameLogics.attributes.add('cameraPitchOverview', {
    type: 'number',
    default: 15,
    title: "Overview Pitch",
    min: 0,
    max: 90
});
//Camera Pix settings
GameLogics.attributes.add('cameraDistPix', {
    type: 'number',
    default: 6,
    title: "Pix Dist",
    min: 1,
    max: 25
});

GameLogics.attributes.add('cameraYawPix', {
    type: 'number',
    default: 15,
    title: "Pix Yaw",
    min: -180,
    max: 180
});

GameLogics.attributes.add('cameraPitchPix', {
    type: 'number',
    default: 15,
    title: "Pix Pitch",
    min: 0,
    max: 90
});

//Camera company settings
GameLogics.attributes.add('cameraDistCompany', {
    type: 'number',
    default: 8,
    title: "Company Dist",
    min: 1,
    max: 25
});

GameLogics.attributes.add('cameraYawCompany', {
    type: 'number',
    default: 15,
    title: "Company Yaw",
    min: -180,
    max: 180
});

GameLogics.attributes.add('cameraPitchCompany', {
    type: 'number',
    default: 15,
    title: "Company Pitch",
    min: 0,
    max: 90
});

// initialize code called once per entity
GameLogics.prototype.initialize = function () {
    this.resetMapOrOverviewMode = 0;

    if (this.currentMasterGraphicsQuality)
        this.currentMasterGraphicsQuality = 2;

    this.selectedPixCord = new Hex(0, 0, 0);
    this.isCursorInScreen = true;
    this.inspectedPixName = "";

    this.buildPixTier = PixType.Empty;
    this.buildPixTerritoryType = TerritoryType.Pix;
    this.buildFacilityLevel = 0;
    this.buildFacilityTier = PixType.Empty;
    this.buildDroneLevel = 0;
    this.buildRoverLevel = 0;
    this.camera = this.cameraEntity.script.orbitCamera;

    this.camera._distance = this.cameraDistMap;
    this.camera._targetDistance = this.cameraDistOverview;

    this.camera._yaw = this.cameraYawMap;
    this.camera._targetYaw = this.cameraYawOverview;

    this.camera._pitch = -this.cameraPitchMap;
    this.camera._targetPitch = -this.cameraPitchOverview;

    this.minPitchPix = this.camera.pitchAngleMin;

    this.pixGrid = this.pixGridEntity.script.pixGrid;
    this.gameUtilities = this.gameUtilitiesEntity.script.gameUtilities;
    this.inputManager = this.inputManagerEntity.script.inputManager;
    this.clickedCord = new Hex(0, 0, 0);

    this.currentToolState = ToolState.InitialMode;

    this.firstTime = true;
    this.soundManager = this.app.root.findByName("SoundManager").sound;

    this.highLightedCoords = [];
};

//Fix camera and spawn company tiles
GameLogics.prototype.setRings = function (nrOfRings) {
    this.pixGrid.spawnCompanyTiles(nrOfRings);
    this.setCameraConstants(nrOfRings);
    this.activateInitialMode();
};

GameLogics.prototype.setCameraConstants = function (nrOfRings) {
    const array = [[18, 8], [28, 12], [28, 16]];

    switch (nrOfRings) {
        case 1:
            this.cameraDistMap = array[0][0];
            this.cameraDistOverview = array[0][1];
            break;
        case 2:
            this.cameraDistMap = array[1][0];
            this.cameraDistOverview = array[1][1];
            break;
        case 3:
            this.cameraDistMap = array[2][0];
            this.cameraDistOverview = array[2][1];
            break;
        default:
            this.cameraDistMap = array[0][0];
            this.cameraDistOverview = array[0][1];
            break;
    }
};

GameLogics.prototype.highlightAllPixDependentOnAction = function () {
    this.pixGrid.pixTable.forEach((pix) => {
        this.highLightPixDependentOnAction(pix);
    });
}

GameLogics.prototype.highLightPixDependentOnAction = function (pix) {
    const toolStateMode = this.currentToolState;
    //Highlight tiles dependent on Build or Action tool
    const highlightInitialble = toolStateMode == ToolState.InitialMode;
    const highlightBuildable = toolStateMode == ToolState.BuildPixMode || toolStateMode == ToolState.PlanPixMode ||
        toolStateMode == ToolState.BuildDroneMode || toolStateMode == ToolState.PlanDroneMode ||
        toolStateMode == ToolState.PlanFacilityMode || toolStateMode == ToolState.BuildFacilityMode ||
        toolStateMode == ToolState.BuildRoverMode || toolStateMode == ToolState.PlanRoverMode;

    const highlightContractable = toolStateMode == ToolState.ContractMode;

    const highlightActionable = !highlightInitialble && !highlightBuildable && !highlightContractable;

    const pixScript = pix.script.pixScript;
    const pixClicker = this.pixClicker.script.pixClicker;

    if (pixClicker.isValid(toolStateMode, pix)) {
        pixScript.highlight();
        if (highlightInitialble)
            pixScript.highlightInitial();

        if (highlightBuildable)
            pixScript.highlightBuild();

        if (highlightActionable)
            pixScript.highlightAction();

        if (highlightContractable) {
            this.deHighLightAllEmptyPix();
            pixScript.highlightContract();
        }

    } else {
        pixScript.deHighlight();
    }
}

GameLogics.prototype.updateHighligtOnPix = function (pixCord) {
    //console.log("updateHighligtOnPix");
    const pixEntity = this.pixGrid.getPix(pixCord);

    this.highLightPixDependentOnAction(pixEntity);

    const pixScript = pixEntity.script.pixScript;
    const pixClicker = this.pixClicker.script.pixClicker;

    //Update PixState inicator (active/inactive)
    pixScript.updatePixStateIndicator();

    //Check if its selected
    if (this.isSelectedPixCord(pixCord)) {
        if (pixClicker.isValid(this.currentToolState, pixEntity))
            pixClicker.select(pixCord);
        else
            pixClicker.resetSelect();
    }

    pixClicker.updateHighlightMarker(pixEntity);
    this.updatePixAtCoords(this.highLightedCoords);
};


GameLogics.prototype.updateShadowmaps = function () {
    if (this.app.root == null) { return; }

    const light = this.app.root.findByName("FacilityLight").light;
    light.shadowUpdateMode = pc.SHADOWUPDATE_THISFRAME;

    //Bake the shadows in its initial state
    var facilityAnimationComponents = this.pixGrid.entity.findComponents("anim");
    facilityAnimationComponents.forEach(anim => {
        anim.reset();
    });
};

GameLogics.prototype.getPix = function (x, y, z) {
    const pixCord = new Hex(x, y, z);
    return this.pixGrid.getPix(pixCord);
};

GameLogics.prototype.setPix = function (x, y, z, tierType, territoryType, pixState, graphicsQuality) {
    var pixCord = new Hex(x, y, z);
    const currentPix = this.getPix(x, y, z);
    const currentPixScript = currentPix != null ? currentPix.script.pixScript : null;

    //Dont create a new pix entity if its of the same type
    if (currentPix == null || currentPixScript.pixTier != tierType) {
        var clone = this.pixGrid.createPix(tierType, territoryType, pixState, graphicsQuality);
        this.pixGrid.setPix(pixCord, clone);
        this.updateHighligtOnPix(pixCord);
    } else if (currentPixScript.pixState != pixState) {
        currentPixScript.pixState = pixState;
        this.updateHighligtOnPix(pixCord);
    }
};

GameLogics.prototype.removePix = function (x, y, z) {
    const currentPix = this.getPix(x, y, z);
    const currentPixState = currentPix != null ? currentPix.script.pixScript.pixState : PixState.Active;

    this.setPix(x, y, z, PixType.Empty, TerritoryType.None, currentPixState);
};

GameLogics.prototype.setDrone = function (x, y, z, droneLevel) {
    const pixCord = new Hex(x, y, z);
    const pixEntity = this.pixGrid.getPix(pixCord);
    const pixScript = pixEntity.script.pixScript;
    pixScript.setDrone(droneLevel);
    this.updateHighligtOnPix(pixCord);
};

GameLogics.prototype.setRover = function (x, y, z, roverLevel, durability) {
    const pixCord = new Hex(x, y, z);
    const pixEntity = this.pixGrid.getPix(pixCord);
    const pixScript = pixEntity.script.pixScript;
    pixScript.setRover(roverLevel, durability);
    this.updateHighligtOnPix(pixCord);
};

GameLogics.prototype.setFacility = function (x, y, z, facilityLevel) {
    const pixCord = new Hex(x, y, z);
    const pixEntity = this.pixGrid.getPix(pixCord);
    const pixScript = pixEntity.script.pixScript;
    pixScript.setFacility(facilityLevel);
    pixScript.endHover();
    this.updateHighligtOnPix(pixCord);
    //this.updateShadowmaps();
};
GameLogics.prototype.setWasteOnPix = function (x, y, z, wasteOnPix) {
    const pixCord = new Hex(x, y, z);
    const pixEntity = this.pixGrid.getPix(pixCord);
    const pixScript = pixEntity.script.pixScript;

    const oldWaste = pixScript.getWaste();
    if (oldWaste != wasteOnPix) {
        pixScript.setWaste(wasteOnPix);
        if (oldWaste == 0 || wasteOnPix == 0)
            this.updateHighligtOnPix(pixCord);
    }
};

GameLogics.prototype.setEnergyOnPix = function (x, y, z, energyOnPix) {
    const pixCord = new Hex(x, y, z);
    const pixEntity = this.pixGrid.getPix(pixCord);
    const pixScript = pixEntity.script.pixScript;
    pixScript.setEnergy(energyOnPix);
};

GameLogics.prototype.pickAndDecrementWaste = function (x, y, z) {
    const pixCord = new Hex(x, y, z);
    const pixEntity = this.pixGrid.getPix(pixCord);
    const pixScript = pixEntity.script.pixScript;
    pixScript.pickWaste();
    pixScript.setWaste(pixScript.getWaste() - 1);
    //this.resetSelect();
    this.updateHighligtOnPix(pixCord);
};

GameLogics.prototype.pickWaste = function (x, y, z) {
    const pixCord = new Hex(x, y, z);
    const pixEntity = this.pixGrid.getPix(pixCord);
    const pixScript = pixEntity.script.pixScript;
    pixScript.pickWaste();
};

GameLogics.prototype.setProgress = function (x, y, z, progress, type) {
    const pixCord = new Hex(x, y, z);
    const pixEntity = this.pixGrid.getPix(pixCord);
    const pixScript = pixEntity.script.pixScript;
    pixScript.setProgress(progress, type);
};

GameLogics.prototype.getProgress = function (x, y, z) {
    const pixCord = new Hex(x, y, z);
    const pixEntity = this.pixGrid.getPix(pixCord);
    const pixScript = pixEntity.script.pixScript;
    return pixScript.getProgress();
};

GameLogics.prototype.hoverPix = function (x, y, z) {
    const pixCord = new Hex(x, y, z);
    const pixPos = this.pixGrid.getPositionFromPixCord(pixCord);
    const pixEntity = this.pixGrid.getPix(pixCord);
    const pixScript = pixEntity.script.pixScript;

    //Tools hover
    //this.camera.lookAtPoint = new pc.Vec3().add2(pixPos, this.pixGrid.getPositionFromPixCord(this.selectedPixCord)).mulScalar(0.5);
    this.pixClicker.script.pixClicker.hover(pixCord);
};

GameLogics.prototype.resetHover = function () {
    this.pixClicker.script.pixClicker.resetHover();
};

GameLogics.prototype.isCenterPixCord = function (pixCord) {
    return pixCord.q == 0 && pixCord.r == 0 && pixCord.s == 0;
};

GameLogics.prototype.isSelectedPix = function (x, y, z) {
    return x == this.selectedPixCord.q && y == this.selectedPixCord.r && z == this.selectedPixCord.s;
};

GameLogics.prototype.isSelectedPixCord = function (pixCord) {
    return pixCord.q == this.selectedPixCord.q && pixCord.r == this.selectedPixCord.r && pixCord.s == this.selectedPixCord.s;
};

GameLogics.prototype.setCameraParams = function (pixCord, dist, yaw, pitch, minPitch) {

    const oldDist = this.camera.distance;
    if ((dist && oldDist > dist) || (pixCord && !this.isCenterPixCord(pixCord) && !this.isSelectedPixCord(pixCord))) {
        this.soundManager.play("ZoomIn");
    } else if ((dist && oldDist < dist)) {
        this.soundManager.play("ZoomOut");
    }


    if (pixCord != null) {
        const pixPos = this.pixGrid.getPositionFromPixCord(pixCord);
        this.camera.pivotPoint = pixPos;
        this.camera.lookAtPoint = pixPos;
    }

    if (dist != null) {
        this.camera.distance = dist;
    }

    if (yaw != null)
        this.camera.yaw = yaw;

    if (minPitch != null)
        this.camera.pitchAngleMin = minPitch;

    if (pitch != null)
        this.camera.pitch = -pitch;

};

//temp: some variables to make the dist toggle when spamm clicking
GameLogics.prototype.selectPix = function (x, y, z) {
    const oldPixCord = this.selectedPixCord;
    const oldPixScript = this.pixGrid.getPix(oldPixCord).script.pixScript;

    const newPixCord = new Hex(x, y, z);

    const pixScript = this.pixGrid.getPix(newPixCord).script.pixScript;
    const pixPos = this.pixGrid.getPositionFromPixCord(newPixCord);

    this.pixClicker.script.pixClicker.select(newPixCord);
    //Set camera param dependent on toolState / selected tile type
    if (this.currentToolState == ToolState.ContractMode) {
        this.setCameraParams(newPixCord, Math.min(this.camera.distance, this.cameraDistOverview), null, null, this.minPitchPix);
    } else if (pixScript.isCompanyTile()) {
        this.setCameraParams(newPixCord, Math.min(this.camera.distance, this.cameraDistCompany), this.camera.calcWorldYaw(pixPos) + this.cameraYawCompany, this.cameraPitchCompany, 0.0);
    } else if ((pixScript.isStakedPix() || pixScript.isEmpty())) {
        //If comming from another PIX, keep camera yaw, pich, etc, otherwise set it to pix defaults
        if (!(oldPixScript.isStakedPix() || oldPixScript.isEmpty()))
            this.setCameraParams(newPixCord, Math.min(this.camera.distance, this.cameraDistPix), this.cameraYawPix, this.cameraPitchPix, this.minPitchPix);
        else if (pixScript != oldPixScript)
            this.setCameraParams(newPixCord, Math.min(this.camera.distance, this.cameraDistPix), null, null, this.minPitchPix);
    }

    this.camera.enablePanning = false;
    this.camera.enableDragging = false;
    this.camera.enableRotation = true;

    this.selectedPixCord = newPixCord;
};

GameLogics.prototype.resetSelect = function () {

    const oldPixCord = this.selectedPixCord;
    if (!this.pixGrid.getPix(oldPixCord).script) {
        return;
    }

    const oldPixScript = this.pixGrid.getPix(oldPixCord).script.pixScript;

    const newPixCord = new Hex(0, 0, 0);
    this.pixClicker.script.pixClicker.resetSelect();


    //Set camera params dependent on old selected tile type
    //Hack: This entire thing is a big hack, use a stack or something in the future
    if (oldPixScript.isCenterTile()) {
        if (this.currentToolState == ToolState.InitialMode) {
            //If Init mode/Inspect mode, toggle between Map and Overview settings
            if (this.resetMapOrOverviewMode % 2 == 0)
                this.setCameraParams(newPixCord, this.cameraDistOverview, this.cameraYawOverview, this.cameraPitchOverview, this.minPitchPix);
            else
                this.setCameraParams(newPixCord, this.cameraDistMap, this.cameraYawMap, this.cameraPitchMap, this.minPitchPix);
            this.resetMapOrOverviewMode++;
        } else {
            //If in any other mode, use overview settings
            this.resetMapOrOverviewMode = 1;
            this.setCameraParams(newPixCord, this.cameraDistOverview, this.cameraYawOverview, this.cameraPitchOverview, this.minPitchPix);
        }
    } else if (oldPixScript.isCompanyTile()) {
        //If company tile
        if (this.currentToolState == ToolState.InitialMode) {
            //If Init mode/Inspect mode, go to map
            this.resetMapOrOverviewMode = 0;
            this.setCameraParams(newPixCord, Math.max(this.camera.distance, this.cameraDistMap), this.cameraYawMap, this.cameraPitchMap, this.minPitchPix);
        } else {
            //If in any other mode, use overview settings
            this.resetMapOrOverviewMode = 1;
            this.setCameraParams(newPixCord, this.cameraDistOverview, this.cameraYawOverview, this.cameraPitchOverview, this.minPitchPix);
        }
    } else {
        //If pix tile
        this.resetMapOrOverviewMode = 0;
        this.setCameraParams(newPixCord, Math.max(this.camera.distance, this.cameraDistOverview), this.cameraYawOverview, this.cameraPitchOverview, this.minPitchPix);
    }
    this.camera.enablePanning = true;
    this.camera.enableDragging = true;
    this.camera.enableRotation = false;


    this.selectedPixCord = newPixCord;
};

GameLogics.prototype.setToolStateMode = function (toolStateMode) {

    if (this.app.root == null) { return; }

    const pixClicker = this.pixClicker.script.pixClicker;

    //De-highlight everything
    this.pixGrid.pixTable.forEach((pix, pixCord) => {
        pix.script.pixScript.deHighlight();
    });
    pixClicker.resetHover();
    pixClicker.resetSelect();

    //Set new tool
    this.currentToolState = toolStateMode;
    pixClicker.setToolType(toolStateMode);

    //Highlight tiles
    this.pixGrid.pixTable.forEach((pix, pixCord) => {
        const pixScript = pix.script.pixScript;
        this.updateHighligtOnPix(pixScript.pixCord);
    });

    this.updatePixAtCoords(this.highLightedCoords);
};

GameLogics.prototype.deHighlightAllPix = function () {
    //deHighlight all tiles
    this.pixGrid.pixTable.forEach((pix) => {
        const pixScript = pix.script.pixScript;
        pixScript.deHighlight();
    });
}

GameLogics.prototype.updatePixAtCoords = function (pixCoords) {

    if (pixCoords == null)
        return;

    pixCoords.forEach((pixCord) => {
        const pix = this.pixGrid.getPix(pixCord);
        if (!pix) {
            return console.log("invalid pixCord", pixCord);
        }
        const pixScript = pix.script.pixScript;
        if (!pixScript) {
            return console.log("invalid pix script at", pixCord);
        }
        pixScript.highlightContract();
    });
};

GameLogics.prototype.activateInitialMode = function () {
    const debugstr = "Initial Mode";
    console.log(debugstr);
    this.inspectedPixName = debugstr;
    //Calling camera to set the ring constant value
    this.resetSelect();

    this.setToolStateMode(ToolState.InitialMode);
};

GameLogics.prototype.activateContractMode = function () {
    const debugstr = "Contract Mode";
    console.log(debugstr);
    this.inspectedPixName = debugstr;

    this.setToolStateMode(ToolState.ContractMode);
};

GameLogics.prototype.activateBuildModeDrone = function (level) {
    const debugstr = "Build Mode Drone";
    console.log(debugstr);
    this.inspectedPixName = debugstr;
    this.buildDroneLevel = level;
    this.setToolStateMode(ToolState.BuildDroneMode);
};

GameLogics.prototype.activatePlanModeDrone = function () {
    const debugstr = "Plan Mode Drone";
    console.log(debugstr);
    this.inspectedPixName = debugstr;
    this.setToolStateMode(ToolState.PlanDroneMode);
};

GameLogics.prototype.activateBuildModeRover = function (level) {
    const debugstr = "Build Mode Rover";
    console.log(debugstr);
    this.inspectedPixName = debugstr;
    this.buildRoverLevel = level;
    this.setToolStateMode(ToolState.BuildRoverMode);
};

GameLogics.prototype.activatePlanModeRover = function () {
    const debugstr = "Plan Mode Rover";
    console.log(debugstr);
    this.inspectedPixName = debugstr;
    this.setToolStateMode(ToolState.PlanRoverMode);
    //this.setToolStateMode(ToolState.BuildRoverMode);
};

GameLogics.prototype.activateBuildModeFacility = function (facilityTier, facilityLevel) {
    const debugstr = "Build Mode Facility";
    console.log(debugstr);
    this.inspectedPixName = debugstr;
    this.buildFacilityTier = facilityTier;
    this.buildFacilityLevel = facilityLevel;
    this.setToolStateMode(ToolState.BuildFacilityMode);
};

GameLogics.prototype.activateBuildModePix = function (pixTier, pixTerritoryType) {
    const debugstr = "Build Mode Pix";
    console.log(debugstr);
    this.inspectedPixName = debugstr;

    this.buildPixTier = pixTier;
    this.buildPixTerritoryType = pixTerritoryType;
    this.setToolStateMode(ToolState.BuildPixMode);
};

GameLogics.prototype.activateTaskmanagerMode = function () {
    const debugstr = "Taskmanager Mode";
    console.log(debugstr);
    this.inspectedPixName = debugstr;

    this.setToolStateMode(ToolState.TaskManagerMode);
};

GameLogics.prototype.activateOverviewMode = function () {
    const debugstr = "Overview Mode";
    console.log(debugstr);
    this.inspectedPixName = debugstr;

    this.setToolStateMode(ToolState.OverviewMode);
};

GameLogics.prototype.activatePixelPushMode = function () {
    const debugstr = "Pixelpush Mode";
    console.log(debugstr);
    this.inspectedPixName = debugstr;
    this.setToolStateMode(ToolState.PixelPushMode);
};

GameLogics.prototype.activatePlanMode = function () {
    const debugstr = "Plan (Build) Mode";
    console.log(debugstr);
    this.inspectedPixName = debugstr;
    this.setToolStateMode(ToolState.PlanMode);
};

GameLogics.prototype.activatePlanModeFacility = function () {
    const debugstr = "Plan Mode Facility";
    console.log(debugstr);
    this.inspectedPixName = debugstr;
    this.setToolStateMode(ToolState.PlanFacilityMode);
};

GameLogics.prototype.activatePlanModePix = function () {
    const debugstr = "Plan Mode Pix";
    console.log(debugstr);
    this.inspectedPixName = debugstr;
    this.setToolStateMode(ToolState.PlanPixMode);
};

GameLogics.prototype.activateBuildModeDestroy = function () {
    console.log("Destroy Mode");
    this.inspectedPixName = "Destroy Mode";
    this.setToolStateMode(ToolState.DestroyMode);
};

GameLogics.prototype.deHighLightAllEmptyPix = function () {
    this.pixGrid.pixTable.forEach((value, key) => {
        const hex = string_to_hex(key);
        const pix = this.pixGrid.getPix(hex).script.pixScript;
        if (pix.pixTier == PixType.Empty)
            pix.deHighlight();
    });
};


GameLogics.prototype.hideSkyscrapers = function () {
    /*if (!pc.platform.mobile) {
        return;
    }*/

    this.pixGrid.pixTable.forEach((value, key) => {
        const hex = string_to_hex(key);
        const pix = this.pixGrid.getPix(hex).script.pixScript;
        if (pix.pixTier == PixType.CompanyTile)
            value.findByName("SkyScrapers").enabled = false;
    });
};

GameLogics.prototype.showSkyscrapers = function () {
    /*if (!pc.platform.mobile) {
        return;
    }*/

    this.pixGrid.pixTable.forEach((value, key) => {
        const hex = string_to_hex(key);
        const pix = this.pixGrid.getPix(hex).script.pixScript;
        if (pix.pixTier == PixType.CompanyTile)
            value.findByName("SkyScrapers").enabled = true;
    });
};

GameLogics.prototype.update = function (dt) {
    if (this.firstTime) {
        const isDebugMode = this.app.root.findByName("PlaceholderGUI").enabled;
        if (isDebugMode)
            this.spawnWorldDebugMode();

        this.pixClicker.enabled = true;
        this.firstTime = false;
    }
};

GameLogics.prototype.placeRoverOnAll = function () {
    this.pixGrid.pixTable.forEach((value, key) => {
        const hex = string_to_hex(key);
        const pix = value.script.pixScript;
        const canPlaceOnPix = pix.pixTier == PixType.Empty ||
            pix.pixTier == PixType.CompanyTile ||
            pix.pixTier == PixType.Invisible ||
            pix.pixTier == PixType.MiddleSlot;

        if (!pix.hasRover() && !canPlaceOnPix) {
            const level = 1 + (Math.floor(Math.random() * 3));
            const durability = Math.floor(Math.random() * 4);
            this.setRover(hex.q, hex.r, hex.s, level, durability);
        }
    });
};

GameLogics.prototype.placeDroneOnAll = function () {
    this.pixGrid.pixTable.forEach((value, key) => {
        const hex = string_to_hex(key);
        const pix = value.script.pixScript;
        const canPlaceOnPix = pix.pixTier == PixType.Empty ||
            pix.pixTier == PixType.CompanyTile ||
            pix.pixTier == PixType.Invisible ||
            pix.pixTier == PixType.MiddleSlot;

        if (!pix.hasDrone() && !canPlaceOnPix) {
            const level = Math.floor(Math.random() * 3);
            this.setDrone(hex.q, hex.r, hex.s, level);
        } else {
            console.log("Could not place drone " + pix.hasDrone() + " " + this.getStringFromNumber(canPlaceOnPix));
        }
    });
};

GameLogics.prototype.getStringFromNumber = function (number) {
    var pixTier;
    switch (number) {
        case 8:
            pixTier = "Invisible";
            break;
        case 5:
            pixTier = "Legendary";
            break;
        case 4:
            pixTier = "Rare";
            break;
        case 3:
            pixTier = "Uncommon";
            break;
        case 2:
            pixTier = "Common";
            break;
        case 1:
            pixTier = "Outlier";
            break;
        case 0:
        default:
            pixTier = "Empty";
            break;
    }
    return pixTier;
};


GameLogics.prototype.placeFacilityOnAll = function () {
    //const random = Math.floor(Math.random() * 6);
    //const level = Math.max(1, Math.min(5, random))
    /*this.pixGrid.pixTable.forEach((value, key) => {
        const hex = string_to_hex(key);
        const pix = value.script.pixScript;
        const canPlaceOnPix =   pix.pixTier == PixType.Empty ||  
                                pix.pixTier == PixType.CompanyTile || 
                                pix.pixTier == PixType.Invisible || 
                                pix.pixTier == PixType.MiddleSlot;
        if(!pix.hasFacility() &&  !canPlaceOnPix && !pix.hasDrone() && !pix.hasRover()){
            //const random = Math.floor(Math.random() * 6);
            //const level = Math.max(1, Math.min(5, random));
            const level = Math.max(Math.abs(hex.q), Math.max(Math.abs(hex.r), Math.abs(hex.s)));
            //level = (level + 1) % 6;
            //level = Math.max(1, Math.min(level, 5))
            rings[level][pix];
            //this.setFacility(hex.q, hex.r, hex.s, level);
            console.log("level = " + level);
        }
    });*/
    var level = 1;
    for (var i = 1; i < this.pixGrid.nrOfRings + 1; i++) {
        const array = cube_ring(Hex(0, 0, 0), i);
        level = 5;//this.pixGrid.nrOfRings;
        for (var j = 0; j < array.length; j++) {
            //level = Math.max(Math.abs(array[j].q), Math.max(Math.abs(array[j].r), Math.abs(array[j].s)));
            //this.setFacility(array[j].q, array[j].r, array[j].s, 5);
            this.setFacility(array[j].q, array[j].r, array[j].s, level);
            level = (level + 1) % 6;
            level = Math.max(1, Math.min(level, 5))
        }
    }
};

GameLogics.prototype.placePixOnAll = function () {
    //const randomValue = Math.floor(Math.random() * 6);
    //var level = Math.max(1, Math.min(randomValue, 5));
    var level = 0;
    this.pixGrid.pixTable.forEach((value, key) => {
        const hex = string_to_hex(key);
        const pix = value.script.pixScript;
        const middle = (hex.r == 0 && hex.q == 0 && hex.s == 0);
        const canPlacePix = pix.pixTier == PixType.Empty &&
            pix.pixTier != PixType.CompanyTile &&
            pix.pixTier != PixType.Invisible &&
            pix.pixTier != PixType.MiddleSlot;

        if (canPlacePix && !middle) {
            //const randomValue = Math.floor(Math.random() * 6);
            //var level = Math.max(1, Math.min(randomValue, 5));
            level = Math.max(Math.abs(hex.q), Math.max(Math.abs(hex.r), Math.abs(hex.s)));
            //level = (level + 1) % 6;
            //level = Math.max(1, Math.min(level, 5))
            this.setPix(hex.q, hex.r, hex.s, this.getPixTierFromNumber(level), TerritoryType.Pix, PixState.Active);
        }
    });


};

GameLogics.prototype.removeAll = function () {
    const randomValue = Math.floor(Math.random() * 6);
    var level = Math.max(1, Math.min(randomValue, 5));
    this.pixGrid.pixTable.forEach((value, key) => {
        const hex = string_to_hex(key);
        const pix = value.script.pixScript;
        //const middle = (hex.r == 0 && hex.q == 0 && hex.s == 0);
        const isNormalPix = pix.pixTier != PixType.Empty &&
            pix.pixTier != PixType.CompanyTile &&
            pix.pixTier != PixType.Invisible &&
            pix.pixTier != PixType.MiddleSlot;

        if (isNormalPix) {
            //const level = Math.max(1, Math.min(5, random))
            //console.log("Place Pix");
            //level = Math.max(Math.abs(hex.q), Math.max(Math.abs(hex.r), Math.abs(hex.s)));
            //this.setPix(hex.q, hex.r, hex.s, PixType.Empty, TerritoryType.Pix, PixState.Active);
            this.setFacility(hex.q, hex.r, hex.s, 0);
            this.setRover(hex.q, hex.r, hex.s, 0);
            this.setDrone(hex.q, hex.r, hex.s, 0);
            this.removePix(hex.q, hex.r, hex.s);
        }
    });
};

const Clamp = function (a, b, value) {
    return Math.max(a, Math.min(b, value));
}

GameLogics.prototype.spawnWorldDebugMode = function () {
    const nrOfRings = this.pixGrid.nrOfRings;
    this.setRings(this.pixGrid.nrOfRings);

    const randomValue = Math.floor(Math.random() * 6);
    const level = Math.max(1, Math.min(randomValue, 5));

    if (pc.platform.mobile) {
        this.setGraphicState(GraphicsQuality.Low);
    } else {
        this.setGraphicState(GraphicsQuality.High);
    }

    for (var q = -nrOfRings; q <= nrOfRings; q++) {
        for (var r = -nrOfRings; r <= nrOfRings; r++) {
            for (var s = -nrOfRings; s <= nrOfRings; s++) {
                if (r == 0 && q == 0 && s == 0)
                    continue;

                var isValidHexCord = r + q + s == 0;

                if (isValidHexCord) {
                    const isFirstRing = Math.abs(q) + Math.abs(r) + Math.abs(s) <= 2;
                    const isNoContract = false;// !isFirstRing && Math.random() > 0.5;
                    this.setPix(q, r, s, PixType.Legendary, TerritoryType.Pix, PixState.Active);
                    //this.setPix(q, r, s, this.getPixTierFromNumber(level), TerritoryType.Pix, PixState.Active);

                    //this.setPix(q, r, s, PixType.Legendary, 0, Clamp(2, 3, Math.floor(Math.random() * 5)));

                    //this.setRover(q, r, s, 1, 3);
                }
            }
        }
    }

    this.placePixOnAll();
    this.placeFacilityOnAll();
};

GameLogics.prototype.getRandomPixTier = function () {
    const randomValue = Math.floor(Math.random() * 6);
    const level = Math.max(1, Math.min(randomValue, 5));
    return this.getPixTierFromNumber(level);
};

GameLogics.prototype.getPixTierFromNumber = function (number) {
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

GameLogics.prototype.getGraphicState = function () {
    return this.currentMasterGraphicsQuality;
};


GameLogics.prototype.setGraphicState = function (graphicsQuality) {
    if (this.currentMasterGraphicsQuality == graphicsQuality && this.currentMasterGraphicsQuality != undefined) {
        console.log("graphicsQuality", graphicsQuality, "currentMasterGraphicsQuality", currentMasterGraphicsQuality);
        return;
    }


    console.log("GameLogics setGraphicState");

    this.currentMasterGraphicsQuality = graphicsQuality;

    this.setReselutionQuality(this.currentMasterGraphicsQuality);

    this.setModelGraphicsQuality(pc.math.clamp(this.currentMasterGraphicsQuality, 0, 1));

    //console.log("Master GraphicsQuality = " + getString(graphicsQuality));

    switch (this.currentMasterGraphicsQuality) {
        case GraphicsQuality.Low:
        case GraphicsQuality.Medium:
            this.hideSkyscrapers();
            break;
        case GraphicsQuality.High:
            this.showSkyscrapers();
            break;
    }
};

GameLogics.prototype.setReselutionQuality = function (graphicsQuality) {
    this.currentReselutionQuality = graphicsQuality;
    const index = this.resolutionScalingArray[this.currentReselutionQuality];
    this.resolutionScalingEntity.script.resolutionScaling.setScale(index);
    //console.log("Reselution Quality = " + getString(this.currentReselutionQuality));
    //this.setToolStateMode(this.currentToolState);
};

GameLogics.prototype.setModelGraphicsQuality = function (graphicsQuality) {
    this.currentModelGraphicsQuality = graphicsQuality;

    //console.log("Model GraphicsQuality = " + getString(this.currentModelGraphicsQuality));
    this.pixGrid.pixTable.forEach((value, key) => {
        const hex = string_to_hex(key);
        const pix = value.script.pixScript;
        //const middle = (hex.r == 0 && hex.q == 0 && hex.s == 0);
        const isNormalPix = pix.pixTier != PixType.Empty &&
            pix.pixTier != PixType.CompanyTile &&
            pix.pixTier != PixType.Invisible &&
            pix.pixTier != PixType.MiddleSlot;

        if (isNormalPix && pix.hasFacility()) {
            this.pixGrid.setPixGraphicsState(value, this.currentModelGraphicsQuality);
        }
    });

    //this.setToolStateMode(this.currentToolState);
};

GameLogics.prototype.getCurrentModelQuality = function () {
    //console.log(getString(this.currentModelGraphicsQuality));
    const modelQuality = this.currentModelGraphicsQuality;
    const masterQuality = this.currentMasterGraphicsQuality;
    return modelQuality != null ? modelQuality : masterQuality;
};

GameLogics.prototype.dontResetCamera = function () {
    this.setToolStateMode(this.currentToolState);
};