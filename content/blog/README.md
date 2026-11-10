# HandyHub blog archive

Local markdown posts for truckeemeadowshandyman. Not yet wired into a route —
the app has no `/blog` page, so these are source content only.

## Format

YAML frontmatter, then body:

- `title`, `slug`, `publish_date` (YYYY-MM-DD), `category` (one of the six site
  services), `services` (array), `read_time`, `seo_description`
- `week` is the editorial sequence number, not the calendar week. It is
  non-monotonic with `publish_date` (e.g. week 5 publishes 2026-11-10 while
  week 1 also publishes that date), so order by `publish_date` when rendering.

## Conventions used throughout

- Every post ends with a priced job table or checklist, a `tel:` call, and a
  **This week's recommendation** line so the CTA is always bookable.
- Prices are Truckee Meadows ranges, quoted as ranges, never single numbers.
- Code citations name the section (NEC 210.8, etc.) rather than a generic claim.
- Phone number must match `src/components/Footer.tsx` (currently (555) 123-4567).

## Four-week set

| Week of | Post | Category |
| --- | --- | --- |
| 2026-11-10 | Furniture Anchoring and Safe Assembly | Assembly |
| 2026-11-03 | Exterior Door Weatherstripping and Sweeps | Doors |
| 2026-10-27 | GFCI Protection: Bathroom, Kitchen, Garage | Electrical |
| 2026-10-20 | Five Flooring Mistakes After the First Winter | Flooring |
