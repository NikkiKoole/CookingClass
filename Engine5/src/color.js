var Color = (function () {

    var rndStartHue = Math.random(), // startwaarde hue
        goldenRatio = 0.618033988749895;  // rnd result  = (hue + ratio) % 1

    function hsvToRgb(h, s, v) {
        var r, g, b,
            i = Math.floor(h * 6),
            f = h * 6 - i,
            p = v * (1 - s),
            q = v * (1 - f * s),
            t = v * (1 - (1 - f) * s);

        switch (i % 6) {
        case 0:
            r = v;
            g = t;
            b = p;
            break;
        case 1:
            r = q;
            g = v;
            b = p;
            break;
        case 2:
            r = p;
            g = v;
            b = t;
            break;
        case 3:
            r = p;
            g = q;
            b = v;
            break;
        case 4:
            r = t;
            g = p;
            b = v;
            break;
        case 5:
            r = v;
            g = p;
            b = q;
            break;
        }

        return [r * 255, g * 255, b * 255];
    }
    function componentToHex(c) {
        var hex = Math.floor(c).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }

    function rgbToHex(r, g, b) {
        return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

    function getRandom(saturation, brightness) {
        rndStartHue += goldenRatio;
        rndStartHue %= 1;
        if (typeof saturation !== 'number') {saturation = 0.5; }
        if (typeof brightness !== 'number') {brightness = 0.95; }
        var rgb = hsvToRgb(rndStartHue, saturation, brightness);

        return rgbToHex(rgb[0], rgb[1], rgb[2]);
    }

    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    function rgbToHsv(r, g, b) {
        r = r / 255;
        g = g / 255;
        b = b / 255;
        var max = Math.max(r, g, b),
            min = Math.min(r, g, b),
            h,
            v = max,
            d = max - min,
            s = (max === 0) ? 0 : d / max;

        if (max === min) {
            h = 0; // achromatic
        } else {
            switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
            }
            h /= 6;
        }

        return [h, s, v];
    }

    function getAdjustedColor(strColor, adjustments) {
        var rgb = hexToRgb(strColor),
            hsv = rgbToHsv(rgb.r, rgb.g, rgb.b),
            hue = hsv[0],
            saturation = hsv[1],
            brightness = hsv[2],
            outputArray = hsvToRgb(hue,
                                   adjustments.saturation || saturation,
                                   adjustments.brightness || brightness),
            newColor = rgbToHex(outputArray[0], outputArray[1], outputArray[2]);
        return newColor;
    }

    function pad(color) {
        var str = color.slice(1);
        if (str.length === 3) {
            str = str[0] + str[0] + str[1] + str[1] + str[2] + str[2];
        }
        return '#' + str;
    }

    function isValid(color) {
        var re = /^#([0-9a-f]{3}){1,2}$/i;
        return re.exec(color);
    }

    return {
        valid: isValid,
        pad: pad,
        getAdjustedColor: getAdjustedColor,
        getRandom: getRandom
    };
}());

