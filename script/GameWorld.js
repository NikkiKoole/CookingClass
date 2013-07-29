
var GameWorld = (function() {
    var gameObjects = [];
    var list;
    var draggingItem; 
    var panIsClosed;
 
 
    function fromJSON(json) {

        var item;    
        for (var i = 0; i<json.items.length; i++ ) {
            item = json.items[i];
            var o = (item.layers) ? 
                Object.create(LayeredGameObect.prototype) : 
                Object.create(GameObject.prototype) ;
            o.fromJSON(item);
            if (o.name.indexOf('potato')===0) {
                o.peel = function(e, g) {   
                    g.setFrame('peeled'+(4-e.times));                
                }            
            }
            if (o.name.indexOf('burner')===0) {
                o.burnerOn = function(e, g) {
                    console.log('call burner on');                    
                    var g = getGameObject('fire');
                    g.setVisible(true);                
                } 
                 o.burnerOff = function(e, g) {
                    console.log('got thriough here');
                    var g = getGameObject('fire');
                    g.setVisible(false);                
                }            
            }
            if (o.name.indexOf('water')===0) {
                o.waterOn = function(e, g) {
                    var g = getGameObject('straal');
                    g.setVisible(true);
                }
                o.waterOff = function(e, g) {
                    var g = getGameObject('straal');
                    g.setVisibile(false);
                }            
            }
            if (o.name.indexOf('pan')===0) {
                o.fill = function(e, g) {
                    var g = getGameObject('pan');
                    var newOffset = parseInt(g.getLayerOffset('panWater').y)-5; 
                    g.setLayerOffset('panWater',0, newOffset );
           
                }
                o.potatoInPan = function(e, g) {
                    releaseDraggable();
                } 
                o.lidOn = function(e, g) {
                    releaseDraggable();
                }
  
            }
            
            gameObjects.push(o);
        }
        
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

    function setDraggingItem(item) {
        draggingItem=item;
    }
    
    function removeItem(name) {
        //function will remove item from gameobjects.
        for (var i= gameObjects.length-1; i>0; i-=1 ) {
            if (gameObjects[i].name === name) {
                gameObjects.splice(i, 1);                
            }        
        }
    }


    function addDestinationRectForObject(item, x, y, w, h) {
        //will add and handy named div into the dom.
        var objImage = DomManipulator.createRectangle("destination_"+item, x, y, w, h, '#b0c4de', 0, 1);
        taskCounters.addDestinationRect(objImage);
        var json = {
            'name':"destination_"+item,
            'x':x*1,
            'y':y*1,
            'rotation':0,
            'layer':1,
            'width':w*1,
            'height':h*1,
            'index':0,
        }        
        gameObjects.push(json);
    }
    

    
    function setList(json) {
        list = json;
        taskList.feed(json);
        taskList.next();
    }
    
    function onMouseMove(e) {
        if (draggingItem) {

            var newX = (e.pageX-draggingItem.width/2);
            var newY = (e.pageY-draggingItem.height/2);
            var gameObject = getGameObject(draggingItem.name);
            gameObject.setPosition(newX, newY, draggingItem.rotation)
          
        }    


    }

    function tweenToLayer(item, z) {
         DomManipulator.tweenObj(item.name, item.x, item.y, z, item.rotation,  0, null);   
    }
    
    function releaseDraggable() {
        if (draggingItem) {
            draggingItem['draggable']='none'; 
        }       
       
        draggingItem=null; 
    }

    function onClick(e) {
        //print('you clicked on the game container');
        //print(e); 
        // a few thigs should happen here. 
        // you run a test to see which objects are under the cursor
        // if you click a draggable object it will become the 'draggingItem'  
        var c = collider.itemsAtCursor(e.pageX, e.pageY, gameObjects);// getCollidingItemsAtPosition(e.pageX, e.pageY);
        console.log(c);
        
        if (draggingItem) {

        // test to see if there is an item in the list named 'destination_'+myname
        // if so then this draggingItem has reached its destination and will be released.

            for (var i=0; i< c.length; i+=1) {
            
                if (c[i].name==='destination_'+draggingItem.name) {

                     releaseDraggable();
                  
                    var div = document.getElementById(c[i].name);
                    taskCounters.removeDestinationRect(div); 
                    div.parentNode.removeChild(div);
                    removeItem(c[i].name);           
                }
            }        
        } 
        
        // test to see if I should pick up a draggable item        
        for (var i=0; i< c.length; i+=1) {
            if (c[i]['draggable']=== true) {
               draggingItem = getGameObject(c[i].name); 
            }
        }

        //test to see if taskCounter has specialClicks that are suitable to my situation
        // if so then it will return that object.
        var counter = taskCounters.hasSpecialClickItem(c);

        if (counter) {
            handleSpecialClickCounter(counter);        
        }
    
          
    }

    function handleSpecialClickCounter(counter) {
        var g = getGameObject(counter.name);//[counter.callback];
        (g[counter.callback](counter, g));
    }


    function onUpdate(){
        var timerCallbacks = taskCounters.updateTimers();
        for (var i=0; i<timerCallbacks.length; i+=1) {
            if (timerCallbacks[i].ticks<=0) {
                var f = timerCallbacks[i].onTimerFinished;
                if (f!='null')
                {                
                    window[f]();
                } 
            } else {
                var f = timerCallbacks[i].onTimerTick;
                if (f !=='null') {
                window[f]();
                } 
            }        
        }
        
       // console.log(timerCallbacks[0]);

        var g = getGameObject('straal');
        g.cycle('flow');
        var g = getGameObject('fire');
        g.cycle('fire');
       if (taskList.subTaskDone()){
        //set ui text to task name.
            if (!taskList.allDone()){                
                taskList.next();
                if (taskList.currentName()) {
                    document.getElementById('textOverlay').innerHTML='<h1>'+taskList.currentName()+'</h1>';
                }         
            } else {
                document.getElementById('textOverlay').innerHTML='<h1>Einde</h1>'; 
            }   
   
        }     
  
    }


    return {
        setTaskList:setList,
        constructFromJSON:fromJSON,
        handleMouseMove:onMouseMove,
        handleClick:onClick,
        getObject:getGameObject,
        addDestination:addDestinationRectForObject,
        run:onUpdate,
        setDragging:setDraggingItem 
    };
})();

