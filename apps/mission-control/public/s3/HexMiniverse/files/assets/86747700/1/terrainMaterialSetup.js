/*
//The terrain masking consist of the following:
// 1. Generate a noise texture containing the lines and level differences
// 2. Use a shader to render those lines on planes, the Y-axis in world coordinates of the plane correspond to which line to be rendered
// 3. Hardware instancing is used to render the final planes  
*/

if (typeof window.GenerateNoisePostEffect === 'undefined') {
//This post effect is only used to render a noise texture
    class GenerateNoisePostEffect extends pc.PostEffect {
        constructor(graphicsDevice, vs, fs) {
            super(graphicsDevice);

            // this is the shader definition for our effect
            this.shader = new pc.Shader(graphicsDevice, {
                attributes: {
                    aPosition: pc.SEMANTIC_POSITION,
                },
                vshader: vs,
                fshader: fs
            });
        }

        render(inputTarget, outputTarget, rect) {
                var device = this.device;
                var scope = device.scope;
                //Render noise to outputTarget
                pc.drawFullscreenQuad(device, outputTarget, this.vertexBuffer, this.shader, rect);
        }
    }
    window.GenerateNoisePostEffect = GenerateNoisePostEffect;
}

var TerrainMaterialSetup = pc.createScript('terrainMaterialSetup');
TerrainMaterialSetup.attributes.add('noiseGenVs', {
    type: 'asset',
    assetType: 'shader',
    title: 'NoiseGen Vertex Shader'
});

TerrainMaterialSetup.attributes.add('noiseGenFs', {
    type: 'asset',
    assetType: 'shader',
    title: 'NoiseGen Fragment Shader'
});

TerrainMaterialSetup.attributes.add('noiseDebugMaterial', {
    type: 'asset',
    assetType: 'material',
    title: 'Noise Debug Material'
});

TerrainMaterialSetup.attributes.add('materials', {type: 'asset', array: true});
TerrainMaterialSetup.attributes.add('startShader', {type: 'asset'});
TerrainMaterialSetup.attributes.add('endShader', {type: 'asset'});

TerrainMaterialSetup.attributes.add('liveUpdate', {type: 'boolean', default: false, title: 'Live Update'});

TerrainMaterialSetup.attributes.add('displacementMap', {
    type: 'asset',
    assetType: 'texture',
    title: 'Displacement Map',
    description: 'Used to mask or discard pixels depending on object height and sampled grayscale value.'

});

TerrainMaterialSetup.attributes.add('worldSize', {
    type: 'number',
    title: 'World Scaling',
    min: 0.01,
    max: 10.0,

    default: 0.5,
});

TerrainMaterialSetup.attributes.add('pixHeight', {
    type: 'number',
    title: 'Pix Height',
    min: 0.01,
    max: 1.0,
    default: 0.1,
});

TerrainMaterialSetup.attributes.add('offsetHeight', {
    type: 'number',
    title: 'Exp',
    min: 0.01,
    max: 8.0,
    default: 0.1,
});

TerrainMaterialSetup.attributes.add('nrOfPlanes', {
    type: 'number',
    title: 'Number of planes',
    default: 10,
});

TerrainMaterialSetup.attributes.add('fractNr', {
    type: 'number',
    title: 'Fract',
    min: 0.01,
    max: 256.0,

    default: 6.0,
});

TerrainMaterialSetup.attributes.add('uvOffsetX', {
    type: 'number',
    title: 'uvOffsetX',
    min: 0.0,
    max: 2.0,

    default: 0.0,
});

TerrainMaterialSetup.attributes.add('valley', {
    type: 'number',
    title: 'Valley',
    min: 0.0,
    max: 16.0,

    default: 0.0,
});

TerrainMaterialSetup.attributes.add('erosion', {
    type: 'number',
    title: 'Erosion',
    min: 0,
    max: 10,

    default: 5,
});

TerrainMaterialSetup.attributes.add('colorM', {
    type: 'number',
    title: 'Color += M',
    min: 0,
    max: 1.0,

    default: 0.25,
});

TerrainMaterialSetup.attributes.add('colorK', {
    type: 'number',
    title: 'Color += K*Height',
    min: 0,
    max: 10,

    default: 2.0,
});

TerrainMaterialSetup.attributes.add('colorP', {
    type: 'number',
    title: 'Color += Height^P',
    min: 0,
    max: 10,

    default: 2.0,
});

TerrainMaterialSetup.attributes.add('lineM', {
    type: 'number',
    title: 'Width += M',
    min: 0,
    max: 8.0,

    default: 0.5,
});

TerrainMaterialSetup.attributes.add('lineK', {
    type: 'number',
    title: 'Width += K*1/Height',
    min: 0.0,
    max: 8,

    default: 1.0,
});

TerrainMaterialSetup.attributes.add('lineP', {
    type: 'number',
    title: 'Width += (1/Height)^P',
    min: 0.0,
    max: 8,

    default: 1.0,
});

TerrainMaterialSetup.attributes.add('outlineOpacity', {
    type: 'number',
    title: 'Outline Opacity',
    min: 0.0,
    max: 1.0,

    default: 1.0,
});

TerrainMaterialSetup.attributes.add('outlineThickness', {
    type: 'number',
    title: 'Outline Thickness',
    min: 0.0,
    max: 8,

    default: 4.0,
});

TerrainMaterialSetup.prototype.initialize = function () {
    
    const noiseCamera = this.entity.camera;
    const graphicsDevice = this.app.graphicsDevice;
    noiseCamera.enabled = false;
    const app = this.app;
    var colorBuffer = null;
    const width = app.graphicsDevice.canvas.clientWidth;
    const height = app.graphicsDevice.canvas.clientHeight;
    var touch = app.touch;

    const isTouchAndPortrait = height > width;// && touch;

    if (pc.platform.mobile || isTouchAndPortrait) {
        //Create noiseTexture
        colorBuffer = new pc.Texture(graphicsDevice, {
            width: 3072,
            height: 3072,
            format: pc.PIXELFORMAT_R8_G8_B8_A8,
            //addressU: pc.ADDRESS_CLAMP_TO_EDGE,
            //addressV: pc.ADDRESS_CLAMP_TO_EDGE,
            flipY: false,
        });
    }else{
        colorBuffer = new pc.Texture(graphicsDevice, {
            width: 8192,
            height: 8192,
            format: pc.PIXELFORMAT_R8_G8_B8_A8,
            //addressU: pc.ADDRESS_CLAMP_TO_EDGE,
            //addressV: pc.ADDRESS_CLAMP_TO_EDGE,
            flipY: false,
        });
    }


    this.noiseTexture = colorBuffer;

    //Create rendertarget for noise texture
    const renderTarget = new pc.RenderTarget({
        colorBuffer: colorBuffer,
        depth: false
    });

    // Set the render target on a noiseCamera component
    noiseCamera.renderTarget = renderTarget;

    //Create a post effect to "render a fullscreen quad" with the noise effect
    var effect = new GenerateNoisePostEffect(this.app.graphicsDevice, this.noiseGenVs.resource, this.noiseGenFs.resource);
    var queue = noiseCamera.postEffects;
    queue.addEffect(effect);
    this.on('enable', function () {
        queue.addEffect(effect, false); 
    });
    this.on('disable', function () {
        queue.removeEffect(effect); 
    });

    
    // Set the texture to the debug material
    const noiseDebugMaterial = this.noiseDebugMaterial.resource;
    noiseDebugMaterial.emissiveMap = colorBuffer;
    noiseDebugMaterial.diffuseMap = colorBuffer;
    noiseDebugMaterial.update();
    noiseCamera.enabled = true;

    //this.uvOffsetX = Math.random()*10.0;

    var pixHeight = this.pixHeight;
    var nrOfPlanes = this.nrOfPlanes;

    //set parameters on spawners
    var planeSpawnerEntities = this.app.root.find(node => {
        return node.script && node.script.terrainPlaneSpawner;
    });
    for(i = 0; i < planeSpawnerEntities.length; i++) {
        var spawner = planeSpawnerEntities[i].script.terrainPlaneSpawner;
        spawner.planeStepHeight = pixHeight/nrOfPlanes;
        spawner.nrOfPlanes = nrOfPlanes;
    }
    this.oldPixHeight = pixHeight;


    // get the shader asset
    var startPs = this.startShader.resource;
    var endPs = this.endShader.resource;

    this.time = 0;

    // update all the materials with the chunk
    for (var i = 0; i < this.materials.length; i++) {
        var material = this.materials[i].resource;
        material.chunks.APIVersion = pc.CHUNKAPI_1_56;
        material.chunks.startPS = startPs;
        material.chunks.endPS = endPs;
        this.updateUniforms(material);
    }
};

TerrainMaterialSetup.prototype.updateUniforms = function(material) {
    material.setParameter('uDisplacementMaskMap', this.noiseTexture);
    material.setParameter('uWorldSize', this.worldSize);
    material.setParameter('uPixHeight', this.pixHeight);
    material.setParameter('uHeightOffset', this.offsetHeight);
    material.setParameter('uFract',  this.fractNr);
    material.setParameter('uOffsetX', this.uvOffsetX);
    material.setParameter('uErosion', this.erosion);
    material.setParameter('uTime', this.time);
    material.setParameter('uValley', this.valley);
    material.setParameter('uErosion', this.erosion);
    material.setParameter('uColorM', this.colorM);
    material.setParameter('uColorK', this.colorK);
    material.setParameter('uColorP', this.colorP);
    material.setParameter('uLineK', this.lineK);
    material.setParameter('uLineM', this.lineM);
    material.setParameter('uLineP', this.lineP);
    material.setParameter('uOutlineOpacity', this.outlineOpacity);
    material.setParameter('uOutlineThickness', this.outlineThickness);
    material.setParameter('uTime', 0);
    material.update();
};


TerrainMaterialSetup.prototype.onPixHeightChanged = function() {
    var i;
    var pixHeight = this.pixHeight;
    
    var planeSpawnerEntities = this.app.root.find(node => {
        return node.script && node.script.terrainPlaneSpawner;
    });

    for(i = 0; i < planeSpawnerEntities.length; i++) {
        var spawner = planeSpawnerEntities[i].script.terrainPlaneSpawner;
        spawner.planeStepHeight = pixHeight/this.nrOfPlanes;
        spawner.onPlaneStepHeightChanged();
    }

    //Update shader uniform
    /*for (i = 0; i < this.materials.length; i++) {
        var material = this.materials[i].resource;
        material.setParameter('uPixHeight', stepHeight);
    }*/
    this.oldPixHeight = pixHeight;
};


TerrainMaterialSetup.prototype.update = function (dt) {
    if(this.hasUpdatedOnce && this.entity.camera.enabled)
        this.entity.camera.enabled = false;

    if(this.liveUpdate) {
        if(this.oldPixHeight != this.pixHeight) {
            this.onPixHeightChanged();
        }   
        
        for (var i = 0; i < this.materials.length; i++) {
            var material = this.materials[i].resource;
            this.updateUniforms(material);
        }
    }

    this.hasUpdatedOnce = true;
};