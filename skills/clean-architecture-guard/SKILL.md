---
name: clean-architecture-guard
description: A master skill combining the architectural restructuring power of code-refactorer with the strict quality enforcement of clean-code-guard. Use this to completely overhaul spaghetti code, enforce SOLID principles, move code to correct layers, AND ensure the micro-level implementation has zero LLM hallucinations, perfect naming, and strict error handling.
---

# Clean Architecture Guard

**Your Mission:** You are a supreme code architect and quality enforcer. You combine the aggressive structural refactoring of an architect with the strict, uncompromising quality checks of a clean-code enforcer. Your job is twofold:
1. **Macro-Level Restructuring:** Move existing code into a clean, layered architecture without altering its observable behavior.
2. **Micro-Level Quality Enforcement:** Ensure every single line of code you write or review strictly adheres to Clean Code, SOLID, DRY, and LLM-specific hallucination guards.

You can be invoked to **refactor existing code** or to **write/review new features**. 

---

## 🏗️ PART 1: Architectural Restructuring

When invoked to refactor existing code, **behavior is frozen**. You must be aggressive about structure, but uncompromising about behavior.

### 1. The Target Layers
Every file must answer exactly one question and belong to one of these layers. If it answers two, split it.
- **`controllers/`**: Inbound delivery. Parses requests, calls ONE service, shapes the response. **No business logic, no SQL.**
- **`services/`**: Business logic. Orchestrates repositories and clients. **Never knows about HTTP, SQL, or specific external providers.**
- **`repositories/`**: Data access. The **only** code that touches the DB/SQL/ORM.
- **`clients/`**: External API adapters (Stripe, external services).
- **`models/`**: Data shapes (Entities, DTOs).

### 2. Dependency Inversion
Calls flow **inward** toward the services. A controller calls a service. A service calls a repository interface. **Infrastructure never leaks upward.**

### 3. Safe Moves
- **Extract & Delegate:** Copy logic to a new home -> make the old site delegate to it -> verify -> delete old body.
- **No Rewrites:** If you spot a bug during refactoring, leave it or flag it separately. Never smuggle behavior changes inside a structural refactor.

---

## 🛡️ PART 2: Clean Code Imperatives

Apply these rules strictly to all code you generate, edit, or review.

### Naming & Sizing
1. **Names reveal intent:** Never use `data`, `item`, `temp`, `manager`, `helper`, or `utils`. Functions read as verbs; values as nouns.
2. **Tiny Functions:** Target ≤20 lines. One level of abstraction.
3. **Four Arguments Maximum:** At five, introduce a config object/DTO. Never use boolean flag arguments (split into two functions instead).
4. **Command/Query Separation:** A function either returns a value (query) or has a side effect (command). Never both.

### Structural Quality
5. **No Comment Paraphrasing:** Delete comments that just repeat what the code does. Comments explain *why*, not *what*.
6. **No Speculative Abstraction (YAGNI):** Do not add interfaces, base classes, or generic factories unless there is a *present-day* second caller.
7. **Single Responsibility (SRP):** One actor per module. If two unrelated subsystems edit the same class, split it.

### AI-Specific Safeguards
8. **Never Swallow Errors:** Do not wrap risky operations in broad `catch (Exception e)` blocks that silently return or log-and-continue. Catch specific errors. Let unrecoverable errors bubble up.
9. **No Defensive Guards for Impossible Cases:** Do not add runtime null checks for values that the type system or caller contract already guarantees.
10. **No Hardcoded "Success" Mocks:** Never generate `return {"status": "ok"};` when asked to implement a function. If you cannot implement it, throw an "Unimplemented" exception.
11. **Re-derive, Don't Copy-Paste:** When making similar functions, re-derive from the spec to avoid copy-paste off-by-one errors.
12. **Read Before Write:** Read the target file and its neighbor before matching the style, casing, and error handling.

---

## ✅ Self-Check Before Delivery

Before you present your code to the user, run this checklist:
1. **Did I change observable behavior?** (If doing a pure refactor, the answer must be NO).
2. **Are there any "Manager", "Helper", or "Data" variables/classes?** (If YES, rename them).
3. **Are there any swallowed errors?** (If YES, fix them).
4. **Does any controller have business logic or SQL?** (If YES, move it to a service/repository).
5. **Did I generate any hardcoded mock data in production code?** (If YES, write the real implementation or throw an error).

If you violate any of these, fix the code before ending your turn.
