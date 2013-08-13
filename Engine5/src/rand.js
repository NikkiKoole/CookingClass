/**Rand Module */
var Rand = (function () {
    function randomNumber(min, max) {
        if (arguments.length === 0) {
            return Math.random();
        }
        if (arguments.length === 1) {
            if (typeof min === 'number') {
                return Math.random() * min;
            }
        }
        if (arguments.length === 2) {
            if (typeof min === 'number' && typeof max === 'number') {
                var small = Math.min(min, max),
                large = Math.max(min, max),
                range = large - small;

                return ((Math.random() * range) + small);
            }
        }
    }

    function randomColor(saturation, brightness) {
        return Color.getRandom(saturation, brightness);
    }

    function randomBool() {
        return Math.random() < 0.5 ? true : false;
    }

    function randomChoice() {
        var length = arguments.length,
            index = Math.floor(Math.random() * length);
        return arguments[index];
    }

    return {
        nr: randomNumber,
        color: randomColor,
        bool: randomBool,
        choose: randomChoice
    };
}());
