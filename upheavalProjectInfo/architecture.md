# Architecture

## Goal

Build a custom engine that remains understandable as the game grows.

The architecture should support the final direction without requiring the final complexity on day one.

## High-Level Layers

```text
Input
  ↓
Commands
  ↓
Simulation
  ↓
Game State
  ↓
Events / State Changes
  ↓
Presentation
  ├── Renderer
  ├── Audio
  └── UI
```

Networking, when eventually introduced, should fit around the simulation rather than forcing gameplay code to become network-specific everywhere.

## Core Boundaries

### Input

Responsible for translating hardware input into intent.

It should not directly modify world state.

### Commands

Represent requested actions.

Examples:

* Move
* Interact
* PickUpItem
* Attack
* EnterVehicle
* ExitVehicle

The simulation validates and executes commands.

### Simulation

Owns authoritative game state in single-player.

Responsible for:

* time
* movement
* entities
* interactions
* combat
* survival
* world state

### Renderer

Reads game state and presents it.

It should not secretly become the owner of gameplay state.

### World

Responsible for:

* coordinates
* chunks
* generation
* loading/unloading
* persistence

### Content

Definitions should be data-driven and use stable IDs.

Avoid scattering item/gameplay definitions across hard-coded logic.

## Simulation Timing

Prefer a fixed simulation timestep.

Rendering may run at a different rate.

This improves:

* consistency
* debugging
* deterministic behavior
* future networking compatibility

## World Streaming

Conceptually:

```text
World
 ├── Chunk A
 ├── Chunk B
 ├── Chunk C
 └── ...
```

Chunks should have clear lifecycle states.

Generation should be deterministic from stable world/chunk seeds.

Player/world modifications should be stored as deltas rather than requiring the entire generated world to be serialized.

## Simulation LOD

Not every entity needs full simulation all the time.

Use levels of detail:

```text
Active      = full simulation
Nearby      = reduced simulation
Distant     = statistical/event simulation
Unloaded    = stored state + deterministic generation
```

## Collision

Start with purpose-built simple collision.

Do not build a complete physics engine unless gameplay proves it is necessary.

## Design Constraint

Every subsystem should have:

* a clear owner
* a clear input/output boundary
* minimal dependencies
* a cheap failure/debug path
* a reason to exist

Avoid convenience dependencies that make unrelated systems know about each other.
