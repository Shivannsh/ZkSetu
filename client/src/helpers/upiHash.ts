import { initializePoseidon, poseidon } from "./poseidonHash";

export async function generateUPIIdHash(rawId: string) {
  const processedUPIId = initializeRawUPIId(rawId);

  const chunkSize = 7;
  const packedUPIId = Bytes2Packed(chunkSize, processedUPIId);

  await initializePoseidon();
  const hashedUPIId = poseidon(packedUPIId);

  return hashedUPIId;
}

function initializeRawUPIId(rawId: string): number[] {
  const UPIId = rawId.split('').map(char => char.charCodeAt(0));
  
  // Insert `=\r\n` after the 14th element
  UPIId.splice(14, 0, 61, 13, 10);

  // Pad with zeros until length is 28
  while (UPIId.length < 28) {
    UPIId.push(0);
  }

  return UPIId;
}

function Bytes2Packed(chunkSize: number, circuitFormattedUPIId: number[]) {
    const out = [];
  
    for (let i = 0; i < circuitFormattedUPIId.length; i += chunkSize) {
      let packedValue = BigInt(0);
      for (let k = 0; k < chunkSize; k++) {
        if (i + k < circuitFormattedUPIId.length) {
          packedValue += BigInt(circuitFormattedUPIId[i + k]) * (BigInt(2) ** BigInt(k * 8));
        }
      }

      out.push(packedValue);
    }
  
    return out;
}
