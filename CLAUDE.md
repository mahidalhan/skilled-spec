# Skilled Intelligence Marketplace

Claude Code plugin marketplace providing intelligent development tools for evidence-based software engineering.

## Structure

```
skilled-intelligence-marketplace/
├── .claude-plugin/
│   └── marketplace.json           # Marketplace manifest
├── plugins/                       # Individual plugins (at repo root)
│   ├── spec-workflow/
│   │   ├── .claude-plugin/plugin.json
│   │   ├── commands/
│   │   ├── skills/
│   │   └── README.md
│   ├── code-intelligence/
│   │   ├── .claude-plugin/plugin.json
│   │   ├── skills/
│   │   └── README.md
│   └── skill-tools/
│       ├── .claude-plugin/plugin.json
│       └── README.md
├── skills/                        # Shared skills
└── README.md
```

## Plugins

- **spec-workflow**: Proposal creation, TDD implementation, archiving, context loading
- **code-intelligence**: Exa API code search, architecture analysis
- **skill-tools**: Skill scaffolding, validation, packaging

## Development

### Testing locally
```bash
/plugin marketplace add /path/to/skilled-intelligence-marketplace
/plugin install plugin-name@skilled-intelligence
```

### Naming conventions
- Marketplace name: `skilled-intelligence`
- Plugin names: kebab-case (e.g., `spec-workflow`, `code-intelligence`)
- Skill names: kebab-case matching directory names

### File organization
- Marketplace manifest: `.claude-plugin/marketplace.json`
- Each plugin has its own `.claude-plugin/plugin.json` for metadata
- Skills use `SKILL.md` with YAML frontmatter
- Descriptions must match between `marketplace.json` and individual `plugin.json` files

## Links

- [Claude Plugins Guide](https://code.claude.com/docs/en/plugins)
- [Plugin Marketplaces](https://code.claude.com/docs/en/plugin-marketplaces)

## Tools Available

- GitHub CLI

