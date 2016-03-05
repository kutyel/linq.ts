# LinQ for TypeScript

![linqts](https://raw.githubusercontent.com/kutyel/linq/master/linqts.png)

## Install

```
npm install linqts
```

## Usage

```ts
let arr = new List<number>([1,2,3,4,5])
    .Where(x => x > 3)
    .Select(y => y * 2)
    .ToArray(); // => [8, 10]
```

## Sample

[![https://gyazo.com/10fb5070746bc5251828cbd9033a69a8](https://i.gyazo.com/10fb5070746bc5251828cbd9033a69a8.gif)](https://gyazo.com/10fb5070746bc5251828cbd9033a69a8)

## Tests

```
npm test
```

Powered by [AVA](https://github.com/sindresorhus/ava)

## License

MIT © [Flavio Corpa](http://flaviocorpa.com)
