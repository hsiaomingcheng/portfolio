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
# Cover is a results graphic, not a screenshot, while the new site is still on staging.
# [TODO: when Frizzell agrees (or the new site goes live), swap in a real screenshot.]
cover: ../../assets/projects/frizzell-cover.png
coverAlt: 'Frizzell Agricultural Electronics website rebuild. Lighthouse desktop scores, old site to new site on staging: Performance 84 to 87, Accessibility 93 to 96, Best Practices 65 to 100, SEO 77 to 92. 16 pages rebuilt, with 5 industry and 5 solution pages.'
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
# Before = the old, public homepage. After = held back while the new site is on staging.
# [TODO: when Frizzell agrees (or the new site goes live), add `after:` with a screenshot
#  and remove `afterNote`.]
beforeAfter:
  before: ../../assets/projects/frizzell-before.webp
  beforeAlt: "The old Frizzell homepage: a solar water pumps banner above an orange strip reading Frizzell Agricultural Electronics, with a navigation bar for pumps, scales, shop and downloads"
  afterAlt: 'The new Frizzell homepage'
  afterNote: "The new design is still in testing with Frizzell's team, so I can't show it yet. The “Before” screenshot is the current live homepage."
# Results cards are hidden for now: the scores are already on the cover graphic, so the cards
# repeated them. [TODO: when the new site is live in production, restore the block below
# (uncomment `results` and `resultsNote`) and swap the cover for a real new-homepage screenshot.]
# results:
#   - number: '16'
#     label: 'pages redesigned and rebuilt'
#   - number: '5 + 5'
#     label: 'industry and solution pages'
#   - number: "84\u00a0→\u00a087"
#     label: 'Lighthouse Performance score, old site → new site'
#   - number: "93\u00a0→\u00a096"
#     label: 'Lighthouse Accessibility score'
#   - number: "65\u00a0→\u00a0100"
#     label: 'Lighthouse Best Practices score'
#   - number: "77\u00a0→\u00a092"
#     label: 'Lighthouse SEO score'
# resultsNote: "Lighthouse desktop scores for Frizzell's current live site compared with the new site on staging. Scores vary a little between runs."
---

## The problem

The old site was built on an older theme with no live visual editor, so even small design changes meant writing custom code. The company needed a modern site that shows its products by industry and by solution, and an online shop that works smoothly.

The other issue is that many of Frizzell's customers are farmers, and they often live in rural areas with a poor internet connection and slow speeds. That made loading time and responsiveness very important for the new website.

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

Back in the day, as a frontend developer, I didn't have to think about UI/UX. This time I had to consider not only the layout but also how to fit the right content into it.

I also found that making a timeline and setting milestones is crucial. It helped me work out what I should do each week, and made it easy to track progress and follow up on tasks.
