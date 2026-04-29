# SP Automotive — Copy Options

Pick one variant per section by marking with **✅**. I'll lock the picks into the codebase in the same task.

The three voice columns are intentionally distinct so the difference is real:

- **Voice A — Declarative (current):** Anaphora, terse, line-break-heavy. Premium-magazine feel. ("Every flaw — found.")
- **Voice B — Technical:** Specific vocabulary an exotic owner would use. Numbers, materials, procedures. ("Carbon-tub safety. ADAS recalibration. Factory-correct.")
- **Voice C — Owner-emotional:** Speaks to the owner who just crashed their dream. Warmer, present-tense, second person. ("You called. We're already on it.")

You can also mix — pick Voice A for the hero, Voice C for the About strip, etc.

---

## 1. Tagline

A two- or three-word lockup that goes in the metadata description, possibly above the FinalCTA, and possibly under the logo in the footer.

| | Option |
|---|---|
| ☐ | **A1.** Built where it broke. |
| ☐ | **A2.** Factory-correct. Owner-obsessed. |
| ☐ | **A3.** Where exotics come home. |
| ☐ | **A4.** Sarasota's exotic body shop. *(more literal — better for SEO, less premium)* |
| ☐ | **A5.** Restored to spec. Returned to you. |

---

## 2. Hero beats (the 6 lines that fade in over the scroll)

Current beats are Voice A. The B/C columns rewrite each beat in the alternate voice. Pick a row, OR pick a single voice column and apply across all 6.

| Beat | Voice A — Declarative (current) | Voice B — Technical | Voice C — Owner-emotional |
|---|---|---|---|
| **0** | It happens to the best of us. | 200 mph cars find walls. | You weren't expecting this call. |
| **1** | Then it comes to us. | Then it comes to Sarasota. | Now it comes to us. |
| **2** | Every flaw — found. | Forensic intake. Documented. | We see what insurance misses. |
| **3** | Every detail — restored. | Factory-correct repair. | We rebuild it the way it left the factory. |
| **4** | Every panel — perfect. | Torque-spec. Gap-measured. | Right down to the gap between the doors. |
| **5** | Welcome home. | Returned to spec. | Welcome home. |

**My pick:**
- ☐ All Voice A (keep current)
- ☐ All Voice B
- ☐ All Voice C
- ☐ Custom mix (note row picks below):

---

## 3. Final CTA section (the section above the footer)

Currently:
- Eyebrow: *"Got photos of the damage?"*
- Headline: *"Send them. We'll tell you what it'll take."*
- Footer: *"Or text photos to the same number."*

| | Variant |
|---|---|
| ☐ | **C1 — Current.** Eyebrow: "Got photos of the damage?" / Headline: "Send them. We'll tell you what it'll take." / Footer: "Or text photos to the same number." |
| ☐ | **C2 — Direct.** Eyebrow: "Tell us what happened." / Headline: "We'll handle the rest." / Footer: "Photos by text. Estimate by phone. Insurance by us." |
| ☐ | **C3 — Owner.** Eyebrow: "Your car deserves better than the dealer's body shop." / Headline: "Bring it home." / Footer: "Call Serge. Text photos to the same number." |
| ☐ | **C4 — Numbers.** Eyebrow: "One call. One shop. One signature on the work." / Headline: "Serge picks up the phone." / Footer: "Or text photos. He'll text you back." |

---

## 4. About strip (the strip on the home page that links to /about)

Currently: *"Built by Serge in Sarasota. After years restoring exotics for private collectors, Serge opened SP Automotive to bring factory-grade collision repair to the cars most shops won't touch. Lamborghinis, McLarens, Audi R8s, BMW M-series. If it costs more than a house, it belongs here."*

| | Variant |
|---|---|
| ☐ | **D1 — Current.** As above. |
| ☐ | **D2 — Owner-letter.** "If your car is worth more than most houses, the dealer's body shop is not the answer. Serge built SP Automotive in Sarasota for the cars they won't touch — Lamborghinis, McLarens, R8s, M-series. Forensic intake, factory-spec repair, one signature on the work: his." |
| ☐ | **D3 — Tight.** "Serge built SP Automotive in Sarasota for the exotics most shops won't touch. Lamborghinis. McLarens. Audi R8s. BMW M. One owner. One signature on every job." |

---

## 5. About page bio — voice direction

Pick the framing first. I'll then expand to a full 4-6 paragraph bio (~600-800 words) in your chosen voice. You'll edit before lock.

| | Framing | Sample opener |
|---|---|---|
| ☐ | **E1 — Founder story (chronological).** Traces the path: cars in his blood → years of private restoration → why he opened SP. | *"Serge has been around exotic cars for as long as he can remember. The first time he held a torque wrench, it was on a Ferrari Testarossa in his uncle's garage…"* |
| ☐ | **E2 — Craft obsession.** Opens on a single moment of obsession (e.g., matching tri-coat paint at midnight). The bio is a portrait of how he works, not a timeline. | *"At 11 PM on a Tuesday, Serge is still in the booth. He's mixing tri-coat for a Huracán Performante — a color that takes three layers to look right under Sarasota sun. He'll mix it four more times tonight before he calls it."* |
| ☐ | **E3 — Owner letter.** Bio is written in second person to the owner who just crashed. Less about Serge's history, more about what the owner is about to experience. | *"Your insurance company is going to push you toward the cheapest shop on their list. We're not on that list. Here's what's different about how this works…"* |

---

## What I need from you

Mark **one ✅ per section** above (or note custom edits inline). When you reply, I'll:

1. Lock the tagline into `lib/site.ts` and `app/layout.tsx` metadata.
2. Update hero beat copy in `components/hero/HeroBeats.tsx`.
3. Update FinalCTA in `components/cta/FinalCTA.tsx`.
4. Update AboutStrip in `components/about/AboutStrip.tsx`.
5. Use the chosen About bio framing as the brief when I draft the long-form bio in Task 4.

After this, we move to **Task 2: Process scroll narrative**.
