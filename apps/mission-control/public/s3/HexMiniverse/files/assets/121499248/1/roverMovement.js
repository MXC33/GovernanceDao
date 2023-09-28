var RoverMovement = pc.createScript('roverMovement');

RoverMovement.attributes.add('moveSpeed', {
    type: 'number',
    default: 1,
});

RoverMovement.attributes.add('rotationSpeed', {
    type: 'number',
    default: 1,
});

RoverMovement.attributes.add('cornerPoints', {
    type: 'entity',
    array: true,
});



// define an array of corner positions for the hexagon
var hexagonCorners = [
    new pc.Vec3(2, 1, 0),
    new pc.Vec3(1, 1, 1.73),
    new pc.Vec3(-1, 1, 1.73),
    new pc.Vec3(-2, 1, 0),
    new pc.Vec3(-1, 1, -1.73),
    new pc.Vec3(1, 1, -1.73)
];

// initialize the current corner index and the target position and rotation
var currentCorner = 0;
var targetPosition = hexagonCorners[currentCorner];
var targetRotation = new pc.Quat().setFromEulerAngles(0, 60 * currentCorner, 0);

RoverMovement.prototype.initialize = function() {
    // initialize any variables or components needed
};

RoverMovement.prototype.update = function(dt) {

    // move the rover towards the target position and rotate it towards the target rotation
    this.entity.translate(targetPosition.clone().sub(this.entity.getPosition()).normalize().scale(this.moveSpeed * dt));
    this.entity.setRotation(this.entity.getRotation().slerp(targetRotation, this.rotationSpeed * dt));

    // if the rover has reached the target position, increment the current corner index and set a new target position and rotation
    if (this.entity.getPosition().distance(targetPosition) < 0.1) {
        currentCorner = (currentCorner + 1) % hexagonCorners.length;
        targetPosition = hexagonCorners[currentCorner];
        targetRotation = new pc.Quat().setFromEulerAngles(0, 60 * currentCorner, 0);
    }
};
