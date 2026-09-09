# Debugging & Developer Tools

Debugging tools are first-class project infrastructure.

## Required Early Tools

### Performance

Display:

* FPS
* frame time
* simulation time
* render time
* active entities
* loaded chunks
* draw calls
* memory estimates where practical

### World

* current seed
* player coordinates
* current chunk
* loaded chunk count
* chunk boundaries
* generation timing

### Entities

* entity IDs
* collision shapes
* velocity
* current state
* AI state when applicable

### Gameplay

Useful developer commands should eventually include:

```text
/give <item>
/spawn <entity>
/teleport <x> <y> <z>
/time <value>
/weather <type>
/seed
/save
/load
```

These are development tools, not player-facing mechanics.

## Logging

Use categories rather than random console output.

Examples:

```text
[WORLD]
[RENDER]
[SIM]
[AI]
[SAVE]
[INPUT]
[CONTENT]
[NETWORK]
```

Debug logging should be switchable.

## Assertions

Fail close to the cause.

Examples of invariants:

* positions must be finite
* IDs must be valid
* stack counts cannot be negative
* health cannot enter impossible states
* chunk lifecycle transitions must be valid

## Reproduction

When a bug appears, record:

* seed
* coordinates
* relevant entity IDs
* exact action sequence
* expected behavior
* actual behavior

A reproducible bug is dramatically easier to fix.

## Rule

Do not hide errors just to make the console quiet.

A loud, useful error is better than a silent corrupted state.
