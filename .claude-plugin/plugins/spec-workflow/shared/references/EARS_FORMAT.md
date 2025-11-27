# EARS Format Guide

EARS (Easy Approach to Requirements Syntax) provides a structured format for writing clear, testable requirements.

## Contents
- Requirement structure and keywords
- Scenario format (Given/When/Then)
- Requirement types and patterns
- Examples and anti-patterns

## Requirement Structure

### Basic Format

```markdown
### Requirement: {Descriptive Name}
{TRIGGER clause},
the system SHALL {action and outcome}.
```

### Trigger Types

**WHEN** (Event-driven):
```markdown
### Requirement: Save User Profile
WHEN a user clicks the "Save" button,
the system SHALL persist profile changes to the database.
```

**IF** (State-driven):
```markdown
### Requirement: Free Shipping
IF the cart total exceeds $50,
the system SHALL waive shipping fees.
```

**WHERE** (Feature-specific):
```markdown
### Requirement: Admin Access
WHERE the user has admin privileges,
the system SHALL display the administration panel.
```

**WHILE** (Continuous):
```markdown
### Requirement: Real-time Sync
WHILE a document is open,
the system SHALL synchronize changes every 5 seconds.
```

## SHALL vs SHOULD vs MAY

- **SHALL**: Binding requirement (must be implemented)
- **SHOULD**: Recommended but not mandatory
- **MAY**: Optional capability

**Prefer SHALL** for all production requirements. Use SHOULD/MAY sparingly.

## Scenario Format

Every requirement MUST have scenarios showing expected behavior.

### Structure

```markdown
#### Scenario: {Descriptive Name}
GIVEN {preconditions}
AND {additional preconditions}
WHEN {action or trigger}
THEN {expected outcome}
AND {additional outcome}
```

### Example: Complete Requirement with Scenarios

```markdown
### Requirement: User Login
WHEN a user submits valid credentials,
the system SHALL authenticate the user and create a session.

#### Scenario: Successful Login
GIVEN a registered user with email "user@example.com"
AND the user has correct password "SecurePass123"
WHEN the user submits the login form
THEN the system creates an authenticated session
AND redirects the user to the dashboard
AND sets a session cookie expiring in 24 hours

#### Scenario: Invalid Password
GIVEN a registered user with email "user@example.com"
AND the user provides incorrect password "WrongPass"
WHEN the user submits the login form
THEN the system rejects the login attempt
AND displays error message "Invalid email or password"
AND does not create a session

#### Scenario: Account Locked
GIVEN a user account that is locked due to failed attempts
WHEN the user submits any credentials
THEN the system rejects the login attempt
AND displays error message "Account locked. Contact support."
```

## Requirement Patterns

### Pattern 1: Data Validation

```markdown
### Requirement: Email Validation
WHEN a user enters an email address,
the system SHALL validate the format matches RFC 5322 standard.

#### Scenario: Valid Email
GIVEN a user entering email "test@example.com"
WHEN the form is submitted
THEN the system accepts the email

#### Scenario: Invalid Format
GIVEN a user entering email "not-an-email"
WHEN the form is submitted
THEN the system displays error "Invalid email format"
```

### Pattern 2: Authorization

```markdown
### Requirement: Delete Permission
WHERE a user attempts to delete a resource,
the system SHALL verify the user owns the resource OR has admin privileges.

#### Scenario: Owner Deletes
GIVEN a user owns document ID 123
WHEN the user requests deletion of document 123
THEN the system deletes the document

#### Scenario: Non-owner Blocked
GIVEN a user does not own document ID 456
AND the user lacks admin privileges
WHEN the user requests deletion of document 456
THEN the system returns HTTP 403 Forbidden
```

### Pattern 3: State Transitions

```markdown
### Requirement: Order Processing
WHEN an order is placed,
the system SHALL transition through states: pending → processing → shipped → delivered.

#### Scenario: Standard Flow
GIVEN a new order in "pending" state
WHEN payment is confirmed
THEN the system transitions to "processing"
WHEN items are shipped
THEN the system transitions to "shipped"
WHEN delivery is confirmed
THEN the system transitions to "delivered"
```

## Anti-Patterns to Avoid

### ❌ Vague Requirements

**Bad**:
```markdown
### Requirement: Fast Performance
The system should be fast.
```

**Good**:
```markdown
### Requirement: API Response Time
WHEN an API request is made,
the system SHALL respond within 200 milliseconds for 95% of requests.

#### Scenario: Normal Load
GIVEN the system is under normal load (< 100 requests/second)
WHEN an API request is made
THEN the response time is less than 200ms
```

### ❌ Missing Scenarios

**Bad**:
```markdown
### Requirement: File Upload
WHEN a user uploads a file,
the system SHALL store it.
```

**Good**:
```markdown
### Requirement: File Upload
WHEN a user uploads a file under 10MB,
the system SHALL store it in S3 and return a URL.

#### Scenario: Successful Upload
GIVEN a user selects a 5MB PDF file
WHEN the upload completes
THEN the system stores the file in S3
AND returns a signed URL valid for 1 hour

#### Scenario: File Too Large
GIVEN a user selects a 15MB video file
WHEN the upload is attempted
THEN the system rejects the file
AND displays error "File size exceeds 10MB limit"
```

### ❌ Implementation Details in Requirements

**Bad**:
```markdown
### Requirement: Password Storage
The system SHALL use bcrypt with work factor 12 and store hashes in the users table.
```

**Good**:
```markdown
### Requirement: Secure Password Storage
WHEN a user sets a password,
the system SHALL hash the password using industry-standard one-way hashing before storage.

#### Scenario: Password Creation
GIVEN a user sets password "SecurePass123"
WHEN the system processes the password
THEN the system stores only a cryptographic hash
AND discards the plaintext password
AND uses a unique salt per user
```

(Implementation choice of bcrypt/work factor goes in design docs, not requirements)

## Complete Example: User Registration

```markdown
## ADDED Requirements

### Requirement: Account Creation
WHEN a user submits a registration form with valid data,
the system SHALL create a new account and send a verification email.

#### Scenario: Successful Registration
GIVEN a user provides email "new@example.com"
AND provides password "SecurePass123"
AND provides name "John Doe"
AND the email is not already registered
WHEN the user submits the registration form
THEN the system creates a new user account
AND sends a verification email to "new@example.com"
AND displays message "Check your email to verify your account"
AND redirects to the login page

#### Scenario: Duplicate Email
GIVEN a user provides email "existing@example.com"
AND that email is already registered
WHEN the user submits the registration form
THEN the system rejects the registration
AND displays error "This email is already registered"
AND does not send an email

#### Scenario: Weak Password
GIVEN a user provides password "123"
WHEN the user submits the registration form
THEN the system rejects the registration
AND displays error "Password must be at least 8 characters"

### Requirement: Email Verification
WHEN a user clicks a verification link,
the system SHALL activate the account if the token is valid and not expired.

#### Scenario: Valid Token
GIVEN a user received a verification email
AND the verification token is less than 24 hours old
WHEN the user clicks the verification link
THEN the system activates the account
AND displays message "Account verified successfully"
AND redirects to the login page

#### Scenario: Expired Token
GIVEN a verification token is more than 24 hours old
WHEN the user clicks the verification link
THEN the system rejects the verification
AND displays message "Verification link expired. Request a new one."
```

## Summary Checklist

When writing requirements:
- [ ] Use SHALL for binding requirements
- [ ] Include trigger clause (WHEN/IF/WHERE/WHILE)
- [ ] Write clear action and outcome
- [ ] Include at least one positive scenario
- [ ] Include error/edge case scenarios
- [ ] Use Given/When/Then format for scenarios
- [ ] Avoid implementation details
- [ ] Make requirements testable
