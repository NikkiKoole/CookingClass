var TweenBoss = (function () {

    function getProperties(gameObject, args) {
        var properties = [];

        if (args.hasOwnProperty('x') || args.hasOwnProperty('y') || args.hasOwnProperty('z') || args.hasOwnProperty('rotation') || args.hasOwnProperty('scaleX') || args.hasOwnProperty('scaleY')) {
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
        if ((args.color && args.color !== g.color) ||
            (typeof args.x !== 'undefined' && args.x !== g.x) || 
            (typeof args.y !== 'undefined' && args.y !== g.y) || 
            (typeof args.z !== 'undefined' && args.z !== g.z) ||
            (typeof args.rotation !== 'undefined' && args.rotation !== g.rotation) || 
            (typeof args.scaleX !== 'undefined' && args.scaleX !== g.scaleX) ||
            (typeof args.scaleY !== 'undefined' && args.scaleY !== g.scaleY)) {
                return true;            
            }     
    return false;
    }


    function execute(gameObject, duration, args) {
        //data object is nice, maar ik moet ook nog alle argumenten interpreteren, en de div op de juiste manier
        //veranderen (setPosition, setColor) etc.

        var dto = toDataObject(gameObject, duration, args);

        function cleanup() {
            gameObject.div.style['WebkitTransition'] = null;
            if (dto.onComplete) {
                dto.onComplete.call(gameObject, dto.onCompleteArgs);
                gameObject.div.removeEventListener( 'webkitTransitionEnd', cleanup, false);
            }
        }

        if (argTester(gameObject, args)) {
            //console.log(gameObject.div.style['WebkitTransition'])
            gameObject.div.addEventListener( 'webkitTransitionEnd', cleanup, false);
        } else {
            cleanup(); // if you don't need to tween, because the values aren't different, the cleanup & onComplete will still be called.        
        }
        
        //console.log(dto.property,dto.duration,dto.delay,dto.ease);

        gameObject.div.style['-webkit-transition-property'] = dto.property;
        gameObject.div.style['-webkit-transition-duration'] = dto.duration;
        gameObject.div.style['-webkit-transition-delay'] = dto.delay;
        gameObject.div.style['-webkit-transition-timing-function'] = dto.ease;
        

        if (dto.property.indexOf('-webkit-transform') > -1) {
            gameObject.setTransform(args.x, args.y, args.z, args.rotation, args.scaleX, args.scaleY);
        }
        if (dto.property.indexOf('background-color') > -1) {
            gameObject.setColor(args.color);
        }
        if (dto.property.indexOf('border-bottom-color') > -1) {
            gameObject.div.style['border-bottom-color'] = args.color;
        }
        
        
        gameObject.div.offsetWidth;//hack om een reflow te forceren, zodat een tween altijd start.
    }

    


    return {
        getProperties: getProperties,
        constructCallData: toDataObject,
        executeTween: execute
    };
}());

