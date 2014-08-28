# Unblock.js

A single function for dead simple asynchronous control flow.

## NPM

    npm install unblock

## Download

Download [unblock.js](https://github.com/machellerogden/unblock/blob/master/unblock.js) and include in your page or in your app via script tag or RequireJS.


## Example

    // this is a blocking function to use in the example below
    var sleep = function (seconds) {
        var ms, startTime;
        ms = seconds * 1000;
        startTime = new Date().getTime(); // get the current time
        while (new Date().getTime() < startTime + ms); // hog cpu
        return seconds;
    };

    // this is a simple reporter function to use in the example below
    var report = function(x) { console.log(x); };

    /**
     * EXAMPLE
     */

    // this is a basic control flow example
    unblock(sleep)(2).then(report).after(sleep)(3).then(report);

    // since the above is unblocked, this will run first
    report(1);

