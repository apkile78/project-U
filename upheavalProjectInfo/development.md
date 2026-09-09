# Development Workflow

This file is the project's anti-chaos system.

## The Core Loop

```text
Choose one small target
        ↓
Understand the problem
        ↓
Implement the simplest solution
        ↓
Run it
        ↓
Test it
        ↓
Inspect the result
        ↓
Commit
        ↓
Repeat
```

## One Task Rule

At any moment, there should be one clearly defined immediate task.

Bad:

> Work on world generation.

Good:

> Generate one deterministic terrain chunk from a seed.

## Small Changes

Prefer changes that can be reviewed and tested independently.

If a task starts touching many unrelated systems, stop and split it.

## Git

Commit frequently.

Good commit examples:

* `renderer: add perspective camera`
* `world: add deterministic chunk seed`
* `player: add collision`
* `inventory: add stackable items`

Keep `main` working.

Use branches for experiments or risky changes.

## AI-Assisted Development

AI is allowed and encouraged as an assistant.

Good uses:

* explaining unfamiliar APIs
* brainstorming designs
* implementing small bounded tasks
* generating boilerplate
* writing tests
* reviewing code
* finding edge cases
* refactoring after behavior is proven

Bad default use:

* asking AI to build entire subsystems without understanding the result
* accepting huge multi-file changes blindly
* repeatedly asking AI to repair problems created by earlier AI changes
* allowing generated architecture to become the architecture by accident

Before accepting significant AI-generated code, be able to answer:

1. What does it do?
2. Why does it exist?
3. What state does it own?
4. What can break?
5. How do I test it?
6. What other systems does it depend on?

## Definition of Done

A task is done when:

* it works
* it has been tested
* it does not obviously break existing behavior
* its boundaries are understandable
* the relevant TODO is checked off
* the change is committed

"Could be better" does not automatically mean "not done."

## Scope Control

When a feature creates another feature, ask:

> Is the new feature required for the current milestone?

If no:

**write it in `IDEAS.md` and continue.**

## Refactoring

Do not refactor constantly.

First make the behavior correct.

Then refactor when:

* duplication is becoming expensive
* boundaries are unclear
* a new feature genuinely requires a better abstraction
* performance measurements show a problem

## Work Session

A good session has:

1. one objective
2. a short plan
3. implementation
4. testing
5. a commit
6. a note about what comes next

Never end a session with a giant pile of uncommitted experimental changes if you can avoid it.
