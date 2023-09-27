var CircularProgressBar = pc.createScript('circularProgressBar');
CircularProgressBar.attributes.add('loadingEntity', {type: 'entity'});
CircularProgressBar.attributes.add('progressEntity', {type: 'entity'});
CircularProgressBar.attributes.add('doneEntity', {type: 'entity'});

CircularProgressBar.prototype.initialize = function() {


    this.setProgress(0);
};

// Set progress - value is between 0 and 1
CircularProgressBar.prototype.setProgress = function (value) {
    value = pc.math.clamp(value, 0, 1);
    if(value != this.progress) {
        var material = this.material;
        if(!material) {
            material = this.progressEntity.render.meshInstances[0].material.clone();
            this.material = material;
            this.progressEntity.render.meshInstances[0].material = material;
        }
        material.setParameter('uProgress', Math.max(value, 5.0/360.0));
        this.progress = value;
        if(this.progress >= 1.0) {
            this.loadingEntity.enabled = false;
            this.progressEntity.enabled = false;
            this.doneEntity.enabled = true;
        } else if(this.progress < 1.0 && this.doneEntity.enabled) {
            this.loadingEntity.enabled = true;
            this.progressEntity.enabled = true;
            this.doneEntity.enabled = false;
        }
    }
};

// Set progress - value is between 0 and 1
CircularProgressBar.prototype.getProgress = function () {
    if(this.progress)
        return this.progress;
    else
        return 0.0;
};
    