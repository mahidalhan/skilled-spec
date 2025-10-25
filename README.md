# Spec'd Out Skills

**Spec-driven development for Claude Code, powered by natural language.**

> Inspired by [OpenSpec](https://github.com/Fission-AI/OpenSpec), reimagined as a Claude Code plugin with zero installation friction.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## What is This?

**Stop vibe coding.** Start with specs that both humans and AI understand.

Spec'd Out Skills brings OpenSpec's proven workflow to Claude Code through four composable skills that activate automatically when you talk to Claude. No CLI tools, no commands to memorize—just describe what you want to do.

```
You: I want to add user authentication
Claude: [spec-proposal-creation activates]
        I'll create a spec proposal for user authentication...

        Created:
        - spec/changes/add-user-auth/proposal.md
        - spec/changes/add-user-auth/tasks.md
        - spec/changes/add-user-auth/specs/authentication/spec-delta.md

        Review the proposal. Say "implement it" when ready.
```

### Why Spec-Driven Development?

| Vibe Coding | Spec-Driven Development |
|-------------|------------------------|
| "Just build it" | Plan first, then build |
| AI guesses what you want | AI follows explicit requirements |
| Changes are implicit | Changes are documented |
| No audit trail | Full change history |
| Hard to review | Easy to review |
| Breaks on updates | Survives refactoring |

**The problem**: AI coding assistants are powerful, but without structure, they guess. And guesses compound. One vague request leads to assumptions, which lead to bugs, which lead to rewrites.

**The solution**: Specification-driven development. Human and AI agree on what to build before building it. Changes are proposed, reviewed, implemented, and archived with full traceability.

## The Workflow

```
┌─────────────────────────────────────────┐
│  1. PROPOSE                             │
│  "I want to add search"                 │
│  → Claude creates structured proposal   │
│  → Spec deltas with EARS requirements  │
│  → Implementation tasks                 │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│  2. IMPLEMENT                           │
│  "Implement the search proposal"        │
│  → Claude executes tasks sequentially  │
│  → Tests each task before completion   │
│  → Tracks progress with TodoWrite      │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│  3. ARCHIVE                             │
│  "Archive the search change"            │
│  → Claude merges spec deltas           │
│  → Creates timestamped archive         │
│  → Updates living documentation        │
└─────────────────────────────────────────┘
```

## Quick Start

### Prerequisites

- [Claude Code](https://docs.claude.com/en/docs/claude-code/overview) installed
- A project where you want spec-driven development

### Installation

**Option 1: Plugin Installation (Recommended)**

Install as a Claude Code plugin for automatic setup:

```bash
# In your project directory, start Claude Code
claude

# Add the marketplace (one-time setup)
/plugin marketplace add https://github.com/mahidalhan/specd-out-skills

# Install the plugin
/plugin install spec-driven-dev

# Restart Claude Code
```

**Option 2: Direct Copy**

Copy skills directly into your project:

```bash
# For existing projects
cd your-project
git clone https://github.com/mahidalhan/specd-out-skills .claude/plugins/spec-driven-dev
cp -r .claude/plugins/spec-driven-dev/skills .claude/

# For new projects
git clone https://github.com/mahidalhan/specd-out-skills
cd specd-out-skills
# Skills are ready to use!
```

### Walkthrough: Add a Search Feature

Let's walk through adding a search feature to your app. This example demonstrates the complete workflow from idea to deployment.

**1. Propose the feature** (natural language, no commands)

```
You: I want to add full-text search to posts with filtering by category and date
```

Claude creates a structured proposal:

```
Created: spec/changes/add-post-search/

📄 proposal.md
   Why: Users need fast access to historical posts
   What: Full-text search with category/date filters
   Impact: Affects database schema, API endpoints, UI components

📋 tasks.md
   1. Add search indexes to database
   2. Create search API endpoint
   3. Build search UI component
   4. Add filter controls
   5. Write integration tests

📐 specs/search/spec-delta.md
   ## ADDED
   ### Requirement: Full-Text Search
   WHEN a user enters search terms,
   the system SHALL return matching posts ranked by relevance...
```

**2. Review and refine**

Check `spec/changes/add-post-search/proposal.md`. If you want changes, just say:

```
You: Add pagination to the search results
```

Claude updates the proposal and tasks accordingly.

**3. Implement the feature**

```
You: Implement the post search proposal
```

Claude executes tasks with visible progress:

```
Implementation Progress:
✅ Add search indexes to database
✅ Create search API endpoint
⏳ Build search UI component (testing...)
⬜ Add filter controls
⬜ Write integration tests

Running: npm test src/api/search.test.ts
✓ All tests passing
```

**4. Verify implementation**

```bash
# Claude creates this marker when done
ls spec/changes/add-post-search/IMPLEMENTED
```

**5. Deploy and archive**

After deploying to production:

```
You: Archive the post search change
```

Claude merges the specs:

```
Merged into spec/specs/search/spec.md:
- 3 requirements ADDED
- 12 scenarios documented

Archived to: spec/archive/2025-10-26-add-post-search/

Your living specs are now up to date! 🎉
```

That's it. **Plan → Implement → Archive**. No commands to memorize. Just conversation.

## Four Skills, Infinite Possibilities

### 1. spec-proposal-creation

**Activates when you want to plan a feature.**

Triggers: "create proposal", "plan feature", "spec change", "design spec"

**What it does:**
- Generates unique change IDs
- Creates proposal.md (Why, What, Impact)
- Writes tasks.md (numbered implementation checklist)
- Crafts spec deltas with EARS-formatted requirements
- Validates structure with grep patterns
- Presents for your approval

**Example:**
```
You: Create a proposal for password reset via email
Claude: I'll create a spec proposal...

        Change ID: add-password-reset
        Specs affected: authentication
        Tasks: 8
        Requirements: 3 (ADDED)
```

### 2. spec-implementation

**Activates when you're ready to build.**

Triggers: "implement", "apply change", "execute spec", "build feature"

**What it does:**
- Loads proposal and understands requirements
- Sets up TodoWrite progress tracking
- Executes tasks one at a time
- Tests before marking complete
- Marks proposal as implementation-complete

**Example:**
```
You: Implement the password reset proposal
Claude: Reading proposal and tasks...

        Implementation Progress:
        - [x] Add email service
        - [x] Create reset token model
        - [ ] Build reset endpoint
        - [ ] Add email templates
        ...
```

### 3. spec-archiving

**Activates when work is deployed.**

Triggers: "archive change", "merge specs", "finalize", "mark as done"

**What it does:**
- Verifies implementation complete
- Creates timestamped archive directory
- Merges spec deltas into living specs:
  - **ADDED** → appends to specs
  - **MODIFIED** → replaces requirement blocks
  - **REMOVED** → deletes with comments
- Validates merged spec structure

**Example:**
```
You: Archive the password reset change
Claude: Archiving add-password-reset...

        Merged into spec/specs/authentication/spec.md:
        - 3 requirements ADDED
        - 1 requirement MODIFIED

        Archived to: spec/archive/2025-10-26-add-password-reset/
```

### 4. spec-context-loading

**Activates when you need to understand the project.**

Triggers: "what specs exist", "show changes", "find specs", "project context"

**What it does:**
- Lists all specifications and capabilities
- Shows active and archived changes
- Searches requirements by keyword
- Displays dashboard views
- Reads specific specs on demand

**Example:**
```
You: What specs exist?
Claude: The project has specifications for:

        - authentication: 12 requirements
        - billing: 8 requirements
        - notifications: 5 requirements

        Active changes: 2
        Archived changes: 15
```

## File Structure

### Plugin Structure

After installing the plugin, your project will look like this:

```
your-project/
├── .claude/
│   ├── skills/                    # Skills (if using direct copy method)
│   │   ├── spec-proposal-creation/
│   │   ├── spec-implementation/
│   │   ├── spec-archiving/
│   │   └── spec-context-loading/
│   └── plugins/                   # Plugins (if using plugin installation)
│       └── spec-driven-dev/
│           ├── .claude-plugin/
│           │   ├── plugin.json
│           │   └── marketplace.json
│           └── skills/
│               ├── spec-proposal-creation/
│               ├── spec-implementation/
│               ├── spec-archiving/
│               └── spec-context-loading/
└── spec/                          # Created by the skills during use
    ├── specs/                     # Living specifications
    │   ├── authentication/
    │   │   └── spec.md
    │   ├── billing/
    │   │   └── spec.md
    │   └── {capability}/
    │       └── spec.md
    ├── changes/                   # Active proposals
    │   ├── add-search/
    │   │   ├── proposal.md
    │   │   ├── tasks.md
    │   │   ├── IMPLEMENTED        # Marker file (created when implementation done)
    │   │   └── specs/
    │   │       └── {capability}/
    │   │           └── spec-delta.md
    │   └── {change-id}/
    └── archive/                   # Completed changes
        └── 2025-10-26-add-search/
```

### The Two-Folder Model

The `spec/` directory uses a clear separation:

- **`specs/`** = Source of truth (always current state)
- **`changes/`** = Proposals in flight (temporary, work in progress)
- **`archive/`** = Historical record (permanent, timestamped)

This separation makes it easy to:
- See what's currently specified vs. what's being proposed
- Review changes before they affect living specs
- Track the evolution of your system over time

When you modify existing features, the delta lives in `changes/` until you're ready to merge it into `specs/`.

## EARS Format Requirements

Requirements use **EARS** (Easy Approach to Requirements Syntax):

```markdown
### Requirement: User Login
WHEN a user submits valid credentials,
the system SHALL authenticate the user and create a session.

#### Scenario: Successful Login
GIVEN a user with email "user@example.com" and password "correct123"
WHEN the user submits the login form
THEN the system creates an authenticated session
AND redirects to the dashboard

#### Scenario: Invalid Password
GIVEN a user with incorrect password
WHEN the user submits the login form
THEN the system rejects the login
AND displays error "Invalid email or password"
```

**Why EARS?**
- Clear trigger conditions (WHEN/IF/WHERE/WHILE)
- Binding requirements (SHALL)
- Testable scenarios (GIVEN/WHEN/THEN)
- Industry-standard format

Learn more: [EARS Format Guide](https://alistairmavin.com/ears/)

## Comparisons

### vs. OpenSpec

Spec'd Out Skills is **inspired by OpenSpec** but reimagined for Claude Code's native capabilities:

| Feature | OpenSpec | Spec'd Out Skills |
|---------|----------|-------------------|
| **Installation** | `npm install -g` | `/plugin install` or copy skills |
| **Activation** | `/openspec:proposal` | "create a proposal" (natural language) |
| **Validation** | `openspec validate` | Grep patterns (built-in) |
| **Discovery** | `openspec list` | "what specs exist" (conversational) |
| **Platform** | Standalone CLI tool | Claude Code plugin/skills |
| **Dependencies** | Node.js + npm | None (pure Claude Code) |
| **Workflow** | ✅ Same proven 3-stage workflow | ✅ Same proven 3-stage workflow |
| **EARS format** | ✅ Yes | ✅ Yes |
| **Spec deltas** | ✅ ADDED/MODIFIED/REMOVED | ✅ ADDED/MODIFIED/REMOVED |
| **Two-folder model** | ✅ specs/ + changes/ | ✅ specs/ + changes/ |

**Use OpenSpec if:**
- You want the official, mature CLI with rich integrations
- You need enterprise-grade tooling
- Your team already uses npm-based workflows
- You want IDE-agnostic tooling

**Use Spec'd Out Skills if:**
- You're already using Claude Code daily
- You want zero installation friction (plugin-based)
- You prefer natural language over slash commands
- You want to customize or extend the workflow
- You want skills that work anywhere Claude Code works

**Credit**: All credit for the spec-driven development methodology goes to the [OpenSpec team](https://github.com/Fission-AI/OpenSpec). We're just making it more accessible through Claude Skills.

### vs. No Specs (Vibe Coding)

What happens when you skip specifications entirely?

| Without Specs | With Spec'd Out Skills |
|---------------|------------------------|
| **Planning** | "Just build it" → AI guesses your intent | Explicit proposal reviewed before coding |
| **Changes** | Implicit, scattered across commits | Documented in structured spec deltas |
| **Testing** | After-the-fact, often incomplete | Test scenarios defined upfront (GIVEN/WHEN/THEN) |
| **Reviews** | "What does this code do?" | "Does this match the approved spec?" |
| **History** | Git blame + guesswork | Timestamped archive with full context |
| **Refactoring** | Break things, fix later | Specs survive rewrites |
| **Onboarding** | Read the code (good luck) | Read the specs (clear intent) |
| **Scope creep** | Common (no boundaries) | Prevented (change scope explicit) |

**Real scenario:**

**Without specs:**
```
You: Add user authentication
Claude: *implements OAuth, session cookies, JWT, password reset,
        2FA, and email verification without asking*
You: Wait, I just wanted a simple login form...
```

**With specs:**
```
You: I want to add user authentication
Claude: I'll create a proposal. What authentication methods?
        (basic auth, OAuth, JWT, etc.)
You: Just JWT tokens for now
Claude: *Creates focused proposal with 4 requirements, 8 tasks*
You: Perfect! Implement it.
```

The difference: **alignment before action**.

## Advanced Usage

### Team Adoption

**Option 1: Plugin-based (Recommended for teams)**

1. Create a private plugin marketplace (GitHub repo)
2. Add `spec-driven-dev` plugin to your marketplace
3. Team members install via `/plugin install spec-driven-dev@your-org`
4. Everyone gets updates when you push to the marketplace

**Option 2: Direct copy (Simple for small teams)**

1. Add skills to your project repo in `.claude/skills/`
2. Commit to version control
3. Team members clone and automatically get the skills
4. All proposals reviewable in PRs

### Git Integration

**Recommended workflow:**

```bash
# After proposal
git add spec/changes/add-feature/
git commit -m "Add feature proposal"

# After implementation
git add src/ spec/changes/add-feature/IMPLEMENTED
git commit -m "Implement feature"

# After archiving
git add spec/specs/ spec/archive/
git commit -m "Archive feature, merge spec deltas"
```

### Customize the Spec Folder Name

Default is `spec/`, but you can change it:

```bash
# Find your skills location
# Plugin: .claude/plugins/spec-driven-dev/skills/
# Direct: .claude/skills/

# Update references (macOS/Linux)
find .claude/plugins/spec-driven-dev/skills -name "SKILL.md" -exec sed -i '' 's/spec\//myspecs\//g' {} \;

# Or for direct copy
find .claude/skills -name "SKILL.md" -exec sed -i '' 's/spec\//myspecs\//g' {} \;
```

### Add Project-Specific Templates

Extend the skills with your patterns:

1. Navigate to `skills/spec-proposal-creation/templates/`
2. Add custom templates for common features
3. Update `reference/VALIDATION_PATTERNS.md` with project-specific rules
4. Add examples to `reference/EXAMPLES.md`

### Multi-Project Setup

Use the same plugin across multiple projects:

```bash
# Install plugin once per project
cd project-a && /plugin install spec-driven-dev
cd project-b && /plugin install spec-driven-dev

# Or use global installation (if supported)
# Each project gets its own spec/ directory
```

## Troubleshooting

### Skills not activating?

**Try these phrases:**
- ✅ "create a proposal" (not "make a new spec")
- ✅ "implement the change" (not "code the feature")
- ✅ "show me specs" (not "display specifications")

### Want to see what's happening?

**Use the context-loading skill:**
```
You: What specs exist?
You: What changes are active?
You: Show me the dashboard
```

### Validation errors?

Claude will show you exactly what's wrong and how to fix it:
```
Validation failed:
✗ Missing scenario for Requirement: User Login
  → Add "#### Scenario: ..." after the requirement
```

## Contributing

We welcome contributions! Here's how:

1. **Fork the repo**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-improvement
   ```
3. **Make your changes**
4. **Test with real projects**
5. **Submit a PR**

**Ideas for contributions:**
- Additional reference files (EXAMPLES.md, etc.)
- Language-specific templates
- Integration guides for other tools
- Better validation patterns

## License

MIT License - See [LICENSE](LICENSE) file for details.

## Acknowledgments

- **[OpenSpec](https://github.com/Fission-AI/OpenSpec)** - The original CLI tool and methodology
- **[Anthropic](https://www.anthropic.com)** - Claude Skills framework and best practices
- **[EARS](https://alistairmavin.com/ears/)** - Easy Approach to Requirements Syntax

## Links

- [Claude Code Documentation](https://docs.claude.com/en/docs/claude-code/overview)
- [Claude Skills Best Practices](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/best-practices)
- [OpenSpec](https://github.com/Fission-AI/OpenSpec)
- [EARS Format](https://alistairmavin.com/ears/)

---

**Built with Claude Skills for Claude Code**

Made with ❤️ for developers who want clarity, not chaos.
