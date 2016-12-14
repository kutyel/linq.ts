var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (dependencies, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(dependencies, factory);
    }
})(["require", "exports"], function (require, exports) {
    "use strict";
    /**
     * LinQ to TypeScript
     *
     * Documentation from LinQ .NET specification (https://msdn.microsoft.com/en-us/library/system.linq.enumerable.aspx)
     *
     * Created by Flavio Corpa (@kutyel)
     * Copyright © 2016 Flavio Corpa. All rights reserved.
     *
     */
    var List = (function () {
        /**
         * Defaults the elements of the list
         */
        function List(elements) {
            if (elements === void 0) { elements = []; }
            this._elements = elements;
        }
        /**
         * Adds an object to the end of the List<T>.
         */
        List.prototype.Add = function (element) {
            this._elements.push(element);
        };
        /**
         * Adds the elements of the specified collection to the end of the List<T>.
         */
        List.prototype.AddRange = function (elements) {
            (_a = this._elements).push.apply(_a, elements);
            var _a;
        };
        /**
         * Applies an accumulator function over a sequence.
         */
        List.prototype.Aggregate = function (accumulator, initialValue) {
            return this._elements.reduce(accumulator, initialValue);
        };
        /**
         * Determines whether all elements of a sequence satisfy a condition.
         */
        List.prototype.All = function (predicate) {
            return this._elements.every(predicate);
        };
        /**
         * Determines whether a sequence contains any elements.
         */
        List.prototype.Any = function (predicate) {
            return this._elements.some(predicate);
        };
        List.prototype.Average = function (transform) {
            return this.Sum(transform) / this.Count(transform);
        };
        /**
         * Concatenates two sequences.
         */
        List.prototype.Concat = function (list) {
            return new List(this._elements.concat(list.ToArray()));
        };
        /**
         * Determines whether an element is in the List<T>.
         */
        List.prototype.Contains = function (element) {
            return this._elements.some(function (x) { return x === element; });
        };
        List.prototype.Count = function (predicate) {
            return predicate ? this.Where(predicate).Count() : this._elements.length;
        };
        /**
         * Returns the elements of the specified sequence or the type parameter's default value
         * in a singleton collection if the sequence is empty.
         */
        List.prototype.DefaultIfEmpty = function (defaultValue) {
            return this.Count() ? this : new List([defaultValue]);
        };
        /**
         * Returns distinct elements from a sequence by using the default equality comparer to compare values.
         */
        List.prototype.Distinct = function () {
            return this.Where(function (value, index, iter) { return iter.indexOf(value) === index; });
        };
        /**
         * Returns the element at a specified index in a sequence.
         */
        List.prototype.ElementAt = function (index) {
            if (index < this.Count()) {
                return this._elements[index];
            }
            else {
                var MSG = 'ArgumentOutOfRangeException: index is less than 0 or greater than or equal to the number of elements in source.';
                throw new Error(MSG);
            }
        };
        /**
         * Returns the element at a specified index in a sequence or a default value if the index is out of range.
         */
        List.prototype.ElementAtOrDefault = function (index) {
            return this.ElementAt(index) || undefined;
        };
        /**
         * Produces the set difference of two sequences by using the default equality comparer to compare values.
         */
        List.prototype.Except = function (source) {
            return this.Where(function (x) { return !source.Contains(x); });
        };
        List.prototype.First = function (predicate) {
            if (this.Count()) {
                return predicate ? this.Where(predicate).First() : this._elements[0];
            }
            else {
                throw new Error('InvalidOperationException: The source sequence is empty.');
            }
        };
        List.prototype.FirstOrDefault = function (predicate) {
            return this.Count() ? this.First(predicate) : undefined;
        };
        /**
         * Performs the specified action on each element of the List<T>.
         */
        List.prototype.ForEach = function (action) {
            return this._elements.forEach(action);
        };
        /**
         * Groups the elements of a sequence according to a specified key selector function.
         */
        List.prototype.GroupBy = function (grouper, mapper) {
            return this.Aggregate(function (ac, v) { return (ac[grouper(v)] ? ac[grouper(v)].push(mapper(v)) : ac[grouper(v)] = [mapper(v)], ac); }, {});
        };
        /**
         * Correlates the elements of two sequences based on equality of keys and groups the results.
         * The default equality comparer is used to compare keys.
         */
        List.prototype.GroupJoin = function (list, key1, key2, result) {
            return this.Select(function (x, y) { return result(x, list.Where(function (z) { return key1(x) === key2(z); })); });
        };
        /**
         * Returns the index of the first occurence of an element in the List.
         */
        List.prototype.IndexOf = function (element) {
            return this._elements.indexOf(element);
        };
        /**
         * Inserts an element into the List<T> at the specified index.
         */
        List.prototype.Insert = function (index, element) {
            if (index < 0 || index > this._elements.length) {
                throw new Error('Index is out of range.');
            }
            this._elements.splice(index, 0, element);
        };
        /**
         * Produces the set intersection of two sequences by using the default equality comparer to compare values.
         */
        List.prototype.Intersect = function (source) {
            return this.Where(function (x) { return source.Contains(x); });
        };
        /**
         * Correlates the elements of two sequences based on matching keys. The default equality comparer is used to compare keys.
         */
        List.prototype.Join = function (list, key1, key2, result) {
            return this.SelectMany(function (x) { return list.Where(function (y) { return key2(y) === key1(x); }).Select(function (z) { return result(x, z); }); });
        };
        List.prototype.Last = function (predicate) {
            if (this.Count()) {
                return predicate ? this.Where(predicate).Last() : this._elements[this.Count() - 1];
            }
            else {
                throw Error('InvalidOperationException: The source sequence is empty.');
            }
        };
        List.prototype.LastOrDefault = function (predicate) {
            return this.Count() ? this.Last(predicate) : undefined;
        };
        /**
         * Returns the maximum value in a generic sequence.
         */
        List.prototype.Max = function () {
            return this.Aggregate(function (x, y) { return x > y ? x : y; });
        };
        /**
         * Returns the minimum value in a generic sequence.
         */
        List.prototype.Min = function () {
            return this.Aggregate(function (x, y) { return x < y ? x : y; });
        };
        /**
         * Sorts the elements of a sequence in ascending order according to a key.
         */
        List.prototype.OrderBy = function (keySelector) {
            return new OrderedList(this._elements, ComparerHelper.ComparerForKey(keySelector, false));
        };
        /**
         * Sorts the elements of a sequence in descending order according to a key.
         */
        List.prototype.OrderByDescending = function (keySelector) {
            return new OrderedList(this._elements, ComparerHelper.ComparerForKey(keySelector, true));
        };
        /**
         * Performs a subsequent ordering of the elements in a sequence in ascending order according to a key.
         */
        List.prototype.ThenBy = function (keySelector) {
            return this.OrderBy(keySelector);
        };
        /**
         * Performs a subsequent ordering of the elements in a sequence in descending order, according to a key.
         */
        List.prototype.ThenByDescending = function (keySelector) {
            return this.OrderByDescending(keySelector);
        };
        /**
         * Removes the first occurrence of a specific object from the List<T>.
         */
        List.prototype.Remove = function (element) {
            return this.IndexOf(element) !== -1 ? (this.RemoveAt(this.IndexOf(element)), true) : false;
        };
        /**
         * Removes all the elements that match the conditions defined by the specified predicate.
         */
        List.prototype.RemoveAll = function (predicate) {
            return this.Where(this._negate(predicate));
        };
        /**
         * Removes the element at the specified index of the List<T>.
         */
        List.prototype.RemoveAt = function (index) {
            this._elements.splice(index, 1);
        };
        /**
         * Reverses the order of the elements in the entire List<T>.
         */
        List.prototype.Reverse = function () {
            return new List(this._elements.reverse());
        };
        /**
         * Projects each element of a sequence into a new form.
         */
        List.prototype.Select = function (mapper) {
            return new List(this._elements.map(mapper));
        };
        /**
         * Projects each element of a sequence to a List<any> and flattens the resulting sequences into one sequence.
         */
        List.prototype.SelectMany = function (mapper) {
            var _this = this;
            return this.Aggregate(function (ac, v, i) { return (ac.AddRange(_this.Select(mapper).ElementAt(i).ToArray()), ac); }, new List());
        };
        /**
         * Determines whether two sequences are equal by comparing the elements by using the default equality comparer for their type.
         */
        List.prototype.SequenceEqual = function (list) {
            return !!this._elements.reduce(function (x, y, z) { return list._elements[z] === y ? x : undefined; });
        };
        /**
         * Returns the only element of a sequence, and throws an exception if there is not exactly one element in the sequence.
         */
        List.prototype.Single = function () {
            if (this.Count() !== 1) {
                throw new Error('The collection does not contain exactly one element.');
            }
            else {
                return this.First();
            }
        };
        /**
         * Returns the only element of a sequence, or a default value if the sequence is empty;
         * this method throws an exception if there is more than one element in the sequence.
         */
        List.prototype.SingleOrDefault = function () {
            return this.Count() ? this.Single() : undefined;
        };
        /**
         * Bypasses a specified number of elements in a sequence and then returns the remaining elements.
         */
        List.prototype.Skip = function (amount) {
            return new List(this._elements.slice(Math.max(0, amount)));
        };
        /**
         * Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
         */
        List.prototype.SkipWhile = function (predicate) {
            var _this = this;
            return this.Skip(this.Aggregate(function (ac, val) { return predicate(_this.ElementAt(ac)) ? ++ac : ac; }, 0));
        };
        List.prototype.Sum = function (transform) {
            return transform ? this.Select(transform).Sum() : this.Aggregate(function (ac, v) { return ac += (+v); }, 0);
        };
        /**
         * Returns a specified number of contiguous elements from the start of a sequence.
         */
        List.prototype.Take = function (amount) {
            return new List(this._elements.slice(0, Math.max(0, amount)));
        };
        /**
         * Returns elements from a sequence as long as a specified condition is true.
         */
        List.prototype.TakeWhile = function (predicate) {
            var _this = this;
            return this.Take(this.Aggregate(function (ac, val) { return predicate(_this.ElementAt(ac)) ? ++ac : ac; }, 0));
        };
        /**
         * Copies the elements of the List<T> to a new array.
         */
        List.prototype.ToArray = function () {
            return this._elements;
        };
        /**
         * Creates a Dictionary<TKey, TValue> from a List<T> according to a specified key selector function.
         */
        List.prototype.ToDictionary = function (key, value) {
            var _this = this;
            return this.Aggregate(function (o, v, i) { return (o[_this.Select(key).ElementAt(i)] = value ? _this.Select(value).ElementAt(i) : v, o); }, {});
        };
        /**
         * Creates a List<T> from an Enumerable.List<T>.
         */
        List.prototype.ToList = function () {
            return this;
        };
        /**
         * Creates a Lookup<TKey, TElement> from an IEnumerable<T> according to specified key selector and element selector functions.
         */
        List.prototype.ToLookup = function (keySelector, elementSelector) {
            return this.GroupBy(keySelector, elementSelector);
        };
        /**
         * Produces the set union of two sequences by using the default equality comparer.
         */
        List.prototype.Union = function (list) {
            return this.Concat(list).Distinct();
        };
        /**
         * Filters a sequence of values based on a predicate.
         */
        List.prototype.Where = function (predicate) {
            return new List(this._elements.filter(predicate));
        };
        /**
         * Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results.
         */
        List.prototype.Zip = function (list, result) {
            var _this = this;
            return list.Count() < this.Count() ? list.Select(function (x, y) { return result(_this.ElementAt(y), x); }) :
                this.Select(function (x, y) { return result(x, list.ElementAt(y)); });
        };
        /**
         * Creates a function that negates the result of the predicate
         */
        List.prototype._negate = function (predicate) {
            return function () {
                return !predicate.apply(this, arguments);
            };
        };
        return List;
    }());
    exports.List = List;
    var ComparerHelper = (function () {
        function ComparerHelper() {
        }
        ComparerHelper.ComparerForKey = function (_keySelector, descending) {
            return function (a, b) {
                return ComparerHelper.Compare(a, b, _keySelector, descending);
            };
        };
        ComparerHelper.Compare = function (a, b, _keySelector, descending) {
            var sortKeyA = _keySelector(a);
            var sortKeyB = _keySelector(b);
            if (sortKeyA > sortKeyB) {
                if (!descending) {
                    return 1;
                }
                else {
                    return -1;
                }
            }
            else if (sortKeyA < sortKeyB) {
                if (!descending) {
                    return -1;
                }
                else {
                    return 1;
                }
            }
            else {
                return 0;
            }
        };
        ComparerHelper.ComposeComparers = function (previousComparer, currentComparer) {
            return function (a, b) {
                var resultOfPreviousComparer = previousComparer(a, b);
                if (!resultOfPreviousComparer) {
                    return currentComparer(a, b);
                }
                else {
                    return resultOfPreviousComparer;
                }
            };
        };
        return ComparerHelper;
    }());
    /**
     * Represents a sorted sequence. The methods of this class are implemented by using deferred execution.
     * The immediate return value is an object that stores all the information that is required to perform the action.
     * The query represented by this method is not executed until the object is enumerated either by
     * calling its ToDictionary, ToLookup, ToList or ToArray methods
     */
    var OrderedList = (function (_super) {
        __extends(OrderedList, _super);
        function OrderedList(elements, _comparer) {
            var _this = _super.call(this, elements) || this;
            _this._comparer = _comparer;
            _this._elements.sort(_this._comparer);
            return _this;
        }
        /**
         * Performs a subsequent ordering of the elements in a sequence in ascending order according to a key.
         * @override
         */
        OrderedList.prototype.ThenBy = function (keySelector) {
            return new OrderedList(this._elements, ComparerHelper.ComposeComparers(this._comparer, ComparerHelper.ComparerForKey(keySelector, false)));
        };
        /**
         * Performs a subsequent ordering of the elements in a sequence in descending order, according to a key.
         * @override
         */
        OrderedList.prototype.ThenByDescending = function (keySelector) {
            return new OrderedList(this._elements, ComparerHelper.ComposeComparers(this._comparer, ComparerHelper.ComparerForKey(keySelector, true)));
        };
        return OrderedList;
    }(List));
    var Enumerable = (function () {
        function Enumerable() {
        }
        /**
         * Generates a sequence of integral numbers within a specified range.
         */
        Enumerable.Range = function (start, count) {
            var result = new List();
            while (count--) {
                result.Add(start++);
            }
            return result;
        };
        /**
         * Generates a sequence that contains one repeated value.
         */
        Enumerable.Repeat = function (element, count) {
            var result = new List();
            while (count--) {
                result.Add(element);
            }
            return result;
        };
        return Enumerable;
    }());
    exports.Enumerable = Enumerable;
});
