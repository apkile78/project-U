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

## Extending AI chat context (may include already complete things, and what should be the place for pasting new brainstorming content) - We may also need to make another file for this:

I wanna make a game based on the United States of america in the apocalypse today, all modern and whatnot. Lets talk before doing anything rq. (the repo is empty) We will not be using any premade engine or stuff, the engine and game will be done from scratch and to be run in web using gh-pages.
Copy
Absolutely — we can build it as a from-scratch browser game and engine, with no Unity/Unreal/Godot or premade game framework, then deploy the static build through GitHub Pages.

A sensible technical direction would be:

Platform: Vanilla HTML, CSS, and JavaScript/TypeScript.

Rendering: Native <canvas> / WebGL APIs directly—no third-party game engine.

Engine: Our own loop, input system, renderer, scene/entity system, collision, audio, UI, save data, and asset loader.

Deployment: A static site built into a docs/ or dist/ directory and published from the repository’s gh-pages branch or GitHub Pages Actions workflow.

Initial scope: Start small enough to make a polished vertical slice, then expand safely.

For the game itself, an “apocalypse in modern-day USA” premise could work especially well as one of these:

Top-down survival/exploration
Travel between ruined American towns and cities, scavenge supplies, manage fuel/food/health, encounter factions, and make narrative decisions.

2D side-scrolling survival RPG
More atmospheric and character-driven: abandoned suburbs, highway rest stops, evacuation zones, and improvised settlements.

Tactical road-trip / strategy game
Manage a group crossing a fractured country, with a map layer for decisions and smaller tactical encounters.

First-person / 3D exploration
Technically feasible in browser with custom WebGL, but substantially more engine work. I’d recommend this only after we have a 2D engine foundation—or if 3D is the non-negotiable core vision.

My recommendation is a 2D top-down game initially. It gives us a lot of atmosphere and gameplay while letting us genuinely build the engine ourselves rather than spending most of the project on foundational 3D tech.

Before writing anything, I’d like to settle these design choices:

Visual perspective: top-down, side-view, or first-person?

Game focus: survival systems, combat, exploration, story/choices, base building, or multiplayer?

Tone: grounded and bleak, action-heavy, horror, satirical, or hopeful rebuilding?

Apocalypse cause: pandemic, environmental collapse, civil breakdown, invasion, zombies/creatures, or something original?

Target scope: a short playable demo first, or a longer-term full game foundation?

Once you answer those, we can turn the idea into a concise game concept, a technical architecture for the custom engine, and a staged development plan—still without changing the repository until you’re ready.

I was thinking a full 3D top-down-like game. This is going to be a full scale 3-year long dev journey. The game focus is the entirety of real life + apocalypse kinda view. The idea is realism, including loot tables and buildings (full scale realism), survival systems, combat, exploration, base building, and the future needs compatability with multiplayer. As well as there being real time, vehicles (planes, cars, Heli'(s), trains, etc) and realistic armor, weapons whatnot. My main idea was that the world is going to be infinite, without end and feature realistic terrain (mountains > land > rivers > lakes > oceans ts), hypothetically good visuals are going to be implemented after proof of concept of course. The apocalypse cause is going to be similar to cdda for now - the crazy stuff (just zombies to begin), The tone will likely come with playstyle via the entire game itself. This game needs to scale with depth, there will likely be thousands + items, weapons, vehicles, whatnot. (vehicles will be very very customizable) Keep talking, we are planning.
Copy
That is ambitious, but it has a strong direction: a persistent-feeling, systemic 3D survival simulation of a post-apocalyptic United States, where the player’s experience emerges from realistic geography, logistics, item systems, vehicles, construction, threats, and social systems rather than a narrow scripted campaign.

For a three-year project, the key is not to simplify the vision away—it is to build it as layers that remain useful at full scale. The proof of concept should be the first stable slice of the eventual architecture, not a throwaway prototype.

Core Design Interpretation
I’d frame the game as:

A top-down/isometric-leaning 3D survival sandbox set in a procedurally reconstructed modern United States after a Cataclysm: Dark Days Ahead–inspired collapse, initially centered on zombies, resource scarcity, realistic survival, and player-driven settlement/vehicle progression.

The important pillars appear to be:

A 3D seamless world that is theoretically unbounded through deterministic procedural generation and streaming.

Modern-US realism in geography, settlement patterns, infrastructure, building interiors, gear, and vehicles.

Simulation depth—nutrition, wounds, equipment, ammunition, storage, power, crafting, weather, time, loot, building, and travel all connect.

Large content scale, eventually including thousands of data-driven items and parts.

Vehicles as major gameplay systems, rather than simple transport.

A long-term multiplayer-compatible design, even if the first release is single-player.

An apocalypse that starts recognizable and grounded, with room to introduce stranger CDDA-like elements later.

“Infinite USA” Should Mean Streamed and Deterministic
We should avoid describing the world internally as literally infinite in the sense of storing or simulating every location. Instead:

Divide the world into fixed-size world regions/chunks.

Create each chunk from a world seed and its integer coordinates.

Generate terrain, road routing, landmarks, towns, vegetation, building selections, and loot seeds deterministically.

Keep only nearby chunks loaded in memory.

Save only the changes from generated baseline: looted containers, destroyed walls, player buildings, parked vehicles, dead entities, and so on.

Unload far-away regions while preserving their persistent deltas.

This produces a world with no meaningful exploration boundary while keeping browser memory and storage manageable.

For realism, the generator should operate in layers, such as:

Continental layer — elevation, climate bands, broad drainage, coast/ocean boundaries.

Regional layer — mountain ranges, river basins, lakes, forests, plains, deserts.

Infrastructure layer — highways, rail lines, utility corridors, towns, suburbs, industrial zones.

Local layer — lots, buildings, rooms, vegetation, road damage, points of interest.

Simulation layer — zombie populations, spawns, weather, loot state, encounters, and player modifications.

At first, we do not need the whole United States faithfully mapped. We can prove the architecture with a fictional-but-US-plausible region: a town, surrounding suburbs, farmland, highway interchanges, rivers, forest, and a small city edge. Later, we can decide whether to incorporate real-world geographic datasets into the terrain and infrastructure pipeline.

3D Top-Down Presentation
“Top-down-like” is a great choice because it gives 3D gameplay benefits without requiring a first-person game’s very high fidelity.

I would suggest a camera that is:

Elevated at an oblique angle, not perfectly vertical.

Rotatable in 90° increments initially; free rotation can come later.

Zoomable between close tactical play and wider vehicle/travel views.

Smart about occlusion: roofs fade or hide, upper floors cut away, walls become transparent when they block the player.

Able to use different follow modes for walking, driving, and flying.

This presentation supports detailed environments, building interiors, vehicle play, and long-distance travel while keeping controls readable.

From-Scratch Engine: What We Actually Need
“No premade engine” is workable, but we should distinguish between an engine and low-level browser standards.

We can build our own engine around native browser capabilities:

Rendering: WebGL 2 directly at first; WebGPU may later be offered as an optional renderer once browser support and implementation priorities make sense.

Math: our own vectors, matrices, quaternions, transforms, geometry intersections, and frustum culling.

Core loop: fixed simulation ticks separate from variable rendering frames.

ECS or component-based world model: entities and components for players, zombies, items, containers, structures, vehicles, lights, and interactive objects.

Chunk streaming: terrain/building/entity loading and unloading based on player location.

Physics: begin with purpose-built collision and movement; do not try to build a complete general-purpose rigid-body physics engine on day one.

Input/UI/audio/assets: all custom systems layered over browser APIs.

Persistence: local save files using IndexedDB, with chunk-delta saves rather than serializing the entire world.

Developer tooling: debug overlay, world inspector, chunk visualizer, spawn controls, performance profiling, and content-validation tools.

We can still use normal development tools—TypeScript compiler, formatter, test runner, image/audio encoders, and static hosting. “From scratch” should mean we own the game and engine systems, not that we rebuild every standard tool in the web ecosystem.

Multiplayer Compatibility Must Shape Single-Player Early
We do not need to build multiplayer first, but the single-player simulation must avoid decisions that make networking impossible later.

The foundation should be:

Fixed-rate simulation, likely something like 20–30 simulation updates per second at first.

Authoritative game state model: long term, the server decides truth; clients predict and render.

Deterministic world generation: the server and client can independently regenerate unchanged chunks from the same seed.

Stable numerical approach: avoid accidental dependence on variable frame rate; limit nondeterministic behavior.

Command-based player actions: “move,” “interact,” “fire,” “move item,” “attach vehicle part,” etc., rather than letting UI code directly mutate world state.

Data-driven definitions with stable IDs: item, recipe, structure, and vehicle-part definitions must remain compatible with saves and future server/client versions.

Chunk-based interest management: each client receives state only for relevant nearby chunks and entities.

One major realism caveat: real-time does not mean the entire infinite world must always simulate. We should use several simulation levels:

Fully simulate the player’s active area.

Coarsely simulate nearby regions.

Use event-based or catch-up simulation for distant regions.

Advance far-away areas only when needed: for example, when the player returns, when a multiplayer client approaches, or when a scheduled world event affects them.

That is how we preserve the feeling of a living world without making performance impossible.

Vehicles Need Their Own Data Model
Vehicles should be a first-class system from early on, because they affect world scale, inventory, combat, construction, energy, and travel.

Rather than defining “a car” as one item, define a vehicle as an assembly of:

Chassis/frame sections

Mount points / grid positions

Body panels

Wheels, axles, suspension, steering

Powertrain: engines, motors, transmissions, fuel systems, batteries

Control systems

Cargo/storage

Armor and reinforcement

Interior components: seats, beds, lighting, cooking, refrigeration, workstations

Damage and repair state

Fluid/electric/power networks

The same general model can later support cars, trucks, motorcycles, trains, boats, helicopters, and aircraft—but they must enter in stages. A sensible rollout is:

Walking and simple static wrecks.

One drivable ground vehicle type with believable fuel, damage, and cargo.

Modular ground-vehicle assembly and repairs.

Broader road vehicles, then boats.

Aircraft much later, once world streaming, camera behavior, collision, and performance support high-speed traversal.

Planes and helicopters change the technical requirements significantly: chunks must stream farther ahead, terrain must have appropriate distant-detail representations, and network interest management becomes wider.

Items, Loot, and Crafting Must Be Data-Driven
Thousands of items are manageable only if the game content is built as structured data rather than custom code per object.

Every definition should have data such as:

Stable ID and display name.

Tags/categories.

Dimensions, mass, volume, stackability, and condition.

Material composition.

Equipment slots and layer.

Weapon/tool actions.

Container capacity and restrictions.

Nutrition, spoilage, temperature, or fluid properties as applicable.

Recipe inputs/outputs.

World spawn/loot-table rules.

Trade/scavenging value.

UI icon/model references.

For realistic loot, avoid each container randomly rolling generic “loot.” The game should understand that:

A pharmacy stocks medical categories.

A garage contains vehicle and repair-related tools/parts.

An office has documents, furniture, computers, and maintenance supplies.

A rural house differs from a city apartment.

A police station, farm supply store, restaurant, hospital, airport, and rail yard all generate inventory from their actual functions.

That supports realism and prevents the world from feeling like every building is a randomized dungeon chest.

Survival and Combat: Start With the Most Connected Systems
The full realism target can become unmanageable if every system is independent. We should prioritize systems that interact broadly:

Health and injuries: body regions, bleeding, pain, infection, fractures, treatment.

Needs: calories, hydration, fatigue, temperature, and sleep.

Encumbrance and storage: volume, mass, access time, worn vs. carried vs. vehicle storage.

Equipment: layered clothing, armor coverage, condition, warmth, and protection.

Combat: line of sight, noise, stamina, melee reach, recoil, ammunition, reloading, damage, and armor interaction.

Environmental simulation: day/night, weather, wetness, temperature, and fire eventually.

Crafting/building: a task system requiring tools, materials, time, and safe workspace conditions.

Zombies are the correct first hostile type: they test detection, navigation, combat, sound, indoor/outdoor transitions, hordes, barricades, and vehicle interactions. Strange creatures, human factions, radiation, mutations, and deeper Cataclysm-style systems can be introduced after the foundational simulation is stable.

Three-Year Direction, Organized by Milestones
A possible high-level path:

Phase 1 — Engine and playable proof of concept
Goal: one small streamed region that feels like the game.

Custom WebGL renderer and 3D camera.

Terrain chunk generation and basic buildings.

Walking, camera, collision, interaction.

Day/night and basic weather.

Items, containers, inventory, and loot generation.

One zombie type with navigation and combat.

Basic health/hunger/hydration/stamina.

Saving/loading using world-seed and chunk deltas.

One basic drivable vehicle.

Debug tooling and performance telemetry.

Phase 2 — Core simulation and systemic depth
Goal: players can create their own survival stories.

More realistic health, clothing, armor, and equipment.

Crafting, construction, shelters, utilities, and storage.

Improved settlements and points of interest.

Vehicle modularity, repair, fuel, batteries, and cargo.

NPC and zombie population systems.

Better world-generation layers and biome variety.

Advanced building interiors and roof/occlusion behavior.

Content authoring and validation pipeline.

Phase 3 — Scale, networking, and polish
Goal: support an evolving long-term sandbox.

Dedicated authoritative multiplayer server.

Replication, client prediction, chunk interest management, persistence.

Larger world-generation scope and possibly data-backed real geography.

More vehicles and advanced transport.

Factions, settlements, economy, missions/events, and late-game systems.

Graphics polish, optimization, accessibility, balancing, mod/content workflow.

The First Planning Decision I’d Make
Before selecting technologies or writing the initial architecture, we should decide the simulation granularity:

Continuous real-time action — player movement and combat are always live; closest to conventional 3D survival games.

Real-time world with tactical pause — the world runs continuously, but single-player can pause or slow during inventory, aiming, and complex actions.

Hybrid real-time / time-accelerated actions — normal play is real-time, while sleeping, crafting, driving long distances, and waiting use controlled time acceleration.

For the depth you want, I strongly recommend option 3, with tactical pause available in single-player. It keeps danger immediate but makes dense inventory, medical, construction, and vehicle systems usable. Multiplayer can simply disallow pausing and retain the same command/simulation architecture.

The other critical early design question is: do you imagine the player controlling one survivor directly, or should the long-term game include recruiting and managing a survivor group/base?

1 and 2, multiplayer will be harder because it doesn't have pause, but single player will. (multiplayer will need to be balanced via time/pause. I guess that makes it 3?
Copy
Yes—this becomes a hybrid real-time game with single-player tactical pause and controlled time acceleration.

The distinction is:

Core play is real-time: movement, zombies, combat, driving, weather, hunger, and the world all progress continuously.

Single-player adds tactical pause: you can pause to inspect gear, manage a complex inventory, plan medical treatment, issue a construction task, or examine a vehicle.

Single-player may accelerate time for safe long-duration actions: sleeping, reading, crafting, recovery, long waits, perhaps certain travel modes.

Multiplayer stays real-time: an individual player cannot halt the shared world. The same action systems work, but decisions must be made under time pressure or in a safe location.

That gets us the accessibility and simulation depth of CDDA-like systems without making the actual moment-to-moment game turn-based.

How Pause Should Work Technically
We should build pause as a simulation-clock policy, not as a special feature scattered across gameplay systems.

Every simulation system should advance using a game-time value, such as:

real delta time — elapsed wall-clock time between frames.

simulation delta time — how much game world time advances this update.

time scale — 0 while paused, 1 during normal play, and higher values during supported time acceleration.

In single-player:

Tactical pause sets the world simulation time scale to 0.

The renderer and menus still run, so the player can inspect and organize things.

Any action that changes the world becomes a queued command and resolves when time resumes—unless we explicitly define it as instant and safe.

Time acceleration is only permitted when the game decides it is safe enough, or after a confirmation if threats are nearby.

In multiplayer:

The authoritative server time scale remains 1.

A client opening its inventory pauses only its own movement/input presentation—not enemies, hazards, or other players.

The client can still send inventory, crafting, interaction, and medical-action commands to the server.

Those actions resolve over actual server time.

This lets the single-player simulation and future multiplayer simulation use essentially the same code paths.

The Multiplayer Balance Problem Is Real—and Solvable
You are right that multiplayer is harder, because the player cannot safely spend several minutes sorting a backpack while zombies are moving. We should design for that from the start.

The answer is not to make multiplayer less deep. It is to make organization and complex actions have an in-world context:

Inventory actions can be fast when items are close and accessible, but slower if equipment is buried in a packed backpack or vehicle trunk.

Applying a bandage, reloading, repairing an engine, building a wall, or disassembling an object has a visible timed action with interruption rules.

Players need safehouses, locked rooms, watch rotations, and team roles to do complicated management safely.

A player can defend while another repairs, sorts, cooks, or performs medical care.

Vehicles and base storage become meaningful organizational tools rather than huge inventory menus.

Certain UI interactions can be allowed while moving slowly, while others require standing still or using a work surface.

The game can expose quick-access hotbar/loadout systems for urgent gear so basic survival never requires deep menu navigation.

This actually strengthens the survival fantasy: being forced to manage your equipment in dangerous circumstances is part of the tension, while a secured shelter creates a genuine sense of relief.

Time Acceleration Rules
I would separate tactical pause from time acceleration, since they serve different needs.

Tactical Pause
Single-player only by default:

Stops the world.

Lets players think and inspect.

Useful for accessibility and complex interfaces.

Does not need to make time-consuming physical actions instant.

Local Action Time
Actions should always have game-time costs:

Reloading.

First aid.

Eating/drinking.

Equipping/removing clothing.

Cooking.

Crafting.

Repairing.

Building.

Searching containers.

Entering/exiting vehicles.

Refueling and transferring liquids.

In single-player, the player can pause to choose the action, then let it play out at normal or accelerated time. In multiplayer, it plays out at normal server time.

Accelerated Time
Most appropriate for single-player only:

Sleep.

Reading/learning.

Long crafting jobs.

Recovering from illness/injury.

Waiting for weather/daylight.

Passive processing such as boiling water or charging batteries.

The game should reduce or prevent acceleration when threats are nearby, during active combat, when driving, or while other simulated risks are imminent. We can also make the player explicitly choose between a fast but riskier wait and a slower, more alert wait.

For multiplayer, sleep can become a different design:

Sleep gives rest over real time.

Beds and secure areas improve rest quality.

Groups may coordinate to sleep, but the server should not need to skip global time.

Longer offline progression, if ever used, needs its own deliberate rules to prevent exploits and unfair loss.

A Good Default for the Game Clock
For ordinary gameplay, I recommend one second of real time equals one second of game-world time.

That makes combat, driving, weather, and multiplayer intuitive. We should not use a constant “one real minute equals ten in-game minutes” approach, because it makes ordinary survival tasks, day/night cycles, vehicle journeys, hunger, and multiplayer scheduling difficult to tune.

Instead:

Keep ordinary active gameplay at 1:1 time.

Compress or abstract only activities that are inherently long and low-interaction.

Treat day/night duration as a balancing choice: a full game day might use a deliberately shortened but consistent world day, while the active simulation itself still treats seconds consistently. We can decide this during early playtesting.

Recommended Rule for the Design Document
A concise rule we can adopt now:

The world is real-time by default. Single-player provides tactical pause and context-sensitive time acceleration; multiplayer is always server-real-time. All meaningful actions are represented as interruptible, server/simulation-valid commands with defined durations.

That rule will guide the engine, UI, action system, save system, and eventual network design.

The next major design choice I would settle is the player’s starting scale:

Do players begin as one ordinary survivor in a small region, with the world gradually opening through vehicles and settlement building?

Or do you want players to enter an already broad sandbox where long-range travel, high-end vehicles, and enormous base projects are available relatively early?

I strongly recommend the first: start fragile and local, then make a working car, a secure base, fuel logistics, and eventually major vehicles feel like genuine progression rather than expected starting equipment.

The players starting scale depends on what they make their character in the character menu. The idea is you can start as any person in modern america, military vehicle operator, home mechanic etc, with stats yada yada.
Copy
That fits the vision very well. Rather than a fixed starting progression, the game can use a life-path character creator: the player begins as a plausible person who existed in modern America immediately before or during the collapse.

The important distinction should be:

Backgrounds change your knowledge, equipment familiarity, physical conditioning, social context, and starting circumstances—not whether you are allowed to participate in the game.

A home mechanic should be better at diagnosing and repairing vehicles at the start. A military vehicle operator may understand heavy-vehicle operation and have better discipline under stress. A nurse can recognize injuries and use medical supplies more effectively. But none of those should be a permanent “class lock.” Over time, any survivor should be able to learn, train, discover manuals, and practice toward those capabilities.

Character Creation Structure
A modular character creator would work better than a single “profession” dropdown.

1. Identity and appearance
The straightforward player-facing layer:

Name, pronouns, age range, appearance, voice, and clothing style.

Optional personal details that may affect narrative flavor or starting contacts later.

No arbitrary gameplay advantages hidden in cosmetic choices.

2. Origin and starting location
Where the person was when the outbreak began:

Rural town or farm.

Suburban neighborhood.

Dense city district.

Highway rest stop.

Hospital.

College campus.

Military installation.

Industrial facility.

Airport, rail yard, port, or roadside motel.

Office, store, warehouse, police/fire station, or a friend’s home.

This can determine the first chunk(s) loaded, the local building types, nearby vehicles, regional terrain, population density, and immediate risks.

It is a powerful way to make the procedurally generated world feel personal: the player is not merely dropped into “a survival map”; they begin somewhere that makes sense for who they were.

3. Background / occupation
This represents prior experience, not a magical archetype.

Examples:

Background	Natural starting strengths	Possible starting context
Home mechanic	Vehicle diagnostics, repair, tools, part recognition	Garage, driveway project, auto shop
Military vehicle operator	Vehicle handling, maintenance procedures, field routines	Base, checkpoint, convoy route
Nurse / EMT	First aid, triage, medical terminology	Clinic, ambulance, home after shift
Construction worker	Building, demolition, material knowledge, practical strength	Work site, hardware store
Farmer	Food preservation, basic machinery, rural navigation	Farm, equipment shed, rural road
Truck driver	Road knowledge, heavy vehicle familiarity, logistics	Cab, truck stop, depot
Electrician / technician	Power systems, wiring, generators, tools	Job site, utility area, home
Teacher / office worker	General baseline, reading/research, social flavor	School or commercial district
Police officer	Firearm familiarity, procedures, radio use	Station, patrol vehicle, local route
Student	Broad customization and fewer fixed obligations	Campus, home, transit route
A background should grant a small, believable starting package:

A modest skill baseline.

Familiarity/efficiency with related equipment.

A few appropriate known recipes or procedures.

Plausible starting clothing/tools.

Possible starting-world context.

Optional narrative hooks and relationships later.

It should not automatically give a military operator an armored vehicle, a police officer unlimited firearms, or a mechanic a fully equipped workshop. Those possessions need to be earned by the starting scenario, rarity rules, and world state.

Skills, Knowledge, and Attributes Should Be Separate
To support realism and long-term depth, I would not make all competence a single “skill level.”

Attributes
Underlying capacities with relatively slow change:

Strength.

Endurance.

Dexterity / coordination.

Perception.

Intelligence / reasoning.

Willpower / stress tolerance.

Possibly social ability, depending on how deeply NPC systems are planned.

Attributes influence limits and rates, but should avoid rigidly determining the whole character’s future.

Skills
Practiced capabilities:

Melee and unarmed combat.

Firearms by broad family, rather than a hundred separate skills.

Driving/vehicle operation.

Mechanics.

Electronics/electrical.

Construction.

Medicine.

Cooking and food preservation.

Survival/navigation.

Farming.

Fabrication.

Tailoring.

Computers/radio.

Stealth.

Skills improve by training, successful use, instruction, manuals, and repeated practice, subject to fatigue and diminishing returns.

Knowledge / Familiarity
This is especially important for your realism goal.

Someone may physically be capable of using a tool but not understand it. Familiarity can affect:

Whether an item’s interface or components are understandable.

Whether the player can identify a vehicle fault.

Whether they know safe/efficient procedures.

Whether crafting instructions are available.

Error chance, action duration, quality, and risk.

For example, a home mechanic might identify a damaged alternator and repair it efficiently. Another survivor could still learn it later from a manual, experimentation, training, or an NPC—but perhaps waste time or damage parts early on.

Traits and conditions
These make characters distinct beyond occupational optimization:

Near-sightedness, good hearing, poor sleep, motion sickness.

Strong stomach, allergies, asthma, chronic pain, phobias.

Patient, impulsive, calm under pressure, claustrophobic.

Athletic, sedentary, resilient, fragile.

Dietary requirements and other relevant conditions.

These need careful design. Realism is good, but traits should create meaningful play differences, not punish players with arbitrary misery or reduce real-world conditions to jokes.

Character Creation Needs a Trade-Off Budget
To avoid every player creating a perfectly optimized “special forces mechanic doctor,” character creation should use a transparent budget or scenario framework.

For example:

Every character gets a baseline allocation of attributes and skills.

A more specialized or advantageous background consumes more of that allocation.

Beneficial traits cost points.

Challenging traits return points only where they genuinely change gameplay.

Starting scenario adjusts gear and danger rather than simply adding free value.

Alternatively, we could make a life history system:

Choose education, job history, hobbies, military history, health, and recent events.

Each choice gives and takes something.

The resulting character is understandable as a real person rather than a game build.

This would be more immersive than a conventional RPG stat menu and aligns extremely well with “any person in modern America.”

Starting Scenarios Add Variety Without Breaking Progression
Occupation determines who you are; a scenario determines what is happening at minute one.

Potential scenarios:

At home: relatively familiar location and some personal possessions; local dangers may be increasing.

Stranded commute: limited gear, road congestion, abandoned or crashed vehicles.

On shift: job-relevant location and possibly tools, but elevated chaos.

Evacuation failure: starts with travel supplies, crowds, traffic, and misinformation.

Sheltering in place: a small early base, but uncertain resources and neighborhood threats.

Separated from family/friends: a clear early objective and emotional narrative hook.

Out-of-town: unfamiliar terrain and no personal support network.

Already surviving: advanced but higher-risk setup for experienced players.

The background and scenario should combine rather than force one another. A mechanic can begin at home, at a garage, stranded in traffic, or out of town. A military vehicle operator can be off duty at home, in a failing evacuation convoy, or deployed near a military site.

Multiplayer Considerations
Character choice needs a few multiplayer rules:

Backgrounds should offer different early advantages, not one objectively correct combat build.

Starting areas must avoid immediately isolating players indefinitely; group spawning, friends, or safe rendezvous options are useful.

The server validates character sheets, starting packages, and scenario permissions.

Certain high-value starts—military facilities, advanced vehicles, rare gear—should be rare scenarios, server-controlled, or restricted by the world’s state.

Players should be able to become valuable through cooperation: mechanic, medic, scout, builder, driver, farmer, and defender should all matter.

A later character could inherit some base knowledge, but should not make permanent death meaningless if you choose a harsher survival model.

A Strong First Implementation Boundary
For the proof of concept, we should resist implementing the full life-history generator immediately. Instead, demonstrate the system with:

Three backgrounds: home mechanic, EMT/nurse, and construction worker.

Three scenarios: at home, on shift, and stranded commute.

A small number of attributes, skills, and traits.

A single generated US-plausible town region.

Distinct but balanced starting knowledge, tools, and early objectives.

If that feels good, adding professions and scenarios becomes primarily a content/data problem rather than an engine rewrite.

The next major decision is how strict you want character death and persistence to be. For this kind of survival game, would a dead character mean a full new survivor in the same persistent world, a recoverable body/gear situation, optional respawn rules, or something harsher like permanent loss for a server/world?

There will be very advanced npcs, random people stuff, random factions, etc... My idea is instead of having "children" you can choose to play as one of your close followers. These are maybe random, maybe generic npcs that have been promoted to follower in your campaign, not necessarily part of your faction. If you die with no followers or even don't choose to contiue, you die, your world is gone, either reset or smthn.
Copy
That is a much stronger fit than a conventional “children/inheritance” system.

The succession mechanic can be grounded in the people the player actually met and earned trust with:

When the active survivor dies, the player may continue as an eligible close follower who remains alive in the world. If no eligible follower exists—or the player declines succession—the campaign ends and that single-player world is retired or reset.

It makes death meaningful without requiring an artificial bloodline mechanic, and it creates a reason to form genuine relationships rather than treating NPCs as disposable base workers.

Follower Succession / Legacy System
A follower should not automatically be eligible just because they are nearby or share a faction. Eligibility could require several things:

They are alive.

They have a sufficiently strong relationship/trust level with the player.

They have spent meaningful time with the player or participated in important events.

They are not currently hostile, imprisoned, incapacitated beyond recovery, or otherwise unavailable.

They have some independent willingness to continue after the player dies.

This lets a rescued stranger remain “an ally” without automatically becoming a continuation character. The player’s actions determine whether a lasting bond exists.

When the active character dies:

The game records death location, body, equipment, vehicle state, structures, and local events.

It presents any viable close followers as continuation options.

The player selects one—or chooses to end the campaign.

The world continues from that follower’s location and perspective.

The former player character’s body and possessions stay in the world, subject to looting, decay, zombie danger, and NPC actions.

That last point is especially good for emergent stories. A successor may need to return to the death site, recover equipment, discover what happened to the group, or decide that the old base is no longer safe.

No-Follower Death Should End a Single-Player Campaign
Your rule works best if it is explicit at world creation:

Hardcore campaign: no eligible successor means permanent campaign end; the world is archived as a final record or deleted/reset.

Standard campaign: no eligible successor ends that survivor’s story, but the player may choose a new unaffiliated survivor in the existing world.

Sandbox/debug mode: death and succession rules are configurable.

For the main intended experience, I would make the hardcore campaign rule the default:

A world continues only through living people connected to your survivor’s story.

That makes isolation dangerous in a deeper way. If a player never builds trust, never protects anyone, and never accepts help, they are choosing a much harsher run. It also makes a small follower group, safehouse, and shared resources meaningful forms of long-term survival.

An archive screen at campaign end could show:

Survivor name and lifespan.

Cause and location of death.

Days survived.

Settlements/bases created.

Vehicles restored or lost.

Major relationships and faction standing.

Map explored.

Followers who survived, died, or disappeared.

Important events from the world timeline.

That preserves the story even when the world is truly over for the player.

Factions and Followers Should Be Separate Concepts
This separation is important:

Faction: an organization, settlement, gang, government remnant, military group, trading network, cult, or survivor community with goals, membership, resources, territory, rules, and relationships.

Follower: an individual NPC who chooses to travel with or support the player directly.

Close follower / successor: a follower with enough personal history and trust to potentially become the player’s next active character.

A follower might belong to the player’s own settlement, remain loyal to another faction, be an independent drifter, or be a temporary traveling companion. That gives room for difficult situations:

A trusted medic follows the player but still cares about their home settlement.

A faction scout becomes a follower but is recalled by their leader.

Two followers dislike each other.

A follower who survives the player may take control of the base, abandon it, or bring the successor into a faction dispute.

A player can continue as someone who has different skills, relationships, injuries, loyalties, equipment, and location than the deceased survivor.

That is exactly the sort of systemic depth that makes the world feel alive.

“Advanced NPCs” Needs a Layered Definition
We should aim for NPCs that appear intelligent because they have consistent needs, knowledge, memory, relationships, and goals—not because every one needs unrestricted human-level planning every simulation tick.

Each NPC can have structured state such as:

Identity: age, background, appearance, skills, traits, health, equipment.

Needs: hunger, thirst, fatigue, shelter, safety, medicine, social contact, ammunition, fuel, and supplies.

Knowledge: places seen, threats witnessed, rumors, recipes/procedures, locations of resources, and known people.

Relationships: trust, fear, affection, resentment, obligation, rivalry, and faction allegiance.

Memory: important events and their source—who rescued them, robbed them, lied to them, abandoned them, helped their friend, or caused a death.

Goals: immediate safety, find food, return home, protect someone, establish shelter, trade, recruit, investigate, flee, raid, or travel.

Capabilities: what actions they can actually perform based on health, equipment, skill, and situational knowledge.

Their behavior could use hierarchical decision-making:

Immediate survival: escape fire, fight/flee zombies, seek medical aid, avoid drowning/freezing.

Short-term tasks: get food, find a safe bed, retrieve supplies, repair vehicle, regroup.

Personal goals: find family, return to a place, avenge someone, join a settlement.

Faction goals: patrol territory, defend settlement, trade, expand, investigate, raid.

Long-term adaptation: relocate, form groups, change allegiances, establish or dissolve factions.

This is more feasible and controllable than attempting to simulate every person in the country at full detail.

Distant NPC Simulation Must Be Coarse
To support an effectively unbounded world, NPCs should exist at different simulation levels:

Active NPCs: near a player; use full navigation, combat, perception, animations, and interaction.

Regional NPC groups: off-screen people simulated as groups with location, supplies, goals, and event outcomes.

Abstract distant population: regional population/faction statistics that generate concrete NPCs only when the player gets close or an important event requires it.

The game can move an NPC between these levels while preserving their identity and story. A named former follower who leaves the player should not simply vanish—they can be compressed into a coarse state and later reappear with believable changes: injured, better equipped, part of another faction, dead, or leading a settlement.

Faction Generation
Random factions should not be random only in visual style. Each needs a practical basis for existing:

Origin: neighbors, emergency responders, stranded travelers, prison escapees, militia, warehouse workers, farmers, religious group, local government remnant, organized criminals, military remnants, etc.

Resources: what they can produce, maintain, protect, or trade.

Territory: where they operate and why that location is defensible/useful.

Leadership: who makes decisions and how stable the leadership is.

Ideology/rules: hospitality, trade, isolation, authoritarian control, mutual aid, expansion, survival-at-any-cost.

Current pressures: food shortage, illness, undead migration, fuel scarcity, internal conflict, a missing person, hostile neighbors.

Relationships: alliances, debts, rivalries, treaties, rumors, and misunderstandings.

The starting world does not need twenty elaborate factions. A proof of concept can have one small survivor group, a small hostile group, and several unaffiliated NPCs, all with visible relationships and simple goals. The system should then scale to more variety.

Multiplayer Needs Different Death Semantics
The succession rule fits single-player campaign worlds perfectly. In multiplayer, the world cannot end when one player dies, because it belongs to multiple people.

For multiplayer:

The server world persists independently of any one character.

Character death should be severe: body/equipment remain in the world, and the player may create a new survivor or take control of a server-approved follower.

A player’s personal base, relationships, followers, and reputation can persist or degrade according to server rules.

Followers should not become a loophole for unlimited instant lives; a server can limit succession eligibility, impose cooldowns, require a genuine established bond, or give the successor a distinct starting position.

Server owners can choose hardcore rules, including permanent character loss.

So the principle remains the same—people and world state persist, not the player’s invulnerability—while shared-world rules remain fair.

Recommended Core Rule Set
I would write the planned rule this way:

The player controls one survivor at a time. Death is permanent for that survivor. In single-player campaign mode, control may pass only to a living, eligible close follower; otherwise the campaign concludes. Followers, NPCs, factions, bodies, possessions, settlements, and world consequences persist independently of the active character. Multiplayer worlds persist independently of all individual player characters.

That gives the project a strong identity: survival is not merely about keeping one avatar alive; it is about whether the relationships and community that avatar built can survive them.

anything else need discussing b4 build time?
Copy
Yes—but we do not need to fully design the whole three-year game before building. We should settle the decisions that would cause costly rewrites if we guessed wrong, then begin a deliberately narrow proof of concept.

Decisions Worth Settling Before the First Build
1. Initial playable slice
We need an exact first playable target—not the final game.

My recommended initial target:

One survivor begins in and around a small procedurally generated American town. They can explore, enter simple buildings, loot containers, manage basic inventory/needs, avoid or fight zombies, drive one basic vehicle, save/load, and die permanently.

This proves the game’s core loop:

spawn → explore → scavenge → survive threats → use supplies/vehicle → establish short-term safety → save consequences

We should agree on:

How large the initial active region feels—one neighborhood, a small town, or town plus rural surroundings.

Which one initial character background/scenario is the default.

Whether the first proof of concept needs a basic follower NPC or waits until the core world is stable.

Whether the proof of concept uses melee only, or melee plus one basic firearm.

I recommend: small town + outskirts, one background, one vehicle, melee and one firearm category, and one basic follower after core zombie gameplay works.

2. Rendering and language direction
For a no-engine browser game, I recommend:

TypeScript for the engine and game logic.

WebGL 2 as the initial direct rendering API.

A custom engine architecture from the beginning.

A static browser build deployable to GitHub Pages.

A desktop-first target initially: keyboard/mouse, modern Chromium/Firefox/Safari-class browsers.

TypeScript is especially useful here because an engine with chunks, saves, entities, inventory definitions, vehicle parts, network messages, and NPC state will become too large to safely manage as untyped JavaScript.

We need not lock ourselves into a permanent renderer on day one. We can organize the rendering layer so that a future WebGPU renderer is possible, but we should not delay the proof of concept for it.

3. Visual target for the proof of concept
“Good visuals later” is the right priority, but we still need a deliberately simple early visual language.

I suggest:

Low-poly / primitive 3D environment geometry.

Simple generated materials and flat or lightweight lighting.

Clear color and silhouette readability for zombies, loot, doors, vehicles, walls, and interactable containers.

Placeholder textures, icons, sounds, and models where needed.

Functional roof-cutaway and object-fading behavior as an early priority.

The goal is debuggable spatial gameplay, not an attractive final art pass. If the camera cannot clearly show an indoor zombie, a blocked doorway, a container, and the player’s position, detailed art will not rescue it later.

4. World geography: fictional procedural US vs. real geographic data
This is a major decision, though it can be deferred slightly.

There are two viable paths:

US-inspired procedural world: realistic climate, settlement, terrain, roads, and architecture, but invented towns and geography.

Real geographic foundation: real elevation, roads, rivers, cities, and other map data, with procedural apocalypse transformation and interiors/content layered over them.

My recommendation:

Build the proof of concept using a fictional, US-plausible procedural region.

Design coordinates/chunks and world-generation interfaces so a real-data generator can be added later.

Decide on real data only after we have demonstrated chunk streaming, terrain, buildings, saving, and performance.

That protects development speed now while preserving the option to pursue a more literal representation of the United States later.

5. Exact world scale and coordinate system
“Endless” should be supported architecturally, but the initial game should use a bounded test area for reliability.

Before implementation we should decide:

Chunk dimensions, such as 32×32 meters or 64×64 meters of world space.

The local precision strategy: world/chunk coordinates use large integers, while rendered entities use local floating-point coordinates.

Terrain resolution and level-of-detail approach.

How far the player can see and how many chunks remain active around them.

What persistently changes in a chunk: containers, doors, structures, fires, corpses, vehicles, terrain modifications, NPC groups, and so on.

The principle is: generate the baseline from the seed; save only changed state.

6. Simulation boundaries
We have agreed on real-time play, single-player tactical pause, and multiplayer real-time. We should now define what is deliberately not simulated at full fidelity yet.

For the first build, likely:

Simulate player, nearby zombies, immediate physical items, local day/night, and basic needs.

Do not simulate distant populations in detail.

Do not simulate full weather fronts, fire propagation, water flow, electricity grids, faction economies, aircraft, or all vehicle physics.

Represent potential future systems through clean interfaces, not incomplete “fake full systems.”

This protects performance and lets us make individual systems solid.

7. Combat realism boundary
“Realistic weapons and armor” can mean vastly different things. We should establish the intended level:

Accessible simulation: caliber/type, ammunition, recoil, reload stages, armor coverage, penetration, durability, noise, and injuries—without turning every fight into military-ballistics software.

Deep simulation: projectile velocity, energy loss, material penetration, ricochet, wound cavities, magazine/chamber mechanics, armor layers, and detailed maintenance.

I recommend starting toward the accessible simulation model, while structuring the data so deeper ballistic calculations can be added later. The proof of concept needs satisfying, understandable combat more than exhaustive modeling.

8. Content and modding strategy
With thousands of items, building types, recipes, weapons, vehicle parts, factions, and scenarios, content must be data-driven from the first prototype.

We should settle:

A versioned text-based content format: likely JSON initially.

Stable IDs for all definitions.

Schemas and validation tools to catch malformed data.

A plan for items, recipes, loot tables, building templates, NPC archetypes, faction definitions, and vehicle parts.

Whether external mod support is an explicit long-term goal.

My recommendation is to design the content format as if mods may come later, even if we do not expose mod loading immediately.

9. Single-player world rules and multiplayer model
The rules are broadly clear, but implementation needs one early decision:

Is multiplayer a future dedicated-server mode, with the first year focused entirely on single-player?

Or must the earliest simulation run through a server-compatible local-host model?

I recommend:

Build single-player first.

Keep game state changes command-based and fixed-timestep, as discussed.

Define clean serialization/network-message boundaries.

Do not implement actual networking during the first proof of concept.

Trying to prove rendering, world generation, inventory, zombies, vehicles, persistence, NPCs, and networking all at once is likely to stall the project.

10. Project process and quality bar
For a project this long, we should establish development habits immediately:

Every milestone produces a browser-playable build.

Core game logic has automated tests where practical.

Procedural generation is seed-reproducible.

Save formats are versioned and migratable.

Debug tools are treated as engine features, not temporary hacks.

Performance targets are measured continuously.

Game content is validated automatically.

Each major system has a small vertical-slice test world.

We should also use source control conventions from day one: small focused commits, a readable change log, and short design notes alongside major systems.

Things We Can Intentionally Defer
We do not need final answers yet for:

The complete US terrain/data pipeline.

Every apocalypse event and late-game creature.

Final graphics style and detailed models.

The full NPC personality/faction simulation.

Aircraft, trains, boats, and advanced vehicle modules.

Final multiplayer game modes, hosting, anti-cheat, and server scaling.

Thousands of actual items.

Mod distribution.

The complete story/lore timeline.

Those should be shaped by working prototypes rather than speculation.

Best Next Planning Step
I think we are ready to write a concise project foundation document before code, covering:

The one-paragraph game identity.

Core design pillars.

Non-goals for the proof of concept.

Technical constraints: browser, TypeScript, direct WebGL 2, static GitHub Pages deployment.

Time and death/succession rules.

World generation, chunk persistence, and simulation-level principles.

The exact proof-of-concept gameplay loop and acceptance criteria.

A phased roadmap.

After that, the next concrete task would be scaffolding the minimal custom web engine and rendering a controllable 3D player/camera in a generated test chunk—not building the entire game at once.

Two final preference questions would meaningfully shape that document:

Should the camera be freely rotatable, or limited to clean 90-degree rotations like many isometric survival games?

Do you want stylized low-poly realism as the long-term visual direction, or ultimately more grounded/high-detail realistic visuals once the systems are proven?

I think the basic idea is US inspired, like what would happen if? Not wholly, draw earth on a map ts. I think it will be "realistic" elevation, roads, rivers, cities, and other map data, not real. Chunk size being whatever is needed and more reliable for houses, and stuff later on. Idk about the terrain resolution/ level of detail. I think render distance should be decoupled from sim distance, so you can see far without overdoing it on sim. We are definitely building single player first. I think the camera should be freely rotatable, to a degree. I was thinking like high detail, very very real looking game.
Copy
That gives us a clearer and more coherent direction.

World Direction: Fictional, but Geographically Realistic
The world should be US-inspired rather than a literal 1:1 United States map.

In practical terms, that means:

The terrain follows believable continental geography: mountain chains, rolling uplands, plains, forests, deserts, coastlines, rivers, lakes, wetlands, and oceans.

Roads follow the terrain and human settlement logic rather than being random lines.

Cities, suburbs, rural towns, industrial districts, farms, rail corridors, highways, ports, airports, and utility infrastructure exist for believable reasons.

Buildings have plausible layouts, contents, and construction styles for their place and purpose.

The game can evoke recognizable regions—Appalachia, Gulf Coast, Great Plains, Pacific Northwest, desert Southwest, Midwest suburbs—without reproducing real towns, addresses, people, businesses, or road layouts.

That gives us the realism and “what if this happened in America?” feeling while letting world generation serve gameplay. We can place a compelling town where the terrain, road network, and player’s story need it, rather than being trapped by exact real-world geography.

A good internal description is:

A procedurally generated North American continent built from realistic geographic and settlement rules.

Render Distance and Simulation Distance Should Be Separate
Completely agreed. This needs to be an explicit engine rule.

A player should be able to look across a valley, see a city skyline, mountain range, highway, forest canopy, or ocean horizon without the game running detailed AI, collision, loot containers, interiors, and physics across that entire visible space.

We can use several distance bands:

Distance band	Rendering	Simulation
Immediate	Full-detail terrain, buildings/interiors, items, characters, vehicles, shadows	Full collision, interactions, zombies, NPC actions, combat, inventory access
Near	Detailed exterior geometry, vegetation, simplified entities	Reduced AI updates, no unnecessary interior/item simulation
Mid-distance	Lower-detail terrain/buildings, simplified vegetation, skyline meshes	Abstract groups/events only; no individual active physics
Far distance	Terrain level-of-detail, distant mountains/cities, atmospheric fog/haze	No detailed simulation; only regional/world state
Beyond view	Not rendered	Stored/generated region data and coarse event simulation only
This lets the world look huge while the active simulation remains limited and predictable.

For example, from a hill the player may see a distant town:

The terrain and town silhouette render at low detail.

The game may know that the town has an abstract survivor population, zombie pressure, loot depletion level, and faction influence.

It does not instantiate thousands of actual houses, containers, zombies, pathfinding agents, and physical item objects until the player travels close enough.

When the player approaches, that coarse regional state determines the detailed version they enter.

Chunk Size Should Follow Content Boundaries, Not a Random Number
You are right not to arbitrarily commit to a tiny chunk size now.

A house, a parking lot, a highway interchange, a large warehouse, and a farm all have different practical needs. The answer is likely to use multiple spatial grids, each for a different purpose:

Terrain tiles: relatively large areas for terrain height, biome, river placement, distant rendering, and level of detail.

World-generation cells: moderate areas used to determine roads, district types, building lots, points of interest, and ambient population.

Object/simulation cells: smaller areas used for loaded buildings, items, zombies, collision, vehicles, and save deltas.

Building/interior instances: their own local coordinate spaces, allowing a large building to cross a cell boundary safely.

This avoids a false choice where every system must use exactly one chunk size.

A large terrain tile might cover an entire town district; a smaller simulation cell could load only the streets and building interiors around the player; and a building’s data can still be generated as a coherent whole even when its footprint crosses several loaded cells.

Terrain Resolution and LOD: Start With a Scalable Approach
We do not need final terrain numbers yet, but the proof-of-concept renderer should be built with the future in mind.

For a high-detail 3D game, the terrain strategy needs:

Near terrain: high enough resolution for walking, slopes, roads, building foundations, ditches, riverbanks, and vehicle movement.

Distant terrain: lower-resolution meshes that preserve the broad landscape silhouette.

Progressive LOD: multiple terrain detail levels, so high-resolution terrain exists only near the player.

Seam management: adjacent detail levels must avoid visible cracks or popping.

Vegetation LOD: individual nearby trees/grass, clustered trees at distance, then forest-canopy representation farther away.

Atmospheric perspective: fog, haze, color shifts, and lighting reduce visual popping and make a large world look natural.

Road and river overlays: roads/rivers should conform to terrain and have their own level-of-detail handling.

A common useful concept here is a terrain clipmap or a concentric terrain-ring system:

High-detail terrain is always centered on the player.

Each ring farther away contains less geometric detail.

As the player moves, the rings update/stream seamlessly.

Distant geography remains visible without loading the whole world at close resolution.

We do not need to commit to exact implementation until we begin the terrain proof of concept, but this is the type of structure we should plan for.

High-Detail, Realistic Visuals: Treat Them as a Later Rendering Tier
This is compatible with the project, but it needs a realistic expectation:

“Very realistic” should be a long-term target for the close-up world, not the minimum visual bar for the first build.

A browser game with a custom renderer can eventually look very good, but high-detail visuals increase complexity in every direction:

Detailed 3D asset pipeline.

Material/shader system.

Lighting, shadows, reflections, ambient occlusion, fog, and post-processing.

Large texture streaming and GPU memory management.

Vegetation, weather effects, particles, decals, and destruction visuals.

Animation, inverse kinematics, ragdolls, and vehicle damage representation.

Efficient visibility culling and instancing.

Multiple quality settings for a wide range of browser hardware.

So the development sequence should be:

Readable functional 3D — simple geometry, flat/basic materials, reliable visibility, playable camera.

Technically scalable 3D — chunk streaming, terrain LOD, object LOD, occlusion, instancing, shadow system, asset pipeline.

High-fidelity art and lighting — detailed modular environment assets, materials, weather, animation, post-processing, and graphics-quality controls.

The engine should support the final visual target without trying to achieve it before the game can prove survival, world streaming, and interaction are fun.

Freely Rotatable Camera, With Guardrails
A freely rotatable camera is appropriate for 3D terrain, interiors, vehicles, and high-detail scenery.

I would still constrain it enough to maintain gameplay clarity:

Continuous yaw rotation around the player.

Controlled pitch with a minimum and maximum elevation; no disorienting floor-level or fully vertical angle during normal play.

Smooth zoom with practical minimum/maximum ranges.

Optional snap-to-cardinal headings for players who prefer it.

Camera collision avoidance around terrain, tall buildings, trees, and indoor ceilings.

Roof/wall/interior occlusion rules that respond to the camera direction.

Separate tuned camera behavior for walking, driving, and aircraft later.

The core challenge is visibility inside realistic buildings. A camera system may need to fade roofs, hide upper floors, selectively fade walls between the camera and player, and use interior lighting/outline cues. That is worth including in the earliest 3D prototype because it affects how every building must be authored.

What We Have Now Decided
We have enough direction to treat these as working project foundations:

Game world: fictional, procedurally generated, geographically and culturally inspired by modern North America/the United States.

World scale: effectively unbounded through deterministic generation, streaming, and persisted changes.

World realism: believable elevation, biomes, hydrology, roads, settlements, buildings, loot, equipment, and vehicles—not literal real-world map reproduction.

Presentation: high-detail realistic 3D as the long-term target.

Camera: top-down-like, elevated, zoomable, and freely rotatable within practical pitch limits.

Performance rule: render distance and simulation distance are separate.

Development order: single-player first, with an eventual multiplayer-compatible simulation architecture.

Engine: custom browser engine and game, deployed statically through GitHub Pages.

Time: real-time play, tactical pause in single-player, and no individual pause in multiplayer.

Death: permanent survivor death; single-player succession through eligible close followers; campaign ends without a successor unless a chosen mode says otherwise.

NPCs: systemic individuals with relationships, needs, goals, memories, factions, and coarse distant simulation.

The Remaining Decisions Before We Can Safely Start the First Proof of Concept
We can defer almost everything else. The only choices I would ask you to settle before we write the project foundation and begin engine work are:

Starting scene: What should the first playable scenario be?
My recommendation is an ordinary survivor at home in a low-density small-town/suburban edge, with a garage, nearby houses, a road, woods/farmland, and an initial zombie incident. It exercises interiors, loot, survival, vehicle potential, terrain, and realistic settlement generation without requiring a full city.

First-person versus direct-control emphasis:
Should controls feel like an action survival game—WASD movement, mouse aiming/interacting—or more like a deliberate tactical simulation with click-to-move/command controls?
Given the freely rotating 3D camera and real-time combat, I recommend direct WASD action controls, with tactical pause for deeper decisions.

Initial melee/combat level:
Should the first playable combat system begin with improvised melee only, or should it include a simple firearm immediately?
I recommend both: one improvised melee weapon and one common civilian firearm, with basic ammunition, noise, reloading, zombies, and one armor/clothing interaction.

Minimum supported hardware/performance target:
Is the initial target a reasonably modern desktop/laptop browser, even if lower-end devices will need reduced graphics later?
For the high-detail long-term ambition, I recommend targeting modern desktop browsers first and adding quality presets/mobile consideration only after the engine foundation works.

Once those are answered, we can write down the exact first milestone and start implementation without prematurely locking down the rest of the game.

Use a generic American city in the area of idk, New York, maine, Georgia, the Carolinas, etc (east coast) for reference ig. Definitely wsad, I guess we could add other control methods for weirdos. 3, ofc both. the absolute minimum with low graphics and crappy settings of course would be like a Chromebook (playable, not good, but playable). The minimum for ideal playing would be around modern desktops.
Copy
That is enough to establish a strong first milestone direction.

Initial Region: Fictional East-Coast American City
We should create a fictional East Coast city and surrounding region, inspired broadly by the Northeast/Mid-Atlantic/Atlantic seaboard rather than any one real place.

That gives us room to combine the best gameplay features from the areas you mentioned:

Dense older downtown blocks and mixed-use streets.

Suburbs with detached homes, garages, schools, small stores, and strip malls.

Industrial waterfront or rail-adjacent zones.

Forest, rivers, wetlands, farmland, or rolling hills outside the city.

Major highways, smaller state roads, bridges, overpasses, rail infrastructure, and rest stops.

Weather that can eventually include rain, fog, storms, snow in colder variants, and hurricane/coastal-storm conditions where appropriate.

Rather than deciding “it is New York” or “it is Georgia,” the first city can be deliberately fictional—something like a coastal Mid-Atlantic city with an inland rural edge. That is flexible enough to support urban survival, suburban looting, vehicle travel, forests, waterways, industry, and later regional expansion.

We can eventually make different generated regional archetypes:

Northern coastal / New England-like.

Appalachian / inland Northeast-like.

Mid-Atlantic urban corridor.

Southeastern coastal / Carolinas-Georgia-like.

Gulf, Midwest, plains, Southwest, mountain west, and Pacific regions.

But the proof of concept should deeply support one regional archetype first.

Controls: Direct Action, With Extensible Input
The default control scheme should be keyboard/mouse direct action:

WASD: movement relative to the camera or selected control mode.

Mouse: camera orbit, aiming, pointing, interaction selection, and UI.

Scroll wheel: zoom.

Keyboard actions: interact, inventory, sprint, crouch, reload, quick slots, map, pause, and vehicle controls.

Freely rotatable elevated camera: normal top-down-like view, with controlled pitch and zoom.

We should design the input system as an action-binding layer, not hard-code “W means move forward” throughout gameplay. That makes later support possible for:

Remappable keyboard bindings.

Controller/gamepad input.

Accessibility mappings.

Click-to-move or tactical controls as an optional mode.

Touch controls only if they ever become worthwhile.

The playable default stays WASD/mouse; alternative controls should not complicate the initial game loop.

First Combat Slice: Melee and Firearms
Agreed—the proof of concept should have both.

A good first minimum set is:

One improvised melee weapon: pipe, crowbar, hammer, bat, or similar.

One edged melee option: knife or hatchet, to test reach/speed/damage differences.

One common civilian firearm: a handgun or basic semi-automatic rifle.

One ammunition type for the first firearm.

Basic reload stages: empty, partial magazine, magazine insertion/removal, chamber state later if appropriate.

Noise propagation: firearm use attracts nearby zombies and communicates danger through the environment.

Basic clothing/armor interaction: normal clothing plus perhaps a protective vest or heavy workwear, enough to prove coverage, durability, and encumbrance rules.

Zombie hit reactions, injury, death, and body persistence at a limited scope.

That is enough to validate whether combat feels tense and realistic without implementing every caliber, armor type, projectile model, and weapon modification system immediately.

Hardware and Graphics Targets
The performance target should be tiered from the beginning.

Minimum playable target
A Chromebook or similar lower-end integrated-graphics device should be able to run the game in a deliberately reduced mode:

Lower internal render resolution.

Shorter render distance.

Simpler terrain/vegetation detail.

Fewer shadow updates or disabled expensive shadows.

Reduced post-processing.

Simplified lighting/material features.

Reduced number of visible animated entities and particles.

Conservative simulation radius.

Stable “playable” frame rate, even if visual quality is noticeably basic.

The goal here is not photorealism. It is a functional, readable game that does not crash or become unresponsive.

Recommended / ideal target
Modern desktop browsers and reasonably current desktop hardware can enable:

Longer terrain and skyline view distance.

Better terrain, building, and vegetation LOD.

Higher-resolution textures/materials.

Dynamic shadows and improved lighting.

Weather effects, denser foliage, and richer particles.

Higher-quality ambient occlusion, fog, reflections, and post-processing.

Greater visual density around active city areas.

This is the correct approach for a high-detail browser title: one scalable engine with explicit quality settings, not a game that assumes every browser has desktop GPU capacity.

We should include a small performance overlay from the earliest prototype, showing frame time, loaded chunks, draw calls, active entities, terrain detail level, and memory estimates. High-fidelity visuals will be possible only if performance decisions are visible early instead of guessed at later.

First Proof-of-Concept Definition
At this point, I would define the first playable proof of concept as:

A single-player, direct-control 3D survival game running in a browser. A survivor awakens in a fictional East-Coast American city district with homes, roads, simple interiors, vegetation, and a nearby garage/vehicle opportunity. The player uses WASD and mouse controls to explore a streamed terrain area, scavenge containers, manage basic hunger/thirst/health and inventory, fight or evade zombies with melee and a firearm, drive one basic vehicle, and save/load the persistent world. The renderer supports a low-Chromebook profile and a higher-quality modern-desktop profile.

That is still a substantial milestone, but it is a real vertical slice of your intended game—not merely a spinning cube or generic tech demo.

We Are Ready to Move From Planning Into Foundation Work
I do not think there is another design question that must block us from beginning. The next work should be intentionally non-glamorous but essential:

Write the project foundation/design document.

Set up the browser build, development workflow, and GitHub Pages deployment path.

Define the custom engine module boundaries.

Implement a minimal WebGL 2 renderer and scalable graphics-quality configuration.

Build the controllable camera/player test scene before terrain, buildings, combat, or item systems.

Add systems in vertical slices, keeping the project playable at every milestone.

When you say the word, we can move from discussion into that first foundation phase.

Go
Copy
Summary

Added the custom browser-game foundation: direct WebGL 2 rendering, an orbitable elevated camera, WASD movement, zoom, runtime FPS/position readouts, and high/low quality modes. 

Added a deterministic 3D East-Coast-inspired test region with terrain, building, vegetation, and player-marker geometry. 

Documented the agreed game direction, world/simulation rules, technical constraints, and first vertical-slice scope. 

Added local run/control instructions and a GitHub Pages deployment workflow for the work branch. 

Committed the foundation as 474e2cb (feat: scaffold custom WebGL game foundation) and created the requested pull request metadata.

Testing

✅ tsc --noEmit

✅ git diff --cached --check

⚠️ npm install && npm run typecheck && npm run build — dependency installation is blocked in this environment by an npm registry HTTP 403, so the Vite production build and browser screenshot could not be run locally.
