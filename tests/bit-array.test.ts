import {test, expect, describe} from "@jest/globals";
import BitArray from "../src/bit-array"

describe(("Test BitArray Functionality"), () => {

    test("Test Create BitArray using from()", () => {
        const bitArrayString = "1101011001110101011011101111110";
        const bitArray = BitArray.from(bitArrayString);
        expect(bitArray.toString()).toBe(bitArrayString);
    });

    test("Test BitArray getSize() method", () => {
        const bitArrayString = "1101011001110101011011101111110";
        const bitArray = BitArray.from(bitArrayString);
        expect(bitArray.getSize()).toBe(bitArrayString.length);
    });

    test("Test BitArray ToString Operation", () => {
        const bitArrayString = "1101011001110101011011101111110";
        const bitArray = BitArray.from(bitArrayString);
        expect(bitArray.toString()).toBe(bitArrayString);
    });

    test("Test BitArray Get Operation", () => {
        const bitArrayString = "1101011001110101011011101111110";
        const bitArray = BitArray.from(bitArrayString);
        for (const [index,char] of Array.from(bitArrayString).entries()) {
            expect(bitArray.get(index).toString()).toBe(char);
        }
    });
    
    test("Test BitArray Set Operation", () => {
        const bitArrayString = "1101011001110101011011101111110";
        const bitArray = BitArray.from(bitArrayString);
        let setBitCount = 0;
        for (const [index,char] of Array.from(bitArray.toString()).entries()) {
            if (char === "0") {
                bitArray.set(index);
            }
            setBitCount++; 
        }
        expect(setBitCount).toBe(bitArray.toString().length);
    });


    test("Test BitArray Unset Operation", () => {
        const bitArrayString = "1101011001110101011011101111110";
        const bitArray = BitArray.from(bitArrayString);
        let unsetBitCount = 0;
        for (const [index,char] of Array.from(bitArray.toString()).entries()) {
            if (char === "1") {
                bitArray.unset(index);
            }
            unsetBitCount++; 
        }
        expect(unsetBitCount).toBe(bitArray.toString().length);
    });

    test("Test BitArray Count Set Bits Operation", () => {
        const bitArrayString = "1101011001110101011011101111110";
        const bitArray = BitArray.from(bitArrayString);
        let setBitCount = 0;
        for (const [index,char] of Array.from(bitArray.toString()).entries()) {
            if (char === "1") {
                setBitCount++;
            }
        }
        expect(bitArray.countSetBits()).toBe(setBitCount);
    });

    // test("Test BitArray And Operation", () => {
    //     const bitArrayString = "1101011001110101011011101111110";
    //     const otherBitArrayString = "0010100110001010100100010000001"
    //     const bitArray = BitArray.from(bitArrayString);
    //     const otherBitArray = BitArray.from(otherBitArrayString);
    //     const newBitArray = bitArray.and(otherBitArray);
    //     expect(newBitArray.countSetBits()).toBe(0);
    // });

    // test("Test BitArray And Operation with different BitArray sizes", () => {
    //     const bitArrayString = "1101011001110101011011101111110";
    //     const otherBitArrayString = "00101001100010101001000100000011111000"
    //     const bitArray = BitArray.from(bitArrayString);
    //     const otherBitArray = BitArray.from(otherBitArrayString);
    //     expect(() => {
    //         bitArray.and(otherBitArray)
    //     }).toThrow(new Error("Size not Matching"))
    // });

    // test("Test BitArray Or Operation", () => {
    //     const bitArrayString = "1101011001110101011011101111110";
    //     const otherBitArrayString = "0010100110001010100100010000001"
    //     const bitArray = BitArray.from(bitArrayString);
    //     const otherBitArray = BitArray.from(otherBitArrayString);
    //     const newBitArray = bitArray.or(otherBitArray);
    //     expect(newBitArray.countSetBits()).toBe(otherBitArrayString.length);
    // });

    // test("Test BitArray Or Operation with different BitArray sizes", () => {
    //     const BitArrayString = "1101011001110101011011101111110";
    //     const otherBitArrayString = "00101001100010101001000100000011111000"
    //     const bitArray = BitArray.from(BitArrayString);
    //     const otherBitArray = BitArray.from(otherBitArrayString);
    //     expect(() => {
    //         bitArray.or(otherBitArray)
    //     }).toThrow(new Error("Size not Matching"))
    // });

    test("Test BitArray Invert Bits Operation", () => {
        const BitArrayString = "1101011001110101011011101111110";
        const bitArray = BitArray.from(BitArrayString);
        const otherBitArray = BitArray.from(BitArrayString);
        otherBitArray.invertBits();
        const newBitArray = bitArray.and(otherBitArray);
        expect(newBitArray.countSetBits()).toBe(0);
    });

    test("Test BitArray Reset Operation", () => {
        const bitArrayString = "1101011001110101011011101111110";
        const bitArray = BitArray.from(bitArrayString);
        bitArray.reset();
        expect(bitArray.countSetBits()).toBe(0);
    });


    test("Test BitArray Clone Operation", () => {
        const bitArrayString = "1101011001110101011011101111110";
        const bitArray = BitArray.from(bitArrayString);
        const otherBitArray = bitArray.clone();
        expect(otherBitArray.toString()).toBe(bitArray.toString());
    });

});