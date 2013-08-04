var TweenBoss = (function () {

    function getProperties(gameObject, args) {
        var properties = [];

        if (args.hasOwnProperty('x') || args.hasOwnProperty('y') || args.hasOwnProperty('z') || args.hasOwnProperty('rotation') || args.hasOwnProperty('scaleX') || args.hasOwnProperty('scaleY')) {
            properties.push('-webkit-transform');
        }
        if (args.hasOwnProperty('color')) {
            if (gameObject.type === 'triangle') {
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

    function toDataObject(gameObject, duration, args) {
        return {
            duration: getDuration(duration),
            property: getProperties(gameObject, args).join(),
            delay: getDelay(args),
            ease: getEase(args)
        };

    }

    function execute(gameObject, duration, args) {
        //data object is nice, maar ik moet ook nog alle argumenten interpreteren, en de div op de juiste manier
        //veranderen (setPosition, setColor) etc.

        var dto = toDataObject(gameObject, duration, args);
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

    }


    return {
        getProperties: getProperties,
        constructCallData: toDataObject,
        executeTween: execute
    };
}());

