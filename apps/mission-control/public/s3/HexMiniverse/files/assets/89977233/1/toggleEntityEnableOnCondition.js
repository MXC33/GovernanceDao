var ToggleEntityEnableOncondition = pc.createScript('toggleEntityEnableOncondition');

ToggleEntityEnableOncondition.attributes.add('scriptEntity', {
    type: 'entity',
    description: 'The entity we want to call a script on'
});
ToggleEntityEnableOncondition.attributes.add('scriptName', {type: 'string', description: "The name of the script", default: "gameInterface"});
ToggleEntityEnableOncondition.attributes.add('functionName', {type: 'string', description: "The name of the conditional function", default: "getLol"});

ToggleEntityEnableOncondition.attributes.add('targetEntity', {type: 'entity', description: "The entity to toggle enable", default: null});

// initialize code called once per entity
ToggleEntityEnableOncondition.prototype.initialize = function() {

};

// update code called every frame
ToggleEntityEnableOncondition.prototype.update = function(dt) {
    this.targetEntity.enabled = this.scriptEntity.script.get(this.scriptName)[this.functionName]();
};