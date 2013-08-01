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
    }

    function setColor(el, color) {
        var re = /^#([0-9a-f]{3}){1,2}$/i;
        var c = re.exec(color);
        if (!c) {
            throw(new Error('Color ' + color + ' is not well defined'));
        }
        el.style['background-color'] = color;
    }


    function rect(id, x, y, w, h, z, angle, color) {
        var el = createDiv(id);
        setDimension(el, w, h)
        setColor(el, color);
        setPosition(el, x, y, z, angle);
        document.getElementById('game').appendChild(el);
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
        document.getElementById('game').appendChild(el);
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
        document.getElementById('game').appendChild(el);
        return el;
    }

    function circle(id, x, y, z, w, h, rotation, color) {
        var el = createDiv(id);
        setDimension(el, w, h);
        setColor(el, color);
        setPosition(el, x, y, z, rotation);

        el.style['-webkit-border-radius'] = '50%';
        document.getElementById('game').appendChild(el);
        return el;
    }

    function roundedRect(id, x, y, z, w, h, rotation, color, rounded) {
        var el = createDiv(id);
        setDimension(el, w, h);
        setColor(el, color);
        setPosition(el, x, y, z, rotation);

        el.style['-webkit-border-radius'] = rounded + 'px';
        document.getElementById('game').appendChild(el);
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

var GameWorld = (function () {
    return {
    }
})();

function randColor() {
    // will return a string like '#001122' with always 6 digits;
    var leading = function(amount) {
        var str = "";
        for (var i=0; i< amount; i += 1) {
            str += "0";        
        }
        return str;
    }
     var hexString =  '#' + Math.floor(Math.random() * 16777215).toString(16);
     if (hexString.length !== 7) {
        if (hexString.length < 7) {
            hexString = hexString + leading(7-hexString.length); 
        }
     }
    return hexString;
}

function GameObject(name, type) {
    this.name = name;
    this.type = type;
    // this.div = DomEdit.addTriangle(name, 100,100,0, 30,30,100,10,'#ff00ff');
   // this.div = DomEdit.addCircle(name, 100, 100, 0, 100, 100, '#aa00ff');
    //for (var i = 0; i < 20; i += 1) {
        // this.div = DomEdit.addLine(name, 100,0,Math.random()*600,Math.random()*600,10,randColor());
        //this.div = DomEdit.addCircle(name, Math.random()*600,Math.random()*600,0, 100,100,randColor());
        var color = randColor();
        this.div = DomEdit.addRoundedRect(name, Math.random() * 600, Math.random() * 600, 0, Math.random() * 400, 100, Math.random() * 360, color, 10);
    //}
}



var g = new GameObject('jos', 'rectangle');

//DomEdit.addRectangle();
