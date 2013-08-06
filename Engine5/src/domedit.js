var DomEdit = (function () {
    function createDiv(id) {
        var div = document.createElement("div");
        div.id = id;
        div.style.position = "absolute";
        return div;
    }

    function removeObject(id) {
        var div = document.getElementById(id);
        if (div) {
            div.parentNode.removeChild(div);
        }
    }

    function setDimension(el, w, h) {
        el.style.width = w + "px";
        el.style.height = h + "px";
    }

    
    function setPosition(el, x, y, z, rotation, scaleX, scaleY) {
        el.style.zIndex = z;
        if (scaleX && scaleY) {
            el.style['-webkit-transform'] = 'translate(' + x + 'px' + ',' + y + 'px' + ') rotate(' + rotation + 'deg) scale(' + scaleX + ',' + scaleY + ')';
        } else {
            el.style['-webkit-transform'] = 'translate(' + x + 'px' + ',' + y + 'px' + ') rotate(' + rotation + 'deg)';
        }
    }

    function setColor(el, color) {
        el.style['background-color'] = color;
    }

    function appendChild(el) {
        document.getElementById('container').appendChild(el);
    }
    function appendChildTo(el, to) {
        if (to) {
            to.appendChild(el);
        } else {
            document.getElementById('container').appendChild(el);
        }
    }

    function rect(gameObject) {
        var el = createDiv(gameObject.id);
        setDimension(el, (gameObject.width || 0), (gameObject.height || 0));
        setColor(el, gameObject.color || '#ffff00');
        setPosition(el, gameObject.x, gameObject.y, gameObject.z, gameObject.rotation);
        appendChild(el);
        return el;
    }
    function getLineLengthAndRotation(x1, y1, x2, y2) {
        return {
            lineLength: Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)),
            rotation: Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI
        };
    }

    function updateLine(el, gameObject, x1, y1, x2, y2) {
        var l = getLineLengthAndRotation(x1, y1, x2, y2);
        setDimension(el, l.lineLength, (gameObject.width || 1));
        setColor(el, gameObject.color || '#00ff00');
        el.style['-webkit-transform-origin'] = '0 100%';
        setPosition(el, x1, y1, gameObject.z || 0, l.rotation, 1, 1);
    }



    function line(gameObject) {
        var x1 = gameObject.x || 0,
            y1 = gameObject.y || 0,
            x2 = gameObject.x2 || 0,
            y2 = gameObject.y2 || 0,
            el = createDiv(gameObject.id);
        updateLine(el, x1, y1, x2, y2);
        appendChild(el);
        return el;

    }

    function setGradient(el, fromColor, toColor) {
        el.style.background = '-webkit-linear-gradient(' + fromColor + ', ' + toColor + ')';
    }

    function setBoxShadow(el, horizontal, vertical, blur, spread, color) {
        el.style['box-shadow'] = horizontal + 'px ' + vertical + 'px ' + blur + 'px ' + spread + 'px ' + color;
    }


    function triangle(gameObject) {
        var el = createDiv(gameObject.id);
        setDimension(el, gameObject.width || 0, gameObject.height || 0);
        setPosition(el, gameObject.x || 0, gameObject.y || 0, gameObject.z || 0, gameObject.rotation || 0);

        el.style['border-left'] = (gameObject.left || 0) + 'px solid transparent';
        el.style['border-right'] = (gameObject.right || 0) + 'px solid transparent';
        el.style['border-bottom'] = (gameObject.bottom || 0) + 'px solid ' + (gameObject.color || '#f00');
        el.style['font-size'] = '0px';
        el.style['line-height'] = '0px';
        appendChild(el);
        return el;
    }

    function circle(gameObject) {
        var el = createDiv(gameObject.id);
        setDimension(el, gameObject.diameter || 0, gameObject.diameter || 0);
        setColor(el, gameObject.color || '#f0f');
        setPosition(el, gameObject.x || 0, gameObject.y || 0, gameObject.z || 0, gameObject.rotation || 0);

        el.style['-webkit-border-radius'] = '50%';
        appendChild(el);
        return el;
    }

    function setOpacity(el, v) {
        el.style.opacity = v;
    }

    function roundedRect(gameObject) {

        var el = createDiv(gameObject.id);
        setDimension(el, gameObject.width || 0, gameObject.height || 0);
        setColor(el, gameObject.color || '#ffff00');
        setPosition(el, gameObject.x, gameObject.y, gameObject.z, gameObject.rotation);
        el.style['-webkit-border-radius'] = (gameObject.rounded || 0) + 'px';
        appendChild(el);
        return el;
    }

    function group(gameObject) {
        var el = createDiv(gameObject.id);
        appendChild(el);
        return el;
    }
    

    return {
        addRectangle: rect,
        addLine: line,
        addTriangle: triangle,
        addCircle: circle,
        addRounded: roundedRect,
        addGroup: group,
        setPosition: setPosition,
        setColor: setColor,
        updateLine: updateLine,
        setDimension: setDimension,
        setBoxShadow: setBoxShadow,
        setOpacity: setOpacity,
        setGradient: setGradient,
        removeObject:removeObject,
        appendChildTo:appendChildTo
    };

}());
