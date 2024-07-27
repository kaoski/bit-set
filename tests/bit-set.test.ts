import BitSet from "../src/set"

describe("Test Bit Set", () => {

    test("Test Add method", () => {
        const set = new BitSet(0);
        const element = Math.ceil(Math.random() * 1000);
        set.add(element);
        expect(set.has(element)).toBe(true);
    });

    test("Test Delete method", () => {
        const set = new BitSet(0);
        const element = Math.ceil(Math.random() * 1000);
        set.add(element);
        set.delete(element)
        expect(set.has(element)).toBe(false);
    });

    test("Test Add Range method", () => {
        const set = new BitSet(0);
        const start = 1, end = 100;
        const randIndex = Math.floor(Math.random() * (end - start)) + start;
        set.addRange(start, end);
        expect(set.has(randIndex)).toBe(true);
        expect(set.countSetBits()).toBe(end - start + 1);
    });


});