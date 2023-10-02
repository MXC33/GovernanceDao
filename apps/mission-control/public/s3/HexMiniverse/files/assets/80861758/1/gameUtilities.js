var GameUtilities = pc.createScript('gameUtilities');

GameUtilities.attributes.add('inputManagerEntity', {type: 'entity', default: null, title: 'Input Manager Entity'});
GameUtilities.attributes.add('pixGridEntity', {type: 'entity', default: null, title: 'PixGrid Entity'});
GameUtilities.attributes.add('pixPlaneHeight', {
    type: 'number',
    title: 'Pix Plane Height',
    default: 0.4,
    min: -1.5,
    max: 1.5
});

/*GameUtilities.attributes.add('pickAreaScale', {
    type: 'number',
    title: 'Pick Area Scale',
    description: '1 is more accurate but worse performance. 0.01 is best performance but least accurate. 0.25 is the default.',
    default: 0.25,
    min: 0.01,
    max: 1
});

GameUtilities.attributes.add('layerNames', {
    type: 'string',
    title: 'Layers Names',
    array: true,
    description: 'Layer names from which objects will be picked from.',
    default: ['World']
});*/

GameUtilities.attributes.add('cameraEntity', {type: 'entity', default: null, title: 'Camera Entity'});

// initialize code called once per entity
GameUtilities.prototype.initialize = function() {

    this.inputManager = this.inputManagerEntity.script.inputManager;
    this.pixGrid = this.pixGridEntity.script.pixGrid;
    /*
    // Create a frame buffer picker with a scaled resolution
    var canvas = this.app.graphicsDevice.canvas;
    var canvasWidth = parseInt(canvas.clientWidth, 10);
    var canvasHeight = parseInt(canvas.clientHeight, 10);
    this.picker = new pc.Picker(this.app, canvasWidth * this.pickAreaScale, canvasHeight * this.pickAreaScale);
    this.layers = [];
    for (var i = 0; i < this.layerNames.length; ++i) {
        var layer = this.app.scene.layers.getLayerByName(this.layerNames[i]);
        if (layer) {
            this.layers.push(layer);
        }
    }*/
};

/*
GameUtilities.prototype.getEntityAtScreenPos = function (screenPos, entityScriptName) {
    var canvas = this.app.graphicsDevice.canvas;
    var canvasWidth = parseInt(canvas.clientWidth, 10);
    var canvasHeight = parseInt(canvas.clientHeight, 10);

    var camera = this.cameraEntity.camera;
    var scene = this.app.scene;
    var picker = this.picker;

    picker.resize(canvasWidth * this.pickAreaScale, canvasHeight * this.pickAreaScale);
    picker.prepare(camera, scene, this.layers);

    // Map the mouse coordinates into picker coordinates and
    // query the selection
    const x = Math.floor(screenPos.x * (picker.width / canvasWidth));
    const y = Math.floor(screenPos.y * (picker.height / canvasHeight));
    var selected = picker.getSelection(x, y, 1, 1);

    if (selected.length > 0) {
        // Get the graph node used by the selected mesh instance
        var entity = selected[0].node;

        // Bubble up the hierarchy until we find an actual Entity
        // that has the script we are looking for
        while (entity != null && (!(entity instanceof pc.Entity) || !entity.script || !entity.script[entityScriptName])) {
            entity = entity.getParent();
        }
        if (entity) {
            return entity;
        } else {
            return null;
        }
    }

    return null;
};*/

GameUtilities.prototype.getLinePlaneIntersection = function(p0, p1, co, cn) {
    var epsilon = 1e-6;
    
    var u = new pc.Vec3().sub2(p1, p0);
    var dot = cn.dot(u);

    
    if (Math.abs(dot) > epsilon) {
        var w = new pc.Vec3().sub2(p0, co);
        var fac = -cn.dot(w)/dot;
        u.mulScalar(fac);
        return new pc.Vec3().add2(p0, u);
    }

    return null;
};


GameUtilities.prototype.getPixEntityAtMousePos = function() {
    var mousePos = this.inputManager.mousePos;
    if(!mousePos)
        return null;

    
    const posOnPixPlane = this.calculateScreenPosOnOrigoPlane(mousePos);
    if(posOnPixPlane && new pc.Vec3().sub2(this.cameraEntity.getPosition(), posOnPixPlane).dot(this.cameraEntity.forward) < 0) {
        const pixOnSurfacePlane = this.pixGrid.getPix(this.pixGrid.getPixCordFromPosition(posOnPixPlane));
        if(pixOnSurfacePlane)
            return pixOnSurfacePlane;
    }
    
    const posOnBottomPlane = this.calculateScreenPosOnPlane(mousePos, pc.Vec3.ZERO, pc.Vec3.UP);
    if(posOnBottomPlane && new pc.Vec3().sub2(this.cameraEntity.getPosition(), posOnBottomPlane).dot(this.cameraEntity.forward) < 0) {
        const pixOnBottomPlane = this.pixGrid.getPix(this.pixGrid.getPixCordFromPosition(posOnBottomPlane));
        if(pixOnBottomPlane)
            return pixOnBottomPlane;
    }

    //const pixOnFrame = this.getEntityAtScreenPos(mousePos, "pixScript");
    //if(pixOnFrame)
    //    return pixOnFrame;

    return null;
};


GameUtilities.prototype.calculateScreenPosOnPlane = function(screenPos, planePos, planeNorm) {
    var from = this.cameraEntity.camera.screenToWorld(screenPos.x, screenPos.y, this.cameraEntity.camera.nearClip);
    var to = this.cameraEntity.camera.screenToWorld(screenPos.x, screenPos.y, this.cameraEntity.camera.farClip);

    var posOnPlane = this.getLinePlaneIntersection(from, to, planePos, planeNorm);

    return posOnPlane;

};


GameUtilities.prototype.calculateScreenPosOnOrigoPlane = function(screenPos) {
    return this.calculateScreenPosOnPlane(screenPos, new pc.Vec3(0, this.pixPlaneHeight, 0), new pc.Vec3(0, 1, 0));
};
