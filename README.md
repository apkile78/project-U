# Project U

Project U is a from-scratch browser game and engine for a high-detail, real-time 3D post-apocalyptic survival simulation. It is built for static deployment through GitHub Pages and deliberately does not use a premade game engine.

## Foundation build

The current build is the first engine-facing visual test. It provides a direct WebGL 2 renderer, an elevated freely orbitable camera, keyboard movement, a deterministic test scene, scalable high/low graphics settings, and an interface performance readout.

### Run locally

```bash
npm install
npm run dev
```

### Checks

```bash
npm run typecheck
npm run build
```

## Controls

- `W`, `A`, `S`, `D`: move the camera target through the test region.
- Drag with the primary pointer button: orbit the camera.
- Scroll: zoom.
- `QUALITY` button: switch between the initial high and low render-distance profiles.

The product direction, constraints, and first vertical-slice acceptance criteria are documented in [docs/PROJECT_FOUNDATION.md](docs/PROJECT_FOUNDATION.md).
