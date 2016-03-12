# LinQ for TypeScript

[![Build](https://travis-ci.org/kutyel/linq.svg?branch=master)](https://travis-ci.org/kutyel/linq)
[![Dependencies](http://img.shields.io/david/kutyel/linq.svg?style=flat-square)](https://david-dm.org/kutyel/linq)
[![Dev Dependencies](http://img.shields.io/david/dev/kutyel/linq.svg?style=flat-square)](https://david-dm.org/kutyel/linq#info=devDependencies)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square)](https://paypal.me/flaviocorpa)

[![linqts](https://raw.githubusercontent.com/kutyel/linq/master/resources/linqts.png)](http://www.typescriptlang.org)

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

![https://gyazo.com/10fb5070746bc5251828cbd9033a69a8](https://i.gyazo.com/10fb5070746bc5251828cbd9033a69a8.gif)

## Tests

```
npm test
```

Powered by [AVA](https://github.com/sindresorhus/ava)

## License

MIT © [Flavio Corpa](http://flaviocorpa.com)
