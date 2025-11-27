# Search Patterns

Grep and find patterns for discovering specifications and requirements.

## List Specifications

### All Living Specs
```bash
find spec -name "*.md" -not -path "*/changes/*" -not -path "*/archive/*"
```

### Specs by Domain
```bash
# Authentication specs
find spec -name "*auth*.md" -not -path "*/changes/*"

# API specs
find spec -name "*api*.md" -not -path "*/changes/*"
```

## List Changes

### Active Changes
```bash
ls -1 spec/changes/ | grep -v "archive"
```

### Archived Changes
```bash
ls -1 spec/changes/archive/
```

### Changes by Status
```bash
# Implemented changes (ready to archive)
grep -l "IMPLEMENTED" spec/changes/*/proposal.md

# Changes missing IMPLEMENTED marker
find spec/changes -name "proposal.md" -not -path "*/archive/*" | \
  xargs grep -L "IMPLEMENTED"
```

## Search Requirements

### Find by Keyword
```bash
# Find requirements mentioning "authentication"
grep -r "### Requirement:.*authentication" spec/
```

### List All Requirements
```bash
# Show all requirements with file location
grep -rn "^### Requirement:" spec/ --exclude-dir=changes --exclude-dir=archive
```

### Count Requirements
```bash
# Total requirements in living specs
grep -r "^### Requirement:" spec/ --exclude-dir=changes | wc -l

# Requirements per file
for file in spec/**/*.md; do
  count=$(grep -c "^### Requirement:" "$file" 2>/dev/null || echo 0)
  [ $count -gt 0 ] && echo "$file: $count"
done
```

## Search Scenarios

### Find Scenarios
```bash
# List all scenarios
grep -rn "^#### Scenario:" spec/

# Scenarios for specific requirement
grep -A20 "^### Requirement: User Login" spec/authentication.md | \
  grep "^#### Scenario:"
```

### Requirements Missing Scenarios
```bash
# Find requirements without scenarios
awk '/^### Requirement:/ {
  req=$0;
  getline;
  if ($0 !~ /^####/) print req
}' spec/**/*.md
```

## Search Changes

### Changes Affecting a Spec
```bash
# Find changes that modify authentication spec
grep -r "authentication" spec/changes/*/specs/
```

### Recent Changes
```bash
# Changes created in last 30 days
find spec/changes -name "proposal.md" -mtime -30
```

## Search by Delta Operation

### Find ADDED Requirements
```bash
# List all ADDED requirements across changes
grep -r "^## ADDED" spec/changes/*/specs/ -A50 | \
  grep "^### Requirement:"
```

### Find MODIFIED Requirements
```bash
grep -r "^## MODIFIED" spec/changes/*/specs/ -A50 | \
  grep "^### Requirement:"
```

### Find REMOVED Requirements
```bash
grep -r "^## REMOVED" spec/changes/*/specs/ -A50 | \
  grep "^### Requirement:"
```

## Dashboard Queries

### Project Overview
```bash
echo "=== Spec-Driven Development Dashboard ==="
echo "Living Specs: $(find spec -name "*.md" -not -path "*/changes/*" | wc -l)"
echo "Total Requirements: $(grep -r "^### Requirement:" spec/ --exclude-dir=changes | wc -l)"
echo "Active Changes: $(ls -1 spec/changes/ | grep -v archive | wc -l)"
echo "Completed Changes: $(ls -1 spec/changes/archive/ 2>/dev/null | wc -l)"
```

### Change Status
```bash
# Show status of all changes
for change in spec/changes/*/; do
  name=$(basename "$change")
  if grep -q "IMPLEMENTED" "$change/proposal.md" 2>/dev/null; then
    status="✓ IMPLEMENTED"
  else
    status="⧖ IN PROGRESS"
  fi
  echo "$status - $name"
done
```

## Quick Reference

| Task | Command |
|------|---------|
| List specs | `find spec -name "*.md" -not -path "*/changes/*"` |
| List changes | `ls -1 spec/changes/` |
| Find requirement | `grep -r "### Requirement: {name}" spec/` |
| Count requirements | `grep -r "^### Requirement:" spec/ \| wc -l` |
| Show scenarios | `grep -r "^#### Scenario:" spec/` |
| Implemented changes | `grep -l "IMPLEMENTED" spec/changes/*/proposal.md` |
