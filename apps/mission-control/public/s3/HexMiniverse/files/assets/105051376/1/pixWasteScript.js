var PixWasteScript = pc.createScript('pixWasteScript');

PixWasteScript.attributes.add('lootFlyerManager', {
    type: 'entity',
    default: null, 
    title: 'Loot Flyer Manager'
});

PixWasteScript.attributes.add('entitysToFind', {
    type: 'string',
    default: ["Waste0", "Waste1", "Waste2"],
    array: true
});



// initialize code called once per entity
PixWasteScript.prototype.initialize = function() {
    this.wasteEntities = [];

    var i = 0;
    for(i = 0; i < this.entitysToFind.length; i++){
        this.wasteEntities.push(this.entity.findByName(this.entitysToFind[i]));
    }
    for(i = 0; i < this.wasteEntities.length; i++){
        this.wasteEntities.enabled = false;
    }
    //This is so ugly
    /*this.wasteEntities.push(this.entity.findByName("Waste0"));
    this.wasteEntities.push(this.entity.findByName("Waste1"));
    this.wasteEntities.push(this.entity.findByName("Waste2"));*/

};

PixWasteScript.prototype.getLastWaste = function() {
    for(var i = 2; i >= 0; i--) {
        if(this.wasteEntities[i].enabled)
            return this.wasteEntities[i];
    }
    return null;
};

PixWasteScript.prototype.pickWaste = function() {
    const canvas = this.app.graphicsDevice.canvas;
    const canvasWidth = parseInt(canvas.clientWidth, 10);
    const canvasHeight = parseInt(canvas.clientHeight, 10);
    const lastWasteEntity = this.getLastWaste();
    if(lastWasteEntity) {
       this.lootWaste(lastWasteEntity.children[0].getPosition().clone(), 1, canvasWidth, canvasHeight);
    }
};

PixWasteScript.prototype.lootWaste = function(position, number, screenX, screenY) {
    this.lootFlyerManager.script.lootFlyerManager.lootWaste(position, number, screenX, screenY);
};

PixWasteScript.prototype.setWaste = function(waste) {
     for(var i = 0; i < 3; i++) {
        this.wasteEntities[i].enabled = waste >= i + 1; 
    }  
};
