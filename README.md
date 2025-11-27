# Skilled Intelligence Marketplace

**Curated collection of intelligent development tools combining spec-driven methodology, AI-powered code search, and architectural analysis for evidence-based software engineering.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Extend Claude Code with custom commands, agents, hooks, Skills, and MCP servers through the plugin system.

## Overview

The Skilled Intelligence marketplace provides a collection of plugins that enhance Claude Code with structured development workflows, intelligent code search, and architectural analysis capabilities. All plugins are designed to work seamlessly together, enabling evidence-based software engineering practices.

## Available Plugins

| Plugin | Description | Skills | Commands |
|--------|-------------|--------|----------|
| **[spec-workflow](.claude-plugin/plugins/spec-workflow/README.md)** | Complete spec-driven development methodology with orchestrated task execution | 4 skills: proposal creation, TDD implementation, archiving, context loading | `/orchestrate` |
| **[code-intelligence](.claude-plugin/plugins/code-intelligence/README.md)** | Intelligent code search and architectural analysis powered by Exa API | 2 skills: exa-code-context, architecture-introspector | - |
| **[skill-tools](.claude-plugin/plugins/skill-tools/README.md)** | Meta-plugin for creating custom Claude skills | 1 skill: skill-creator | - |

### Quick Plugin Overview

**spec-workflow** - Structured requirements, test-driven implementation, and systematic archiving. Includes proposal creation, TDD implementation, archiving, and context loading with shared infrastructure.

**code-intelligence** - Search billions of GitHub repos for real examples and analyze architectures using first-principles thinking.

**skill-tools** - Comprehensive guide and tools for building custom Claude skills with scaffolding, validation, and packaging scripts.

## Installation

### Prerequisites

- [Claude Code](https://docs.claude.com/en/docs/claude-code/overview) installed
- Basic familiarity with command-line interfaces

### Add Marketplace

Add the Skilled Intelligence marketplace to discover and install plugins:

```bash
/plugin marketplace add mahidalhan/skilled-spec
```

### Install Plugins

#### Via Interactive Menu (Recommended)

```bash
/plugin
```

Select "Browse Plugins" to see available options with descriptions, features, and installation options.

#### Via Direct Commands

Install specific plugins:

```bash
# Install spec-workflow plugin
/plugin install spec-workflow@mahidalhan/skilled-spec

# Install code-intelligence plugin
/plugin install code-intelligence@mahidalhan/skilled-spec

# Install skill-tools plugin
/plugin install skill-tools@mahidalhan/skilled-spec
```

### Verify Installation

After installing a plugin:

1. **Check available commands**: Run `/help` to see new commands
2. **Test plugin features**: Try the plugin's commands and features
3. **Review plugin details**: Use `/plugin` → "Manage Plugins" to see what the plugin provides

## Quick Start

### spec-workflow Plugin

Create structured proposals, implement with TDD, and archive changes:

```
Create a proposal for adding user authentication
```

Claude generates:
- `proposal.md` - Why, what, impact
- `tasks.md` - Implementation checklist
- `spec-delta.md` - EARS requirements

Then implement:
```
Implement the add-user-auth proposal
```

See [spec-workflow README](.claude-plugin/plugins/spec-workflow/README.md) for complete documentation.

### code-intelligence Plugin

Search for real code examples and analyze architectures:

```
How do I use React hooks for state management?
```

The plugin searches billions of GitHub repos and returns real, working examples.

#### Environment Setup

The code-intelligence plugin requires an Exa API key:

1. **Get API Key**: Visit [Exa Dashboard](https://dashboard.exa.ai/api-keys)
2. **Configure Environment**: Add to `.env` at project root:
   ```bash
   EXA_API_KEY=your-api-key-here
   ```
3. **Install Dependencies**:
   ```bash
   pip install requests python-dotenv
   ```

See [code-intelligence README](.claude-plugin/plugins/code-intelligence/README.md) for complete documentation.

### skill-tools Plugin

Create custom Claude skills with scaffolding tools:

```
Create a skill for processing CSV files
```

Claude guides you through skill design and generates the complete structure.

See [skill-tools README](.claude-plugin/plugins/skill-tools/README.md) for complete documentation.

## Plugin Details

Each plugin has comprehensive documentation:

- **[spec-workflow](.claude-plugin/plugins/spec-workflow/README.md)** - Complete spec-driven development workflow, EARS requirements format, orchestration patterns
- **[code-intelligence](.claude-plugin/plugins/code-intelligence/README.md)** - Exa API setup, code search examples, architecture analysis methodology
- **[skill-tools](.claude-plugin/plugins/skill-tools/README.md)** - Skill creation workflow, scaffolding scripts, validation tools

## Team Setup

Configure plugins at the repository level to ensure consistent tooling across your team. When team members trust your repository folder, Claude Code automatically installs specified marketplaces and plugins.

**To set up team plugins:**

1. Add marketplace and plugin configuration to your repository's `.claude/settings.json`:
   ```json
   {
     "extraKnownMarketplaces": [
       {
         "name": "skilled-intelligence",
         "source": "github:mahidalhan/skilled-spec"
       }
     ]
   }
   ```
2. Team members trust the repository folder
3. Plugins install automatically for all team members

For complete instructions including configuration examples, marketplace setup, and rollout best practices, see [Configure team marketplaces](https://code.claude.com/docs/en/plugin-marketplaces#how-to-configure-team-marketplaces).

## Distribution

Multiple methods to add this marketplace:

### GitHub (Recommended)

```bash
/plugin marketplace add mahidalhan/skilled-spec
/plugin install spec-workflow@mahidalhan/skilled-spec
```

### Git URL

```bash
/plugin marketplace add https://github.com/mahidalhan/skilled-spec.git
/plugin install spec-workflow@mahidalhan/skilled-spec
```

### Local Development

```bash
/plugin marketplace add /path/to/skilled-spec
/plugin install spec-workflow@mahidalhan/skilled-spec
```

## Plugin Management

### List Installed

```bash
/plugin list
/plugin marketplace list
```

### Update Plugins

```bash
# Update all plugins
/plugin update

# Update specific plugin
/plugin update spec-workflow@mahidalhan/skilled-spec
```

### Enable/Disable

```bash
/plugin enable plugin-name@mahidalhan/skilled-spec
/plugin disable plugin-name@mahidalhan/skilled-spec
```

### Uninstall

```bash
/plugin uninstall plugin-name@mahidalhan/skilled-spec
/plugin marketplace remove mahidalhan/skilled-spec
```

## Comparison with OpenSpec

The spec-workflow plugin shares OpenSpec's proven methodology, adapted for Claude Code:

| Feature | OpenSpec | spec-workflow Plugin |
|---------|----------|---------------------|
| **Installation** | `npm install -g` | `/plugin install` |
| **Activation** | `/openspec:proposal` | "create a proposal" |
| **Validation** | `openspec validate` | Grep patterns |
| **Discovery** | `openspec list` | "what specs exist" |
| **Platform** | Standalone CLI | Claude Code skills |
| **Dependencies** | Node.js + npm | None |
| **Workflow** | ✅ 3-stage | ✅ 3-stage |
| **EARS format** | ✅ Yes | ✅ Yes |

**Use OpenSpec if** you want the official CLI with enterprise tooling and IDE-agnostic workflows.

**Use spec-workflow plugin if** you're already using Claude Code and want zero-friction, natural language activation.

**Credit**: Methodology by [OpenSpec team](https://github.com/Fission-AI/OpenSpec). We make it accessible through Claude Plugins.

## Troubleshooting

**Plugins not loading?**
1. Restart Claude Code after installation
2. Check plugin status: `/plugin`
3. Verify marketplace: `/plugin marketplace list`

**Plugin installation fails?**
```bash
# Update the plugin
/plugin update plugin-name@mahidalhan/skilled-spec

# Or reinstall
/plugin uninstall plugin-name@mahidalhan/skilled-spec
/plugin install plugin-name@mahidalhan/skilled-spec
```

**API key errors (code-intelligence)?**
- Verify `EXA_API_KEY` is set in `.env` at project root
- Check dependencies: `pip list | grep requests`
- Restart Claude Code after configuration changes

**Plugin-specific issues?**
- See individual plugin README files for detailed troubleshooting
- [spec-workflow](.claude-plugin/plugins/spec-workflow/README.md)
- [code-intelligence](.claude-plugin/plugins/code-intelligence/README.md)
- [skill-tools](.claude-plugin/plugins/skill-tools/README.md)

## Version History

- **1.0.1** - Current release with three plugins: spec-workflow, code-intelligence, skill-tools
- **1.0.0** - Initial release

## Contributing

Contributions welcome!

1. Fork the repo
2. Create feature branch: `git checkout -b feature/your-improvement`
3. Test with real projects
4. Submit PR

**Ideas**: New plugins, reference files, language-specific templates, integration guides, validation patterns

## License

MIT License - See [LICENSE](LICENSE)

## Acknowledgments

- **[OpenSpec](https://github.com/Fission-AI/OpenSpec)** - Methodology and CLI tool
- **[Anthropic](https://www.anthropic.com)** - Claude Code and Plugins framework
- **[EARS](https://alistairmavin.com/ears/)** - Requirements syntax
- **[Exa](https://exa.ai)** - Code context search API

## Links

- [Claude Code Documentation](https://docs.claude.com/en/docs/claude-code/overview)
- [Claude Plugins Guide](https://code.claude.com/docs/en/plugins)
- [Plugin Marketplaces](https://code.claude.com/docs/en/plugin-marketplaces)
- [Agent Skills](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/best-practices)
- [OpenSpec](https://github.com/Fission-AI/OpenSpec)
- [Exa API](https://docs.exa.ai/reference/context)

---

**Built with Claude Plugins for Claude Code**
