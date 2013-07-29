"use strict";

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




