var collider = (function () {

    function getCollidingItemsAtPosition(x, y, gameObjects) {
        var collection = [];
        for (var i = 0; i < gameObjects.length; i += 1) {
            if (pointInObject(x, y, gameObjects[i])) {
                collection.push(gameObjects[i]);
            }
        }
        return collection;
    }

    function pointInObject(x, y, gameObject) {
        return (isPointInsideRectangle(gameObject, x - gameObject.width / 2, y - gameObject.height / 2));
    }

    function isPointInsideRectangle(rectangle, x, y) {
        var c = Math.cos(-rectangle.rotation * Math.PI / 180);
        var s = Math.sin(-rectangle.rotation * Math.PI / 180);

        //rotate the point
        var rotatedX = rectangle.x + c * (x - rectangle.x) - s * (y - rectangle.y);
        var rotatedY = rectangle.y + s * (x - rectangle.x) + c * (y - rectangle.y);

        //bounds
        var leftX = rectangle.x - rectangle.width / 2;
        var rightX = rectangle.x + rectangle.width / 2;
        var topY = rectangle.y - rectangle.height / 2;
        var bottomY = rectangle.y + rectangle.height / 2;

        var test = (leftX <= rotatedX && rotatedX <= rightX && topY <= rotatedY && rotatedY <= bottomY);

        return test;
    }

    return {
        itemsAtCursor: getCollidingItemsAtPosition
    }
})();
