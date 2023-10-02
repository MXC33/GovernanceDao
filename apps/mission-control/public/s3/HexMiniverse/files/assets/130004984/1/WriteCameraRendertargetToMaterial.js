/*pc.script.attribute('materials', 'asset', [], {
    type: 'material'
});*/

var WriteCameraRendertargetTomaterial = pc.createScript('writeCameraRendertargetTomaterial');
WriteCameraRendertargetTomaterial.attributes.add('reselution', {type: 'number', default: 1024});
WriteCameraRendertargetTomaterial.attributes.add('materials', {type: 'asset', array: true});/*
WriteCameraRendertargetTomaterial.attributes.add('opacity', {type: 'number', min: 0, max: 1, default: 0.5});
WriteCameraRendertargetTomaterial.attributes.add('emissive', {type: 'number', min: 0, max: 10, default: 0.5});*/
WriteCameraRendertargetTomaterial.attributes.add('magnitudeThreshold', {type: 'number', min: 0, max: 1, default: 0.0});

WriteCameraRendertargetTomaterial.attributes.add('opacityShader', {type: 'asset'});
//WriteCameraRendertargetTomaterial.attributes.add('fragShader', {type: 'asset', array: true});
WriteCameraRendertargetTomaterial.attributes.add('fs', {type: 'asset'});
WriteCameraRendertargetTomaterial.attributes.add('vs', {type: 'asset'});

// initialize code called once per entity
WriteCameraRendertargetTomaterial.prototype.initialize = function() {
    // Create a 512x512x24-bit render target with a depth buffer
    var colorBuffer = new pc.Texture(this.app.graphicsDevice, {
        width: this.reselution,
        height: this.reselution,
        format: pc.PIXELFORMAT_R8_G8_B8
    });
    var renderTarget = new pc.RenderTarget({
        colorBuffer: colorBuffer,
        depth: true,
        flipY: true,
    });
     
    // Set the render target on a camera component
    this.entity.camera.renderTarget = renderTarget;
    this.colorBuffer = colorBuffer;
    this.material = this.materials[0].resource;
    this.diffuseMap = colorBuffer;    

    this.material.specularMap = colorBuffer;
    this.material.metalnessMap = colorBuffer;
    this.material.glossMap = colorBuffer;
    this.material.refractionMap = colorBuffer;
    this.material.emissiveMap = colorBuffer;
    
    this.material.heightMap = colorBuffer;
    this.material.normalMap = colorBuffer;

    this.material.emissiveMap = colorBuffer
    this.material.diffuseMap = colorBuffer;
    //this.material.opacityMap = colorBuffer;
    //this.material. 
    var fsO = this.opacityShader.resource;
    this.material.chunks.diffusePS = fsO
    //this.material.setParameter('texture_opacityMap', colorBuffer.resource);
    this.material.setParameter('colorBuffer', this.colorBuffer);
    this.material.setParameter('magnitudeThreshold', this.magnitudeThreshold);
    this.material.update();
    //this.initializeShader();
};

WriteCameraRendertargetTomaterial.prototype.initializeShader = function() {
    var app = this.app;
    var gd = app.graphicsDevice;

    var vertexShader = this.vs.resource;
    var fragmentShader = "precision " + gd.precision + " float;\n";
    fragmentShader = fragmentShader + this.fs.resource;

    // A shader definition used to create a new shader.
    var shaderDefinition = {
        attributes: {
            aPosition: pc.SEMANTIC_POSITION,
            aUv0: pc.SEMANTIC_TEXCOORD0
        },
        vshader: vertexShader,
        fshader: fragmentShader
    };

    // Create the shader from the definition
    this.shader = new pc.Shader(gd, shaderDefinition);
    this.material.shader = this.shader;

    this.material.setParameter('colorBuffer', this.colorBuffer);
    this.material.setParameter('magnitudeThreshold', this.magnitudeThreshold);
    this.material.update();

    console.log("initializeShader");
};


// update code called every frame
WriteCameraRendertargetTomaterial.prototype.update = function(dt) {
    this.material.setParameter('colorBuffer', this.colorBuffer);
    this.material.setParameter('magnitudeThreshold', this.magnitudeThreshold);
    this.material.update();
};

// swap method called for script hot-reloading
// inherit your script state here
// WriteCameraRendertargetTomaterial.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/