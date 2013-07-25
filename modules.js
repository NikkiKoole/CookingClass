"use strict";



function GameObject(item) {
/*
    function dec() {
        if (secret > 0) {
            secret -= 1;
            return true;
        } else {
            return false;
        }
    }

    //this.sprite =sprite,
    //this.name=str,
    //this.frames=frames;
    var secret = 3;
    var that = this;
*/
}

var logger = (function(){
    var output = true;
    function printLine(line) {
        if (output){        
            console.log(line);
        }    
    }
    function setVisible(value) {
        output = value;    
    }    
    
    return {
        print:printLine,
        visible:setVisible    
    }
})();

var print =logger.print;
//logger.visible(false);


var taskCounters = (function() {
    var destinationRects = [];
    var clickCounters = [];
    var specialClickCounters = [];
    var timerCounters = [];    

    function addRect(rect) {
        destinationRects.push(rect);    
    }
    function removeRect(rect) {
        var index = destinationRects.indexOf(rect);
         destinationRects.splice(index,1);           
    }
    function addSpecialClickCounter(c) {
        specialClickCounters.push(c);    
    }
    function testSpecial(name, holding) {
    console.log(name);
        for (var i=0; i<specialClickCounters.length; i+=1) {
               print(specialClickCounters[i].name+", "+name+", "+holding);
               // print(holding) ;      
            if (specialClickCounters[i].name===name) {
                print(name+", "+holding);             
                if (holding===specialClickCounters[i].against)
                {
                    print(holding+" and "+name) ;
                    return true; 
                }   
                           
            }        
        }
        return false;
    }


    function allDone() {
        if (destinationRects.length!==0) {return false;};
        if (clickCounters.length!==0) {return false;};
        if (specialClickCounters.length!==0) {return false;};
        if (timerCounters.length!==0) {return false;}; 
        return true   
    }

    return {
        addDestinationRect:addRect,
        removeDestinationRect:removeRect,
        addSpecial:addSpecialClickCounter,
        hasSpecialClickItem:testSpecial,
        done:allDone
           
    }
})();



var gameWorld = (function() {
    var gameObjects = [];
    var list;
    var draggingItem; 
  
    function removeAllObjects() {
    
    }    
    
    function getGameObject(name) {
        var obj;        
        for (var i =0;i<gameObjects.length ;i+=1) {
            obj = gameObjects[i];
            //print(obj.name+" "+name);
            if (obj.name === name)
            {
                return obj;
            }
        }        
    }

    function addDestinationRectForObject(item, x, y, w, h) {
        //will add and handy named div into the dom.
        var objImage = domManipulator.createRectangle("destination_"+item, x, y, w, h, '#b0c4de', 0, getGameObject(item).layer-1)
        objImage.onclick = onDestinationClick; 
        //destinationRects.push(objImage);
        taskCounters.addDestinationRect(objImage);
    }
    

    
    function setList(json) {
        list = json;
        taskList.feed(json);
        taskList.next();
    }
    
    function onMouseMove(e) {
        if (draggingItem) {
            //print(e.pageY+","+e.screenY);
            var el = document.getElementById(draggingItem.name);
            var newX = (e.pageX-draggingItem.cellWidth/2);
            var newY = (e.pageY-draggingItem.cellHeight/2);
            domManipulator.position(el,newX, newY, 0, draggingItem.startAngle );
          
        }    
 
            
            if (taskList.subTaskDone()){
                if (!taskList.allDone()){                
                    taskList.next();         
                }   
       
            }
 

        
    }

    function fromJSON(json) {
        //will expect json starting with a 'item' collection. (either foods, apparatus or other tools)
        //will construct the private gameObjects Array at this stage.
        ///print(json);
        var item;    
        for (var i = 0; i<json.items.length; i++ ) {
            item = json.items[i]; 
            gameObjects.push(json.items[i]);
        }
        
    }
    
    function setFrame(element, item, frame) {
           element.style['background']='url('+item.src+') '+frame.xOffset+'px '+frame.yOffset+'px';  
    }    
    
    var onDestinationClick = function(e) {
        print('you clicked destination');
        print(e);
        var destinationName = e.toElement.id;
        if (draggingItem) {
            if (('destination_'+draggingItem.name)===destinationName) {
               // print('yes object: '+draggingItem.name+" has reached "+destinationName);
                //now you should do as much cleanup as possible;
                    var div = document.getElementById(destinationName);
                   
                    
                    div.parentNode.removeChild(div);
                    
                    draggingItem['draggable']='none';
                     draggingItem=null;

                    taskCounters.removeDestinationRect(div);
                    //print('status after release'+ taskCounters.done())
                    
            }
        }
         print(destinationName);  
    }

    var onClickFunction = function(e) {
            //alert('You clicked that thang!');
            //        objImage.style['background']='url('+item.src+') 62px 0';
            
            //for gameObjects
            // now it should test to see if special clicks are wanted
            var item;
            var element;
            console.log(e);
            for (var i =0; i<gameObjects.length; i+=1) {
                item = gameObjects[i];
                element = e.toElement;
                console.log(item.name);
                console.log(item);

                if (item.name === element.id) {
                    //console.log(item.name);
                   
                    if(item.hasOwnProperty('draggable')) {
                        //print(item.draggable);
                        if (item.draggable==true)
                        {
                            //element.onclick ='null';
                            //element.style['pointer-events']='none';
                            draggingItem = item;   
                            print('will be dragging');
                        }
                                   
                    }
                    if (draggingItem) {
                    //if (item.name !== draggingItem.name){
                     if (taskCounters.hasSpecialClickItem(item.name, draggingItem.name)) {
                    // do some special click stuff then
                        console.log("Found specila stuff for "+item.name);
                    }
                    //}
                    }


                   
                    var index = Math.floor(Math.random()*(item.frames.length));
                    var frame = item.frames[index];
                    
                    setFrame(element, item, frame);
                        
                   
                          
                }            
            }
}

    function addAllGameObjectsToDOM(gameroot) {
        var item;
        var objImage;

        for (var i = 0; i<gameObjects.length; i++ ) {
            item = gameObjects[i];
            objImage = domManipulator.createSprite(item.name, item.startX, item.startY,item.cellWidth, item.cellHeight, item.src, item.startAngle, item.layer);                
            objImage.onclick = onClickFunction; 
        }
    } 
   
    return {
        setTaskList:setList,
        constructFromJSON:fromJSON,
        addToDOM:addAllGameObjectsToDOM,
        handleMouseMove:onMouseMove,
        getObject:getGameObject,
        addDestination:addDestinationRectForObject 
    };
})();


