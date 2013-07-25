"use strict";
var module1 = (function(import1) {
    var localVar;
   function localFun() {
    };
 
   function exportFun1() {
    
    };
   function exportFun2() { 
    };
 
   return { export1: exportFun1
          , export2: exportFun2
          };
})(12);


function GameObject(item) {

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
}





var taskList = (function(){
    // a tasklisthandles the order in which stuff needs to happen
    // the game can ask if the current task is done //isDone
    // if so a new task can be loaded //next
    // behind the scenes tasks have onEnter and onExit funcionalities to initialize and destruct things and eventlisteners
    // initialliy this module is given a json to construct itself with  //feed
    
    var json;
    var currentTask;
    var index;

    function setCurrentTaskToIndex() {
 
        currentTask = json.tasks[index];
    }

    function isCurrentTaskDone() {
       
        return true;
    }   

    function functionExists(name) {
        return (typeof window[name] === 'function')
    }
    
    function enterTask() {

        var cleaned = getFunctionCalls('onEnter');
        //console.log(cleaned);
        for (var i=0; i< cleaned.length; i+=1) {
           
            if (functionExists(cleaned[i].name)) {
                console.log(cleaned[i].name+" exists!");   
                //lets just try and call them
                //
                window[cleaned[i].name](cleaned[i].args);         
            }
            
        }
    }

    function getFunctionCalls(name) {
        //should return an array
        // sometimes the parameters could be arrays or objects or something else, beware at this point though they are just strings.
         
        var functionData = [];

            if (currentTask.hasOwnProperty(name)) {
                //console.log(currentTask);
                for (var i=0; i<currentTask[name].length; i+=1) {
                    var f = (currentTask[name][i]);
                    var key;
                    for (key in f) {
                        if (f.hasOwnProperty(key)) {
                            functionData.push({name: key, args:f[key]})                     
                        }
                    }      
                                    
                }
            }
        
        return functionData;
    }

    function exitTask() {
    }
    var getKeys = function (arr) {
        var key, keys = [];
        for (i = 0; i < arr.length; i++) {
            for (key in arr[i]) {
                if (arr[i].hasOwnProperty(key)) {
                    keys.push(key);
                }
            }
        }
        return keys;
    };



    function hasCorrectCode () {
        //each task requires an onEnter, the onRun and onExit are optional    
        var required = ['onEnter'];
        var optional = ['onRun', 'onExit'];
        var strictMode = false;
        if (!currentTask) {
            return false;        
        }
        if (!currentTask.hasOwnProperty('code') && strictMode)
        {
        }        

        if (!strictMode) {
            if (currentTask.hasOwnProperty('code')) {
                console.log (currentTask.code[required[0]].functionName);
                 return true; 
            } else {
                  return false;              
            }    
        }


    }
    function feedJSON(b) {
        index=-1;
        json=b;
    }
    
    function nextTask() {
        if (json.tasks.length > index -1  ) {
            index += 1;
            setCurrentTaskToIndex();
            enterTask();            
        } else {
        console.log('end reached');        
        }    
    }
    
    return { isDone: isCurrentTaskDone
            ,feed: feedJSON
            ,next: nextTask
            };
})();


var gameWorld = (function() {
    var gameObjects = [];
    //will need to know about the current tasklist at hand
    var list;
    var draggingItem; 
    var root;   

    function removeAllObjects() {
    
    }    
    
    function getGameObject(name) {
        var obj;        
        for (var i =0;i<gameObjects.length ;i+=1) {
            obj = gameObjects[i];
            //console.log(obj.name+" "+name);
            if (obj.name === name)
            {
                return obj;
            }
        }        
    }

    function addDestinationRectForObject(item, middleX, middleY, halfWidth, halfHeight) {
        //will add and handy named div into the dom.
        //console.log("I did get called though"); 
        console.log(root);

         var objImage = document.createElement("div");            
            //item = gameObjects[i];

            objImage.style.display = "block";
            objImage.id = "destination_"+item;
            objImage.style.position='absolute';
            objImage.style.zIndex=getGameObject(item).layer-1;
            objImage.style.width = (halfWidth*2)+"px";
            objImage.style.height = (halfHeight*2)+"px";
            objImage.style['background-color']='#b0c4de';
            //objImage.style['-webkit-transform'] = 'translate3d('+middleX+'px'+','+middleY+'px ,0) ';
            objImage.style['-webkit-transform'] = 'translate3d('+middleX+'px'+','+middleY+'px'+',0'+') rotate('+0+'deg)';
           //console.log('translate3d('+middleX+'px'+','+middleY+'px'+',0'+') rotate('+0+'deg)');
            objImage.onclick = onDestinationClick;            
            root.appendChild(objImage);  
      
        
    }

    //function document.getElementById("game")
    
    function setList(json) {
        list = json;
        //console.log(list);
        //console.log(taskList);
        taskList.feed(json);
        taskList.next();
        //list.fromJSON(json);
        
    }
    
    function onMouseMove(e) {
        if (draggingItem) {
            //console.log(e);
            var el = document.getElementById(draggingItem.name);
            
            //el.onclick=null;
           //s draggingItem.draggable = null;  
            el.style['pointer-events']='none';       
            el.style['background']='url('+draggingItem.src+') 0 0';
            el.style['-webkit-transform'] = 'translate3d('+(e.x-draggingItem.cellWidth/2)+'px'+','+(e.y-draggingItem.cellHeight/2)+'px'+',0'+') rotate('+draggingItem.startAngle+'deg)';
            //console.log(el);
            // keep dragging item at mouse position
        }    
    }

    function fromJSON(json) {
        //will expect json starting with a 'item' collection. (either foods, apparatus or other tools)
        //will construct the private gameObjects Array at this stage.
        ///console.log(json);
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
         console.log('you clicked destination');   
    }

    var onClickFunction = function(e) {
            //alert('You clicked that thang!');
            //        objImage.style['background']='url('+item.src+') 62px 0';
            
            //for gameObjects
            var item;
            var element;
            for (var i =0; i<gameObjects.length; i+=1) {
                item = gameObjects[i];
                element = e.toElement;
                
                if (item.name === element.id) {
                    
                    if(item.hasOwnProperty('draggable')) {
                        draggingItem = item;   
                        console.log('will be dragging');
                        //draggingItem.onclick = 'null';                 
                    }

                    //console.log("found representation in gameObject Array for "+item);
                    var index = Math.floor(Math.random()*(item.frames.length));
                    var frame = item.frames[index];
                    
                    setFrame(element, item, frame);
                        
                   
                          
                }            
            }
}

    function addAllGameObjectsToDOM(gameroot) {
        root = gameroot;
        var item;
        var objImage;

        for (var i = 0; i<gameObjects.length; i++ ) {
            objImage = document.createElement("div");            
            item = gameObjects[i];

            objImage.style.display = "block";
            objImage.id = item.name;
            objImage.style.position='absolute';
            objImage.style.zIndex=item.layer;
            objImage.style.width = item.cellWidth+"px";
            objImage.style.height = item.cellHeight+"px";
           
            objImage.style['background']='url('+item.src+') 0 0';
            objImage.style['-webkit-transform'] = 'translate3d('+item.startX+'px'+','+item.startY+'px'+',0'+') rotate('+item.startAngle+'deg)';

            objImage.onclick = onClickFunction; 
           
            gameroot.appendChild(objImage);  
      
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


