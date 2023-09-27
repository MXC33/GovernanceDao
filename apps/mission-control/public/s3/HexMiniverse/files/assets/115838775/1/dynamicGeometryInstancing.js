var DynamicGeometryInstancing = pc.createScript('dynamicGeometryInstancing');


DynamicGeometryInstancing.attributes.add('maxInstanceCount', {
    type: "number", 
    default: 512, 
    title: 'Max Instance Count', 
});

DynamicGeometryInstancing.attributes.add('uploadEveryFrame', {
    type: "boolean", 
    default: false, 
    title: 'Upload Vertex Buffer every frame', 
});

// initialize code called once per entity
DynamicGeometryInstancing.prototype.initialize = function() {
    this.geometryInstancing = this.entity.script.geometryInstancing;
    this.idToIndexTable = {};
    this.indexToIdTable = {};
    this.instanceCount = 0;
    this.idTracker = 0;

    this.geometryInstancing.initVertexData(this.maxInstanceCount);
    this.geometryInstancing.uploadVertexData(this.instanceCount);

};

DynamicGeometryInstancing.prototype.addInstance = function(matrix) {
    const id = this.idTracker;
    const index = this.instanceCount;

    this.geometryInstancing.setVertexData(index, matrix);
    this.idToIndexTable[id] = index;
    this.indexToIdTable[index] = id;

    this.idTracker++;
    this.instanceCount++;

    return id;
};

DynamicGeometryInstancing.prototype.setInstanceTransform = function(id, matrix) {
    const index = this.idToIndexTable[id];
    this.geometryInstancing.setVertexData(index, matrix);
};

DynamicGeometryInstancing.prototype.removeInstance = function(id) {
    const removedIndex = this.idToIndexTable[id];
    const lastIndex = this.instanceCount -1;
    const lastId = this.indexToIdTable[lastIndex];
    

    //Replace the removed instance with the last instance
    this.geometryInstancing.copyFromTo(lastIndex, removedIndex);
    this.idToIndexTable[lastId] = removedIndex;
    this.indexToIdTable[removedIndex] = lastId;

    this.idToIndexTable[id] = null;
    this.indexToIdTable[lastIndex] = null;

    this.instanceCount--;

};

DynamicGeometryInstancing.prototype.reUpload = function() {
    if(!this.uploadEveryFrame)
        this.geometryInstancing.uploadVertexData(this.instanceCount);
};

DynamicGeometryInstancing.prototype.postUpdate = function(dt) {
    if(this.uploadEveryFrame)
        this.geometryInstancing.uploadVertexData(this.instanceCount);
};
