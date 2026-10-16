# Benchmarks

```sh
$ npm run bench
```

Results below are from one local run on Node v22.22.3 and will vary by machine. Heap deltas need `node --expose-gc`.

| Task | ops/sec | Margin |
| --- | ---: | ---: |
| Where-Select-ToArray n=1000 | 272862 | ± 0.18% |
| Where-Select-ToArray n=10000 | 34179 | ± 0.42% |
| Where-Select-ToArray n=100000 | 869 | ± 2.91% |
| Count n=1000 | 1475673 | ± 0.12% |
| Count n=10000 | 197087 | ± 0.21% |
| Count n=100000 | 19459 | ± 0.74% |
| Sum n=1000 | 1322622 | ± 0.08% |
| Sum n=10000 | 143096 | ± 0.21% |
| Sum n=100000 | 13965 | ± 0.76% |
| Average n=1000 | 1609645 | ± 0.03% |
| Average n=10000 | 175533 | ± 0.08% |
| Average n=100000 | 17009 | ± 0.30% |
| First n=1000 | 15029061 | ± 0.03% |
| First n=10000 | 15443851 | ± 0.03% |
| First n=100000 | 16406251 | ± 0.03% |
| SelectMany n=1000 | 99598 | ± 0.17% |
| SelectMany n=10000 | 6917 | ± 0.78% |
| SelectMany n=100000 | 493 | ± 4.66% |
| Join n=1000 | 60287 | ± 0.42% |
| Join n=10000 | 10275 | ± 0.65% |
| Join n=100000 | 861 | ± 2.41% |
| Distinct n=1000 | 166167 | ± 0.08% |
| Distinct n=10000 | 19318 | ± 0.20% |
| Distinct n=100000 | 1818 | ± 1.32% |
| Distinct-objects n=1000 | 7684 | ± 0.49% |
| Distinct-objects n=10000 | 715 | ± 1.73% |
| Distinct-objects n=100000 | 70 | ± 4.25% |
| DistinctBy n=1000 | 220989 | ± 0.04% |
| DistinctBy n=10000 | 22651 | ± 0.33% |
| DistinctBy n=100000 | 2274 | ± 0.86% |
| Except n=1000 | 60546 | ± 0.14% |
| Except n=10000 | 2568 | ± 0.98% |
| Except n=100000 | 185 | ± 4.06% |
| Intersect n=1000 | 60130 | ± 0.15% |
| Intersect n=10000 | 2522 | ± 1.08% |
| Intersect n=100000 | 194 | ± 3.54% |
| ToDictionary n=1000 | 334446 | ± 0.12% |
| ToDictionary n=10000 | 47438 | ± 0.38% |
| ToDictionary n=100000 | 2049 | ± 8.83% |
| AddRange n=1000 | 322244 | ± 0.09% |
| AddRange n=10000 | 48515 | ± 0.22% |
| AddRange n=100000 | 2057 | ± 1.80% |
| SkipWhile n=1000 | 2202051 | ± 0.08% |
| SkipWhile n=10000 | 872666 | ± 0.10% |
| SkipWhile n=100000 | 9109 | ± 0.75% |
| TakeWhile n=1000 | 3933069 | ± 0.06% |
| TakeWhile n=10000 | 3527740 | ± 0.07% |
| TakeWhile n=100000 | 3720906 | ± 0.06% |
| ToArray n=1000 | 5485487 | ± 0.12% |
| ToArray n=10000 | 875934 | ± 0.20% |
| ToArray n=100000 | 10013 | ± 0.70% |

## Comparison with the previous version

Current code is commit 1de8ca1 (Refactor(list): improve list operator performance) and previous code is a96e508; ratio is current ops/sec divided by previous ops/sec, and a value above 1 means the current code is faster. Join n=100000 was not measured on the previous code because one Join at n=10000 already took about 88 seconds.

| Task | Before (ops/sec) | After (ops/sec) | Ratio |
| --- | ---: | ---: | ---: |
| Where-Select-ToArray n=1000 | 111346 | 256607 | 2.30× |
| Where-Select-ToArray n=10000 | 14006 | 30916 | 2.21× |
| Where-Select-ToArray n=100000 | 703 | 783 | 1.11× |
| Count n=1000 | 246115 | 1724570 | 7.01× |
| Count n=10000 | 39328 | 211646 | 5.38× |
| Count n=100000 | 1438 | 21183 | 14.7× |
| Sum n=1000 | 254351 | 1414452 | 5.56× |
| Sum n=10000 | 32319 | 149940 | 4.64× |
| Sum n=100000 | 664 | 14539 | 21.9× |
| Average n=1000 | 1600381 | 1569736 | 0.98× |
| Average n=10000 | 173651 | 158943 | 0.92× |
| Average n=100000 | 17896 | 16611 | 0.93× |
| First n=1000 | 824131 | 13335074 | 16.2× |
| First n=10000 | 76261 | 14650265 | 192× |
| First n=100000 | 8678 | 15410346 | 1,776× |
| SelectMany n=1000 | 136 | 96383 | 709× |
| SelectMany n=10000 | 1.74 | 6458 | 3,716× |
| SelectMany n=100000 | 0.00930 | 431 | 46,300× |
| Join n=1000 | 1.36 | 72448 | 53,400× |
| Join n=10000 | 0.0114 | 10761 | 946,000× |
| Join n=100000 | — | 830 | — |
| Distinct n=1000 | 74451 | 164174 | 2.21× |
| Distinct n=10000 | 7301 | 19071 | 2.61× |
| Distinct n=100000 | 498 | 1936 | 3.89× |
| Distinct-objects n=1000 | 1061 | 6997 | 6.59× |
| Distinct-objects n=10000 | 106 | 724 | 6.83× |
| Distinct-objects n=100000 | 10 | 70 | 7.00× |
| DistinctBy n=1000 | 95866 | 203320 | 2.12× |
| DistinctBy n=10000 | 14060 | 22516 | 1.60× |
| DistinctBy n=100000 | 1505 | 2277 | 1.51× |
| Except n=1000 | 2796 | 58579 | 21.0× |
| Except n=10000 | 28 | 2513 | 89.8× |
| Except n=100000 | 0.286 | 193 | 675× |
| Intersect n=1000 | 2582 | 56310 | 21.8× |
| Intersect n=10000 | 29 | 2426 | 83.7× |
| Intersect n=100000 | 0.283 | 191 | 675× |
| ToDictionary n=1000 | 94 | 317396 | 3,380× |
| ToDictionary n=10000 | 0.846 | 44878 | 53,100× |
| ToDictionary n=100000 | 0.00469 | 2007 | 428,000× |
| AddRange n=1000 | 843564 | 297354 | 0.35× |
| AddRange n=10000 | 65079 | 47366 | 0.73× |
| AddRange n=100000 | 926 | 2043 | 2.21× |
| SkipWhile n=1000 | 385188 | 2271011 | 5.90× |
| SkipWhile n=10000 | 61033 | 831051 | 13.6× |
| SkipWhile n=100000 | 2073 | 10631 | 5.13× |
| TakeWhile n=1000 | 947823 | 4448445 | 4.69× |
| TakeWhile n=10000 | 94965 | 4283643 | 45.1× |
| TakeWhile n=100000 | 11023 | 3727588 | 338× |
| ToArray n=1000 | 14199396 | 7094993 | 0.50× |
| ToArray n=10000 | 13780663 | 1008925 | 0.073× |
| ToArray n=100000 | 13640263 | 10465 | 0.000767× |

ToArray is slower because it now returns a copy. The previous method returned the internal array.

AddRange is slower at 1,000 and 10,000 items and faster at 100,000. It appends one item at a time so a very large list can be added.
