# LinQ for TypeScript

[![Build](https://github.com/kutyel/linq.ts/actions/workflows/main.yml/badge.svg?branch=master)](https://github.com/kutyel/linq.ts/actions/workflows/main.yml)
[![Dependencies](https://img.shields.io/david/kutyel/linq.ts.svg)](https://david-dm.org/kutyel/linq.ts)
[![Coverage Status](https://coveralls.io/repos/github/kutyel/linq.ts/badge.svg?branch=master)](https://coveralls.io/github/kutyel/linq.ts?branch=master)
[![Downloads](https://img.shields.io/npm/dm/linqts.svg)](https://npmjs.com/package/linqts)
[![Version](https://img.shields.io/npm/v/linqts.svg)](https://npmjs.com/package/linqts)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg)](https://paypal.me/flaviocorpa)
[![linqts](https://raw.githubusercontent.com/kutyel/linq/master/linqts.png)](http://www.typescriptlang.org)

## Install

```sh
$ npm i linqts
```

## Usage

```typescript
import { List } from 'linqts';

const arr = new List<number>([1, 2, 3, 4, 5])
  .Where(x => x > 3)
  .Select(y => y * 2)
  .ToArray(); // > [8, 10]

const query = people.Join(pets,
  person => person,
  pet => pet.Owner,
  (person, pet) =>
    ({ OwnerName: person.Name, Pet: pet.Name }));
```

## Demo

![linqts.gif](https://raw.githubusercontent.com/kutyel/linq/master/linqts.gif)

## Documentation

If you do not know LinQ or just want to remember what is all about, have a look at the [docs](http://kutyel.github.io/linq.ts/docs/classes/list/index.html).

## Tests

```sh
$ npm t
```

Powered by [AVA](https://github.com/sindresorhus/ava).

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://flaviocorpa.com"><img src="https://avatars0.githubusercontent.com/u/5127501?v=3?s=100" width="100px;" alt=""/><br /><sub><b>Flavio Corpa</b></sub></a><br /><a href="https://github.com/kutyel/linq.ts/commits?author=kutyel" title="Code">💻</a> <a href="#question-kutyel" title="Answering Questions">💬</a> <a href="https://github.com/kutyel/linq.ts/commits?author=kutyel" title="Documentation">📖</a> <a href="https://github.com/kutyel/linq.ts/pulls?q=is%3Apr+reviewed-by%3Akutyel" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/Kurtz1993"><img src="https://avatars1.githubusercontent.com/u/5412470?v=3?s=100" width="100px;" alt=""/><br /><sub><b>Luis Rogelio Hernández López</b></sub></a><br /><a href="https://github.com/kutyel/linq.ts/commits?author=Kurtz1993" title="Code">💻</a> <a href="#tool-Kurtz1993" title="Tools">🔧</a></td>
    <td align="center"><a href="https://github.com/zskovacs"><img src="https://avatars3.githubusercontent.com/u/20083522?v=3?s=100" width="100px;" alt=""/><br /><sub><b>Zsolt Kovács</b></sub></a><br /><a href="https://github.com/kutyel/linq.ts/commits?author=zskovacs" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/abbasmhd"><img src="https://avatars2.githubusercontent.com/u/1510389?v=3?s=100" width="100px;" alt=""/><br /><sub><b>Mo Abbas</b></sub></a><br /><a href="https://github.com/kutyel/linq.ts/commits?author=abbasmhd" title="Code">💻</a></td>
    <td align="center"><a href="https://euipo.europa.eu/ohimportal/404"><img src="https://avatars3.githubusercontent.com/u/13154847?v=3?s=100" width="100px;" alt=""/><br /><sub><b>Julián Salgado Napolitano</b></sub></a><br /><a href="https://github.com/kutyel/linq.ts/commits?author=keropodium" title="Code">💻</a> <a href="#tool-keropodium" title="Tools">🔧</a></td>
    <td align="center"><a href="https://github.com/mstrzoda"><img src="https://avatars0.githubusercontent.com/u/22657637?v=3?s=100" width="100px;" alt=""/><br /><sub><b>mstrzoda</b></sub></a><br /><a href="https://github.com/kutyel/linq.ts/commits?author=mstrzoda" title="Code">💻</a> <a href="https://github.com/kutyel/linq.ts/issues?q=author%3Amstrzoda" title="Bug reports">🐛</a> <a href="https://github.com/kutyel/linq.ts/commits?author=mstrzoda" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/Zoxive"><img src="https://avatars0.githubusercontent.com/u/124676?v=3?s=100" width="100px;" alt=""/><br /><sub><b>Kyle Wascher</b></sub></a><br /><a href="https://github.com/kutyel/linq.ts/commits?author=Zoxive" title="Tests">⚠️</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/jamesrichford"><img src="https://avatars1.githubusercontent.com/u/8244919?v=3?s=100" width="100px;" alt=""/><br /><sub><b>James Richford</b></sub></a><br /><a href="#tool-jamesrichford" title="Tools">🔧</a></td>
    <td align="center"><a href="https://in.linkedin.com/in/natarajanganapathi"><img src="https://avatars1.githubusercontent.com/u/9244766?v=3?s=100" width="100px;" alt=""/><br /><sub><b>Natarajan Ganapathi</b></sub></a><br /><a href="https://github.com/kutyel/linq.ts/commits?author=natarajanmca11" title="Code">💻</a> <a href="#tool-natarajanmca11" title="Tools">🔧</a></td>
    <td align="center"><a href="https://github.com/jbrekle"><img src="https://avatars0.githubusercontent.com/u/797614?v=3?s=100" width="100px;" alt=""/><br /><sub><b>Jonas Brekle</b></sub></a><br /><a href="https://github.com/kutyel/linq.ts/commits?author=jbrekle" title="Code">💻</a> <a href="https://github.com/kutyel/linq.ts/issues?q=author%3Ajbrekle" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/grofit"><img src="https://avatars3.githubusercontent.com/u/927201?v=4?s=100" width="100px;" alt=""/><br /><sub><b>LP</b></sub></a><br /><a href="https://github.com/kutyel/linq.ts/commits?author=grofit" title="Code">💻</a> <a href="https://github.com/kutyel/linq.ts/commits?author=grofit" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/asierferro"><img src="https://avatars3.githubusercontent.com/u/1768777?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Asier Ferro</b></sub></a><br /><a href="https://github.com/kutyel/linq.ts/commits?author=asierferro" title="Code">💻</a> <a href="#tool-asierferro" title="Tools">🔧</a></td>
    <td align="center"><a href="https://github.com/marlon-tucker"><img src="https://avatars2.githubusercontent.com/u/1166915?v=4?s=100" width="100px;" alt=""/><br /><sub><b>marlon-tucker</b></sub></a><br /><a href="https://github.com/kutyel/linq.ts/commits?author=marlon-tucker" title="Code">💻</a> <a href="#tool-marlon-tucker" title="Tools">🔧</a> <a href="#platform-marlon-tucker" title="Packaging/porting to new platform">📦</a></td>
    <td align="center"><a href="https://github.com/SkeletonSkelettron"><img src="https://avatars2.githubusercontent.com/u/26940527?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Misha Sulikashvili</b></sub></a><br /><a href="https://github.com/kutyel/linq.ts/commits?author=SkeletonSkelettron" title="Code">💻</a> <a href="https://github.com/kutyel/linq.ts/commits?author=SkeletonSkelettron" title="Tests">⚠️</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/mrsauravsahu"><img src="https://avatars.githubusercontent.com/u/9134050?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Saurav Sahu</b></sub></a><br /><a href="#infra-mrsauravsahu" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    <td align="center"><a href="https://github.com/typescriptbob"><img src="https://avatars.githubusercontent.com/u/57693517?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Bob Cook</b></sub></a><br /><a href="#financial-typescriptbob" title="Financial">💵</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

## License

MIT © [Flavio Corpa](http://flaviocorpa.com)
