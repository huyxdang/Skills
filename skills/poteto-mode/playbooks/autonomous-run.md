# Autonomous run

1. Convert the request into one observable completion predicate.
2. Record scope, allowed effects, stop conditions, and user gates.
3. Break the work into verifiable units with a decision log.
4. Keep shared mutable state with one owner.
5. After each unit, run its proof and update the remaining plan.
6. Continue through reversible in-scope work without waiting for reassurance.
7. Pause for required permission, an irreversible action, or a true product choice.
8. Finish only when the predicate is observed against the real artifact.
