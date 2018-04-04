const test = require('ava');
const db = require('../');

test('Require brings it in as an initialized class', t =>
    t.is(typeof db, 'object'));
test('Has a method called open', t => t.is(typeof db.open, 'function'));
test('Has a method called close', t => t.is(typeof db.close, 'function'));
test('Has a method called getSchemas', t =>
    t.is(typeof db.getSchemas, 'function'));
