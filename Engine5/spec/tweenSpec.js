describe("has a tweening Module", function() {
     beforeEach(function() {
        var container = document.createElement('div');
        container.setAttribute('id','container');
        document.body.appendChild(container);
        GameWorld.deleteAllGameObjects();
    });

    afterEach(function() {
        document.body.removeChild(document.getElementById('container'));
    });

        it("can find the TweenBoss ", function() {
            //var g = GameWorld.createObject('rectangle');            
            expect(TweenBoss).toBeTruthy();
        });

        it("expects tweenTo({x:100, y:100}) to know it needs a '-webkit-transform' property", function() {
            var a =  TweenBoss.getProperties(null, {x:100, y:100});           
            expect(a==='-webkit-transform');
        });
        it("expects tweenTo({x:100, y:100, width:10}) to know it needs a 'width' too,", function() {
            var a =  TweenBoss.getProperties(null, {x:100, y:100, width:100});           
            expect(a.indexOf('width') >-1);
        });
        it("expects tweenTo({x:100, y:100, width:10, height:10, color:'#ff00ee'}) to know it needs a few properties,", function() {
            var a =  TweenBoss.getProperties(null, {x:100, y:100, width:10, height:10, color:'#ff00ee'});           
            expect(a.indexOf('width') >-1);
            expect(a.indexOf('height') >-1);
            expect(a.indexOf('background-color') >-1);
            expect(a.indexOf('-webkit-transform') >-1);
        });
        it("expects to call the onFinished function when given and finished,", function() {
            //var a =  TweenBoss.getProperties(null, {x:100, y:100, width:100});           
            //expect(a.indexOf('width') >-1);
            var a = GameWorld.createObject('rectangle').setPosition(100,0);
            a.isDone=false;
            a.done = function() {
                this.isDone=true;            
            }
            spyOn(a, 'done'); 
            a.tweenTo(0.01,{x:200, onComplete:a.done});
              window.setTimeout(partB,5);

            function partB() {
                
                expect(a.isDone).toBeTruthy();
            }
                
             
        });


    });
