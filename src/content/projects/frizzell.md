---
title: "Rebuilding Frizzell's website and online shop"
cardTitle: 'Frizzell Agricultural Electronics — website & online shop'
summary: >-
  A full redesign and rebuild, from new brand colours to the WooCommerce checkout. As the
  only IT person, I also ran the requirements, timeline and progress updates with the General
  Manager.
category: 'Client work'
tags: ['WordPress', 'WooCommerce', 'Elementor Pro']
featured: true
order: 1
# [TODO: cover screenshot — new Frizzell homepage (desktop + phone). Needs company permission.
#  Used on the home page card and as the case study hero.]
# cover: ../../assets/projects/frizzell-home.jpg
# coverAlt: '...'
hasCaseStudy: true
highlights:
  - '16 pages redesigned and rebuilt in a new brand palette'
  - 'Products organised by industry and by solution'
  - 'Safe staging workflow, page caching and server tuning'

# Case study
intro: >-
  A full redesign and rebuild for Frizzell Agricultural Electronics, a family-run NZ company
  selling weighing, solar water and monitoring products to farmers.
role: 'Sole web developer (internship)'
timeline: 'Aug – Nov 2026'
tools: ['WordPress', 'WooCommerce', 'Elementor Pro']
status: 'On staging, team review'
decisions:
  - title: 'Elementor instead of the old theme'
    text: 'A live visual editor, built-in gradients and hover colours, and precise layout control — far less custom CSS, and easier for the team to update later.'
  - title: 'Organise by industry and solution'
    text: 'Farmers can start from their type of farm (5 industry pages) or from the problem they need solved (5 solution pages).'
  - title: 'A palette from the real logo'
    text: "I sampled the logo's orange and blue, toned them down for screens, and the owners approved the new palette."
  - title: 'Build on staging, not the live site'
    text: 'All work happened on a separate copy with its own database, so customers were never affected while I built.'
# [TODO: before/after screenshots — old vs new homepage. Needs company permission.
#  Add `before:` and `after:` image paths below; placeholders show until then.]
beforeAfter:
  beforeAlt: 'The old Frizzell homepage'
  afterAlt: 'The new Frizzell homepage'
results:
  - number: '16'
    label: 'pages redesigned and rebuilt'
  - number: '5 + 5'
    label: 'industry and solution pages'
  - number: '[x → y]'
    label: '[TODO: page speed score, before → after]'
---

## The problem

The old site was built on an older theme with no live visual editor, so even small design changes meant writing custom code. The company needed a modern site that shows its products by industry and by solution, and an online shop that works smoothly.

[TODO: add one or two sentences in your own words — what wasn't working for customers or the team?]

## What I did

I was the only IT person, so the job covered much more than code:

- Gathered requirements and turned feedback from a non-technical team into clear tasks
- Designed page mockups, then built every page in WordPress
- Planned the timeline and sent regular progress updates to the General Manager
- Set up the shop, product templates and checkout in WooCommerce

## Challenges and fixes

- **Slow shared hosting.** The page editor kept hanging, so I raised the PHP memory limit, turned on OPcache and added page caching.
- **Checkout bug.** The country list at checkout was broken; I traced it to a WooCommerce selling-locations setting and fixed it.
- **Keeping 16 pages consistent.** I built the page header once as a reusable template, so every page shares the same style but keeps its own title.

## What I learned

[TODO: in your own words — e.g. what working as the only IT person taught you about explaining technical choices to a non-technical team.]
