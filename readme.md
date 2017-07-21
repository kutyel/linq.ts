# LinQ for TypeScript

[![Build](https://img.shields.io/travis/kutyel/linq.ts/master.svg?style=flat-square)](https://travis-ci.org/kutyel/linq.ts)
[![Dependencies](https://img.shields.io/david/kutyel/linq.ts.svg?style=flat-square)](https://david-dm.org/kutyel/linq.ts)
[![Dev Dependencies](https://img.shields.io/david/dev/kutyel/linq.ts.svg?style=flat-square)](https://david-dm.org/kutyel/linq.ts?type=dev)
[![Coverage Status](https://img.shields.io/coveralls/kutyel/linq.ts/master.svg?style=flat-square)](https://coveralls.io/github/kutyel/linq.ts?branch=master)
[![Downloads](https://img.shields.io/npm/dm/linqts.svg?style=flat-square)](https://npmjs.com/packages/linqts)
[![Version](https://img.shields.io/npm/v/linqts.svg?style=flat-square)](https://npmjs.com/packages/linqts)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square)](https://paypal.me/flaviocorpa)
[![linqts](https://raw.githubusercontent.com/kutyel/linq/master/assets/linqts.png)](http://www.typescriptlang.org)

## Install

```
npm install --save linqts
```
or
```
yarn add linqts
```

## Sample

```javascript
import { List } from 'linqts';

let arr = new List<number>([1, 2, 3, 4, 5])
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
or
```
yarn test
```

Powered by [AVA](https://github.com/sindresorhus/ava)

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars0.githubusercontent.com/u/5127501?v=3" width="100px;"/><br /><sub>Flavio Corpa</sub>](http://flaviocorpa.com)<br />[💻](https://github.com/kutyel/linq.ts/commits?author=kutyel "Code") [💬](#question-kutyel "Answering Questions") [📖](https://github.com/kutyel/linq.ts/commits?author=kutyel "Documentation") [👀](#review-kutyel "Reviewed Pull Requests") | [<img src="https://avatars1.githubusercontent.com/u/5412470?v=3" width="100px;"/><br /><sub>Luis Rogelio Hernández López</sub>](https://github.com/Kurtz1993)<br />[💻](https://github.com/kutyel/linq.ts/commits?author=Kurtz1993 "Code") [🔧](#tool-Kurtz1993 "Tools") | [<img src="https://avatars3.githubusercontent.com/u/20083522?v=3" width="100px;"/><br /><sub>Zsolt Kovács</sub>](https://github.com/zskovacs)<br />[💻](https://github.com/kutyel/linq.ts/commits?author=zskovacs "Code") | [<img src="https://avatars2.githubusercontent.com/u/1510389?v=3" width="100px;"/><br /><sub>Mo Abbas</sub>](https://github.com/abbasmhd)<br />[💻](https://github.com/kutyel/linq.ts/commits?author=abbasmhd "Code") | [<img src="https://avatars3.githubusercontent.com/u/13154847?v=3" width="100px;"/><br /><sub>Julián Salgado Napolitano</sub>](https://euipo.europa.eu/ohimportal/404)<br />[💻](https://github.com/kutyel/linq.ts/commits?author=keropodium "Code") [🔧](#tool-keropodium "Tools") | [<img src="https://avatars0.githubusercontent.com/u/22657637?v=3" width="100px;"/><br /><sub>mstrzoda</sub>](https://github.com/mstrzoda)<br />[💻](https://github.com/kutyel/linq.ts/commits?author=mstrzoda "Code") [🐛](https://github.com/kutyel/linq.ts/issues?q=author%3Amstrzoda "Bug reports") [⚠️](https://github.com/kutyel/linq.ts/commits?author=mstrzoda "Tests") | [<img src="https://avatars0.githubusercontent.com/u/124676?v=3" width="100px;"/><br /><sub>Kyle Wascher</sub>](https://github.com/Zoxive)<br />[⚠️](https://github.com/kutyel/linq.ts/commits?author=Zoxive "Tests") |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| [<img src="https://avatars1.githubusercontent.com/u/8244919?v=3" width="100px;"/><br /><sub>James Richford</sub>](https://github.com/jamesrichford)<br />[🔧](#tool-jamesrichford "Tools") | [<img src="https://avatars1.githubusercontent.com/u/9244766?v=3" width="100px;"/><br /><sub>Natarajan Ganapathi</sub>](https://in.linkedin.com/in/natarajanganapathi)<br />[💻](https://github.com/kutyel/linq.ts/commits?author=natarajanmca11 "Code") [🔧](#tool-natarajanmca11 "Tools") | [<img src="https://avatars0.githubusercontent.com/u/797614?v=3" width="100px;"/><br /><sub>Jonas Brekle</sub>](https://github.com/jbrekle)<br />[💻](https://github.com/kutyel/linq.ts/commits?author=jbrekle "Code") [🐛](https://github.com/kutyel/linq.ts/issues?q=author%3Ajbrekle "Bug reports") |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

## License

MIT © [Flavio Corpa](http://flaviocorpa.com)
