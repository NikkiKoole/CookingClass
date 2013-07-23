
/*
sm = (function (){
    var states = [
	{
		'name':'working',
		'initial':true,
		'events':{
			'bored':'coffee',
			'call_for_meeting':'meeting',
		}
	},
	{
		'name':'coffee',
		'events':{
			'break_over':'working',
			'call_for_meeting':'meeting'
		}
	},
	{
		'name':'meeting',
		'events':{
			'meetings_over':'working'
		}
	},
    ];
    console.log(states);
	this.states = states;
	this.indexes = {}; //just for convinience
	for( var i = 0; i< states.length; i++){
		this.indexes[states[i].name] = i;
		if (this.states[i].initial){
			this.currentState = this.states[i];
		}
	}
	this.consumeEvent = function(e){
		if(this.currentState.events[e]){
			this.currentState = this.states[this.indexes[this.currentState.events[e]]] ;
		}
	}
	this.getStatus = function(){
		return this.currentState.name;
	}
    
    return{
        consumeEvent:consumeEvent,
        getStatus:getStatus
    }
}());


function doMoreStuff(sm) {



//sm = new StateMachine();
sm.getStatus(); // will return 'working'

sm.consumeEvent('bored');
console.log(sm.getStatus()); // I went for coffee
  console.log("got here");
sm.consumeEvent('call_for_meeting');
sm.getStatus(); //will return 'meeting'
 
sm.consumeEvent('bored'); //doesn't matter how boring a meeting can be...
sm.getStatus(); //will still return 'meeting'
 
sm.consumeEvent('meetings_over')
sm.getStatus(); // 'working'
}
*/

console.log(module1.export1);
function init() {
    console.log("INITTED!");
    //initialize game
    // perhaps start with loading an image
    var gameroot = document.getElementById("game");
    console.log(gameroot);

    objImage = new Image();
    objImage.src='cooker.png';
    objImage.width='320';
    objImage.style.position='absolute';
    
    objImage.style['-webkit-transition-duration'] = 2+'s';
    objImage.style['-webkit-transition-timing-function'] = 'cubic-bezier(0.80,0,1,1)';
    objImage.style['-webkit-transform'] = 'translate3d(400px,100px,0) rotate(30deg)';
     //objImage.className = 'shadow';
    gameroot.appendChild(objImage);
    var onClickFunction = function(e) {
        alert('You clicked that thang!');
        console.log(e);
        console.log(e.toElement.style['-webkit-transform'] = 'translate3d(0px,0px,0) rotate(0deg) scale(2,2)');
        
    }    
    objImage.onclick=onClickFunction;
    //doMoreStuff(sm);
}

window.onload = function () {
    init();
}




//var task = {
    // has an array with all its subtasks and an private indexer.
    // the public api will be 
    // getNewTask()
    //      posible multiple subtasks
    // isCurrentTaskDone()     
    //
   // }

var level = {
    //has a collection of tasks
    //has a backdrop
    //has a collection of kitchenobjects
    
    }

//task example
/*
    level1 = {
        titel:'aardappelpuree',
        {   
            [
                {                
               titel:'aardappels schillen'
                {
                    description:'leg drie aardappelen op tafel'
                    //implementation details 
                    [   replace obj12 to rect(300,300,30,30),
                        replace obj12 to rect(300,300,30,30),
                        replace obj12 to rect(300,300,30,30)  ]
                }    
                {
                    description:'pak een mes'
                }
                {
                    description:'schil al de aardappelen'
                }
            }
            {
                titel:'water aan de kook'
                {
                    description:'pak een pan en zet op tafel'
                }    
                {
                    description:'vul pan met water'
                }
                {
                    description:'zet fornuis aan'
                }
                {
                    description:'zet pan op fornuis'
                }
            }          
        }    
    }
*/

var interactionObject = {
    // has origin position, layer, standarddimension, named frames
    //
}


// now to show an intro state
// then a button to the game.

// we hebben objecten.
/*
        pseudo idee
        spel = 
        array met interactionObjects (the stuff in the kitchen you can touch)
        array met opdrachten (lange termijn =level, korte termijn=bijv zet bloem water en eieren op tafel)
*/

