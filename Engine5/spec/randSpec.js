describe("The Random Module", function() {
    describe("Can work on numbers", function() {
        var n;
        it("expects to find a nr function ", function() {
            expect(Rand.nr).toBeTruthy();
        });
        it("expects Rand.nr(0) to return 0", function() {
            expect(Rand.nr(0) === 0).toBeTruthy();
        });
        it("expects Rand.nr() to return a number between 0.0 & 1.0", function() {
            n = Rand.nr();            
            expect(n> 0.0 && n< 1.0).toBeTruthy();
        });
        it("expects Rand.nr(800) to be in the range [0, 800] inclusive", function() {
            n = Rand.nr(800);             
            console.log(n);
            expect(n >= 0 && n<=800).toBeTruthy();
        });
        it("expects Rand nr(200,300) to be in the range 200,300", function() {
            n = Rand.nr(200,300);
            console.log(n);             
            expect(n >= 200 && n<=300).toBeTruthy();
        });
        it("expects Rand nr(-300) to be in the range -300, 0", function() {
            n = Rand.nr(-300);             
            expect(n >= -300 && n<=0).toBeTruthy();;
        });
        it("expects Rand nr(-300, 600) to be in the range -300, 600", function() {
            n = Rand.nr(-300,600);             
            expect(n >= -300 && n<=600).toBeTruthy();;
        });
        it("expects Rand nr(-300, -600) to be in the range -600, -300", function() {
            n = Rand.nr(-300,-600);             
            expect(n >= -600 && n<=-300).toBeTruthy();;
        });
    });
    describe("Can work on colors", function() {
        var c;        
        it("expects Rand color() to return a valid color", function() {
            c = Rand.color();             
            expect(validColor(c)).toBeTruthy();;
        });
        it("expects Rand color('#f00') to return a color from black to red", function() {
            c = Rand.color('#f00');             
            expect(validColor(c)).toBeTruthy();;
        });
        it("expects Rand color('#f00', '#0f0') to return a color from red to green", function() {
            c = Rand.color('#f00','#0f0');             
            expect(validColor(c)).toBeTruthy();;
        });
        it("expects Rand color(0, 1) to return a random color with saturation 0 and value 1", function() {
            c = Rand.color('#f00','#0f0');             
            expect(validColor(c)).toBeTruthy();;
        });
    });
    describe("Can work on choices", function() {
        var c;        
        it("expects Rand choose('banana') to return banana", function() {
            c = Rand.choose('banana');             
            expect(c === 'banana').toBeTruthy();;
        });
        it("expects Rand choose('banana', 'apple') to return them at a roughly 30/70 to 50/50% change", function() {
            var aCount=0;
            var bCount=0;            
            for (var i=0; i< 100; i+=1) {
                c = Rand.choose('banana','apple');
                if (c === 'banana') {
                    bCount += 1;
                } else if (c==='apple') {
                    aCount += 1;
                } 
            }
                       
            expect((aCount+bCount===100)).toBeTruthy();;
            expect(aCount > 30).toBeTruthy();
            expect(bCount > 30).toBeTruthy();
        });
        it("works on different types", function() {
            var c;
            c = Rand.choose('banana','apple');
            expect(typeof c === 'string').toBeTruthy();
            c = Rand.choose(100,100);
            expect(typeof c === 'number').toBeTruthy();
            c = Rand.choose({},{},{});
            expect(typeof c === 'object').toBeTruthy();
        });
    });
});
