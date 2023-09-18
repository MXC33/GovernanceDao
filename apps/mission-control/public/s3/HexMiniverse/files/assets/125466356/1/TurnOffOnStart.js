var TurnOffOnstart = pc.createScript('turnOffOnstart');

TurnOffOnstart.prototype.initialize = function() {
    this.entity.enabled = false;
};