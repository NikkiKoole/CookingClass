
var taskCounters = (function() {
    var destinationRects = [];
    var specialClickCounters = [];
    var timerCounters = [];    

    function addRect(rect) {
        destinationRects.push(rect);    
    }
    
    function removeRect(rect) {
        var index = destinationRects.indexOf(rect);
         destinationRects.splice(index,1);           
    }
    
    function addTimer(timer) {
        timerCounters.push(timer);
    }

    function addSpecialClickCounter(c) {
        specialClickCounters.push(c);    
    }

    function testTimers() {
        var counters = []; // has callback functions that will be called  

        for (var i=0;i<timerCounters.length;i+=1) {
            
            var counter = timerCounters[i];
            counter.ticks-=1;
            counters.push(counter) ;       
        } 
        
        for (var j=0;j<timerCounters.length;j+=1) {
            if (timerCounters[j].ticks<=0) {
                timerCounters.splice(j,1);
            }        
        }

        return counters;       
    }

    function testSpecial(arr) {
        // the taskCounter has an array of specialClickCounters.
        // when you feed this function an array that has the correctly named items for one of the counters
        // this function will return that specialClickCounter
       
        for (var j=0; j<specialClickCounters.length; j+=1) {

            var name = specialClickCounters[j].name.trim();
            var against = specialClickCounters[j].against.trim();  
            var nameFound=false;
            var againstFound=false;
            
            var item = specialClickCounters[j];
            if (against==='null') {againstFound=true;}
            for (var i=0; i<arr.length;i+=1) {
                var a = arr[i].name.trim();
                if (a === name){nameFound=true;}
                if (a === against) {againstFound=true;}    
            }
            
          
            
        
             if (nameFound && againstFound) {
                if (item.times > 0) {
                    item.times-=1;
                    if (item.times <= 0) {
                         specialClickCounters.splice(j,1); 
                   }
                   return item;
                }            
            }
        }
        
    }


    function allDone() {
        if (destinationRects.length!==0) {return false;};
        if (specialClickCounters.length!==0) {return false;};
        if (timerCounters.length!==0) {return false;}; 
        return true   
    }

    return {
        addDestinationRect:addRect,
        removeDestinationRect:removeRect,
        addSpecial:addSpecialClickCounter,
        hasSpecialClickItem:testSpecial,
        updateTimers:testTimers,
        done:allDone,
        addTimer:addTimer
           
    }
})();



var taskList = (function(){
    // a tasklisthandles the order in which stuff needs to happen
    // the game can ask if the current task is done //subTaskDone
    // if so a new task can be loaded //next
    // behind the scenes tasks have onEnter and onExit funcionalities to initialize and destruct things and eventlisteners
    var json;
    var currentTask;
    var index;

    function setCurrentTaskToIndex() {
         currentTask = json.tasks[index];
    }

    function isCurrentTaskDone() {
        return taskCounters.done();
       
    }   

    function functionExists(name) {
        return (typeof window[name] === 'function')
    }
    
    function enterTask() {
       functionCaller('onEnter');
    }
    function exitTask() {
        functionCaller('onExit');
    }

    function functionCaller(part) {
        if (part==='onEnter' || part==='onExit') {
            var cleaned = getFunctionCalls(part);
            for (var i=0; i< cleaned.length; i+=1) {
               
                if (functionExists(cleaned[i].name)) {
                    window[cleaned[i].name](cleaned[i].args);         
                }
                
            }
        }    
    }    
    
    function getFunctionCalls(name) {
        var functionData = [];

        if (!currentTask){return functionData};
            if (currentTask.hasOwnProperty(name)) {
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



    function feedJSON(b) {
        index=-1;
        json=b;
    }
    
    function nextTask() {
        if (json && json.tasks)
        {

            if (json.tasks.length > index -1  ) {
                 if (currentTask)
                {              
                    exitTask();
                }          
                index += 1;
                setCurrentTaskToIndex();
                if (currentTask)
                {
                    enterTask();
                }            
            } else {
           
            }
        }    
    }
    
    function getName() {
        if (currentTask) {
            return (currentTask.titel);
        }
    } 
     

    function completed() {
        if (json && json.tasks)
        {
            return (index===json.tasks.length)
        }
        return false;
    }
    
    return { subTaskDone: isCurrentTaskDone
            ,feed: feedJSON
            ,next: nextTask,
            allDone: completed,
            currentName: getName,
            
            };
})();
