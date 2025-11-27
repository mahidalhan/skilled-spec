# Task Orchestration Guide

Advanced guide for using `/orchestrate` with the spec-workflow plugin.

## What is Orchestrate?

The `orchestrate` command enables Claude to manage complex workflows by:
1. Analyzing task dependencies
2. Identifying which tasks can run in parallel
3. Launching parallel tasks in a single message
4. Waiting for completion before continuing

## When to Use Orchestrate

### ✅ Use Orchestrate When:
- Tasks are **independent** (no dependencies between them)
- Tasks can **execute simultaneously**
- You want to **save time** on implementation

### ❌ Don't Use Orchestrate When:
- Tasks have **dependencies** (Task B needs Task A's output)
- Tasks must execute in **specific order**
- Only **one task** to do

## Orchestrate Patterns

### Pattern 1: Documentation + Tests + Changelog
Classic parallel pattern - these tasks are always independent:

```
/orchestrate these tasks:
1. Update API documentation for new endpoints
2. Add unit tests for validation logic
3. Update changelog with new features
```

**Execution**:
```
Message 1: Launches all 3 Task() calls in parallel
↓ (waits for all to complete)
Message 2: "All tasks complete. Ready for next step."
```

### Pattern 2: Multiple API Endpoints
When adding multiple independent endpoints:

```
/orchestrate implementation of:
1. GET /users/{id} endpoint
2. POST /users endpoint
3. PUT /users/{id} endpoint
```

Each endpoint is independent, can be built in parallel.

### Pattern 3: Multi-File Refactoring
Refactoring files that don't depend on each other:

```
/orchestrate refactoring:
1. Rename variables in auth.py
2. Rename variables in database.py
3. Rename variables in api.py
```

## Integration with Spec Implementation

### During Implementation Phase

**Typical spec implementation workflow**:
```
Tasks from tasks.md:
1. Create database schema (sequential - foundation)
2. Implement data models (sequential - depends on 1)
3. Add API validators (parallel ready)
4. Add API endpoints (parallel ready)
5. Add unit tests (parallel ready)
6. Add integration tests (parallel ready)
7. Update API docs (parallel ready)
8. Update changelog (parallel ready)
```

**Orchestration strategy**:
```
# Sequential first
Task 1 → complete
Task 2 → complete

# Then parallel
/orchestrate tasks 3-8 in parallel:
- Add API validators
- Add API endpoints
- Add unit tests
- Add integration tests
- Update API docs
- Update changelog

# All launch together, wait for completion
```

### Mixed Sequential + Parallel

Most implementations follow this pattern:

```
┌─────────────────┐
│ Task 1: Schema  │  Sequential (foundation)
└────────┬────────┘
         ↓
┌─────────────────┐
│ Task 2: Models  │  Sequential (depends on 1)
└────────┬────────┘
         ↓
┌─────────────────────────────────┐
│ /orchestrate Tasks 3-6:         │  Parallel (all depend on 2)
│ - Validators                    │
│ - Endpoints                     │
│ - Tests                         │
│ - Docs                          │
└────────┬────────────────────────┘
         ↓ (wait for all)
┌─────────────────┐
│ Task 7: E2E Test│  Sequential (needs everything)
└─────────────────┘
```

## Real Example: Add Rate Limiting

### Tasks from Proposal
```markdown
1. Add rate limit middleware
2. Add Redis connection for rate tracking
3. Add rate limit configuration
4. Update API endpoints to use middleware
5. Add rate limit tests
6. Update API documentation
7. Add monitoring for rate limits
8. Update changelog
```

### Dependency Analysis
```
Dependencies:
Task 1 (middleware) → Foundation (sequential)
Task 2 (Redis) → Foundation (sequential)
Task 3 (config) → Depends on 1,2 (sequential)

Task 4 (endpoints) → Depends on 1,2,3 (after foundations)
Task 5 (tests) → Depends on 1,2,3 (after foundations)
Task 6 (docs) → Independent (after foundations)
Task 7 (monitoring) → Depends on 1,2,3 (after foundations)
Task 8 (changelog) → Independent (after foundations)

Parallel opportunity: Tasks 4-8
```

### Orchestration Strategy
```
Phase 1 (Sequential):
- Task 1: Add middleware → complete
- Task 2: Add Redis → complete
- Task 3: Add config → complete

Phase 2 (Parallel):
/orchestrate tasks 4-8:
- Update endpoints
- Add tests
- Update docs
- Add monitoring
- Update changelog

→ All 5 tasks launch in single message
→ Wait for completion
→ Mark all complete
→ Done!
```

## TodoWrite Integration

Orchestrate works seamlessly with TodoWrite:

### Before Orchestration
```javascript
TodoWrite([
  {content: "Add middleware", status: "completed"},
  {content: "Add Redis", status: "completed"},
  {content: "Add config", status: "completed"},
  {content: "Update endpoints", status: "pending"},
  {content: "Add tests", status: "pending"},
  {content: "Update docs", status: "pending"},
])
```

### During Orchestration
```javascript
// Mark ALL parallel tasks as in_progress BEFORE launching
TodoWrite([
  ...
  {content: "Update endpoints", status: "in_progress"},
  {content: "Add tests", status: "in_progress"},
  {content: "Update docs", status: "in_progress"},
])

// Launch all Task() calls in parallel
Task("Update endpoints...")
Task("Add tests...")
Task("Update docs...")
```

### After Orchestration
```javascript
// Mark ALL as completed AFTER all finish
TodoWrite([
  ...
  {content: "Update endpoints", status: "completed"},
  {content: "Add tests", status: "completed"},
  {content: "Update docs", status: "completed"},
])
```

## Common Mistakes

### ❌ Mistake 1: Running Sequential Tasks in Parallel
**Bad**:
```
/orchestrate:
1. Create database schema
2. Create models (depends on schema)
3. Create API (depends on models)
```

**Why bad**: Tasks have dependencies, will fail.

**Fix**: Run sequentially, only parallelize independent tasks.

### ❌ Mistake 2: Running Parallel Tasks Sequentially
**Bad**:
```
Task 1: Update docs → wait → complete
Task 2: Add tests → wait → complete
Task 3: Update changelog → wait → complete
```

**Why bad**: Wastes time, these are independent.

**Fix**: Use /orchestrate for all 3.

### ❌ Mistake 3: Forgetting to Wait
**Bad**:
```
Launch 5 parallel tasks → immediately start next sequential task
```

**Why bad**: Next task may depend on parallel completion.

**Fix**: Wait for all parallel tasks before continuing.

## Performance Gains

### Example: 8-Task Implementation

**Without Orchestration (all sequential)**:
- 8 tasks × 3 minutes each = 24 minutes

**With Orchestration (2 sequential + 6 parallel)**:
- 2 tasks × 3 minutes = 6 minutes
- 6 tasks × 3 minutes (in parallel) = 3 minutes
- **Total: 9 minutes (62% faster!)**

## Advanced Patterns

### Pattern: Multi-Stage Parallel
```
Stage 1 (Sequential):
- Foundation task

Stage 2 (Parallel Batch 1):
/orchestrate:
- Task A, B, C

Stage 3 (Sequential):
- Integration task (depends on A, B, C)

Stage 4 (Parallel Batch 2):
/orchestrate:
- Task D, E, F

Stage 5 (Sequential):
- Final task
```

### Pattern: Conditional Parallelization
```
IF (tasks are independent):
  Use /orchestrate
ELSE IF (tasks have dependencies):
  Run sequentially
```

## Quick Reference

| Scenario | Strategy |
|----------|----------|
| Docs + Tests + Changelog | ✅ Orchestrate (always independent) |
| Schema → Model → API | ❌ Sequential (dependencies) |
| Multiple API endpoints | ✅ Orchestrate (independent) |
| File A → Process → File B | ❌ Sequential (dependencies) |
| Refactor 5 unrelated files | ✅ Orchestrate (independent) |

---

**Remember**: Orchestrate saves time but requires independent tasks. When in doubt, run sequentially.
