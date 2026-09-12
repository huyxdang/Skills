# Trace forensics

Use this for a captured profile, trace, dump, or snapshot.

1. Record the artifact type, capture conditions, and time window.
2. Validate that the artifact is readable and relevant to the symptom.
3. Identify the dominant stacks, events, allocations, or waits.
4. Connect them to repository code and user-visible behavior.
5. Check one alternative interpretation of the same signal.
6. Report findings, confidence, and the next discriminating capture.

Do not implement a fix unless the user also requested one.
