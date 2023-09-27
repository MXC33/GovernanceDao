var InputManager = pc.createScript('inputManager');
InputManager.attributes.add('gameLogicsEntity', {type: 'entity', default: null, title: 'Game Logics Entity'});

// initialize code called once per entity
InputManager.prototype.initialize = function() {
    this.gameLogics = this.gameLogicsEntity.script.gameLogics;
    
    this._isMouseDown = false;
    this._mousePos = null;
    this._mouseDownPos = null;
    this._mouseDownTimer = 0.0;

    this.isMouseDown = false;
    this.isMousePressed = false;
    this.mousePos = null;


    if(this.app.touch && !this.app.mouse) {
        this.app.touch.on(pc.EVENT_TOUCHSTART, this.onTouchStartEndCancel, this);
        this.app.touch.on(pc.EVENT_TOUCHEND, this.onTouchStartEndCancel, this);
        this.app.touch.on(pc.EVENT_TOUCHCANCEL, this.onTouchStartEndCancel, this);

        this.app.touch.on(pc.EVENT_TOUCHMOVE, this.onTouchMove, this);
        
        this.on('destroy', function() {
            this.app.touch.off(pc.EVENT_TOUCHSTART, this.onTouchStartEndCancel, this);
            this.app.touch.off(pc.EVENT_TOUCHEND, this.onTouchStartEndCancel, this);
            this.app.touch.off(pc.EVENT_TOUCHCANCEL, this.onTouchStartEndCancel, this);

            this.app.touch.off(pc.EVENT_TOUCHMOVE, this.onTouchMove, this);
        });
    } else {
        this.app.mouse.on(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);
        this.app.mouse.on(pc.EVENT_MOUSEUP, this.onMouseUp, this);
        this.app.mouse.on(pc.EVENT_MOUSEMOVE, this.onMouseMove, this);

        this.on('destroy', function() {
            this.app.mouse.off(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);
            this.app.mouse.off(pc.EVENT_MOUSEUP, this.onMouseUp, this);
            this.app.mouse.off(pc.EVENT_MOUSEMOVE, this.onMouseMove, this);
        }, this);
    }
};


InputManager.prototype.onTouchStartEndCancel = function (event) {
    var touches = event.touches;
    if(!this.gameLogics.isCursorInScreen){
        this._mouseDownTimer = 1000;//float.maxValue;
        //this._isMouseDown = false;
        //this.mousePos = null;
    } else if (touches.length == 1) {
        if(!this._isMouseDown) {
            this._mouseDownTimer = 0.0;
            this._isMouseDown = true;
            this._mousePos = new pc.Vec2(touches[0].x, touches[0].y);
            this._mouseDownPos = this._mousePos.clone();
        }
    
    } else if(touches.length == 0) {
        if(this._isMouseDown) {
            const dragDistance = !this._mousePos? 0.0: new pc.Vec2().sub2(this._mousePos, this._mouseDownPos).length();
            if(this._mouseDownTimer < 0.5 && dragDistance < 10.0){
                this._isMousePressed = true;
            }
        }
        
        this._mousePos = null;
        this._isMouseDown = false;        
    } else {
        //Hack when using multiple fingers
        this._mouseDownTimer = 1000;//float.maxValue;
        //this._isMouseDown = false;
        //this._mousePos = null;
    }
};


InputManager.prototype.onTouchMove = function (event) {
    var touches = event.touches;
    this._mousePos = new pc.Vec2(touches[0].x, touches[0].y);
   // this._isMouseDown = false;
   // this._mousePos = null;
    this._mouseDownTimer = 1000;
};


InputManager.prototype.onMouseMove = function (event) {
    if(this._mousePos) {
        this._mousePos.x = event.x;
        this._mousePos.y = event.y;
    } else {
        this._mousePos = new pc.Vec2(event.x, event.y);
    }
};


InputManager.prototype.onMouseDown = function (event) {
    if (event.button === pc.MOUSEBUTTON_LEFT && this.gameLogics.isCursorInScreen) {
        this._mouseDownTimer = 0.0;
        this._isMouseDown = true;
        if(this._mousePos)
            this._mouseDownPos = this._mousePos.clone();
    }
};

InputManager.prototype.onMouseUp = function (event) {
    if (event.button === pc.MOUSEBUTTON_LEFT && this.gameLogics.isCursorInScreen) {
        this._isMouseDown = false;
        
        const dragDistance = !this._mousePos? 0.0: new pc.Vec2().sub2(this._mousePos, this._mouseDownPos).length();
        if(this._mouseDownTimer < 0.5 && dragDistance < 10.0){
            this._isMousePressed = true;
        }
    }
};

// update code called every frame
InputManager.prototype.update = function(dt) {

    this.isMouseDown = this._isMouseDown;
    this.isMousePressed = this._isMousePressed;
    this._isMousePressed = false;

    if(this._mousePos != null)
        this.mousePos = this._mousePos.clone();
    
    this._mouseDownTimer += dt;
};