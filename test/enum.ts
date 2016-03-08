import test from "ava";
import {Enumerable} from "../linq";

test("Range", t => {
    let test: string = "";
    for (let it of Enumerable.Range(20, 5)) {
        test += `${it},`;
    }
    t.is(test, "20,21,22,23,24,");
});

test("Repeat", t => {
    let test: string = "";
    for (let it of Enumerable.Repeat("I like programming.", 3)) {
        test += it;
    }
    t.is(test, "I like programming.I like programming.I like programming.");
});
