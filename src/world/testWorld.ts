import type { DrawBox } from '../engine/renderer';

const hash = (x: number, z: number): number => { let value = Math.imul(x, 374761393) ^ Math.imul(z, 668265263); value = Math.imul(value ^ (value >>> 13), 1274126177); return ((value ^ (value >>> 16)) >>> 0) / 4294967296; };

export function createTestWorld(): DrawBox[] {
  const boxes: DrawBox[] = [{ x: 0, y: -0.35, z: 0, width: 700, height: 0.7, depth: 700, color: [0.14, 0.23, 0.18] }];
  for (let x = -28; x <= 28; x += 1) for (let z = -28; z <= 28; z += 1) {
    const value = hash(x, z); const distance = Math.hypot(x, z); if (distance < 5 || value < 0.42) continue;
    if (Math.abs(x) < 2 || Math.abs(z) < 2) continue;
    if (value > 0.84 && distance < 42) { const height = 4 + hash(x + 7, z - 11) * 12; boxes.push({ x: x * 3.6, y: 0, z: z * 3.6, width: 5 + hash(x, z + 2) * 4, height, depth: 5 + hash(x - 4, z) * 4, color: [0.21 + value * 0.12, 0.24 + value * 0.1, 0.23 + value * 0.09] }); }
    else if (value > 0.56) { const height = 4 + hash(x - 5, z + 4) * 3; boxes.push({ x: x * 3.6, y: 0, z: z * 3.6, width: 3.4, height, depth: 4.4, color: [0.34, 0.29, 0.23] }); }
    else { const height = 5 + hash(x, z) * 5; boxes.push({ x: x * 3.6, y: 0, z: z * 3.6, width: 1.2, height, depth: 1.2, color: [0.08, 0.22 + value * 0.1, 0.1] }); boxes.push({ x: x * 3.6, y: height, z: z * 3.6, width: 4.2, height: 2.8, depth: 4.2, color: [0.09, 0.29 + value * 0.12, 0.12] }); }
  }
  boxes.push({ x: 0, y: 0, z: 0, width: 1.1, height: 2.1, depth: 1.1, color: [0.82, 0.33, 0.16] });
  return boxes;
}
