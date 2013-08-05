describe("has a collision Module", function() {

    beforeEach(function() {
        var container = document.createElement('div');
        container.setAttribute('id','container');
        document.body.appendChild(container);
        GameWorld.deleteAllGameObjects();
    });

    afterEach(function() {
        document.body.removeChild(document.getElementById('container'));
    });

    it("expects to handle a very simple collision test", function() {
        var rect = GameWorld.createObject('rectangle').setPosition(0,0).setDimension(100,100);
        var colliding = Collision.itemsAtPosition(25,25,[rect]);

        expect(colliding.length > 0).toBeTruthy();
        colliding = Collision.itemsAtPosition(525,525,[rect]);
        expect(colliding.length === 0).toBeTruthy();
    });
    it("expects to recognize multiple collisions", function() {
        var rect = GameWorld.createObject('rectangle').setPosition(0,0).setDimension(100,100);
        var rect2 = GameWorld.createObject('rectangle').setPosition(0,0).setDimension(100,100);        
        var colliding = Collision.itemsAtPosition(25,25,[rect, rect2]);

        expect(colliding.length === 2).toBeTruthy();
       
    });
    it("expects to handle scaling", function() {
        var rect = GameWorld.createObject('rectangle').setPosition(0,0).setDimension(100,100).setScale(10,10);
        var colliding = Collision.itemsAtPosition(25,25,[rect]);
        expect(colliding.length > 0).toBeTruthy();
        colliding = Collision.itemsAtPosition(525,525,[rect]);
        expect(colliding.length > 0).toBeTruthy();
    });
    it("expects to handle rotations", function() {
        var rect = GameWorld.createObject('rectangle').setPosition(0,0).setDimension(100,100);
        var colliding = Collision.itemsAtPosition(100,100,[rect]);
        expect(colliding.length > 0).toBeTruthy();
        rect.setRotation(45);        
        colliding = Collision.itemsAtPosition(100,100,[rect]);
        expect(colliding.length === 0).toBeTruthy();

    });

});
