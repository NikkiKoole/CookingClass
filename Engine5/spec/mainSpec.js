/*
        Engine5

        the engine can handle a few basic shapes
        the engine can tween nicely
        
        A Shape can be a few things
            - Rectangle
            - Circle
            - Triangle
            - Line
        The you have images, and spriteSheets.

        You order the GameWorld to create a certain Item
        that handles asking the dom.

*/


describe("A Gameworld", function() {
    
    beforeEach(function() {
        var container = document.createElement('div');
        container.setAttribute('id','container');
        document.body.appendChild(container);
        GameWorld.deleteAllGameObjects();
    });

    afterEach(function() {
        document.body.removeChild(document.getElementById('container'));
    });

    it("should find the GameWorld module", function() {
        expect(GameWorld).toBeTruthy();
    });
    it("should find a div named 'container'", function() {
        expect(document.getElementById('container')).toBeTruthy();
    });

    describe("Can Create Read Update & Delete GameObjects", function() {
        describe("Create", function() {
            it("can create an object using: createObject('rectangle') ", function() {
                var g = GameWorld.createObject('rectangle');            
                expect(g).toBeTruthy();
            });
            it("can create an object using: createObject('rectangle','id01') ", function() {
                var g = GameWorld.createObject('rectangle','12');            
                expect(g).toBeTruthy();
            });
            it("can create an object using: createObject({type:'rectangle',id:'myID'}) ", function() {
                var g = GameWorld.createObject({type:'rectangle',id:'myID'});            
                expect(g).toBeTruthy();
            });
            it("can create an object using: createObject({type:'rectangle',id:'myID',width:100,height:100}) ", function() {
                var g = GameWorld.createObject({type:'rectangle',id:'myID'});            
                expect(g).toBeTruthy();
            });
            it("doesn't create an objects when you use: createObject(), instead it'll throw an error", function() {
                expect(function(){GameWorld.createObject()}).toThrow(new Error("Wrong Type"));
            });
            it("generates an ID for an object, when you don't feed it one", function() {
                var g2 = GameWorld.createObject('rectangle');
                expect(g2.id).toBeTruthy();        
            });
            it("should be able to create many simple rects", function() {
                for (var i =0; i<20; i+=1) {
                    var g2 = GameWorld.createObject('rectangle');
                    expect(GameWorld.countGameObjects===20);
                }        
            });
            it("should throw an error when you try to create a gameObject with an already taken ID", function() {
                var g1 = GameWorld.createObject('rectangle', 'myID');
                expect(function(){ GameWorld.createObject('rectangle', 'myID');}).toThrow(new Error("Wrong Id"));
            });
            it("should throw an error if you try and create a GameObject with an unknown/undefined type", function() {
                expect(function(){GameWorld.createObject('geengoedtype')}).toThrow(new Error("Wrong Type"));
                expect(function(){GameWorld.createObject()}).toThrow(new Error("Wrong Type"));
            }); 
              it("should not copy meaningless data from the json into the Object when you create one", function() {
                var g1 = GameWorld.createObject({type:'rectangle', id:'mySeneseless object',senseless:true});
                //console.log(g1);
                expect(g1.senseless).toBeFalsy();                
                //expect(function(){ GameWorld.createObject('rectangle', 'myID');}).toThrow(new Error("Wrong Id"));
            });      
        });        
       
describe("Read", function() {
    it ("Can read values from a just created gameObject", function() {
    expect(false).toBeFalsy();
    });
});



    });
    
    describe("Can handle the creation and deletion of GameObjects", function() {
        
        it("should have zero GameObjects to start with", function() {
            expect(GameWorld.countGameObjects===0);        
        });
        it("should be able to create a gameObject and then find it", function() {
            var g = GameWorld.createObject('rectangle', 'myID');
            var found = GameWorld.getObject('myID');
            expect(found).toBeTruthy();       
        });       
        it("should be able to delete all gameObjects in one go", function() {
            
            var g = GameWorld.createObject('rectangle', 'myID1');
             var g = GameWorld.createObject('rectangle', 'myID2');
             expect(GameWorld.countGameObjects===2);
             GameWorld.deleteAllGameObjects();
             expect(GameWorld.countGameObjects===0);
        });        

        it("should be able to create a gameObject in {} fashion and then find it", function() {
            var g = GameWorld.createObject({type:'rectangle', id:'myID'});
            var found = GameWorld.getObject('myID');
            expect(found).toBeTruthy();       
        });
        it("should be able to create a GameObject, and then delete it", function() {
            var g = GameWorld.createObject('rectangle', 'myID2');
            GameWorld.deleteObject('myID2');
            var found = GameWorld.getObject('myID2');
            expect(found).toBeFalsy(); 
        });
    });



/*

    it("should make the dom grow after you have added a GameObject", function() {
        var first = container.childNodes.length;
        GameWorld.addObject('crap','deluxe');
        var second = container.childNodes.length;
        expect(first < second);
    });
   
*/
});

describe("A Dom manipulator", function() {
    it("expects to live", function() {
        expect(true).toBe(true);
    });

});
