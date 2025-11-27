# Plugin Distribution Guide

This guide explains how to share the Tannery App Claude plugin with team members and the wider community.

## Quick Start

There are three main ways to distribute this plugin:

1. **GitHub Distribution** (Recommended for teams)
2. **Git Repository** (For private/self-hosted repos)
3. **Local Installation** (For testing and development)

---

## Method 1: GitHub Distribution (Recommended)

This is the easiest way to share with team members or the public.

### Prerequisites

- Plugin files committed to your GitHub repository
- `.claude-plugin/` directory at repository root with:
  - `plugin.json`
  - `marketplace.json`
  - Skills directory

### Step 1: Push Plugin to GitHub

```bash
git add .claude-plugin/
git commit -m "Add Claude Code plugin with exa-code-context skill"
git push origin main
```

### Step 2: Share Installation Command

Team members can install using:

```bash
/plugin marketplace add mahidalhan/tannery_app
/plugin install tannery-app-plugin@tannery-app-marketplace
```

Replace `mahidalhan/tannery_app` with your actual GitHub username/repository.

### Step 3: Verify Installation

After installation, users should see the plugin listed:

```bash
/plugin list
```

---

## Method 2: Git Repository (GitLab, Bitbucket, etc.)

For organizations using alternative Git hosting.

### Installation via URL

Users can add the marketplace directly:

```bash
/plugin marketplace add https://gitlab.com/yourorg/tannery_app.git
/plugin install tannery-app-plugin@tannery-app-marketplace
```

Replace the URL with your actual repository URL.

---

## Method 3: Local Installation

For development, testing, or private distribution.

### Option A: Direct Path

If users have local access to the repository:

```bash
# Add marketplace from local path
/plugin marketplace add /Users/mahidalhan/code/tannery_app/.claude-plugin

# Install plugin
/plugin install tannery-app-plugin@tannery-app-marketplace
```

### Option B: Zip Distribution

1. **Create distribution package:**
   ```bash
   cd /Users/mahidalhan/code/tannery_app
   zip -r tannery-app-plugin.zip .claude-plugin/ .claude/skills/exa-code-context/
   ```

2. **Share the zip file** with team members

3. **Recipients extract and install:**
   ```bash
   unzip tannery-app-plugin.zip -d ~/tannery-app-plugin
   /plugin marketplace add ~/tannery-app-plugin/.claude-plugin
   /plugin install tannery-app-plugin@tannery-app-marketplace
   ```

---

## Method 4: Automatic Team Installation

For organizations wanting seamless onboarding.

### Setup Team Configuration

Add to `.claude/settings.json` in your repository:

```json
{
  "extraKnownMarketplaces": [
    {
      "name": "tannery-app-marketplace",
      "source": "github:mahidalhan/tannery_app"
    }
  ]
}
```

**How it works:**
- When team members clone the repository and trust the folder
- Claude Code automatically installs the marketplace
- Plugin becomes available without manual commands
- Ensures consistent tooling across the team

---

## Installation Requirements

### For Plugin Users

Before installing, users need:

1. **Exa API Key**: Obtain from https://dashboard.exa.ai/api-keys

2. **Environment Setup**: Add to their local `/backend/.env`:
   ```bash
   EXA_API_KEY=their-api-key-here
   ```

3. **Python Dependencies**:
   ```bash
   pip install requests python-dotenv
   ```

### First-Time Setup Guide for Users

Share this checklist with new users:

```bash
# 1. Install the plugin
/plugin marketplace add mahidalhan/tannery_app
/plugin install tannery-app-plugin@tannery-app-marketplace

# 2. Get Exa API key from https://dashboard.exa.ai/api-keys

# 3. Add to backend/.env
echo "EXA_API_KEY=your-key-here" >> backend/.env

# 4. Install Python dependencies
pip install requests python-dotenv

# 5. Test the skill
# Just ask Claude a coding question naturally, e.g.:
# "How do I use FastAPI async endpoints?"
```

---

## Verification

### For Distributors

Before sharing, verify your plugin structure:

```bash
# Check plugin files exist
ls -la .claude-plugin/

# Verify marketplace.json
cat .claude-plugin/marketplace.json

# Verify skill link
ls -la .claude-plugin/skills/
```

Expected structure:
```
.claude-plugin/
├── marketplace.json     ✓
├── plugin.json         ✓
├── README.md           ✓
└── skills/
    └── exa-code-context/ -> ../.claude/skills/exa-code-context/  ✓
```

### For Users

After installation, verify:

```bash
# List installed plugins
/plugin list

# List installed marketplaces
/plugin marketplace list

# Test skill availability (ask Claude):
"Show me React hooks examples"
```

---

## Publishing to Public Marketplaces

For wider community distribution:

### Option 1: Submit to Claude Code Plugins Plus

[Claude Code Plugins Plus](https://github.com/jeremylongshore/claude-code-plugins-plus) is a community marketplace with 243+ plugins.

**Submission steps:**
1. Fork the repository
2. Add your marketplace to their registry
3. Submit pull request
4. Community can discover via their marketplace

### Option 2: Create Public Registry

Host your own public marketplace on GitHub:

1. Create dedicated repository: `your-org/claude-plugins`
2. Add multiple plugin definitions to `marketplace.json`
3. Share via `/plugin marketplace add your-org/claude-plugins`
4. Community can browse and install

---

## Updating the Plugin

### For Distributors

1. **Update version** in `plugin.json`:
   ```json
   {
     "version": "1.1.0"
   }
   ```

2. **Update marketplace** in `marketplace.json`:
   ```json
   {
     "plugins": [{
       "version": "1.1.0"
     }]
   }
   ```

3. **Commit and push:**
   ```bash
   git add .claude-plugin/
   git commit -m "Release v1.1.0: Add new features"
   git push
   ```

### For Users

Update installed plugins:

```bash
# Update all plugins
/plugin update

# Or update specific plugin
/plugin update tannery-app-plugin
```

---

## Troubleshooting Distribution

### Plugin Not Found

**Issue**: `/plugin install` fails with "not found"

**Solutions:**
1. Verify marketplace is added: `/plugin marketplace list`
2. Check repository URL/path is correct
3. Ensure `.claude-plugin/` is at repository root
4. Verify `marketplace.json` syntax

### Skill Not Working

**Issue**: Skill doesn't activate after installation

**Solutions:**
1. Check API key is set: `cat backend/.env | grep EXA_API_KEY`
2. Verify dependencies: `pip list | grep requests`
3. Check skill link exists: `ls -la .claude-plugin/skills/`
4. Restart Claude Code

### Permission Denied

**Issue**: Cannot install from local path

**Solutions:**
1. Check file permissions: `ls -la .claude-plugin/`
2. Ensure full path is correct
3. Try absolute path instead of relative
4. Check Claude Code has access to directory

---

## Distribution Best Practices

### Version Management

- Use semantic versioning (MAJOR.MINOR.PATCH)
- Document changes in commit messages
- Tag releases in Git: `git tag v1.0.0`

### Documentation

- Keep README.md updated with latest features
- Include setup instructions
- Provide troubleshooting guide
- Add example usage

### Testing

- Test locally before pushing
- Verify with fresh installation
- Have team members test before public release
- Check all skills activate correctly

### Security

- Never commit API keys
- Document environment variable requirements
- Review skill scripts for security issues
- Keep dependencies updated

---

## Support

When users report issues:

1. **Check their setup:**
   - Claude Code version
   - Plugin installation method
   - API key configuration
   - Dependencies installed

2. **Review logs:**
   - Claude Code error messages
   - Python script output
   - API response errors

3. **Common solutions:**
   - Reinstall plugin
   - Update dependencies
   - Verify API key
   - Check network connectivity

---

## Example Distribution Workflow

### Internal Team Distribution

```bash
# 1. Developer creates plugin
cd tannery_app
# ... create plugin files ...

# 2. Add to version control
git add .claude-plugin/ .claude/skills/exa-code-context/
git commit -m "Add Claude Code plugin"
git push

# 3. Update team settings.json
# Add extraKnownMarketplaces configuration

# 4. Team members clone/pull
git pull

# 5. Claude Code auto-installs
# Plugin available immediately

# 6. Users complete setup
# - Add API key to .env
# - Install dependencies
# - Start using
```

### Public Distribution

```bash
# 1. Prepare for release
# - Clean up code
# - Update documentation
# - Test thoroughly

# 2. Tag release
git tag v1.0.0
git push --tags

# 3. Share installation command
# Post to docs/README/community

# 4. Community installs
/plugin marketplace add mahidalhan/tannery_app
/plugin install tannery-app-plugin@tannery-app-marketplace

# 5. Gather feedback
# - Monitor issues
# - Update based on feedback
# - Release improvements
```

---

## Resources

- **Claude Code Plugin Docs**: https://code.claude.com/docs/en/plugins
- **Plugin Marketplaces Guide**: https://code.claude.com/docs/en/plugin-marketplaces
- **Community Plugins**: https://github.com/jeremylongshore/claude-code-plugins-plus
- **Exa API**: https://docs.exa.ai/reference/context

---

## Quick Reference

### Installation Commands

```bash
# GitHub
/plugin marketplace add owner/repo
/plugin install plugin-name@marketplace-name

# Git URL
/plugin marketplace add https://gitlab.com/org/repo.git
/plugin install plugin-name@marketplace-name

# Local
/plugin marketplace add /path/to/.claude-plugin
/plugin install plugin-name@marketplace-name
```

### Management Commands

```bash
# List installed
/plugin list
/plugin marketplace list

# Update
/plugin update
/plugin update plugin-name

# Remove
/plugin uninstall plugin-name
/plugin marketplace remove marketplace-name
```

---

**Current Plugin Version**: 1.0.0
**Last Updated**: 2025-11-21
