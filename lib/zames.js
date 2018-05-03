'use strict';

const promisify = require('es6-promisify').promisify;
const currify = require('currify/legacy');

module.exports = (fn, ctx) => {
    check(fn);
    checkCount(fn.length);
    
    const f = fn.bind(ctx);
    
    const funcs = [
        (a) => promisify(f, ctx)(a),
        (a, b) => promisify(f, ctx)(a, b),
        (a, b, c) => promisify(f, ctx)(a, b, c),
        (a, b, c, d) => promisify(f, ctx)(a, b, c, d),
        (a, b, c, d, e) => promisify(f, ctx)(a, b, c, d, e),
        (a, b, c, d, e, x) => promisify(f, ctx)(a, b, c, d, e, x),
        (a, b, c, d, e, x, g) => promisify(f, ctx)(a, b, c, d, e, x, g),
    ];
    
    const count = f.length - 2;
    return currify(funcs[count]);
};

function check(fn) {
    if (typeof fn !== 'function')
        throw Error('fn should be a function!');
}

function checkCount(count) {
    if (count > 8)
        throw Error('fn takes to much arguments, up to 8 supported');
}

