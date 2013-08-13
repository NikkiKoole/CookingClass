describe("has a collision Module", function() {

    beforeEach(function() {
        var container = document.createElement('div');
        container.setAttribute('id','container');
        container.style.width = window.innerWidth + 'px';//'800px';
        container.style.height = window.innerHeight + 'px';//'600px';
        container.style['-webkit-user-select']= 'none';
        container.style.position='absolute';
        container.style.top='0';
        container.style.left = '0'
        document.body.appendChild(container);
        GameWorld.deleteAllGameObjects();
    });

    afterEach(function() {
        document.body.removeChild(document.getElementById('container'));
    });

    it("expects to handle a very simple collision test", function() {
        var rect = GameWorld.createObject('rectangle').setPosition(0,0).setDimension(100,100);
        //rect.div.offsetWidth;
        //console.log(rect.div.style);
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
        rect.div.offsetWidth;
        var colliding = Collision.itemsAtPosition(25,25,[rect]);
        expect(colliding.length > 0).toBeTruthy();
        colliding = Collision.itemsAtPosition(525,525,[rect]);
        expect(colliding.length > 0).toBeTruthy();
    });
    it("expects to handle rotations", function() {
        var rect = GameWorld.createObject('rectangle').setPosition(0,0).setDimension(100,100);
        rect.div.offsetWidth;        
        var colliding = Collision.itemsAtPosition(100,100,[rect]);
        expect(colliding.length > 0).toBeTruthy();
        rect.setRotation(45);        
        colliding = Collision.itemsAtPosition(100,100,[rect]);
        expect(colliding.length === 0).toBeTruthy();
    });
    it("expects game objects in (nested) groups to function also", function() {
        //var rect = GameWorld.createObject('rectangle').setPosition(0,0).setDimension(100,100);
        //var colliding = Collision.itemsAtPosition(100,100,[rect]);
        //expect(colliding.length > 0).toBeTruthy();
        //rect.setRotation(45);        
        //colliding = Collision.itemsAtPosition(100,100,[rect]);
        //expect(colliding.length === 0).toBeTruthy();
    });

});
