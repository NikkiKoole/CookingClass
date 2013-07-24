



function markGroupForRepositioningToEndAreas(data) {
    console.log('I got called'+data.group);
    console.log(data.group);
    
}

function setDraggable(item) {
    console.log('I got called'+item);
    console.log(item);
    item['draggable']=true;
    // moet aan gameWorld juiste object opvragen
    var t = gameWorld.getObject(item.value);
    t['draggable']=true;
    console.log(t);
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
    var onMouseMove = function(e) {
           // alert('You clicked that thang!');
            //console.log(e);
            gameWorld.handleMouseMove(e.x, e.y);
           // console.log(e.toElement.style['-webkit-transform'] = 'translate3d(0px,0px,0) rotate(0deg) scale(2,2)');
        }
    gameroot.onmousemove=onMouseMove;



    gameWorld.constructFromJSON(foodItems);
    gameWorld.constructFromJSON(kitchenItems);
    gameWorld.addToDOM(gameroot);
    gameWorld.setTaskList(list);
}

window.onload = function () {
    init();
}



