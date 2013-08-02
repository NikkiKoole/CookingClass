function GameObject(id, type) {
    //afhankelijk van het type krijgt een GameObject een collision method en extra data.
    this.id = id;
    this.type = type;
    this.div;

    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.rotation = 0;
    this.color;// = '#ffff00';
    this.scaleX = 1;
    this.scaleY = 1;

    if (this.type === 'rectangle'){
        this.width = 40;
        this.height = 40;    
    }
    if (this.type === 'circle'){
        this.radius = 40;
        this.setRadius = function(radius) {
            this.radius = radius;
            DomEdit.setDimension(this.div, this.radius || 0, this.radius || 0);
            return this;
        }
    }
    if (this.type === 'triangle'){
        this.left = 40;
        this.right = 40;
        this.bottom = 140;
        this.setTriangle = function(left, right, bottom) {
            this.left = left;
            this.right = right;
            this.bottom = bottom;
            this.div.style['border-left'] = left + 'px solid transparent';
            this.div.style['border-right'] = right + 'px solid transparent';
            this.div.style['border-bottom'] = bottom + 'px solid ' + (this.color || '#aaf');
           //DomEdit.setDimension(this.div, 0, 0)
            return this;
        }
        this.setDimension= function(width, height) {
            this.left = width/2;
            this.right = width/2;
            this.bottom = height;
            this.div.style['border-left'] = this.left + 'px solid transparent';
            this.div.style['border-right'] = this.right + 'px solid transparent';
            this.div.style['border-bottom'] = this.bottom + 'px solid ' + (this.color || '#aaf');
            return this;
        }
        this.setColor = function(c){
            this.color = c;
            this.div.style['border-bottom'] = this.bottom + 'px solid ' + this.color;
            return this;
        }
    }
    if (this.type === 'line'){
        this.x2 = 100;
        this.y2 = 100;
        this.width = 3;
        this.from = function (x, y) {
            this.x = x;
            this.y = y;
            DomEdit.updateLine(this.div, this,  this.x, this.y, this.x2, this.y2);
            return this;
        }        
        this.to = function (x, y) {
            this.x2 = x;
            this.y2 = y;
             DomEdit.updateLine(this.div,this,  this.x, this.y, this.x2, this.y2)
            return this;
        }
        this.setWidth = function(w) {
            this.width = w; 
            DomEdit.updateLine(this.div, this,  this.x, this.y, this.x2, this.y2);
            return this;       
        }
        //moet wanneer verplaats or begin/eind anders gemaakt word opnieuw uitgerekent worden
    }
    if (this.type === 'rounded'){
        this.width = 40;
        this.height = 40;
        this.rounded = 10;
    }
    if (this.type === 'group') {
        //this.div.style.position = "relative";
        this.addObject = function(gameObject) {
            this.div.style.position="relative";
            var found = document.getElementById(gameObject.id);
            if (found) {
                this.div.appendChild(found);            
            } else {
                //console.log('not found');            
            }
            return this;
            //should atleast look in the dom for this id, 
            // if found should make that dive one of the groups children in the dom.
        }    
    }
}

GameObject.prototype.setDimension = function(w, h) {
    if (this.width && this.height) {
        this.width = w;
        this.height = h;
        DomEdit.setDimension(this.div, w, h)
    }
    return this;
}

GameObject.prototype.setOpacity = function (value) {
    DomEdit.setOpacity(this.div, value);
    return this;
}

GameObject.prototype.setGradient = function (from, to) {
    DomEdit.setGradient(this.div, from, to);
    return this;
}

GameObject.prototype.setDropShadow = function(h, v, blur, spread, color) {
    DomEdit.setBoxShadow(this.div, h, v, blur || 1, spread || 1, color || '#000');
    return this;
}

GameObject.prototype.setColor = function(color) {
    if (!validColor(color)) {
        throw(new Error('Color ' + color + ' is not well defined'));
    } else {
        this.color = color || this.color;
        DomEdit.setColor(this.div, this.color)
    }
    return this;
}
GameObject.prototype.getPosition = function() {
    return {x:this.x, y:this.y, z:this.z };
}
GameObject.prototype.setTransform = function (x,y,z,rotation, scaleX,scaleY) {
    this.x = x || this.x;
    this.y = y || this.y;
    this.z = z || this.z;
    this.rotation = rotation  || this.rotation;
    this.scaleX = scaleX  || this.scaleX;
    this.scaleY = scaleY|| this.scaleY;
    DomEdit.setPosition(this.div, this.x, this.y, this.z, this.rotation, this.scaleX, this.scaleY);
    return this;
}

GameObject.prototype.setPosition = function(x, y, z) {
    this.x = x || this.x;
    this.y = y || this.y;
    this.z = z || this.z;
    DomEdit.setPosition(this.div, this.x, this.y, this.z, this.rotation, this.scaleX, this.scaleY);
    return this;
}
GameObject.prototype.setZ = function(z) {
    this.z = z || this.z;
    DomEdit.setPosition(this.div, this.x, this.y, this.z, this.rotation, this.scaleX, this.scaleY);
    return this;
}

GameObject.prototype.setRotation = function(rotation) {
    this.rotation = rotation || this.rotation;
    DomEdit.setPosition(this.div, this.x, this.y, this.z, this.rotation, this.scaleX, this.scaleY);
    return this;
}
GameObject.prototype.setScale = function (scaleX, scaleY) {
    this.scaleX = scaleX || this.scaleX;
    this.scaleY = scaleY || this.scaleY;
    DomEdit.setPosition(this.div, this.x, this.y, this.z, this.rotation, this.scaleX, this.scaleY);
    return this;
}

GameObject.prototype.tweenTo = function(duration, args) {
    //function to(args) {
    //needs to recognize : duration, delay, ease 
    //needs to decide which property (try not to use 'all')
    //transform, background-color, opacity, width, height
        console.log(this);
        return this;
};
