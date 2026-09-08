import { mat4Identity, mat4Model, mat4Multiply, mat4Perspective, mat4LookAt } from './math';

export interface DrawBox { x: number; y: number; z: number; width: number; height: number; depth: number; color: readonly [number, number, number]; }
export interface Camera { target: [number, number, number]; yaw: number; pitch: number; distance: number; }

const VERTEX_SHADER = `#version 300 es
in vec3 a_position; in vec3 a_normal;
uniform mat4 u_matrix; uniform mat4 u_model;
out vec3 v_normal; out vec3 v_world;
void main() { vec4 world = u_model * vec4(a_position, 1.0); v_world = world.xyz; v_normal = mat3(u_model) * a_normal; gl_Position = u_matrix * world; }`;
const FRAGMENT_SHADER = `#version 300 es
precision highp float;
in vec3 v_normal; in vec3 v_world;
uniform vec3 u_color; uniform vec3 u_sun; uniform vec3 u_fog; uniform float u_fogNear; uniform float u_fogFar;
out vec4 outColor;
void main() { float light = max(dot(normalize(v_normal), normalize(u_sun)), 0.0) * 0.62 + 0.38; float dist = length(v_world.xz); float fog = smoothstep(u_fogNear, u_fogFar, dist); outColor = vec4(mix(u_color * light, u_fog, fog), 1.0); }`;

function shader(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader {
  const result = gl.createShader(type); if (!result) throw new Error('Unable to allocate shader.');
  gl.shaderSource(result, source); gl.compileShader(result);
  if (!gl.getShaderParameter(result, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(result) ?? 'Shader compilation failed.');
  return result;
}

export class Renderer {
  private readonly gl: WebGL2RenderingContext;
  private readonly program: WebGLProgram;
  private readonly vao: WebGLVertexArrayObject;
  private readonly matrix = mat4Identity(); private readonly projection = mat4Identity(); private readonly view = mat4Identity(); private readonly model = mat4Identity();
  private readonly matrixLocation: WebGLUniformLocation; private readonly modelLocation: WebGLUniformLocation; private readonly colorLocation: WebGLUniformLocation;
  private readonly sunLocation: WebGLUniformLocation; private readonly fogLocation: WebGLUniformLocation; private readonly fogNearLocation: WebGLUniformLocation; private readonly fogFarLocation: WebGLUniformLocation;
  private highQuality = true;

  constructor(private readonly canvas: HTMLCanvasElement) {
    const gl = canvas.getContext('webgl2', { antialias: true, alpha: false }); if (!gl) throw new Error('WebGL 2 is unavailable.'); this.gl = gl;
    const program = gl.createProgram(); if (!program) throw new Error('Unable to allocate shader program.'); this.program = program;
    gl.attachShader(program, shader(gl, gl.VERTEX_SHADER, VERTEX_SHADER)); gl.attachShader(program, shader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER)); gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) ?? 'Program link failed.');
    const vao = gl.createVertexArray(); const buffer = gl.createBuffer(); if (!vao || !buffer) throw new Error('Unable to allocate geometry buffers.'); this.vao = vao;
    const cube = new Float32Array([
      -0.5,-0.5, 0.5,0,0,1, 0.5,-0.5, 0.5,0,0,1, 0.5,0.5, 0.5,0,0,1, -0.5,-0.5, 0.5,0,0,1, 0.5,0.5, 0.5,0,0,1, -0.5,0.5, 0.5,0,0,1,
       0.5,-0.5,-0.5,0,0,-1,-0.5,-0.5,-0.5,0,0,-1,-0.5,0.5,-0.5,0,0,-1, 0.5,-0.5,-0.5,0,0,-1,-0.5,0.5,-0.5,0,0,-1, 0.5,0.5,-0.5,0,0,-1,
      -0.5,0.5,0.5,0,1,0, 0.5,0.5,0.5,0,1,0, 0.5,0.5,-0.5,0,1,0, -0.5,0.5,0.5,0,1,0, 0.5,0.5,-0.5,0,1,0, -0.5,0.5,-0.5,0,1,0,
      -0.5,-0.5,-0.5,0,-1,0, 0.5,-0.5,-0.5,0,-1,0, 0.5,-0.5,0.5,0,-1,0, -0.5,-0.5,-0.5,0,-1,0, 0.5,-0.5,0.5,0,-1,0, -0.5,-0.5,0.5,0,-1,0,
       0.5,-0.5,0.5,1,0,0, 0.5,-0.5,-0.5,1,0,0, 0.5,0.5,-0.5,1,0,0, 0.5,-0.5,0.5,1,0,0, 0.5,0.5,-0.5,1,0,0, 0.5,0.5,0.5,1,0,0,
      -0.5,-0.5,-0.5,-1,0,0, -0.5,-0.5,0.5,-1,0,0, -0.5,0.5,0.5,-1,0,0, -0.5,-0.5,-0.5,-1,0,0, -0.5,0.5,0.5,-1,0,0, -0.5,0.5,-0.5,-1,0,0
    ]);
    gl.bindVertexArray(vao); gl.bindBuffer(gl.ARRAY_BUFFER, buffer); gl.bufferData(gl.ARRAY_BUFFER, cube, gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'a_position'); const normal = gl.getAttribLocation(program, 'a_normal'); gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position, 3, gl.FLOAT, false, 24, 0); gl.enableVertexAttribArray(normal); gl.vertexAttribPointer(normal, 3, gl.FLOAT, false, 24, 12);
    const uniform = (name: string): WebGLUniformLocation => { const value = gl.getUniformLocation(program, name); if (!value) throw new Error(`Missing uniform ${name}.`); return value; };
    this.matrixLocation = uniform('u_matrix'); this.modelLocation = uniform('u_model'); this.colorLocation = uniform('u_color'); this.sunLocation = uniform('u_sun'); this.fogLocation = uniform('u_fog'); this.fogNearLocation = uniform('u_fogNear'); this.fogFarLocation = uniform('u_fogFar');
    gl.enable(gl.DEPTH_TEST); gl.enable(gl.CULL_FACE); gl.clearColor(0.055, 0.095, 0.105, 1);
  }

  setQuality(highQuality: boolean): void { this.highQuality = highQuality; }
  resize(): void { const dpr = Math.min(window.devicePixelRatio || 1, this.highQuality ? 2 : 1); const width = Math.floor(this.canvas.clientWidth * dpr); const height = Math.floor(this.canvas.clientHeight * dpr); if (this.canvas.width !== width || this.canvas.height !== height) { this.canvas.width = width; this.canvas.height = height; } this.gl.viewport(0, 0, width, height); }
  render(camera: Camera, boxes: readonly DrawBox[]): void {
    this.resize(); const gl = this.gl; const pitch = Math.max(0.35, Math.min(1.2, camera.pitch)); const horizontal = Math.cos(pitch) * camera.distance;
    const eye: [number, number, number] = [camera.target[0] + Math.sin(camera.yaw) * horizontal, camera.target[1] + Math.sin(pitch) * camera.distance, camera.target[2] + Math.cos(camera.yaw) * horizontal];
    mat4Perspective(this.projection, 0.8, this.canvas.width / this.canvas.height, 0.1, 1200); mat4LookAt(this.view, eye, camera.target, [0, 1, 0]); mat4Multiply(this.matrix, this.projection, this.view);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); gl.useProgram(this.program); gl.bindVertexArray(this.vao); gl.uniformMatrix4fv(this.matrixLocation, false, this.matrix); gl.uniform3f(this.sunLocation, -0.4, 0.75, 0.3); gl.uniform3f(this.fogLocation, 0.19, 0.29, 0.31); gl.uniform1f(this.fogNearLocation, this.highQuality ? 115 : 62); gl.uniform1f(this.fogFarLocation, this.highQuality ? 440 : 165);
    for (const box of boxes) { mat4Model(this.model, box.x, box.y + box.height / 2, box.z, box.width, box.height, box.depth); gl.uniformMatrix4fv(this.modelLocation, false, this.model); gl.uniform3fv(this.colorLocation, box.color); gl.drawArrays(gl.TRIANGLES, 0, 36); }
  }
}
