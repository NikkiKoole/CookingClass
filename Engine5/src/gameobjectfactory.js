
GameObjectFactory = (function() {
    var uniqueIDCounter = 0;

    function typeAllowed(t) {
        var allowed = ['rectangle', 'circle', 'line', 'triangle', 'rounded', 'sprite', 'group'],
            i, len = allowed.length;
        for (i = 0; i < len; i += 1) {
            if (t === allowed[i]) {
                console.log(allowed[i]);
                return true;
            }
        }
        throw (Error("Wrong Type"));
    }
    
    function getUniqueId() {
        uniqueIDCounter += 1;
        return 'GID' + getType() + uniqueIDCounter        
    }        
    function getType(type){
        if (typeof type === 'string') {return type}
        if (typeof type === 'object') {return type.type}
    }
    function getId(type, id){
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

    function objectIsDefinedFurther(arg1) {
        return (typeof arg1 === 'object' && Object.keys(arg1).length > 2 );
    }

        function constructHelper(arg1, id, type) {
        var key,
            gameObject;

        if (typeAllowed(type) && GameWorld.idAllowed(id)) {
            gameObject = createObject(type, id);
            if (objectIsDefinedFurther(arg1)) {
                fillGameObjectProperties(gameObject, arg1)
            }
            
        }
        return gameObject; 
    }

    function fillGameObjectProperties(gameObject, arg1) {
        for (var i = 0; i < Object.keys(arg1).length; i += 1) {
            key = Object.keys(arg1)[i];
            if (key !== 'id' || key !== 'type') {
                if (gameObject[key]) {
                    gameObject[key] = arg1[key];
                }
            }
        }
    }
    
    function createObject(t, i) {
        //this function will instantiate the correct type of GameObject for you.
       // var typeAndId = getTypeAndIdFromArguments(type, id);
        //var gameObject = constructHelper(type, typeAndId.id, typeAndId.type);
        var type = getType(t);
        typeAllowed(type);
        var id = getId(t, i);
        GameWorld.idAllowed(id);
        

        if (type === 'rectangle') {
            return new Rectangle(id);       
        } else if (type === 'triangle') {
            return new Triangle(id);
        } else if (type === 'circle') {
            return new Circle(id);
        } else if (type === 'line') {
            return new Line(id);
        } else if (type === 'rounded') {
            return new Rounded(id);
        } else if (type === 'group') {
            return new Group(id);
        } 
    }    
    return {
        create:createObject
    }
}());


