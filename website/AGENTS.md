# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## LAMURA visual direction
Use selected option 1: immersive forest hero and warm ivory editorial story. Original brand photographs must be used instead of generated clothing imagery. Italian and English copy only, readable typography, restrained fluid motion, reduced-motion support. Reference: /Users/claudiojin/.codex/generated_images/01a08b70-8ab5-7680-86ac-565c446ad4a8/exec-da8cc330-60ec-438d-8631-0876e2c61341.png

User refinement: the primary palette must be black, white and gray, with an understated 雅素 style. Remove cream and green interface colors. Keep original photography in natural color. 雅素 refers to restrained layout, typography, whitespace, and black/white/gray UI, not grayscale photography. Never desaturate the images to interpret this preference. Keep typography, whitespace and motion restrained.

Official logo: public/brand/lamura-logo.svg is extracted from the outlined artwork in the supplied LAMURA LOGO.pdf. Use the exact vector for all brand wordmarks; do not typeset substitutes, stretch the logo or alter its spacing. White reversal is allowed on dark backgrounds.

Language policy: Italian is the default; offer Italian/English switching only. Localize editorial copy naturally for each audience rather than literally translating Chinese. Translate all navigation, buttons, captions, accessibility labels and metadata. Preserve official logo geometry.

Site architecture: exactly two pages. / shows brand and product photography, materials and collection. /about shows company story and the Contact Us section at /about#contact. Shared header, IT/EN switch, official logo and storefront-sketch footer.

Photography: avoid repeating photos across editorial sections and pages, and avoid near-identical burst shots. Forest black/white photos belong to the hero only; gallery uses 1789043124001, mmexport1789042696771, mmexport1789042732103. Modal zoom repeats its corresponding gallery photo intentionally; logo and storefront sketch remain shared site identity.

Navigation has exactly two page links: Collezione / Collection and Chi siamo / About us. Do not add a separate Contatti / Contact navigation item; contact details remain within About Us.
