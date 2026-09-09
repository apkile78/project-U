# Project Foundation

## 1. Vision

A large-scale 3D survival sandbox representing a believable modern-world environment after an apocalypse.

The game is intended to combine:

* exploration
* survival
* combat
* scavenging
* base building
* vehicles
* systemic NPCs
* persistent world state
* realistic-ish logistics and equipment
* procedural/unbounded world generation
* eventual multiplayer

The final game may contain thousands of items, highly customizable vehicles, detailed settlements, and large-scale simulation.

Those are long-term goals, not prototype requirements.

## 2. World Philosophy

The world should feel like a place rather than a collection of random game levels.

Examples:

* pharmacies contain medical-related goods
* garages contain tools, parts, and vehicle supplies
* offices contain office/maintenance objects
* houses differ by type and location
* infrastructure follows believable geography and settlement patterns

Procedural generation should produce structure and consistency, not pure randomness.

## 3. Simulation Philosophy

Not everything is simulated at maximum detail.

Use simulation levels:

* **Active:** detailed simulation near the player.
* **Nearby:** simplified simulation for nearby regions/entities.
* **Distant:** statistical/event-based simulation.
* **Unvisited:** deterministic generation plus stored world changes.

The world can be technically unbounded without pretending every distant object is running a full simulation.

## 4. Time

Normal gameplay is real-time.

Single-player may pause tactically and use controlled time acceleration for appropriate activities.

Multiplayer will not rely on pausing.

The underlying simulation should therefore be built around explicit commands and state transitions rather than UI-specific assumptions.

## 5. Death

Survivor death is permanent.

The world persists independently of the current survivor.

Long-term single-player succession may allow control of an eligible surviving character.

This is a later system, not a prototype requirement.

## 6. Visual Direction

The final target is high-detail and grounded.

The prototype target is:

**readable, attractive, performant, and coherent—not photorealistic.**

Visual quality should scale through quality settings and LOD rather than requiring one hardware profile.

## 7. First Playable Slice

The first serious vertical slice should eventually contain:

* one small streamed region
* terrain
* a small settlement
* simple interiors
* player movement
* camera
* collision
* interaction
* inventory
* containers
* loot
* basic health/hunger/hydration
* one zombie
* basic combat
* one vehicle
* save/load
* debug/performance tools

The project should reach this slice incrementally.
