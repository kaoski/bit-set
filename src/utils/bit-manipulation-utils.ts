const BYTE_COUNT = 8;

export function isValidByte(byte: number): boolean {
    if (byte < 0 || byte > 255) {
        return false;
    }
    return true;
}

export function isValidBitOffset(bitOffset: number): boolean {
    if (bitOffset < 0 || bitOffset > 7) {
        return false;
    }
    return true;
}

export function set(byte: number, bitOffset: number): number {
    if (!isValidByte(byte)) {
        throw new Error("Invalid Byte");
    }
    if (!isValidBitOffset(bitOffset)) {
        throw new Error("Invalid Bit Offset");
    }
    return byte | (1 << (7 - bitOffset));
}

export function unset(byte: number, bitOffset: number): number {
    if (!isValidByte(byte)) {
        throw new Error("Invalid Byte");
    }
    if (!isValidBitOffset(bitOffset)) {
        throw new Error("Invalid Bit Offset");
    }
    return byte & ( 255 - (1 << (7 - bitOffset)));
}

export function get(byte: number, bitOffset: number): number {
    if (!isValidByte(byte)) {
        throw new Error("Invalid Byte");
    }
    if (!isValidBitOffset(bitOffset)) {
        throw new Error("Invalid Bit Offset");
    }
    return (byte & (1 << (7 - bitOffset))) > 0 ? 1 : 0;
}