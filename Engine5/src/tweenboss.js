/**TweenBoss Module */
var TweenBoss = (function () {

    function PropCheck(args) {
        this.args = args;
        this.hasOneOfThese = function(batch) {
            for (var i = 0; i < batch.length; i += 1) {
                if (this.args.hasOwnProperty(batch[i])) {
                    return true;
                }
            }
        };
    }

    function getProperties(gameObject, args) {
        var properties = [],
            check = new PropCheck(args);

        if (check.hasOneOfThese(['x', 'y', 'z', 'rotation', 'scaleX', 'scaleY'])) {
            properties.push('-webkit-transform');
        }
        if (args.hasOwnProperty('color')) {
            if (gameObject && gameObject.type === 'triangle') {
                properties.push('border-bottom-color');
            } else {
                properties.push('background-color');
            }
        }
        if (args.hasOwnProperty('opacity')) {
            properties.push('opacity');
        }
        if (args.hasOwnProperty('width')) {
            properties.push('width');
        }
        if (args.hasOwnProperty('height')) {
            properties.push('height');
        }
        if (args.hasOwnProperty('radius')) {
            properties.push('width');
            properties.push('height');
        }
        return properties;
    }

    function getDelay(args) {
        if (args.hasOwnProperty('delay')) {
            if (typeof args.delay === 'number') {
                args.delay += 's';
            }
            return args.delay;
        }
        return '0s';
    }

    function getEase(args) {
        if (args.hasOwnProperty('ease')) {
            return args.ease;
        }
        return '';
    }

    function getDuration(duration) {
        return duration + 's';
    }
    function getOnComplete(args) {
        if (args.hasOwnProperty('onComplete')) {
            return args.onComplete;
        }
    }
    function getOnCompleteArgs(args) {
        if (args.hasOwnProperty('onCompleteArgs')) {
            return args.onCompleteArgs;
        }
    }

    function toDataObject(gameObject, duration, args) {
        return {
            duration: getDuration(duration),
            property: getProperties(gameObject, args).join(),
            delay: getDelay(args),
            ease: getEase(args),
            onComplete: getOnComplete(args),
            onCompleteArgs: getOnCompleteArgs(args)
        };
    }

    function argTester(gameObject, args) {
        var g = gameObject;
        var expected = ['color', 'x', 'y', 'z', 'rotation', 'scaleX', 'scaleY', 'opacity'];
        for (var i = 0; i < expected.length; i += 1) {
            var t = expected[i];
            return propNotUndefinedAndNotEqual(args, t, g);
        }
        return false;
    }

    function propNotUndefinedAndNotEqual(args, p,  other) {
        if (typeof args[p] !== 'undefined' && args[p] !== other[p]) {
            return true;
        }
    return false;
    }


    function execute(gameObject, duration, args) {
        var dto = toDataObject(gameObject, duration, args);
        var div = gameObject.div;

        function standardOnComplete() {
            div.style['WebkitTransition'] = null;
            div.style['-webkit-transition'] = null;
            if (dto.onComplete) {
                dto.onComplete.call(gameObject, dto.onCompleteArgs);
                div.removeEventListener('webkitTransitionEnd', this, false);
            }
        }

        if (argTester(gameObject, args)) {
            div.addEventListener('webkitTransitionEnd', this, false);
        } else {
            standardOnComplete();
        }
        
        div.style['-webkit-transition-property'] = dto.property;
        div.style['-webkit-transition-duration'] = dto.duration;
        div.style['-webkit-transition-delay'] = dto.delay;
        div.style['-webkit-transition-timing-function'] = dto.ease;

        if (dto.property.indexOf('-webkit-transform') > -1) {
            var transform = {
                'x': args.x,
                'y': args.y,
                'z': args.z,
                'rotation': args.rotation,
                'scaleX': args.scaleX,
                'scaleY': args.scaleY
            };
            gameObject.setTransform(transform);
        }
        
        if (dto.property.indexOf('opacity') > -1) {
            gameObject.setOpacity(args.opacity);
        }
        if (dto.property.indexOf('background-color') > -1) {
            gameObject.setColor(args.color);
        }
        if (dto.property.indexOf('border-bottom-color') > -1) {
            div.style['border-bottom-color'] = args.color;
        }

        div.offsetWidth;//forceer CSS reflow.
    }

    return {
        getProperties: getProperties,
        constructCallData: toDataObject,
        executeTween: execute
    };
}());
