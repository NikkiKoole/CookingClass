
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

    //var r = GameWorld.createObject('rectangle').setPosition(0,0).tweenTo(1, {x:200});
    //r.setPosition(0,0);



/*
    var rects = [];
    for (var i=0; i< 60; i+=1) {
        var t = GameWorld.createObject('triangle').setDimension(200,100).setPosition(Rand.nr(800),Rand.nr(600)).setScale(Rand.nr(3),1);

        rects.push(t);
    }
var t = GameWorld.createObject('triangle').setDimension(200,100).setPosition(100,100).setScale(1,1);
    container.addEventListener('click', function(){
        for (var j=0; j<rects.length; j+=1)
        {
                rects[j].tweenTo(2.3, {color:Rand.color(0.5,0.5),delay:(j / 100)+'s',x:Rand.nr(-30,30).toString(),ease:'ease-in-out'});
        }

        
TweenBoss.executeTween(t, 2.3, {x:Rand.nr(380,400),y:Rand.nr(300,320),rotation:Rand.nr(360),color:Rand.color(0.5,0.9),ease:'ease-in-out', scaleX:Rand.nr(30),delay:'0s'});

    }, true);
*/
}

entry();


