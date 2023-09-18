var StarPlacer = pc.createScript('starPlacer');

// a = 10, b = 20, t = 0.5
// 1 - t = 0.5;
// 0.5 * a = 5;
// b * 0.5 = 10;
// 5 + 10 = 15;
function Lerp(a, b, t){
    return  (1 - t) * a + b * t;
}

StarPlacer.attributes.add('spaceBetween', {
    type: 'number',
    default: 0.2
});
StarPlacer.attributes.add('starModelTag', {
    type: 'string',
    default: "StarModel"
});


StarPlacer.prototype.initialize = function(){
    this.children = this.entity.findByTag("StarModel");
    this.timer = 0;

        /*this.on('enable', function () {
            if(!this.isAdded) {
                console.log("enable " + this.entity.name);
            }
        }, this);

        this.on('destroy', function () {
            if(this.isAdded) {
                console.log("destroy " + this.entity.name);
            }
        }, this);

        this.on('disable', function () {
            if(this.isAdded) {
                console.log("disable " + this.entity.name);
            }
        }, this);*/
}

StarPlacer.prototype.update = function(dt) {
    this.timer += dt;
    if(this.timer > 3){
        this.timer = 0;
        //this.setLevelElement(Math.round(1 + Math.random() * 4));
        //this.entity.destroy();
    }
}

StarPlacer.prototype.setLevelElement = function(level) {
    //level = 5;
    //console.log("setLevelElement = " + level);
    this.children = this.entity.findByTag("StarModel");
    const billBoardEdges = this.entity.findByTag("BillBoardEdges");
    if(!billBoardEdges || !this.children){
        console.log("billBoardEdges || this.children is null");
        return;
    }

    billBoardEdges[0].setLocalPosition(this.spaceBetween * -level, 0, 0);
    billBoardEdges[1].setLocalPosition(this.spaceBetween * level, 0, 0);

    const children = this.children;
    const length = children.length;

    for(var i = 0; i < length; i++){
        children[i].enabled = false;
    }
    if(level <= 1){
        children[0].enabled = true;
        const t = 0.5;
        var lerpValue = Lerp(billBoardEdges[0].getLocalPosition().x, billBoardEdges[1].getLocalPosition().x, t);
        children[0].setLocalPosition(0, 0, 0);
        this.initialize = true;
        return;
    }

    const percent = (1 / level);
    for(var i = 0; i < level; i++){
        children[i].enabled = true;
        const index = i + 1;
        const isEvan = (level % 2) ? 0.5 : 0.5;
        const t = (percent * index) - (percent * isEvan);
        var lerpValue = Lerp(billBoardEdges[0].getLocalPosition().x, billBoardEdges[1].getLocalPosition().x, t);
        //console.log(t);
        children[i].setLocalPosition(lerpValue, 0, 0);
        //console.log(children[i]);
    }

    this.initialize = true;
};


StarPlacer.prototype.setLevel = function(level) {

    this.children = this.entity.findByTag("StarModel");
    const children = this.children;
    const length = 0.4;
    const degree = 2 * Math.PI / level;

    if(level == 1){
        children[0].enabled = true;
        children[0].setLocalPosition(0, 2, 0);
        console.log(children[0].getLocalPosition());
    }else{
        for(var i = 0; i < level; i++){
            children[i].enabled = true;
            var index = i;
            const x  = Math.sin((degree * index) + degree * 0.5);
            const z  = Math.cos((degree * index) + degree * 0.5);
            children[i].setLocalPosition(x * length, 2, z * length);
        }
    }
};

StarPlacer.prototype.setUILevel = function(level) {

    this.children = this.entity.findByTag("StarModel");
    const children = this.children;    
    var length = 0.7;
    const degree = 2 * Math.PI / level;

    if(level == 1){
        const x  = Math.sin(degree + (degree * 0));
        const z  = Math.cos(degree + (degree * 0));
        children[0].setLocalPosition(0, 0, 0);
    }else{
        for(var i = 0; i < level; i++){
            children[i].enabled = true;
            var index = i;
            const x  = Math.sin(degree + (degree * index));
            const z  = Math.cos(degree + (degree * index));
            children[i].setLocalPosition(x * length, 0, z * length);
        }
    }

    /*var length = 0.4;

    console.log(starModels);

    const degree = 2 * Math.PI / level;

    var position1 = new pc.Vec3(-1, 0, 0);
    var position2 = new pc.Vec3(1, 0, 0);

    if(level == 1){
        var lerpValue = pc.math.lerp(position1, position2, 0.5);
        starModels[0].setLocalPosition(lerpValue);
    }else{
        for(var i = 0; i < level; i++){
            starModels[i].enabled = true;
            var lerpValue = pc.math.lerp(position1, position2, (1 / level) * i);

            starModels[i].setLocalPosition(lerpValue);
        }
    }*/
};


// swap method called for script hot-reloading
// inherit your script state here
// StarPlacer.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/