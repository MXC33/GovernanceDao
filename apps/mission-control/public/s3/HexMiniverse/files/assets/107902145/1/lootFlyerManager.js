var LootFlyerManager = pc.createScript('lootFlyerManager');

LootFlyerManager.attributes.add('lootFlyerProto', {
    type: 'entity',
    default: null, 
    title: 'Loot Flyer Entity'
});

LootFlyerManager.attributes.add('flyingLootListEntity', {
    type: 'entity',
    default: null, 
    title: 'Flying Loot List Entity'
});

LootFlyerManager.attributes.add('cameraEntity', {
    type: 'entity',
    default: null, 
    title: 'Camera Entity'
});

LootFlyerManager.attributes.add('diameter', {
    type: 'number',
    default: 0.1,
    min: 0.01,
    max: 1.0, 
    title: 'Diameter'
});

LootFlyerManager.attributes.add('forceFactor', {
    type: 'number',
    default: 0.1,
    min: 0.0,
    max: 0.2, 
    title: 'Force Factor'
});

LootFlyerManager.attributes.add('springFactor', {
    type: 'number',
    default: 0.1,
    min: 0.0,
    max: 10.0, 
    title: 'Spring Factor'
});

// initialize code called once per entity
LootFlyerManager.prototype.initialize = function() {

};

LootFlyerManager.prototype.lootWaste = function(position, number, screenX, screenY) {
    const clone = this.lootFlyerProto.clone();
    this.flyingLootListEntity.addChild(clone);
    clone.enabled = true;
    clone.script.lootFlyer.startFly(position, number, screenX, screenY);
};

// update code called every frame
LootFlyerManager.prototype.update = function(dt) {
    const colliders = this.flyingLootListEntity.children.filter(e => e.enabled).map(e => e.children[0]);
    const camera = this.cameraEntity.camera;
    const diamater = this.diameter;
    const springFactor = this.springFactor;
    const forceFactor = this.forceFactor;
    
    const canvas = this.app.graphicsDevice.canvas;
    const sw = parseInt(canvas.clientWidth, 10);//this.app.graphicsDevice.width;
    const sh = parseInt(canvas.clientHeight, 10);//this.app.graphicsDevice.height;

    const up = this.cameraEntity.up;
    const right = this.cameraEntity.right;
    const forward = this.cameraEntity.forward;
    
    //This might look ugly: Using .set and .copy to re-use these variables
    //instead of allocationg new vectors on the heap all the time
    const wsUp = new pc.Vec3();
    const wsForward = new pc.Vec3();
    const wsRight = new pc.Vec3();
    const aLocalPos = new pc.Vec3();
    const bounds = new pc.Vec3();
    const forceVec = new pc.Vec3();


    /*colliders.forEach(a => {
        //Calculate A's screen space position and radius
        const ssPosA = camera.worldToScreen(a.getPosition());
        bounds.copy(up).mulScalar(diamater*a.getScale().y);
        const ssRadA = camera.worldToScreen(bounds.add(a.getPosition())).sub(ssPosA).length();

        wsRight.copy(right);
        wsForward.cross(right, pc.Vec3.UP);
        forceVec.set(0, 0, 0);

        //Force within screen bounds (if A is out of bounds)
        if(ssPosA.x - ssRadA < 0)
            forceVec.add(wsRight.scale((0.0 - (ssPosA.x - ssRadA))));
        else if(ssPosA.x + ssRadA> sw)
            forceVec.add(wsRight.scale((sw - (ssPosA.x + ssRadA))));
        if(ssPosA.y - ssRadA < 0)
            forceVec.add(wsForward.scale((0.0 - (ssPosA.y - ssRadA))));
        else if(ssPosA.y + ssRadA > sh)
            forceVec.add(wsForward.scale((sh - (ssPosA.y + ssRadA))));

        const magnitude = Math.min(10.0, Math.pow(forceVec.length()/10.0, 2.0));
        if(isFinite(magnitude) && magnitude > 0.0) {
            forceVec.normalize().mulScalar(magnitude*dt);
            a.translateLocal(forceVec);
        } else  {
            //If A is inside the screen, spring it towards its desired position
            aLocalPos.copy(a.getLocalPosition());
            a.translateLocal(aLocalPos.mulScalar(-springFactor*dt));
        }
    });*/
    
    //Do Collision
    colliders.forEach(a => {
        //Calculate A's screen space position and radius
        const ssPosA = camera.worldToScreen(a.getPosition());
        bounds.copy(up).mulScalar(diamater*a.getScale().y);
        const ssRadA =  camera.worldToScreen(bounds.add(a.getPosition())).sub(ssPosA).length();

        //Do collision check against all other flyters
        colliders.forEach(b => {
            if(a != b) {
                //Calculate B's screen space position and radius
                const ssPosB = camera.worldToScreen(b.getPosition());
                bounds.copy(up).mulScalar(diamater*b.getScale().y);
                const ssRadB = camera.worldToScreen(bounds.add(b.getPosition())).sub(ssPosB).length();

                //Do collision check
                const dist = ssPosB.sub(ssPosA);
                const l = dist.length();
                if(l < ssRadA + ssRadB) {
                    var overlap = Math.pow((ssRadA + ssRadB - l)/(ssRadA + ssRadB), 2.0);
       

                    //Transform overlapping screen space vector to world space
                    wsUp.set(up.x, up.y, up.z);
                    wsUp.mulScalar(pc.Vec3.UP.dot(dist));
                    wsRight.set(right.x, right.y, right.z);
                    wsRight.mulScalar(pc.Vec3.RIGHT.dot(dist));

                    //Apply force
                    b.translateLocal(wsUp.mulScalar(-dt*overlap*forceFactor));
                    b.translateLocal(wsRight.mulScalar(dt*overlap*forceFactor));
                }
            }
        });
    });

};
