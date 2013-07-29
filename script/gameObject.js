
function GameObject() {
    this.name;
    this.draggable=false;
    this.x; 
    this.y;
    this.originX;
    this.originY;
    this.width;
    this.height;
    this.src;
    this.layer;
    this.rotation;
    this.div;
    this.frames;
    this.lastFrame;
}

GameObject.prototype = {
    x:this.x,
    y:this.y,
    originX:this.originX,
    originY:this.originY,
    width:this.width,
    height:this.height,
    rotation:this.rotation,

    setDraggable:function(value) {
        this.draggable = value; 
        this.div.draggable=value;   
    },
    setZ:function(z) {
        DomManipulator.setZ(this.name, z);       
    },
    setDimension:function(w, h) {
        this.width = w;
        this.height = h;    
    },
    setPosition:function(x, y, rot) {
        this.x = x;
        this.y = y;    
        this.rotation = rot;
        DomManipulator.position(this.div,x,y, 0,rot );
    },
    setVisible: function(value) {
        DomManipulator.setVisible(this.name, value);
    },

    getFrame:function(name) {
        if (this.frames) {
        for (var f=0; f<this.frames.length;f+=1) {
            var frame=this.frames[f];
            if (frame.name===name) {
                return frame;            
            }        
        }   
        }
    },
    setFrame:function(name) {
        
        var f = this.getFrame(name);  
        if (this.getFrame(name)){
            DomManipulator.setFrame(this.div, this.src, f);
            this.lastFrame = f;
            
        }    
    },
    cycle:function(name) {
        var next;
        //first check if the lastFrame is named the same as name
            
            if (this.lastFrame && this.lastFrame.name.indexOf(name)===0) {
                 
                //get current number of lastFrame
                var currentNumber = parseInt(this.lastFrame.name.replace(name, '').trim());
                               
                //test to see if you can advance a step
                if (this.getFrame(name+(currentNumber+1))) {
                    next = this.getFrame(name+(currentNumber+1));
                }  else {
                    next = this.getFrame(name+(1));                   
                }           
            } else {
                next = this.getFrame(name+(1));
            }

            if (next) {
                this.setFrame(next.name);
                this.lastFrame = next; 
            }

    },

    fromJSON:function(data) {
        this.name = data.name;
        this.src = "images/"+data.src;
        this.x = data.x;
        this.y = data.y;
        this.layer = data.layer;
        this.originX = data.originX;
        this.originY = data.originY;
        this.width = data.width;
        this.height = data.height;
        this.frames = data.frames;
        this.rotation = data.rotation;
        
        
        this.constructDIV(data);
        this.setFrame(data.initial);
        this.setVisible(data.visible);   
         
    },
    constructDIV:function(item) {
        this.div = DomManipulator.createSprite(item.name, item.x, item.y,item.width, item.height, item.src, item.rotation, item.layer);
    }
}

LayeredGameObect.prototype = new GameObject();
LayeredGameObect.constructor = LayeredGameObect;
function LayeredGameObect() {
    this.layers;
    this.layerOffsets;
}

LayeredGameObect.prototype = {
    fromJSON:function(data) {
        this.name = data.name;
        this.src = "images/"+data.src;
        this.x = data.x;
        this.y = data.y;
        this.originX = data.originX;
        this.originY = data.originY;
        this.width = data.width;
        this.height = data.height;
        
        this.rotation = data.rotation;
        this.layers= [];
        this.layerOffsets= [];
        for (var i=0;i<data.layers.length; i+=1) {
            var item = data.layers[i];            
            var gameObject =  Object.create(GameObject.prototype);
            gameObject.fromJSON(item);
            this.layerOffsets.push({x:0,y:0});
            this.layers.push(gameObject);       
        }
    }, 
    setLayerOffset:function(name,x,y) {
        var offset = this.getLayerOffset(name)
            offset.x = x;
            offset.y = y;
           var item = this.getLayer(name);
             item.setPosition(x+this.x,y+this.y,this.rotation);
    },
    getLayer:function(name) {
        for (var i=0; i<this.layers.length; i+=1) {
            if (this.layers[i].name === name) {
                return this.layers[i];            
            }
        }    
    },
    getLayerOffset:function(name) {
        for (var i=0; i<this.layers.length; i+=1) {
            if (this.layers[i].name === name) {
                
                return this.layerOffsets[i]           
            }
        }    
    },
    setPosition:function(x, y, rot) {
        this.x = x;
        this.y = y;    
        this.rotation = rot;
        for (var i=0;i<this.layers.length; i+=1) {
            var item = this.layers[i];  
            item.setPosition(this.layerOffsets[i].x+x,this.layerOffsets[i].y+y,rot);          
        }       
    }
}

