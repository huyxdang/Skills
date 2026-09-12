# Runtime forensics

Use this to diagnose a live symptom without implementing a repair.

1. Define the symptom, trigger, environment, and observation window.
2. Capture low-overhead process, resource, log, or request evidence.
3. Correlate the symptom with one concrete runtime event.
4. Narrow the path with targeted instrumentation.
5. Test at least one competing cause.
6. Report the causal chain, confidence, and missing evidence.

Preserve the runtime. Remove temporary instrumentation when it changes behavior.
