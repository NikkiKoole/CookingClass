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
            //var a =  TweenBoss.getProperties({x:100, y:100});           
            //console.log(a);            
            //expect(a==='-webkit-transform');
        });
        it("expects tweenTo({x:100, y:100, width:10}) to know it needs a 'width' too,", function() {
            //var a =  TweenBoss.getProperties({x:100, y:100});           
            //expect(a.indexOf('width') >-1);
        });
        it("expects tweenTo({x:100, y:100, width:10, height:10, color:'#ff00ee'}) to know it needs a few properties,", function() {
            //var a =  TweenBoss.getProperties({x:100, y:100, width:10, height:10, color:'#ff00ee'});           
            //expect(a.indexOf('width') >-1);
            //expect(a.indexOf('height') >-1);
            //expect(a.indexOf('background-color') >-1);
            ///expect(a.indexOf('-webkit-transform') >-1);
        });
        it("expects tweenBoss.constructCallData(2, something) to handle the extra s after 2", function() {
            //var a =  TweenBoss.getProperties({x:100, y:100});           
            //expect(a.indexOf('width') >-1);
            //console.log(TweenBoss.hasPropertiesDesired(0, {x:12, y:34, width:500}))
            //console.log(TweenBoss.constructCallData(2,{x:1, y:34, width:100, color:'#123456'}));
            //expect(TweenBoss.constructCallData(2, '').duration==='2s');
        });
    });
