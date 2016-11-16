'use strict';

const test = require('tape');
const zames = require('..');

test('zames: arguments: no', (t) => {
    t.throws(zames, /fn should be a function!/, 'should throw when no fn');
    t.end();
});

test('zames: arguments: fn: count', (t) => {
    /*eslint no-unused-vars: 0 */
    const fn = () => zames((a, b, c, d, e) =>{});
    
    t.throws(fn, /fn takes to much arguments, up to 4 supported/, 'should throw when to much arguments');
    t.end();
});

test('zames: promisify + currify: 1 arguments: resolves', (t) => {
    const promise = zames((a, fn) => {
        fn(null, `${a}`);
    });
    
    promise('hello')
        .then((a) => {
            t.equal(a, 'hello', 'should resolve');
            t.end();
        });
});

test('zames: promisify + currify: 1 arguments: rejects', (t) => {
    const promise = zames((a, fn) => {
        fn(Error(a));
    });
    
    promise('hello')
        .catch((e) => {
            t.equal(e.message, 'hello', 'should reject');
            t.end();
        });
});

test('zames: promisify + currify: 2 arguments: resolves', (t) => {
    const promise = zames((a, b, fn) => {
        fn(null, `${a} ${b}`);
    });
    
    promise('hello', 'world')
        .then((a) => {
            t.equal(a, 'hello world', 'should resolve');
            t.end();
        });
});

test('zames: promisify + currify: 2 arguments: rejects', (t) => {
    const promise = zames((a, b, fn) => {
        fn(Error(a));
    });
    
    promise('hello', 'world')
        .catch((e) => {
            t.equal(e.message, 'hello', 'should reject');
            t.end();
        });
});

test('zames: promisify + currify: 3 arguments: resolves', (t) => {
    const promise = zames((a, b, c, fn) => {
        fn(null, `${a} ${b}${c}`);
    });
    
    promise('hello', 'world', '!')
        .then((a) => {
            t.equal(a, 'hello world!', 'should resolve');
            t.end();
        });
});

test('zames: promisify + currify: 3 arguments: rejects', (t) => {
    const promise = zames((a, b, c, fn) => {
        fn(Error(a));
    });
    
    promise('hello', 'world', '!')
        .catch((e) => {
            t.equal(e.message, 'hello', 'should reject');
            t.end();
        });
});

