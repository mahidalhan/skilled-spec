# Architecture Introspector Skill

A Claude Code skill for systematic architecture analysis using first principles thinking, SpaceX's 5-step engineering methodology, and software modularity principles.

## What It Does

This skill enables rigorous evaluation of software architectures by:

1. **Questioning every requirement** - Traces decisions to origins, challenges assumptions
2. **Deleting unnecessary complexity** - Removes abstractions that don't earn their keep
3. **Simplifying what remains** - Reduces cognitive load and improves clarity
4. **Accelerating cycle time** - Identifies and removes bottlenecks
5. **Automating validated patterns** - Only after deletion and simplification

## Core Principle

**"Modularity without reuse is bureaucracy"**

The skill enforces the 2-3 rule:
- **Services/helpers**: Extract only when 2+ consumers exist
- **Utilities**: Extract only when used 3+ times
- **Below threshold**: Keep code cohesive, inline the logic

## When to Use

- Analyzing existing architectures
- Evaluating proposed architectural changes
- Identifying technical debt
- Planning refactoring efforts
- Code review of abstractions
- Onboarding to complex codebases
- Deciding what to keep/kill/consolidate

## Installation

1. Download `architecture-introspector.zip`
2. In Claude Code, install the skill (instructions depend on your Claude Code version)
3. Invoke with: "Use the architecture-introspector skill to analyze..."

## Example Usage

**System-wide analysis**:
> "Use the architecture-introspector skill to analyze our backend architecture. We have concerns about complexity - it takes too many files to add simple features."

**Specific decision**:
> "Use the architecture-introspector skill to evaluate whether we should extract our authentication logic into a shared service."

**Refactoring plan**:
> "Use the architecture-introspector skill to identify deletion candidates in our API layer. Focus on services with single consumers."

**Onboarding**:
> "Use the architecture-introspector skill to help me understand why this codebase is structured this way and identify potential improvements."

## What You Get

A comprehensive analysis report including:

- **Current State Map** - Component inventory with consumer counts
- **Challenged Assumptions** - Validation of architectural decisions
- **Deletion Candidates** - Specific components to remove with justification
- **Simplification Plan** - How to reduce complexity
- **Acceleration Opportunities** - Bottleneck identification
- **Automation Candidates** - Patterns ready for tooling
- **Implementation Plan** - Phased approach with metrics

## Philosophy

Based on SpaceX's engineering approach:

> "The most common error is optimizing something that shouldn't exist."
> — Elon Musk

The skill helps you:
- Delete first, optimize later (or never)
- Question inherited patterns
- Reject premature abstraction
- Measure impact (LOC, component count, deployment time)
- Start small with quick wins

## Anti-Patterns Detected

- **Enterprise Fizz-Buzz** - 15 files for simple logic
- **Premature Abstraction** - "We might need this later"
- **Cargo Cult Architecture** - "Netflix does it, so should we"
- **Resume-Driven Development** - Latest tech for simple problems
- **Not-Invented-Here** - Rebuilding proven solutions poorly

## Success Metrics

A successful analysis achieves:
- ✅ Fewer components (deletion complete)
- ✅ Clear justifications for what remains
- ✅ High cohesion within modules
- ✅ Low coupling between modules
- ✅ Fast feedback loops
- ✅ Easy onboarding
- ✅ Every abstraction earns its keep

## Contents

- **SKILL.md** - Main skill instructions (13.3 KB)
- **references/first_principles_framework.md** - Detailed framework, decision trees, templates (9.3 KB)

## License

See LICENSE.txt for complete terms.

---

**Remember**: Good architecture is defined more by what it doesn't have than by what it does have.
