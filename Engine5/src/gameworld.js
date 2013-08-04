var GameWorld = (function () {
    var gameObjects = [],
        uniqueIDCounter = 0;

    function typeAllowed(t) {
        var allowed = ['rectangle', 'circle', 'line', 'triangle', 'rounded', 'sprite', 'sheet', 'group'],
            i;
        for (i = 0; i < allowed.length; i += 1) {
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
                //gameObjects[i].div
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
            //should probably do more cleanup sometime.
            DomEdit.removeObject(gameObjects.pop().id);
        }
    }

    function countGameObjects() {
        return gameObjects.length;
    }

    function createObject(arg1, arg2) {
        // first try and find a type
        // then an id, if no id is found, generate one.
        var type,
            id,
            needsMore = false,
            gameObject,
            i,
            key;

        if (typeof arg1 === 'string' && arg2 === undefined) {
            // createObject('rect') //heeft dus een generated ID nodig

            type = arg1;
            id = 'GID' + type + uniqueIDCounter;
            uniqueIDCounter += 1;


        } else if (typeof arg1 === 'string' && typeof arg2 === 'string') {
            // createObject('rect','idName')                
            type = arg1;
            id = arg2;

        } else if (typeof arg1 === 'object' && arg2 === undefined) {
            // createObject({id:'myId', type:'rectangle'})
            type = arg1.type;
            if (arg1.hasOwnProperty('id')) {
                id = arg1.id;
            } else {
                id = 'GID' + type + uniqueIDCounter;
                uniqueIDCounter += 1;
            }
            if (Object.keys(arg1).length > 2) {
                needsMore = true;
            }
        } else {
            console.log('these arguments are wrong' + arg1 + ", " + arg2);
        }

        if (typeAllowed(type) && idAllowed(id)) {
            gameObject = new GameObject(id, type);
            gameObjects.push(gameObject);
            if (needsMore) {
                // will overwrite properties it finds that are also in the current GameObject,
                // so you can define an object partly or fully, or from an external file 
                for (i = 0; i < Object.keys(arg1).length; i += 1) {
                    key = Object.keys(arg1)[i];
                    if (key !== 'id' || key !== 'type') {
                        if (gameObject[key]) {
                            gameObject[key] = arg1[key];
                        }
                    }
                }
            }
        }

        if (type === 'rectangle') {
            gameObject.div = DomEdit.addRectangle(gameObject);
        } else if (type === 'triangle') {
            gameObject.div = DomEdit.addTriangle(gameObject);
        } else if (type === 'line') {
            gameObject.div = DomEdit.addLine(gameObject);
        } else if (type === 'circle') {
            gameObject.div = DomEdit.addCircle(gameObject);
        } else if (type === 'rounded') {
            gameObject.div = DomEdit.addRounded(gameObject);
        } else if (type === 'group') {
            gameObject.div = DomEdit.addGroup(gameObject);
        }
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
