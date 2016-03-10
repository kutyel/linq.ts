import test from "ava";
import {List} from "../linq";

interface IPerson {
    Name: string;
    Age: number;
}

/**
 * AVA tests
 */

test("Add", t => {
    t.is(new List<string>().Add("hey").First(), "hey");
});

test("Add range", t => {
    t.is(new List<string>(["hey"]).AddRange(["hola", "que", "tal"]).ToArray().toString(), "hey,hola,que,tal");
});

test("Aggregate", t => {
    let sentence: string = "the quick brown fox jumps over the lazy dog";
    let reversed: string = "dog lazy the over jumps fox brown quick the ";
    let words: List<string> = new List<string>(sentence.split(" "));
    t.is(words.Aggregate((workingSentence, next) => next + " " + workingSentence, ""), reversed);
});

test("All", t => {
    t.true(new List<string>(["hey", "hola", "que", "tal"]).All(x => typeof x === "string"));
});

test("Any", t => {
    t.true(new List<string>(["hey", "hola", "que", "tal"]).Any(x => x === "hola"));
});

test("Average", t => {
    let people: List<IPerson> = new List<IPerson>([
        {Age: 15, Name: "Cathy"},
        {Age: 25, Name: "Alice"},
        {Age: 50, Name: "Bob"}
    ]);
    t.is(new List<number>([2, 3, 5, 10]).Average(x => x), 5);
    t.is(people.Average(x => x.Age), 30);
});

test("Concat", t => {
    let a: List<string> = new List<string>(["hey", "hola", "que", "tal"]);
    let b: List<string> = new List<string>(["como", "estas", "?"]);
    t.is(a.Concat(b).ToArray().toString(), "hey,hola,que,tal,como,estas,?");
});

test("Contains", t => {
    t.true(new List<string>(["hey", "hola", "que", "tal"]).Contains("hola"));
});

test("Count", t => {
    t.is(new List<string>(["hey", "hola", "que", "tal"]).Count(), 4);
});

// test("DefaultIfEmpty", t => {
//     t.fail();
// });

test("Distinct", t => {
    let ages: List<number> = new List<number>([21, 46, 46, 55, 17, 21, 55, 55]);
    t.is(ages.Distinct().ToArray().toString(), "21,46,55,17");
});

test("ElementAt", t => {
    let a: List<string> = new List<string>(["hey", "hola", "que", "tal"]);
    t.is(a.ElementAt(0), "hey");
    t.notOk(a.ElementAt(4));
});

test("ElementAtOrDefault", t => {
    let a: List<string> = new List<string>(["hey", "hola", "que", "tal"]);
    t.is(a.ElementAtOrDefault(0), "hey");
    t.is(a.ElementAtOrDefault(4), undefined);
});

test("Except", t => {
    let numbers1: List<number> = new List<number>([2.0, 2.1, 2.2, 2.3, 2.4, 2.5]);
    let numbers2: List<number> = new List<number>([2.2, 2.3]);
    t.is(numbers1.Except(numbers2).ToArray().toString(), "2,2.1,2.4,2.5");
});

test("First", t => {
    t.is(new List<string>(["hey", "hola", "que", "tal"]).First(), "hey");
    t.is(new List<number>([1, 2, 3, 4, 5]).First(x => x > 2), 3);
    t.notOk(new List<string>().First());
});

test("FirstOrDefault", t => {
    t.is(new List<string>(["hey", "hola", "que", "tal"]).FirstOrDefault(), "hey");
    t.is(new List<string>().FirstOrDefault(), undefined);
});

test("ForEach", t => {
    let names: List<string> = new List<string>(["Bruce", "Alfred", "Tim", "Richard"]);
    let test: string = "";
    names.ForEach((x, i) => test += `${x} ${i} `);
    t.is(test, "Bruce 0 Alfred 1 Tim 2 Richard 3 ");
});

// test("GroupBy", t => {
//     t.fail();
// });

// test("GrouptoString() t => {
//     t.fail();
// });

test("Intersect", t => {
    let id1: List<number> = new List<number>([44, 26, 92, 30, 71, 38]);
    let id2: List<number> = new List<number>([39, 59, 83, 47, 26, 4, 30]);
    t.is(id1.Intersect(id2).Sum(x => x), 56);
});

// test("toString() t => {
//     t.fail();
// });

test("Last", t => {
    t.is(new List<string>(["hey", "hola", "que", "tal"]).Last(), "tal");
    t.is(new List<number>([1, 2, 3, 4, 5]).Last(x => x > 2), 5);
    t.notOk(new List<string>().Last());
});

test("LastOrDefault", t => {
    t.is(new List<string>(["hey", "hola", "que", "tal"]).LastOrDefault(), "tal");
    t.is(new List<string>().LastOrDefault(), undefined);
});

test("Max", t => {
    t.is(new List<number>([1, 2, 3, 4, 5]).Max(), 5);
});

test("Min", t => {
    t.is(new List<number>([1, 2, 3, 4, 5]).Min(), 1);
});

test("OrderBy", t => {
    t.is(new List<number>([4, 5, 6, 3, 2, 1]).OrderBy().ToArray().toString(), "1,2,3,4,5,6");
});

test("OrderByDescending", t => {
    t.is(new List<number>([4, 5, 6, 3, 2, 1]).OrderByDescending().ToArray().toString(), "6,5,4,3,2,1");
});

// test("ThenBy", t => {
//     t.fail();
// });

// test("ThenByDescending", t => {
//     t.fail();
// });

test("Reverse", t => {
    t.is(new List<number>([1, 2, 3, 4, 5]).Reverse().ToArray().toString(), "5,4,3,2,1");
});

test("Select", t => {
    t.is(new List<number>([1, 2, 3]).Select(x => x * 2).ToArray().toString(), "2,4,6");
});

// test("SelectMany", t => {
//     t.fail();
// });

test("SequenceEqual", t => {

    class Pet {
        constructor(public Name: string, public Age: number) {}
    }

    let pet1: Pet = new Pet("Turbo", 2);
    let pet2: Pet = new Pet("Peanut", 8);

    // create two lists of pets.
    let pets1: List<Pet> = new List<Pet>([pet1, pet2]);
    let pets2: List<Pet> = new List<Pet>([pet1, pet2]);
    let pets3: List<Pet> = new List<Pet>([pet1]);

    t.true(pets1.SequenceEqual(pets2));
    t.false(pets1.SequenceEqual(pets3));
});

// test("Single", t => {
//     t.fail();
// });

// test("SingleOrDefault", t => {
//     t.fail();
// });

// test("Skip", t => {
//     t.fail();
// });

// test("SkipWhile", t => {
//     t.fail();
// });

test("Sum", t => {
    let people: List<IPerson> = new List<IPerson>([
        {Age: 15, Name: "Cathy"},
        {Age: 25, Name: "Alice"},
        {Age: 50, Name: "Bob"}
    ]);
    t.is(new List<number>([2, 3, 5]).Sum(x => x), 10);
    t.is(people.Sum(x => x.Age), 90);
});

// test("Take", t => {
//     t.fail();
// });

// test("TakeWhile", t => {
//     t.fail();
// });

test("ToArray", t => {
    t.is(new List<number>([1, 2, 3, 4, 5]).ToArray().toString(), "1,2,3,4,5");
});

test("ToDictionary", t => {
    let people: List<IPerson> = new List<IPerson>([
        {Age: 15, Name: "Cathy"},
        {Age: 25, Name: "Alice"},
        {Age: 50, Name: "Bob"}
    ]);
    let dictionary: any = people.ToDictionary(x => x.Name);
    t.same(dictionary["undefined"], { Age: 50, Name: "Bob" });
});

// test("ToList", t => {
//     t.fail();
// });

// test("Union", t => {
//     t.fail();
// });

test("Where", t => {
    t.is(new List<string>(["hey", "hola", "que", "tal"]).Where(x => x.length > 3).Select(x => x + "a").First(), "holaa");
});

// test("Zip", t => {
//     t.fail();
// });

test("Chain", t => {
    t.is(new List<number>([1, 2, 3, 4, 5]).Where(x => x > 3).Select(y => y * 2).ToArray().toString(), "8,10");
    t.is(new List<number>([1, 2, 3, 4, 5]).Where(x => x > 3).Select(y => y + "a").ToArray().toString(), "4a,5a");
});
