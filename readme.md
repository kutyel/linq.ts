# LinQ for TypeScript

[![Build](https://travis-ci.org/kutyel/linq.ts.svg?branch=master)](https://travis-ci.org/kutyel/linq.ts)
[![Dependencies](http://img.shields.io/david/kutyel/linq.ts.svg?style=flat)](https://david-dm.org/kutyel/linq.ts)
[![Dev Dependencies](http://img.shields.io/david/dev/kutyel/linq.ts.svg?style=flat)](https://david-dm.org/kutyel/linq.ts#info=devDependencies)
[![npm](https://img.shields.io/npm/v/linqts.svg?style=flat)](https://npmjs.com/packages/linqts)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat)](https://paypal.me/flaviocorpa)

[![linqts](https://raw.githubusercontent.com/kutyel/linq/master/assets/linqts.png)](http://www.typescriptlang.org)

## Install

```
npm install linqts
```

## Usage

```ts
import {List} from './linq.ts';

let arr = new List<number>([1,2,3,4,5])
    .Where(x => x > 3)
    .Select(y => y * 2)
    .ToArray(); // => [8, 10]
```

## Sample

![linqts.gif](https://raw.githubusercontent.com/kutyel/linq/master/assets/linqts.gif)

## Tests

```
npm test
```

Powered by [AVA](https://github.com/sindresorhus/ava)

## License

MIT © [Flavio Corpa](http://flaviocorpa.com)
