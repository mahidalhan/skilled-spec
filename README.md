# Spec'd Out Skills

**Spec-driven development for Claude Code. Plan first, build second.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Claude Code](https://img.shields.io/badge/Claude_Code-Plugin-blue.svg)](https://docs.claude.com/en/docs/claude-code/overview)

> Natural language spec-driven development inspired by [OpenSpec](https://github.com/Fission-AI/OpenSpec), reimagined as Claude Code skills.

## Overview

Spec'd Out Skills brings structured specification-driven development to Claude Code through four composable skills that activate through natural conversation. No CLI tools to install, no commands to memorize—just describe what you want.

**The workflow:**
```
You: I want to add two-factor authentication
Claude: [spec-proposal-creation activates]
        Creating spec proposal for 2FA...

        ✓ Created spec/changes/add-2fa/proposal.md
        ✓ Created spec/changes/add-2fa/tasks.md
        ✓ Created spec/changes/add-2fa/specs/authentication/spec-delta.md

        Review and say "implement it" when ready.
```

### Why Specifications?

AI coding assistants are powerful, but without structure they guess. Guesses compound into assumptions, bugs, and rewrites. Spec-driven development ensures human and AI align on requirements before writing code.

**Three stages:**
1. **Propose** → Create structured specs with EARS requirements
2. **Implement** → Build with test-driven development, track progress
3. **Archive** → Merge spec deltas, preserve history

Changes are proposed, reviewed, implemented, and archived with full traceability.

## Quick Start

### Prerequisites

- [Claude Code](https://docs.claude.com/en/docs/claude-code/overview) installed
- A project where you want spec-driven development

### Installation

**Option 1: Plugin Installation (Recommended)**

```bash
# Start Claude Code in your project
claude

# Add the plugin
/plugin marketplace add https://github.com/mahidalhan/specd-out-skills
/plugin install spec-driven-dev

# Restart Claude Code
```

**Option 2: Direct Copy**

```bash
# Clone into your project
cd your-project
git clone https://github.com/mahidalhan/specd-out-skills .claude/plugins/spec-driven-dev
cp -r .claude/plugins/spec-driven-dev/skills .claude/

# Skills are ready to use
```

## Walkthrough: Add Two-Factor Authentication

This example demonstrates the complete workflow from proposal to deployment.

### 1. Propose the Feature

```
You: I want to add two-factor authentication using TOTP
```

Claude creates a structured proposal in `spec/changes/add-2fa/`:

**proposal.md**
```markdown
# Add Two-Factor Authentication

## Why
Users need additional account security beyond passwords. Industry standard
for protecting sensitive accounts.

## What
Time-based one-time password (TOTP) 2FA using authenticator apps.
Optional enrollment, required for admin accounts.

## Impact
- Database: Add `users.totp_secret` and `users.totp_enabled` fields
- API: New endpoints for setup, verify, disable
- UI: Settings page for 2FA enrollment
- Auth flow: Check 2FA status after password verification
```

**tasks.md**
```markdown
# Implementation Tasks

1. Add database migration for TOTP fields
2. Install and configure TOTP library (speakeasy)
3. Create 2FA setup endpoint (generate secret, return QR code)
4. Create 2FA verification endpoint
5. Create 2FA disable endpoint
6. Update login flow to check 2FA status
7. Build 2FA settings UI component
8. Write integration tests for 2FA flow
9. Add 2FA recovery codes
```

**specs/authentication/spec-delta.md**
```markdown
## ADDED

### Requirement: TOTP 2FA Enrollment
WHEN a user enables two-factor authentication,
the system SHALL generate a unique TOTP secret and display a QR code
for scanning with an authenticator app.

#### Scenario: Successful Enrollment
GIVEN a logged-in user without 2FA enabled
WHEN the user requests to enable 2FA
THEN the system generates a unique TOTP secret
AND displays a QR code containing the secret
AND requires the user to verify with a code before enabling

#### Scenario: Already Enrolled
GIVEN a user with 2FA already enabled
WHEN the user attempts to enable 2FA again
THEN the system returns an error "2FA is already enabled"

### Requirement: TOTP 2FA Verification
WHEN a user with 2FA enabled logs in,
the system SHALL require a valid TOTP code after password verification.

#### Scenario: Valid Code
GIVEN a user with 2FA enabled and correct password
WHEN the user submits a valid TOTP code
THEN the system creates an authenticated session
AND grants access to the account

#### Scenario: Invalid Code
GIVEN a user with 2FA enabled and correct password
WHEN the user submits an invalid TOTP code
THEN the system rejects the login
AND displays error "Invalid verification code"
```

### 2. Review and Refine

Check the proposal. If you want changes, just say:

```
You: Add recovery codes in case the user loses their device
```

Claude updates the proposal, tasks, and spec delta accordingly.

### 3. Implement the Feature

```
You: Implement the 2FA proposal
```

Claude executes tasks with visible progress:

```
Implementation Progress:
✅ Add database migration for TOTP fields
✅ Install and configure TOTP library
✅ Create 2FA setup endpoint
⏳ Create 2FA verification endpoint (testing...)
⬜ Create 2FA disable endpoint
⬜ Update login flow to check 2FA status
⬜ Build 2FA settings UI component
⬜ Write integration tests for 2FA flow
⬜ Add 2FA recovery codes

Running: npm test src/api/auth/2fa.test.ts
✓ All tests passing
```

When complete, Claude creates `spec/changes/add-2fa/IMPLEMENTED`.

### 4. Deploy and Archive

After deploying to production:

```
You: Archive the 2FA change
```

Claude merges the specs:

```
Archiving add-2fa...

Merged into spec/specs/authentication/spec.md:
- 2 requirements ADDED
- 4 scenarios documented

Archived to: spec/archive/2025-10-26-add-2fa/
  ✓ proposal.md
  ✓ tasks.md
  ✓ specs/authentication/spec-delta.md

Living specs updated. ✓
```

## The Four Skills

| Skill | Activates When | What It Does | Example |
|-------|---------------|--------------|---------|
| **spec-proposal-creation** | "create proposal", "plan feature", "design spec" | Generates change ID, writes proposal.md, tasks.md, and spec-delta.md with EARS requirements | "Create a proposal for password reset" |
| **spec-implementation** | "implement", "build", "apply change" | Loads proposal, executes tasks with TodoWrite tracking, tests before completion | "Implement the password reset proposal" |
| **spec-archiving** | "archive change", "merge specs", "finalize" | Verifies IMPLEMENTED marker, creates timestamped archive, merges deltas into living specs | "Archive the password reset change" |
| **spec-context-loading** | "what specs exist", "show changes", "project context" | Lists specs, shows active/archived changes, searches requirements | "What specs exist?" |

### Detailed Documentation

Each skill has comprehensive documentation in its `SKILL.md` file:
- `skills/spec-proposal-creation/SKILL.md` - Proposal creation workflow
- `skills/spec-implementation/SKILL.md` - Implementation with TDD
- `skills/spec-archiving/SKILL.md` - Archiving and merging
- `skills/spec-context-loading/SKILL.md` - Context and discovery

## File Structure

After installation, your project structure:

```
your-project/
├── .claude/
│   ├── skills/                    # Skills (direct copy method)
│   │   ├── spec-proposal-creation/
│   │   ├── spec-implementation/
│   │   ├── spec-archiving/
│   │   └── spec-context-loading/
│   └── plugins/                   # Plugins (plugin installation method)
│       └── spec-driven-dev/
│           └── skills/
└── spec/                          # Created during use
    ├── specs/                     # Living specifications (source of truth)
    │   ├── authentication/
    │   │   └── spec.md
    │   └── {capability}/
    │       └── spec.md
    ├── changes/                   # Active proposals (work in progress)
    │   ├── add-2fa/
    │   │   ├── proposal.md
    │   │   ├── tasks.md
    │   │   ├── IMPLEMENTED
    │   │   └── specs/
    │   │       └── {capability}/
    │   │           └── spec-delta.md
    │   └── {change-id}/
    └── archive/                   # Historical record (timestamped)
        └── 2025-10-26-add-2fa/
```

### The Two-Folder Model

- **`specs/`** = Current state (always up to date)
- **`changes/`** = Proposals in flight (temporary)
- **`archive/`** = Historical record (permanent)

This separation makes it easy to review changes before they affect living specs and track system evolution over time.

## EARS Format

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
- Industry standard

Learn more: [EARS Format Guide](https://alistairmavin.com/ears/)

## Comparison with OpenSpec

Spec'd Out Skills shares OpenSpec's proven methodology, adapted for Claude Code:

| Feature | OpenSpec | Spec'd Out Skills |
|---------|----------|-------------------|
| **Installation** | `npm install -g openspec` | `/plugin install spec-driven-dev` |
| **Activation** | `/openspec:proposal` | "create a proposal" |
| **Validation** | `openspec validate` | Grep patterns (built-in) |
| **Discovery** | `openspec list` | "what specs exist" |
| **Platform** | Standalone CLI | Claude Code plugin |
| **Dependencies** | Node.js + npm | None |
| **Workflow** | ✅ 3-stage (propose/implement/archive) | ✅ 3-stage (propose/implement/archive) |
| **EARS format** | ✅ Yes | ✅ Yes |
| **Spec deltas** | ✅ ADDED/MODIFIED/REMOVED | ✅ ADDED/MODIFIED/REMOVED |
| **Two-folder model** | ✅ specs/ + changes/ | ✅ specs/ + changes/ |

**Use OpenSpec if:**
- You want the official, mature CLI with rich integrations
- You need enterprise-grade tooling
- Your team uses npm-based workflows
- You want IDE-agnostic tooling

**Use Spec'd Out Skills if:**
- You're already using Claude Code daily
- You want zero installation friction
- You prefer natural language over slash commands
- You want to customize or extend the workflow

**Methodology credit**: All credit for spec-driven development methodology goes to the [OpenSpec team](https://github.com/Fission-AI/OpenSpec). Spec'd Out Skills makes it accessible through Claude Code skills.

## Team Adoption

### Plugin-Based (Recommended)

1. Create a private plugin marketplace (GitHub repo)
2. Add `spec-driven-dev` plugin to your marketplace
3. Team members install: `/plugin install spec-driven-dev@your-org`
4. Everyone gets updates when you push to the marketplace

### Direct Copy (Simple)

1. Add skills to `.claude/skills/` in your project repo
2. Commit to version control
3. Team members clone and automatically get the skills
4. All proposals reviewable in PRs

### Git Integration

Recommended workflow:

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

## Troubleshooting

### Skills Not Activating?

Use these trigger phrases:
- ✅ "create a proposal" (not "make a new spec")
- ✅ "implement the change" (not "code the feature")
- ✅ "show me specs" (not "display specifications")

### Need Context?

Use the context-loading skill:
```
You: What specs exist?
You: What changes are active?
You: Show me the dashboard
```

### Validation Errors?

Claude shows exactly what's wrong:
```
Validation failed:
✗ Missing scenario for Requirement: User Login
  → Add "#### Scenario: ..." after the requirement
```

## Contributing

Contributions welcome! Here's how:

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/your-improvement`
3. Make your changes
4. Test with real projects
5. Submit a PR

**Ideas:**
- Additional reference files and examples
- Language-specific templates
- Integration guides
- Better validation patterns

## License

MIT License - See [LICENSE](LICENSE) for details.

## Acknowledgments

- **[OpenSpec](https://github.com/Fission-AI/OpenSpec)** - The original CLI tool and methodology
- **[Anthropic](https://www.anthropic.com)** - Claude Code and Skills framework
- **[EARS](https://alistairmavin.com/ears/)** - Easy Approach to Requirements Syntax

## Links

- [Claude Code Documentation](https://docs.claude.com/en/docs/claude-code/overview)
- [Claude Skills Best Practices](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/best-practices)
- [OpenSpec](https://github.com/Fission-AI/OpenSpec)
- [EARS Format](https://alistairmavin.com/ears/)

---

**Built with Claude Skills for Claude Code**
