---
name: local-ai-delegate
description: Delegate background prompts, quick code reviews, sub-tasks, or queries to the currently loaded local llama.cpp model via local HTTP / v1 completions API.
---

# Local AI Delegate (llama.cpp)

This skill enables the agent to offload sub-tasks, quick reasoning steps, code evaluations, or side prompts directly to the locally loaded `llama.cpp` model running on the host machine.

## llama.cpp Server Configuration

- **Provider**: `llamacpp`
- **Default Endpoint**: `http://localhost:8080/v1` (or `http://127.0.0.1:8080/v1`)
- **OpenAI Compatible Endpoint**: `http://localhost:8080/v1/chat/completions`

## How to Delegate to Local llama.cpp

### 1. Direct HTTP Query via PowerShell / Curl

When you want to run a quick background prompt or sub-task using the local llama.cpp model:

```powershell
$body = @{
    model = "default"
    messages = @(
        @{ role = "system"; content = "You are a helpful coding assistant running locally via llama.cpp." },
        @{ role = "user"; content = "Summarize the key changes or evaluate this snippet..." }
    )
    temperature = 0.2
} | ConvertTo-Json -Depth 5

Invoke-RestMethod -Uri "http://localhost:8080/v1/chat/completions" -Method Post -ContentType "application/json" -Body $body
```

### 2. Check Currently Loaded Model

To inspect which model is currently loaded in the local llama.cpp server:

```powershell
Invoke-RestMethod -Uri "http://localhost:8080/v1/models" -Method Get
```

### 3. Usage Guidelines

- Use `local-ai-delegate` for fast zero-cost local inference on scratchpads, intermediate code generation, linting, or offline tasks.
- Keep system prompts concise and structured to maximize throughput on local hardware.
- If the local llama.cpp server returns connection refused, ensure `llama-server` or `llama.cpp` is running on port 8080.
