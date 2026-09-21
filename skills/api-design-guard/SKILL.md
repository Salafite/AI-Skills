---
name: api-design-guard
description: >-
  Review REST and GraphQL API designs for consistency, naming conventions, versioning,
  error handling, pagination, and security before they ship. Best used after an agent
  designs API endpoints, writes OpenAPI specs, creates route handlers, or defines GraphQL
  schemas. Use on 'review this API', 'is this endpoint design correct', 'check my REST
  routes', or after tasks like 'create an API', 'add an endpoint', 'design a webhook'.
  Enforces RESTful resource naming, proper HTTP methods and status codes, consistent error
  response format, pagination patterns, API versioning, rate limiting headers, and
  authentication/authorization design. DO NOT USE for implementation code review (use
  clean-architecture-guard), database schema review, UI/frontend review, or test review
  (use test-guard).
---

# API Design Guard

Review API designs for best practices, consistency, and production readiness.

## When to Activate

- After designing REST endpoints or GraphQL schemas
- When reviewing OpenAPI/Swagger specifications
- When the user asks to review, audit, or improve API design
- Before shipping new API versions or breaking changes

## REST API Rules

### Resource Naming
1. **Use nouns, not verbs** — `/users` not `/getUsers`
2. **Plural resource names** — `/users` not `/user`
3. **Lowercase with hyphens** — `/user-profiles` not `/userProfiles` or `/user_profiles`
4. **Nested resources for relationships** — `/users/{id}/orders` not `/getUserOrders`
5. **Max 3 levels of nesting** — deeper nesting suggests a design problem

### HTTP Methods
| Method | Purpose | Idempotent | Request Body |
|---|---|---|---|
| `GET` | Retrieve resource(s) | ✅ | ❌ Never |
| `POST` | Create a resource | ❌ | ✅ Required |
| `PUT` | Full replacement | ✅ | ✅ Required |
| `PATCH` | Partial update | ❌ | ✅ Required |
| `DELETE` | Remove a resource | ✅ | ❌ Rarely |

### Status Codes
| Range | Meaning | Common Codes |
|---|---|---|
| `2xx` | Success | `200 OK`, `201 Created`, `204 No Content` |
| `3xx` | Redirect | `301`, `304 Not Modified` |
| `4xx` | Client error | `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`, `409 Conflict`, `422 Unprocessable Entity`, `429 Too Many Requests` |
| `5xx` | Server error | `500 Internal Server Error`, `503 Service Unavailable` |

### Error Response Format
All errors MUST return a consistent JSON structure:
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Human-readable description",
    "details": [
      { "field": "email", "message": "must be a valid email address" }
    ]
  }
}
```

### Pagination
- Use cursor-based pagination for large datasets
- Include `next`, `previous`, `total` in response metadata
- Accept `limit` and `cursor` (or `page`) query parameters
- Set sensible defaults and max limits

### Versioning
- **URL versioning** preferred for simplicity: `/api/v1/users`
- Document breaking vs non-breaking changes
- Maintain backward compatibility within a major version

### Security Checklist
- [ ] Authentication required on protected endpoints
- [ ] Authorization checks (role/permission-based)
- [ ] Rate limiting with `X-RateLimit-*` headers
- [ ] Input validation and sanitization
- [ ] No sensitive data in URLs (use request body or headers)
- [ ] CORS configured appropriately
- [ ] Request size limits enforced

## GraphQL Rules

1. **Descriptive type and field names** — `UserConnection` not `Data`
2. **Use `input` types for mutations** — not inline arguments
3. **Consistent pagination** — Relay-style `Connection` pattern
4. **Meaningful error types** — not generic error strings
5. **Depth and complexity limits** — prevent abuse

## Anti-Patterns to Flag

- ❌ `POST /getUser` — verb in URL + wrong method
- ❌ `200 OK` with error message in body — use proper status codes
- ❌ Different error formats across endpoints — inconsistent
- ❌ Returning `500` for validation errors — use `400`/`422`
- ❌ No pagination on list endpoints — will fail at scale
- ❌ Sensitive data in query params — appears in logs

## Review Output Format

For each endpoint/schema reviewed:
1. **✅ PASS** or **⚠️ WARNING** or **❌ FAIL** with specific violations
2. Corrected design if FAIL
3. Brief justification referencing the specific rule
