---
name: prompt-engineer
description: >-
  Craft, iterate, and optimize LLM prompts using structured templates, evaluation criteria,
  and proven techniques. Use when the user asks to 'write a prompt', 'improve this prompt',
  'make this prompt better', 'optimize for GPT/Claude/Gemini', 'create a system prompt',
  'write instructions for an AI', or 'prompt engineer this'. Covers zero-shot, few-shot,
  chain-of-thought, role-based, and structured output prompting. Enforces clarity,
  specificity, constraint definition, output format specification, and edge case handling.
  DO NOT USE for code review, test review, or tasks that don't involve writing prompts
  for language models.
---

# Prompt Engineer

Craft, iterate, and optimize prompts for large language models using proven techniques and structured methodology.

## When to Activate

- When the user asks to write, improve, or debug a prompt
- When creating system prompts for AI agents or chatbots
- When optimizing prompts for specific models (GPT, Claude, Gemini)
- When building prompt templates for repeated use

## Prompting Techniques

### 1. Role-Based Prompting
Assign a clear identity and expertise level:
```
You are a senior security engineer with 15 years of experience in
web application security. You specialize in OWASP Top 10 vulnerabilities.
```

### 2. Structured Output
Always specify the exact output format:
```
Respond in the following JSON format:
{
  "severity": "critical|high|medium|low",
  "finding": "description of the issue",
  "remediation": "how to fix it"
}
```

### 3. Few-Shot Examples
Provide 2-3 input/output examples to calibrate behavior:
```
Example 1:
Input: "SELECT * FROM users WHERE id = " + userId
Output: { "severity": "critical", "finding": "SQL injection via string concatenation", ... }

Example 2:
Input: db.query("SELECT * FROM users WHERE id = $1", [userId])
Output: { "severity": "none", "finding": "Parameterized query, no injection risk", ... }
```

### 4. Chain-of-Thought
For complex reasoning, request step-by-step thinking:
```
Think through this step by step:
1. First, identify the input types
2. Then, trace the data flow
3. Finally, determine if any input reaches a sink without sanitization
```

### 5. Constraint Definition
Set explicit boundaries:
```
Rules:
- Do NOT hallucinate functions that don't exist in the codebase
- Do NOT suggest deprecated APIs
- If uncertain, say "I'm not sure" rather than guessing
- Limit your response to 500 words maximum
```

## Prompt Quality Checklist

### Clarity
- [ ] **Single, clear objective** — The prompt asks for exactly one thing
- [ ] **No ambiguity** — Key terms are defined or exemplified
- [ ] **Explicit output format** — The expected response structure is specified

### Specificity
- [ ] **Context provided** — Background information included
- [ ] **Constraints defined** — What to do AND what NOT to do
- [ ] **Edge cases addressed** — How to handle unusual inputs

### Effectiveness
- [ ] **Appropriate technique** — Right prompting method for the task
- [ ] **Model-appropriate** — Prompt suited to the target model's strengths
- [ ] **Testable output** — The response can be evaluated for correctness

## Prompt Structure Template

```markdown
## Role
[Who is the AI in this context?]

## Context
[What background information does the AI need?]

## Task
[What exactly should the AI do?]

## Constraints
[What rules must the AI follow?]

## Output Format
[How should the response be structured?]

## Examples (optional)
[Input/output pairs to calibrate behavior]
```

## Anti-Patterns to Flag

- ❌ **Vague instructions** — "Make it better" → Specify what "better" means
- ❌ **No output format** — Leads to unpredictable response shapes
- ❌ **Contradictory constraints** — "Be concise but explain everything in detail"
- ❌ **Assuming model knowledge** — Don't assume the model knows your codebase
- ❌ **No error handling** — Not telling the model what to do when uncertain
- ❌ **Prompt injection vulnerable** — User input embedded without delimiters

## Optimization Workflow

1. **Draft** — Write the initial prompt using the template above
2. **Test** — Run against 5+ diverse inputs
3. **Evaluate** — Score outputs on accuracy, format, and edge cases
4. **Iterate** — Refine constraints and examples based on failures
5. **Freeze** — Lock the prompt version once quality threshold is met
