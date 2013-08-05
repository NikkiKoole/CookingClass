
function entry2() {
var EVENT = {
    ITEM_CLICKED: 1
}

var pubsub=[
      {event: EVENT.ITEM_CLICKED, action: function(a, b, c) { this.onItemClicked(a, b, c); } }]

    PubSub.enable(pubsub, this);

}

function addRect() {
    return GameWorld.createObject('rectangle');
}

function onItemClicked(a, b, c) {
    console.log(a,b,c);
}

function entry() {

    
    var container= document.getElementById('container'); 
    if (container) {
        container.style.width='800px';
        container.style.height='600px';
    }

    var dotCount = 14;

    var lines = [];
    var dots = [];
    for (var i=0; i< dotCount; i+=1) {
        var r = GameWorld.createObject('circle').setPosition(i*200,Rand.nr(0,200)).setDiameter(40).setZ(3);
        //r.tweenTo(6, {scaleX:2, scaleY:2} )        
        dots.push(r)
    }
    var radius = 20;
    for (var i=0; i< dotCount-1; i+=1) {
 
        lines.push(GameWorld.createObject('line').from(dots[i].x+radius, dots[i].y+radius).to(dots[i+1].x+radius, dots[i+1].y+radius).setColor('#000'))
    }


    container.addEventListener('click', function(){
        for (var i=0; i< dotCount; i+=1) {
            dots[i].tweenTo(4, {x:Rand.nr(800), y:Rand.nr(300)})
        }
    }, true);


    var time;
    function draw() {
        requestAnimationFrame(draw);
        var now = new Date().getTime(),
            dt = now - (time || now);
     
        time = now;

        for (var i=0; i< dotCount-1; i+=1) {
            var line = lines[i];
            line.from(dots[i].x, dots[i].y).to(dots[i+1].x, dots[i+1].y);
        }

    }
    draw();


            


}

//entry();


