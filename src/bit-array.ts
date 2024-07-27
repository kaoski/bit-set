import { get, isValidByte, set, unset } from "./utils/bit-manipulation-utils";
import {BITS_PER_BYTE} from "./constants/constants";

export default class BitArray {

    private bitArray: Uint8Array;
    private size: number;

    constructor(size: number) {
        this.size = size;
        this.bitArray = BitArray.createBitArray(size);
    }

    private static createBitArray(size: number): Uint8Array {
        const byteCount = Math.ceil(size / BITS_PER_BYTE);
        const bitArray = new Uint8Array(byteCount);
        bitArray.fill(0);
        return bitArray;
    }

    public getSize(): number {
        return this.size;
    }

    public static getIndex(byteOffset: number, bitOffset: number) {
        return byteOffset * BITS_PER_BYTE + bitOffset;
    }

    private getMaxIndex(): number {
        return (this.lastByteIndex()) * BITS_PER_BYTE + (BITS_PER_BYTE - 1); 
    }

    private lastByteIndex(): number {
        return this.bitArray.length - 1;
    }

    public static getByteOffset(index: number): number {
        return Math.floor(index / BITS_PER_BYTE);
    }

    public static getBitOffset(index: number): number {
        return index % BITS_PER_BYTE;
    }

    private isIndexOutOfRange(index: number): boolean {
        return index > this.getMaxIndex();
    }


    public get(index: number): number {
        const byteOffset = BitArray.getByteOffset(index);
        const bitOffset  = BitArray.getBitOffset(index);
        const byte = this.bitArray[byteOffset];
        return get(byte, bitOffset);
    }

    public set(index: number) {
        if (this.isIndexOutOfRange(index)) {
            this.resize(index);
        }
        const byteOffset = BitArray.getByteOffset(index);
        const bitOffset  = BitArray.getBitOffset(index);
        let byte = this.bitArray[byteOffset];
        byte = set(byte, bitOffset);
        this.bitArray[byteOffset] = byte;
    }


    public setByte(byte: number, byteIndex: number){
        if (!isValidByte(byte)) {
            throw new Error("Invalid Byte");
        }
        if (this.isIndexOutOfRange(byteIndex)) {
            this.resize(byteIndex);
        }
        this.bitArray[byteIndex] = byte;  
    }

    public unset(index: number) {
        const byteOffset = BitArray.getByteOffset(index);
        const bitOffset  = BitArray.getBitOffset(index);
        let byte = this.bitArray[byteOffset];
        byte = unset(byte, bitOffset);
        this.bitArray[byteOffset] = byte;

    }

    public countSetBits(): number {
        let setBitCount = 0;
        for (const byte of this.bitArray) {
            for (let i = 0 ; i < BITS_PER_BYTE; i++) {
                if ((byte & (1 << i)) > 0) {
                    setBitCount++;
                }
            }
        }
        return setBitCount;
    }

    public invertBits(){
        for (let i = 0 ; i < this.size; i++) {
            if (this.get(i) === 1) {
                this.unset(i);
            } else {
                this.set(i)
            }
        }
    }

    public reset() {
        this.bitArray.fill(0);
    };

    public clone(): BitArray {
        return BitArray.from(this.toString());
    };

    public and(otherBitArray: BitArray): BitArray { 
        let newBitArray = "";
        for (let i = 0 ; i < this.getSize() && i < otherBitArray.getSize(); i++) {
            if (this.get(i) === 0 || otherBitArray.get(i) === 0) {
                newBitArray += "0";
            } else {
                newBitArray += "1";
            }
        }
        return BitArray.from(newBitArray);
    }

    public or(otherBitArray: BitArray): BitArray {
        let newBitArray = "";
        for (let i = 0 ; i < this.getSize() && i < otherBitArray.getSize(); i++) {
            if (this.get(i) === 1 || otherBitArray.get(i) === 1) {
                newBitArray += "1";
            } else {
                newBitArray += "0";
            }
        }
        return BitArray.from(newBitArray);
    }

    public toString(): string {
        let stringVal = "";
        for (let i = 0 ; i < this.getSize(); i++) {
            stringVal += this.get(i);
        }
        return stringVal;
    };

    public static from(str: string): BitArray{
        const size = str.length;
        const bitArray = new BitArray(size);
        for (let i = 0 ; i < size; i++) {
            if (str.charAt(i) === "1") {
                bitArray.set(i);
            } else {
                bitArray.unset(i);
            }
        }
        return bitArray;
    }

    resize(newSize: number) {
        let currentSize = this.size === 0 ? 1 : this.size;
        while (currentSize <= newSize) {
            currentSize = currentSize * 2;
        }
        let newBitArray = BitArray.createBitArray(currentSize);
        for (const [index, byte] of this.bitArray.entries()) {
            newBitArray [ index ] = byte;
        }
        this.bitArray = newBitArray;
    }
}