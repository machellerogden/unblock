/**
 * unblock - a single function for dead simple asynchronous control flow
 *
 * @author Mac Heller-Ogden
 *
 */

(function () {
    var global = (function () { return this || (0, eval)('this'); }()),
        unblock = function (func) {
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
                };
            }
        };
        return fn.unblock(func);
    };
    // export to global
    global.unblock = unblock;
}());
