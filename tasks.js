var taskList = (function(){
    // a tasklisthandles the order in which stuff needs to happen
    // the game can ask if the current task is done //subTaskDone
    // if so a new task can be loaded //next
    // behind the scenes tasks have onEnter and onExit funcionalities to initialize and destruct things and eventlisteners
    // initialliy this module is given a json to construct itself with  //feed
    
    var json;
    var currentTask;
    var index;
    //var done=false;

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

    function completed() {
       return (index===json.tasks.length)
    }
    
    return { subTaskDone: isCurrentTaskDone
            ,feed: feedJSON
            ,next: nextTask,
            allDone: completed
            };
})();
