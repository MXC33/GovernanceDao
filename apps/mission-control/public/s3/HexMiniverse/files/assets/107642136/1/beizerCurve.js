var BeizerCurve = pc.createScript('beizerCurve');
BeizerCurve.attributes.add('p', {type: 'entity', array: true, default: [], title: 'Positions'});
BeizerCurve.attributes.add('model', {type: 'entity', default: null, title: 'Model Entity'});
BeizerCurve.attributes.add('modelInstanced', {type: 'entity', default: null, title: 'Model Instanced Entity'});
BeizerCurve.attributes.add('pixGridEntity', {type: 'entity', default: null, title: 'Pix Grid Entity'});
BeizerCurve.attributes.add('distFromCenter', {type: 'number', default: 2.2, title: 'Distance from Center'});


BeizerCurve.attributes.add('useInstancing', {
    type: 'boolean',
    default: false, 
    title: 'Use Instancing'
});

BeizerCurve.attributes.add('order', {type: 'number', default: 1, title: 'Order'});
BeizerCurve.attributes.add('speed', {type: 'number', default: 1, min: -10, max: 10.0, title: 'Speed'});

BeizerCurve.attributes.add('nrOfSegments', {type: 'number', default: 100, title: 'NrOfSegments'});

BeizerCurve.attributes.add('liveUpdate', {type: 'boolean', default: false, title: 'Live Update'});

BeizerCurve.attributes.add('discrete', {type: 'boolean', default: true});
BeizerCurve.attributes.add('discreteStep', {type: 'number',  min: 1.0, max: 100.0, default: 1.0});
BeizerCurve.attributes.add('segmentLength', {type: 'number', min: 0.001, max: 1.0, default: 1.0});

BeizerCurve.attributes.add('useFade', {type: 'boolean', default: true});
BeizerCurve.attributes.add('fadeFactor',  {type: 'number', min: 0.1, max: 1.0, default: 0.75});

BeizerCurve.attributes.add('randomCooldown',  {type: 'number', min: 0.0, max: 100.0, default: 0.0});
BeizerCurve.attributes.add('prototypeEntityName',  {type: 'string', default: "NewPrototype"});




// initialize code called once per entity
BeizerCurve.prototype.initialize = function() {
    if(this.useInstancing) {
        this.segments = [];
        const modelInstanced = this.modelInstanced;
        const material = modelInstanced.render.meshInstances[0].material.clone();
        modelInstanced.render.meshInstances[0].material = material;
        const geometryInstancing = modelInstanced.script.geometryInstancing;
        geometryInstancing.initVertexData(this.nrOfSegments);
        for(var i = 0; i < this.nrOfSegments; i++) {
            this.segments.push(new pc.Mat4().setIdentity());
        }

        /*var instanceMatrix = pc.Mat4.IDENTITY.clone();
        const parentPos = this.entity.getPosition();
        const pos = new pc.Vec3();
        const rot = new pc.Quat();
        const scl =new pc.Vec3(1,1,1);
        //const scl = modelInstanced.getScale().clone();
        for(var i = 0; i < this.nrOfSegments; i++) {
            pos.set(parentPos.x, parentPos.y, parentPos.z);
            //scl.set(sizeX, height, sizeY);
            instanceMatrix.setTRS(pos, rot, scl);
            geometryInstancing.setVertexData(i, instanceMatrix);
            this.segments.push(instanceMatrix);
        }
        geometryInstancing.uploadVertexData(this.nrOfSegments);*/

    } else {
        this.segments = [];
        for(var i = 0; i < this.nrOfSegments; i++){
            const clone = this.model.clone();
            clone.enabled = true;
            if(this.useFade) {
                const nrOfSegments = this.nrOfSegments;
                const renderComponents = clone.findComponents("render");
                for(var j = 0; j < renderComponents.length; j++) {
                    const render = renderComponents[j];
                     // const finalFade = (1.0 - this.fadeFactor) + this.fadeFactor*(1.0 - Math.abs(0.5 - i/(nrOfSegments - 1))*2.0);
                    const finalFade = (1.0 - this.fadeFactor) + this.fadeFactor*((i+1)/nrOfSegments);
                    const scale = render.entity.getLocalScale().x;
                    render.entity.setLocalScale(scale*finalFade, scale*finalFade, scale*finalFade);
                    //const material = render.meshInstances[0].material.clone();
                    //material.emissiveIntensity = finalFade;
                    //material.update();
                    //render.meshInstances[0].material = material;
                }
            }
            this.entity.addChild(clone);
            this.segments.push(clone);
        }

    }
    //Point the bezier curve towards the center
    const controlPoints = this.entity.findByName("ControlPoints");
    controlPoints.lookAt(pc.Vec3.ZERO, pc.Vec3.UP);
    controlPoints.rotateLocal(0, 90,0);
    const forward = controlPoints.right;
    //this.entity.translate(forward.clone().mulScalar(0.9));
    this.targetOdds = 1.0;
    this.firstTime = true;         

    this.t =this.randomCooldown > 0?  -1 - Math.random()*this.randomCooldown*this.speed : 0.0;

    if(this.pixGridEntity == null){
        this.pixGridEntity = this.app.root.findByName("PixGrid");
    }

    this.ringSize = this.pixGridEntity.script.pixGrid.nrOfRings;
};

BeizerCurve.prototype.generateControlpointsLocations = function(start, stop) {
        //dont generate if its the prototype entity
        if(this.entity.isAncestorOf(this.app.root.findByName(this.prototypeEntityName)))//"NewPrototype"
            return;


        const controlPoints = this.entity.findByName("ControlPoints");
        const forward = controlPoints.right;
        const right = controlPoints.forward;
        const up = pc.Vec3.UP;
        //stop.add(forward.clone().mulScalar(0.9));
        //start.add(forward.clone().mulScalar(-2.2));

        this.p[0].setPosition(start);
        for(var i = 1; i < this.p.length - 1; i++) {
            const t = 0.0;//Math.max(Math.sin(i/2*Math.PI), 0.0);
            const offset = new pc.Vec3().lerp(start, stop, i/( this.p.length - 1));
            const curveOffset = new pc.Vec3(0,0,0);
            curveOffset.add(right.clone().mulScalar((i%2 == 0)? i*2.0: i*-1.0));
             curveOffset.add(up.clone().mulScalar((i%2 == 0)? i*0.25: i*-0.5));
            //curveOffset.normalize().mulScalar(0.5);
            offset.add(curveOffset);
            this.p[i].setPosition(offset);
        }
        this.p[this.p.length - 1].setPosition(stop);
        //controlPoints.translate(forward.clone().mulScalar(0.5));
};

BeizerCurve.prototype.doCurve = function(offset) {
    if(this.useInstancing) {
        const modelInstanced = this.modelInstanced;
        const geometryInstancing = modelInstanced.script.geometryInstancing;
        const parentPos = this.entity.getPosition();
        const baseScale = modelInstanced.getScale();
        const pos = new pc.Vec3();
        const rot = new pc.Quat();
        const scl = new pc.Vec3();
        for(var i = 0; i < this.nrOfSegments; i++) {
            const instanceMatrix = this.segments[i];///new pc.Mat4().setIdentity();
            const spacing = (this.segmentLength/this.nrOfSegments);
            const localPos = offset + i*spacing;
            const t =  localPos;      
            const finalFade = this.useFade? (1.0 - this.fadeFactor) + this.fadeFactor*((i+1)/this.nrOfSegments) : 1.0;
            scl.set(finalFade*baseScale.x, finalFade*baseScale.y, finalFade*baseScale.z);
            var p;
            if((this.randomCooldown > 0.0 && (t >= 1.0 || t < 0)))
                p = new pc.Vec3(t, 1000,t);
            else
                p = this.getPoint(this.order, 0, t%1.0);
            pos.set(p.x, p.y, p.z);

            instanceMatrix.setTRS(pos, rot, scl);
            geometryInstancing.setVertexData(i, instanceMatrix);
           // this.segments.push(instanceMatrix);
        } 
        geometryInstancing.uploadVertexData(this.nrOfSegments);  
        modelInstanced.enabled = true;
    } else {
        //Set position
        for(var i = 0; i < this.nrOfSegments; i++) {
            const segment = this.segments[i];

            const spacing = (this.segmentLength/this.nrOfSegments);
            const localPos = offset + i*spacing;
            const t =  localPos;

            if((this.randomCooldown > 0.0 && (t >= 1.0 || t < 0)))
                segment.setPosition(new pc.Vec3(t, 1000,t));
            else
                segment.setPosition(this.getPoint(this.order, 0, t%1.0));
        }

        //Set rotation
        for(var i = 0; i < this.nrOfSegments - 1; i++) {
            this.segments[i].lookAt(this.segments[i + 1].getPosition(), pc.Vec3.UP);
            this.segments[i].rotateLocal(90, 0, 0);
        }
        this.segments[this.nrOfSegments - 1].lookAt(this.getPoint(this.order, 0, 1.0), pc.Vec3.UP);
        this.segments[this.nrOfSegments - 1].rotateLocal(90, 0, 0);
    }
};

BeizerCurve.prototype.getPoint = function(order, index, t) {
    if(order == 0)
        return this.p[index].getPosition();
   else {
       const x0 = this.getPoint(order -1, index, t);
       const x1 = this.getPoint(order -1, index +1, t);
       return new pc.Vec3().lerp(x0, x1, t);
   }

};

BeizerCurve.prototype.update = function(dt) {
    if((this.liveUpdate || this.firstTime) ) {
        if(this.t > 1.0 && this.randomCooldown > 0 ||  this.firstTime) {
           this.t =this.randomCooldown > 0?  -1 - Math.random()*this.randomCooldown*this.speed : 0.0;
            const rand = Math.random();
            const controlPoints = this.entity.findByName("ControlPoints");
            const forward = controlPoints.right;
            
            const endPointDistFromCenter = this.distFromCenter * this.ringSize;

            const start = rand >this.targetOdds? this.entity.getPosition().clone() : forward.clone().mulScalar(-endPointDistFromCenter);
            const stop = rand > this.targetOdds? forward.clone().mulScalar(-endPointDistFromCenter) : this.entity.getPosition().clone();
            this.generateControlpointsLocations(start, stop);
        }

        if(this.discrete)
            this.doCurve(Math.round((this.t)*this.discreteStep)/this.discreteStep);
        else
            this.doCurve(this.t);

        this.t += dt*this.speed;
        this.firstTime = false;
    }
};