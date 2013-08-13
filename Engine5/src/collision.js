/**Collision Module */
var Collision = (function (){
    function getItemsAtPosition(x, y, gameObjects) {
        var collection = [];
        for (var i = 0; i < gameObjects.length; i += 1) {
            if (pointInObject(x, y, gameObjects[i])) {
                collection.push(gameObjects[i]);
            }
        }
        return collection;
    }

    function pointInObject(x, y, gameObject) {
        //for non webkit https://gist.github.com/Yaffle/1145197
        var local = window.webkitConvertPointFromPageToNode(gameObject.div, new WebKitPoint(x, y));
        //console.log(local, gameObject)
        if (local.x < 0 || local.x >  gameObject.width) return false;
        if (local.y < 0 || local.y > gameObject.height) return false;
        return true;
    }

    return {
        itemsAtPosition:getItemsAtPosition    
    }
}());
