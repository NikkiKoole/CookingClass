"use strict";


function setDraggable(item) {

    var t = gameWorld.getObject(item);
    if (t){
        t['draggable']=true;
        print(t);
    } else {
        print("gameobject not found");
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

function setSpecialCounter(item) {
        // will need to add a descriptive way of telling me what to do.
        // for starters it got fed "setSpecialCounter": "potato1, peeler, 5"
        // clickObject withObjectHolding for that many times
        var args = item.split(',');
        console.log(args);
        var special = {'name':args[0], 'against':args[1], 'times':args[2]};
        console.log(special);

        taskCounters.addSpecial(special);
}

function flashAnim(item){
    //make the correct module do something fancy with it
    //print(gameWorld.getObject(item));    
    //var o =     gameWorld.getObject(item);
    //print("got flash anim to worry about now ");
    domManipulator.flashObj(item);
}



//var tool;
//var gameObjects = [];
/*
    
    higher logic

    gameWorld -> heeft een array met alle gameObjects, a backdrop and methods of constructing and handling itself from external JSON
    // ook is er maar een gameWorld dus een module pattern is ok,
    objectAnimator -> heeft manieren om een object op een ander frame te zetten, en of met timers ingewikkelder animaties te maken.
     

*/



function init() {
    

    var gameroot = domManipulator.initRoot(0,0,800,600);// document.getElementById("game");

    gameroot.onmousemove=gameWorld.handleMouseMove;



    gameWorld.constructFromJSON(foodItems);
    gameWorld.constructFromJSON(kitchenItems);
    gameWorld.addToDOM(gameroot);
    gameWorld.setTaskList(list);
}

window.onload = function () {
    init();
}



