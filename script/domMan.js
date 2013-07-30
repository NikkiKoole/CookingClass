var DomManipulator = (function () {
    'use strict';
    var root;

    function init(x, y, w, h) {
        root = document.getElementById("game");
        root.style.width = w + 'px';
        root.style.height = h + 'px';
        root.style.top = x + 'px';
        root.style.left = y + 'px';
        root.style.position = 'relative';
        root.style.overflow = "hidden";
        return root;
    }

    function removeElement(id) {
        var div = document.getElementById(id);
        div.parentNode.removeChild(id);
    }

    function setCommon(el, id, x, y, w, h, angle, z) {
        el.style.width = w + "px";
        el.style.height = h + "px";
        el.style['-webkit-transform'] = 'translate3d(' + x + 'px' + ',' + y + 'px' + ',' + z + 'px' + ') rotate(' + angle + 'deg)';
        el.style.zIndex = z;
        el.id = id;
        el.style.display = "block";
        el.style.position = "absolute";
    }

    function setColor(el, color) {
        el.style['background-color'] = color;
    }

    function setBackdropURL(el, url) {
        el.style.background = 'url(' + url + ') 0 0';
    }

    function addRect(id, x, y, w, h, color, opacity, rotation, layer) {
        var objImage = document.createElement("div");
        setCommon(objImage, id, x, y, w, h, rotation, layer);
        setColor(objImage, color);
        objImage.style.opacity = opacity;
        root.appendChild(objImage);
        return objImage;
    }

    function addSpr(id, x, y, w, h, url, rotation, layer) {
        var objImage = document.createElement("div");
        setCommon(objImage, id, x, y, w, h, rotation, layer);
        setBackdropURL(objImage, url);
        root.appendChild(objImage);
        return objImage;
    }

    function flash(id) {
        var el = document.getElementById(id);
        setColor(el, '#FF0000');
    }

    function tweenTo(id, x, y, z, rotation, duration, delay, callback) {
        var el = document.getElementById(id);
        el.style['-webkit-transition-duration'] = duration + 's';
        el.style['-webkit-transition-timing-function'] = 'cubic-bezier(0.80,0,1,1)';
        el.style['-webkit-transition-delay'] = delay + 's';
        el.style['-webkit-transform'] = 'translate3d(' + x + 'px' + ',' + y + 'px' + ',' + z + 'px' + ') rotate(' + rotation + 'deg)';
        el.style.zIndex = z;
        el.addEventListener("webkitTransitionEnd", callback, true);
    }

    function setFrame2(el, src, frame) {
        el.style.background = 'url(' + 'images/' + src + ') ' + (-frame.xOffset) + 'px ' + (-frame.yOffset) + 'px';

    }

    function setZ(id, z) {
        var el = document.getElementById(id);
        el.style.zIndex = z;
    }

    // use common instead

    function setDimensions(el, w, h) {
        el.style.width = w + "px";
        el.style.height = h + "px";
    }

    function setPosition(el, x, y, z, angle) {
        el.style['-webkit-transform'] = 'translate3d(' + x + 'px' + ',' + y + 'px' + ',' + z + 'px' + ') rotate(' + angle + 'deg)';
    }

    function setZindex(el, z) {
        el.style.zIndex = z;
    }

    function addAllGameObjectsToDOM(gameObjects) {
        var item,
            i;

        for (i = 0; i < gameObjects.length; i += 1) {
            item = gameObjects[i];
            addSpr(item.name, item.x, item.y, item.width, item.height, item.src, item.rotation, item.layer);

        }
    }

    function setVisibility(id, value) {
        var el = document.getElementById(id);
        if (value === 'false' || value === false) {
            el.style.visibility = "hidden";
        } else {
            el.style.visibility = "visible";
        }
    }

    function setBase(el, id) {
        el.id = id;
        el.style.display = "block";
        el.style.position = 'absolute';
    }

    return {
        initRoot: init,
        createRectangle: addRect,
        createSprite: addSpr,
        position: setPosition,
        flashObj: flash,
        tweenObj: tweenTo,
        setVisible: setVisibility,
        setFrame: setFrame2,
        setZ: setZ,
        addAllGameObjects: addAllGameObjectsToDOM
    };
})();
