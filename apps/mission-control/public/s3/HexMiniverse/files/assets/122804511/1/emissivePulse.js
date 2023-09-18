var EmissivePulse = pc.createScript('emissivePulse');

EmissivePulse.attributes.add('useAbs', {
    type: 'boolean',
    default: false, 
    title: 'use Abs'
});

EmissivePulse.attributes.add('pulseSpeed', {
    type: 'number',
    default: 3, 
    title: 'Pulse Speed'
});

EmissivePulse.attributes.add('pulseRange', {
    type: 'number',
    default: 0.5, 
    title: 'Pulse Range'
});

EmissivePulse.attributes.add('startEmissiveIntensity', {
    type: 'number',
    default: 0.5, 
    title: 'Start Emissive Intensity'
});


// initialize code called once per entity
EmissivePulse.prototype.initialize = function() {
    this.t = 0.0;
};

// update code called every frame
EmissivePulse.prototype.update = function(dt) {
    // var material = this.entity.render.meshInstances[0].material;    
    // this.t += dt * this.pulseSpeed;

    // if(this.useAbs){
    //     material.emissiveIntensity = this.startEmissiveIntensity + Math.abs((Math.sin(this.t) * this.pulseRange));
    // }else{
    //     material.emissiveIntensity = this.startEmissiveIntensity + ((Math.sin(this.t) * this.pulseRange));
    // }

    //material.update(); 

    //New emmisive pulse update for more general usage
    this.t += dt * this.pulseSpeed;
    for (var i = 0; i < this.entity.render.meshInstances.length; i++){
        var material = this.entity.render.meshInstances[i].material; 
        if(this.useAbs){
            material.emissiveIntensity = this.startEmissiveIntensity + Math.abs((Math.sin(this.t) * this.pulseRange));
        } else{
            material.emissiveIntensity = this.startEmissiveIntensity + ((Math.sin(this.t) * this.pulseRange));
        }
        material.update();
    }

    /*var m1 = this.entity.render.meshInstances[0].material; 
    var m2 = this.entity.render.meshInstances[1].material; 
    var m3 = this.entity.render.meshInstances[2].material; 

    this.t += dt * this.pulseSpeed;

    if(this.useAbs){
        m1.emissiveIntensity = this.startEmissiveIntensity + Math.abs((Math.sin(this.t) * this.pulseRange));
        m2.emissiveIntensity = this.startEmissiveIntensity + Math.abs((Math.sin(this.t) * this.pulseRange));
        m3.emissiveIntensity = this.startEmissiveIntensity + Math.abs((Math.sin(this.t) * this.pulseRange));
    }else{
        m1.emissiveIntensity = this.startEmissiveIntensity + ((Math.sin(this.t) * this.pulseRange));
        m2.emissiveIntensity = this.startEmissiveIntensity + ((Math.sin(this.t) * this.pulseRange));
        m3.emissiveIntensity = this.startEmissiveIntensity + ((Math.sin(this.t) * this.pulseRange));
    }

    m1.update();
    m2.update();
    m3.update();*/
 
};

// swap method called for script hot-reloading
// inherit your script state here
// EmissivePulse.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/