---
name: loop
description: Unified Loop Hub for running autonomous interval executions or goal-driven metric audits.
---

# Unified Loop Hub

The `loop` skill provides unified loop management for both autonomous interval executions and goal-audited cycles.

## Modes

1. **Time Mode (`time`)**:
   Runs continuous execution at regular time intervals.
   - Example: `/loop time 5m Audit repo for uncommitted changes`

2. **Metric Mode (`metric`)**:
   Runs goal-driven audit loops checking command outputs until objectives are met.
   - Example: `/loop metric "grep -c TODO" Fix all remaining TODO items in src/`
