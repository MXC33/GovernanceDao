var SkyscraperSpawner = pc.createScript('skyscraperSpawner');

SkyscraperSpawner.attributes.add('skyscraperProto', {
    type: 'entity',
    default: null, 
    title: 'Skyscraper Prototype Entity'
});

SkyscraperSpawner.attributes.add('skyscraperInstanced', {
    type: 'entity',
    default: null, 
    title: 'Skyscraper Instanced Entity'
});

SkyscraperSpawner.attributes.add('useInstancing', {
    type: 'boolean',
    default: false, 
    title: 'Use Instancing'
});

SkyscraperSpawner.attributes.add('maxHeight', {
    type: 'number',
    default: 0.4, 
    title: 'Max Height'
});

SkyscraperSpawner.attributes.add('heightMap', {
    type: 'asset',
    assetType: 'texture',
    title: 'Height Map',
    description: 'More color means higher blocks.'

});

SkyscraperSpawner.attributes.add('sampleSize', {
    type: 'number',
    title: 'Sample Size',
    description: 'How many pixels in square that determines the height of each scraper.'
});


// initialize code called once per entity
SkyscraperSpawner.prototype.initialize = function() {
    var img = this.heightMap.resource;    // this.texture is a texture asset
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img.getSource(), 0, 0 );
    var imgData = context.getImageData(0, 0, img.width, img.height);


    //Grab colors from height map
    var colorArray = [];
    for(var x = 0; x < img.width; x++) {
        var currentColumn = [];
        for(var y = 0; y < img.height; y++) {
            var redIndex = y * (img.width * 4) + x * 4;
            var pixelColor = [
                imgData.data[redIndex],         // Red channel for the pixel
                imgData.data[redIndex+1],       // Green channel
                imgData.data[redIndex+2],       // Blue channel
                imgData.data[redIndex+3]];      // Alpha channel
            currentColumn.push(pixelColor);
        }
        colorArray.push(currentColumn);
    }

    //Calculate mean value over sample size boxes
    var meanArray = [];
    var ss = this.sampleSize;
    for(var sx = 0; sx < img.width/ss; sx++) {
        var meanCol = [];
        for(var sy = 0; sy < img.height/ss; sy++) {
            var sum = 0;
            for(var x = sx*ss; x < (sx + 1)*ss - 1; x++) {
                for(var y = sy*ss; y < (sy + 1)*ss - 1; y++) {
                    //sum += colorArray[x][y][0]/3; 
                    //sum += colorArray[x][y][1]/3; 
                    sum += colorArray[x][y][2]/1;  //only use blue
                }
            }
            var mean = sum/(ss*ss);
            meanCol.push(mean);
        }
        meanArray.push(meanCol);
    }

    //Spawn cubes 
    var hexLayout = new Layout(layout_flat, new Point(0.25, 0.25), new Point(0, 0));

    const countX = img.width/ss;
    const countY = img.height/ss;
    const sizeX = 2.0/countX;
    const sizeY = 2.0/countY;

    if(this.useInstancing) {
        this.skyscraperInstanced.enabled = true;
        const geometryInstancing = this.skyscraperInstanced.script.geometryInstancing;
        geometryInstancing.initVertexData(countX*countY);

        var instanceMatrix = pc.Mat4.IDENTITY.clone();
        const parentPos = this.entity.getPosition();
        const pos = new pc.Vec3();
        const rot = new pc.Quat();
        const scl = new pc.Vec3(0.1, 0.1, 0.1);
        var instanceCount = 0;
        for(var sx = 0; sx < countX; sx++) {
            for(var sy = 0; sy < countY; sy++) {
                const px = sx*sizeX - 1.0;
                const py = sy*sizeY - 1.0;
                if(this.isInsideHexagon(hexLayout, px*0.5, py*0.5)) {
                    const height = (meanArray[sx][sy]/255.0)*this.maxHeight;
                    pos.set(parentPos.x + px, parentPos.y + height*0.5, parentPos.z + py);
                    scl.set(sizeX, height, sizeY);
                    instanceMatrix.setTRS(pos, rot, scl);
                    geometryInstancing.setVertexData(instanceCount, instanceMatrix);
                    instanceCount++;
                }

            }
        }

        //this.skyscraperInstanced.enabled = true;
        geometryInstancing.uploadVertexData(instanceCount - 1);

    } else {
        for(var sx = 0; sx < countX; sx++) {
            for(var sy = 0; sy < countY; sy++) {
                const px = sx*sizeX - 1.0;
                const py = sy*sizeY - 1.0;
                const height = (meanArray[sx][sy]/255.0)*this.maxHeight;
                
                if(this.isInsideHexagon(hexLayout, px*0.5, py*0.5)) {

                    var clone = this.skyscraperProto.clone();
                    clone.setLocalPosition(px, 0.0, py);
                    clone.setLocalScale(sizeX, height, sizeY);
                    this.entity.addChild(clone);
                    clone.enabled = true;
                }
            }
        }
    }
};

SkyscraperSpawner.prototype.isInsideHexagon = function(hexLayout, x, y) {
    //HACK: Use the hexlib to see that the point is inside the 0, 0, 0 pix
    var pixCord = pixel_to_hex(hexLayout, new Point(x, y));
    return Math.abs(pixCord.q) < 1 && Math.abs(pixCord.r) < 1 && Math.abs(pixCord.s) < 1;
};

// update code called every frame
SkyscraperSpawner.prototype.update = function(dt) {

};
