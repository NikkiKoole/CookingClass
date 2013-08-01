var DomEdit = (function () {
    function createDiv(id) {
        var div = document.createElement("div");
        div.id = id;
        div.style.position = "absolute";
        return div;
    }

    function setDimension(el, w, h) {
        el.style.width = w + "px";
        el.style.height = h + "px"
    }

    function setPosition(el, x, y, z, rotation) {
        el.style['-webkit-transform'] = 'translate3d(' + x + 'px' + ',' + y + 'px' + ',' + z + 'px' + ') rotate(' + rotation + 'deg)';
        //console.log(el, x, y, z, rotation);
    }

    function setColor(el, color) {
        var re = /^#([0-9a-f]{3}){1,2}$/i;
        var c = re.exec(color);
        if (!c) {
            throw(new Error('Color ' + color + ' is not well defined'));
        }
        el.style['background-color'] = color;
    }
    
    function appendChild(el) {
        document.getElementById('container').appendChild(el);
    }
    

    function rect(id, x, y, w, h, z, angle, color) {
        var el = createDiv(id);
       // setDimension(el, w, h)
       // setColor(el, color);
        setPosition(el, x, y, z, angle);
        appendChild(el);
        console.log(el);
        return el;
    }

    function line(id, x1, y1, x2, y2, width, color) {
        var length = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
        var angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        var el = createDiv(id);
        setDimension(el, width, length)
        setPosition(el, x1, y1, 0, angle);
        setColor(el, color);

        el.style['-webkit-transform-origin'] = '0 100%';
        appendChild(el);
        return el;
    }

    function triangle(id, x, y, z, left, right, bottom, rotation, color) {
        var el = createDiv(id);
        setDimension(el, w, h);
        setPosition(el, x, y, z, rotation);

        el.style['border-left'] = left + 'px solid transparent';
        el.style['border-right'] = right + 'px solid transparent';
        el.style['border-bottom'] = bottom + 'px solid ' + color;
        el.style['font-size'] = '0px';
        el.style['line-height'] = '0px';
        appendChild(el);
        return el;
    }

    function circle(id, x, y, z, w, h, rotation, color) {
        var el = createDiv(id);
        setDimension(el, w, h);
        setColor(el, color);
        setPosition(el, x, y, z, rotation);

        el.style['-webkit-border-radius'] = '50%';
        appendChild(el);
        return el;
    }

    function roundedRect(id, x, y, z, w, h, rotation, color, rounded) {
        var el = createDiv(id);
        setDimension(el, w, h);
        setColor(el, color);
        setPosition(el, x, y, z, rotation);

        el.style['-webkit-border-radius'] = rounded + 'px';
        appendChild(el);
        return el;
    }



    return {
        addRectangle: rect,
        addLine: line,
        addTriangle: triangle,
        addCircle: circle,
        addRoundedRect: roundedRect

    }

})();


function GameObject(id, type) {
    //afhankelijk van het type krijgt een GameObject een collision method en extra data.
    this.id = id;
    this.type = type;
    this.div;

    if (this.type === 'rectangle'){
        this.width = 40;
        this.height = 40;    
    }
    if (this.type === 'circle'){
        this.radius = 40;
    }
    if (this.type === 'triangle'){
        this.left = 40;
        this.right = 40;
        this.bottom = 40;
    }
    if (this.type === 'line'){
        this.x2 = 40;
        this.y2 = 40;
        this. width = 3;
    }
    if (this.type === 'rounded'){
        this.width = 40;
        this.height = 40;
        this.rounded = 10;
        this.setPosition = function(x, y, z) {
            console.log('my hiya is differetn');        
            return this;
        }
    }
}

GameObject.prototype.getPosition = function() {
            console.log(this.div.style['-webkit-transform']);
            console.log(this.div)
            var results = (this.div.style['-webkit-transform']).match(/matrix(?:(3d)\(\d+(?:, \d+)*(?:, (\d+))(?:, (\d+))(?:, (\d+)), \d+\)|\(\d+(?:, \d+)*(?:, (\d+))(?:, (\d+))\))/)

    if(!results) return [0, 0, 0];
    if(results[1] == '3d') return results.slice(2,5);

    results.push(0);
    return results.slice(5, 8);                                     
        //return (this.div.style['-webkit-transform'])
        
        //console.log('hiya');        
        //return this;
    }


GameWorld = (function () {
    var gameObjects = [];
    var uniqueIDCounter = 0;
    
    function typeAllowed(t) {
        var allowed = ['rectangle', 'circle', 'line', 'triangle', 'rounded', 'sprite', 'sheet'];
        for (var i=0; i<allowed.length; i+= 1) {
            if (t===allowed[i]) {
                return true;
            }
        }
        throw(new Error("Wrong Type"));
    }


    function idAllowed(id) {
        for (var i=0; i<gameObjects.length; i += 1){
            if (id===gameObjects[i].id) {
                throw(new Error("Wrong Id"));                
                return false;            
            }
        }
        return true;
        
    }

    function getObject(id) {
        for (var i = 0; i < gameObjects.length; i += 1) {
            if (id === gameObjects[i].id) {
                return gameObjects[i];
            }
        }
        return false;
    }

    function deleteObject(id) {
        var index=-1;        
        for (var i=0; i<gameObjects.length;i+=1) {
            if (id === gameObjects[i].id) {
                index = i;
                
            }
        }
        if (index>-1) {
            gameObjects.splice(index,1);
        }
    }

    function deleteAllGameObjects() {
        while (gameObjects.length > 0) {
         gameObjects.pop();
        }         
    }
    function countGameObjects() {
        return gameObjects.length;
    }

    function createObject(arg1, arg2) {
        // first try and find a type
        // then an id, if no id is found, generate one.
        var type, id,needsMore=false;
        if (typeof arg1 === 'string' && arg2 === undefined){
                 // createObject('rect') //heeft dus een generated ID nodig
           
                type = arg1;
                id = 'GID'+type+uniqueIDCounter;
                uniqueIDCounter += 1;
                

        } else  if (typeof arg1 === 'string' && typeof arg2 === 'string'){
            // createObject('rect','idName')                
            type = arg1;
            id = arg2;   

        } else  if (typeof arg1 === 'object' && arg2 === undefined) {
                // createObject({id:'myId', type:'rectangle'})
                type = arg1.type;                
                if (arg1.hasOwnProperty('id') ) {
                    id = arg1.id;                
                } else {
                    id = 'GID'+type+uniqueIDCounter;
                    uniqueIDCounter += 1;
                }
                if (Object.keys(arg1).length >2 ) {
                    needsMore = true;                    
                }
            } else {
            console.log('these arguments are wrong'+arg1+", "+arg2);
        }
        
        if (typeAllowed(type) && idAllowed(id)) {
            var gameObject = new GameObject(id, type);            
            gameObjects.push(gameObject);
            if (needsMore) {
                // will overwrite properties it finds that are also in the current GameObject,
                // so you can define an object partly or fully, or from an external file 
      
                for (var i=0;i<Object.keys(arg1).length;i+=1){
                    var key = Object.keys(arg1)[i];
                    if (key !== 'id' || key !=='type') {
                        if (gameObject[key] ){
                            gameObject[key] = arg1[key];
                        }
                    }            
                            
                }
            }
        }

        
        //DomEdit.createDiv(id);
        gameObject.div = DomEdit.addRectangle(id, 100, 100, 100, 45, 23,56)
        //console.log(gameObject.div);        
        return gameObject;
        
    }

    return {
        initStage:function() {
        },
        createObject:createObject,
        getObject:getObject,
        deleteObject:deleteObject,
        deleteAllGameObjects:deleteAllGameObjects,
        countGameObjects:countGameObjects
    }
})();


//var el = DomEdit.addRectangle('nikkiTest', 100, 100, 30, 30, 0, 5, '#ff0000');//.getPosition();
//el.getPosition();

//console.log(GameWorld.createObject('rectangle'));
//console.log(GameWorld.createObject('circle'));
//console.log(GameWorld.createObject('triangle'));
//console.log(GameWorld.createObject('rounded').setPosition().setPosition());
//console.log(GameWorld.createObject('line').setPosition());

//console.log(GameWorld.createObject({id:'nikki1',type:'rounded'}));
