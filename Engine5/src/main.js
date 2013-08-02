

/*
function validColor(c){
    var re = /^#([0-9a-f]{3}){1,2}$/i;
    var c = re.exec(c);
    return (c);
}
*/
//x:Math.random()*800,y:Math.random()*600
//var Rand
//Math.random()*800
//Rand.nr(800)

Rand = (function() {
    function randomNumber(){
        if (arguments.length===0)
        {
            return Math.random();
        }else if (arguments.length === 1) {
            return Math.random()*arguments[0];
        }else if (arguments.length === 2) {
            //find smallest of two values and largest.
            var small = Math.min(arguments[0],arguments[1]);
            var large = Math.max(arguments[0],arguments[1]);
            var range = large - small;
            return ((Math.random()*range)+small);
        }        

    }
    function randomColor() {
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
    function randomBool() {
        return Math.random()<0.5 ? true : false;
    }     
    function randomChoice() {
        var length = arguments.length;
        var index = Math.floor(Math.random()*length);
        return arguments[index];
    }
    return {
        nr:randomNumber,
        color:randomColor,
        bool:randomBool,
        choose:randomChoice
    }
})();

Color = (function() {
    var hexwidth = 2; 
    var hue = Math.random();        
    var goldenRatio = 0.618033988749895; 

    function hsvToRgb(h,s,v) {
        var hi = Math.floor(h*6),
        f = h*6 - hi,
        p = v * (1-s),
        q = v * (1-f*s),
        t = v * (1-(1-f)*s),
        r = 255,
        g = 255,
        b = 255;
        switch(hi) {
            case 0: r = v, g = t, b = p; break;
            case 1: r = q, g = v, b = p; break;
            case 2: r = p, g = v, b = t; break;
            case 3: r = p, g = q, b = v; break;
            case 4: r = t, g = p, b = v; break;
            case 5: r = v, g = p, b = q; break;
        }

        return [Math.floor(r*256),Math.floor(g*256),Math.floor(b*256)];
    };
 
    function padHex(str) {
        if(str.length > hexwidth){
            return str;
        }
        return new Array(hexwidth - str.length + 1).join('0') + str;
    };

    function isValid(c) {
        var re = /^#([0-9a-f]{3}){1,2}$/i;
        var c = re.exec(c);
        return (c);
    }    
    function get (hex,saturation,value) {
        hue += goldenRatio;
        hue %= 1;
        if(typeof saturation !== "number") {saturation = 0.5};
        if(typeof value !== "number"){value = 0.95};
        var rgb = hsvToRgb(hue,saturation,value);
        if(hex){
            return "#" +  padHex(rgb[0].toString(16))
                        + padHex(rgb[1].toString(16))
                        + padHex(rgb[2].toString(16));
        } else {  
            return rgb;
        }
    };
    return {
        valid:isValid,
        hsv:get
    }
})();

function test(color) {
    // validate the color yo have gotten
    if (!Color.valid(color)){
        console.log('error');
    }
    // first take off the '#'
    var str = color.slice(1);
    // then check if you have gotten the funky '#fff' shorthand way
    if (str.length === 3) {
        str = str[0]+str[0]+str[1]+str[1]+str[2]+str[2];
    }

    console.log(color, parseInt(str, 16));
    // now finaly we have the int representation of your color
}

    function rgbToHsl(r, g, b){
        r /= 255, g /= 255, b /= 255;
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;

        if(max == min){
            h = s = 0; // achromatic
        }else{
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch(max){
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return [h, s, l];
    }
   function rgbToHsv(r, g, b){
        r = r/255, g = g/255, b = b/255;
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, v = max;

        var d = max - min;
        s = max == 0 ? 0 : d / max;

        if(max == min){
            h = 0; // achromatic
        }else{
            switch(max){
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return [h, s, v];
    }
    function hsvToRgb(h, s, v){
        var r, g, b;

        var i = Math.floor(h * 6);
        var f = h * 6 - i;
        var p = v * (1 - s);
        var q = v * (1 - f * s);
        var t = v * (1 - (1 - f) * s);

        switch(i % 6){
            case 0: r = v, g = t, b = p; break;
            case 1: r = q, g = v, b = p; break;
            case 2: r = p, g = v, b = t; break;
            case 3: r = p, g = q, b = v; break;
            case 4: r = t, g = p, b = v; break;
            case 5: r = v, g = p, b = q; break;
        }

        return [r * 255, g * 255, b * 255];
    }

function setColorProperties(r, g, b, saturation, brightness) {
    // get hue from current color
    var hue = rgbToHsv(r,g,b)[0];
    var output = hsvToRgb(hue, saturation, brightness);
    return output;
}


console.log(setColorProperties(255,0,0,1,0))
console.log(setColorProperties(255,0,0,0.3,0.3))

//test('#f00');
//test('#ff0000');

//console.log(rgbToHsl(0,255,255));
//console.log(rgbToHsv(255,0,255));
//console.log(get(true, 0.5,0.5));
//console.log(get(true, 0.25,0.05));
//console.log(get(true, 0.25,0.05));

//console.log("rood", parseInt('ff0000', 16));
//console.log("rood", parseInt('f00', 16));
//test("#ff0000")
//.addObject('rect').addObject

//console.log(typeof {test:12})
//console.log(typeof {test:[{},{}]})
//setColor()


/*
GameWorld.createObject('rectangle').setPosition(20,0).setDimension(1000,300).setRotation(23).setGradient('#fff','#222');
GameWorld.createObject('circle').setPosition(100,100).setColor('#0f5').setRadius(340).setDropShadow(1,1,0,0,'#ff1234').setGradient('#fff','#222');
GameWorld.createObject('triangle').setTriangle(50,50,100).setPosition(100,100).setScale(2,1).setGradient('#fff','#222');
GameWorld.createObject('triangle').setTriangle(50,50,100).setPosition(130,130).setScale(2,1).setColor(randColor()).setAlpha(0.5);
GameWorld.createObject('rounded').setPosition(400,100).setDimension(1000,300).setColor(randColor()).setRotation(12).setDropShadow(1,1,10,10,'#ff1234').setAlpha(0.5).setGradient('#fff','#222');

for (var i=0; i<40; i+=1) {
GameWorld.createObject('line').from(10,10).to(Math.random()*800,Math.random()*600).setColor(randColor()).setWidth(5).setGradient('#fff','#222');
GameWorld.createObject('line').from(800,600).to(Math.random()*800,Math.random()*600).setColor(randColor()).setDropShadow(1,1,10,1,'#ff1234').setGradient('#fff','#222');
}
*/

// 3, {x:100, y:100, color:'#ffffff'}

//TimeLineTo([{duration:3, x:100, y:100, delay:0.5},{duration:1, color:'#ff0000', delay:3}])
//              


//GameObject.TweenTo({duration:'1s', ease:'ease-in', delay:'1s', x:0, y:0})


function entry() {
    var container= document.getElementById('container'); 
    container.style.width='800px';
    container.style.height='600px';

    var rects = [];
    for (var i=0; i< 20; i+=1) {
        //var r = GameWorld.createObject('triangle').setPosition(Math.random()*200, Math.random()*200).setDimension(100,100).setColor(randColor());
        var l = GameWorld.createObject('line').from(10,10).to(Rand.nr(800),Rand.nr(600)).setColor(Rand.color()).setWidth(5);
        rects.push(l);
    }
var t = GameWorld.createObject('triangle').setDimension(200,100).setPosition(100,100).setScale(1,1);
    container.addEventListener('click', function(){
        for (var j=0; j<rects.length; j+=1)
        {
            TweenBoss.executeTween(rects[j], 2.3, {x:Rand.nr(400,800),y:Rand.nr(300,600),rotation:Rand.nr(360),color:Rand.color(),ease:'ease-in-out', scaleX:Rand.nr(10),delay:'0s'});
        }

        
TweenBoss.executeTween(t, 2.3, {x:Rand.nr(380,400),y:Rand.nr(300,320),rotation:Rand.nr(360),color:Rand.color(),ease:'ease-in-out', scaleX:Rand.nr(3),delay:'0s'});

    }, true);


    
    

/*
    var rect1 = GameWorld.createObject('rectangle').setPosition(Math.random()*200, Math.random()*200).setDimension(100,100).setColor(randColor());

   var rect2 = GameWorld.createObject('rectangle').setPosition(Math.random()*400, Math.random()*200).setDimension(100,100).setColor(randColor());
  var rect3 = GameWorld.createObject('rectangle').setPosition(Math.random()*400, Math.random()*400).setDimension(100,100).setColor(randColor());
        container.addEventListener('click', function(){
            
            TweenBoss.executeTween(rect1, 2.3, {x:Math.random()*800,y:Math.random()*600,rotation:Math.random()*360,color:randColor(),ease:'ease-in-out', delay:'0s'});
            TweenBoss.executeTween(rect2, 2.3, {x:Math.random()*800,y:Math.random()*600,rotation:Math.random()*360,color:randColor(),ease:'ease-in-out', delay:0});
            TweenBoss.executeTween(rect3, 2.3, {x:Math.random()*800,y:Math.random()*600,rotation:Math.random()*360,color:randColor(),ease:'ease-in-out', delay:0});
    }, true);
*/

    //console.log(rect.div.style.webkitTransition);
}

//entry();
//var rect = GameWorld.createObject('rectangle');
/*
var container= document.getElementById('container'); 
    container.style.width='800px';
    container.style.height='600px';

var rect1 = GameWorld.createObject('rectangle');
var group = GameWorld.createObject('group');//.createObject('rectangle').createObject('rectangle');
group.addObject(rect1.setPosition(100,0)).addObject(GameWorld.createObject('rectangle').setColor('#f0f'));

container.addEventListener('click', function(){
    TweenBoss.executeTween(rect1, 2.3, {rotation:Math.random()*3060,color:randColor(),ease:'ease-in-out', delay:'0s'});
    TweenBoss.executeTween(group, 2.3, {x:Math.random()*800,y:Math.random()*600,ease:'ease-in-out', delay:0});

   
    }, true); 
*/
