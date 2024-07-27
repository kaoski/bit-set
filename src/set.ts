import BitArray from "./bit-array";
import { BITS_PER_BYTE, MAX_BYTE_VALUE } from "./constants/constants";

export default class BitSet {

    private bitArray: BitArray;
    private size: number;

    constructor(size: number = 0){ 
        this.size = size;
        this.bitArray = new BitArray(size);
    }

    from(...elements: number[]): BitSet {return new BitSet(0)}

    add(element: number){
        this.bitArray.set(element);
    }

    addRange(start: number, end: number){
        const startByteOffset = BitArray.getByteOffset(start);
        const startBitOffset = BitArray.getBitOffset(start);
        const endByteOffset = BitArray.getByteOffset(end);
        const endBitOffset = BitArray.getBitOffset(end);
        
        for (let bitOffset = startBitOffset; bitOffset < BITS_PER_BYTE; bitOffset++) {
            const index = BitArray.getIndex(startByteOffset, bitOffset);
            this.bitArray.set(index);
        }

        for (let bitOffset = 0 ; bitOffset <= endBitOffset; bitOffset++) {
            const index = BitArray.getIndex(endByteOffset, bitOffset);
            this.bitArray.set(index);
        }

        for (let byteOffset = startByteOffset + 1 ; byteOffset <= endByteOffset - 1 ; byteOffset++) {
            this.bitArray.setByte(MAX_BYTE_VALUE, byteOffset)
        }
    }

    public countSetBits(): number {
        return this.bitArray.countSetBits();
    }

    deleteRange(start: number, end: number){}

    delete(element: number){
        this.bitArray.unset(element);
    }

    has(element: number): boolean{
        return this.bitArray.get(element) == 1; 
    }

    isSubSet(s2: BitSet): boolean { return  false; }

    union(s2: BitSet): BitSet {return new BitSet()}

    intersection(s2: BitSet): BitSet {return new BitSet();}

}