#!/usr/bin/env node
/**
 * Apex Mechanical & Plumbing Solutions — static site builder.
 *
 * Shared chrome (masthead, emergency bar, footer, meta) lives here so all
 * pages stay consistent. Page bodies live in src/pages/*.html.
 *
 * Usage: node build.mjs
 */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));

const SITE = {
  name: 'Apex Mechanical & Plumbing Solutions',
  phoneDisplay: '(555) 014-7700',
  phoneHref: '+15550147700',
  email: 'dispatch@apexmechanical.example',
  street: '1420 Foundry Row, Suite 300',
  city: 'Raleigh, NC 27601',
  license: 'NC Plumbing License #P-000000',
  domain: 'https://www.apexmechanical.example',
};

const UTILITY_LINKS = [
  ['about.html', 'About'],
  ['commercial.html', 'Commercial'],
  ['residential.html', 'Residential'],
  ['pricing.html', 'Pricing'],
];

const MAIN_LINKS = [
  ['index.html', 'Home', 'home'],
  ['residential.html', 'Residential', 'residential'],
  ['commercial.html', 'Commercial', 'commercial'],
  ['pricing.html', 'Pricing', 'pricing'],
  ['about.html', 'About', 'about'],
  ['service-areas.html', 'Service Areas', 'areas'],
];

const PAGES = [
  {
    slug: 'home',
    out: 'index.html',
    file: 'home.html',
    nav: 'home',
    title: 'Apex Mechanical &amp; Plumbing Solutions | Industrial-Grade Plumbing in Raleigh, NC',
    description:
      'Licensed, insured plumbing and mechanical contractor serving Raleigh, Durham, Cary and the Research Triangle. Flat-rate pricing, elite technicians and 24/7 emergency dispatch.',
  },
  {
    slug: 'residential',
    out: 'residential.html',
    file: 'residential.html',
    nav: 'residential',
    title: 'Residential Plumbing Services | Apex Mechanical &amp; Plumbing Solutions',
    description:
      'Water heaters, whole-home repipes, sewer repair, leak detection and fixture installation. Background-checked technicians, written flat-rate quotes, 10-year workmanship guarantee.',
  },
  {
    slug: 'commercial',
    out: 'commercial.html',
    file: 'commercial.html',
    nav: 'commercial',
    title: 'Commercial Plumbing &amp; Mechanical Contracting | Apex Mechanical',
    description:
      'Commercial plumbing, backflow testing, hydro-jetting and preventive maintenance for restaurants, multifamily, medical and office properties across the Triangle.',
  },
  {
    slug: 'pricing',
    out: 'pricing.html',
    file: 'pricing.html',
    nav: 'pricing',
    title: 'Transparent Plumbing Pricing &amp; Flat-Rate Rates | Apex Mechanical',
    description:
      'Published starting rates, diagnostic fees, emergency surcharges and financing options. Every Apex quote is written and approved before work begins.',
  },
  {
    slug: 'schedule',
    out: 'schedule.html',
    file: 'schedule.html',
    nav: 'schedule',
    title: 'Schedule an Inspection Window | Apex Mechanical &amp; Plumbing Solutions',
    description:
      'Choose a preferred inspection window and our central dispatch office will confirm your official arrival time. Active leaks? Call our 24/7 emergency line.',
  },
  {
    slug: 'about',
    out: 'about.html',
    file: 'about.html',
    nav: 'about',
    title: 'About Apex Mechanical &amp; Plumbing Solutions | Licensed, Insured, Local',
    description:
      'Founded in 2008 in Raleigh, Apex Mechanical & Plumbing Solutions operates a licensed, insured and background-checked field team across the Research Triangle.',
  },
  {
    slug: 'emergency',
    out: 'emergency.html',
    file: 'emergency.html',
    nav: 'emergency',
    title: '24/7 Emergency Plumbing Dispatch | Apex Mechanical &amp; Plumbing Solutions',
    description:
      'Burst pipes, sewage backups, no hot water and active flooding. Apex dispatches a licensed emergency technician 24 hours a day, every day.',
  },
  {
    slug: 'areas',
    out: 'service-areas.html',
    file: 'service-areas.html',
    nav: 'areas',
    title: 'Service Areas &amp; Coverage Map | Apex Mechanical &amp; Plumbing Solutions',
    description:
      'Apex Mechanical serves Raleigh, Durham, Cary, Apex, Chapel Hill, Wake Forest, Morrisville, Holly Springs and surrounding Research Triangle communities.',
  },
  {
    slug: 'reviews',
    out: 'reviews.html',
    file: 'reviews.html',
    nav: 'reviews',
    title: 'Customer Reviews &amp; Ratings | Apex Mechanical &amp; Plumbing Solutions',
    description:
      'Read verified residential and commercial reviews for Apex Mechanical & Plumbing Solutions, rated 4.9 out of 5 across 1,238 completed jobs.',
  },
  {
    slug: 'careers',
    out: 'careers.html',
    file: 'careers.html',
    nav: 'careers',
    title: 'Careers &amp; Apprenticeships | Apex Mechanical &amp; Plumbing Solutions',
    description:
      'Join a licensed, safety-first plumbing and mechanical team in Raleigh. Open service technician, apprentice and dispatch roles with paid training.',
  },
  {
    slug: 'contact',
    out: 'contact.html',
    file: 'contact.html',
    nav: 'contact',
    title: 'Contact &amp; Dispatch | Apex Mechanical &amp; Plumbing Solutions',
    description:
      'Contact the Apex Mechanical central dispatch office in Raleigh, NC. Phone, email, mailing address, operational hours and appointment requests.',
  },
  {
    slug: 'sitemap',
    out: 'sitemap.html',
    file: 'sitemap.html',
    nav: 'sitemap',
    title: 'Site Map | Apex Mechanical &amp; Plumbing Solutions',
    description:
      'A complete map of Apex Mechanical & Plumbing Solutions pages: residential and commercial services, pricing, scheduling, coverage and company information.',
  },
  {
    slug: 'privacy',
    out: 'privacy.html',
    file: 'privacy.html',
    nav: 'legal',
    title: 'Privacy Policy | Apex Mechanical &amp; Plumbing Solutions',
    description:
      'How Apex Mechanical & Plumbing Solutions collects, uses and protects customer information submitted through appointment requests and service calls.',
  },
  {
    slug: 'terms',
    out: 'terms.html',
    file: 'terms.html',
    nav: 'legal',
    title: 'Terms of Service | Apex Mechanical &amp; Plumbing Solutions',
    description:
      'Service terms covering estimates, scheduling, payment, warranty, cancellation and limitation of liability for Apex Mechanical & Plumbing Solutions.',
  },
  {
    slug: 'accessibility',
    out: 'accessibility.html',
    file: 'accessibility.html',
    nav: 'legal',
    title: 'Accessibility Statement | Apex Mechanical &amp; Plumbing Solutions',
    description:
      'Apex Mechanical & Plumbing Solutions is committed to WCAG 2.1 AA conformance and accessible scheduling, content and customer service.',
  },
];

/* ------------------------------------------------------------------ */
/* Shared chrome                                                       */
/* ------------------------------------------------------------------ */

const brand = (inverse = false) => `
        <a class="brand${inverse ? ' brand--inverse' : ''}" href="index.html" aria-label="${SITE.name} — home">
          <span class="brand__mark" aria-hidden="true">
            <svg viewBox="0 0 40 40" width="40" height="40" role="img" focusable="false">
              <rect width="40" height="40" rx="10" fill="#0B2545"></rect>
              <path d="M20 7.5 31.5 31h-5.9L20 18.7 14.4 31H8.5L20 7.5Z" fill="#EE964B"></path>
              <path d="M16.6 25.1h6.8" stroke="#0B2545" stroke-width="1.6" stroke-linecap="round"></path>
            </svg>
          </span>
          <span class="brand__text">
            <span class="brand__name">Apex</span>
            <span class="brand__sub">Mechanical &amp; Plumbing Solutions</span>
          </span>
        </a>`;

function utilityBar() {
  const links = UTILITY_LINKS.map(([href, label]) => `<a href="${href}">${label}</a>`).join('\n          ');
  return `
    <div class="utility">
      <div class="wrap utility__inner">
        <nav class="utility-nav" aria-label="Corporate">
          ${links}
        </nav>
        <a class="dispatch-banner" href="tel:${SITE.phoneHref}" data-dispatch-banner>
          <span class="dispatch-banner__pulse" aria-hidden="true"></span>
          <span class="dispatch-banner__label">Emergency 24/7 Dispatch Call:</span>
          <strong class="dispatch-banner__number">${SITE.phoneDisplay}</strong>
          <svg class="dispatch-banner__arrow" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"></path></svg>
        </a>
      </div>
    </div>`;
}

function masthead(page) {
  const links = MAIN_LINKS.map(
    ([href, label, key]) =>
      `<a href="${href}"${page.nav === key ? ' aria-current="page"' : ''}>${label}</a>`
  ).join('\n          ');

  return `
  <div class="masthead" data-masthead>
    ${utilityBar()}
    <header class="site-header">
      <div class="wrap site-header__inner">
        ${brand()}
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-navigation" data-nav-toggle>
          <span class="nav-toggle__bars" aria-hidden="true"><span></span><span></span><span></span></span>
          <span class="nav-toggle__text">Menu</span>
        </button>
        <nav class="primary-nav" id="primary-navigation" aria-label="Primary">
          ${links}
        </nav>
        <div class="header-actions">
          <a class="header-phone" href="tel:${SITE.phoneHref}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"></path></svg>
            <span>${SITE.phoneDisplay}</span>
          </a>
          <a class="btn btn--amber btn--sm" href="schedule.html">Request Appointment</a>
        </div>
      </div>
    </header>
  </div>`;
}

const FOOTER_LINKS = [
  ['residential.html', 'Residential Plumbing'],
  ['commercial.html', 'Commercial Contracting'],
  ['pricing.html', 'Pricing &amp; Rates'],
  ['schedule.html', 'Schedule an Inspection'],
  ['emergency.html', 'Emergency Dispatch'],
  ['service-areas.html', 'Service Areas'],
  ['reviews.html', 'Customer Reviews'],
  ['careers.html', 'Careers &amp; Apprenticeships'],
  ['about.html', 'About Apex'],
  ['contact.html', 'Contact &amp; Dispatch'],
];

function footer() {
  const year = new Date().getFullYear();
  const links = FOOTER_LINKS.map(([href, label]) => `<li><a href="${href}">${label}</a></li>`).join('\n              ');

  return `
  <footer class="footer">
    <div class="wrap footer__grid">
      <div class="footer__col">
        ${brand(true)}
        <address class="footer__address">
          ${SITE.street}<br>
          ${SITE.city}
        </address>
        <a class="footer__phone" href="tel:${SITE.phoneHref}">${SITE.phoneDisplay}</a>
        <a class="footer__email" href="mailto:${SITE.email}">${SITE.email}</a>
        <p class="footer__note">Licensed mechanical &amp; plumbing contractor. Serving the Research Triangle since 2008.</p>
      </div>

      <div class="footer__col">
        <h3 class="footer__heading">Operational Hours</h3>
        <table class="hours">
          <caption class="sr-only">Apex Mechanical operational hours</caption>
          <tbody>
            <tr><th scope="row">Monday</th><td>7:00 AM – 7:00 PM</td></tr>
            <tr><th scope="row">Tuesday</th><td>7:00 AM – 7:00 PM</td></tr>
            <tr><th scope="row">Wednesday</th><td>7:00 AM – 7:00 PM</td></tr>
            <tr><th scope="row">Thursday</th><td>7:00 AM – 7:00 PM</td></tr>
            <tr><th scope="row">Friday</th><td>7:00 AM – 7:00 PM</td></tr>
            <tr><th scope="row">Saturday</th><td>7:00 AM – 7:00 PM</td></tr>
            <tr><th scope="row">Sunday</th><td>7:00 AM – 7:00 PM</td></tr>
          </tbody>
        </table>
        <p class="footer__emergency"><span aria-hidden="true"></span>Emergency dispatch 24/7/365</p>
      </div>

      <div class="footer__col">
        <h3 class="footer__heading">Quick Links</h3>
        <ul class="footer__links">
              ${links}
        </ul>
      </div>

      <div class="footer__col footer__col--wide">
        <h3 class="footer__heading">Customer Service Notice</h3>
        <p>All work is performed by licensed, insured, background-checked technicians. We quote a flat rate in writing before any work begins, and we never charge for a quote you decline. After-hours calls route to a live dispatcher in Raleigh — not an answering service.</p>
        <p class="footer__disclosure"><strong>Compliance disclosures:</strong> ${SITE.license} (placeholder). General liability $2,000,000 / workers&rsquo; compensation $1,000,000. Backflow prevention assembly tester certification on file. Prices shown are starting points for standard residential access and are confirmed in writing prior to work. Emergency and after-hours rates may apply and are disclosed before dispatch.</p>
        <ul class="footer__legal">
          <li><a href="privacy.html">Privacy Policy</a></li>
          <li><a href="terms.html">Terms of Service</a></li>
          <li><a href="accessibility.html">Accessibility</a></li>
          <li><a href="sitemap.html">Site Map</a></li>
        </ul>
      </div>
    </div>

    <div class="footer__bottom">
      <div class="wrap footer__bottom-inner">
        <p>&copy; <span data-year>${year}</span> ${SITE.name}. All rights reserved.</p>
        <p class="footer__bottom-meta">${SITE.license} &middot; Bonded &amp; insured &middot; Raleigh, NC</p>
      </div>
    </div>
  </footer>`;
}

function structuredData(page) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Plumber',
    name: SITE.name,
    url: SITE.domain + '/' + (page.out === 'index.html' ? '' : page.out),
    telephone: SITE.phoneDisplay,
    email: SITE.email,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.street,
      addressLocality: 'Raleigh',
      addressRegion: 'NC',
      postalCode: '27601',
      addressCountry: 'US',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '07:00',
        closes: '19:00',
      },
    ],
    areaServed: ['Raleigh NC', 'Durham NC', 'Cary NC', 'Apex NC', 'Chapel Hill NC', 'Wake Forest NC'],
  };
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

function layout(page, content) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${page.title}</title>
  <meta name="description" content="${page.description}">
  <meta name="theme-color" content="#0B2545">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${SITE.name}">
  <meta property="og:title" content="${page.title}">
  <meta property="og:description" content="${page.description}">
  <link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/site.css">
  ${structuredData(page)}
  <!-- Built from src/pages/${page.file} — edit the source, then run: node build.mjs -->
</head>
<body class="page page--${page.slug}">
  <a class="skip-link" href="#main">Skip to main content</a>
  ${masthead(page)}

  <main id="main">
${content.trimEnd()}
  </main>
${footer()}

  <script src="assets/site.js" defer></script>
</body>
</html>
`;
}

/* ------------------------------------------------------------------ */
/* Build                                                               */
/* ------------------------------------------------------------------ */

const built = [];
for (const page of PAGES) {
  const source = await readFile(path.join(root, 'src', 'pages', page.file), 'utf8');
  await writeFile(path.join(root, page.out), layout(page, source), 'utf8');
  built.push(page);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${built
  .map(
    (p) =>
      `  <url><loc>${SITE.domain}/${p.out === 'index.html' ? '' : p.out}</loc><priority>${p.slug === 'home' ? '1.0' : p.nav === 'legal' ? '0.3' : '0.8'}</priority></url>`
  )
  .join('\n')}
</urlset>
`;
await writeFile(path.join(root, 'sitemap.xml'), sitemap, 'utf8');

await writeFile(
  path.join(root, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE.domain}/sitemap.xml\n`,
  'utf8'
);

console.log(`Built ${built.length} pages → ${built.map((p) => p.out).join(', ')}`);
