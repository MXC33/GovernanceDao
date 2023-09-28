var PixClicker = pc.createScript('pixClicker');

PixClicker.attributes.add('gameLogicsEntity', {type: 'entity', default: null, title: 'GameLogics Entity'});
PixClicker.attributes.add('pixGridEntity', {type: 'entity', default: null, title: 'PixGrid Entity'});
PixClicker.attributes.add('gameUtilitiesEntity', {type: 'entity', default: null, title: 'Game Utilities Entity'});
PixClicker.attributes.add('inputManagerEntity', {type: 'entity', default: null, title: 'Input Manager Entity'});
PixClicker.attributes.add('hoverMarker', {type: 'entity', default: null, title: 'Hover Marker Entity'});
PixClicker.attributes.add('hoverMarkerSelected', {type: 'entity', default: null, title: 'Hover Marker Selected'});
PixClicker.attributes.add('selectMarker', {type: 'entity', default: null, title: 'Select Entity'});

//====== 
//======   Uncomment this enum if you need to parse the script in the editor (see constants.js) ====
//====== 
/*var ToolState = {
	InitialMode: 0, 
	BuildPixMode: 1, 
	BuildDroneMode: 2, 
	BuildFacilityMode: 3, 
	DestroyMode: 4, 
	PixelPushMode: 5, 
	OverviewMode: 6, 
	TaskManagerMode: 7, 
	PlanMode: 8,
	PlanPixMode: 9,
	PlanDroneMode: 10,
	PlanFacilityMode: 11,
    BuildRoverMode: 12,
    PlanRoverMode: 13
};*/
//====== 


PixClicker.attributes.add('toolType', {
    type: 'number',
    enum: Object.entries(ToolState).map(kvp => {var e = {}; e[kvp[0]] = kvp[1]; return e;}),
    default: 0
});
// initialize code called once per entity
PixClicker.prototype.initialize = function() {

    this.oldDurability = 0;

    this.gameUtilities = this.gameUtilitiesEntity.script.gameUtilities;
    this.gameLogics = this.gameLogicsEntity.script.gameLogics;
    this.pixGrid = this.pixGridEntity.script.pixGrid;
    this.inputManager = this.inputManagerEntity.script.inputManager;

    this.setToolType(this.toolType);

    //Some debug stuff
    this.soundManager = this.app.root.findByName("SoundManager").sound;
    this.wasteTimer = 0.0;
};

PixClicker.prototype.setToolType = function(toolType) {
    this.toolType = toolType;
    
    this.firstUpdateAfterStateSwitch = true;
    this.hoveredEntity = null;
    this.selectedEntity = null;
    this.hoverMarker.enabled = false;
    this.hoverMarkerSelected.enabled = false;
    this.selectMarker.enabled = false;
};


PixClicker.prototype.isValid = function(toolType, pickedEntity) {
    var pixScript = pickedEntity.script.pixScript;

    //if(!pixScript.isActive())
    //    return false;
    
    switch(toolType) {
        case ToolState.InitialMode:
            return pixScript.isEmpty() || pixScript.isStakedPix() || pixScript.isCompanyTile() || pixScript.isActivateableTile();
        
        case ToolState.ContractMode:
            return pixScript.isContractPix(); //Todo: Replace with pixScript.isInCurrentContractPix()

        case ToolState.BuildPixMode:
        case ToolState.PlanPixMode:
            return pixScript.isEmpty() && pixScript.isActive();
            
        case ToolState.DestroyMode:
            return  pixScript.isStakedPix() && pixScript.isActive();

        case ToolState.BuildDroneMode:
            return  pixScript.canPlaceDrone() && pixScript.isActive();
        case ToolState.BuildRoverMode:
            return  pixScript.canPlaceRover() && pixScript.isActive();
        case ToolState.PlanFacilityMode:
            return  pixScript.canPlaceObject() && pixScript.isActive();
        case ToolState.PlanDroneMode:
            return  pixScript.canPlaceDrone() && pixScript.isActive();
        case ToolState.PlanRoverMode:
            return  pixScript.canPlaceRover() && pixScript.isActive();

        case ToolState.BuildFacilityMode:
            return  pixScript.canPlaceObject() && pixScript.pixTier == this.gameLogics.buildFacilityTier && pixScript.isActive();

        case ToolState.PixelPushMode:
            return  pixScript.canPlaceObject() && pixScript.isActive();

        case ToolState.TaskManagerMode:
            return  (pixScript.hasDrone() || pixScript.hasRover() || pixScript.hasFacility()) && pixScript.isActive();

        case ToolState.OverviewMode:
            return  pixScript.isStakedPix() && pixScript.isActive();
        case ToolState.PlanMode:
            return  (pixScript.isEmpty() || pixScript.isStakedPix()) && pixScript.isActive();
        default:
            return false;
    }
};

PixClicker.prototype.updateHighlightMarker = function(pixEntity) {
    if(pixEntity && pixEntity.enabled) {
        //Disable highlightmarker on the entity if its selected or hovered, else re-enable it
        const showHighlightMarker = this.hoveredEntity != pixEntity && this.selectedEntity != pixEntity;
        const highlightMarkers = pixEntity.findByTag("HighlightMarker");
        highlightMarkers.forEach(e => {
            e.enabled = showHighlightMarker;
            //Temp fix: Mesh instances doesnt get properly removed on disable/destroyed so move them far away from the camera 
            if (showHighlightMarker)
                e.enabled = true; //e.setLocalPosition(0, 0, 0);
            else
                e.enabled = false; //e.setLocalPosition(0, 1000, 0); 
        });

        //Increase text and image opacity of the build-billboard if its hovered else set it to something lower
        /*
        pixEntity.findComponents("element").forEach(element => {
            element.opacity = this.hoveredEntity == pixEntity ? 1.0 : 0.75;
        });
        */
    }
};

PixClicker.prototype.hover = function(pixCord) {
    const pixEntity = this.pixGrid.getPix(pixCord);
    const pixScript = pixEntity.script.pixScript;
    const pixPos = this.pixGrid.getPositionFromPixCord(pixCord);
    
    const prevHoveredEntity = this.hoveredEntity;
    this.hoveredEntity = pixEntity;

    //Hover on non-selected
    this.hoverMarker.enabled = this.hoveredEntity != this.selectedEntity;
    this.hoverMarker.setPosition(pixPos);

    //Hover on selected
    this.hoverMarkerSelected.enabled =  (this.hoveredEntity == this.selectedEntity); 
    this.hoverMarkerSelected.setPosition(pixPos);

    //Update highlight marker on hovered entity
    this.updateHighlightMarker(pixEntity);
    //pixScript.hover();

    //Reset highlight marker on prevhovered entity
    this.updateHighlightMarker(prevHoveredEntity);
    /*if(prevHoveredEntity){
        prevHoveredEntity.script.pixScript.endHover();
    }  */
};

PixClicker.prototype.resetHover = function() {
    this.hoverMarker.enabled = false;
    this.hoverMarkerSelected.enabled = false;
    const prevHoveredEntity = this.hoveredEntity;
    this.hoveredEntity = null;

    //Reset highlight marker on prevhovered entity
    this.updateHighlightMarker(prevHoveredEntity);
};

PixClicker.prototype.select = function(pixCord) {
    const pixEntity = this.pixGrid.getPix(pixCord);
    const pixScript = pixEntity.script.pixScript;
    
    const prevSelectedEntity = this.selectedEntity;
    this.selectMarker.enabled = true;
    this.selectMarker.setPosition(this.pixGrid.getPositionFromPixCord(pixCord));
    this.selectedEntity = pixEntity;

    //Update highlight marker on selected entity
    this.updateHighlightMarker(pixEntity);
    
    //End hover on old Neigbors first , to prevent end hover if new selected is one of the old neigbours
    if(prevSelectedEntity){
        prevSelectedEntity.script.pixScript.endHover();
        const coord = this.pixGrid.getPixCordFromPosition(prevSelectedEntity.getPosition());
        const oldNeigbors = cube_ring(coord, 1);
        for(var i = 0; i < oldNeigbors.length; i++){
            const pix = this.pixGrid.getPix(oldNeigbors[i]);
            if(pix != null){
                pix.script.pixScript.endHover();
            }
        }
    }  

    //call hover on all neigbours of the new selected pix
    const neigbors = cube_ring(pixCord, 1);
    for(var i = 0; i < neigbors.length; i++){
        const pix = this.pixGrid.getPix(neigbors[i]);
        if(pix){
            pix.script.pixScript.hover();
        }
    }

    // Call hover on the selected pic.
    pixScript.hover();
    //Reset highlight marker on prevhovered entity
    this.updateHighlightMarker(prevSelectedEntity);

};

PixClicker.prototype.resetSelect = function() {
    const prevSelectedEntity = this.selectedEntity;
    this.selectMarker.enabled = false;
    this.selectedEntity = null;

    //Reset highlight marker on prevhovered entity
    this.updateHighlightMarker(prevSelectedEntity);
};

PixClicker.prototype.onPixClick = function(pickedEntity) {
    const pixCord = this.pixGrid.getPixCordFromPosition(pickedEntity.getPosition());
    const pixEntity = this.pixGrid.getPix(pixCord);
    const pixScript = pixEntity.script.pixScript;
    const isValid = this.isValid(this.toolType, pickedEntity);

    if(isValid) {
        
        if(this.isDebugMode) {
            //On pixClick debug mode
            this.onPixSelectDebugMode(pixEntity);
        } else {
            //On pixClick live mode
            if((this.toolType == ToolState.PixelPushMode || this.toolType == ToolState.InitialMode) && pixScript.getWaste() > 0)
                this.soundManager.play("Loot");
            else if(this.selectedEntity != pickedEntity)
                this.soundManager.play("Click3");
            else
                this.soundManager.play("Click1");

            this.app.fire("tile:clicked", pixCord, pixEntity.name);
        }
    } else {
        //Reset if clicking invalid tile
        this.resetClick();
    }
    //console.log(pixEntity.getPosition());
    console.log("Pix Clicked: (" + pixCord.q + ", " + pixCord.r + ", " + pixCord.s + ") PixState: " + (pixScript.pixState ).toString() + ", " + "PixType: " + pixScript.pixTier, ", IsClickable: " + isValid.toString());
};

PixClicker.prototype.resetClick = function() {
    if(this.selectedEntity != null) {
        this.soundManager.play("Back1");
    } 
    //Debug mode: Handle user tools
    if(this.isDebugMode) {
        //On reset click debug mode
        this.onPixSelectResetDebugMode();
    }
    else {
        //On reset click live mode
        this.app.fire("tile:clicked", null);

        //maybe call this from the frontend(?)
        this.gameLogics.resetSelect();
    }
};

PixClicker.prototype.onMouseHover = function(pickedEntity) {
    if(this.hoveredEntity == pickedEntity)
        return;

    if(this.isValid(this.toolType, pickedEntity)) {
        const pixCord = this.pixGrid.getPixCordFromPosition(pickedEntity.getPosition());

        this.app.fire("tile:hovered",  pixCord, pickedEntity.name);
        
        if(pickedEntity != this.selectedEntity)
            this.soundManager.play("HoverOn");
        
        if(this.isDebugMode)
            this.onPixHoverDebugMode(pickedEntity);
        
        //Maybe call this in frontend?
        this.gameLogics.hoverPix(pixCord.q, pixCord.r, pixCord.s);
    } else
        this.onMouseLeaveHover();
};

PixClicker.prototype.onMouseLeaveHover = function() {
    if(this.hoveredEntity == null)
        return;

    this.app.fire("tile:hovered",  null);

    if(this.isDebugMode)
        this.onPixResetHoverDebugMode();

    //Maybe call this in frontend?
    this.gameLogics.resetHover();
};


// update code called every frame
PixClicker.prototype.update = function(dt) {
    this.isDebugMode = this.app.root.findByName("PlaceholderGUI").enabled;
    if(this.firstUpdateAfterStateSwitch) {
        this.firstUpdateAfterStateSwitch = false;
        return;
    }
    var mousePos = this.inputManager.mousePos;
    
    //Mouse not on screen
    if(!mousePos || !this.gameLogics.isCursorInScreen) {
        if(this.hoveredEntity != null)
            this.onMouseLeaveHover();
        return;  
    }

    var isMousePressed = this.inputManager.isMousePressed;
    var isMouseDown = this.inputManager.isMouseDown;
    var pickedEntity = this.gameUtilities.getPixEntityAtMousePos();

    if(isMousePressed) {
        if(pickedEntity)
            this.onPixClick(pickedEntity);
        else
            this.resetClick();
    }
    else if(!this.app.touch) {
        //On Valid Pix Hover
        if(!isMouseDown && pickedEntity)
            this.onMouseHover(pickedEntity);
        else
            this.onMouseLeaveHover();
    } else if(this.app.touch) {
        if(isMouseDown && pickedEntity)
            this.onMouseHover(pickedEntity);
        else
            this.onMouseLeaveHover();
    }

    //Debug mode: Spawn waste etc
    if(this.isDebugMode)
        this.onUpdateDebugMode(dt);
};



/*
=============== DEBUG MODE ===============
//None of the following functions should be called when the live front-end logic is applied 
*/

PixClicker.prototype.onUpdateDebugMode = function(dt) {
        var type = 0;
        const wasteCd = 3.0;
        this.wasteTimer += dt;
        var pixScript = null;
        var progress= null;
        this.pixGrid.pixTable.forEach((pix, pixCordStr) => {
            const pixCord = string_to_hex(pixCordStr);
            pixScript = pix.script.pixScript;
            if(!pixScript.isActive())
                return;

            if(pixScript.hasDrone() || pixScript.hasRover() || pixScript.hasFacility()) {
                progress = pixScript.getProgress() + dt/10.0;
                if (pixScript.hasDrone()) { type = 0; }
                if (pixScript.hasRover()) { type = 1; }
                if (pixScript.hasFacility()) { type = 2; }
                pixScript.setProgress(progress, type);
            } else if(pixScript.canSpawnWaste() && this.wasteTimer > wasteCd && Math.random() > 0.9) {
               this.gameLogics.setWasteOnPix(pixCord.q, pixCord.r, pixCord.s, Math.min(pixScript.getWaste() + 1, 3));
                //pixScript.setWaste(Math.min(pixScript.getWaste() + 1, 5));
            }
        });
        if(this.wasteTimer > wasteCd)
            this.wasteTimer = 0.0;
};

PixClicker.prototype.onPixSelectDebugMode = function(pickedEntity) {
    const pixPos = pickedEntity.getPosition().clone();
    const pixCord = this.pixGrid.getPixCordFromPosition(pixPos);
    const pixScript = pickedEntity.script.pixScript;
    const x = pixCord.q;
    const y = pixCord.r;
    const z = pixCord.s;
    //if(pickedEntity != this.selectedEntity)
    //    this.soundManager.play("Click1");
    switch(this.toolType) {
        case ToolState.InitialMode:
            if(pickedEntity != this.selectedEntity) {
                this.gameLogics.hideSkyscrapers();
                if(pixScript.isCompanyTile()) {
                    pickedEntity.findByName("SkyScrapers").enabled = true;
                }
            } else if(pixScript.isEmpty() && pixScript.isActive()) {
                var tier = this.gameLogics.buildPixTier;
                tier -= 1;//lol
                if(tier <= 0)
                    tier = 5;
                this.gameLogics.activateBuildModePix(tier, 1);
                this.soundManager.play("Click2");
                this.gameLogics.select(x,y,z);
            } else if(pixScript.getWaste() > 0 && pixScript.isActive()) {
                this.gameLogics.activatePixelPushMode();
                this.soundManager.play("Click2");
            } else if(pixScript.getProgress() > 0 && pixScript.isActive()) {
                this.gameLogics.activateTaskmanagerMode();
                this.soundManager.play("Click2");
            } else if(pixScript.isActivateableTile()) {
                this.gameLogics.activateContractMode();
                this.soundManager.play("Click2");
            } else if(pickedEntity != this.selectedEntity) {
                this.soundManager.play("Click2");
            } else {
                this.soundManager.play("Click1");
            }
        //console.log(pixPos.x.toFixed(2),pixPos.z.toFixed(2));
        break;
        case ToolState.ContractMode:
            if(pickedEntity != this.selectedEntity) {
                this.soundManager.play("Click2");
            } else {
                var newState = (pixScript.pixState + 1) % 6;
                //if(newState == 1)
                //    newState = 2;//Skip "Active" lol

                pixScript.pixState = newState;
                pixScript.updatePixStateIndicator();
                this.soundManager.play("Loot");
            }
        break;
        case ToolState.PixelPushMode:
            if(pickedEntity != this.selectedEntity) {
                this.soundManager.play("Click3");
            } else if(pickedEntity == this.selectedEntity && pixScript.getWaste() > 0 ) {
                this.gameLogics.pickAndDecrementWaste(x, y, z);
                this.soundManager.play("Loot");
            } else {
                this.soundManager.play("Click1");
            }
        break;
        case ToolState.TaskManagerMode:
            if(pickedEntity != this.selectedEntity) {
                this.soundManager.play("Click3");
            } else if(pickedEntity == this.selectedEntity && pixScript.getProgress() >= 1.0) {
                this.gameLogics.setProgress(x, y, z, 0.0);    
                this.soundManager.play("Loot");
            } else {
                this.soundManager.play("Click1");
            }
        break;
        case ToolState.PlanMode:
            //return  (pixScript.isEmpty() || pixScript.isStakedPix()) && pixScript.isActive();
            if(pixScript.isEmpty()) {
                this.soundManager.play("Click2");
                var tier = this.gameLogics.buildPixTier;
                tier -= 1;//lol
                if(tier <= 0)
                    tier = 5;
                this.gameLogics.activateBuildModePix(tier, 1);
            } else if(pixScript.canPlaceObject()) {
                this.soundManager.play("Click2");
                const value = Math.random();
                if(value < 0.3) {
                    this.gameLogics.activateBuildModeFacility(pixScript.pixTier, 1);
                } else {
                    this.gameLogics.activateBuildModeDrone(1 + Math.floor(Math.random()*2.5));
                }               

            } else {
                this.soundManager.play("Click1");
            }
        break;
        case ToolState.BuildPixMode:
            if(pickedEntity != this.selectedEntity) {
                this.soundManager.play("Click3");
            } else {
                this.soundManager.play("Place");
                this.gameLogics.setPix(x, y, z, this.gameLogics.buildPixTier, this.gameLogics.buildPixTerritoryType, PixState.Active);
                this.gameLogics.activatePlanMode();
            }
        break;
        case ToolState.BuildDroneMode:
            if(pickedEntity != this.selectedEntity) {
                this.soundManager.play("Click3");
            } else {
                pixScript.setDrone(this.gameLogics.buildDroneLevel);
                this.soundManager.play("Place");
                this.gameLogics.activatePlanMode();
            }
            break;
        case ToolState.BuildRoverMode:
            if(pickedEntity != this.selectedEntity) {
                this.soundManager.play("Click3");
            } else {
                pixScript.setRover(this.gameLogics.buildRoverLevel, this.oldDurability);
                this.oldDurability = (this.oldDurability + 1) % 4;
                this.soundManager.play("Place");
                this.gameLogics.activatePlanMode();
            }
            break;

        case ToolState.BuildFacilityMode: 
            if(pickedEntity != this.selectedEntity) {
                this.soundManager.play("Click3");
            } else {
                const random = Math.floor(Math.random() * 6);
                const level = Math.max(1, Math.min(random, 5));
                pixScript.setFacility(level); 
                //this.gameLogics.buildFacilityLevel = (this.gameLogics.buildFacilityLevel + 1) % 5
                //console.log("this.gameLogics.buildFacilityLevel = " + this.gameLogics.buildFacilityLevel);
                this.soundManager.play("Place");
                this.gameLogics.activatePlanMode();
            }    
            break;
            
        case ToolState.DestroyMode:
            this.soundManager.play("Click1");            
            //this.gameLogics.setPix(x, y, z, PixType.Empty, TerritoryType.None, Math.random() > 0.3? PixState.Active : PixState.InActive);
   
            this.gameLogics.removePix(x, y, z);
            break;
        case ToolState.OverviewMode:
        case ToolState.PlanDroneMode:
            return  pixScript.canPlaceDrone() && pixScript.isActive();
        case ToolState.PlanRoverMode:
            return  pixScript.canPlaceRover() && pixScript.isActive();
        case ToolState.PlanFacilityMode:
            //return  pixScript.canPlaceObject() && (pixScript.pixTier == this.gameLogics.buildFacilityTier) && pixScript.isActive();
        case ToolState.PlanPixMode:
            if(pickedEntity != this.selectedEntity) {
                this.soundManager.play("Click3");
            } else {
                this.soundManager.play("Click1");
            }
        break;
    }

    this.gameLogics.selectPix(x, y, z);
};

PixClicker.prototype.onPixSelectResetDebugMode = function() {
    if(this.selectedEntity == null && this.toolType != ToolState.InitialMode) {
        this.gameLogics.activateInitialMode();
        this.soundManager.play("Back2");
    } else {
        this.gameLogics.resetSelect();
    }
};

PixClicker.prototype.onPixHoverDebugMode = function(pickedEntity) {
    //if(pickedEntity != this.selectedEntity)
    //    this.soundManager.play("HoverOn");
};

PixClicker.prototype.onPixResetHoverDebugMode = function() {
    //if(this.hoveredEntity != this.selectedEntity)
     //   this.soundManager.play("HoverOff");
};
