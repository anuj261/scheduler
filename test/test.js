var assert = require('assert');
var scheduler = require('../index.js');
describe('Array', function () {
    describe('Dependent task scheduling()', function () {
        it('should return empty object when no task', function () {
            assert.equal(scheduler.screeningTask([], []).length, 0);
        });

        it('should return same object when no dependency', function () {
            assert.deepEqual(scheduler.screeningTask(["a", "b"], []), ["a", "b"]);
        });

        it('should return task according to dependency testing with one dependency', function () {
            assert.deepEqual(scheduler.screeningTask(["a", "b"], ["a=>b"]),["b", "a"]);
        });

        it('should return task according to dependency testing with two different task with dependency', function () {
            assert.deepEqual(scheduler.screeningTask(["a", "b", "c", "d"], ["a=>b", "c=>d"]),[ 'b', 'a', 'd', 'c' ]);
        });

        it('should return task according to dependency testing with one task with two dependency', function () {
            assert.deepEqual(scheduler.screeningTask(["a", "b", "c"], ["a=>b", "b=>c"]),[ 'c', 'b', 'a' ]);
        });

        it('should return task according to dependency testing cyclic dependency', function () {
            assert.equal(scheduler.screeningTask(["a", "b", "c", "d"], ["a=>b", "b=>c", "c=>a"]),"Error: this is a cyclic dependency");
        });
    });
});