# Shipping

1. Resolve the exact pull request or ordered stack and capture each head revision.
2. Resolve whether the user authorized landing. Without that authority, prepare a
   shipping verdict and stop before the merge action.
3. Independently review each diff against its base and stated outcome.
4. Verify required checks, unresolved threads, conflicts, and dependency order.
5. Run the highest-value local or live check not covered by CI.
6. Re-read remote state and confirm the reviewed revisions are still current.
7. Land only the contiguous verified sequence from the root upward.
8. Verify the resulting remote state after the authorized action.

A green check set is evidence. It is not by itself a shipping verdict.
