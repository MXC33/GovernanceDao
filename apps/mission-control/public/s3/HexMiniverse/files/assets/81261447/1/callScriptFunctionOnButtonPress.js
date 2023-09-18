var CallScriptFunctionOnbuttonPress = pc.createScript('callScriptFunctionOnbuttonPress');
CallScriptFunctionOnbuttonPress.attributes.add('scriptEntity', {
    type: 'entity',
    description: 'The entity we want to call a script on'
});
CallScriptFunctionOnbuttonPress.attributes.add('scriptName', {type: 'string', description: "The name of the script", default: "gameInterface"});
CallScriptFunctionOnbuttonPress.attributes.add('functionName', {type: 'string', description: "The name of the function", default: "printLol"});
CallScriptFunctionOnbuttonPress.attributes.add('parameters', {type: 'string', description: "parameters to the function", array: true,  default: []});


// initialize code called once per entity
CallScriptFunctionOnbuttonPress.prototype.initialize = function() {
    //console.log(this.parameters);

    this.entity.button.on('click', function(event) {
        if(this.parameters.length == 0) {
            this.scriptEntity.script.get(this.scriptName)[this.functionName]();
        } else if(this.parameters.length == 1) {
            this.scriptEntity.script.get(this.scriptName)[this.functionName](this.parameters[0]);
        } else if (this.parameters.length == 2) {
            this.scriptEntity.script.get(this.scriptName)[this.functionName](this.parameters[0], this.parameters[1]);
        } else if(this.parameters.length == 3) {
            this.scriptEntity.script.get(this.scriptName)[this.functionName](this.parameters[0], this.parameters[1], this.parameters[2]);
        } else if(this.parameters.length == 4) {
            this.scriptEntity.script.get(this.scriptName)[this.functionName](this.parameters[0], this.parameters[1], this.parameters[2], this.parameters[3]);
        } else if(this.parameters.length == 5) {
            this.scriptEntity.script.get(this.scriptName)[this.functionName](this.parameters[0], this.parameters[1], this.parameters[2], this.parameters[3], this.parameters[4]);
        } else if(this.parameters.length == 6) {
            this.scriptEntity.script.get(this.scriptName)[this.functionName](this.parameters[0], this.parameters[1], this.parameters[2], this.parameters[3], this.parameters[4], this.parameters[5]);
        }
    }, this);
};

// update code called every frame
CallScriptFunctionOnbuttonPress.prototype.update = function(dt) {
    
};