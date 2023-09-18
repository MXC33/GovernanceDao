var ResolutionScaling = pc.createScript('resolutionScaling');
ResolutionScaling.attributes.add('scale', {type: 'number', default: 1.0});
ResolutionScaling.attributes.add('elementEntity', {type: 'entity', description: 'The element image that will display the render target'});
ResolutionScaling.attributes.add('worldCameraEntity', {type: 'entity', description: 'The camera which will draw to the render target'});

ResolutionScaling.prototype.initialize = function () {
    this.oldScale = 1.0;
    this.createNewRenderTexture();
    
    var device = this.app.graphicsDevice;
    var onResizeCanvas = function(w, h) {
        this.secsSinceSameSize = 0; 
    };
    
    this.app.graphicsDevice.on('resizecanvas', onResizeCanvas, this);
    
    this.lastWidth = device.width;
    this.lastHeight = device.height;
    
    this.secsSinceSameSize = 0;
    
    var onRenderScaleChange = function (scale) {
        this.scale = scale;
        this.createNewRenderTexture();
        this.secsSinceSameSize = 0;  
    };
    
    this.app.on('renderscale:change', onRenderScaleChange, this);
    
    this.on('destroy', function() {
        this.app.graphicsDevice.off('resizecanvas', onResizeCanvas, this);
        this.app.off('renderscale:change', onRenderScaleChange, this);

        this.elementEntity.element.texture = null;
        this.renderTarget.destroy();
        this.texture.destroy();
    }, this);
};


ResolutionScaling.prototype.setScale = function(scale) {
    this.scale = parseFloat(scale);
}

// update code called every frame
ResolutionScaling.prototype.update = function(dt) {
    // We don't want to be constantly creating an new texture if the window is constantly
    // changing size (e.g a user that is dragging the corner of the browser over a period)
    // of time. 
    
    // We wait for the the canvas width and height to stay the same for short period of time
    // before creating a new texture to render against.
    
    var device = this.app.graphicsDevice;
    
    if (device.width == this.lastWidth && device.height == this.lastHeight) {
        this.secsSinceSameSize += dt;
    }
    
    if (this.secsSinceSameSize > 0.25) {
        if (this.unScaledTextureWidth != device.width || this.unScaledTextureHeight != device.height || this.oldScale != this.scale) {
            this.createNewRenderTexture();
        } 
    } 
    
    this.lastWidth = device.width;
    this.lastHeight = device.height;
};

ResolutionScaling.prototype.setScale = function(scale) {
    this.scale = parseFloat(scale);
};

ResolutionScaling.prototype.createNewRenderTexture = function() {
    var device = this.app.graphicsDevice;

    // Make sure we clean up the old textures first and remove 
    // any references
    if (this.texture && this.renderTarget) {
        var oldRenderTarget = this.renderTarget;
        var oldTexture = this.texture;
        
        this.renderTarget = null;
        this.texture = null;
        
        oldRenderTarget.destroy();
        oldTexture.destroy();
    }
    
    // Create a new texture based on the current width and height of 
    // the screen reduced by the scale
    var colorBuffer = new pc.Texture(device, {
        width: device.width * this.scale,
        height: device.height * this.scale,
        format: pc.PIXELFORMAT_RGBA8,
        //autoMipmap: true
    });
    
    colorBuffer.minFilter = pc.FILTER_LINEAR;
    colorBuffer.magFilter = pc.FILTER_LINEAR;
    var renderTarget = new pc.RenderTarget({
        colorBuffer: colorBuffer,
        depth: true,
        stencil: true,
        flipY: true,
        //samples: 4
    });

    this.worldCameraEntity.camera.renderTarget = renderTarget;

    this.elementEntity.element.texture = colorBuffer;
    
    this.unScaledTextureWidth = device.width;
    this.unScaledTextureHeight = device.height;
    
    this.texture = colorBuffer;
    this.renderTarget = renderTarget;

    this.oldScale = this.scale;
};
