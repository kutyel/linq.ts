# LinQ for TypeScript

LinQ + TypeScript + Immutable

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

## Tests

```
npm test
```

Powered by [AVA](https://github.com/sindresorhus/ava)

## License

MIT © [Flavio Corpa](http://flaviocorpa.com)
