# Spec Workflow Guide

Complete guide to using the spec-driven development workflow.

## The Three-Phase Cycle

### Phase 1: Proposal (Planning)

**Skill**: `spec-proposal-creation`

**When**: Before starting any feature or change

**Creates**:
- `spec/changes/{change-id}/proposal.md` - Why, What, Impact
- `spec/changes/{change-id}/tasks.md` - Implementation checklist
- `spec/changes/{change-id}/specs/**/*.md` - Spec deltas (ADDED/MODIFIED/REMOVED)

**Example trigger**:
```
Create a proposal for adding two-factor authentication
```

**Output**:
```
spec/changes/add-2fa/
├── proposal.md
├── tasks.md
└── specs/
    └── authentication/
        └── spec-delta.md
```

---

### Phase 2: Implementation (Building)

**Skill**: `spec-implementation`

**When**: After proposal is approved

**Process**:
1. Loads tasks from `tasks.md`
2. Creates TodoWrite checklist
3. Executes each task using TDD:
   - Write test first (Red)
   - Implement minimum code (Green)
   - Refactor if needed
4. Marks IMPLEMENTED when all tasks complete

**Example trigger**:
```
Implement the add-2fa proposal
```

**Integration with Orchestrate**:
```
# For parallel tasks
/orchestrate "Update docs, add tests, update changelog for 2FA"

# Claude launches all 3 simultaneously
```

---

### Phase 3: Archiving (Completing)

**Skill**: `spec-archiving`

**When**: After implementation is deployed

**Process**:
1. Verifies IMPLEMENTED marker exists
2. Merges spec deltas into living specs:
   - REMOVED (delete requirements)
   - MODIFIED (update requirements)
   - ADDED (append requirements)
3. Moves change to `spec/archive/{date}-{change-id}/`

**Example trigger**:
```
Archive the add-2fa change
```

**Result**:
- Living specs updated with new requirements
- Change folder archived with timestamp
- History preserved

---

## Context Discovery

**Skill**: `spec-context-loading`

**When**: Need to understand existing specs

**Capabilities**:
- List all specifications
- Find requirements by keyword
- Show active/archived changes
- Search scenarios
- Project dashboard

**Example triggers**:
```
What specs exist for authentication?
Show me all active changes
Find requirements about sessions
```

---

## Complete Example Workflow

### Scenario: Add API Rate Limiting

#### 1. Create Proposal
```
User: "Create a proposal for adding rate limiting to our API"

Claude uses spec-proposal-creation:
├── Creates spec/changes/add-rate-limiting/
├── Writes proposal.md (Why: prevent abuse, What: rate limiter, Impact: all APIs)
├── Creates tasks.md (8 tasks: add middleware, tests, docs, etc.)
└── Creates spec-delta.md with ADDED requirements
```

####2. Implement
```
User: "Implement the add-rate-limiting proposal"

Claude uses spec-implementation:
├── Loads 8 tasks into TodoWrite
├── Task 1: "Add rate limit middleware"
│   ├── Writes test for middleware (fails)
│   ├── Implements middleware (test passes)
│   └── Marks task 1 complete
├── Tasks 2-5 (sequential dependencies)
├── Tasks 6-8 (independent - uses /orchestrate for parallel execution)
│   ├── Update API docs
│   ├── Add integration tests
│   └── Update changelog
└── Marks IMPLEMENTED
```

#### 3. Archive
```
User: "Archive add-rate-limiting"

Claude uses spec-archiving:
├── Verifies IMPLEMENTED exists
├── Reads spec-delta.md
├── Merges ADDED requirements into spec/api/rate-limiting.md
├── Moves to spec/archive/2025-10-28-add-rate-limiting/
└── Commits merged specs
```

#### 4. Later: Discovery
```
User: "What rate limiting requirements do we have?"

Claude uses spec-context-loading:
├── Searches for "rate limit" in specs
├── Finds spec/api/rate-limiting.md
└── Shows all rate limiting requirements and scenarios
```

---

## Workflow Patterns

### Pattern 1: Sequential Implementation
For tasks with dependencies (database → model → API → UI):

```
1. Task A (database) → complete
2. Task B (model, depends on A) → complete
3. Task C (API, depends on B) → complete
4. Task D (UI, depends on C) → complete
```

### Pattern 2: Parallel Implementation
For independent tasks (docs + tests + changelog):

```
/orchestrate to run in parallel:
- Task X (update docs)
- Task Y (add tests)
- Task Z (update changelog)

→ All launch together
→ Wait for all to complete
→ Continue
```

### Pattern 3: Hybrid (Sequential + Parallel)
Most real implementations:

```
1. Task A (database) → complete [sequential - foundational]
2. Task B (model) → complete [sequential - depends on A]
3. /orchestrate parallel: [parallel - all depend on B, independent of each other]
   - Task C (API endpoint)
   - Task D (validation)
   - Task E (tests)
4. Task F (integration test) → complete [sequential - depends on C,D,E]
```

---

## Shared Infrastructure

All skills use shared references for consistency:

| Reference | Used By | Purpose |
|-----------|---------|---------|
| EARS_FORMAT.md | Proposal, Archive | Requirement syntax |
| DELTA_OPERATIONS.md | Proposal, Archive | ADDED/MODIFIED/REMOVED |
| TASK_PATTERNS.md | Implementation | TodoWrite + TDD workflow |
| TESTING_STRATEGIES.md | Implementation | Test-first patterns |
| MERGE_LOGIC.md | Archive | How to merge deltas |
| SEARCH_PATTERNS.md | Context Loading | Discovery patterns |
| VALIDATION_PATTERNS.md | Proposal | Validation checks |

---

## Best Practices

### Do:
✅ Create proposal before implementing
✅ Use EARS format for requirements
✅ Write tests before code (TDD)
✅ Mark IMPLEMENTED only after deployment
✅ Archive promptly after deployment
✅ Use /orchestrate for parallel tasks

### Don't:
❌ Skip proposal phase
❌ Implement without tests
❌ Archive before deployment
❌ Forget to mark IMPLEMENTED
❌ Run independent tasks sequentially (use /orchestrate!)

---

## Troubleshooting

**"Skill not triggering"**:
Use explicit language: "Create a proposal...", "Implement the...", "Archive the..."

**"TodoWrite not showing"**:
Implementation skill creates it automatically. Check console output.

**"Archive fails - IMPLEMENTED not found"**:
Add IMPLEMENTED marker to proposal.md before archiving.

**"Merge conflicts"**:
Review spec-delta.md manually, ensure requirement names match living specs exactly.

---

## Next Steps

- Read ORCHESTRATION.md for advanced parallel task patterns
- See shared/references/ for detailed format documentation
- Check README.md for installation and setup
