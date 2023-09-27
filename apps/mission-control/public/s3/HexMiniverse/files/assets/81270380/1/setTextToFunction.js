var SetTexToToFunction = pc.createScript('setTextToFunction');

SetTexToToFunction.attributes.add('scriptEntity', {
    type: 'entity',
    description: 'The entity we want to call a script on'
});
SetTexToToFunction.attributes.add('scriptName', {type: 'string', description: "The name of the script", default: "gameInterface"});

SetTexToToFunction.attributes.add('functionName', {type: 'string', description: "The name of the function", default: "getLol"});

// initialize code called once per entity
SetTexToToFunction.prototype.initialize = function() {

};


// update code called every frame
SetTexToToFunction.prototype.update = function(dt) {
    this.entity.element.text = this.scriptEntity.script.get(this.scriptName)[this.functionName]();
};
