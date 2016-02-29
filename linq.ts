import * as Immutable from 'immutable';

/**
 * LinQ.ts
 *
 * Documentation from LinQ .NET specification (https://msdn.microsoft.com/en-us/library/s6hkc2c4(v=vs.110).aspx)
 * 
 * TODO: Unit tests with AVA
 *
 * Created by Flavio Corpa (kutyel)
 * Copyright © 2016 Flavio Corpa. All rights reserved.
 *
 */
export class List<T> {

    private _elements: Immutable.List<T>;

    /**
     * Defaults the elements of the list
     */
    constructor(elements: Immutable.List<T> = Immutable.List<T>()) {
        this._elements = elements;
    }
        
    /**
     * Adds an object to the end of the List<T>.
     */
    public Add(element: T): Immutable.List<T> {
        return this._elements.push(element);
    }

    /**
     * Adds the elements of the specified collection to the end of the List<T>.
     */
    public AddRange(elements: T[]): Immutable.List<T> {
        return this._elements.push(...elements);
    }

    // TODO: Aggregate
     
    // TODO: All
    
    // TODO: Any
     
    // TODO: Average
    
    // TODO: Concat
    
    /**
     * Determines whether an element is in the List<T>.
     */
    public Contains(element: T): boolean {
        return this._elements.includes(element);
    }
    
    /**
     * Returns the number of elements in a sequence.
     */
    public Count(predicate: (value?: T, index?: number, iter?: Immutable.Iterable<number, T>) => boolean): number {
        return this._elements.count(predicate);
    }
     
    // TODO: DefaultIfEmpty
    
    // TODO: Distinct
     
    /**
     * Returns the element at a specified index in a sequence.
     */
    public ElementAt(index: number): T {
        return this._elements[index];
    }
    
    // TODO: ElementAtOrDefault
     
    // TODO: Except
    
    /**
     * Returns the first element of a sequence.
     */
    public First(): T {
        return this._elements.first();
    }
     
    // TODO: FirstOrDefault
    
    // TODO: ForEach
    
    // TODO: GroupBy
    
    // TODO: GroupJoin
    
    // TODO: Intersect
    
    // TODO: Join
    
    /**
     * Returns the last element of a sequence.
     */
    public Last(): T {
        return this._elements.last();
    }
    
    // TODO: LastOrDefault
    
    // TODO: Max
    
    // TODO: Min
    
    // TODO: OrderBy
    
    // TODO: OrderByDescending
    
    // TODO: ThenBy
    
    // TODO: ThenByDescending
    
    // TODO: Range
    
    // TODO: Repeat
    
    // TODO: Reverse
    
    /**
     * Projects each element of a sequence into a new form.
     */
    public Select(mapper: (value?: T, index?: number, iter?: Immutable.Iterable<number, T>) => T): Immutable.Iterable<number, T> {
        return this._elements.map(mapper);
    }
    
    // TODO: SelectMany
    
    // TODO: SequenceEqual
    
    // TODO: Single
    
    // TODO: SingleOrDefault
    
    // TODO: Skip
    
    // TODO: SkipWhile
    
    // TODO: Sum
    
    // TODO: Take
    
    // TODO: TakeWhile
    
    /**
     * ToArray
     */
    public ToArray(): T[] {
        return this._elements.toArray();
    }
    
    // TODO: ToDictionary
    
    /**
     * ToList
     */
    public ToList(): Immutable.List<T> {
        return this._elements.toList();
    }
    
    /**
     * ToMap
     */
    public ToMap(): Immutable.Map<number, T> {
        return this._elements.toMap();
    }
    
    // TODO: Union
    
    /**
     * Filters a sequence of values based on a predicate.
     */
    public Where(predicate: (value?: T, index?: number, iter?: Immutable.Iterable<number, T>) => boolean): Immutable.Iterable<number, T> {
        return this._elements.filter(predicate);
    }
    
    /**
     * Zip
     */
    public Zip(iterables: Immutable.Iterable<T, T>[]): Immutable.Iterable.Indexed<T> {
        return this._elements.zip(...iterables);
    }
}
