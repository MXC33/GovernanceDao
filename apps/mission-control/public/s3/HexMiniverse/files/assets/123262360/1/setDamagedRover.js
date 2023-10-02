var SetDamagedRover = pc.createScript('setDamagedRover');

SetDamagedRover.attributes.add('rover', { type: 'entity', default: null, title: 'Damaged Rover Model Entity' });
SetDamagedRover.attributes.add('spotlight', { type: 'entity', default: null, title: 'Spotlight Entity' });
SetDamagedRover.attributes.add('progressbar', { type: 'entity', default: null, title: 'Progressbar Entity' });

// initialize code called once per entity
SetDamagedRover.prototype.initialize = function() {
    this.rotator = this.entity.parent.script.simpleMoverNew;
    //console.log(this.rotator);
};

SetDamagedRover.prototype.activate = function (){
    this.rotator = this.entity.parent.script.simpleMoverNew;
    this.rover.enabled = true;
    this.rotator.enabled = false;
    this.spotlight.enabled = false;
    this.progressbar.enabled = false;
};

