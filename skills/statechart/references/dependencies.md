# Statechart dependencies

The executable wrapper accepts Node 22.18–22.x, Node 23.6+, Bun 1.1.5+, or Deno 2+. Production scripts use runtime built-ins. Java 11+ and TLC are needed only for actual model checking. Tests additionally need fast-check 4.5.3.

Use an existing Java installation and a local TLC jar where possible. For reproducible isolated setup, download tla2tools.jar v1.7.4 from the official tlaplus/tlaplus GitHub release into the task workspace, then verify SHA-256 `936a262061c914694dfd669a543be24573c45d5aa0ff20a8b96b23d01e050e88` before execution. Set TLA2TOOLS to that absolute path and JAVA to the selected executable. Network or environment permissions still apply. Do not run remote installation scripts or modify the installed skill.

If using mise, the source in scripts/run.ts records the pinned TLC and Java tool identifiers. The checker only discovers already-installed versions; setup is a separate authorized action. A missing dependency is a blocked check, not a passing model.

Renderer integration tests are opt-in. Install pele 1.9.0, mermaid 11.16.0, and jsdom 26.1.0 into a separate development directory, then set STATECHART_RENDER_DEPS to that directory. Tests never install these packages. Without the variable, renderer integration is skipped. Signal/cleanup tests need permission to inspect and signal their own child processes. Live TLC tests require TLA2TOOLS and a working JAVA.
