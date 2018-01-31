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
    ];
    
    const count = f.length - 2;
    return currify(funcs[count]);
};

function check(fn) {
    if (typeof fn !== 'function')
        throw Error('fn should be a function!');
}

function checkCount(count) {
    if (count > 4)
        throw Error('fn takes to much arguments, up to 4 supported');
}

