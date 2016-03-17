import test from "ava";
import { List } from "../linq";

/**
 * Tests taken from LinQ .NET examples (https://msdn.microsoft.com/en-us/library/s6hkc2c4(v=vs.110).aspx)
 */

interface IPerson {
    Name: string;
    Age: number;
}

test("Add", t => {
    let list = new List<string>();
    list.Add("hey");
    t.is(list.First(), "hey");
});

test("AddRange", t => {
    let list = new List<string>();
    list.AddRange(["hola", "que", "tal"]);
    t.is(list.ToArray().toString(), "hola,que,tal");
});

test("Aggregate", t => {
    let sentence = "the quick brown fox jumps over the lazy dog";
    let reversed = "dog lazy the over jumps fox brown quick the ";
    let words = new List<string>(sentence.split(" "));
    t.is(words.Aggregate((workingSentence, next) => next + " " + workingSentence, ""), reversed);
});

test("All", t => {
    t.true(new List<string>(["hey", "hola", "que", "tal"]).All(x => typeof x === "string"));
});

test("Any", t => {
    t.true(new List<string>(["hey", "hola", "que", "tal"]).Any(x => x === "hola"));
});

test("Average", t => {
    let people = new List<IPerson>([
        { Age: 15, Name: "Cathy" },
        { Age: 25, Name: "Alice" },
        { Age: 50, Name: "Bob" }
    ]);
    t.is(new List<number>([2, 3, 5, 10]).Average(x => x), 5);
    t.is(people.Average(x => x.Age), 30);
});

test("Concat", t => {
    let a = new List<string>(["hey", "hola", "que", "tal"]);
    let b = new List<string>(["como", "estas", "?"]);
    t.is(a.Concat(b).ToArray().toString(), "hey,hola,que,tal,como,estas,?");
});

test("Contains", t => {
    t.true(new List<string>(["hey", "hola", "que", "tal"]).Contains("hola"));
});

test("Count", t => {
    let fruits = new List<string>(["apple", "banana", "mango", "orange", "passionfruit", "grape"]);
    t.is(fruits.Count(), 6);
    t.is(fruits.Count(x => x.length > 5), 3);
});

// test("DefaultIfEmpty", t => {
//     t.fail();
// });

test("Distinct", t => {
    let ages = new List<number>([21, 46, 46, 55, 17, 21, 55, 55]);
    t.is(ages.Distinct().ToArray().toString(), "21,46,55,17");
});

test("ElementAt", t => {
    let a = new List<string>(["hey", "hola", "que", "tal"]);
    t.is(a.ElementAt(0), "hey");
    t.notOk(a.ElementAt(4));
});

test("ElementAtOrDefault", t => {
    let a = new List<string>(["hey", "hola", "que", "tal"]);
    t.is(a.ElementAtOrDefault(0), "hey");
    t.is(a.ElementAtOrDefault(4), undefined);
});

test("Except", t => {
    let numbers1 = new List<number>([2.0, 2.1, 2.2, 2.3, 2.4, 2.5]);
    let numbers2 = new List<number>([2.2, 2.3]);
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
    let names = new List<string>(["Bruce", "Alfred", "Tim", "Richard"]);
    let test = "";
    names.ForEach((x, i) => test += `${x} ${i} `);
    t.is(test, "Bruce 0 Alfred 1 Tim 2 Richard 3 ");
});

// test("GroupBy", t => {
//     t.fail();
// });

// test("GroupJoin", t => {
//     t.fail();
// });

test("Intersect", t => {
    let id1 = new List<number>([44, 26, 92, 30, 71, 38]);
    let id2 = new List<number>([39, 59, 83, 47, 26, 4, 30]);
    t.is(id1.Intersect(id2).Sum(x => x), 56);
});

// test("Join", t => {
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

    let pet1 = new Pet("Turbo", 2);
    let pet2 = new Pet("Peanut", 8);

    // create three lists of pets.
    let pets1 = new List<Pet>([pet1, pet2]);
    let pets2 = new List<Pet>([pet1, pet2]);
    let pets3 = new List<Pet>([pet1]);

    t.true(pets1.SequenceEqual(pets2));
    t.false(pets1.SequenceEqual(pets3));
});

test("Single", t => {
    let fruits1 = new List<string>();
    let fruits2 = new List<string>(["orange"]);
    let fruits3 = new List<string>(["orange", "apple"]);
    t.is(fruits2.Single(), "orange");
    t.throws(() => fruits1.Single(), /The collection does not contain exactly one element./);
    t.throws(() => fruits3.Single(), /The collection does not contain exactly one element./);
});

test("SingleOrDefault", t => {
    let fruits1 = new List<string>();
    let fruits2 = new List<string>(["orange"]);
    let fruits3 = new List<string>(["orange", "apple"]);
    t.is(fruits1.SingleOrDefault(), undefined);
    t.is(fruits2.SingleOrDefault(), "orange");
    t.throws(() => fruits3.SingleOrDefault(), /The collection does not contain exactly one element./);
});

test("Skip", t => {
    let grades = new List<number>([59, 82, 70, 56, 92, 98, 85]);
    t.is(grades.OrderByDescending().Skip(3).ToArray().toString(), "82,70,59,56");
});

// test("SkipWhile", t => {
//     let grades = new List<number>([59, 82, 70, 56, 92, 98, 85]);
//     t.is(grades.OrderByDescending().SkipWhile(grade => grade >= 80).ToArray().toString(), "70,59,56");
// });

test("Sum", t => {
    let people = new List<IPerson>([
        {Age: 15, Name: "Cathy"},
        {Age: 25, Name: "Alice"},
        {Age: 50, Name: "Bob"}
    ]);
    t.is(new List<number>([2, 3, 5]).Sum(x => x), 10);
    t.is(people.Sum(x => x.Age), 90);
});

test("Take", t => {
    let grades = new List<number>([59, 82, 70, 56, 92, 98, 85]);
    t.is(grades.OrderByDescending().Take(3).ToArray().toString(), "98,92,85");
});

test("TakeWhile", t => {
    let fruits = new List<string>(["apple", "banana", "mango", "orange", "passionfruit", "grape"]);
    t.is(fruits.TakeWhile(fruit => fruit !== "orange").ToArray().toString(), "apple,banana,mango");
});

test("ToArray", t => {
    t.is(new List<number>([1, 2, 3, 4, 5]).ToArray().toString(), "1,2,3,4,5");
});

test("ToDictionary", t => {
    let people = new List<IPerson>([
        {Age: 15, Name: "Cathy"},
        {Age: 25, Name: "Alice"},
        {Age: 50, Name: "Bob"}
    ]);
    let dictionary = people.ToDictionary(x => x.Name);
    t.same(dictionary["Bob"], { Age: 50, Name: "Bob" });
    let dictionary2 = people.ToDictionary(x => x.Name, y => y.Age);
    t.is(dictionary2["Alice"], 25);
});

test("ToList", t => {
    t.is(new List<number>([1, 2, 3]).ToList().ToArray().toString(), "1,2,3");
});

// test("Union", t => {
//     t.fail();
// });

test("Where", t => {
    t.is(new List<string>(["hey", "hola", "que", "tal"]).Where(x => x.length > 3).Select(x => x + "a").First(), "holaa");
});

test("Zip", t => {
    let numbers = new List<number>([1, 2, 3, 4]);
    let words = new List<string>(["one", "two", "three"]);
    t.is(numbers.Zip(words, (first, second) => first + " " + second).ToArray().toString(), "1 one,2 two,3 three");
});

test("Where().Select()", t => {
    t.is(new List<number>([1, 2, 3, 4, 5]).Where(x => x > 3).Select(y => y * 2).ToArray().toString(), "8,10");
    t.is(new List<number>([1, 2, 3, 4, 5]).Where(x => x > 3).Select(y => y + "a").ToArray().toString(), "4a,5a");
});
