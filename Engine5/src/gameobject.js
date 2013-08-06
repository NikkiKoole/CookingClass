function GameObject(id) {
    "use strict";
    this.id = id;
    this.div = null;
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.rotation = 0;
    this.color = '#ffffaa';
    this.scaleX = 1;
    this.scaleY = 1;
}

GameObject.prototype.constructDiv = function() {
    return this;
}

GameObject.prototype.setDimension = function (w, h) {
    if (this.width && this.height) {
        this.width = w;
        this.height = h;
        DomEdit.setDimension(this.div, w, h);
    }
    return this;
};

GameObject.prototype.setOpacity = function (value) {
    DomEdit.setOpacity(this.div, value);
    return this;
};

GameObject.prototype.setGradient = function (from, to) {
    DomEdit.setGradient(this.div, from, to);
    return this;
};

GameObject.prototype.setDropShadow = function (h, v, blur, spread, color) {
    DomEdit.setBoxShadow(this.div, h, v, blur || 1, spread || 1, color || '#000');
    return this;
};

GameObject.prototype.setColor = function (color) {
    if (!Color.valid(color)) {
        throw (Error('Color ' + color + ' is not well defined'));
    }
    color = Color.pad(color);
    this.color = color || this.color;
    DomEdit.setColor(this.div, this.color);
    return this;
};

GameObject.prototype.setBrightness = function (brightness) {
    this.setColor(Color.getAdjustedColor(this.color, {
        brightness: brightness
    }));
    return this;
};

GameObject.prototype.setSaturation = function (saturation) {
    this.setColor(Color.getAdjustedColor(this.color, {
        saturation: saturation
    }));
    return this;
};

GameObject.prototype.getPosition = function () {
    return {
        x: this.x,
        y: this.y,
        z: this.z
    };
};

GameObject.prototype.setTransform = function (x, y, z, rotation, scaleX, scaleY) {
    //wanneer de numbers als string worden ingevoerd zijn ze relatief.
    if (typeof x === 'string') {x = this.x + parseInt(x); }
    if (typeof y === 'string') {y = this.y + parseInt(y); }
    if (typeof z === 'string') {z = this.z + parseInt(z); }
    if (typeof rotation === 'string') {rotation = this.rotation + parseInt(rotation); }
    if (typeof scaleX === 'string') {scaleX = this.scaleX + parseInt(scaleX); }
    if (typeof scaleY === 'string') {scaleY = this.scaleY + parseInt(scaleY); }

    this.x = typeof x !== 'undefined' ?  x : this.x;
    this.y = typeof y !== 'undefined' ?  y : this.y;
    this.z = typeof z !== 'undefined' ?  z : this.z;
    this.rotation = typeof rotation !== 'undefined' ?  rotation : this.rotation;
    this.scaleX = typeof scaleX !== 'undefined' ?  scaleX : this.scaleX;
    this.scaleY = typeof scaleY !== 'undefined' ?  scaleY : this.scaleY;

    DomEdit.setPosition(this.div, this.x, this.y, this.z, this.rotation, this.scaleX, this.scaleY);
    return this;
};

GameObject.prototype.setPosition = function (x, y, z) {
    this.x = typeof x !== 'undefined' ?  x : this.x;
    this.y = typeof y !== 'undefined' ?  y : this.y;
    this.z = typeof z !== 'undefined' ?  z : this.z;
    DomEdit.setPosition(this.div, this.x, this.y, this.z, this.rotation, this.scaleX, this.scaleY);
    return this;
};
GameObject.prototype.setZ = function (z) {
    this.z = typeof z !== 'undefined' ?  z : this.z;
    DomEdit.setPosition(this.div, this.x, this.y, this.z, this.rotation, this.scaleX, this.scaleY);
    return this;
};

GameObject.prototype.setRotation = function (rotation) {
    this.rotation = typeof rotation !== 'undefined' ?  rotation : this.rotation;
    DomEdit.setPosition(this.div, this.x, this.y, this.z, this.rotation, this.scaleX, this.scaleY);
    return this;
};
GameObject.prototype.setScale = function (scaleX, scaleY) {
    if (typeof scaleY !== 'number') {scaleY = scaleX}
    this.scaleX = typeof scaleX !== 'undefined' ?  scaleX : this.scaleX;
    this.scaleY = typeof scaleY !== 'undefined' ?  scaleY : this.scaleY;
    DomEdit.setPosition(this.div, this.x, this.y, this.z, this.rotation, this.scaleX, this.scaleY);
    return this;
};

GameObject.prototype.tweenTo = function (duration, args) {
    TweenBoss.executeTween(this, duration, args);
    return this;
};

Group.prototype = new GameObject();
Group.prototype.constructor = Group;

function Group(id) {
    this.width = 40;
    this.height = 40;
     // will need to recalculate dimensions after any of its children moves individually.
}

Group.prototype.constructDiv = function() {
    this.div = DomEdit.addGroup(this);
    return this;        
};
Group.prototype.addObject = function (gameObject) {
    this.div.style.position = "relative";
    var found = document.getElementById(gameObject.id);
    if (found) {
        DomEdit.appendChildTo(found, this.div);
        // will need to recalculate dimensions after an Add.
    }
    return this;
};
Group.prototype.removeObject = function (gameObject) {
    var found = document.getElementById(gameObject.id);
    if (found) {
        DomEdit.appendChildTo(found)
         // will need to recalculate dimensions after an Remove.
    }
}

Rounded.prototype = new GameObject();
Rounded.prototype.constructor = Rounded;
function Rounded(id) {
    GameObject.call(this, id, 'triangle');
    this.width = 40;
    this.height = 40;
    this.rounded = 10;
}
Rounded.prototype.constructDiv = function() {
    this.div = DomEdit.addRounded(this);
    return this;        
};


Line.prototype = new GameObject();
Line.prototype.constructor = Line;

function Line(id) {
    GameObject.call(this, id, 'triangle');
    this.x2 = 100;
    this.y2 = 100;
    this.width = 3;
}

Line.prototype.constructDiv = function() {
    this.div = DomEdit.addLine(this);
    return this;        
};

Line.prototype.from = function (x, y) {
    this.x = x;
    this.y = y;
    DomEdit.updateLine(this.div, this, this.x, this.y, this.x2, this.y2);
    return this;
};

Line.prototype.to = function (x, y) {
    this.x2 = x;
    this.y2 = y;
    DomEdit.updateLine(this.div, this, this.x, this.y, this.x2, this.y2);
    return this;
};

Line.prototype.setWidth = function (w) {
    this.width = w;
    DomEdit.updateLine(this.div, this, this.x, this.y, this.x2, this.y2);
    return this;
};

Triangle.prototype = new GameObject();
Triangle.prototype.constructor = Triangle;

function Triangle(id) {
    GameObject.call(this, id, 'triangle');
    this.left = 40;
    this.right = 40;
    this.bottom = 140;
}

Triangle.prototype.constructDiv = function() {
    this.div = DomEdit.addTriangle(this);
    return this;        
};
Triangle.prototype.setTriangle = function (left, right, bottom) {
    this.left = left;
    this.right = right;
    this.bottom = bottom;
    this.div.style['border-left'] = left + 'px solid transparent';
    this.div.style['border-right'] = right + 'px solid transparent';
    this.div.style['border-bottom'] = bottom + 'px solid ' + (this.color || '#aaf');
    //DomEdit.setDimension(this.div, 0, 0)
    return this;
};
Triangle.prototype.setDimension = function (width, height) {
    this.left = width / 2;
    this.right = width / 2;
    this.bottom = height;
    this.div.style['border-left'] = this.left + 'px solid transparent';
    this.div.style['border-right'] = this.right + 'px solid transparent';
    this.div.style['border-bottom'] = this.bottom + 'px solid ' + (this.color || '#aaf');
    return this;
};
Triangle.prototype.setColor = function (c) {
    this.color = c;
    this.div.style['border-bottom'] = this.bottom + 'px solid ' + this.color;
    return this;
};

Rectangle.prototype = new GameObject();
Rectangle.prototype.constructor = Rectangle;

function Rectangle(id) {
        GameObject.call(this, id, 'rectangle');
        this.width = 40;
        this.height = 40;
}

Rectangle.prototype .constructDiv = function() {
    this.div = DomEdit.addRectangle(this);
    return this;    
}

Circle.prototype = new GameObject();
Circle.prototype.constructor = Circle;

function Circle(id) {
    GameObject.call(this, id, 'circle');
    this.diameter = 40;
}

Circle.prototype.setDiameter = function(diameter) {
    this.diameter = diameter;
    DomEdit.setDimension(this.div, this.diameter || 0, this.diameter || 0);
    return this; 
}

Circle.prototype.constructDiv = function() {
    this.div = DomEdit.addCircle(this);
    return this;    
}



