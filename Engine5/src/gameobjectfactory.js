/**GameObject Factory Module */
var GameObjectFactory = (function() {
    var uniqueIDCounter = 0;

    function getType(type) {
        if (typeof type === 'string') {return type; }
        if (typeof type === 'object') {return type.type; }
    }

    function typeAllowed(t) {
        var allowed = ['rectangle',
                        'circle',
                        'line',
                        'triangle',
                        'rounded',
                        'group'],
            i, len = allowed.length;
        for (i = 0; i < len; i += 1) {
            if (t === allowed[i]) {
                return true;
            }
        }
        throw (new Error('Wrong Type'));
    }

    function resetUniqueCounter() {
        uniqueIDCounter = 0;
    }

    function getUniqueId(type) {
        uniqueIDCounter += 1;
        return 'GID' + getType(type) + uniqueIDCounter;
    }

    function getId(type, id) {
        if (typeof id === 'string') {return id; }
        if (typeof id === 'undefined') {
            if (typeof type === 'object') {
                if (type.hasOwnProperty('id')) {
                    return type.id;
                }
                return getUniqueId(type);
                
            }
            if (typeof type === 'string') {
                return getUniqueId(type);
            }
        }
    }

    function objectIsDefinedFurther(arg1) {
        return (typeof arg1 === 'object' && Object.keys(arg1).length > 2);
    }

    function createObject(t, i) {
        var type = getType(t),
            id = getId(t, i);
        typeAllowed(type);
        GameWorld.idAllowed(id);

        if (type === 'rectangle') {
            return new Rectangle(id);
        }
        if (type === 'triangle') {
            return new Triangle(id);
        }
        if (type === 'circle') {
            return new Circle(id);
        }
        if (type === 'line') {
            return new Line(id);
        }
        if (type === 'rounded') {
            return new Rounded(id);
        }
        if (type === 'group') {
            return new Group(id);
        }
    }

    function fillGameObjectProperties(gameObject, arg) {
        var key, i;
        for (i = 0; i < Object.keys(arg).length; i += 1) {
            key = Object.keys(arg)[i];
            if (key !== 'id' || key !== 'type') {
                if (gameObject[key]) {
                    gameObject[key] = arg[key];
                }
            }
        }
    }

    function constructHelper(arg1, id, type) {
        var gameObject;

        if (typeAllowed(type) && GameWorld.idAllowed(id)) {
            gameObject = createObject(type, id);
            if (objectIsDefinedFurther(arg1)) {
                fillGameObjectProperties(gameObject, arg1);
            }

        }
        return gameObject;
    }

    return {
        create: createObject,
        reset: resetUniqueCounter
    };
}());


