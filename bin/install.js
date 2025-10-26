#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();

  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(childItemName => {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

function install() {
  log('\n🚀 Installing Skilled Spec for Claude Code...\n', 'bright');

  // Get current working directory (where user ran the command)
  const targetDir = process.cwd();
  const claudeDir = path.join(targetDir, '.claude');
  const skillsTargetDir = path.join(claudeDir, 'skills');
  const settingsFile = path.join(claudeDir, 'settings.json');

  // Get source directory (where this package is installed)
  const packageRoot = path.join(__dirname, '..');
  const skillsSourceDir = path.join(packageRoot, 'skills');

  try {
    // Step 1: Create .claude directory
    log('📁 Creating .claude directory...', 'blue');
    if (!fs.existsSync(claudeDir)) {
      fs.mkdirSync(claudeDir, { recursive: true });
      log('   ✓ Created .claude/', 'green');
    } else {
      log('   ✓ .claude/ already exists', 'green');
    }

    // Step 2: Create skills directory
    if (!fs.existsSync(skillsTargetDir)) {
      fs.mkdirSync(skillsTargetDir, { recursive: true });
    }

    // Step 3: Copy skills
    log('\n📦 Installing skills...', 'blue');
    const skills = fs.readdirSync(skillsSourceDir);

    skills.forEach(skill => {
      const sourcePath = path.join(skillsSourceDir, skill);
      const targetPath = path.join(skillsTargetDir, skill);

      if (fs.statSync(sourcePath).isDirectory()) {
        copyRecursiveSync(sourcePath, targetPath);
        log(`   ✓ ${skill}`, 'green');
      }
    });

    // Step 4: Create or update settings.json
    log('\n⚙️  Configuring settings...', 'blue');
    let settings = {};

    if (fs.existsSync(settingsFile)) {
      try {
        const content = fs.readFileSync(settingsFile, 'utf8');
        settings = JSON.parse(content);
        log('   ✓ Updated existing settings.json', 'green');
      } catch (e) {
        log('   ⚠ Could not parse existing settings.json, creating new one', 'yellow');
      }
    } else {
      log('   ✓ Created settings.json', 'green');
    }

    // Ensure settings has the required structure (but don't overwrite existing config)
    if (!settings.permissions) {
      settings.permissions = {
        allow: [],
        deny: [],
        ask: []
      };
    }

    fs.writeFileSync(settingsFile, JSON.stringify(settings, null, 2));

    // Success message
    log('\n✨ Installation complete!\n', 'bright');
    log('Skills installed to:', 'blue');
    log(`   ${path.relative(targetDir, skillsTargetDir)}/\n`, 'green');

    log('📚 Next steps:', 'bright');
    log('   1. Start Claude Code: claude', 'blue');
    log('   2. Try: "Create a proposal for user authentication"', 'blue');
    log('   3. Read: CLAUDE.md for usage instructions\n', 'blue');

    log('🔗 Learn more: https://github.com/mahidalhan/skilled-spec\n', 'blue');

  } catch (error) {
    log('\n❌ Installation failed:', 'red');
    log(`   ${error.message}\n`, 'red');
    process.exit(1);
  }
}

// Run installation
install();
