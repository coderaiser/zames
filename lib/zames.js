'use strict';

const promisify = require('es6-promisify');
const currify = require('currify');

module.exports = (fn) => {
    check(fn);
    checkCount(fn.length);
    
    const f = [
        (a) => promisify(fn)(a),
        (a, b) => promisify(fn)(a, b),
        (a, b, c) => promisify(fn)(a, b, c),
    ];
    
    const count = fn.length - 2;
    return currify(f[count]);
};

function check(fn) {
    if (typeof fn !== 'function')
        throw Error('fn should be a function!');
}

function checkCount(count) {
    if (count > 4)
        throw Error('fn takes to much arguments, up to 4 supported');
}

