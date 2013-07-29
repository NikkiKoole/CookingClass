"use strict";

function init() {

    var gameroot = DomManipulator.initRoot(0,0,800,600);// 

    gameroot.onmousemove = GameWorld.handleMouseMove;
    gameroot.onclick = GameWorld.handleClick;
    GameWorld.constructFromJSON(introItems);
    document.addEventListener("click", startGame, true);

    window.setTimeout(tweenCarpet, 1);
}

function tweenCarpet() {
    DomManipulator.tweenObj('carpet', 50, 50, -8, 0, 0.7,0.1, null);
}

function startGame() {
    document.removeEventListener("click", startGame, true);  
        
    GameWorld.constructFromJSON(foodItems);
    GameWorld.constructFromJSON(kitchenItems);
    GameWorld.setTaskList(list);
    
    var updateID = setInterval(GameWorld.run, 1000 / 12); 
}

window.onload = function () {
    init();
}



