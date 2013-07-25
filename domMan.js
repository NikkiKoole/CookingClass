var domManipulator = (function() {
    var root; //the 'game' div    
    function init(x, y, w, h) {
        root = document.getElementById("game");  
        root.style.width = w+'px';
        root.style.height = h+'px';
        root.style.top = x+'px';
        root.style.left = y+'px';
        return root;  
    }    
    
    function addRect(id, x, y, w, h, color, rotation, layer) {
            var objImage = document.createElement("div");
            setCommon(objImage, id, x, y, w, h, rotation, layer);             
            setColor(objImage, color);
            root.appendChild(objImage); 
            return objImage 
    }

    function addSpr(id, x, y, w, h, url, rotation, layer) {
            var objImage = document.createElement("div");
            setCommon(objImage, id, x, y, w, h, rotation, layer);            
            setBackdropURL(objImage, url);
            root.appendChild(objImage); 
            return objImage    
    } 

    function flash(id) {
        var el = document.getElementById(id);
        setColor(el, '#FF0000');
        //setColor(el, 'none');    
    }
 
    function setBackdropURL(el, url) {
        el.style['background']='url('+url+') 0 0';    
    }    

    function setColor(el, color) {
         el.style['background-color']=color;
    }
    
    function setCommon(el, id, x, y, w, h, angle, z) {
        el.style.width = w+"px";
        el.style.height = h+"px";    
        el.style['-webkit-transform'] = 'translate3d('+x+'px'+','+y+'px'+','+z+'px'+') rotate('+angle+'deg)';
        el.style.zIndex= z;    
        el.id = id;
        el.style.display = "block";
        el.style.position='absolute';
    }
    
    // use common instead
    function setDimensions(el, w, h) {
        el.style.width = w+"px";
        el.style.height = h+"px";
    }

    function setPosition(el, x, y, z, angle) {
        el.style['-webkit-transform'] = 'translate3d('+x+'px'+','+y+'px'+','+z+'px'+') rotate('+angle+'deg)';    
    }

    function setZindex(el, z) {
        el.style.zIndex= z;
    }

    function setBase(el, id) {
        el.id = id;
        el.style.display = "block";
        el.style.position='absolute';
    }

    return {
        initRoot:init,
        createRectangle:addRect,
        createSprite:addSpr,
        position:setPosition,
        flashObj:flash    
    }
})();
