

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



function onMouseMoveOverScreen(e) {
    //console.log(e.pageX, e.pageY)
    var colliding = Collision.itemsAtPosition(e.pageX, e.pageY,GameWorld.getAllItems());
    if (colliding.length>0) {
        console.log(colliding);
    } else {
        //console.log('none');
    }    
    //if (Collision.getItemsAtPosition(e.pageX, e.pageY))
}
function onMouseDownOverScreen(e) {
    //console.log('down recognized');
    //check if you have clicked a button;
    //console.log(e.pageX, e.pageY, GameWorld.getAllItems());
    //Collision.itemsAtPosition(e.pageX, e.pageY, GameWorld.getAllItems());
}
function onMouseUpOverScreen(e) {
    activeTransformHelperButton = null;
}

 var group1;// = GameWorld.createObject('group').setDimension(200,200).setColor('#00f');
    var group2;// = GameWorld.createObject('group').setDimension(100,100).setColor('#0f0');
    var rect;// = Ga

function entry() {

    
    var container = document.getElementById('container'); 
    if (container) {
        container.style.width = window.innerWidth + 'px';//'800px';
        container.style.height = window.innerHeight + 'px';//'600px';
        container.style['-webkit-user-select']= 'none';
        container.style.position='absolute';
        container.style.top='0';
        container.style.left = '0'
    }

    container.onmousemove = onMouseMoveOverScreen;
    container.onmousedown = onMouseDownOverScreen;
    container.onmouseup = onMouseUpOverScreen;


    //add a rectangle a blue group and a green group
    group1 = GameWorld.createObject('group').setDimension(200,200).setColor('#00f');
    group2 = GameWorld.createObject('group').setDimension(100,100).setColor('#0f0');
    rect = GameWorld.createObject('rectangle');

    group1.addObject(group2);
    group2.addObject(rect);

    group1.setPosition(100,100);

    var time;
    function draw() {
        requestAnimationFrame(draw);
        var now = new Date().getTime(),
            dt = now - (time || now);
     
        time = now;
        //if (Collision.itemsAtPosition)
    }
    draw();



}

entry();


