import test from "ava";
import {Enumerable} from "../linq";

test("Range", t => {
    let test = Enumerable.Range(20, 5);
    t.is(test.next().value, 20);
    t.is(test.next().value, 21);
    t.is(test.next().value, 22);
    t.is(test.next().value, 23);
    t.is(test.next().value, 24);
});

test("Repeat", t => {
    let test = Enumerable.Repeat("I like programming.", 3);
    t.is(test.next().value, "I like programming.");
    t.is(test.next().value, "I like programming.");
    t.is(test.next().value, "I like programming.");
});
