# Skilled Intelligence Marketplace

Claude Code plugin marketplace providing intelligent development tools for evidence-based software engineering.

## Structure

```
.claude-plugin/
├── marketplace.json           # Marketplace manifest
├── plugin.json               # Root plugin metadata
├── plugins/                  # Individual plugins
│   ├── spec-workflow/        # Spec-driven development
│   ├── code-intelligence/    # Exa-powered code search
│   └── skill-tools/          # Skill creation tools
└── skills/                   # Shared skills
```

## Plugins

- **spec-workflow**: Proposal creation, TDD implementation, archiving, context loading
- **code-intelligence**: Exa API code search, architecture analysis
- **skill-tools**: Skill scaffolding, validation, packaging

## Development

### Testing locally
```bash
/plugin marketplace add /path/to/skilled-spec
/plugin install plugin-name@skilled-spec
```

### Naming conventions
- Marketplace name: `skilled-intelligence`
- Plugin names: kebab-case (e.g., `spec-workflow`, `code-intelligence`)
- Skill names: kebab-case matching directory names

### File organization
- Each plugin has `.claude-plugin/plugin.json` for metadata
- Skills use `SKILL.md` with YAML frontmatter
- Descriptions must match between `marketplace.json` and individual `plugin.json` files

## Links

- [Claude Plugins Guide](https://code.claude.com/docs/en/plugins)
- [Plugin Marketplaces](https://code.claude.com/docs/en/plugin-marketplaces)

U have access to the following tools:
- Github CLI

