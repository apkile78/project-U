export type Mat4 = Float32Array;

export const mat4Identity = (): Mat4 => new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);

export function mat4Multiply(out: Mat4, a: Mat4, b: Mat4): Mat4 {
  for (let column = 0; column < 4; column += 1) {
    const offset = column * 4;
    const b0 = b[offset]; const b1 = b[offset + 1]; const b2 = b[offset + 2]; const b3 = b[offset + 3];
    out[offset] = a[0] * b0 + a[4] * b1 + a[8] * b2 + a[12] * b3;
    out[offset + 1] = a[1] * b0 + a[5] * b1 + a[9] * b2 + a[13] * b3;
    out[offset + 2] = a[2] * b0 + a[6] * b1 + a[10] * b2 + a[14] * b3;
    out[offset + 3] = a[3] * b0 + a[7] * b1 + a[11] * b2 + a[15] * b3;
  }
  return out;
}

export function mat4Perspective(out: Mat4, fovRadians: number, aspect: number, near: number, far: number): Mat4 {
  const f = 1 / Math.tan(fovRadians / 2);
  out.fill(0);
  out[0] = f / aspect; out[5] = f; out[10] = (far + near) / (near - far); out[11] = -1; out[14] = (2 * far * near) / (near - far);
  return out;
}

export function mat4LookAt(out: Mat4, eye: readonly number[], target: readonly number[], up: readonly number[]): Mat4 {
  let zx = eye[0] - target[0]; let zy = eye[1] - target[1]; let zz = eye[2] - target[2];
  const zLength = Math.hypot(zx, zy, zz) || 1; zx /= zLength; zy /= zLength; zz /= zLength;
  let xx = up[1] * zz - up[2] * zy; let xy = up[2] * zx - up[0] * zz; let xz = up[0] * zy - up[1] * zx;
  const xLength = Math.hypot(xx, xy, xz) || 1; xx /= xLength; xy /= xLength; xz /= xLength;
  const yx = zy * xz - zz * xy; const yy = zz * xx - zx * xz; const yz = zx * xy - zy * xx;
  out.set([xx, yx, zx, 0, xy, yy, zy, 0, xz, yz, zz, 0, -(xx * eye[0] + xy * eye[1] + xz * eye[2]), -(yx * eye[0] + yy * eye[1] + yz * eye[2]), -(zx * eye[0] + zy * eye[1] + zz * eye[2]), 1]);
  return out;
}

export function mat4Model(out: Mat4, x: number, y: number, z: number, sx: number, sy: number, sz: number): Mat4 {
  out.set([sx, 0, 0, 0, 0, sy, 0, 0, 0, 0, sz, 0, x, y, z, 1]);
  return out;
}
