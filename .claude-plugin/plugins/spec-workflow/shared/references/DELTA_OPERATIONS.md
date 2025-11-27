# Delta Operations Reference

Spec deltas use three operations to describe changes to living specifications: ADDED, MODIFIED, and REMOVED.

## Contents
- Delta operation types
- Merge logic for each operation
- Examples and patterns
- Anti-patterns to avoid

## Delta Operation Types

### ADDED

**Purpose**: Introduce new requirements that did not exist in the living spec.

**Format**:
```markdown
## ADDED Requirements

### Requirement: New Feature Name
WHEN {trigger},
the system SHALL {action and outcome}.

#### Scenario: Scenario Name
GIVEN {preconditions}
WHEN {action}
THEN {expected outcome}
```

**Merge Logic**: Append the entire requirement (with all scenarios) to the end of the appropriate spec file.

**Example**:
```markdown
## ADDED Requirements

### Requirement: Password Reset
WHEN a user requests a password reset,
the system SHALL send a time-limited reset link to the user's email.

#### Scenario: Successful Reset Request
GIVEN a registered user with email "user@example.com"
WHEN the user requests a password reset
THEN the system sends an email with a reset link
AND the link expires in 1 hour
```

### MODIFIED

**Purpose**: Update existing requirements while preserving the requirement structure.

**Format**:
```markdown
## MODIFIED Requirements

### Requirement: Existing Feature Name
**Old**:
```
{previous requirement text}
```

**New**:
```
WHEN {updated trigger},
the system SHALL {updated action and outcome}.
```

#### Scenario: Updated Scenario
GIVEN {new preconditions}
WHEN {new action}
THEN {new expected outcome}
```

**Merge Logic**:
1. Find the requirement by name in the living spec
2. Replace the entire requirement section (including all scenarios) with the new version
3. Preserve the requirement's position in the spec

**Example**:
```markdown
## MODIFIED Requirements

### Requirement: User Login
**Old**:
```
WHEN a user submits credentials,
the system SHALL authenticate the user.
```

**New**:
```
WHEN a user submits valid credentials with 2FA code,
the system SHALL authenticate the user and create a session.
```

#### Scenario: Login with 2FA
GIVEN a user with 2FA enabled
AND the user provides correct password
AND the user provides valid 2FA code
WHEN the user submits the login form
THEN the system authenticates the user
AND creates a session
```

### REMOVED

**Purpose**: Delete requirements that are no longer applicable.

**Format**:
```markdown
## REMOVED Requirements

### Requirement: Deprecated Feature Name
**Reason**: {explanation of why this requirement is being removed}

**Was**:
```
{previous requirement text for reference}
```
```

**Merge Logic**:
1. Find the requirement by name in the living spec
2. Delete the entire requirement section (including all scenarios)
3. No trace remains in the living spec (archived in change proposal)

**Example**:
```markdown
## REMOVED Requirements

### Requirement: Flash Plugin Support
**Reason**: Flash has been deprecated and is no longer supported by modern browsers.

**Was**:
```
WHEN a user uploads a Flash file,
the system SHALL display it in the Flash player.
```
```

## Merge Algorithm

When archiving a change, delta operations are merged into living specs in this order:

### Step 1: Process REMOVED Operations
```bash
# For each REMOVED requirement:
# 1. Find "### Requirement: {name}" in living spec
# 2. Delete from that line to the next "### Requirement:" or end of file
```

**Why first**: Prevents conflicts with ADDED/MODIFIED operations on the same requirement name.

### Step 2: Process MODIFIED Operations
```bash
# For each MODIFIED requirement:
# 1. Find "### Requirement: {name}" in living spec
# 2. Replace from that line to the next "### Requirement:" with new content
# 3. Preserve position in file
```

**Why second**: Updates existing requirements before adding new ones.

### Step 3: Process ADDED Operations
```bash
# For each ADDED requirement:
# 1. Append to end of appropriate section in living spec
# 2. Maintain spec file organization (group related requirements)
```

**Why last**: New requirements go at the end, no conflicts possible.

## Complete Example: Multi-Operation Delta

**spec-delta.md**:
```markdown
# Authentication Spec Delta

## REMOVED Requirements

### Requirement: Username Login
**Reason**: Moving to email-only authentication for better security and user experience.

**Was**:
```
WHEN a user submits a username and password,
the system SHALL authenticate the user.
```

## MODIFIED Requirements

### Requirement: User Registration
**Old**:
```
WHEN a user submits a registration form,
the system SHALL create an account.
```

**New**:
```
WHEN a user submits a registration form with valid email and password,
the system SHALL create an account and send a verification email.
```

#### Scenario: Successful Registration
GIVEN a user provides email "new@example.com"
AND provides password meeting requirements
AND email is not already registered
WHEN the user submits registration
THEN the system creates an unverified account
AND sends verification email

## ADDED Requirements

### Requirement: Email Verification
WHEN a user clicks a verification link within 24 hours,
the system SHALL activate the account.

#### Scenario: Valid Verification
GIVEN a user received a verification email
AND the token is less than 24 hours old
WHEN the user clicks the link
THEN the system activates the account
AND displays success message

#### Scenario: Expired Token
GIVEN a verification token older than 24 hours
WHEN the user clicks the link
THEN the system rejects the verification
AND offers to resend a new link
```

**Merge Result**:
1. ❌ Remove "Username Login" requirement
2. ✏️ Update "User Registration" with new scenarios
3. ✅ Add "Email Verification" at end

## Anti-Patterns

### ❌ Modifying Non-Existent Requirements

**Bad**:
```markdown
## MODIFIED Requirements

### Requirement: Feature That Doesn't Exist
**Old**: ...
**New**: ...
```

**Fix**: Use ADDED for new requirements, not MODIFIED.

### ❌ Adding Duplicate Requirements

**Bad**:
```markdown
## ADDED Requirements

### Requirement: User Login
{...requirement that already exists in living spec...}
```

**Fix**: Use MODIFIED to update existing requirements.

### ❌ Removing Without Explanation

**Bad**:
```markdown
## REMOVED Requirements

### Requirement: Important Feature
```

**Fix**: Always include **Reason** and **Was** sections to document why and what was removed.

### ❌ Incomplete MODIFIED Sections

**Bad**:
```markdown
## MODIFIED Requirements

### Requirement: User Login
**New**:
WHEN user logs in, system SHALL authenticate.
```

**Fix**: Always include **Old** section to show what changed.

## Validation Checklist

Before archiving a delta:

- [ ] All ADDED requirements have complete scenarios
- [ ] All MODIFIED requirements show both Old and New
- [ ] All REMOVED requirements explain Reason and show Was
- [ ] Requirement names match exactly (case-sensitive) with living spec
- [ ] No duplicate requirement names across operations
- [ ] Delta operations use correct headers (## ADDED/MODIFIED/REMOVED)

## Quick Reference

| Operation | When to Use | Merge Action |
|-----------|-------------|--------------|
| **ADDED** | New requirement | Append to end of spec |
| **MODIFIED** | Update existing | Replace in-place |
| **REMOVED** | Delete requirement | Remove entire section |

**Merge Order**: REMOVED → MODIFIED → ADDED
