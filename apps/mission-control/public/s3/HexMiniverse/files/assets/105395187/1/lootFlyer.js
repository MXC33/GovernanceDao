var LootFlyer = pc.createScript('lootFlyer');

/*const EaseFunctionType = {
    Linear: 0,
	EaseInQuad: 1,
	EaseOutQuad: 2,
	EaseInOutQuad: 3,
	EaseInCubic: 4,
	EaseOutCubic: 5,
	EaseInOutCubic: 6,
	EaseInQuart: 7,
	EaseOutQuart: 8,
	EaseInOutQuart: 9,
	EaseInQuint: 10,
	EaseOutQuint: 11,
	EaseInOutQuint: 12,
	EaseInSine: 13,
	EaseOutSine: 14,
	EaseInOutSine: 15,
	EaseInExpo: 16,
	EaseOutExpo: 17,
	EaseInOutExpo: 18,
	EaseInCirc: 19,
	EaseOutCirc: 20,
	EaseInOutCirc: 21,
	EaseInBack: 22,
	EaseOutBack: 23,
	EaseInOutBack: 24,
	EaseInElastic: 25,
	EaseOutElastic: 26,
	EaseInOutElastic: 27,
	EaseInBounce: 28,
	EaseOutBounce: 29,
	EaseInOutBounce: 30,
};*/
LootFlyer.attributes.add('cameraEntity', {
    type: 'entity',
    default: null, 
    title: 'Camera Entity'
});

LootFlyer.attributes.add('lootTextEntity', {
    type: 'entity',
    default: null, 
    title: 'Loot Text Entity'
});

LootFlyer.attributes.add('jumpHeight', {
    type: 'number',
    default: 1.25,
    min: 0.01,
    max: 3.0, 
    title: 'Jump Height'
});

LootFlyer.attributes.add('jumpTime', {
    type: 'number',
    default: 1.0,
    min: 0.01,
    max: 3.0, 
    title: 'Jump Time'
});

LootFlyer.attributes.add('jumpEase', {
    type: 'number',
    enum: Object.entries(EaseFunctionType).map(kvp => {var e = {}; e[kvp[0]] = kvp[1]; return e;}),
    default: 0,
    title: "Jump Ease Func"
});

LootFlyer.attributes.add('idleTime', {
    type: 'number',
    default: 1.0,
    min: 0.0,
    max: 3.0, 
    title: 'Idle Time'
});

LootFlyer.attributes.add('fadeTime', {
    type: 'number',
    default: 0.1,
    min: 0.0,
    max: 3.0, 
    title: 'Fade Time'
});

LootFlyer.attributes.add('fadeEase', {
    type: 'number',
    enum: Object.entries(EaseFunctionType).map(kvp => {var e = {}; e[kvp[0]] = kvp[1]; return e;}),
    default: 0,
    title: "Fade Ease Func"
});


// initialize code called once per entity
LootFlyer.prototype.initialize = function() {
    this.amount = 0;
    this.startPos = new pc.Vec3(0, 0, 0);
    this.endPos = new pc.Vec3(0, 0, 0 );
    this.t = 0.0;

};

LootFlyer.prototype.startFly = function(startPos, amount, screenX, screenY) {
    this.screenX = screenX;
    this.screenY = screenY;
    this.amount = amount;
    //this.lootTextEntity.element.text = "+" + this.amount.toFixed(0);
    this.startPos = startPos;//this.entity.getPosition().clone().add(new pc.Vec3(0.0, 0.5, 0.0));//lastWasteEntity.children[0].getPosition().clone();
    this.endPos = new pc.Vec3().add2(this.startPos, new pc.Vec3(0.0, this.jumpHeight, 0.0));
    this.entity.setPosition(this.startPos);
    this.t = 0.0;
};

// update code called every frame
LootFlyer.prototype.update = function(dt) {
    this.t += dt;
    const jumpTime = this.jumpTime;
    const idleTime = this.idleTime;
    const fadeTime = this.fadeTime;
    if(this.t <= jumpTime) {
        //Make the display jump up into the air
        const jt = this.t/jumpTime;
        const easedJt =  easeFunctionsArray[this.jumpEase](jt);//easeOutElastic(jt, 0.0, 1.0, jumpTime);
        this.entity.setPosition(new pc.Vec3().lerp(this.startPos, this.endPos, easedJt));
        this.entity.setLocalScale(1.0, 1.0, 1.0);
    } else if(this.t <= jumpTime + idleTime) {
        //Let the display idle for some time
        this.entity.setPosition(this.endPos);
        this.entity.setLocalScale(1.0, 1.0, 1.0);
    } else if(this.t <= jumpTime + idleTime + fadeTime) {
        //Travel to bottom right corner
        const camera = this.cameraEntity.camera;
        const cornerPos = camera.screenToWorld(this.screenX, this.screenY, camera.nearClip);
        const ft = (this.t - jumpTime - idleTime)/fadeTime;
        const easedFt = easeFunctionsArray[this.fadeEase](ft);//easeOutExpo(ft, 0.0, 1.0, fadeTime);
        this.entity.setPosition(new pc.Vec3().lerp(this.endPos, cornerPos, easedFt));
        this.entity.setLocalScale(1.0 - easedFt, 1.0 - easedFt, 1.0 - easedFt);
    } else {
        //Disappear
        this.entity.enabled = false;
        //this.entity.destroy(); //TODO: calling destroy causes errors in the mission control frontend...
    }
};
