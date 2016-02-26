/**
 * LinQ.ts
 *
 * TODO:
 * - Copy comments from LinQ .NET specification
 * - Copy implementations from _ (lodash)
 *
 * Created by Flavio Corpa (kutyel)
 * Copyright © 2016 Flavio Corpa. All rights reserved.
 *
 */
module LinQ {

    /**
     * List<T>
     */
    export class List<T> {

        private _elements: T[];

        /**
         * Defaults the elements of the list
         */
        constructor(elements: T[] = []) {
            this._elements = elements;
        }

        /**
         * Adds an element to the generic list
         * @param {T} element Element to be added
         */
        public Add(element: T) {
            this._elements.push(element);
        }

        /**
         * Adds a list of elements to the generic list
         * @param {T[]} elements List of elements to be added
         */
        public AddRange(elements: T[]) {
            this._elements.push(...elements);
        }

        /**
         * Returns length of the generic list
         * @return {number} Length of the generic list
         */
        public Length(): number {
            return this._elements.length;
        }

        /**
         * Fist
         * @return {T} First element of the generic list
         */
        public Fist(): T {
            return this._elements[0];
        }

        /**
         * Last
         * @return {T} Last element of the generic list
         */
        public Last(): T {
            return this._elements[this._elements.length - 1];
        }

        /**
         * IndexOf
         * @param {T} element The element to locate in the list
         * @param {number} fromIndex The list index at which to begin the search
         */
        public IndexOf(element: T, fromIndex?: number): number {
            return this._elements.indexOf(element, fromIndex);
        }

        /**
         * Contains
         * @param {T} element Element to locate in the list
         * @return {boolean} Whether the element is contained in the list or not
         */
        public Contains(element: T): boolean {
            // return this._elements.includes(element); // TODO: uncomment this when includes() makes it to TypeScript
            return this._elements.indexOf(element) > -1;
        }

        /**
         * Select
         * @param {Function} cb Callback function or lambda
         * @return {T[]} Transformed list of elements
         */
        public Select(cb: (value: T, index: number, list: T[]) => T): T[] {
            return this._elements.map(cb);
        }

        /**
         * Where
         * @param {Function} cb Callback function or lambda
         * @return {T[]} Filtered list of elements
         */
        public Where(cb: (value: T, index: number, list: T[]) => boolean): T[] {
            return this._elements.filter(cb);
        }
    }
}
