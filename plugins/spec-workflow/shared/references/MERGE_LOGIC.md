# Spec Merge Logic

Detailed algorithm for merging spec deltas into living specifications.

## Merge Order

```
1. REMOVED operations (delete requirements)
2. MODIFIED operations (update requirements)
3. ADDED operations (append requirements)
```

**Why this order**: Prevents conflicts and ensures clean merges.

## REMOVED Merge Logic

### Algorithm
```bash
FOR EACH requirement in REMOVED section:
  1. Extract requirement name
  2. Find "### Requirement: {name}" in living spec
  3. Identify end of requirement (next "### Requirement:" or EOF)
  4. Delete entire requirement section
  5. Save changes
```

### Implementation Pattern
```bash
# Find and delete requirement
sed -i '' '/^### Requirement: Password Reset/,/^### Requirement:/d' spec/authentication.md
```

### Edge Cases
- **Last requirement in file**: Delete to EOF, not to next heading
- **Requirement not found**: Warning (don't fail merge)
- **Partial match**: Exact name match only (case-sensitive)

## MODIFIED Merge Logic

### Algorithm
```bash
FOR EACH requirement in MODIFIED section:
  1. Extract requirement name
  2. Extract new requirement content
  3. Find "### Requirement: {name}" in living spec
  4. Identify end of requirement
  5. Replace entire section with new content
  6. Preserve position in file
```

### Implementation Pattern
```bash
# 1. Extract new content to temp file
awk '/^### Requirement: User Login/,/^### Requirement:/' delta.md > new_content.md

# 2. Replace in living spec (preserve position)
# Delete old → Insert new at same position
```

### Edge Cases
- **Requirement doesn't exist**: Warning (use ADDED instead)
- **Multiple matches**: Error (requirement names must be unique)
- **Scenarios only changed**: Still replace entire requirement

## ADDED Merge Logic

### Algorithm
```bash
FOR EACH requirement in ADDED section:
  1. Extract entire requirement (with scenarios)
  2. Determine target spec file
  3. Append to end of appropriate section
  4. Add blank line separator
```

### Implementation Pattern
```bash
# Append new requirement
cat new_requirement.md >> spec/authentication.md
```

### Organization
Group related requirements:
```markdown
## Authentication Requirements

### Requirement: User Login
...

### Requirement: User Logout
...

### Requirement: Session Management
...
```

## Complete Merge Example

**Before (living spec)**:
```markdown
### Requirement: User Login
WHEN user submits credentials,
the system SHALL authenticate.

### Requirement: User Logout
WHEN user clicks logout,
the system SHALL end session.
```

**Delta**:
```markdown
## REMOVED Requirements
### Requirement: User Logout
...

## MODIFIED Requirements
### Requirement: User Login
**New**: WHEN user submits credentials with 2FA...

## ADDED Requirements
### Requirement: Session Timeout
WHEN session is idle for 30 minutes...
```

**After (living spec)**:
```markdown
### Requirement: User Login
WHEN user submits credentials with 2FA,
the system SHALL authenticate and create session.

### Requirement: Session Timeout
WHEN session is idle for 30 minutes,
the system SHALL automatically log out user.
```

## Validation After Merge

```bash
# 1. Verify no duplicate requirements
DUPES=$(grep "^### Requirement:" spec/*.md | sort | uniq -d)
[ -z "$DUPES" ] || echo "Warning: Duplicate requirements"

# 2. Verify all requirements have scenarios
grep "^### Requirement:" spec/*.md | while read req; do
  # Check if followed by scenario
  ...
done

# 3. Verify EARS format compliance
grep "SHALL" spec/*.md | wc -l  # Should match requirement count
```

## Merge Checklist

Before merging delta:
- [ ] Verify delta has IMPLEMENTED marker
- [ ] All requirement names match living spec (for MODIFIED/REMOVED)
- [ ] No duplicate requirement names
- [ ] All ADDED requirements have scenarios

During merge:
- [ ] Process REMOVED first
- [ ] Process MODIFIED second
- [ ] Process ADDED last
- [ ] Preserve file formatting

After merge:
- [ ] No duplicate requirements
- [ ] All requirements have scenarios
- [ ] EARS format maintained
- [ ] Git commit merged changes
