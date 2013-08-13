/**Gameworld Module */
var GameWorld = (function () {
    var gameObjects = [];

    function idAllowed(id) {
        var i;
        for (i = 0; i < gameObjects.length; i += 1) {
            if (id === gameObjects[i].id) {
                throw (Error('Wrong Id'));
            }
        }
        return true;
    }

    function getObject(id) {
        var i;
        for (i = 0; i < gameObjects.length; i += 1) {
            if (id === gameObjects[i].id) {
                return gameObjects[i];
            }
        }
        return false;
    }

    function deleteObject(id) {
        var index = -1,
            i;
        for (i = 0; i < gameObjects.length; i += 1) {
            if (id === gameObjects[i].id) {
                DomEdit.removeObject(id);
                index = i;
            }
        }
        if (index > -1) {
            gameObjects.splice(index, 1);
        }
    }

    function deleteAllGameObjects() {
        while (gameObjects.length > 0) {
            DomEdit.removeObject(gameObjects.pop().id);
        }
    }

    function countGameObjects() {
        return gameObjects.length;
    }

    function createObject(type, id) {
        var gameObject = GameObjectFactory.create(type, id);
        if (gameObject) {
            gameObjects.push(gameObject);
            gameObject.constructDiv();
            //gameObject.div = DomEdit.addGameObject(gameObject)
        }
        return gameObject;
    }

    return {
        getAllItems: function() {return gameObjects;},
        createObject: createObject,
        getObject: getObject,
        deleteObject: deleteObject,
        deleteAllGameObjects: deleteAllGameObjects,
        countGameObjects: countGameObjects,
        idAllowed: idAllowed
    };
}());
