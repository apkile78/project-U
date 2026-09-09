# Roadmap

This roadmap describes direction, not permission to work on everything at once.

## Milestone 0 — First Good Scene

**Goal:** Make the game visibly exist.

* WebGL2 renderer
* camera
* player
* terrain
* simple buildings
* lighting
* collision
* one zombie
* one interaction
* debug tools

**Exit condition:** A person can launch the game and immediately understand that this is the beginning of a 3D survival game.

## Milestone 1 — Tiny Survival Loop

**Goal:** Make a complete playable loop.

* inventory
* containers
* items
* loot
* health
* hunger
* hydration
* simple combat
* zombie behavior
* save/load

**Exit condition:** Explore → find supplies → survive a threat → return/change the world → save → reload.

## Milestone 2 — Tiny World

**Goal:** Prove the world architecture.

* deterministic chunks
* streaming
* multiple buildings
* basic settlement generation
* persistent chunk deltas
* basic day/night
* weather

**Exit condition:** Multiple seeds produce coherent small settlements and the player can travel through them without obvious architectural failure.

## Milestone 3 — Vehicle Slice

**Goal:** Prove that vehicles belong in the simulation.

* one vehicle
* driving
* fuel
* damage
* storage
* basic repair

**Exit condition:** Vehicle gameplay is useful and stable without requiring a complete vehicle simulator.

## Phase 1 — Engine + POC

The broader first phase targets the small streamed survival game described above.

## Phase 2 — Systemic Depth

Potential systems:

* detailed health
* clothing/armor
* crafting
* construction
* utilities
* storage
* richer settlements
* modular vehicles
* NPC/zombie population systems
* richer procedural generation
* interiors/occlusion
* content validation pipeline

## Phase 3 — Scale + Multiplayer

Potential systems:

* authoritative server
* replication
* prediction
* chunk interest management
* larger world generation
* additional transport
* factions
* settlements
* economy/events
* accessibility
* optimization
* mod/content workflow

## Important

A phase is not a deadline to implement every bullet.

Each phase should be decomposed into small vertical slices with explicit exit conditions.
