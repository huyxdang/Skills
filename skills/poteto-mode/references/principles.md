# Decision principles

Read the named principle skill when it is available. The rule below remains the
portable contract when it is not.

- Laziness Protocol. Delete or inline before adding an abstraction.
- Foundational Thinking. Choose the core data shape and ownership before logic.
- Redesign from First Principles. Make the new requirement native to the design.
- Subtract Before You Add. Remove obsolete paths before building the replacement.
- Minimize Reader Load. Reduce indirection, hidden state, and mutable scope.
- Outcome-Oriented Execution. Converge on the target architecture without a
  temporary compatibility layer.
- Experience First. Optimize the user-visible result before implementation ease.
- Exhaust the Design Space. Compare credible designs when no precedent decides.
- Build the Lever. Create a repeatable script or check for nontrivial work.
- Model the Domain. Encode states and transitions in a structure, not scattered
  conditionals.
- Boundary Discipline. Parse and validate external values at system edges.
- Type System Discipline. Make invalid states difficult to construct.
- Make Operations Idempotent. Retries must converge on the same result.
- Migrate Callers Then Delete Legacy APIs. Complete both in one change.
- Separate Before Serializing Shared State. Give concurrent actors disjoint state.
- Prove It Works. Verify the real artifact or user flow.
- Fix Root Causes. Reproduce and trace before changing code.
- Sequence Verifiable Units. End each unit with a meaningful check.
- Guard the Context Window. Delegate bulky independent evidence gathering.
- Never Block on the Human. Continue reversible work when observation can decide.
- Encode Lessons in Structure. Turn repeated instructions into checks or types.
