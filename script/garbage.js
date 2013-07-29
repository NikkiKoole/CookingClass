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

/*    
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
*/

//console.log(module1.export1);
