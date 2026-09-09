# Architecture & Design Decisions

Record decisions that would otherwise be repeatedly reconsidered.

Format:

```text
## Decision: [Title]

Status: Accepted / Replaced / Experimental

Decision:
...

Why:
...

Consequences:
...
```

## Decision: Custom Browser Engine

**Status:** Accepted

**Decision:** Build the game using TypeScript and direct WebGL2 rather than a general-purpose game engine.

**Why:** The custom engine is part of the project's technical goal.

**Consequence:** Engine scope must be aggressively controlled. We build only what the game actually needs.

## Decision: Single-Player First

**Status:** Accepted

**Decision:** Build the initial game as single-player while keeping clean simulation/command boundaries for future multiplayer.

**Why:** Multiplayer adds major complexity and should not block proving the game.

**Consequence:** Networking influences architecture, but does not become an early feature.

## Decision: Fixed Simulation Tick

**Status:** Accepted

**Decision:** Gameplay simulation uses a fixed timestep while rendering may vary.

**Why:** Better consistency and future networking compatibility.

## Decision: Deterministic World Generation

**Status:** Accepted

**Decision:** World generation should be reproducible from stable seeds and coordinates.

**Why:** Supports streaming, persistence, testing, and potentially large/unbounded worlds.

## Decision: Vertical Slices

**Status:** Accepted

**Decision:** Features should be built as small playable slices instead of isolated giant systems.

**Why:** The project has repeatedly failed to reach a compelling playable/visual state.

## Decision: Visual Progress Matters

**Status:** Accepted

**Decision:** Development should regularly produce visible, playable improvements.

**Why:** The project needs evidence that the intended game is actually emerging, not just accumulating infrastructure.
