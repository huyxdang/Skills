# Investigation

Use this for a read-only answer or recommendation.

1. State the question, scope, and decision the answer informs.
2. Inspect the exact artifact, configuration, history, or runtime in scope.
3. Separate observed facts, source-backed claims, and inference.
4. Test the cheapest uncertain claim when observation can settle it.
5. Check one plausible competing explanation.
6. Answer with the conclusion first, then the decisive evidence.

Do not mutate the target, open a pull request, or implement a fix unless the
user also asked for a change. Run tests only when they do not intentionally edit
source or committed artifacts. Isolate caches and logs when the tool permits it.
