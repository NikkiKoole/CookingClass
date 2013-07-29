"use strict";


function setClickable(item) {
    
    var args = item.split(',');
    var to = gameWorld.getObject(args[0]);
    var against = gameWorld.getObject(args[1]);
    var times = parseInt(args[2]);
    var callback = to[args[3]];
    
    var description = {'name':args[0],'against':args[1],'times':args[2],'callback':args[3]};
    taskCounters.addSpecial(description);
}



function setDraggable(item) {
    var args = item.split(',');
    var t = gameWorld.getObject(args[0]);
    if (t){
        t['draggable']=(args[1]==='true');
        print(t);
    } else {
        print("gameobject not found");
    }
   
}

function setVisible(item) {
    var args = item.split(',');
    var t = gameWorld.getObject(args[0]);

    if (t){
        console.log('setting vsiiblasdasdad');
        t.setVisible(args[1]);    
    }   
}

function setZ(item) {
    var args = item.split(',');
    var t = gameWorld.getObject(args[0]);
    if (t) {
        t.setZ(args[1]);    
    }
    
}

function setDestinationRect(item) {
    var args = item.split(',');
    if (args.length === 5) {   
        gameWorld.addDestination(args[0], args[1], args[2], args[3], args[4]);
    } else {
        print('wrong amount of arguments at setDestinationRect');    
    }

}

function tweenBackToOrigin(item) {
    var t = gameWorld.getObject(item);
    // task is to restyle the correct div 
    var destinationX = t.originX;
    var destinationY = t.originY;

    var reposition = function() {
        t.x = destinationX;
        t.y = destinationY;
    }
    t.setDraggable(false);
    gameWorld.setDragging(null);
    domManipulator.tweenObj(t.name, destinationX, destinationY, t.layer, t.rotation,  2, reposition);
    //console.log("tried tweening");
}

function flashAnim(item){
    domManipulator.flashObj(item);
}

function setTimer(item) {
    var args = item.split(',');
    var description = {'ticks':args[0],'onTimerTick':args[1],'onTimerFinished':args[2] };
    taskCounters.addTimer(description);
}

function panFill() {
   gameWorld.getObject('pan').fill();
}

function panFilled() {
    console.log('calling panfillED');
}

function panCook(item) {

    var g = gameWorld.getObject('lid');
    var el = document.getElementById('lid');
    domManipulator.position(el, g.x, g.y-Math.random()*3, g.layer, -5+Math.random()*10);
}

function setFrame(item) {
    var args = item.split(',');
    var t = gameWorld.getObject(args[0]);
    t.setFrame(args[1]);
}  




function init() {
    

    var gameroot = domManipulator.initRoot(0,0,800,600);// document.getElementById("game");

    gameroot.onmousemove=gameWorld.handleMouseMove;
    gameroot.onclick=gameWorld.handleClick;


    gameWorld.constructFromJSON(foodItems);
    gameWorld.constructFromJSON(kitchenItems);

    gameWorld.setTaskList(list);
    
    var updateID = setInterval(gameWorld.run, 1000 / 12);
    
}

window.onload = function () {
    init();
}



