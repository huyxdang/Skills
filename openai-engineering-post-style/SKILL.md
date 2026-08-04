---
name: openai-engineering-post-style
description: "Write or rewrite a technical company engineering post in the disciplined, systems-first pattern seen in OpenAI Engineering articles: a specific build-story title, a clear user or system problem, causal explanation of design choices, restrained technical detail, and concise consequences. Use this skill whenever the user asks for an engineering blog post, technical launch post, architecture write-up, postmortem-style explanation, or wants prose that feels like an OpenAI engineering article, even if they only provide notes, a PRD, an incident summary, or a systems diagram."
---

# OpenAI-style engineering post

Write a calm, technically credible engineering narrative. The reader should be able to follow why the
system had to change, what changed, and why the new design improves a concrete experience.

Capture the *editorial mechanics* of this style, not any source article's wording, facts, or claims. Do
not imply OpenAI authored, endorsed, or reviewed the draft.

## Use this skill for

- Engineering launch posts and architecture explainers.
- Technical retrospectives that explain a system redesign.
- Posts that introduce a capability through latency, reliability, scale, cost, or quality constraints.
- Rewrites of loose technical notes into clear narrative prose.

Do not use this style by default for a research paper, a visionary manifesto, product marketing copy,
release notes, or an academic benchmark report. Those need a different argument structure.

## Inputs to establish

Extract these from the user’s material before drafting:

- **Reader and setting:** Who needs to understand this, and what system or experience is at stake?
- **Central constraint:** What specifically failed, bottlenecked, or could not scale?
- **Design change:** What did the team build or change?
- **Mechanism:** Which technical details genuinely explain the result?
- **Evidence:** Measured results, production observations, tradeoffs, and limitations.
- **Scope:** Desired length, technical depth, links, diagrams, and whether a title is already fixed.

Never invent metrics, customer impact, implementation details, benchmarks, dates, or external citations.
If a key fact is absent, either write around it honestly or mark a narrow `[confirm: ...]` placeholder.
Ask a concise question only when the missing choice would materially change the story.

## Story architecture

Build the draft around one causal spine:

> user or system problem → constraint in the old design → architectural change → how it works → tradeoff handled → outcome

Before outlining, name the deeper bottleneck in one memorable sentence. This is the constraint beneath the
symptom: not simply what was slow, unreliable, or expensive, but what in the old model made that outcome
inevitable. For example: “The issue was not queue throughput; it was that batch work shared the
interactive path.” This gives the reader a durable mental model for every decision that follows.

Choose one before/after contrast to carry through the post. Use it in the opening, diagrams, deep dives,
and conclusion where useful:

> polling → streaming  
> shared worker pool → separate interactive path  
> stateless request → stateful session

The contrast should explain the system change, not decorate the prose. A reader should be able to repeat
it after finishing the article.

For a full-length post, use this shape:

1. **Title and opening:** Name the build, the technical object, the user-facing property, and optionally
   the time or scale constraint.
2. **Why the old model failed:** Explain the previous architecture in plain language, then name its
   limiting assumption.
3. **Core design:** Introduce the new system as a small number of separable decisions.
4. **Deep dives:** Give each important decision its own section. Explain the mechanism, the relevant
   tradeoff, and the consequence.
5. **Production reality:** Explain testing, rollout, failure modes, operational lessons, or limits when
   the source material supports them.
6. **End-to-end conclusion:** Reconnect the architecture to the original experience and state what the
   foundation now enables.

For a short post, compress this to opening → 2–3 design decisions → consequence. Do not fabricate
extra sections simply to resemble a longer article.

State the system's governing principle before implementation detail. A sentence such as “The system’s
primary job is to protect the interactive path” makes later choices feel like parts of one design rather
than a list of optimizations.

## Title rules

Prefer a specific, sentence-case title. Good title forms include:

- `How we built [system] for [user-facing outcome]`
- `How we made [capability] [measurable quality]`
- `Building [system] for [concrete constraint]`
- `[Outcome], from [layer] to [layer]` for a closing section, not usually the main title.

Titles should identify a real technical object and a real outcome. Avoid vague future-talk, superlatives,
question titles, clickbait, or stacked buzzwords. Add a time box only when it is meaningful evidence of
the engineering story.

## Heading rules

Use headings to describe system movement, not generic topical buckets. Prefer concise action-led forms:

- `Moving from polling to streaming`
- `Keeping state without blocking requests`
- `Starting sessions with fewer round trips`

Useful patterns include `-ing + object`, `X without Y`, `X from A to B`, and `X for Y`. A heading should
make the section's technical decision legible before the reader enters it.

## Paragraph and sentence rhythm

The rhythm should be controlled, not mechanically uniform.

- Most normal sections contain **3–5 paragraphs**. Use one paragraph for a transition only when it
  truly earns its brevity; allow a longer section when it contains several inseparable mechanisms.
- Most explanatory paragraphs are **2–4 sentences** and roughly **45–65 words**. Treat this as a
  useful range, not a quota.
- Use an occasional **12–25 word landing paragraph** after a dense explanation. It should state the
  user-visible or operational consequence in one clean thought.
- Keep most sentences around **12–23 words**. Mix a short orienting sentence with a more detailed
  technical sentence and a concise implication.
- Give each paragraph one job. Do not mix background, mechanism, evidence, and conclusion unless they
  form one causal unit.

A reliable paragraph sequence is:

1. State the constraint or claim.
2. Explain the mechanism or evidence.
3. State the tradeoff, result, or implication—including the new capability the decision makes possible.

Use short bridging sentences such as “This separation…”, “The remaining challenge…”, or “Together,
these changes…” only when they genuinely advance the logic. Do not repeat a formula visibly.

After every major design choice, answer both questions: **what changed inside the system, and what can
the user or operator now do reliably that was previously impossible, delayed, or fragile?** Architecture
becomes meaningful through the capability it unlocks.

## Voice and technical detail

- Write in a composed first-person plural voice when the author is the team: “we built,” “we found,”
  “we changed.” Use active verbs and attribute decisions to people or systems.
- Start with the experience or engineering constraint, then introduce terminology. Define a term through
  its role in the system rather than a detached glossary sentence.
- Prefer concrete causal language: `because`, `so`, `while`, `instead`, `as a result`, `which means`.
- Name tradeoffs plainly. Credibility comes from explaining what was hard, not from claiming novelty.
- Repeat a small set of true system motifs—such as `live path`, `context`, `session`, `latency`, or
  `handoff`—when they organize the article. Do not use synonym variation merely for variety.
- Use lists for genuinely parallel mechanisms or facts, not to avoid explaining an argument.
- Keep adjectives restrained. Let architecture, measured outcomes, and user consequences carry the
  force of the prose.

## Diagrams, metrics, and citations

Treat visuals as explanatory evidence. Add or recommend a simple before/after flow whenever concurrency,
delegation, state handoff, or a changed critical path is central to the story. The diagram should make an
argument the prose cannot make as quickly: what used to block, what now runs in parallel, or how context
moves. Do not use a diagram as decoration.

Introduce a metric by answering: what changed, what measurement captures it, and why that difference
matters. Do not insert a number without interpretation. Link or cite external work only when supplied
or when the user explicitly requests research; distinguish established facts from the team's inference.

## Drafting workflow

1. Identify the deeper bottleneck, the sustained before/after contrast, and the governing architectural
   principle.
2. Create a section outline that follows causal order. Remove any section that only repeats a claim.
3. Draft the opening as a mini-story: familiar problem, old limitation, new system, reader promise.
4. Draft deep dives as constraint → mechanism → capability consequence. Put the densest detail where the reader
   needs it to believe the claim, not in the opening.
5. Add a before/after diagram when it clarifies the central contrast more quickly than prose.
6. Add short landing paragraphs after dense sections when they clarify the benefit.
7. Close by restating the end-to-end capability and the new foundation it creates. Avoid a generic
   summary or an inflated “future of” conclusion.
8. Run the self-check below before returning the final draft.

## Self-check

- Does the title name both a technical object and a concrete outcome?
- Can a reader explain why the old design failed after the opening?
- Is the deeper bottleneck named, rather than only its visible symptom?
- Does one before/after contrast organize the article from opening through conclusion?
- Is the governing system principle stated before the implementation details?
- Does every heading signal a distinct architectural move or question?
- Does each paragraph have one clear job and a visible causal link to the next?
- Does every major design choice state the capability it unlocks?
- Are technical terms introduced at the moment they become useful?
- Are metrics, production claims, and references all supplied or clearly marked for confirmation?
- Are tradeoffs and limitations represented where the source material supports them?
- Does any diagram prove the system change rather than merely decorate the post?
- Does the ending reconnect the implementation to the original user experience?

## Response format

Return the finished article in Markdown unless the user requests another format. Include a brief
`Open questions` list only for facts that need confirmation; omit it when the supplied material is
complete. Do not append a style analysis, word-count report, or explanation of this skill unless asked.
