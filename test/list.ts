import test from "ava";
import { List } from "../linq";

/**
 * Tests taken from LinQ .NET specification (https://msdn.microsoft.com/en-us/library/system.linq.enumerable.aspx)
 */

interface IPerson {
    Name: string;
    Age?: number;
}

interface IPet {
    Name: string;
    Age?: number;
    Owner?: Person;
    Vaccinated?: boolean;
}

class Person implements IPerson {
    public Name: string;
    public Age: number;

    constructor(pet: IPet) {
        this.Name = pet.Name;
        this.Age = pet.Age;
    }
}

class Pet implements IPet {
    public Name: string;
    public Age: number;
    public Owner: Person;
    public Vaccinated: boolean;

    constructor(pet: IPet) {
        this.Name = pet.Name;
        this.Age = pet.Age;
        this.Owner = pet.Owner;
        this.Vaccinated = pet.Vaccinated;
    }
}

class PetOwner {
    constructor(public Name: string, public Pets: List<Pet>) { }
}

test("Add", t => {
    const list = new List<string>();
    list.Add("hey");
    t.is(list.First(), "hey");
});

test("AddRange", t => {
    const list = new List<string>();
    list.AddRange(["hey", "what's", "up"]);
    t.is(list.ToArray().toString(), "hey,what's,up");
});

test("Aggregate", t => {
    const sentence = "the quick brown fox jumps over the lazy dog";
    const reversed = "dog lazy the over jumps fox brown quick the ";
    const words = new List<string>(sentence.split(" "));
    t.is(words.Aggregate((workingSentence, next) => next + " " + workingSentence, ""), reversed);
});

test("All", t => {
    const pets = new List<Pet>([
        new Pet({ Age: 10, Name: "Barley" }),
        new Pet({ Age: 4, Name: "Boots" }),
        new Pet({ Age: 6, Name: "Whiskers" })
    ]);

    // determine whether all pet names
    // in the array start with 'B'.
    t.false(pets.All(pet => pet.Name.startsWith("B")));
});

test("Any", t => {
    const pets = new List<Pet>([
        new Pet({ Age: 8, Name: "Barley", Vaccinated: true }),
        new Pet({ Age: 4, Name: "Boots", Vaccinated: false }),
        new Pet({ Age: 1, Name: "Whiskers", Vaccinated: false })
    ]);

    // determine whether any pets over age 1 are also unvaccinated.
    t.true(pets.Any(p => p.Age > 1 && p.Vaccinated === false));
});

test("Average", t => {
    const grades = new List<number>([78, 92, 100, 37, 81]);
    const people = new List<IPerson>([
        { Age: 15, Name: "Cathy" },
        { Age: 25, Name: "Alice" },
        { Age: 50, Name: "Bob" }
    ]);
    t.is(grades.Average(), 77.6);
    t.is(people.Average(x => x.Age), 30);
});

test("Concat", t => {
    const cats = new List<Pet>([
        new Pet({ Age: 8, Name: "Barley" }),
        new Pet({ Age: 4, Name: "Boots" }),
        new Pet({ Age: 1, Name: "Whiskers" })
    ]);
    const dogs = new List<Pet>([
        new Pet({ Age: 3, Name: "Bounder" }),
        new Pet({ Age: 14, Name: "Snoopy" }),
        new Pet({ Age: 9, Name: "Fido" })
    ]);
    const result = "Barley,Boots,Whiskers,Bounder,Snoopy,Fido";
    t.is(cats.Select(cat => cat.Name).Concat(dogs.Select(dog => dog.Name)).ToArray().toString(), result);
});

test("Contains", t => {
    const fruits = new List<string>(["apple", "banana", "mango", "orange", "passionfruit", "grape"]);
    t.true(fruits.Contains("mango"));
});

test("Count", t => {
    const fruits = new List<string>(["apple", "banana", "mango", "orange", "passionfruit", "grape"]);
    t.is(fruits.Count(), 6);
    t.is(fruits.Count(x => x.length > 5), 3);
});

test("DefaultIfEmpty", t => {
    const pets = new List<Pet>([
        new Pet({ Age: 8, Name: "Barley" }),
        new Pet({ Age: 4, Name: "Boots" }),
        new Pet({ Age: 1, Name: "Whiskers" })
    ]);
    t.is(pets.DefaultIfEmpty().Select(pet => pet.Name).ToArray().toString(), "Barley,Boots,Whiskers");
    const numbers = new List<number>();
    t.is(numbers.DefaultIfEmpty(0).ToArray().toString(), "0");
});

test("Distinct", t => {
    const ages = new List<number>([21, 46, 46, 55, 17, 21, 55, 55]);
    t.is(ages.Distinct().ToArray().toString(), "21,46,55,17");
});

test("ElementAt", t => {
    const a = new List<string>(["hey", "hola", "que", "tal"]);
    t.is(a.ElementAt(0), "hey");
    t.notOk(a.ElementAt(4));
});

test("ElementAtOrDefault", t => {
    const a = new List<string>(["hey", "hola", "que", "tal"]);
    t.is(a.ElementAtOrDefault(0), "hey");
    t.is(a.ElementAtOrDefault(4), undefined);
});

test("Except", t => {
    const numbers1 = new List<number>([2.0, 2.1, 2.2, 2.3, 2.4, 2.5]);
    const numbers2 = new List<number>([2.2, 2.3]);
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
    const names = new List<string>(["Bruce", "Alfred", "Tim", "Richard"]);
    let test = "";
    names.ForEach((x, i) => test += `${x} ${i} `);
    t.is(test, "Bruce 0 Alfred 1 Tim 2 Richard 3 ");
});

test("GroupBy", t => {
    const pets = new List<Pet>([
        new Pet({ Age: 8, Name: "Barley" }),
        new Pet({ Age: 4, Name: "Boots" }),
        new Pet({ Age: 1, Name: "Whiskers" }),
        new Pet({ Age: 4, Name: "Daisy" })
    ]);
    const result = {
        "1": ["Whiskers"],
        "4": ["Boots", "Daisy"],
        "8": ["Barley"],
    };
    t.same(pets.GroupBy(pet => pet.Age, pet => pet.Name), result);
});

test("GroupJoin", t => {
    const magnus = new Person({ Name: "Hedlund, Magnus" });
    const terry = new Person({ Name: "Adams, Terry" });
    const charlotte = new Person({ Name: "Weiss, Charlotte" });

    const barley = new Pet({ Name: "Barley", Owner: terry });
    const boots = new Pet({ Name: "Boots", Owner: terry });
    const whiskers = new Pet({ Name: "Whiskers", Owner: charlotte });
    const daisy = new Pet({ Name: "Daisy", Owner: magnus });

    const people = new List<Person>([ magnus, terry, charlotte ]);
    const pets = new List<Pet>([ barley, boots, whiskers, daisy ]);

    // create a list where each element is an anonymous
    // type that contains a person's name and
    // a collection of names of the pets they own.
    const query = people.GroupJoin(pets, person => person, pet => pet.Owner, (person, petCollection) =>
        ({ OwnerName: person.Name, Pets: petCollection.Select(pet => pet.Name) }));
    const result = "Hedlund, Magnus: Daisy,Adams, Terry: Barley,Boots,Weiss, Charlotte: Whiskers";
    t.is(query.Select(obj => `${obj.OwnerName}: ${obj.Pets.ToArray()}`).ToArray().toString(), result);
});

test("Intersect", t => {
    const id1 = new List<number>([44, 26, 92, 30, 71, 38]);
    const id2 = new List<number>([39, 59, 83, 47, 26, 4, 30]);
    t.is(id1.Intersect(id2).Sum(x => x), 56);
});

test("Join", t => {
    const magnus = new Person({ Name: "Hedlund, Magnus" });
    const terry = new Person({ Name: "Adams, Terry" });
    const charlotte = new Person({ Name: "Weiss, Charlotte" });

    const barley = new Pet({ Name: "Barley", Owner: terry });
    const boots = new Pet({ Name: "Boots", Owner: terry });
    const whiskers = new Pet({ Name: "Whiskers", Owner: charlotte });
    const daisy = new Pet({ Name: "Daisy", Owner: magnus });

    const people = new List<Person>([magnus, terry, charlotte]);
    const pets = new List<Pet>([barley, boots, whiskers, daisy]);

    // create a list of Person-Pet pairs where
    // each element is an anonymous type that contains a
    // pet's name and the name of the Person that owns the Pet.
    const query = people.Join(pets, person => person, pet => pet.Owner, (person, pet) =>
        ({ OwnerName: person.Name, Pet: pet.Name }));
    const result = "Hedlund, Magnus - Daisy,Adams, Terry - Barley,Adams, Terry - Boots,Weiss, Charlotte - Whiskers";
    t.is(query.Select(obj => `${obj.OwnerName} - ${obj.Pet}`).ToArray().toString(), result);
});

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
    t.is(new List<number>([4, 5, 6, 3, 2, 1]).OrderBy(x => x).ToArray().toString(), "1,2,3,4,5,6");
});

test("OrderByDescending", t => {
    t.is(new List<number>([4, 5, 6, 3, 2, 1]).OrderByDescending(x => x).ToArray().toString(), "6,5,4,3,2,1");
});

test("ThenBy", t => {
    const fruits = new List<string>(["grape", "passionfruit", "banana", "mango", "orange", "raspberry", "apple", "blueberry"]);

    // sort the strings first by their length and then
    // alphabetically by passing the identity selector function.
    const result = "apple,grape,mango,banana,orange,blueberry,raspberry,passionfruit";
    t.is(fruits.OrderBy(fruit => fruit.length).ThenBy(fruit => fruit).ToArray().toString(), result);
    t.is(new List<number>([4, 5, 6, 3, 2, 1]).ThenBy(x => x).ToArray().toString(), "1,2,3,4,5,6");
});

test("ThenByDescending", t => {
    const fruits = new List<string>(["grape", "passionfruit", "banana", "mango", "orange", "raspberry", "apple", "blueberry"]);

    // sort the strings first by their length and then
    // alphabetically descending by passing the identity selector function.
    const result = "mango,grape,apple,orange,banana,raspberry,blueberry,passionfruit";
    t.is(fruits.OrderBy(fruit => fruit.length).ThenByDescending(fruit => fruit).ToArray().toString(), result);
    t.is(new List<number>([4, 5, 6, 3, 2, 1]).ThenByDescending(x => x).ToArray().toString(), "6,5,4,3,2,1");
});

test("Reverse", t => {
    t.is(new List<number>([1, 2, 3, 4, 5]).Reverse().ToArray().toString(), "5,4,3,2,1");
});

test("Select", t => {
    t.is(new List<number>([1, 2, 3]).Select(x => x * 2).ToArray().toString(), "2,4,6");
});

test("SelectMany", t => {
    const petOwners = new List<PetOwner>([
        new PetOwner("Higa, Sidney", new List<Pet>([new Pet({ Name: "Scruffy" }), new Pet({ Name: "Sam" })])),
        new PetOwner("Ashkenazi, Ronen", new List<Pet>([new Pet({ Name: "Walker" }), new Pet({ Name: "Sugar" })])),
        new PetOwner("Price, Vernette", new List<Pet>([new Pet({ Name: "Scratches" }), new Pet({ Name: "Diesel" })]))
    ]);
    const result = "Scruffy,Sam,Walker,Sugar,Scratches,Diesel";
    t.is(petOwners.SelectMany(petOwner => petOwner.Pets).Select(pet => pet.Name).ToArray().toString(), result);
});

test("SequenceEqual", t => {
    const pet1 = new Pet({ Age: 2, Name: "Turbo" });
    const pet2 = new Pet({ Age: 8, Name: "Peanut" });

    // create three lists of pets.
    const pets1 = new List<Pet>([pet1, pet2]);
    const pets2 = new List<Pet>([pet1, pet2]);
    const pets3 = new List<Pet>([pet1]);

    t.true(pets1.SequenceEqual(pets2));
    t.false(pets1.SequenceEqual(pets3));
});

test("Single", t => {
    const fruits1 = new List<string>();
    const fruits2 = new List<string>(["orange"]);
    const fruits3 = new List<string>(["orange", "apple"]);
    t.is(fruits2.Single(), "orange");
    t.throws(() => fruits1.Single(), /The collection does not contain exactly one element./);
    t.throws(() => fruits3.Single(), /The collection does not contain exactly one element./);
});

test("SingleOrDefault", t => {
    const fruits1 = new List<string>();
    const fruits2 = new List<string>(["orange"]);
    const fruits3 = new List<string>(["orange", "apple"]);
    t.is(fruits1.SingleOrDefault(), undefined);
    t.is(fruits2.SingleOrDefault(), "orange");
    t.throws(() => fruits3.SingleOrDefault(), /The collection does not contain exactly one element./);
});

test("Skip", t => {
    const grades = new List<number>([59, 82, 70, 56, 92, 98, 85]);
    t.is(grades.OrderByDescending(x => x).Skip(3).ToArray().toString(), "82,70,59,56");
});

test("SkipWhile", t => {
    const grades = new List<number>([59, 82, 70, 56, 92, 98, 85]);
    t.is(grades.OrderByDescending(x => x).SkipWhile(grade => grade >= 80).ToArray().toString(), "70,59,56");
});

test("Sum", t => {
    const people = new List<IPerson>([
        { Age: 15, Name: "Cathy" },
        { Age: 25, Name: "Alice" },
        { Age: 50, Name: "Bob" }
    ]);
    t.is(new List<number>([2, 3, 5]).Sum(), 10);
    t.is(people.Sum(x => x.Age), 90);
});

test("Take", t => {
    const grades = new List<number>([59, 82, 70, 56, 92, 98, 85]);
    t.is(grades.OrderByDescending(x => x).Take(3).ToArray().toString(), "98,92,85");
});

test("TakeWhile", t => {
    const fruits = new List<string>(["apple", "banana", "mango", "orange", "passionfruit", "grape"]);
    t.is(fruits.TakeWhile(fruit => fruit !== "orange").ToArray().toString(), "apple,banana,mango");
});

test("ToArray", t => {
    t.is(new List<number>([1, 2, 3, 4, 5]).ToArray().toString(), "1,2,3,4,5");
});

test("ToDictionary", t => {
    const people = new List<IPerson>([
        { Age: 15, Name: "Cathy" },
        { Age: 25, Name: "Alice" },
        { Age: 50, Name: "Bob" }
    ]);
    const dictionary = people.ToDictionary(x => x.Name);
    t.same(dictionary["Bob"], { Age: 50, Name: "Bob" });
    const dictionary2 = people.ToDictionary(x => x.Name, y => y.Age);
    t.is(dictionary2["Alice"], 25);
});

test("ToList", t => {
    t.is(new List<number>([1, 2, 3]).ToList().ToArray().toString(), "1,2,3");
});

test("Union", t => {
    const ints1 = new List<number>([5, 3, 9, 7, 5, 9, 3, 7]);
    const ints2 = new List<number>([8, 3, 6, 4, 4, 9, 1, 0]);
    t.is(ints1.Union(ints2).OrderByDescending(x => x).ToArray().toString(), "9,8,7,6,5,4,3,1,0");
});

test("Where", t => {
    t.is(new List<string>(["hey", "hola", "que", "tal"]).Where(x => x.length > 3).Select(x => x + "a").First(), "holaa");
});

test("Zip", t => {
    const numbers = new List<number>([1, 2, 3, 4]);
    const words = new List<string>(["one", "two", "three"]);
    t.is(numbers.Zip(words, (first, second) => first + " " + second).ToArray().toString(), "1 one,2 two,3 three");
});

test("Where().Select()", t => {
    t.is(new List<number>([1, 2, 3, 4, 5]).Where(x => x > 3).Select(y => y * 2).ToArray().toString(), "8,10");
    t.is(new List<number>([1, 2, 3, 4, 5]).Where(x => x > 3).Select(y => y + "a").ToArray().toString(), "4a,5a");
});
