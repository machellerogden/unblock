/**
 * unblock - a single function for dead simple asynchronous control flow
 *
 * @author Mac Heller-Ogden
 *
 */

var unblock = function (func) {
    var result = [],
        args = [],
        queue = [],
        fn = {
        unblock: function (func) {
            var a = Array.prototype.slice.call(args, 0);
            return function () {
                if (a.length < 1) a = (arguments.length) ? arguments : result;
                setTimeout(function () {
                    result = [func.apply(fn, a)];
                    if (queue.length) queue.shift().apply(fn, result);
                }, 0);
                return fn;
            };
        },
        then: function (func) {
            queue.push(fn.unblock(func));
            return fn;
        },
        after: function (func) {
            return function () {
                args = arguments;
                queue.push(fn.unblock(func));
                return fn;
            }
        }
    };
    return fn.unblock(func);
};


/**
 * example
 */

var sleep, report;

// blocking function
sleep = function (seconds) {
    var ms, startTime;
    ms = seconds * 1000;
    startTime = new Date().getTime(); // get the current time
    while (new Date().getTime() < startTime + ms); // hog cpu
    return seconds;
};

// simple reporter
report = function(x) { console.log(x); };

// basic control flow example (view results in console)
unblock(sleep)(2).then(report).after(sleep)(3).then(report);

// since the above is unblocked, this will run first
report(1);



