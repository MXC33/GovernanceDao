var AssetProgress = pc.createScript('assetProgress');
AssetProgress.attributes.add('progressBarEntity', {
    type: 'entity',
    default: null, 
    title: 'Progress Bar'
});

AssetProgress.prototype.initialize = function() {
    //this.progressBarEntity = this.progressBarPrototype.clone();
   // this.progressBarAnchor.addChild(this.progressBarEntity);
   // this.progressBarEntity.setLocalPosition(0, 0, 0);
    //this.progressBarEntity.enabled = true;
    this.progressBar = this.progressBarEntity.script.circularProgressBar;
    //this.progressBar = this.progressBarEntity.findByName("ProgressBarOuter").script.progressBar;
    //this.progressBarEntity.setPosition(this.progressBarAnchor.getPosition().clone());
};

AssetProgress.prototype.setProgress = function(val) {
    this.progressBar.setProgress(val);
};

AssetProgress.prototype.getProgress = function() {
    return this.progressBar.getProgress();
};

AssetProgress.prototype.update = function(dt) {

};
