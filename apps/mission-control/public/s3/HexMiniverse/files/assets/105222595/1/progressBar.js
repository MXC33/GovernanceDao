var ProgressBar = pc.createScript('progressBar');

// The entity that shows the fill image
ProgressBar.attributes.add('progressImage', {type: 'entity'});
ProgressBar.attributes.add('doneImage', {type: 'entity'});
// The maximum width of the fill image
ProgressBar.attributes.add('progressImageMaxWidth', {type: 'number'});

ProgressBar.prototype.initialize = function() {
    this.imageRect = this.progressImage.element.rect.clone();

    this.setProgress(0);
    // if true the progress bar will increase
    // otherwise it will decrease in update
    this.increase = true;
};

// Set progress - value is between 0 and 1
ProgressBar.prototype.setProgress = function (value) {
    // clamp value between 0 and 1
    value = pc.math.clamp(value, 0, 1);
    if(value != this.progress) {
        this.progress = value;

        // find the desired width of our progress fill image
        var width = pc.math.lerp(0, this.progressImageMaxWidth, value);
        // set the width of the fill image element
        this.progressImage.element.width = width;
        this.doneImage.element.width = width;

        this.doneImage.enabled = value >= 1;
        this.progressImage.enabled = value < 1;
        // force rect update
        //this.imageRect.copy(this.progressImage.element.rect);
        //this.imageRect.z = value;
        //this.progressImage.element.rect = this.progressImage.element.rect;
    }
};

// Set progress - value is between 0 and 1
ProgressBar.prototype.getProgress = function () {
    if(this.progress)
        return this.progress;
    else
        return 0.0;
};

// Increase or decrease the progress automatically
ProgressBar.prototype.update = function(dt) {
    /*var diff = this.increase ? dt*0.1 : -dt*0.1;
    this.setProgress(this.progress + diff);

    if (this.progress >= 1)
        this.increase = false;
    else if (this.progress <= 0)
        this.increase = true;*/
};