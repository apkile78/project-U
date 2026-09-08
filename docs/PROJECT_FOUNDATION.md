# Project U Foundation

## Game identity

Project U is a real-time, top-down-like 3D survival simulation set in a procedurally generated, fictional North American continent shaped by the geography, infrastructure, and everyday life of the modern United States. An initially zombie-focused catastrophe disrupts a world of realistic terrain, settlements, scavenging, survival, vehicles, construction, NPCs, and factions.

The project is a custom browser engine and game. It uses browser platform APIs directly and ships as a static GitHub Pages site; it does not use a premade game engine.

## Product pillars

1. **Systemic survival.** Needs, injuries, equipment, storage, crafting, construction, combat, and vehicle logistics should interact meaningfully.
2. **Believable places.** Terrain, rivers, roads, cities, buildings, interiors, and loot originate from plausible geographic and human rules—not a literal map of real locations.
3. **Persistent consequences.** The seed establishes the baseline world; saves preserve changes such as looted containers, deaths, vehicles, structures, and altered regions.
4. **People matter.** NPCs have needs, memories, relationships, goals, individual capability, and faction context. Followers can be close allies without belonging to the player's faction.
5. **Depth that scales.** Items, recipes, building templates, vehicles, factions, and scenarios are data-driven with stable IDs.

## Time, death, and succession

The world is real-time by default. Single-player includes tactical pause and context-sensitive acceleration for supported long-duration actions. Multiplayer will remain server-real-time; no individual player pauses a shared world.

The player controls one survivor at a time. A survivor's death is permanent. In the single-player campaign, control can pass only to a living eligible close follower. If none exists, or the player declines succession, the campaign concludes. The world, followers, factions, bodies, possessions, and settlements exist independently of the active survivor.

## World and simulation principles

- The world is effectively unbounded through seeded generation, spatial streaming, and persistent deltas.
- Rendering and simulation distance are separate. Distant terrain, skylines, vegetation, and infrastructure can render without fully simulating interiors, AI, collision, item objects, or physics.
- Terrain, generation, and simulation use separate spatial cells as appropriate. Building instances are not constrained to a single cell boundary.
- Nearby entities receive full simulation; regional groups receive coarse simulation; distant populations are abstract until needed.
- The first region is a fictional East-Coast American city and rural edge, designed to support neighborhoods, garages, industry, roads, rail, forest, and waterways.

## Technology principles

- TypeScript is used for engine and game logic.
- WebGL 2 is the initial direct rendering API; no third-party game renderer or engine is used.
- The simulation will use fixed updates decoupled from rendering frames.
- Input is action-based so the primary WASD/mouse controls can be remapped and extended later.
- Browser persistence will use a seed plus saved chunk deltas; persistence schemas must be versioned.
- Single-player comes first, but gameplay state changes must become command-based and serializable to support future authoritative multiplayer.
- Graphics profiles scale from a low-quality Chromebook-playable mode to a higher-detail modern-desktop mode.

## First vertical slice

The initial proof of concept is a single-player direct-control experience in a fictional East-Coast city district. A survivor can move using WASD and a freely orbitable elevated camera, explore streamed terrain and simple interiors, scavenge containers, manage basic inventory and needs, evade or fight zombies with melee and a civilian firearm, locate and drive one basic vehicle, and save/load persistent world changes.

The foundation renderer comes before those game systems. It must prove direct WebGL rendering, camera controls, configurable quality, a terrain/structure test scene, and visible runtime performance information.

## Explicitly deferred

The first slice does not attempt complete high-fidelity art, literal US mapping, full weather, complete ballistics, all vehicle classes, aircraft, trains, advanced faction economies, live networking, or thousands of content definitions. Interfaces should preserve their future path without simulating them prematurely.
