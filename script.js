"use strict";



function markGroupForRepositioningToEndAreas(data) {
    console.log('I got called'+data.group);
    console.log(data.group);
    
}

function setDraggable(item) {
    //console.log('I got called'+item);
    //console.log(item);
    //item['draggable']=true;
    // moet aan gameWorld juiste object opvragen
    var t = gameWorld.getObject(item);
    if (t){
        t['draggable']=true;
        console.log(t);
    } else {
        console.log("gameobject not found");
    }
}

function setDestinationRect(item) {
    var args = item.split(',');
    console.log("function got "+args.length+" arguments");   //needs 5
    // console.log(item);
//console.log(item[0]);    
    gameWorld.addDestination(args[0], args[1], args[2], args[3], args[4]);
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

    var gameroot = document.getElementById("game");
    gameroot.style.width = '800px';
    gameroot.style.height = '600px';
    gameroot.style.top = '0';
    gameroot.style.left = '0';
    gameroot.onmousemove=gameWorld.handleMouseMove;



    gameWorld.constructFromJSON(foodItems);
    gameWorld.constructFromJSON(kitchenItems);
    gameWorld.addToDOM(gameroot);
    gameWorld.setTaskList(list);
}

window.onload = function () {
    init();
}



