import { Renderer, type Camera } from './engine/renderer';
import { createTestWorld } from './world/testWorld';
import './styles.css';

const canvas = document.querySelector<HTMLCanvasElement>('#game-canvas'); const unsupported = document.querySelector<HTMLElement>('#unsupported');
const positionReadout = document.querySelector<HTMLElement>('#position'); const fpsReadout = document.querySelector<HTMLElement>('#fps'); const qualityButton = document.querySelector<HTMLButtonElement>('#quality-toggle');
if (!canvas || !unsupported || !positionReadout || !fpsReadout || !qualityButton) throw new Error('Required interface element is missing.');
const positionElement: HTMLElement = positionReadout; const fpsElement: HTMLElement = fpsReadout;

let renderer: Renderer;
try { renderer = new Renderer(canvas); } catch { unsupported.hidden = false; throw new Error('Project U requires WebGL 2.'); }
const world = createTestWorld(); const camera: Camera = { target: [0, 0, 0], yaw: 0.72, pitch: 0.76, distance: 30 };
const pressed = new Set<string>(); let dragging = false; let lastPointer: [number, number] = [0, 0]; let highQuality = true; let lastTime = performance.now(); let fpsSampleTime = lastTime; let frames = 0;
window.addEventListener('keydown', (event) => { if (['KeyW', 'KeyA', 'KeyS', 'KeyD'].includes(event.code)) { pressed.add(event.code); event.preventDefault(); } });
window.addEventListener('keyup', (event) => pressed.delete(event.code));
canvas.addEventListener('pointerdown', (event) => { dragging = true; lastPointer = [event.clientX, event.clientY]; canvas.setPointerCapture(event.pointerId); });
canvas.addEventListener('pointermove', (event) => { if (!dragging) return; const dx = event.clientX - lastPointer[0]; const dy = event.clientY - lastPointer[1]; lastPointer = [event.clientX, event.clientY]; camera.yaw -= dx * 0.008; camera.pitch = Math.max(0.38, Math.min(1.18, camera.pitch + dy * 0.006)); });
canvas.addEventListener('pointerup', () => { dragging = false; });
canvas.addEventListener('wheel', (event) => { camera.distance = Math.max(10, Math.min(66, camera.distance + event.deltaY * 0.025)); event.preventDefault(); }, { passive: false });
qualityButton.addEventListener('click', () => { highQuality = !highQuality; renderer.setQuality(highQuality); qualityButton.textContent = `QUALITY: ${highQuality ? 'HIGH' : 'LOW'}`; qualityButton.setAttribute('aria-pressed', String(!highQuality)); });

function tick(now: number): void {
  const dt = Math.min((now - lastTime) / 1000, 0.05); lastTime = now; const speed = 12 * dt; const forwardX = -Math.sin(camera.yaw); const forwardZ = -Math.cos(camera.yaw); const rightX = Math.cos(camera.yaw); const rightZ = -Math.sin(camera.yaw);
  if (pressed.has('KeyW')) { camera.target[0] += forwardX * speed; camera.target[2] += forwardZ * speed; } if (pressed.has('KeyS')) { camera.target[0] -= forwardX * speed; camera.target[2] -= forwardZ * speed; } if (pressed.has('KeyA')) { camera.target[0] -= rightX * speed; camera.target[2] -= rightZ * speed; } if (pressed.has('KeyD')) { camera.target[0] += rightX * speed; camera.target[2] += rightZ * speed; }
  renderer.render(camera, world); positionElement.textContent = `X ${Math.round(camera.target[0])} · Z ${Math.round(camera.target[2])}`; frames += 1; if (now - fpsSampleTime > 500) { fpsElement.textContent = `${Math.round((frames * 1000) / (now - fpsSampleTime))} FPS`; frames = 0; fpsSampleTime = now; } requestAnimationFrame(tick);
}
requestAnimationFrame(tick);
