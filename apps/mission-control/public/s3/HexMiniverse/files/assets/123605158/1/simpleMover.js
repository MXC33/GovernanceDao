var SimpleMover = pc.createScript('simpleMover');

SimpleMover.attributes.add('speed', { type: 'number', default: 0.1 });
SimpleMover.attributes.add('distance', { type: 'number', default: 0.5 });
SimpleMover.attributes.add('duration', { type: 'number', default: 3 });
SimpleMover.attributes.add('waitTime', { type: 'number', default: 3 });

// initialize code called once per entity
SimpleMover.prototype.initialize = function() {
    this.entity.setEulerAngles(0, Math.random() * 360, 0); // Setting random rotation angle at start.

    var forward = this.entity.forward; // calculate forward vector based on rotation
    var distance = this.distance;
    //var speed = distance / this.duration; // calculate speed based on distance and duration
    this.savedPosition = this.entity.getLocalPosition().clone();
    this.startPosition = this.entity.getLocalPosition().clone(); // start position
    this.endPosition = this.startPosition.clone().add(forward.scale(distance)); // end position

    this.time = 0; // current time
    this.waitTimer = 0; // wait timer
    this.hasReachedEnd = false; // flag to check if the entity has reached the end position
    this.atStartPosition = true; // flag to check if the entity is at start position to start new loop.
};

SimpleMover.prototype.update = function(dt) {
    if (!this.hasReachedEnd) {
        // entity is moving towards end position
        this.time += dt;
        var t = this.time / this.duration; // calculate time factor
        var newPosition = new pc.Vec3().lerp(this.startPosition, this.endPosition, t); // interpolate position
        this.entity.setLocalPosition(newPosition); // set new position

        if (this.time >= this.duration) {
            // Entity has reached the end position, start wait timer
            this.hasReachedEnd = true;
            this.time = this.duration;
            this.waitTimer = 0;
        }
    } else if (this.isRotating) {
        // entity is rotating back to start position
        this.rotateTimer += dt;
        var t = this.rotateTimer / this.rotateTime; // calculate time factor
        var newRotation = new pc.Quat().slerp(this.rotationStart, this.rotationEnd, t); // interpolate rotation
        this.entity.setLocalRotation(newRotation); // set new rotation

        if (this.rotateTimer >= this.rotateTime) {
            // Rotation is complete, reset rotation flags and start moving back to start position
            this.isRotating = false;
            this.hasReachedEnd = false;
            this.time = 0;
            this.startPosition = this.entity.getLocalPosition().clone();
            var oppositeDirection = this.entity.forward.clone().scale(-1); // get the opposite direction of the entity's forward vector
            this.endPosition = this.startPosition.clone().add(oppositeDirection.scale(this.distance));

        }
    } else {
        // entity has reached start position, wait before starting again
        this.waitTimer += dt;

        if (this.waitTimer >= this.waitTime) {
            // Wait time is over, start moving towards end position
            this.hasReachedEnd = false;
            this.time = 0;
            this.startPosition = this.entity.getLocalPosition().clone();
            this.endPosition = this.savedPosition.clone(); // set end position to saved position

            // Start rotating the entity
            this.isRotating = true;
            this.rotateTimer = 0;
            this.rotationStart = this.entity.getLocalRotation().clone();
            this.rotationEnd = new pc.Quat().setFromEulerAngles(0, Math.random() * 360, 0);
            this.rotateTime = 5; // set rotation time to 5 seconds
        }
    }
};


