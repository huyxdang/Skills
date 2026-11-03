---
name: principle-guard-the-context-window
description: "Apply when context is filling up: large outputs, long files, repeated reads, fan-out planning. Route bulk to subagents; keep summaries in the main thread, not raw payloads."
---

# Guard the Context Window

**Why:** Context overflow degrades reasoning quality, creates compression artifacts, and halts progress.

**Pattern:**
- **Size phases and cap scope.** Limit files per phase, set turn budgets, account for mechanism costs.

Use `../swarm/SKILL.md` for independent bulky reads when permitted. Keep evidence pointers and concise findings in the coordinator. Without collaboration, search and read bounded regions rather than flooding context. Do not create user-owned chats as a substitute for internal workers.
