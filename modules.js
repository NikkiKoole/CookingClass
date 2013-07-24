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
    // a tasklist is a full 'recipe in order'
    // it has a list of abstract tasks, build up from smaller precise/concrete tasks
    // it is fed a json string to construct itself with
    // it needs to keep an indexer to its current abstract task
    
    var json;
    var currentTask;
    var index;

    function setCurrentTaskToIndex() {
 
        currentTask = json.tasks[index];
    }

    function isCurrentTaskDone() {
       
        return true;
    }   
    function runCode(state) {
        if (state === 'onEnter' || state === 'onRun' || state === 'onExit') {
            window[currentTask.code[state].functionName](currentTask.code[state].functionArgs); 
        }   
    }

    function functionExists(name) {
        return (typeof name == 'function')
    }
    



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
        index=0;
        json=b;
        setCurrentTaskToIndex();
        if (hasCorrectCode())
        {
        runCode('onEnter');
        }
        
    }
    
    function nextTask() {
        if (json.tasks.length > index -1  ) {
            index += 1;
            setCurrentTaskToIndex();
            if (hasCorrectCode())
            {
            runCode('onEnter');
            }
            
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

    function removeAllObjects() {
    
    }    
    
    function getGameObject(name) {
        var obj;        
        for (var i =0;i<gameObjects.length ;i+=1) {
            obj = gameObjects[i];
            if (obj.name === name)
            {
                return obj;
            }
        }        
    }

    //function document.getElementById("game")
    
    function setList(json) {
        list = json;
        console.log(list);
        console.log(taskList);
        taskList.feed(json);
        //list.fromJSON(json);
        
    }
    
    function onMouseMove(x, y) {
        if (draggingItem) {
            var el = document.getElementById(draggingItem.name);
            //el.onclick=null;
           //s draggingItem.draggable = null;  
            el.style['pointer-events']='none';       
            el.style['background']='url('+draggingItem.src+') 0 0';
            el.style['-webkit-transform'] = 'translate3d('+(x-draggingItem.cellWidth/2)+'px'+','+(y-draggingItem.cellHeight/2)+'px'+',0'+') rotate('+draggingItem.startAngle+'deg)';
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
                        
                    e.toElement.style['background']='url('+item.src+') '+frame.xOffset+'px '+frame.yOffset+'px';
                          
                }            
            }
}

    function addAllGameObjectsToDOM(gameroot) {
     
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
        getObject:getGameObject 
    };
})();


