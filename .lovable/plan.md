# Animated Portfolio

## Goal
Build a single-page, dark navy portfolio for Preethi Awaradi that feels cinematic, interactive, and polished while keeping the supplied portrait unchanged.

## Experience
- Add a fast opening sequence with initials, glowing progress ring, particles, and a smooth reveal.
- Build a full-screen animated introduction with letter-by-letter name reveal, layered parallax, cyan glow, and the uploaded portrait.
- Add a compact scroll-aware navigation with active-section indicators and a lightweight mobile menu.
- Create animated sections for About, Skills, Cybersecurity, Hackathon, Business Symposium, VTU Habba, Interests, Journey, Contact, and Footer.
- Include a live network canvas, scan effects, glowing nodes, sequential terminal text, achievement particles, and a scroll-drawn journey line.
- Add a restrained desktop cursor, tactile buttons/cards, and smooth section continuity.

## Content approach
- Use the exact achievement and journey wording provided.
- Present skill and cybersecurity topics as educational interests, not unsupported proficiency claims.
- Use a simple contact form that opens the visitor's email app because no email service was requested.
- Use generic social/contact links until real profile URLs are provided.

## Performance and accessibility
- Prefer CSS transforms and opacity, with Intersection Observer for reveal timing.
- Use one lightweight canvas for ambient/network motion and pause expensive work when hidden.
- Reduce particles, parallax, and continuous effects on small screens.
- Respect reduced-motion preferences and maintain keyboard/focus accessibility.

## Technical details
- Keep the app as one TanStack Start page at `/`.
- Define the complete navy/cyan visual system in global semantic tokens.
- Store the uploaded portrait through the project asset flow and render it without cropping or image edits.
- Add route-specific title, description, Open Graph, and Twitter metadata.
- Verify desktop and mobile layouts, animation triggers, navigation, form behavior, and preview errors.
