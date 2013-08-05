describe("The pubsub Module", function() {
    beforeEach(function() {
    });

    it("should have a  enable function", function() {
        expect(typeof PubSub.enable === 'function');
    });
    it("should call the function the subscriber wants, if it hears the right published event", function() {
        var testRoot = {
            testFunc: function() {
            }
        }
        spyOn(testRoot, 'testFunc'); 

        PubSub.enable(null, testRoot);
        testRoot.subscribe('test', testRoot.testFunc);
        testRoot.publish('test');

        expect(testRoot.testFunc).toHaveBeenCalled();
    });
    it("should set a list of subscribers when set at enable", function() {
        var config = [
            {event:'test1', action:function() {}},
            {event:'test2', action:function() {}},
            {event:'test3', action:function() {}},
        ]
        
        var testRoot = {
        } 

        PubSub.enable(config, testRoot);

        expect(testRoot.subscribers['test1'] && testRoot.subscribers['test2'] && testRoot.subscribers['test3']).toBeTruthy();
        
        
    });
    


});
