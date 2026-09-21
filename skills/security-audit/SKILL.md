---
name: security-audit
description: >-
  Scan code for common security vulnerabilities before it ships — injection flaws, hardcoded
  secrets, insecure dependencies, broken auth, and misconfigurations. Best used after an
  agent writes or modifies code that handles user input, authentication, file I/O, database
  queries, API calls, or cryptography. Use on 'audit this for security', 'is this safe',
  'check for vulnerabilities', 'review security', or after tasks like 'add login',
  'process payment', 'handle file upload', 'connect to database'. Covers OWASP Top 10,
  CWE Top 25, secret detection, dependency analysis, and secure coding patterns.
  DO NOT USE for code quality/style review (use clean-architecture-guard), test review
  (use test-guard), or API design review (use api-design-guard).
---

# Security Audit

Scan code for security vulnerabilities using OWASP Top 10, CWE Top 25, and secure coding best practices.

## When to Activate

- After writing code that handles user input, auth, or sensitive data
- When the user asks to audit, review, or check security
- Before deploying to production
- When reviewing third-party integrations or dependencies

## Vulnerability Categories

### 1. Injection (CWE-89, CWE-79, CWE-78)

**SQL Injection**
```python
# ❌ VULNERABLE
query = f"SELECT * FROM users WHERE id = {user_id}"

# ✅ SAFE — parameterized query
cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))
```

**XSS (Cross-Site Scripting)**
```javascript
// ❌ VULNERABLE
element.innerHTML = userInput;

// ✅ SAFE — use textContent or sanitize
element.textContent = userInput;
```

**Command Injection**
```python
# ❌ VULNERABLE
os.system(f"ping {user_host}")

# ✅ SAFE — use subprocess with list args
subprocess.run(["ping", user_host], capture_output=True)
```

### 2. Broken Authentication (CWE-287)
- [ ] Passwords hashed with bcrypt/argon2 (not MD5/SHA1)
- [ ] Session tokens are cryptographically random
- [ ] Session expiration is enforced
- [ ] Multi-factor authentication for sensitive operations
- [ ] Account lockout after failed attempts
- [ ] Credential stuffing protection

### 3. Sensitive Data Exposure (CWE-200)
- [ ] No secrets in source code (API keys, passwords, tokens)
- [ ] Secrets loaded from environment variables or vaults
- [ ] Sensitive data encrypted at rest and in transit
- [ ] PII logging is disabled
- [ ] Error messages don't leak internal details

### 4. Insecure Dependencies (CWE-1104)
- [ ] No known CVEs in dependencies
- [ ] Dependencies pinned to specific versions
- [ ] Dependency audit tools configured (npm audit, pip-audit, etc.)
- [ ] Unused dependencies removed

### 5. Security Misconfiguration (CWE-16)
- [ ] Debug mode disabled in production
- [ ] Default credentials changed
- [ ] CORS configured to specific origins (not `*`)
- [ ] Security headers set (CSP, HSTS, X-Frame-Options)
- [ ] Directory listing disabled

### 6. Insecure Deserialization (CWE-502)
```python
# ❌ VULNERABLE — arbitrary code execution
data = pickle.loads(user_input)

# ✅ SAFE — use JSON for untrusted data
data = json.loads(user_input)
```

### 7. Path Traversal (CWE-22)
```python
# ❌ VULNERABLE
file_path = f"/uploads/{user_filename}"

# ✅ SAFE — validate and resolve
safe_path = Path("/uploads").resolve() / Path(user_filename).name
if not str(safe_path).startswith(str(Path("/uploads").resolve())):
    raise ValueError("Path traversal detected")
```

## Secret Detection Patterns

Scan for these patterns in code and config files:

| Pattern | Example |
|---|---|
| AWS Keys | `AKIA[0-9A-Z]{16}` |
| GitHub Tokens | `ghp_[a-zA-Z0-9]{36}` |
| Generic API Keys | `api[_-]?key.*=.*[a-zA-Z0-9]{20,}` |
| Private Keys | `-----BEGIN (RSA\|EC\|DSA) PRIVATE KEY-----` |
| Database URLs | `(mysql\|postgres\|mongodb)://.*:.*@` |
| JWT Tokens | `eyJ[a-zA-Z0-9_-]*\.eyJ[a-zA-Z0-9_-]*\.[a-zA-Z0-9_-]*` |

## Review Output Format

For each finding:
1. **🔴 CRITICAL** / **🟠 HIGH** / **🟡 MEDIUM** / **🔵 LOW** severity
2. **CWE ID** and vulnerability type
3. **Location** — file path and line number
4. **Evidence** — the vulnerable code snippet
5. **Remediation** — specific fix with code example
6. **Reference** — link to OWASP/CWE documentation

## Audit Summary Template

```markdown
## Security Audit Summary

**Files Scanned**: X
**Findings**: X critical, X high, X medium, X low

### Critical Findings
1. [CWE-89] SQL Injection in `auth/login.py:42`

### Recommendations
1. Implement parameterized queries throughout
2. Add Content-Security-Policy header
3. Rotate exposed API key in `.env.example`
```
