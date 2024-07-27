import {test, expect, describe} from "@jest/globals";
import {get, set, unset} from "../src/utils/bit-manipulation-utils";

describe("Bit Manipulation Utility Tests", () => {

    test("Set bit Testing", () => {
        const byteVal = 170;
        expect(set(byteVal, 7)).toBe(byteVal + 1);
        expect(set(byteVal, 6)).toBe(byteVal);
        expect(set(byteVal, 1)).toBe(byteVal + (1 << 6));
        expect(set(byteVal, 4)).toBe(byteVal);
    });


    test("UnSet bit Testing", () => {
        const byteVal = 170;
        expect(unset(byteVal, 7)).toBe(byteVal);
        expect(unset(byteVal, 6)).toBe(byteVal - (1 << 1));
        expect(unset(byteVal, 1)).toBe(byteVal);
        expect(unset(byteVal, 4)).toBe(byteVal - (1 << 3));
    });

    test("Get bit Testing", () => {
        const byteVal = 170;
        expect(get(byteVal, 0)).toBe(1);
        expect(get(byteVal, 1)).toBe(0);
        expect(get(byteVal, 2)).toBe(1);
        expect(get(byteVal, 3)).toBe(0);
        expect(get(byteVal, 6)).toBe(1);
    });


})