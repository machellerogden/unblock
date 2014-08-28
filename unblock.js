/**
 * unblock - a single function for dead simple asynchronous control flow
 *
 * @version v1.0.0
 * @repository https://github.com/machellerogden/unblock
 * @author Mac Heller-Ogden
 * @copyright Mac Heller-Ogden 2014
 * @license MIT
 */

!function (name, definition) {
    if (typeof module != 'undefined' && module.exports) module.exports = definition();
    else if (typeof define == 'function' && typeof define.amd == 'object') define(definition);
    else (function () { return this || (0, eval)('this'); }())[name] = definition();
}('unblock', function() {
    return function (func) {
        var result = [],
            args = [],
            queue = [],
            fn = {
                u: function (func) {
                    var a = Array.prototype.slice.call(args);
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
                    queue.push(fn.u(func));
                    return fn;
                },
                after: function (func) {
                    return function () {
                        args = arguments;
                        queue.push(fn.u(func));
                        return fn;
                    };
                }
        };
        return fn.u(func);
    };
});
