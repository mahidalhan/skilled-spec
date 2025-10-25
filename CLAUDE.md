# Spec-Driven Development Skills for Claude Code

This project provides four Claude Skills that enable **spec-driven development** - a methodology where you plan features with specifications before writing code. These skills activate automatically through natural language when you use Claude Code.

## Core Workflow: Three-Stage Development

ALWAYS follow this three-stage workflow when using these skills:

1. **PROPOSE** → Create structured specification proposals
2. **IMPLEMENT** → Build features with test-driven development
3. **ARCHIVE** → Merge specifications and preserve history

DO NOT skip stages. Each stage builds on the previous one.

---

## Skill Activation Rules

### When Planning Features (spec-proposal-creation)

**Activate when the user says:**
- "I want to add [feature]"
- "Create a proposal for [feature]"
- "Plan out [feature]"
- "Design a spec for [feature]"
- "Let's spec [feature]"

**What you MUST do:**
1. Generate a unique `change-id` (kebab-case, descriptive)
2. Create `spec/changes/{change-id}/` directory structure
3. Write `proposal.md` (Why, What, Impact sections)
4. Create `tasks.md` with numbered implementation checklist
5. Generate spec deltas in `specs/{capability}/spec-delta.md`
6. Use EARS format for all requirements (see below)
7. Validate structure with grep patterns before presenting
8. Present the proposal for user approval

**File structure you create:**
```
spec/changes/{change-id}/
├── proposal.md
├── tasks.md
└── specs/
    └── {capability}/
        └── spec-delta.md
```

**IMPORTANT:** DO NOT implement code during proposal creation. This stage is for planning only.

### When Implementing Features (spec-implementation)

**Activate when the user says:**
- "Implement [feature]"
- "Build the [feature] proposal"
- "Execute the [change-id] change"
- "Apply the [feature] spec"

**What you MUST do:**
1. Read `spec/changes/{change-id}/proposal.md` and `tasks.md`
2. Set up TodoWrite to track all tasks visibly
3. Execute tasks ONE AT A TIME, sequentially
4. Test each task before marking it complete
5. NEVER mark a task complete if:
   - Tests are failing
   - Implementation is partial
   - You encountered unresolved errors
   - You couldn't find necessary files
6. When all tasks complete, create `spec/changes/{change-id}/IMPLEMENTED` marker file

**TodoWrite integration:**
- Create one todo per task from `tasks.md`
- Mark exactly ONE todo as `in_progress` at a time
- Test thoroughly before marking `completed`
- Update status in real-time

**IMPORTANT:** Use test-driven development. Write tests first, verify they fail, then implement until they pass.

### When Archiving Deployed Changes (spec-archiving)

**Activate when the user says:**
- "Archive the [feature] change"
- "Merge the [feature] specs"
- "Finalize [change-id]"
- "Mark [feature] as deployed"

**What you MUST do:**
1. Verify `IMPLEMENTED` marker exists in `spec/changes/{change-id}/`
2. Create timestamped archive: `spec/archive/YYYY-MM-DD-{change-id}/`
3. Merge spec deltas into living specs using these rules:
   - **ADDED** → append requirements to `spec/specs/{capability}/spec.md`
   - **MODIFIED** → replace entire requirement block in place
   - **REMOVED** → delete requirement, add deprecation comment
4. Move entire change directory to archive
5. Validate merged spec structure with grep

**IMPORTANT:** NEVER archive a change that hasn't been implemented and tested.

### When Discovering Context (spec-context-loading)

**Activate when the user says:**
- "What specs exist?"
- "Show me [capability] spec"
- "What changes are active?"
- "Find specs about [keyword]"
- "Show project context"

**What you MUST do:**
1. Use bash/grep to discover specifications and changes
2. Provide high-level overview FIRST
3. Ask which area user wants to explore
4. Show specific details only when requested
5. Format output clearly with markdown

**DO NOT:**
- Dump entire spec files without user request
- Show raw grep output without formatting
- List every requirement by default

---

## EARS Requirement Format

ALL requirements MUST use EARS (Easy Approach to Requirements Syntax):

### Requirement Structure
```markdown
### Requirement: [Descriptive Name]
WHEN [trigger condition],
the system SHALL [binding requirement].

#### Scenario: [Scenario Name]
GIVEN [precondition]
WHEN [action]
THEN [expected result]
AND [additional result]
```

### EARS Keywords You MUST Use

- **Triggers**: WHEN, IF, WHERE, WHILE (choose one)
- **Binding**: SHALL or MUST (for requirements)
- **Scenarios**: GIVEN, WHEN, THEN, AND (for test cases)

### Example
```markdown
### Requirement: User Login
WHEN a user submits valid credentials,
the system SHALL authenticate the user and create a session.

#### Scenario: Successful Login
GIVEN a user with email "user@example.com" and correct password
WHEN the user submits the login form
THEN the system creates an authenticated session
AND redirects to the dashboard
```

**IMPORTANT:** Every requirement MUST have at least one scenario. Scenarios make requirements testable.

---

## Validation Patterns

Before completing any proposal or archive operation, YOU MUST validate:

### Proposal Validation
```bash
# Check for required sections
grep -c "## Why" spec/changes/{change-id}/proposal.md
grep -c "## What" spec/changes/{change-id}/proposal.md
grep -c "## Impact" spec/changes/{change-id}/proposal.md

# Validate delta operations
grep -c "## ADDED\|MODIFIED\|REMOVED" spec/changes/{change-id}/specs/**/*.md

# Check requirement format
grep -n "### Requirement:" spec/changes/{change-id}/specs/**/*.md
grep -n "#### Scenario:" spec/changes/{change-id}/specs/**/*.md
```

### Implementation Validation
```bash
# Verify IMPLEMENTED marker
test -f spec/changes/{change-id}/IMPLEMENTED

# Count completed tasks
grep -c "^[0-9]\+\." spec/changes/{change-id}/tasks.md
```

### Archive Validation
```bash
# Verify living spec structure
find spec/specs -name "spec.md" -type f

# Check for orphaned changes
find spec/changes -maxdepth 1 -type d -not -path "spec/changes"
```

---

## File Structure You Work With

```
spec/
├── specs/                      # Living specifications (current state)
│   ├── authentication/
│   │   └── spec.md
│   ├── billing/
│   │   └── spec.md
│   └── {capability}/
│       └── spec.md
├── changes/                    # Active proposals (work in progress)
│   ├── add-feature/
│   │   ├── proposal.md
│   │   ├── tasks.md
│   │   ├── IMPLEMENTED         # Created when implementation complete
│   │   └── specs/
│   │       └── {capability}/
│   │           └── spec-delta.md
│   └── {change-id}/
└── archive/                    # Completed changes (historical record)
    └── YYYY-MM-DD-{change-id}/
```

**Two-folder model:**
- `specs/` = source of truth (always current)
- `changes/` = proposals in flight (temporary)
- `archive/` = completed history (permanent record)

---

## Anti-Patterns (DO NOT Do These)

1. **DO NOT implement code during proposal creation**
   - Proposal stage is for planning only
   - Code comes during implementation stage

2. **DO NOT skip validation**
   - Always run grep validation patterns
   - Check file structure before marking complete

3. **DO NOT mark tasks complete with failing tests**
   - Test thoroughly before marking complete
   - If blocked, create new task describing blocker

4. **DO NOT merge specs without IMPLEMENTED marker**
   - Archive only happens after successful implementation
   - Verify marker file exists before archiving

5. **DO NOT use vague requirement language**
   - Always use EARS format (WHEN...SHALL)
   - Always include scenarios (GIVEN...WHEN...THEN)

6. **DO NOT mix stages**
   - Complete one stage fully before moving to next
   - Follow: Propose → Implement → Archive

7. **DO NOT create empty or placeholder requirements**
   - Every requirement must be specific and testable
   - Every requirement must have at least one scenario

8. **DO NOT skip TodoWrite during implementation**
   - Always set up visible progress tracking
   - Update status in real-time as you work

---

## Common Bash Commands

### Discovery
```bash
# List all specifications
find spec/specs -name "spec.md" -type f

# List active changes
find spec/changes -maxdepth 1 -type d -not -path "spec/changes"

# Search requirements by keyword
grep -r "### Requirement:" spec/specs/ | grep -i "auth"
```

### Validation
```bash
# Validate EARS format
grep -n "SHALL\|MUST" spec/changes/{change-id}/specs/**/*.md
grep -n "GIVEN\|WHEN\|THEN" spec/changes/{change-id}/specs/**/*.md

# Check implementation status
test -f spec/changes/{change-id}/IMPLEMENTED && echo "Ready to archive"
```

### Archiving
```bash
# Create archive with timestamp
DATE=$(date +%Y-%m-%d)
mv spec/changes/{change-id} spec/archive/$DATE-{change-id}
```

---

## Installation Options

### Option 1: Plugin Installation (Recommended)

Install as a Claude Code plugin for automatic setup:

```bash
# Add the marketplace
/plugin marketplace add https://github.com/yourusername/specd-out-skills

# Install the plugin
/plugin install spec-driven-dev
```

### Option 2: Direct Copy

Copy skills directly into your project:

```bash
# For existing projects
git clone https://github.com/yourusername/specd-out-skills .claude/plugins/spec-driven-dev
cp -r .claude/plugins/spec-driven-dev/skills .claude/

# For new projects
git clone https://github.com/yourusername/specd-out-skills
cd specd-out-skills
```

---

## Remember

- This is **spec-driven development**, not vibe coding
- Specifications come BEFORE code
- Tests come BEFORE implementation
- Validation comes BEFORE completion
- The workflow is ALWAYS: Propose → Implement → Archive

When in doubt, ask the user for clarification. Better to pause and align than to proceed with assumptions.

---

**These skills were inspired by [OpenSpec](https://github.com/Fission-AI/OpenSpec) and follow the EARS requirements format.**
