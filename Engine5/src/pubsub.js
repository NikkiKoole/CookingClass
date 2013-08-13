/**PubSub Module */
var PubSub = (function () {
    return {
        enable: function (config, on) {
            var n, max;
            on.subscribe = function (event, callback) {
                this.subscribers = this.subscribers || {};
                this.subscribers[event] = this.subscribers[event] || [];
                this.subscribers[event].push(callback);
            };
            on.unsubscribe = function (event) {
                if (this.subscribers.hasOwnProperty(event)) {
                    delete this.subscribers[event];
                }
            };
            on.publish = function (event) {
                if (this.subscribers && this.subscribers[event]) {
                    var subs = this.subscribers[event],
                        args = [].slice.call(arguments, 1);
                    for (n = 0, max = subs.length; n < max; n += 1) {
                        subs[n].apply(on, args);
                    }
                }
            };
            if (config) {
                for (n = 0, max = config.length; n < max; n += 1) {
                    on.subscribe(config[n].event, config[n].action);
                }
            }
        }
    };
}());

