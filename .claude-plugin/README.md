# Tannery App Claude Plugin

Custom Claude Code plugin for the Tannery ERP application, providing enhanced code context search capabilities through the Exa API.

## Overview

This plugin extends Claude Code with specialized skills designed for software development workflows, particularly focused on finding accurate, real-world code examples and patterns from billions of open-source repositories.

## Features

### Skills Included

#### 1. **exa-code-context**
Search for relevant code snippets, examples, and documentation from GitHub repositories, documentation pages, and Stack Overflow posts.

**Key Capabilities**:
- Real working code examples (eliminates hallucinations)
- API usage patterns and syntax
- Framework setup instructions
- Library implementation details
- Best practices from real projects

**Use Cases**:
- Finding React hooks patterns
- FastAPI async endpoint examples
- Database connection pooling patterns
- Authentication implementations
- Framework-specific configurations

See `.claude/skills/exa-code-context/SKILL.md` for complete documentation.

## Installation

### Prerequisites

1. **Exa API Key**: Get your API key from [Exa Dashboard](https://dashboard.exa.ai/api-keys)

2. **Environment Configuration**: Add to `/backend/.env`:
   ```bash
   EXA_API_KEY=your-api-key-here
   ```

3. **Python Dependencies**:
   ```bash
   pip install requests python-dotenv
   ```

### Plugin Setup

The plugin is automatically available when working in the tannery_app repository. Skills are registered in the `.claude-plugin/` directory and linked to `.claude/skills/`.

### Sharing with Others

To share this plugin with team members or the community, see **[DISTRIBUTION.md](./DISTRIBUTION.md)** for complete instructions on:
- GitHub distribution (recommended)
- Local installation
- Automatic team setup
- Publishing to marketplaces

## Directory Structure

```
.claude-plugin/
├── plugin.json              # Plugin metadata and configuration
├── skills/                  # Skills directory
│   └── exa-code-context/   # Symlink to .claude/skills/exa-code-context/
└── README.md               # This file
```

## Usage

### Automatic Activation

Skills are model-invoked—Claude autonomously uses them based on the task context. When you ask questions about code patterns, frameworks, or need implementation examples, Claude will automatically leverage the exa-code-context skill.

**Example Triggers**:
- "How do I use React hooks for state management?"
- "Show me FastAPI async endpoint examples with dependencies"
- "What's the correct syntax for pandas dataframe filtering?"
- "How to set up Next.js 14 app router with TypeScript?"

### Manual Usage

You can also directly use the skill's Python script:

```bash
cd .claude/skills/exa-code-context
python scripts/get_code_context.py "React hooks for state management"
```

## Plugin Configuration

### plugin.json

```json
{
  "name": "tannery-app-plugin",
  "description": "Custom plugin for Tannery ERP application with code context search capabilities",
  "version": "1.0.0",
  "author": {
    "name": "Mahid Alhan"
  }
}
```

## Development

### Adding New Skills

1. Create skill directory in `.claude/skills/`:
   ```bash
   mkdir -p .claude/skills/my-new-skill
   ```

2. Add `SKILL.md` with frontmatter:
   ```markdown
   ---
   name: my-new-skill
   description: Description of what this skill does
   ---

   # Skill documentation...
   ```

3. Link to plugin:
   ```bash
   ln -s $(pwd)/.claude/skills/my-new-skill .claude-plugin/skills/my-new-skill
   ```

### Version History

- **1.0.0** (2025-11-21): Initial plugin setup with exa-code-context skill

## Architecture

### Skill Integration

Skills in this plugin follow the Claude Code Skills v1.2.0 schema:
- Frontmatter with `name` and `description`
- Markdown documentation in `SKILL.md`
- Optional scripts and references directories
- Automatic availability when plugin is active

### File Organization

The plugin uses symbolic links to maintain a single source of truth for skills while providing proper plugin structure:
- **Source**: `.claude/skills/` (actual skill implementation)
- **Plugin**: `.claude-plugin/skills/` (symlinks for plugin structure)

This approach allows:
- Easy skill updates without duplicating files
- Proper plugin structure for distribution
- Consistent skill access across workflows

## Troubleshooting

### Skill Not Activating

1. **Check API Key**: Verify `EXA_API_KEY` is set in `/backend/.env`
2. **Verify Skill Link**: Ensure symlink exists: `ls -la .claude-plugin/skills/`
3. **Check Plugin Config**: Validate `plugin.json` format

### API Errors

- **401 Unauthorized**: Invalid or missing API key
- **400 Bad Request**: Check query format and parameters
- **Rate Limiting**: Monitor costs in response metadata

### Poor Search Results

- Make queries more specific (include technology names and versions)
- Try different phrasings of the same concept
- Increase token count for more comprehensive results

## Resources

- **Exa API Documentation**: https://docs.exa.ai/reference/context
- **Claude Code Plugins Guide**: https://code.claude.com/docs/en/plugins
- **Skill Documentation**: `.claude/skills/exa-code-context/SKILL.md`

## Support

For issues or questions:
1. Check skill documentation in `.claude/skills/exa-code-context/`
2. Review API reference in `.claude/skills/exa-code-context/references/`
3. Consult Exa API dashboard for usage and diagnostics

## License

This plugin is part of the Tannery App project and follows the project's license.
