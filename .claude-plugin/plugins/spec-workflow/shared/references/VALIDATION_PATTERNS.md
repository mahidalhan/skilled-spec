# Validation Patterns

Grep and bash patterns to validate proposal structure without external CLI tools.

## Contents
- Directory structure validation
- Proposal file validation
- Spec delta validation
- Requirement format validation
- Common validation workflows

## Directory Structure Validation

### Check Change Directory Exists

```bash
# Verify change directory was created
test -d spec/changes/{change-id} && echo "✓ Directory exists" || echo "✗ Directory missing"
```

### List All Changes

```bash
# Show all active changes
ls -1 spec/changes/ | grep -v "archive"
```

### Check for Conflicts

```bash
# Search for similar change IDs
ls spec/changes/ | grep -i "{search-term}"
```

## Proposal File Validation

### Check Required Sections

```bash
# Verify proposal.md has required sections
grep -c "## Why" spec/changes/{change-id}/proposal.md
grep -c "## What Changes" spec/changes/{change-id}/proposal.md
grep -c "## Impact" spec/changes/{change-id}/proposal.md
```

**Expected**: Each grep returns 1 (or more if subsections exist)

### Validate Tasks File

```bash
# Count numbered tasks
grep -c "^[0-9]\+\." spec/changes/{change-id}/tasks.md

# Show task list
grep "^[0-9]\+\." spec/changes/{change-id}/tasks.md
```

**Expected**: 5-15 tasks typically

## Spec Delta Validation

### Check Delta Operations Exist

```bash
# Count delta operation headers
grep -c "## ADDED\|MODIFIED\|REMOVED" spec/changes/{change-id}/specs/**/*.md
```

**Expected**: At least 1 match

### List Delta Operations

```bash
# Show all delta operations with line numbers
grep -n "## ADDED\|MODIFIED\|REMOVED" spec/changes/{change-id}/specs/**/*.md
```

**Example output**:
```
spec/changes/add-auth/specs/authentication/spec-delta.md:3:## ADDED Requirements
spec/changes/add-auth/specs/authentication/spec-delta.md:45:## MODIFIED Requirements
```

### Verify Each Section Has Content

```bash
# Check if ADDED section has requirements
awk '/## ADDED/,/^## [A-Z]/ {if (/### Requirement:/) count++} END {print count}' \
    spec/changes/{change-id}/specs/**/*.md
```

## Requirement Format Validation

### Check Requirement Headers

```bash
# List all requirement headers
grep -n "### Requirement:" spec/changes/{change-id}/specs/**/*.md
```

**Expected format**: `### Requirement: Descriptive Name`

### Validate Scenario Format

```bash
# Check for scenarios (must be 4 hashtags)
grep -n "#### Scenario:" spec/changes/{change-id}/specs/**/*.md
```

**Expected format**: `#### Scenario: Descriptive Name`

### Count Requirements vs Scenarios

```bash
# Count requirements
REQS=$(grep -c "### Requirement:" spec/changes/{change-id}/specs/**/*.md)

# Count scenarios
SCENARIOS=$(grep -c "#### Scenario:" spec/changes/{change-id}/specs/**/*.md)

echo "Requirements: $REQS"
echo "Scenarios: $SCENARIOS"
echo "Ratio: $(echo "scale=1; $SCENARIOS/$REQS" | bc)"
```

**Expected**: Ratio >= 2.0 (at least 2 scenarios per requirement)

### Check for SHALL Keyword

```bash
# Verify requirements use SHALL (binding requirement indicator)
grep -c "SHALL" spec/changes/{change-id}/specs/**/*.md
```

**Expected**: At least as many SHALL as requirements

## Complete Validation Workflow

### Pre-Submit Validation Script

```bash
#!/bin/bash
# Validate change proposal structure

CHANGE_ID="$1"
BASE_PATH="spec/changes/$CHANGE_ID"

echo "Validating proposal: $CHANGE_ID"
echo "================================"

# 1. Directory exists
if [ ! -d "$BASE_PATH" ]; then
    echo "✗ Change directory not found"
    exit 1
fi
echo "✓ Change directory exists"

# 2. Required files exist
for file in proposal.md tasks.md; do
    if [ ! -f "$BASE_PATH/$file" ]; then
        echo "✗ Missing $file"
        exit 1
    fi
    echo "✓ Found $file"
done

# 3. Proposal has required sections
for section in "## Why" "## What Changes" "## Impact"; do
    if ! grep -q "$section" "$BASE_PATH/proposal.md"; then
        echo "✗ proposal.md missing section: $section"
        exit 1
    fi
done
echo "✓ Proposal has required sections"

# 4. Tasks file has numbered tasks
TASK_COUNT=$(grep -c "^[0-9]\+\." "$BASE_PATH/tasks.md" || echo "0")
if [ "$TASK_COUNT" -lt 3 ]; then
    echo "✗ tasks.md has insufficient tasks ($TASK_COUNT)"
    exit 1
fi
echo "✓ Found $TASK_COUNT tasks"

# 5. Spec deltas exist
DELTA_COUNT=$(find "$BASE_PATH/specs" -name "*.md" 2>/dev/null | wc -l)
if [ "$DELTA_COUNT" -eq 0 ]; then
    echo "✗ No spec delta files found"
    exit 1
fi
echo "✓ Found $DELTA_COUNT spec delta file(s)"

# 6. Delta operations exist
OPERATIONS=$(grep -h "## ADDED\|MODIFIED\|REMOVED" "$BASE_PATH/specs"/**/*.md 2>/dev/null | wc -l)
if [ "$OPERATIONS" -eq 0 ]; then
    echo "✗ No delta operations found"
    exit 1
fi
echo "✓ Found $OPERATIONS delta operation(s)"

# 7. Requirements have scenarios
REQ_COUNT=$(grep -h "### Requirement:" "$BASE_PATH/specs"/**/*.md 2>/dev/null | wc -l)
SCENARIO_COUNT=$(grep -h "#### Scenario:" "$BASE_PATH/specs"/**/*.md 2>/dev/null | wc -l)

if [ "$REQ_COUNT" -eq 0 ]; then
    echo "✗ No requirements found"
    exit 1
fi

if [ "$SCENARIO_COUNT" -lt "$REQ_COUNT" ]; then
    echo "⚠ Warning: Fewer scenarios ($SCENARIO_COUNT) than requirements ($REQ_COUNT)"
    echo "  Recommendation: At least 2 scenarios per requirement"
else
    echo "✓ Found $REQ_COUNT requirement(s) with $SCENARIO_COUNT scenario(s)"
fi

echo "================================"
echo "✓ Validation passed"
```

**Usage**:
```bash
bash validate-proposal.sh add-user-auth
```

## Common Issues and Fixes

### Issue: Missing Scenarios

**Detection**:
```bash
# Find requirements without scenarios
awk '/### Requirement:/ {req=$0; getline; if ($0 !~ /#### Scenario:/) print req}' \
    spec/changes/{change-id}/specs/**/*.md
```

**Fix**: Add scenarios for each requirement

### Issue: Wrong Scenario Level

**Detection**:
```bash
# Find scenarios with wrong hashtag count (not exactly 4)
grep -n "^###\? Scenario:\|^#####+ Scenario:" spec/changes/{change-id}/specs/**/*.md
```

**Fix**: Scenarios must use exactly 4 hashtags: `#### Scenario:`

### Issue: Missing Delta Operations

**Detection**:
```bash
# Check if file has requirements but no delta header
for file in spec/changes/{change-id}/specs/**/*.md; do
    if grep -q "### Requirement:" "$file" && \
       ! grep -q "## ADDED\|MODIFIED\|REMOVED" "$file"; then
        echo "Missing delta operation in: $file"
    fi
done
```

**Fix**: Add appropriate delta operation header (ADDED/MODIFIED/REMOVED)

## Quick Validation Commands

### One-Liner: Full Structure Check

```bash
# Quick validation of change structure
CHANGE_ID="add-user-auth" && \
test -f spec/changes/$CHANGE_ID/proposal.md && \
test -f spec/changes/$CHANGE_ID/tasks.md && \
grep -q "## ADDED\|MODIFIED\|REMOVED" spec/changes/$CHANGE_ID/specs/**/*.md && \
grep -q "### Requirement:" spec/changes/$CHANGE_ID/specs/**/*.md && \
grep -q "#### Scenario:" spec/changes/$CHANGE_ID/specs/**/*.md && \
echo "✓ All validations passed" || echo "✗ Validation failed"
```

### Show Proposal Summary

```bash
# Display proposal overview
CHANGE_ID="add-user-auth"
echo "Proposal: $CHANGE_ID"
echo "Files: $(find spec/changes/$CHANGE_ID -type f | wc -l)"
echo "Tasks: $(grep -c "^[0-9]\+\." spec/changes/$CHANGE_ID/tasks.md)"
echo "Requirements: $(grep -h "### Requirement:" spec/changes/$CHANGE_ID/specs/**/*.md | wc -l)"
echo "Scenarios: $(grep -h "#### Scenario:" spec/changes/$CHANGE_ID/specs/**/*.md | wc -l)"
```

## Validation Checklist

Before presenting proposal to user:

```markdown
Manual Checks:
- [ ] Change ID is descriptive and unique
- [ ] proposal.md Why section explains the problem
- [ ] proposal.md What section lists concrete changes
- [ ] proposal.md Impact section identifies affected areas
- [ ] tasks.md has 5-15 concrete, testable tasks
- [ ] Tasks are ordered by dependencies

Automated Checks:
- [ ] Directory structure exists
- [ ] Required files present (proposal.md, tasks.md, spec-delta.md)
- [ ] Delta operations present (ADDED/MODIFIED/REMOVED)
- [ ] Requirements follow format: `### Requirement: Name`
- [ ] Scenarios follow format: `#### Scenario: Name`
- [ ] At least 2 scenarios per requirement
- [ ] Requirements use SHALL keyword
```

Run all automated checks:
```bash
# Execute validation script
bash validate-proposal.sh {change-id}
```
