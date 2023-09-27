var ToggleEntityEnableOnbuttonPush = pc.createScript('toggleEntityEnableOnbuttonPush');

ToggleEntityEnableOnbuttonPush.attributes.add('entityToEnable', {type: "entity", description: "entity to enable", default: null});
ToggleEntityEnableOnbuttonPush.attributes.add('entityToDisable', {type: "entity", description: "entity to disable", array: true});


// initialize code called once per entity
ToggleEntityEnableOnbuttonPush.prototype.initialize = function() {
    this.entity.button.on('click', function(event) {
        this.entityToEnable.enabled = !this.entityToEnable.enabled;
        for (var i = 0; i < this.entityToDisable.lenght; i++){
            this.entityToDisable[i].enabled = this.entityToDisable[i].disabled;
            console.log('How Many entities?' + this.entityToDisable.lenght);
        }
    }, this);
};

// update code called every frame
ToggleEntityEnableOnbuttonPush.prototype.update = function(dt) {
    
};