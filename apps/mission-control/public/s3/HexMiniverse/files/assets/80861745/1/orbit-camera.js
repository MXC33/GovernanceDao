var OrbitCamera = pc.createScript('orbitCamera');

OrbitCamera.attributes.add('autoRender', {
    type: 'boolean', 
    default: true, 
    title: 'Auto Render', 
    description: 'Disable to only render when camera is moving (saves power when the camera is still)'
});
OrbitCamera.attributes.add('mapBounds', {type: 'number', default: 10, min: 5, max:100});

OrbitCamera.attributes.add('distanceMax', {type: 'number', default: 0, title: 'Distance Max', description: 'Setting this at 0 will give an infinite distance limit'});
OrbitCamera.attributes.add('distanceMin', {type: 'number', default: 0, title: 'Distance Min'});
OrbitCamera.attributes.add('pitchAngleMax', {type: 'number', default: 90, title: 'Pitch Angle Max (degrees)'});
OrbitCamera.attributes.add('pitchAngleMin', {type: 'number', default: -90, title: 'Pitch Angle Min (degrees)'});
OrbitCamera.attributes.add("pivotOffsetY", {type: 'number', default: 0, min: -10, max: 10, title: "World Offset Height"});


OrbitCamera.attributes.add('inertiaFactor', {
    type: 'number',
    default: 0,
    title: 'Inertia Factor',
    description: 'Higher value means that the camera will continue moving after the user has stopped dragging. 0 is fully responsive.'
});

OrbitCamera.attributes.add('cameraEntity', {
    type: 'entity',
    title: 'Camera Entity',
    description: 'Entity that holds the camera component'
});

OrbitCamera.attributes.add('focusEntity', {
    type: 'entity',
    title: 'Focus Entity',
    description: 'Entity for the camera to focus on. If blank, then the camera will use the whole scene'
});

OrbitCamera.attributes.add('frameOnStart', {
    type: 'boolean',
    default: true,
    title: 'Frame on Start',
    description: 'Frames the entity or scene at the start of the application."'
});

OrbitCamera.attributes.add('enableRotation', {
    type: 'boolean', 
    default: false, 
    title: 'Enable Rotation', 
});

OrbitCamera.attributes.add('enablePanning', {
    type: 'boolean', 
    default: true, 
    title: 'Enable Panning', 
});

OrbitCamera.attributes.add('enableDragging', {
    type: 'boolean', 
    default: true, 
    title: 'Enable Dragging', 
});

OrbitCamera.attributes.add('lockToXZPlane', {
    type: 'boolean', 
    default: true, 
    title: 'Lock panning to XZ plane',              
});

// Property to get and set the distance between the pivot point and camera
// Clamped between this.distanceMin and this.distanceMax
Object.defineProperty(OrbitCamera.prototype, "distance", {
    get: function() {
        return this._targetDistance;
    },

    set: function(value) {
        this._targetDistance = this._clampDistance(value);
    }
});


// Property to get and set the pitch of the camera around the pivot point (degrees)
// Clamped between this.pitchAngleMin and this.pitchAngleMax
// When set at 0, the camera angle is flat, looking along the horizon
Object.defineProperty(OrbitCamera.prototype, "pitch", {
    get: function() {
        return this._targetPitch;
    },

    set: function(value) {
        this._targetPitch = this._clampPitchAngle(value);
    }
});


// Property to get and set the yaw of the camera around the pivot point (degrees)
Object.defineProperty(OrbitCamera.prototype, "yaw", {
    get: function() {
        return this._targetYaw;
    },

    set: function(value) {
        this._targetYaw = value;

        // Ensure that the yaw takes the shortest route by making sure that 
        // the difference between the targetYaw and the actual is 180 degrees
        // in either direction
        var diff = this._targetYaw - this._yaw;
        var reminder = diff % 360;
        if (reminder > 180) {
            this._targetYaw = this._yaw - (360 - reminder);
        } else if (reminder < -180) {
            this._targetYaw = this._yaw + (360 + reminder);
        } else {
            this._targetYaw = this._yaw + reminder;
        }
    }
});

// Property to get and set the yaw of the camera around the pivot point (degrees)
/*Object.defineProperty(OrbitCamera.prototype, "worldYaw", {
    get: function() {
        return this._targetWorldYaw;
    },

    set: function(value) {
        this._targetWorldYaw = value;

        // Ensure that the yaw takes the shortest route by making sure that 
        // the difference between the targetYaw and the actual is 180 degrees
        // in either direction
        var diff = this._targetWorldYaw - this._worldYaw;
        var reminder = diff % 360;
        if (reminder > 180) {
            this._targetWorldYaw = this._worldYaw - (360 - reminder);
        } else if (reminder < -180) {
            this._targetWorldYaw = this._worldYaw + (360 + reminder);
        } else {
            this._targetWorldYaw = this._worldYaw + reminder;
        }
    }
});*/


// Property to get and set the world position of the pivot point that the camera orbits around
Object.defineProperty(OrbitCamera.prototype, "pivotPoint", {
    get: function() {
        return this._targetPivotPoint;
    },

    set: function(value) {
        return this._targetPivotPoint.copy(value);
    }
});

// Property to get and set the world position of the pivot point that the camera orbits around
Object.defineProperty(OrbitCamera.prototype, "lookAtPoint", {
    get: function() {
        return this._targetLookAtPoint;
    },

    set: function(value) {
        return this._targetLookAtPoint.copy(value);
    }
});

Object.defineProperty(OrbitCamera.prototype, "screenSpaceOrigo", {
    get: function() {
        return this._targetScreenSpaceOrigo;
    },

    set: function(value) {
        return this._targetScreenSpaceOrigo.copy(value);
    }
});




// Moves the camera to look at an entity and all its children so they are all in the view
OrbitCamera.prototype.focus = function (focusEntity) {
    // Calculate an bounding box that encompasses all the models to frame in the camera view
    this._buildAabb(focusEntity, 0);

    var halfExtents = this._modelsAabb.halfExtents;

    //this._removeInertia();
    this._targetPivotPoint= focusEntity.getPosition().clone();//(this._modelsAabb.center);
};


OrbitCamera.distanceBetween = new pc.Vec3();

// Set the camera position to a world position and look at a world position
// Useful if you have multiple viewing angles to swap between in a scene
OrbitCamera.prototype.resetAndLookAtPoint = function (resetPoint, lookAtPoint) {
    this.pivotPoint.copy(lookAtPoint);
    this.entity.setPosition(resetPoint);

    this.entity.lookAt(lookAtPoint);

    var distance = OrbitCamera.distanceBetween;
    distance.sub2(lookAtPoint, resetPoint);
    this.distance = distance.length();

    this.pivotPoint.copy(lookAtPoint);

    var cameraQuat = this.entity.getRotation();
    this.yaw = this._calcYaw(cameraQuat);
    this.pitch = this._calcPitch(cameraQuat, this.yaw);

    this._removeInertia();
    this._updatePosition();

    if (!this.autoRender) {
        this.app.renderNextFrame = true;
    }
};


// Set camera position to a world position and look at an entity in the scene
// Useful if you have multiple models to swap between in a scene
OrbitCamera.prototype.resetAndLookAtEntity = function (resetPoint, entity) {
    this._buildAabb(entity, 0);
    this.resetAndLookAtPoint(resetPoint, this._modelsAabb.center);
};


// Set the camera at a specific, yaw, pitch and distance without inertia (instant cut)
OrbitCamera.prototype.reset = function (yaw, pitch, distance) {
    this.pitch = pitch;
    this.yaw = yaw;
    this.distance = distance;

    this._removeInertia();
    this._distance = this._targetDistance;  
    if (!this.autoRender) {
        this.app.renderNextFrame = true;
    }
};

/////////////////////////////////////////////////////////////////////////////////////////////
// Private methods

OrbitCamera.prototype.initialize = function () {
    this.gameUtilities = this.app.root.findByName("GameUtilities").script.gameUtilities;
    this.camera = this.cameraEntity.camera;
    this._checkAspectRatio();

    // Find all the models in the scene that are under the focused entity
    this._modelsAabb = new pc.BoundingBox();
    this._buildAabb(this.focusEntity || this.app.root, 0);

    this.entity.lookAt(this._modelsAabb.center);



    this.velocity = new pc.Vec3(0, 0, 0);
    this._pivotPoint = new pc.Vec3();
    this._pivotPoint.copy(this._modelsAabb.center);
    this._targetPivotPoint = new pc.Vec3();
    this._targetPivotPoint.copy(this._modelsAabb.center);

    this._lookAtPoint = new pc.Vec3(0, 0, 0);
    this._targetLookAtPoint = new pc.Vec3(0, 0, 0);

    this._targetScreenSpaceOrigo = new pc.Vec2(0.5, 0.5);
    this._screenSpaceOrigo = new pc.Vec2(0.5, 0.5);
    this._pitchOffset = 0.0;

    // Calculate the camera euler angle rotation around x and y axes
    // This allows us to place the camera at a particular rotation to begin with in the scene
    var cameraQuat = this.entity.getRotation();

    // Preset the camera
    this._yaw = this._calcYaw(cameraQuat);
    //this._worldYaw = this.calcWorldYaw(this._pivotPoint);
    this._pitch = this._clampPitchAngle(this._calcPitch(cameraQuat, this._yaw));
    this.entity.setLocalEulerAngles(this._pitch, this._yaw , 0);

    this._distance = 7.0;
    this._targetDistance = 7.0;

    this._targetYaw = this._yaw;
    //this._targetWorldYaw = this._yaw;
    this._targetPitch = this._pitch;

    // If we have ticked focus on start, then attempt to position the camera where it frames
    // the focused entity and move the pivot point to entity's position otherwise, set the distance
    // to be between the camera position in the scene and the pivot point
    if (this.frameOnStart) {
        this.focus(this.focusEntity || this.app.root);
    } else {
        var distanceBetween = new pc.Vec3();
        distanceBetween.sub2(this.entity.getPosition(), this._pivotPoint);
        this._distance = this._clampDistance(distanceBetween.length());
    }

    this._targetDistance = this._distance;

    this._autoRenderDefault = this.app.autoRender;

    // Do not enable autoRender if it's already off as it's controlled elsewhere
    if (this.app.autoRender) {
        this.app.autoRender = this.autoRender;
    }

    if (!this.autoRender) {
        this.app.renderNextFrame = true;
    }

    this.on('attr:autoRender', function (value, prev) {
        this.app.autoRender = value;
        if (!this.autoRender) {
            this.app.renderNextFrame = true;
        }
    }, this);

    // Reapply the clamps if they are changed in the editor
    this.on('attr:distanceMin', function (value, prev) {
        this._targetDistance = this._clampDistance(this._distance);
    }, this);

    this.on('attr:distanceMax', function (value, prev) {
        this._targetDistance = this._clampDistance(this._distance);
    }, this);

    this.on('attr:pitchAngleMin', function (value, prev) {
        this._targetPitch = this._clampPitchAngle(this._pitch);
    }, this);

    this.on('attr:pitchAngleMax', function (value, prev) {
        this._targetPitch = this._clampPitchAngle(this._pitch);
    }, this);

    // Focus on the entity if we change the focus entity
    this.on('attr:focusEntity', function (value, prev) {
        if (this.frameOnStart) {
            this.focus(value || this.app.root);
        } else {
            this.resetAndLookAtEntity(this.entity.getPosition(), value || this.app.root);
        }
    }, this);

    this.on('attr:frameOnStart', function (value, prev) {
        if (value) {
            this.focus(this.focusEntity || this.app.root);
        }
    }, this);

    var onResizeCanvas = function () {
        this._checkAspectRatio();
        if (!this.autoRender) {
            this.app.renderNextFrame = true;
        }
    };

    this.app.graphicsDevice.on('resizecanvas', onResizeCanvas, this);

    this.on('destroy', function() {
        this.app.graphicsDevice.off('resizecanvas', onResizeCanvas, this);
        this.app.autoRender = this._defaultAutoRender;
    }, this);
};


OrbitCamera.prototype.update = function(dt) {
    // Check if we have are still moving for autorender
    if (!this.autoRender) {
        var distanceDiff = Math.abs(this._targetDistance - this._distance);
        var yawDiff = Math.abs(this._targetYaw - this._yaw);
        var pitchDiff = Math.abs(this._targetPitch - this._pitch);

        this.app.renderNextFrame = this.app.renderNextFrame || distanceDiff > 0.01 || yawDiff > 0.01 || pitchDiff > 0.01;
    }

    //Clamp pivot point within game bounds
    const mapBounds = this.mapBounds;
    var distFromOrigo = this._targetPivotPoint.length();
    this._targetPivotPoint = this._targetPivotPoint.normalize().mulScalar(Math.min(distFromOrigo, mapBounds));
    distFromOrigo = this._targetLookAtPoint.length();
    this._targetLookAtPoint = this._targetLookAtPoint.normalize().mulScalar(Math.min(distFromOrigo, mapBounds));
    

    var t = this.inertiaFactor === 0 ? 1 : Math.min(dt / this.inertiaFactor, 1);

    this._lookAtPoint = new pc.Vec3().lerp(this._lookAtPoint, this._targetLookAtPoint, t);
    this._pivotPoint = new pc.Vec3().lerp(this._pivotPoint, this._targetPivotPoint, t);
    this._distance = pc.math.lerp(this._distance, this._targetDistance, t);
    this._screenSpaceOrigo = new pc.Vec3().lerp(this._screenSpaceOrigo, this._targetScreenSpaceOrigo, t);


    this._yaw = pc.math.lerp(this._yaw, this._targetYaw, t);
    this._pitch = pc.math.lerp(this._pitch, this._targetPitch, t);

    this._updatePosition(dt);

};

OrbitCamera.prototype.calcWorldYaw = function(point) {
    return Math.atan2(point.x, point.z)*180.0/Math.PI;
};

OrbitCamera.prototype._updatePosition = function (dt) {
    this.entity.setLocalPosition(0,0,0);
    this.entity.setLocalEulerAngles(this._pitch, this._yaw, 0);

    //Calculate world offset vector from screenspace offset
    const gameUtilities = this.gameUtilities;
    const canvas = this.app.graphicsDevice.canvas;
    const cw = parseInt(canvas.clientWidth, 10);//this.app.graphicsDevice.width;
    const ch = parseInt(canvas.clientHeight, 10);//this.app.graphicsDevice.height;
    const viewSpaceOrigo = new pc.Vec2((1.0-this._screenSpaceOrigo.x)*cw, (1.0-this._screenSpaceOrigo.y)*ch);//new pc.Vec2(cw*(this.pivotOffsetX +1)/2, ch*(1 - this.pivotOffsetZ)/2);
    const planePos = this.entity.getPosition().clone().add(this.entity.forward.clone().mulScalar(this._distance));
    const center = gameUtilities.calculateScreenPosOnPlane(new pc.Vec2(cw*0.5, ch*0.5), planePos, this.entity.forward);
    const offsetPoint = gameUtilities.calculateScreenPosOnPlane(viewSpaceOrigo, planePos, this.entity.forward);
    
    if(offsetPoint == null || center == null){
        //console.log("offsetPoint == " + offsetPoint + " || center == " + center);
        return;
    }
    
    const offsetVector = new pc.Vec3().sub2(offsetPoint, center);

    //Clamp pitch dependent on the offset
    if(Math.abs(this._screenSpaceOrigo.y-0.5) > 1e-6) {
        const cameraToOffsetDir = this.entity.getPosition().clone().sub(offsetPoint);
        cameraToOffsetDir.sub(this.entity.right.clone().mulScalar(this.entity.right.dot(cameraToOffsetDir)));
        cameraToOffsetDir.normalize();
        const offsetAngle = 180.0 - Math.acos(cameraToOffsetDir.dot(this.entity.forward))*pc.math.RAD_TO_DEG;
        this._pitchOffset = offsetAngle;
        this._targetPitch = this._clampPitchAngle(this._targetPitch);
    } else {
        this._pitchOffset = 0.0;
    }

    var position = this.entity.getPosition();
    position.copy(this.entity.forward);
    position.mulScalar(-this._distance);
    if(this.camera.projection == pc.PROJECTION_ORTHOGRAPHIC) {
       this.camera.orthoHeight = this.distance;
    }
    
    //Offset camera height "World space, i.e. pix height"
    const offsetVectorY = new pc.Vec3(0, 1, 0).mulScalar(this.pivotOffsetY);
    offsetVector.add(offsetVectorY);

    position.add(this._pivotPoint);
    position.add(offsetVector);
    this.entity.setPosition(position);
    
    var lookAt = new pc.Vec3();
    lookAt.copy(this._lookAtPoint);
    lookAt.add(offsetVector);
    this.offsetVector = offsetVector;
    this.entity.lookAt(lookAt, this.entity.up);
};


OrbitCamera.prototype._removeInertia = function () {
    this._yaw = this._targetYaw;
    this._pitch = this._targetPitch;
    this._distance = this._targetDistance;
    this._targetPivotPoint = this._pivotPoint;
    this.velocity.set(0, 0, 0);
};


OrbitCamera.prototype._checkAspectRatio = function () {
    var height = this.app.graphicsDevice.height;
    var width = this.app.graphicsDevice.width;

    // Match the axis of FOV to match the aspect ratio of the canvas so
    // the focused entities is always in frame
    this.camera.horizontalFov = height > width;
};


OrbitCamera.prototype._buildAabb = function (entity, modelsAdded) {
    var i = 0, j = 0, meshInstances;
    
    if (entity instanceof pc.Entity) {
        var allMeshInstances = [];
        var renders = entity.findComponents('render');

        for (i = 0; i < renders.length; ++i) {
            meshInstances = renders[i].meshInstances;
            for (j = 0; j < meshInstances.length; j++) {
                allMeshInstances.push(meshInstances[j]);
            }
        }  

        var models = entity.findComponents('model');
        for (i = 0; i < models.length; ++i) {
            meshInstances = models[i].meshInstances;
            for (j = 0; j < meshInstances.length; j++) {
                allMeshInstances.push(meshInstances[j]);
            }
        }  

        for (i = 0; i < allMeshInstances.length; i++) {
            if (modelsAdded === 0) {
                this._modelsAabb.copy(allMeshInstances[i].aabb);
            } else {
                this._modelsAabb.add(allMeshInstances[i].aabb);
            }

            modelsAdded += 1;
        }
    }

    for (i = 0; i < entity.children.length; ++i) {
        modelsAdded += this._buildAabb(entity.children[i], modelsAdded);
    }

    return modelsAdded;
};


OrbitCamera.prototype._calcYaw = function (quat) {
    var transformedForward = new pc.Vec3();
    quat.transformVector(pc.Vec3.FORWARD, transformedForward);

    return Math.atan2(-transformedForward.x, -transformedForward.z) * pc.math.RAD_TO_DEG;
};


OrbitCamera.prototype._clampDistance = function (distance) {
    if (this.distanceMax > 0) {
        return pc.math.clamp(distance, this.distanceMin, this.distanceMax);
    } else {
        return Math.max(distance, this.distanceMin);
    }
};


OrbitCamera.prototype._clampPitchAngle = function (pitch) {
    // Negative due as the pitch is inversed since the camera is orbiting the entity
    return pc.math.clamp(pitch, -(this.pitchAngleMax), -(this.pitchAngleMin + this._pitchOffset));
};


OrbitCamera.quatWithoutYaw = new pc.Quat();
OrbitCamera.yawOffset = new pc.Quat();

OrbitCamera.prototype._calcPitch = function(quat, yaw) {
    var quatWithoutYaw = OrbitCamera.quatWithoutYaw;
    var yawOffset = OrbitCamera.yawOffset;

    yawOffset.setFromEulerAngles(0, -yaw, 0);
    quatWithoutYaw.mul2(yawOffset, quat);

    var transformedForward = new pc.Vec3();

    quatWithoutYaw.transformVector(pc.Vec3.FORWARD, transformedForward);

    return Math.atan2(transformedForward.y, -transformedForward.z) * pc.math.RAD_TO_DEG;
};