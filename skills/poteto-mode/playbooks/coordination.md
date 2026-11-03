# Coordinate a project or several pull requests

Use for explicit standing coordination, independent PR delivery, or an ordered PR stack.

1. Record the outcome, workstreams, dependencies, revision baselines, authorized external effects, and stop conditions.
2. Give each workstream one owner and a separate checkout or disjoint files. Use `../swarm/SKILL.md` relative to the skill root for bounded parallel work; serialize shared Git operations and live UI driving.
3. For independent PRs, verify each head independently. For a stack, preserve base order and reverify affected descendants after a parent changes.
4. Keep a compact durable handoff with each workstream's state, evidence, head revision, pending actions, and next check. Reuse actual task state rather than inventing a coordinator daemon.
5. Use the host's chat tools for user-requested chat management. Create user-owned chats only when explicitly requested; use subagents for internal slices.
6. Continue active authorized work. Schedule future wakeups or monitoring only when the user requests them, using the available automation tools. Notify on meaningful changes, not unchanged polls.
7. Follow `playbooks/babysit.md` for readiness and `playbooks/shipping.md` for authorized landing. Never infer merge authorization from a request to build a stack.
8. Stop at the verified outcome, an explicit budget limit, or a genuine dependency on user input. Report incomplete work truthfully and preserve a resumable handoff.
