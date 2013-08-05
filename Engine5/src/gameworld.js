var GameWorld = (function () {
    var gameObjects = [],
        uniqueIDCounter = 0;

    function typeAllowed(t) {
        var allowed = ['rectangle', 'circle', 'line', 'triangle', 'rounded', 'sprite', 'sheet', 'group'],
            i, len = allowed.length;
        for (i = 0; i < len; i += 1) {
            if (t === allowed[i]) {
                return true;
            }
        }
        throw (new Error("Wrong Type"));
    }


    function idAllowed(id) {
        var i;
        for (i = 0; i < gameObjects.length; i += 1) {
            if (id === gameObjects[i].id) {
                throw (new Error("Wrong Id"));
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

    function getTypeAndIdFromArguments(type, id) {
        function getUniqueId() {
            uniqueIDCounter += 1;
            return 'GID' + getType() + uniqueIDCounter        
        }        
        function getType(){
            if (typeof type === 'string') {return type}
            if (typeof type === 'object') {return type.type}
        }
        function getId(){
            if (typeof id === 'string') {return id}
            if (typeof id === 'undefined') {
                if (typeof type === 'object') {
                    if (type.hasOwnProperty('id')) {
                        return type.id;
                    } else {
                        return getUniqueId();                    
                    }
                } else if (typeof type === 'string') {
                    return getUniqueId();
                }
            }
        }        
        return {
            type: getType(),
            id: getId()        
        }    
    }

        function objectIsDefinedFurther(arg1) {
            return (typeof arg1 === 'object' && Object.keys(arg1).length > 2 );
        }


        function constructHelper(arg1, id, type) {
            var key,
                gameObject;

            if (typeAllowed(type) && idAllowed(id)) {
                gameObject = new GameObject(id, type);
                
                if (objectIsDefinedFurther(arg1)) {
                    fillGameObjectProperties(gameObject, arg1)
                }
                gameObjects.push(gameObject);
            }
            return gameObject; 
        }

        function fillGameObjectProperties(gameObject, arg1) {
            for (var i = 0; i < Object.keys(arg1).length; i += 1) {
                key = Object.keys(arg1)[i];
                if (key !== 'id' || key !== 'type') {
                    if (gameObject[key]) {
                        gameObject[key] = arg1[key];
                        console.log('overwrote' + key);
                    }
                }
            }
        }


    function createObject(type, id) {
        // the user can misuse the type and id parameters, that why I need a few checks in here.
        var typeAndId = getTypeAndIdFromArguments(type, id);
        var gameObject = constructHelper(type, typeAndId.id, typeAndId.type);

        gameObject.constructDiv();

        return gameObject;

    }

    return {
        createObject: createObject,
        getObject: getObject,
        deleteObject: deleteObject,
        deleteAllGameObjects: deleteAllGameObjects,
        countGameObjects: countGameObjects
    };
}());
