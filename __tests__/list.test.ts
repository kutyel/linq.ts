import test from 'ava'

import List from '../src/list'

interface IPackage {
  Company: string
  Weight: number
  TrackingNumber: number
}

interface IPerson {
  Name: string
  Age?: number
}

interface IDriver {
  Id: number
  Car: String
}

interface IPet {
  Name: string
  Age?: number
  Owner?: Person
  Vaccinated?: boolean
}

interface IProduct {
  Name: string
  Code: number
}

class Package {
  public Company: string
  public Weight: number
  public TrackingNumber: number

  constructor(p: IPackage) {
    this.Company = p.Company
    this.Weight = p.Weight
    this.TrackingNumber = p.TrackingNumber
  }
}

class Person implements IPerson {
  public Name: string
  public Age: number

  constructor(pet: IPet) {
    this.Name = pet.Name
    this.Age = pet.Age ?? 0
  }
}

class Pet implements IPet {
  public Name: string
  public Age: number
  public Owner?: Person
  public Vaccinated: boolean

  constructor(pet: IPet) {
    this.Name = pet.Name
    this.Age = pet.Age ?? 0
    this.Owner = pet.Owner
    this.Vaccinated = pet.Vaccinated ?? false
  }
}

class Dog extends Pet {
  public Speak(): string {
    return 'Bark'
  }
}

class PetOwner {
  constructor(public Name: string, public Pets: List<Pet>) {}
}

class Product implements IProduct {
  public Name: string
  public Code: number

  constructor(product: IProduct) {
    this.Name = product.Name
    this.Code = product.Code
  }
}

test('Iterator', t => {
  const pets = new List<Pet>([
    new Pet({ Age: 10, Name: 'Barley' }),
    new Pet({ Age: 4, Name: 'Boots' }),
    new Pet({ Age: 6, Name: 'Bissy' })
  ])

  for (const pet of pets) {
    // determine whether all pet names
    // in the array start with 'B'.
    t.true(pet.Name.startsWith('B'))
  }
})

test('Spread', t => {
  const pets = new List<Pet>([
    new Pet({ Age: 10, Name: 'Barley' }),
    new Pet({ Age: 4, Name: 'Boots' }),
    new Pet({ Age: 6, Name: 'Bissy' })
  ])
  const petsCopy = [...pets]
  for (const pet of petsCopy) {
    // determine whether all pet names
    // in the array start with 'B'.
    t.true(pet.Name.startsWith('B'))
  }
})

test('toStringTag', t => {
  const pets = new List<Pet>([])
  t.true(pets.toString() === '[object List]')
  t.true(`${pets}` === '[object List]')
})

test('Add', t => {
  const list = new List<string>()
  list.Add('hey')
  t.is(list.First(), 'hey')
})

test('Append', t => {
  const list = new List<string>()
  list.AddRange(['hey', "what's", 'up'])
  list.Append('there')
  t.is(list.Last(), 'there')
})

test('Prepend', t => {
  const list = new List<string>()
  list.AddRange(['hey', "what's", 'up'])
  list.Prepend('there')
  t.is(list.First(), 'there')
})

test('AddRange', t => {
  const list = new List<string>()
  list.AddRange(['hey', "what's", 'up'])
  t.deepEqual(list.ToArray(), ['hey', "what's", 'up'])
})

test('Aggregate', t => {
  const sentence = 'the quick brown fox jumps over the lazy dog'
  const reversed = 'dog lazy the over jumps fox brown quick the '
  const words = new List<string>(sentence.split(' '))
  t.is(
    words.Aggregate(
      (workingSentence, next) => next + ' ' + workingSentence,
      ''
    ),
    reversed
  )
})

test('All', t => {
  const pets = new List<Pet>([
    new Pet({ Age: 10, Name: 'Barley' }),
    new Pet({ Age: 4, Name: 'Boots' }),
    new Pet({ Age: 6, Name: 'Whiskers' })
  ])

  // determine whether all pet names
  // in the array start with 'B'.
  t.false(pets.All(pet => pet.Name.startsWith('B')))
})

test('Any', t => {
  const pets = new List<Pet>([
    new Pet({ Age: 8, Name: 'Barley', Vaccinated: true }),
    new Pet({ Age: 4, Name: 'Boots', Vaccinated: false }),
    new Pet({ Age: 1, Name: 'Whiskers', Vaccinated: false })
  ])

  // determine whether any pets over age 1 are also unvaccinated.
  t.true(pets.Any(p => p.Age > 1 && p.Vaccinated === false))
  t.true(pets.Any())
})

test('Average', t => {
  const grades = new List<number>([78, 92, 100, 37, 81])
  const people = new List<IPerson>([
    { Age: 15, Name: 'Cathy' },
    { Age: 25, Name: 'Alice' },
    { Age: 50, Name: 'Bob' }
  ])
  t.is(grades.Average(), 77.6)
  t.is(
    people.Average(x => x?.Age ?? 0),
    30
  )
})

test('Cast', t => {
  const pets = new List<Pet>([
    new Dog({ Age: 8, Name: 'Barley', Vaccinated: true }),
    new Pet({ Age: 1, Name: 'Whiskers', Vaccinated: false })
  ])

  const dogs = pets.Cast<Dog>()

  t.true(typeof dogs.First().Speak === 'function')
  t.is(dogs.First().Speak(), 'Bark')
  t.true(typeof dogs.Last().Speak === 'undefined')
})

test('Clear', t => {
  const pets = new List<Pet>([
    new Dog({ Age: 8, Name: 'Barley', Vaccinated: true }),
    new Pet({ Age: 1, Name: 'Whiskers', Vaccinated: false })
  ])

  t.is(pets.Count(), 2)
  pets.Clear()
  t.is(pets.Count(), 0)
})

test('Concat', t => {
  const cats = new List<Pet>([
    new Pet({ Age: 8, Name: 'Barley' }),
    new Pet({ Age: 4, Name: 'Boots' }),
    new Pet({ Age: 1, Name: 'Whiskers' })
  ])
  const dogs = new List<Pet>([
    new Pet({ Age: 3, Name: 'Bounder' }),
    new Pet({ Age: 14, Name: 'Snoopy' }),
    new Pet({ Age: 9, Name: 'Fido' })
  ])
  const expected = ['Barley', 'Boots', 'Whiskers', 'Bounder', 'Snoopy', 'Fido']
  t.deepEqual(
    cats
      .Select(cat => cat.Name)
      .Concat(dogs.Select(dog => dog.Name))
      .ToArray(),
    expected
  )
})

test('Contains', t => {
  const fruits = new List<string>([
    'apple',
    'banana',
    'mango',
    'orange',
    'passionfruit',
    'grape'
  ])
  t.true(fruits.Contains('mango'))
})

test('Count', t => {
  const fruits = new List<string>([
    'apple',
    'banana',
    'mango',
    'orange',
    'passionfruit',
    'grape'
  ])
  t.is(fruits.Count(), 6)
  t.is(
    fruits.Count(x => x.length > 5),
    3
  )
})

test('DefaultIfEmpty', t => {
  const pets = new List<Pet>([
    new Pet({ Age: 8, Name: 'Barley' }),
    new Pet({ Age: 4, Name: 'Boots' }),
    new Pet({ Age: 1, Name: 'Whiskers' })
  ])
  t.deepEqual(
    pets
      .DefaultIfEmpty()
      .Select(pet => pet.Name)
      .ToArray(),
    ['Barley', 'Boots', 'Whiskers']
  )
  const numbers = new List<number>()
  t.deepEqual(numbers.DefaultIfEmpty(0).ToArray(), [0])
})

test('Distinct', t => {
  const ages = new List<number>([21, 46, 46, 55, 17, 21, 55, 55])
  const pets = new List<Pet>([
    new Pet({ Age: 1, Name: 'Whiskers' }),
    new Pet({ Age: 1, Name: 'Whiskers' }),
    new Pet({ Age: 8, Name: 'Barley' }),
    new Pet({ Age: 8, Name: 'Barley' }),
    new Pet({ Age: 9, Name: 'Corey' })
  ])
  const expected = new List<Pet>([
    new Pet({ Age: 1, Name: 'Whiskers' }),
    new Pet({ Age: 8, Name: 'Barley' }),
    new Pet({ Age: 9, Name: 'Corey' })
  ])
  t.deepEqual(
    ages.Distinct(),
    new List<number>([21, 46, 55, 17])
  )
  t.deepEqual(pets.Distinct(), expected)
})

test('DistinctBy', t => {
  const pets = new List<Pet>([
    new Pet({ Age: 1, Name: 'Whiskers' }),
    new Pet({ Age: 4, Name: 'Boots' }),
    new Pet({ Age: 8, Name: 'Barley' }),
    new Pet({ Age: 4, Name: 'Daisy' })
  ])

  const result = new List<Pet>([
    new Pet({ Age: 1, Name: 'Whiskers' }),
    new Pet({ Age: 4, Name: 'Boots' }),
    new Pet({ Age: 8, Name: 'Barley' })
  ])

  t.deepEqual(
    pets.DistinctBy(pet => pet.Age),
    result
  )
})

test('ElementAt', t => {
  const a = new List<string>(['hey', 'hola', 'que', 'tal'])
  t.is(a.ElementAt(0), 'hey')
  t.throws(() => a.ElementAt(4), {
    message: /ArgumentOutOfRangeException: index is less than 0 or greater than or equal to the number of elements in source./
  })
  t.throws(() => a.ElementAt(-1), {
    message: /ArgumentOutOfRangeException: index is less than 0 or greater than or equal to the number of elements in source./
  })
})

test('ElementAtOrDefault', t => {
  const a = new List<string>(['hey', 'hola', 'que', 'tal'])
  const b = new List<number>([2, 1, 0, -1, -2])
  t.is(a.ElementAtOrDefault(0), 'hey')
  t.is(b.ElementAtOrDefault(2), 0)
  t.is(a.ElementAtOrDefault(4), null)
})

test('Except', t => {
  const numbers1 = new List<number>([2.0, 2.1, 2.2, 2.3, 2.4, 2.5])
  const numbers2 = new List<number>([2.2, 2.3])
  t.deepEqual(numbers1.Except(numbers2).ToArray(), [2, 2.1, 2.4, 2.5])
})

test('First', t => {
  t.is(
    new List<string>(['hey', 'hola', 'que', 'tal']).First(),
    'hey'
  )
  t.is(
    new List<number>([1, 2, 3, 4, 5]).First(x => x > 2),
    3
  )
  t.throws(() => new List<string>().First(), {
    message: /InvalidOperationException: The source sequence is empty./
  })
})

test('FirstOrDefault', t => {
  t.is(
    new List<string>(['hey', 'hola', 'que', 'tal']).FirstOrDefault('boo'),
    'hey'
  )
  t.is(new List<string>().FirstOrDefault('default'), 'default')
})

test('ForEach', t => {
  const names = new List<string>(['Bruce', 'Alfred', 'Tim', 'Richard'])
  let test = ''
  names.ForEach((x, i) => (test += `${x} ${i} `))
  t.is(test, 'Bruce 0 Alfred 1 Tim 2 Richard 3 ')
})

test('GroupBy', t => {
  const pets = new List<Pet>([
    new Pet({ Age: 8, Name: 'Barley' }),
    new Pet({ Age: 4, Name: 'Boots' }),
    new Pet({ Age: 1, Name: 'Whiskers' }),
    new Pet({ Age: 4, Name: 'Daisy' })
  ])
  const result = {
    '1': ['Whiskers'],
    '4': ['Boots', 'Daisy'],
    '8': ['Barley']
  }
  t.deepEqual(
    pets.GroupBy(
      pet => pet.Age,
      pet => pet.Name
    ),
    result
  )
  // example taken from https://stackoverflow.com/a/7325306/2834553
  const drivers = new List<IDriver>([
    { Id: 1, Car: 'Ferrari' },
    { Id: 1, Car: 'BMW' },
    { Id: 2, Car: 'Audi' }
  ])
  const result2 = {
    '1': ['Ferrari', 'BMW'],
    '2': ['Audi']
  }
  t.deepEqual(
    drivers.GroupBy(
      p => p.Id,
      p => p.Car
      // (key, g) => ({ [key]: g.ToList() })
    ),
    result2
  )
})

test('GroupJoin', t => {
  const magnus = new Person({ Name: 'Hedlund, Magnus' })
  const terry = new Person({ Name: 'Adams, Terry' })
  const charlotte = new Person({ Name: 'Weiss, Charlotte' })

  const barley = new Pet({ Name: 'Barley', Owner: terry })
  const boots = new Pet({ Name: 'Boots', Owner: terry })
  const whiskers = new Pet({ Name: 'Whiskers', Owner: charlotte })
  const daisy = new Pet({ Name: 'Daisy', Owner: magnus })

  const people = new List<Person>([magnus, terry, charlotte])
  const pets = new List<Pet>([barley, boots, whiskers, daisy])

  // create a list where each element is an anonymous
  // type that contains a person's name and
  // a collection of names of the pets they own.
  const query = people.GroupJoin(
    pets,
    person => person,
    pet => pet.Owner,
    (person, petCollection) => ({
      OwnerName: person.Name,
      Pets: petCollection.Select(pet => pet.Name)
    })
  )
  const expected = [
    'Hedlund, Magnus: Daisy',
    'Adams, Terry: Barley,Boots',
    'Weiss, Charlotte: Whiskers'
  ]
  t.deepEqual(
    query.Select(obj => `${obj.OwnerName}: ${obj.Pets.ToArray()}`).ToArray(),
    expected
  )
})

test('IndexOf', t => {
  const fruits = new List<string>([
    'apple',
    'banana',
    'mango',
    'orange',
    'passionfruit',
    'grape'
  ])

  const barley = new Pet({ Age: 8, Name: 'Barley', Vaccinated: true })
  const boots = new Pet({ Age: 4, Name: 'Boots', Vaccinated: false })
  const whiskers = new Pet({ Age: 1, Name: 'Whiskers', Vaccinated: false })
  const pets = new List<Pet>([barley, boots, whiskers])

  t.is(fruits.IndexOf('orange'), 3)
  t.is(fruits.IndexOf('strawberry'), -1)
  t.is(pets.IndexOf(boots), 1)
})

test('Insert', t => {
  const pets = new List<Pet>([
    new Pet({ Age: 10, Name: 'Barley' }),
    new Pet({ Age: 4, Name: 'Boots' }),
    new Pet({ Age: 6, Name: 'Whiskers' })
  ])

  let newPet = new Pet({ Age: 12, Name: 'Max' })

  pets.Insert(0, newPet)
  pets.Insert(pets.Count(), newPet)

  t.is(pets.First(), newPet)
  t.is(pets.Last(), newPet)
  t.throws(() => pets.Insert(-1, newPet), { message: /Index is out of range./ })
  t.throws(() => pets.Insert(pets.Count() + 1, newPet), {
    message: /Index is out of range./
  })
})

test('Intersect', t => {
  const id1 = new List<number>([44, 26, 92, 30, 71, 38])
  const id2 = new List<number>([39, 59, 83, 47, 26, 4, 30])
  t.is(id1.Intersect(id2).Sum(), 56)
})

test('Join', t => {
  const magnus = new Person({ Name: 'Hedlund, Magnus' })
  const terry = new Person({ Name: 'Adams, Terry' })
  const charlotte = new Person({ Name: 'Weiss, Charlotte' })

  const barley = new Pet({ Name: 'Barley', Owner: terry })
  const boots = new Pet({ Name: 'Boots', Owner: terry })
  const whiskers = new Pet({ Name: 'Whiskers', Owner: charlotte })
  const daisy = new Pet({ Name: 'Daisy', Owner: magnus })

  const people = new List<Person>([magnus, terry, charlotte])
  const pets = new List<Pet>([barley, boots, whiskers, daisy])

  // create a list of Person-Pet pairs where
  // each element is an anonymous type that contains a
  // pet's name and the name of the Person that owns the Pet.
  const query = people.Join(
    pets,
    person => person,
    pet => pet.Owner,
    (person, pet) => ({ OwnerName: person.Name, Pet: pet.Name })
  )
  const expected = [
    'Hedlund, Magnus - Daisy',
    'Adams, Terry - Barley',
    'Adams, Terry - Boots',
    'Weiss, Charlotte - Whiskers'
  ]
  t.deepEqual(
    query.Select(obj => `${obj.OwnerName} - ${obj.Pet}`).ToArray(),
    expected
  )
})

test('Last', t => {
  t.is(
    new List<string>(['hey', 'hola', 'que', 'tal']).Last(),
    'tal'
  )
  t.is(
    new List<number>([1, 2, 3, 4, 5]).Last(x => x > 2),
    5
  )
  t.throws(() => new List<string>().Last(), {
    message: /InvalidOperationException: The source sequence is empty./
  })
})

test('LastOrDefault', t => {
  t.is(
    new List<string>(['hey', 'hola', 'que', 'tal']).LastOrDefault(
      'not happening'
    ),
    'tal'
  )
  t.is(new List<string>().LastOrDefault('default'), 'default')
})


test('Max', t => {
  const people = new List<IPerson>([
    { Age: 50, Name: 'Bob' },
    { Age: 15, Name: 'Cathy' },
    { Age: 25, Name: 'Alice' }
    
  ])
  t.is(
    people.Max(x => x.Age ?? 0),
    50
  )
  t.is(
    new List<number>([5, 4, 3, 2, 1]).Min(),
    1
  )
})

test('Max_invalid_function_provided', t => {
  const people = new List<IPerson>([
    { Age: 15, Name: 'Cathy' },
    { Age: 25, Name: 'Alice' },
    { Age: 50, Name: 'Bob' }
  ])

  // Provide an invalid selector (wrong type) to trigger the error
  let invalidFn = () => 0;
  
  t.throws(() => people.Max(invalidFn), {
    message: /InvalidOperationException: Invalid comparer or selector function provided./
  })
})

test('Max_undefinedComparer', t => {
  const people = new List<IPerson>([
    { Age: 15, Name: 'Cathy' },
    { Age: 25, Name: 'Alice' },
    { Age: 50, Name: 'Bob' }
  ])

  t.throws(() => people.Max(), {
    message: /InvalidOperationException: No comparer available./
  })
})

test('Max_emptyElements', t => {
  const people = new List<IPerson>([])

  t.is(
    people.Max(),
    undefined
  )
})

test('Max_comparer', t => {
  const people = new List<IPerson>([
    { Age: 15, Name: 'Cathy' },
    { Age: 25, Name: 'Alice' },
    { Age: 50, Name: 'Bob' }
  ])

  let comparer = ((a: IPerson, b: IPerson) => (a.Age ?? 0) - (b.Age ?? 0));
  
  t.is(
    people.Max(comparer),
    people.Last()
  );
})

test('Max_number', t => {
  const nums = new List<number>([
    5,
    10,
    -5
  ])
  t.is(
    nums.Max(),
    10
  )
})

test('Max_string', t => {
  const people = new List<string>([
    'Cathy',
    'Alice',
    'Bob'
  ])
  t.is(
    people.Max(),
    'Cathy'
  )
})

test('Max_boolean', t => {
  const bools = new List<boolean>([
    true,
    false,
    true,
    false
  ])
  t.is(
    bools.Max(),
    true
  )
})


test('Min', t => {
  const people = new List<IPerson>([
    { Age: 50, Name: 'Bob' },
    { Age: 15, Name: 'Cathy' },
    { Age: 25, Name: 'Alice' }
    
  ])
  t.is(
    people.Min(x => x.Age ?? 0),
    15
  )
  t.is(
    new List<number>([5, 4, 3, 2, 1]).Min(),
    1
  )
})

test('Min_invalid_function_provided', t => {
  const people = new List<IPerson>([
    { Age: 15, Name: 'Cathy' },
    { Age: 25, Name: 'Alice' },
    { Age: 50, Name: 'Bob' }
  ])

  // Provide an invalid selector (wrong type) to trigger the error
  let invalidFn = () => 0;
  
  t.throws(() => people.Min(invalidFn), {
    message: /InvalidOperationException: Invalid comparer or selector function provided./
  })
})

test('Min_undefinedComparer', t => {
  const people = new List<IPerson>([
    { Age: 15, Name: 'Cathy' },
    { Age: 25, Name: 'Alice' },
    { Age: 50, Name: 'Bob' }
  ])

  t.throws(() => people.Min(), {
    message: /InvalidOperationException: No comparer available./
  })
})

test('Min_comparer', t => {
  const people = new List<IPerson>([
    { Age: 15, Name: 'Cathy' },
    { Age: 25, Name: 'Alice' },
    { Age: 50, Name: 'Bob' }
  ])

  let comparer = ((a: IPerson, b: IPerson) => (a.Age ?? 0) - (b.Age ?? 0));
  
  t.is(
    people.Min(comparer),
    people.First()
  );
})

test('Min_emptyElements', t => {
  const people = new List<IPerson>([])

  t.is(
    people.Min(),
    undefined
  )
})

test('Min_number', t => {
  const nums = new List<number>([
    10,
    5,
    -5
  ])
  t.is(
    nums.Min(),
    -5
  )
})

test('Min_string', t => {
  const people = new List<string>([
    'Cathy',
    'Alice',
    'Bob'
  ])
  t.is(
    people.Min(),
    'Alice'
  )
})

test('Min_boolean', t => {
  const bools = new List<boolean>([
    true,
    false,
    true,
    false
  ])
  t.is(
    bools.Min(),
    false
  )
})

test('OfType', t => {
  const pets = new List<Pet>([
    new Dog({ Age: 8, Name: 'Barley', Vaccinated: true }),
    new Pet({ Age: 1, Name: 'Whiskers', Vaccinated: false })
  ])
  const anyArray = new List<any>(['dogs', 'cats', 13, true])

  t.is(anyArray.OfType(String).Count(), 2)
  t.is(anyArray.OfType(Number).Count(), 1)
  t.is(anyArray.OfType(Boolean).Count(), 1)
  t.is(anyArray.OfType(Function).Count(), 0)

  t.is(pets.OfType(Dog).Count(), 1)
  t.is(
    pets
      .OfType<Dog>(Dog)
      .First()
      .Speak(),
    'Bark'
  )
})

test('OrderBy', t => {
  const expected = [1, 2, 3, 4, 5, 6]
  t.deepEqual(
    new List<number>([4, 5, 6, 3, 2, 1])
      .OrderBy(x => x)
      .ToArray(),
    expected
  )
  t.deepEqual(
    new List<string>(['Deutschland', 'Griechenland', 'Ägypten'])
      .OrderBy(
        x => x,
        (a, b) => a.localeCompare(b)
      )
      .ToArray(),
    ['Ägypten', 'Deutschland', 'Griechenland']
  )
})

test('OrderByDescending', t => {
  t.deepEqual(
    new List<number>([4, 5, 6, 3, 2, 1])
      .OrderByDescending(x => x)
      .ToArray(),
    [6, 5, 4, 3, 2, 1]
  )

  // sorting with custom comparer function
  const items = new List([
    new Product({ Name: 'Edward', Code: 21 }),
    new Product({ Name: 'Sharpe', Code: 37 }),
    new Product({ Name: 'And', Code: 45 }),
    new Product({ Name: 'The', Code: -12 }),
    new Product({ Name: 'Magnetic', Code: 13 }),
    new Product({ Name: 'Zeros', Code: 37 })
  ])

  const nameComparerFn = (a: IProduct, b: IProduct) => {
    const nameA = a.Name.toUpperCase() // ignore upper and lowercase
    const nameB = b.Name.toUpperCase() // ignore upper and lowercase
    if (nameA < nameB) {
      return -1
    }
    if (nameA > nameB) {
      return 1
    }

    // names must be equal
    return 0
  }
  const ordered = new List([
    new Product({ Name: 'And', Code: 45 }),
    new Product({ Name: 'Edward', Code: 21 }),
    new Product({ Name: 'Magnetic', Code: 13 }),
    new Product({ Name: 'Sharpe', Code: 37 }),
    new Product({ Name: 'The', Code: -12 }),
    new Product({ Name: 'Zeros', Code: 37 })
  ])
  t.deepEqual(items.OrderByDescending(a => a, nameComparerFn).ToList(), ordered)
})

test('ThenBy', t => {
  const fruits = new List<string>([
    'grape',
    'passionfruit',
    'banana',
    'mango',
    'orange',
    'raspberry',
    'apple',
    'blueberry'
  ])
  // sort the strings first by their length and then
  // alphabetically by passing the identity selector function.
  const expected = [
    'apple',
    'grape',
    'mango',
    'banana',
    'orange',
    'blueberry',
    'raspberry',
    'passionfruit'
  ]
  t.deepEqual(
    fruits
      .OrderBy(fruit => fruit.length)
      .ThenBy(fruit => fruit)
      .ToArray(),
    expected
  )
  const expectedNums = [1, 2, 3, 4, 5, 6]
  // test omission of OrderBy
  t.deepEqual(
    new List<number>([4, 5, 6, 3, 2, 1])
      .ThenBy(x => x)
      .ToArray(),
    expectedNums
  )
})

// see https://github.com/kutyel/linq.ts/issues/23
test('ThenByMultiple', t => {
  let x = { a: 2, b: 1, c: 1 }
  let y = { a: 1, b: 2, c: 2 }
  let z = { a: 1, b: 1, c: 3 }
  let unsorted = new List([x, y, z])
  let sorted = unsorted
    .OrderBy(u => u.a)
    .ThenBy(u => u.b)
    .ThenBy(u => u.c)
    .ToArray()

  t.is(sorted[0], z)
  t.is(sorted[1], y)
  t.is(sorted[2], x)
})

test('ThenByDescending', t => {
  const fruits = new List<string>([
    'grape',
    'passionfruit',
    'banana',
    'mango',
    'orange',
    'raspberry',
    'apple',
    'blueberry'
  ])

  // sort the strings first by their length and then
  // alphabetically descending by passing the identity selector function.
  const expected = [
    'mango',
    'grape',
    'apple',
    'orange',
    'banana',
    'raspberry',
    'blueberry',
    'passionfruit'
  ]
  t.deepEqual(
    fruits
      .OrderBy(fruit => fruit.length)
      .ThenByDescending(fruit => fruit)
      .ToArray(),
    expected
  )
  t.deepEqual(
    new List<number>([4, 5, 6, 3, 2, 1])
      .ThenByDescending(x => x)
      .ToArray(),
    [6, 5, 4, 3, 2, 1]
  )
})

test('Remove', t => {
  const fruits = new List<string>([
    'apple',
    'banana',
    'mango',
    'orange',
    'passionfruit',
    'grape'
  ])

  const barley = new Pet({ Age: 8, Name: 'Barley', Vaccinated: true })
  const boots = new Pet({ Age: 4, Name: 'Boots', Vaccinated: false })
  const whiskers = new Pet({ Age: 1, Name: 'Whiskers', Vaccinated: false })
  const pets = new List<Pet>([barley, boots, whiskers])
  const lessPets = new List<Pet>([barley, whiskers])

  t.true(fruits.Remove('orange'))
  t.false(fruits.Remove('strawberry'))
  t.true(pets.Remove(boots))
  t.deepEqual(pets, lessPets)
})

test('RemoveAll', t => {
  const dinosaurs = new List<string>([
    'Compsognathus',
    'Amargasaurus',
    'Oviraptor',
    'Velociraptor',
    'Deinonychus',
    'Dilophosaurus',
    'Gallimimus',
    'Triceratops'
  ])
  const lessDinosaurs = new List<string>([
    'Compsognathus',
    'Oviraptor',
    'Velociraptor',
    'Deinonychus',
    'Gallimimus',
    'Triceratops'
  ])
  t.deepEqual(
    dinosaurs.RemoveAll(x => x.endsWith('saurus')),
    lessDinosaurs
  )
})

test('RemoveAt', t => {
  const dinosaurs = new List<string>([
    'Compsognathus',
    'Amargasaurus',
    'Oviraptor',
    'Velociraptor',
    'Deinonychus',
    'Dilophosaurus',
    'Gallimimus',
    'Triceratops'
  ])
  const lessDinosaurs = new List<string>([
    'Compsognathus',
    'Amargasaurus',
    'Oviraptor',
    'Deinonychus',
    'Dilophosaurus',
    'Gallimimus',
    'Triceratops'
  ])
  dinosaurs.RemoveAt(3)
  t.deepEqual(dinosaurs, lessDinosaurs)
})

test('Reverse', t => {
  t.deepEqual(
    new List<number>([1, 2, 3, 4, 5])
      .Reverse()
      .ToArray(),
    [5, 4, 3, 2, 1]
  )
})

test('Select', t => {
  t.deepEqual(
    new List<number>([1, 2, 3])
      .Select(x => x * 2)
      .ToArray(),
    [2, 4, 6]
  )
})

test('SelectMany', t => {
  const petOwners = new List<PetOwner>([
    new PetOwner(
      'Higa, Sidney',
      new List<Pet>([new Pet({ Name: 'Scruffy' }), new Pet({ Name: 'Sam' })])
    ),
    new PetOwner(
      'Ashkenazi, Ronen',
      new List<Pet>([new Pet({ Name: 'Walker' }), new Pet({ Name: 'Sugar' })])
    ),
    new PetOwner(
      'Price, Vernette',
      new List<Pet>([
        new Pet({ Name: 'Scratches' }),
        new Pet({ Name: 'Diesel' })
      ])
    )
  ])
  const expected = ['Scruffy', 'Sam', 'Walker', 'Sugar', 'Scratches', 'Diesel']
  t.deepEqual(
    petOwners
      .SelectMany(petOwner => petOwner.Pets)
      .Select(pet => pet.Name)
      .ToArray(),
    expected
  )
})

test('SequenceEqual', t => {
  const pet1 = new Pet({ Age: 2, Name: 'Turbo' })
  const pet2 = new Pet({ Age: 8, Name: 'Peanut' })

  // create three lists of pets.
  const pets1 = new List<Pet>([pet1, pet2])
  const pets2 = new List<Pet>([pet1, pet2])
  const pets3 = new List<Pet>([pet1])

  t.true(pets1.SequenceEqual(pets2))
  t.false(pets1.SequenceEqual(pets3))
})

test('Single', t => {
  const fruits1 = new List<string>()
  const fruits2 = new List<string>(['orange'])
  const fruits3 = new List<string>(['orange', 'apple'])
  const numbers1 = new List([1, 2, 3, 4, 5, 5])
  t.is(fruits2.Single(), 'orange')
  t.throws(() => fruits1.Single(), {
    message: /The collection does not contain exactly one element./
  })
  t.throws(() => fruits3.Single(), {
    message: /The collection does not contain exactly one element./
  })
  t.is(
    numbers1.Single(x => x === 1),
    1
  )
  t.throws(() => numbers1.Single(x => x === 5), {
    message: /The collection does not contain exactly one element./
  })
  t.throws(() => numbers1.Single(x => x > 5), {
    message: /The collection does not contain exactly one element./
  })
})

test('SingleOrDefault', t => {
  const fruits1 = new List<string>()
  const fruits2 = new List<string>(['orange'])
  const fruits3 = new List<string>(['orange', 'apple'])
  const numbers1 = new List([1, 2, 3, 4, 5, 5])
  t.is(fruits1.SingleOrDefault('default'), 'default')
  t.is(fruits2.SingleOrDefault('default'), 'orange')
  t.throws(() => fruits3.SingleOrDefault('default'), {
    message: /The collection does not contain exactly one element./
  })
  // t.is(
  //   numbers1.SingleOrDefault(x => x === 1),
  //   1
  // )
  // t.is(
  //   numbers1.SingleOrDefault(x => x > 5),
  //   undefined
  // )
  t.throws(() => numbers1.SingleOrDefault(1), {
    message: /The collection does not contain exactly one element./
  })
})

test('Skip', t => {
  const grades = new List<number>([59, 82, 70, 56, 92, 98, 85])
  t.deepEqual(
    grades
      .OrderByDescending(x => x)
      .Skip(3)
      .ToArray(),
    [82, 70, 59, 56]
  )
})

test('SkipLast', t => {
  const grades = new List<number>([59, 82, 70, 56, 92, 98, 85])
  t.deepEqual(
    grades
      .OrderByDescending(x => x)
      .SkipLast(3)
      .ToArray(),
    [98, 92, 85, 82]
  )
})

test('SkipWhile', t => {
  const grades = new List<number>([59, 82, 70, 56, 92, 98, 85])
  t.deepEqual(
    grades
      .OrderByDescending(x => x)
      .SkipWhile(grade => grade >= 80)
      .ToArray(),
    [70, 59, 56]
  )
})

test('Sum', t => {
  const people = new List<IPerson>([
    { Age: 15, Name: 'Cathy' },
    { Age: 25, Name: 'Alice' },
    { Age: 50, Name: 'Bob' }
  ])
  t.is(
    new List<number>([2, 3, 5]).Sum(),
    10
  )
  t.is(
    people.Sum(x => x?.Age ?? 0),
    90
  )
})

test('Take', t => {
  const grades = new List<number>([59, 82, 70, 56, 92, 98, 85])
  t.deepEqual(
    grades
      .OrderByDescending(x => x)
      .Take(3)
      .ToArray(),
    [98, 92, 85]
  )
})

test('TakeLast', t => {
  const grades = new List<number>([59, 82, 70, 56, 92, 98, 85])
  t.deepEqual(
    grades
      .OrderByDescending(x => x)
      .TakeLast(3)
      .ToArray(),
    [70, 59, 56]
  )
})

test('TakeWhile', t => {
  const expected = ['apple', 'banana', 'mango']
  const fruits = new List<string>([
    'apple',
    'banana',
    'mango',
    'orange',
    'passionfruit',
    'grape'
  ])
  t.deepEqual(fruits.TakeWhile(fruit => fruit !== 'orange').ToArray(), expected)
})

test('ToArray', t => {
  t.deepEqual(
    new List<number>([1, 2, 3, 4, 5]).ToArray(),
    [1, 2, 3, 4, 5]
  )
})

test('ToDictionary', t => {
  const people = new List<IPerson>([
    { Age: 15, Name: 'Cathy' },
    { Age: 25, Name: 'Alice' },
    { Age: 50, Name: 'Bob' }
  ])
  const dictionary = people.ToDictionary<string, IPerson>(x => x.Name)
  // t.deepEqual(dictionary['Bob'] as List<{ Key: string; Value: IPerson }>, {
  //   Age: 50,
  //   Name: 'Bob'
  // })
  // t.is(dictionary['Bob'].Age, 50)
  // const dictionary2 = people.ToDictionary(
  //   x => x.Name,
  //   y => y.Age
  // )
  // t.is(dictionary2['Alice'], 25)
  // Dictionary should behave just like in C#
  t.is(
    dictionary.Max(x => x?.Value?.Age ?? 0),
    50
  )
  t.is(
    dictionary.Min(x => x?.Value?.Age ?? 0),
    15
  )
  const expectedKeys = new List(['Cathy', 'Alice', 'Bob'])
  t.deepEqual(
    dictionary.Select(x => x.Key),
    expectedKeys
  )
  t.deepEqual(
    dictionary.Select(x => x.Value),
    people
  )
  // example taken from https://stackoverflow.com/a/3611140/2834553
  const dict = people.ToDictionary(
    x => x,
    x => x.Age
  )
  t.is(dict.Select(x => x.Value).Max(), 50)
  t.is(dict.Select(x => x.Value).Min(), 15)
})

test('ToList', t => {
  t.deepEqual(
    new List<number>([1, 2, 3])
      .ToList()
      .ToArray(),
    [1, 2, 3]
  )
})

test('ToLookup', t => {
  // create a list of Packages
  const packages = new List<Package>([
    new Package({
      Company: 'Coho Vineyard',
      TrackingNumber: 89453312,
      Weight: 25.2
    }),
    new Package({
      Company: 'Lucerne Publishing',
      TrackingNumber: 89112755,
      Weight: 18.7
    }),
    new Package({
      Company: 'Wingtip Toys',
      TrackingNumber: 299456122,
      Weight: 6.0
    }),
    new Package({
      Company: 'Contoso Pharmaceuticals',
      TrackingNumber: 670053128,
      Weight: 9.3
    }),
    new Package({
      Company: 'Wide World Importers',
      TrackingNumber: 4665518773,
      Weight: 33.8
    })
  ])

  // create a Lookup to organize the packages.
  // use the first character of Company as the key value.
  // select Company appended to TrackingNumber
  // as the element values of the Lookup.
  const lookup = packages.ToLookup(
    p => p.Company.substring(0, 1),
    p => p.Company + ' ' + p.TrackingNumber
  )
  const result = {
    C: ['Coho Vineyard 89453312', 'Contoso Pharmaceuticals 670053128'],
    L: ['Lucerne Publishing 89112755'],
    W: ['Wingtip Toys 299456122', 'Wide World Importers 4665518773']
  }
  t.deepEqual(lookup, result)
})

test('Union', t => {
  const ints1 = new List<number>([5, 3, 9, 7, 5, 9, 3, 7])
  const ints2 = new List<number>([8, 3, 6, 4, 4, 9, 1, 0])
  t.deepEqual(ints1.Union(ints2).ToArray(), [5, 3, 9, 7, 8, 6, 4, 1, 0])

  const result = [
    new Product({ Name: 'apple', Code: 9 }),
    new Product({ Name: 'orange', Code: 4 }),
    new Product({ Name: 'lemon', Code: 12 })
  ]
  const store1 = new List<Product>([
    new Product({ Name: 'apple', Code: 9 }),
    new Product({ Name: 'orange', Code: 4 })
  ])
  const store2 = new List<Product>([
    new Product({ Name: 'apple', Code: 9 }),
    new Product({ Name: 'lemon', Code: 12 })
  ])
  t.deepEqual(store1.Union(store2).ToArray(), result)
})

test('Where', t => {
  const fruits = new List<string>([
    'apple',
    'passionfruit',
    'banana',
    'mango',
    'orange',
    'blueberry',
    'grape',
    'strawberry'
  ])
  const expected = ['apple', 'mango', 'grape']
  t.deepEqual(fruits.Where(fruit => fruit.length < 6).ToArray(), expected)
})

test('Zip', t => {
  const numbers = new List<number>([1, 2, 3, 4])
  const words = new List<string>(['one', 'two', 'three'])
  t.deepEqual(
    numbers.Zip(words, (first, second) => `${first} ${second}`).ToArray(),
    ['1 one', '2 two', '3 three']
  )
  // larger second array
  const expected = ['one 1', 'two 2', 'three 3']
  const numbers2 = new List<number>([1, 2, 3, 4])
  const words2 = new List<string>(['one', 'two', 'three'])
  t.deepEqual(
    words2.Zip(numbers2, (first, second) => `${first} ${second}`).ToArray(),
    expected
  )
})

test('Where().Select()', t => {
  t.deepEqual(
    new List<number>([1, 2, 3, 4, 5])
      .Where(x => x > 3)
      .Select(y => y * 2)
      .ToArray(),
    [8, 10]
  )
  t.deepEqual(
    new List<number>([1, 2, 3, 4, 5])
      .Where(x => x > 3)
      .Select(y => y + 'a')
      .ToArray(),
    ['4a', '5a']
  )
})
