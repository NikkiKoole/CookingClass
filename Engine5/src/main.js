



for (var i=0; i<20; i+=1) {
//    GameWorld.createObject('rectangle').setPosition(Rand.nr(800),Rand.nr(500)).setColor(Rand.color());

}


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
    for (var i=0; i< 60; i+=1) {
        var t = GameWorld.createObject('triangle').setDimension(200,100).setPosition(Rand.nr(800),Rand.nr(600)).setScale(1,1);

        rects.push(t);
    }
var t = GameWorld.createObject('triangle').setDimension(200,100).setPosition(100,100).setScale(1,1);
    container.addEventListener('click', function(){
        for (var j=0; j<rects.length; j+=1)
        {
              //var c = Rand.color(0.3,0.5);
                rects[j].tweenTo(2.3, {color:Rand.color(0.3,0.5),delay:(j / 100)+'s',x:Rand.nr(-30,30).toString(),ease:'ease-in-out'});
                //console.log(c);  
            //TweenBoss.executeTween(rects[j], 2.3, {color:Rand.color(0.3,0.5),delay:(j/100)+'s',x:Rand.nr(-30,30).toString(),ease:'ease-in-out'});
        }

        
TweenBoss.executeTween(t, 2.3, {x:Rand.nr(380,400),y:Rand.nr(300,320),rotation:Rand.nr(360),color:Rand.color(0.5,0.9),ease:'ease-in-out', scaleX:Rand.nr(30),delay:'0s'});

    }, true);

}

entry();


