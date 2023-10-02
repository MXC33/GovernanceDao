var EnabledEntitysWithTag = pc.createScript('enabledEntitysWithTag');
EnabledEntitysWithTag.attributes.add('string', {
    type: "string",
    default: "facilityParticals"
})

// initialize code called once per entity
EnabledEntitysWithTag.prototype.initialize = function() {
    
};

// update code called every frame
EnabledEntitysWithTag.prototype.update = function(dt) {

};

EnabledEntitysWithTag.prototype.deHighLight = function() {
    this.entitys = this.entity.findByTag(this.string);
    this.entitys.forEach(e => {
        e.enabled = false;
    })
};

EnabledEntitysWithTag.prototype.highLight = function() {
    this.enabledEntityByIndex(this.index);
};

EnabledEntitysWithTag.prototype.enabledEntityByIndex = function(index) {
    this.entitys = this.entity.findByTag(this.string);
    index = Math.max(0, Math.min(index, this.entitys.length))
    this.index = index;
    //console.log("enabledEntityByIndex = " + index);

    if(this.entitys.length < index){
        console.log("index is larger than array");
        return;
    }
        

    this.entitys.forEach(e => {
        e.enabled = false;
    })

    if(this.entitys[index] == null)
        return;

    this.entitys[index].enabled = true;
};

// swap method called for script hot-reloading
// inherit your script state here
// EnabledEntitysWithTag.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/