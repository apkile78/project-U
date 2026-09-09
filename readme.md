# [Working Title]

A from-scratch browser-based 3D survival sandbox set in a persistent, procedurally generated post-apocalyptic world.

The long-term vision is ambitious: realistic terrain, settlements, buildings, loot, survival, combat, vehicles, NPCs, persistent world simulation, and eventual multiplayer compatibility.

**The rule for development:** the vision can be huge; the current build must stay small.

## Current Status

**Phase:** Prototype 0 — visual/gameplay foundation
**Status:** Not started / actively building

The current objective is NOT to build the whole game.

The current objective is to make one tiny piece of the game feel good.

### Current target

A small 3D scene containing:

* a controllable survivor
* a good-feeling elevated/rotatable camera
* simple terrain
* one or a few buildings
* basic collision
* one interactable door/container
* one item
* one simple zombie
* basic lighting/atmosphere
* developer/debug controls

Everything else is deferred until this is working.

## Technical Direction

* TypeScript
* HTML/CSS
* WebGL 2 directly
* Custom engine
* Browser-first
* Static deployment through GitHub Pages
* Data-driven game content
* Deterministic procedural generation
* Fixed simulation timestep
* Single-player first, with multiplayer-compatible boundaries

No Unity, Unreal, Godot, or premade game framework.

## Core Principles

1. Build playable vertical slices.
2. Prefer simple implementations over premature sophistication.
3. Do not add a system without a reason.
4. Keep simulation, rendering, input, and presentation separated.
5. Make important state deterministic and testable.
6. Commit frequently.
7. Keep `main` stable.
8. Use AI as an assistant, not as the architect.
9. Every major feature needs a definition of done.
10. Never confuse the final vision with the current milestone.

## Repository Map

* `README.md` — what this project is and where it currently stands.
* `TODO.md` — the immediate work queue.
* `ROADMAP.md` — milestone progression.
* `IDEAS.md` — ideas that are explicitly not current work.
* `PROJECT.md` — game vision and design pillars.
* `ARCHITECTURE.md` — technical architecture and boundaries.
* `DEVELOPMENT.md` — day-to-day development workflow.
* `DECISIONS.md` — important architecture/design decisions and why.
* `DEBUGGING.md` — debugging rules and developer tooling.
* `CONTENT.md` — content/data authoring rules.
* `CHANGELOG.md` — meaningful project changes.

## Scope Rule

If a feature creates five more features, stop and ask:

> Is this actually required by the current milestone?

If not, put it in `IDEAS.md` and return to the current target.

## Definition of Success

The project succeeds by accumulating stable, playable slices—not by accumulating code.
