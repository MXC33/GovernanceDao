var LayerSetup = pc.createScript('layerSetup');

// initialize code called once per entity
LayerSetup.prototype.initialize = function() {
    var worldUiLayer = pc.Application.getApplication().scene.layers.getLayerByName('WorldUI');
    worldUiLayer.clearDepthBuffer = true;

};

// update code called every frame
LayerSetup.prototype.update = function(dt) {

};

// swap method called for script hot-reloading
// inherit your script state here
// LayerSetup.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/