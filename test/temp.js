var testObj = {
    a: 2,
    b: 'Str',
    c: {
        d: 1,
        e: function (val) { return val; }
    }
};
var tester = function (obj, padding) {
    for (var _i = 0, _a = Object.entries(obj); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        if (value instanceof Object && typeof value !== 'function') {
            console.log('Key : ' + key);
            tester(value, padding + '    ');
        }
        else {
            console.log(padding + 'Key: ' + key + ' : ' + value);
        }
    }
};
/**
 * Functionally adds an array of numbers
 *
 * @param arr - array of numbers to aad
 * @returns the sum of numbers
 */
var add = function (arr) {
    if (!arr.length) {
        return 0;
    }
    var a = arr[0], rest = arr.slice(1);
    return a + add(rest);
};
var inArr = [1, 2, 3, 4, 5];
console.log(add(inArr));
console.log(inArr);
