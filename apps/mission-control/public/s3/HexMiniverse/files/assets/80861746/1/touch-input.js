var TouchInput = pc.createScript('touchInput');

TouchInput.attributes.add('orbitSensitivity', {
    type: 'number', 
    default: 0.4, 
    title: 'Orbit Sensitivity', 
    description: 'How fast the camera moves around the orbit. Higher is faster'
});

TouchInput.attributes.add('distanceSensitivity', {
    type: 'number', 
    default: 0.2, 
    title: 'Distance Sensitivity', 
    description: 'How fast the camera moves in and out. Higher is faster'
});

TouchInput.attributes.add('dragSensitivity', {
    type: 'number', 
    default: 1.0, 
    title: 'Drag Sensitivity', 
});

// initialize code called once per entity
TouchInput.prototype.initialize = function() {
    this.orbitCamera = this.entity.script.orbitCamera;
    this.dragAnchorPos = new pc.Vec3(0,0,0);
    this._wasDragging = false;
    
    // Store the position of the touch so we can calculate the distance moved
    this.lastTouchPoint = new pc.Vec2();
    this.lastPinchMidPoint = new pc.Vec2();
    this.lastPinchDistance = 0;
    this.lastPinchAngle = 0;
    
    if (this.orbitCamera && this.app.touch) {
        // Use the same callback for the touchStart, touchEnd and touchCancel events as they 
        // all do the same thing which is to deal the possible multiple touches to the screen
        this.app.touch.on(pc.EVENT_TOUCHSTART, this.onTouchStartEndCancel, this);
        this.app.touch.on(pc.EVENT_TOUCHEND, this.onTouchStartEndCancel, this);
        this.app.touch.on(pc.EVENT_TOUCHCANCEL, this.onTouchStartEndCancel, this);
        
        this.app.touch.on(pc.EVENT_TOUCHMOVE, this.onTouchMove, this);
        
        this.on('destroy', function() {
            this.app.touch.off(pc.EVENT_TOUCHSTART, this.onTouchStartEndCancel, this);
            this.app.touch.off(pc.EVENT_TOUCHEND, this.onTouchStartEndCancel, this);
            this.app.touch.off(pc.EVENT_TOUCHCANCEL, this.onTouchStartEndCancel, this);

            this.app.touch.off(pc.EVENT_TOUCHMOVE, this.onTouchMove, this);
        });
    }
};


TouchInput.prototype.getPinchDistance = function (pointA, pointB) {
    // Return the distance between the two points
    var dx = pointA.x - pointB.x;
    var dy = pointA.y - pointB.y;    
    
    return Math.sqrt((dx * dx) + (dy * dy));
};

TouchInput.prototype.getPinchAngle = function (pointA, pointB) {
    // Return the euclidean angle of the vector between the two points 
    var dx = pointA.x - pointB.x;
    var dy = pointA.y - pointB.y;    
    
    return Math.atan2(dy, dx);
};

TouchInput.prototype.getMidPoint = function (pointA, pointB) {
    return new pc.Vec2((pointB.x + pointA.x)/2.0, (pointA.y + pointB.y)/2.0);
};


TouchInput.prototype.onTouchStartEndCancel = function(event) {
    // We only care about the first touch for camera rotation. As the user touches the screen, 
    // we stored the current touch position
    var touches = event.touches;
    if (touches.length == 1) {
        this._wasDragging = false;
        this.lastTouchPoint.set(touches[0].x, touches[0].y);
    
    } else if (touches.length == 2) {
        this._wasDragging = false;
        // If there are 2 touches on the screen, then set the pinch distance
        this.lastPinchDistance = this.getPinchDistance(touches[0], touches[1]);
        this.lastPinchAngle = this.getPinchAngle(touches[0], touches[1]);
        this.lastPinchMidPoint = this.getMidPoint(touches[0], touches[1]);
    }
};


TouchInput.fromWorldPoint = new pc.Vec3();
TouchInput.toWorldPoint = new pc.Vec3();
TouchInput.worldDiff = new pc.Vec3();


TouchInput.prototype.drag = function(screenPoint) {
    var fromWorldPoint = TouchInput.fromWorldPoint;
    var toWorldPoint = TouchInput.toWorldPoint;
    var worldDiff = TouchInput.worldDiff;
    
    const gameUtilities = this.app.root.findByName("GameUtilities").script.gameUtilities;
    fromWorldPoint = gameUtilities.calculateScreenPosOnOrigoPlane(screenPoint);
    toWorldPoint = gameUtilities.calculateScreenPosOnOrigoPlane(this.lastTouchPoint);

    if(!this._wasDragging) {
        this.dragAnchorPos = fromWorldPoint.clone();
    } 
       
    //this.panEntity.setPosition( this.dragAnchorPos.x,  this.dragAnchorPos.y,  this.dragAnchorPos.z);
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


TouchInput.prototype.onTouchMove = function(event) {
    // We only care about the first touch for camera rotation. Work out the difference moved since the last event
    // and use that to update the camera target position 
    var touches = event.touches;
    if (touches.length == 1) {
        var touch = touches[0];
        if(this.orbitCamera.enableRotation) {
            this.orbitCamera.pitch -= (touch.y - this.lastTouchPoint.y) * this.orbitSensitivity;
            this.orbitCamera.yaw -= (touch.x - this.lastTouchPoint.x) * this.orbitSensitivity;
        } 
        
        if(this.orbitCamera.enableDragging) {
            this.drag(touch);
        }
        this.lastTouchPoint.set(touch.x, touch.y);
    } else if (touches.length == 2) {
        // Calculate the difference in pinch distance since the last event
        var currentPinchDistance = this.getPinchDistance(touches[0], touches[1]);
        var diffInPinchDistance = currentPinchDistance - this.lastPinchDistance;
        this.lastPinchDistance = currentPinchDistance;
        this.orbitCamera.distance -= (diffInPinchDistance * this.distanceSensitivity * 0.1) * (this.orbitCamera.distance * 0.1);

        // Calculate the difference in yaw angle since the last event
        var currentPinchAngle = this.getPinchAngle(touches[0], touches[1]);
        var diffInPinchAngle = currentPinchAngle - this.lastPinchAngle;
        this.lastPinchAngle = currentPinchAngle;
        this.orbitCamera.yaw += diffInPinchAngle*pc.math.RAD_TO_DEG;
        
        // Calculate the difference in yaw angle since the last event
        var currentMidPoint = this.getMidPoint(touches[0], touches[1]);
        var diffInPinchMidPoint = new pc.Vec2().sub2(currentMidPoint, this.lastPinchMidPoint);
        this.lastPinchMidPoint = currentMidPoint;
        this.orbitCamera.pitch -= diffInPinchMidPoint.y;
        this.orbitCamera.yaw -= diffInPinchMidPoint.x*0.5;
    }
};
