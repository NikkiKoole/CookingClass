/*global DomEdit, Color, Group, Rounded, Line, Rectangle, Triangle, Circle, TweenBoss*/
/**GameObject */
"use strict";

function inheritPrototype(subType, superType){
    var prototype = Object.create(superType.prototype);
    prototype.constructor = subType;
    subType.prototype = prototype;
}

function setThat(that, p, v) {
    that[p] = typeof that[p] !== 'undefined' ? v : that[p];
}

function GameObject(id) {
    this.id = id;
    this.div = null;
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.rotation = 0;
    this.color = '#ffaaaa';
    this.scaleX = 1;
    this.scaleY = 1;
    this.parentGroup = null;
}

GameObject.prototype.constructDiv = function() {
    return this;
};

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
        throw (new Error('Color ' + color + ' is not well defined'));
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
//transform
GameObject.prototype.setTransform = function (transform) {
    var x = transform.x || this.x,
        y = transform.y || this.y,
        z = transform.z || this.z,
        rotation = transform.rotation || this.rotation,
        scaleX = transform.scaleX || this.scaleX,
        scaleY = transform.scaleY || this.scaleY;
    //wanneer de numbers als string worden ingevoerd zijn ze relatief.
    if (typeof x === 'string') {x = this.x + parseInt(x, 10); }
    if (typeof y === 'string') {y = this.y + parseInt(y, 10); }
    if (typeof z === 'string') {z = this.z + parseInt(z, 10); }
    if (typeof rotation === 'string') {rotation = this.rotation + parseInt(rotation, 10); }
    if (typeof scaleX === 'string') {scaleX = this.scaleX + parseInt(scaleX, 10); }
    if (typeof scaleY === 'string') {scaleY = this.scaleY + parseInt(scaleY, 10); }

    setThat(this, 'x', x);
    setThat(this, 'y', y);
    setThat(this, 'z', z);
    setThat(this, 'rotation', rotation);
    setThat(this, 'scaleX', scaleX);
    setThat(this, 'scaleY', scaleY);
    this.setToCurrent();
    //DomEdit.setPosition(this.div, this.x, this.y, this.z, this.rotation, this.scaleX, this.scaleY);
    return this;
};

GameObject.prototype.setToCurrent= function() {
    DomEdit.setTransform(this.div, this.x, this.y, this.z, this.rotation, this.scaleX, this.scaleY);
}

GameObject.prototype.setPosition = function (x, y, z) {
    setThat(this, 'x', x);
    setThat(this, 'y', y);
    setThat(this, 'z', z);
    this.setToCurrent();
    return this;
};
GameObject.prototype.setZ = function (z) {
    setThat(this, 'z', z);
    this.setToCurrent();
    return this;
};

GameObject.prototype.setRotation = function (rotation) {
    setThat(this, 'rotation', rotation);
    this.setToCurrent();
    return this;
};
GameObject.prototype.setScale = function (scaleX, scaleY) {
    if (typeof scaleY == 'undefined') {scaleY = scaleX; }
    setThat(this, 'scaleX', scaleX);
    setThat(this, 'scaleY', scaleY);
    this.setToCurrent();
    return this;
};

GameObject.prototype.tweenTo = function (duration, args) {
    TweenBoss.executeTween(this, duration, args);
    return this;
};

/*
// deze global functie gaat straks een  rol spelen bij het serializeren van een object.
replacer = function(key, value)
{

  if (key=="div"||key=="canvas"||key=="ctx")
  {
      return undefined;
  }

  else return value;


}
*/
inheritPrototype(Group, GameObject);
function Group(id) {
    GameObject.call(this, id, 'group');
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
    //this.div.style['background-color'] = "#f00";
    var found = document.getElementById(gameObject.id);
    if (found) {
        gameObject.parentGroup = this;
        DomEdit.appendChildTo(found, this.div);
        // will need to recalculate dimensions after an Add.
    }
    return this;
};
Group.prototype.removeObject = function (gameObject) {
    var found = document.getElementById(gameObject.id);
    if (found) {
        gameObject.parentGroup = null;
        DomEdit.appendChildTo(found);
         // will need to recalculate dimensions after an Remove.
    }
};

inheritPrototype(Rectangle, GameObject);
function Rectangle(id) {
        GameObject.call(this, id, 'rectangle');
        this.width = 40;
        this.height = 40;
}

Rectangle.prototype .constructDiv = function() {
    this.div = DomEdit.addRectangle(this);
    return this;    
};


inheritPrototype(Rounded, Rectangle);

function Rounded(id) {
    GameObject.call(this, id, 'rounded');
    this.rounded = 10;
}
Rounded.prototype.constructDiv = function() {
    this.div = DomEdit.addRounded(this);
    return this;        
};

inheritPrototype(Line, GameObject);

function Line(id) {
    GameObject.call(this, id, 'line');
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

inheritPrototype(Triangle, GameObject);

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


inheritPrototype(Circle, GameObject);

function Circle(id) {
    GameObject.call(this, id, 'circle');
    this.diameter = 40;
}

Circle.prototype.setDiameter = function(diameter) {
    this.diameter = diameter;
    DomEdit.setDimension(this.div, this.diameter || 0, this.diameter || 0);
    return this; 
};

Circle.prototype.constructDiv = function() {
    this.div = DomEdit.addCircle(this);
    return this;    
};



