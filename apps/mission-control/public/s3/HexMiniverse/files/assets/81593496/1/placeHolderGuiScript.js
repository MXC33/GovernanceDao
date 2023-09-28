var PlaceHolderGuiScript = pc.createScript('placeHolderGuiScript');


PlaceHolderGuiScript.attributes.add('gameInterfaceEntity', {
    type: 'entity',
    description: 'Gameinterface Entity'
});

// initialize code called once per entity
PlaceHolderGuiScript.prototype.initialize = function() {
    this.gameInterface = this.gameInterfaceEntity.script.gameInterface;
    this.entity.element.on('mouseenter', function(event) {
        this.gameInterface.setIsCursorInCanvas(false);
    }, this);
    this.entity.element.on('mouseleave', function(event) {
        this.gameInterface.setIsCursorInCanvas(true);
    }, this);

    /*this.entity.element.on('touchstart ', function(event) {
        this.gameInterface.setIsCursorInCanvas(false);
    }, this);
    this.entity.element.on('touchleave ', function(event) {
        this.gameInterface.setIsCursorInCanvas(true);
    }, this);*/
};

// update code called every frame
PlaceHolderGuiScript.prototype.update = function(dt) {

};

// swap method called for script hot-reloading
// inherit your script state here
// PlaceHolderGuiScript.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/