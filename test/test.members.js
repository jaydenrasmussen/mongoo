const test = require('ava');
const db = require('../');

test('Has member user', t => t.true(db.hasOwnProperty('user')));
test('Has member pass', t => t.true(db.hasOwnProperty('pass')));
test('Has member replicaSet', t => t.true(db.hasOwnProperty('replicaSet')));
test('Has member database', t => t.true(db.hasOwnProperty('database')));
test('Has member host', t => t.true(db.hasOwnProperty('host')));
test('Has member status', t => t.true(db.hasOwnProperty('status')));
