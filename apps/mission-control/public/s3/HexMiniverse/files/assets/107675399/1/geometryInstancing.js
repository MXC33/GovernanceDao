var GeometryInstancing = pc.createScript('geometryInstancing');

GeometryInstancing.attributes.add('isDynamic', {
    type: "boolean", 
    default: false, 
    title: 'Dynamic Vertex Buffer', 
});

GeometryInstancing.prototype.initialize = function() {
    this.initialized = false;
};
/*
GeometryInstancing.prototype.initVertexData = function(maxInstanceCount) {
    if(!this.initialized) {
        //console.log(this.entity.name + " is initializing GeometryInstancing");
        this.initialized = true;
        // mesh we want to instance
        this.meshInst = this.entity.render.meshInstances[0];
            
        // enabled instancing on material
        var material = this.meshInst.material;
        material.onUpdateShader = function(options) {
            options.useInstancing = true;
            return options;
        };
        material.update();    

        // create dynamnic vertex buffer to pass instancing matrixes to rendering, and initialise instancing with it
        this.vertexBuffer = new pc.VertexBuffer(this.app.graphicsDevice, pc.VertexFormat.defaultInstancingFormat, maxInstanceCount, this.isDynamic? pc.BUFFER_DYNAMIC : pc.BUFFER_STATIC);
        this.meshInst.setInstancing(this.vertexBuffer);
        this.matrices = new Float32Array(maxInstanceCount*16);

        const identityMatrix = pc.Mat4.IDENTITY;
        for(var i = 0; i < maxInstanceCount; i++) {
            for(var j = 0; j < 16; j++) {
                this.matrices[i*16 + j] = identityMatrix.data[j];
            }
        }
    }
};*/

GeometryInstancing.prototype.initVertexData = function(maxInstanceCount) {
    if(!this.initialized) {
        //console.log(this.entity.name + " is initializing GeometryInstancing");
        this.initialized = true;
        // mesh we want to instance
        this.meshInst = this.entity.render.meshInstances;
        
        for(var i = 0; i < this.meshInst.length; i++){
            // enabled instancing on material
            var material = this.meshInst[i].material;
            material.onUpdateShader = function(options) {
                options.useInstancing = true;
                return options;
            };
            material.update();  
        }
  
        // create dynamnic vertex buffer to pass instancing matrixes to rendering, and initialise instancing with it
        this.vertexBuffer = [];
        for(var i = 0; i < this.meshInst.length; i++){
            //this.vertexBuffer.push(new pc.VertexBuffer(this.app.graphicsDevice, pc.VertexFormat.getDefaultInstancingFormat(this.app.graphicsDevice), maxInstanceCount, this.isDynamic? pc.BUFFER_DYNAMIC : pc.BUFFER_STATIC));
            this.vertexBuffer.push(new pc.VertexBuffer(this.app.graphicsDevice, pc.VertexFormat.defaultInstancingFormat, maxInstanceCount, this.isDynamic? pc.BUFFER_DYNAMIC : pc.BUFFER_STATIC));
            this.meshInst[i].setInstancing(this.vertexBuffer[i]);
        }

        //this.matrices = [],[];
        this.matrices = new Float32Array(maxInstanceCount*16);

        const identityMatrix = pc.Mat4.IDENTITY;
        for(var i = 0; i < maxInstanceCount; i++) {
            for(var j = 0; j < 16; j++) {
                this.matrices[i*16 + j] = identityMatrix.data[j];
            }
        }
    }
};

GeometryInstancing.prototype.copyFromTo = function(fromIndex, toIndex) {
    for(var j = 0; j < 16; j++) {
        this.matrices[toIndex*16 + j] = this.matrices[fromIndex*16 + j] ;
    }
};

GeometryInstancing.prototype.setVertexData = function(matrixIndex, matrix) {
    for(var j = 0; j < 16; j++) {
        this.matrices[matrixIndex*16 + j] = matrix.data[j];
    }
};

GeometryInstancing.prototype.uploadVertexData = function(instanceCount) {
    for(var i = 0; i < this.meshInst.length; i++){
        this.vertexBuffer[i].setData(this.matrices);
        this.meshInst[i].instancingCount = instanceCount;
    }
};/*
GeometryInstancing.prototype.uploadVertexData = function(instanceCount) {
    this.vertexBuffer.setData(this.matrices);
    this.meshInst.instancingCount = instanceCount;    
};*/

GeometryInstancing.prototype.update = function(dt) {

};