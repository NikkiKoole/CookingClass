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
        if (currentTask && currentTask.code) {
           window[currentTask.code.functionName](currentTask.code.functionArgs);        
        }
        return true;
    }   
    function feedJSON(b) {
        index=0;
        json=b;
        setCurrentTaskToIndex();
        console.log(currentTask);
    }
    function nextTask() {
        if (json.tasks.length > index  ) {
            index += 1;
            setCurrentTaskToIndex();
            console.log(currentTask);  
        } else {
        console.log('end reached');        
        }    
    }
    
    return { isDone: isCurrentTaskDone
            ,feed: feedJSON
            ,next: nextTask
            };
})();
