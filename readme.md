# LinQ for TypeScript

[![Build](https://img.shields.io/travis/kutyel/linq.ts/master.svg)](https://travis-ci.org/kutyel/linq.ts)
[![Dependency Status](https://gemnasium.com/badges/github.com/kutyel/linq.ts.svg)](https://gemnasium.com/github.com/kutyel/linq.ts)
[![Downloads](https://img.shields.io/npm/dm/linqts.svg)](https://npmjs.com/packages/linqts)
[![Version](https://img.shields.io/npm/v/linqts.svg)](https://npmjs.com/packages/linqts)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg)](https://paypal.me/flaviocorpa)

[![linqts](https://raw.githubusercontent.com/kutyel/linq/master/assets/linqts.png)](http://www.typescriptlang.org)

## Install

```
npm install linqts
```

## Usage

```ts
import {List} from 'linqts';

let arr = new List<number>([1,2,3,4,5])
    .Where(x => x > 3)
    .Select(y => y * 2)
    .ToArray(); // > [8, 10]

let query =
    people.Join(pets,
                person => person,
                pet => pet.Owner,
                (person, pet) =>
                    ({ OwnerName: person.Name, Pet: pet.Name }));
```

## Sample

![linqts.gif](https://raw.githubusercontent.com/kutyel/linq/master/assets/linqts.gif)

## Documentation
If you do not know LinQ or just want to remember what is all about, have a look at the [docs](http://kutyel.github.io/linq.ts/docs/classes/list/index.html).

## Tests

```
npm test
```

Powered by [AVA](https://github.com/sindresorhus/ava)

## License

MIT © [Flavio Corpa](http://flaviocorpa.com)
