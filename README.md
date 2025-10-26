# Skilled Spec

**Spec-driven development for Claude Code, powered by natural language.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Inspired by [OpenSpec](https://github.com/Fission-AI/OpenSpec), reimagined as Claude Code skills with zero installation friction.

## Why Skilled Spec?

AI coding assistants are powerful, but without structure they guess. Guesses compound into assumptions, bugs, and rewrites. **Spec-driven development ensures human and AI align on requirements before writing code.**

Skilled Spec brings OpenSpec's proven workflow to Claude Code through four composable skills that activate through natural conversation. No CLI tools to install, no commands to memorize—just describe what you want.

```
You: I want to add user authentication
Claude: [spec-proposal-creation activates]
        Creating proposal for user authentication...

        ✓ spec/changes/add-user-auth/proposal.md
        ✓ spec/changes/add-user-auth/tasks.md
        ✓ spec/changes/add-user-auth/specs/authentication/spec-delta.md

        Review and say "implement it" when ready.
```

## The Workflow

```
┌─────────────────────────────────────┐
│  1. PROPOSE                         │
│  "I want to add search"             │
│  → Structured proposal              │
│  → EARS requirements                │
│  → Implementation tasks             │
└─────────────────────────────────────┘
                ↓
┌─────────────────────────────────────┐
│  2. IMPLEMENT                       │
│  "Implement the search proposal"    │
│  → Execute tasks sequentially       │
│  → Test before completion           │
│  → Track with TodoWrite             │
└─────────────────────────────────────┘
                ↓
┌─────────────────────────────────────┐
│  3. ARCHIVE                         │
│  "Archive the search change"        │
│  → Merge spec deltas                │
│  → Timestamped archive              │
│  → Living docs updated              │
└─────────────────────────────────────┘
```

**Changes are proposed, reviewed, implemented, and archived with full traceability.**

## Getting Started

### Prerequisites

- [Claude Code](https://docs.claude.com/en/docs/claude-code/overview) installed
- A project where you want spec-driven development

### Installation

**NPX (Recommended - One Command)**

Installs skills directly to your project's `.claude/skills/` directory.

```bash
# In your project directory
npx skilled-spec@latest
```

That's it! Skills are installed and ready to use.

**Global Plugin**

Installs to `~/.claude/plugins/marketplaces/` for use across all projects.

```bash
/plugin marketplace add https://github.com/mahidalhan/skilled-spec
/plugin install skilled-spec
```

### First Feature

Add a search feature to see the workflow in action:

**1. Propose**
```
You: I want to add full-text search with category filters
```

Claude generates:
- `proposal.md` - Why, what, impact
- `tasks.md` - Implementation checklist
- `spec-delta.md` - EARS requirements

**2. Review and refine**
```
You: Add pagination to search results
```

Claude updates the proposal.

**3. Implement**
```
You: Implement the search proposal
```

Claude executes tasks with progress tracking:
```
✅ Add search indexes
✅ Create API endpoint
⏳ Build UI component (testing...)
⬜ Add filter controls
⬜ Integration tests
```

**4. Archive** (after deployment)
```
You: Archive the search change
```

Claude merges spec deltas into living documentation and creates timestamped archive.

**That's it.** Plan → Implement → Archive.

## The Four Skills

| Skill | Triggers | Purpose |
|-------|----------|---------|
| **spec-proposal-creation** | "create proposal", "plan feature" | Generates structured proposals with EARS requirements |
| **spec-implementation** | "implement", "build" | Executes tasks with testing and progress tracking |
| **spec-archiving** | "archive", "merge specs" | Merges deltas into living specs, creates archive |
| **spec-context-loading** | "what specs exist", "show changes" | Discovers specs, searches requirements, shows dashboard |

Each skill has detailed documentation in its `SKILL.md` file.

## File Structure

```
your-project/
├── .claude/
│   └── skills/                      # or plugins/skilled-spec/
│       ├── spec-proposal-creation/
│       ├── spec-implementation/
│       ├── spec-archiving/
│       └── spec-context-loading/
└── spec/
    ├── specs/                       # Current state (source of truth)
    │   └── {capability}/spec.md
    ├── changes/                     # Proposals (work in progress)
    │   └── {change-id}/
    │       ├── proposal.md
    │       ├── tasks.md
    │       ├── IMPLEMENTED
    │       └── specs/{capability}/spec-delta.md
    └── archive/                     # History (timestamped)
        └── 2025-10-26-{change-id}/
```

## EARS Requirements Format

Requirements use **EARS** (Easy Approach to Requirements Syntax):

```markdown
### Requirement: User Login
WHEN a user submits valid credentials,
the system SHALL authenticate the user and create a session.

#### Scenario: Successful Login
GIVEN a user with valid credentials
WHEN the user submits the login form
THEN the system creates an authenticated session
AND redirects to the dashboard
```

**Why EARS?** Clear triggers (WHEN), binding requirements (SHALL), testable scenarios (GIVEN/WHEN/THEN).

Learn more: [EARS Format Guide](https://alistairmavin.com/ears/)

## Comparison with OpenSpec

Skilled Spec shares OpenSpec's proven methodology, adapted for Claude Code:

| Feature | OpenSpec | Skilled Spec |
|---------|----------|--------------|
| **Installation** | `npm install -g` | `/plugin install` or copy |
| **Activation** | `/openspec:proposal` | "create a proposal" |
| **Validation** | `openspec validate` | Grep patterns |
| **Discovery** | `openspec list` | "what specs exist" |
| **Platform** | Standalone CLI | Claude Code skills |
| **Dependencies** | Node.js + npm | None |
| **Workflow** | ✅ 3-stage | ✅ 3-stage |
| **EARS format** | ✅ Yes | ✅ Yes |

**Use OpenSpec if** you want the official CLI with enterprise tooling and IDE-agnostic workflows.

**Use Skilled Spec if** you're already using Claude Code and want zero-friction, natural language activation.

**Credit**: Methodology by [OpenSpec team](https://github.com/Fission-AI/OpenSpec). We make it accessible through Claude Skills.

## Team Adoption

**Plugin-based** (automatic updates):
1. Create private marketplace repo
2. Add `skilled-spec` plugin
3. Team installs: `/plugin install skilled-spec@your-org`

**Direct copy** (simple setup):
1. Add skills to `.claude/skills/` in project repo
2. Commit to version control
3. Team clones and gets skills automatically

All proposals are reviewable in pull requests.

## Troubleshooting

**Skills not loading?**
1. Restart Claude Code after installation
2. Check plugin status: `/plugin`
3. Verify skills location: `ls .claude/skills/` or `ls skilled-spec/skills/`

**Skills not activating?** Use trigger phrases:
- ✅ "create a proposal for X"
- ✅ "implement the X proposal"
- ✅ "archive the X change"
- ✅ "what specs exist?"

**Plugin installation fails?**
```bash
# Update the plugin
/plugin update skilled-spec

# Or reinstall
/plugin uninstall skilled-spec
/plugin install skilled-spec
```

**Project-specific setup not working?**
- Ensure `.claude/settings.json` path is correct (`../skilled-spec` relative to `.claude/`)
- Trust the repository configuration when prompted
- Verify: `ls -la skilled-spec/skills/` shows the 4 skill directories

**Validation errors?** Claude shows exactly what's wrong:
```
✗ Missing scenario for Requirement: User Login
  → Add "#### Scenario: ..." after the requirement
```

## Contributing

Contributions welcome!

1. Fork the repo
2. Create feature branch: `git checkout -b feature/your-improvement`
3. Test with real projects
4. Submit PR

**Ideas**: Reference files, language-specific templates, integration guides, validation patterns

## License

MIT License - See [LICENSE](LICENSE)

## Acknowledgments

- **[OpenSpec](https://github.com/Fission-AI/OpenSpec)** - Methodology and CLI tool
- **[Anthropic](https://www.anthropic.com)** - Claude Code and Skills framework
- **[EARS](https://alistairmavin.com/ears/)** - Requirements syntax

## Links

- [Claude Code Documentation](https://docs.claude.com/en/docs/claude-code/overview)
- [Claude Skills Best Practices](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/best-practices)
- [OpenSpec](https://github.com/Fission-AI/OpenSpec)

---

**Built with Claude Skills for Claude Code**
