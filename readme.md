# LinQ for TypeScript

[![Build](https://img.shields.io/travis/kutyel/linq.ts/master.svg?style=flat-square)](https://travis-ci.org/kutyel/linq.ts)
[![Dependencies](https://img.shields.io/david/kutyel/linq.ts.svg?style=flat-square)](https://david-dm.org/kutyel/linq.ts)
[![Dev Dependencies](https://img.shields.io/david/dev/kutyel/linq.ts.svg?style=flat-square)](https://david-dm.org/kutyel/linq.ts#info=devDependencies)
[![Coverage Status](https://img.shields.io/coveralls/kutyel/linq.ts/master.svg?style=flat-square)](https://coveralls.io/github/kutyel/linq.ts?branch=master)
[![Downloads](https://img.shields.io/npm/dm/linqts.svg?style=flat-square)](https://npmjs.com/packages/linqts)
[![Version](https://img.shields.io/npm/v/linqts.svg?style=flat-square)](https://npmjs.com/packages/linqts)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square)](https://paypal.me/flaviocorpa)
[![linqts](https://raw.githubusercontent.com/kutyel/linq/master/assets/linqts.png)](http://www.typescriptlang.org)

## Install

```
npm install linqts
```

## Sample

```javascript
import { List } from 'linqts';

let arr = new List<number>([1,2,3,4,5])
    .Where(x => x > 3)
    .Select(y => y * 2)
    .ToArray(); // > [8, 10]

let query = people.Join(pets,
    person => person,
    pet => pet.Owner,
    (person, pet) =>
        ({ OwnerName: person.Name, Pet: pet.Name }));
```

## Demo

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
