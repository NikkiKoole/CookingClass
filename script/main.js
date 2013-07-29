"use strict";

function init() {

    var gameroot = DomManipulator.initRoot(0,0,800,600);// document.getElementById("game");
    gameroot.onmousemove = GameWorld.handleMouseMove;
    gameroot.onclick = GameWorld.handleClick;
    GameWorld.constructFromJSON(introItems);
    document.addEventListener("click", startGame, true);
    // do something nice with the carpet here
    
    var carpet = document.getElementById('carpet');
    //set carpet more to the south east and then translate it back to its origin
    if (carpet) {  
           
           console.log(carpet);
            //var el = document.getElementById('carpet');
            //el.style['-webkit-transition-duration'] = 4+'s';
            //el.style['-webkit-transition-timing-function'] = 'cubic-bezier(0.80,0,1,1)';
            //el.style['-webkit-transform'] = 'translate3d(50px,50px,-8px) rotate(0deg)';
        

        DomManipulator.tweenObj('carpet', 50, 50, -8, 0, 1, null)
//(id, x, y, z, rotation, duration, callback) 
   }
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



