"use strict";

function init() {

    var gameroot = DomManipulator.initRoot(0,0,800,600);// document.getElementById("game");
    gameroot.onmousemove = GameWorld.handleMouseMove;
    gameroot.onclick = GameWorld.handleClick;
    GameWorld.constructFromJSON(introItems);
    document.addEventListener("click", startGame, true);
    
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



