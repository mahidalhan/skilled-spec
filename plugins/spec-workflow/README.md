# Spec Workflow Plugin

Complete spec-driven development methodology combining structured requirements, test-driven implementation, and systematic archiving.

## What's Included

### 4 Integrated Skills
1. **spec-proposal-creation** - Create structured change proposals with EARS-format requirements
2. **spec-implementation** - Implement changes using test-driven development
3. **spec-archiving** - Archive completed changes and merge into living specs
4. **spec-context-loading** - Discover and load project specifications

### 1 Command
- **orchestrate** - Multi-task coordination with parallel execution support

### Shared Infrastructure
- **7 Reference Documents**: EARS format, delta operations, task patterns, testing strategies, merge logic, search patterns, validation patterns
- **4 Templates**: Proposal, tasks, spec-delta, test-checklist

## Installation

```bash
# Add marketplace
/plugin marketplace add mahidalhan/skilled-spec

# Install plugin
/plugin install spec-workflow@mahidalhan/skilled-spec
```

## Quick Start

### 1. Create a Proposal
Claude will use the `spec-proposal-creation` skill automatically when you mention creating proposals or planning features:

```
Create a proposal for adding user authentication
```

### 2. Implement the Proposal
Use the `spec-implementation` skill to build the feature using TDD:

```
Implement the add-user-auth proposal
```

### 3. Archive When Complete
After deployment, archive and merge spec deltas:

```
Archive the add-user-auth change
```

## The Spec-Driven Workflow

```
┌─────────────────┐
│ 1. PROPOSE      │  Create structured proposal
│ (proposal skill)│  → Why, What, Impact
└────────┬────────┘  → Tasks checklist
         │           → Spec deltas (ADDED/MODIFIED/REMOVED)
         ↓
┌─────────────────┐
│ 2. IMPLEMENT    │  Execute tasks sequentially
│ (implementation)│  → Test-first development
└────────┬────────┘  → TodoWrite tracking
         │           → Orchestrate parallel tasks
         ↓
┌─────────────────┐
│ 3. ARCHIVE      │  Merge spec deltas
│ (archiving)     │  → ADDED → append
└────────┬────────┘  → MODIFIED → replace
         │           → REMOVED → delete
         ↓
┌─────────────────┐
│ Living Specs    │  Updated documentation
│ (context)       │  → Searchable requirements
└─────────────────┘  → Historical changes
```

## Using Orchestrate for Parallel Tasks

The `orchestrate` command enables efficient multi-task execution:

**Example during implementation**:
```
Use /orchestrate to implement these independent tasks in parallel:
1. Update API documentation
2. Add unit tests for validators
3. Update changelog
```

Claude will launch all 3 tasks simultaneously, wait for completion, then continue with dependent tasks.

## Shared References

All skills reference shared documentation to maintain consistency:

- `shared/references/EARS_FORMAT.md` - Requirements syntax
- `shared/references/DELTA_OPERATIONS.md` - How ADDED/MODIFIED/REMOVED work
- `shared/references/TASK_PATTERNS.md` - Task execution with TodoWrite
- `shared/references/TESTING_STRATEGIES.md` - Test-first development
- `shared/references/MERGE_LOGIC.md` - Archiving algorithm
- `shared/references/SEARCH_PATTERNS.md` - Finding specs and requirements
- `shared/references/VALIDATION_PATTERNS.md` - Proposal validation

## Directory Structure

```
spec-workflow/
├── .claude-plugin/
│   └── plugin.json
├── shared/
│   ├── references/    # 7 reference documents
│   └── templates/     # 4 templates
├── commands/
│   └── orchestrate.md # Task coordination
├── skills/
│   ├── spec-proposal-creation/
│   ├── spec-implementation/
│   ├── spec-archiving/
│   └── spec-context-loading/
├── README.md (this file)
├── WORKFLOW.md
└── ORCHESTRATION.md
```

## Advanced Usage

See the detailed guides:
- **WORKFLOW.md** - How skills work together through the complete cycle
- **ORCHESTRATION.md** - Using orchestrate.md for complex multi-task scenarios

## Requirements

- Claude Code (any version with skill support)
- Git (for version control)
- No external dependencies

## Support

- Repository: https://github.com/mahidalhan/skilled-spec
- Marketplace: Skilled Intelligence (`skilled-intelligence`)
- Issues: Report via GitHub issues

## License

See LICENSE.txt in the repository root.
