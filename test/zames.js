'use strict';

const test = require('tape');
const zames = require('..');

test('zames: arguments: no', (t) => {
    t.throws(zames, /fn should be a function!/, 'should throw when no fn');
    t.end();
});

test('zames: arguments: fn: count', (t) => {
    /*eslint no-unused-vars: 0 */
    const fn = () => zames((a, b, c, d, e, f, g, h, i) =>{});
    
    t.throws(fn, /fn takes to much arguments, up to 8 supported/, 'should throw when to much arguments');
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

test('zames: promisify + currify: 4 arguments: resolves', (t) => {
    const promise = zames((a, b, c, d, fn) => {
        fn(null, `${a} ${b} ${c}${d}`);
    });
    
    promise('hello', 'amazing', 'world', '!')
        .then((a) => {
            t.equal(a, 'hello amazing world!', 'should resolve');
            t.end();
        });
});

test('zames: promisify + currify: 4 arguments: rejects', (t) => {
    const promise = zames((a, b, c, d, fn) => {
        fn(Error(a));
    });
    
    promise('hello', 'amazing', 'world', '!')
        .catch((e) => {
            t.equal(e.message, 'hello', 'should reject');
            t.end();
        });
});

test('zames: promisify + currify: 5 arguments: resolves', (t) => {
    const promise = zames((a, b, c, d, e, fn) => {
        fn(null, a + b + c + d + e);
    });
    
    promise(1, 2, 3, 4, 5)
        .then((a) => {
            t.equal(a, 15, 'should resolve');
            t.end();
        });
});

test('zames: promisify + currify: 5 arguments: rejects', (t) => {
    const msg = 'error'
    const promise = zames((a, b, c, d, e, fn) => {
        fn(Error(msg));
    });
    
    promise(1, 2, 3, 4, 5)
        .catch((e) => {
            t.equal(e.message, msg, 'should reject');
            t.end();
        });
});

test('zames: promisify + currify: 6 arguments: resolves', (t) => {
    const promise = zames((a, b, c, d, e, f, fn) => {
        fn(null, a + b + c + d + e + f);
    });
    
    promise(1, 2, 3, 4, 5, 6)
        .then((a) => {
            t.equal(a, 21, 'should resolve');
            t.end();
        });
});

test('zames: promisify + currify: 6 arguments: rejects', (t) => {
    const msg = 'error'
    const promise = zames((a, b, c, d, e, f, fn) => {
        fn(Error(msg));
    });
    
    promise(1, 2, 3, 4, 5, 6)
        .catch((e) => {
            t.equal(e.message, msg, 'should reject');
            t.end();
        });
});

test('zames: promisify + currify: 7 arguments: resolves', (t) => {
    const promise = zames((a, b, c, d, e, f, g, fn) => {
        fn(null, a + b + c + d + e + f + g);
    });
    
    promise(1, 2, 3, 4, 5, 6, 7)
        .then((a) => {
            t.equal(a, 28, 'should resolve');
            t.end();
        });
});

test('zames: promisify + currify: 7 arguments: rejects', (t) => {
    const msg = 'error'
    const promise = zames((a, b, c, d, e, f, g, fn) => {
        fn(Error(msg));
    });
    
    promise(1, 2, 3, 4, 5, 6, 7)
        .catch((e) => {
            t.equal(e.message, msg, 'should reject');
            t.end();
        });
});

test('zames: arguments: context', (t) => {
    const ctx = {
        name: 'error',
        log: function(a, b, fn) {
            fn(Error(this.name));
        }
    };
    
    const promise = zames(ctx.log, ctx);
    
    promise('hello', 'world', '!')
        .catch((e) => {
            t.equal(e.message, 'error', 'should reject using context');
            t.end();
        });
});

