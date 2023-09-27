var MouseInput = pc.createScript('mouseInput');

MouseInput.attributes.add('orbitSensitivity', {
    type: 'number', 
    default: 0.3, 
    title: 'Orbit Sensitivity', 
    description: 'How fast the camera moves around the orbit. Higher is faster'
});

MouseInput.attributes.add('distanceSensitivity', {
    type: 'number', 
    default: 0.15, 
    title: 'Distance Sensitivity', 
    description: 'How fast the camera moves in and out. Higher is faster'
});

MouseInput.attributes.add('panSensitivity', {
    type: 'number', 
    default: 4.0, 
    title: 'Pan Sensitivity', 
});


MouseInput.attributes.add('dragSensitivity', {
    type: 'number', 
    default: 1.0, 
    title: 'Drag Sensitivity', 
});

MouseInput.attributes.add('panEntity', {
    type: 'entity',
    title: 'Pan Anchor Entity'
});

// initialize code called once per entity
MouseInput.prototype.initialize = function() {
    this.orbitCamera = this.entity.script.orbitCamera;
    this.panAnchorPoint = new pc.Vec2(0,0);
    this.panVelocity = new pc.Vec3(0.0, 0.0, 0.0);
    this.dragAnchorPos = new pc.Vec3(0,0,0);
    this._wasPanning = false;
    this._wasDragging  = false;
        
    this.gameUtilities = this.app.root.findByName("GameUtilities").script.gameUtilities;
    this.gameLogics = this.app.root.findByName("GameLogics").script.gameLogics;
    if (this.orbitCamera) {
        var self = this;
        
        var onMouseOut = function (e) {
           self.onMouseOut(e);
        };
        
        this.app.mouse.on(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);
        this.app.mouse.on(pc.EVENT_MOUSEUP, this.onMouseUp, this);
        this.app.mouse.on(pc.EVENT_MOUSEMOVE, this.onMouseMove, this);
        this.app.mouse.on(pc.EVENT_MOUSEWHEEL, this.onMouseWheel, this);

        // Listen to when the mouse travels out of the window
        window.addEventListener('mouseout', onMouseOut, false);
        
        // Remove the listeners so if this entity is destroyed
        this.on('destroy', function() {
            this.app.mouse.off(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);
            this.app.mouse.off(pc.EVENT_MOUSEUP, this.onMouseUp, this);
            this.app.mouse.off(pc.EVENT_MOUSEMOVE, this.onMouseMove, this);
            this.app.mouse.off(pc.EVENT_MOUSEWHEEL, this.onMouseWheel, this);

            window.removeEventListener('mouseout', onMouseOut, false);
        });
    }
    
    // Disabling the context menu stops the browser displaying a menu when
    // you right-click the page
    this.app.mouse.disableContextMenu();
  
    this.lookButtonDown = false;
    this.panButtonDown = false;
    this.dragButtonDown = false;
    this.lastPoint = new pc.Vec2();
};


MouseInput.fromWorldPoint = new pc.Vec3();
MouseInput.toWorldPoint = new pc.Vec3();
MouseInput.worldDiff = new pc.Vec3();

MouseInput.prototype.pan = function(screenPoint) {
    var fromWorldPoint = MouseInput.fromWorldPoint;
    var toWorldPoint = MouseInput.toWorldPoint;
    if(!this._wasPanning) {
        this.panAnchorPoint = screenPoint;
        this.panVelocity.set(0, 0, 0);
    }

    const gameUtilities = this.gameUtilities;
    fromWorldPoint = gameUtilities.calculateScreenPosOnOrigoPlane(this.panAnchorPoint);
    toWorldPoint = gameUtilities.calculateScreenPosOnOrigoPlane(screenPoint);

    this.panEntity.setPosition(fromWorldPoint.x, fromWorldPoint.y, fromWorldPoint.z);

    this.panVelocity.sub2(toWorldPoint, fromWorldPoint);
    //Remove movement in Y-axis
    if(this.orbitCamera.lockToXZPlane)
        this.panVelocity = new pc.Vec3().sub2(this.panVelocity, new pc.Vec3(0, 1, 0).scale(this.panVelocity.dot(new pc.Vec3(0, 1, 0))));
    this._wasPanning = true;
 
};

MouseInput.prototype.drag = function(screenPoint) {
    //this.offsetCamera(screenPoint);
    //return;
    var fromWorldPoint = MouseInput.fromWorldPoint;
    var toWorldPoint = MouseInput.toWorldPoint;
    var worldDiff = MouseInput.worldDiff;
    
    const gameUtilities = this.gameUtilities;
    fromWorldPoint = gameUtilities.calculateScreenPosOnOrigoPlane(screenPoint);
    toWorldPoint = gameUtilities.calculateScreenPosOnOrigoPlane(this.lastPoint);

    if(!this._wasDragging) {
        this.dragAnchorPos = fromWorldPoint.clone();
    } 
       
    this.panEntity.setPosition( this.dragAnchorPos.x,  this.dragAnchorPos.y,  this.dragAnchorPos.z);
    //Drag
    worldDiff.sub2(toWorldPoint, fromWorldPoint);
    var length = worldDiff.length();
    
    //Remove movement in Y-axis
    if(this.orbitCamera.lockToXZPlane)
        worldDiff = new pc.Vec3().sub2(worldDiff, new pc.Vec3(0, 1, 0).scale(worldDiff.dot(new pc.Vec3(0, 1, 0))));
    
    worldDiff.normalize();
    worldDiff.scale(length*this.dragSensitivity);

    this.orbitCamera.pivotPoint.add(worldDiff);    
    this.orbitCamera.lookAtPoint.add(worldDiff);   

    //Make this inertia free
    this.orbitCamera._pivotPoint.add(worldDiff);    
    this.orbitCamera._lookAtPoint.add(worldDiff);   
    this._wasDragging = true;
};

MouseInput.prototype.offsetCamera = function(screenPoint) {
    //Screenspace offset
    var pX = this.orbitCamera.pivotOffsetX;
    pX += (this.lastPoint.x - screenPoint.x)*0.016;
    pX = pc.math.clamp(pX, -1, 1);
    var py = this.orbitCamera.pivotOffsetZ;
    py -=  (this.lastPoint.y - screenPoint.y)*0.016;
    py = pc.math.clamp(py, -1, 1);
    const u = (pX*-1+1)/2;
    const v = (py+1)/2;
    this.app.root.findByName("GameInterface").script.gameInterface.setCameraPlaneOffset(u, v);
    console.log(u.toFixed(2), v.toFixed(2));
};

MouseInput.prototype.update = function(dt) {
    if(this._wasPanning && this.gameLogics.isCursorInScreen) {
        const gameUtilities = this.gameUtilities;
        const anchorPos = gameUtilities.calculateScreenPosOnOrigoPlane(this.panAnchorPoint);
        this.panEntity.setPosition(anchorPos.x, anchorPos.y, anchorPos.z);
        
        const velocity = this.panVelocity.clone();
        const length = velocity.length()*0.75;
        const dir = velocity.normalize();
        const step = dir.mulScalar(dt*Math.min(1.0, length*length)*this.panSensitivity);
        this.orbitCamera.pivotPoint.add(step);    
        this.orbitCamera.lookAtPoint.add(step);    
    }  
    this.panEntity.enabled = this._wasPanning ;  

    //this.orbitCamera.inertiaFactor = this._wasDragging? 0.0: 0.2;
};


MouseInput.prototype.onMouseDown = function (event) {
    if(!this.gameLogics.isCursorInScreen)
        return;

    switch (event.button) {
        case pc.MOUSEBUTTON_LEFT: 
            this.dragButtonDown = true && this.orbitCamera.enableDragging;
            this.lookButtonDown = true && this.orbitCamera.enableRotation;
            break;
        case pc.MOUSEBUTTON_MIDDLE:
         this.lookButtonDown = true;
        break;
        case pc.MOUSEBUTTON_RIGHT: {
            this.panButtonDown = true;
        } break;
    }
};


MouseInput.prototype.onMouseUp = function (event) {
    switch (event.button) {
        case pc.MOUSEBUTTON_LEFT:
            this.lookButtonDown = false;

            this.dragButtonDown = false;
            this._wasDragging = false;
            break;
        case pc.MOUSEBUTTON_MIDDLE: 
            this.lookButtonDown = false;
        break;
        case pc.MOUSEBUTTON_RIGHT: {    
            this.panButtonDown = false; 
            this._wasPanning = false;      
        } break;
    }
};


MouseInput.prototype.onMouseMove = function (event) {    
    if (this.lookButtonDown) {
        this.orbitCamera.pitch -= event.dy * this.orbitSensitivity;
        this.orbitCamera.yaw -= event.dx * this.orbitSensitivity;
    }
    if (this.dragButtonDown)
        this.drag(event);   
    
    if (this.panButtonDown) 
        this.pan(event);   

    
    this.lastPoint.set(event.x, event.y);
};


MouseInput.prototype.onMouseWheel = function (event) {
    this.orbitCamera.distance -= event.wheel * this.distanceSensitivity * (this.orbitCamera.distance * 0.1);
    event.event.preventDefault();
};


MouseInput.prototype.onMouseOut = function (event) {
    this.lookButtonDown = false;
    this.panButtonDown = false;
};