import { c as createAstro, a as createComponent, r as renderTemplate, b as renderSlot, d as renderHead, e as addAttribute, f as renderComponent, m as maybeRenderHead } from '../astro.99384f8d.mjs';
import 'html-escaper';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro$2 = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title, description, canonicalURL } = Astro2.props;
  function getCanonicalURL(path) {
    if (Astro2.site) {
      return new URL(path, Astro2.site).toString();
    }
    return path;
  }
  return renderTemplate(_a || (_a = __template(['<html lang="en">\n  <head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width">\n    <link rel="icon" type="image/svg+xml" href="/favicon.svg">\n    <meta name="generator"', ">\n    <title>", '</title>\n    <meta name="description"', '>\n    <link rel="canonical"', '>\n    <meta property="og:title"', '>\n    <meta property="og:description"', '>\n    <meta property="og:url"', '>\n    <meta property="og:type" content="website">\n    <meta name="twitter:card" content="summary_large_image">\n    <meta name="twitter:title"', '>\n    <meta name="twitter:description"', '>\n    <script type="application/ld+json">\n      {\n        "@context": "https://schema.org",\n        "@type": "WebSite",\n        "name": "Find a Tradesperson in Ireland",\n        "url": "https://www.findatradespersonireland.com"\n      }\n    <\/script>\n  ', "</head>\n  <body>\n    ", "\n  </body></html>"])), addAttribute(Astro2.generator, "content"), title, addAttribute(description, "content"), addAttribute(getCanonicalURL(canonicalURL), "href"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(getCanonicalURL(canonicalURL), "content"), addAttribute(title, "content"), addAttribute(description, "content"), renderHead(), renderSlot($$result, $$slots["default"]));
}, "/home/project/src/layouts/Layout.astro", void 0);

const trades = [
  "Carpentry",
  "Plumbing",
  "Electrical",
  "Roofing",
  "Bricklaying",
  "Plastering",
  "Tiling",
  "Painting and Decorating",
  "Welding",
  "HVAC",
  // Add more trades here
];

const counties = [
  "Antrim",
  "Armagh",
  "Carlow",
  "Cavan",
  "Clare",
  "Cork",
  "Donegal",
  "Down",
  "Dublin",
  "Fermanagh",
  "Galway",
  "Kerry",
  "Kildare",
  "Kilkenny",
  "Laois",
  "Leitrim",
  "Limerick",
  "Londonderry",
  "Longford",
  "Louth",
  "Mayo",
  "Meath",
  "Monaghan",
  "Offaly",
  "Roscommon",
  "Sligo",
  "Tipperary",
  "Tyrone",
  "Waterford",
  "Westmeath",
  "Wexford",
  "Wicklow"
];

const towns = [
  "Dublin",
  "Cork",
  "Galway",
  "Limerick",
  "Waterford",
  "Drogheda",
  "Swords",
  "Dundalk",
  "Bray",
  "Navan",
  // Add more towns here
];

const CACHE_DIR = path.join(process.cwd(), '.cache');

if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR);
}

function getCachedData(key) {
  const cacheFile = path.join(CACHE_DIR, `${key}.json`);
  if (fs.existsSync(cacheFile)) {
    const data = fs.readFileSync(cacheFile, 'utf-8');
    return JSON.parse(data);
  }
  return null;
}

function setCachedData(key, data) {
  const cacheFile = path.join(CACHE_DIR, `${key}.json`);
  fs.writeFileSync(cacheFile, JSON.stringify(data));
}

const API_LOGIN = 'hello@harborseo.ai';
const API_PASSWORD = '44c18af8fb0aee08';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

async function fetchTradespeople(trade, location) {
  const cacheKey = `${trade}-${location}`;
  const cachedData = getCachedData(cacheKey);

  if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
    return cachedData.data;
  }

  const keyword = `${trade} in ${location}`;
  const url = 'https://api.dataforseo.com/v3/serp/google/maps/live/advanced';
  const data = [{
    keyword,
    location_code: 2372, // Ireland
    language_code: 'en',
    device: 'desktop',
    os: 'windows',
    depth: 20
  }];

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(API_LOGIN + ':' + API_PASSWORD).toString('base64'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    const items = result.tasks[0].result[0].items || [];

    setCachedData(cacheKey, { data: items, timestamp: Date.now() });
    return items;
  } catch (error) {
    console.error('Error fetching data from DataForSEO:', error);
    return [];
  }
}

const $$Astro$1 = createAstro();
async function getStaticPaths$1() {
  const paths = [];
  let count = 0;
  const maxPages = 10;
  try {
    for (const trade of trades.slice(0, 2)) {
      for (const county of counties.slice(0, 2)) {
        for (const town of towns.slice(0, 2)) {
          if (count >= maxPages)
            break;
          const tradespeople = await fetchTradespeople(trade, `${town}, ${county}`);
          for (const person of tradespeople.slice(0, 1)) {
            if (count >= maxPages)
              break;
            paths.push({
              params: {
                trade: trade.toLowerCase().replace(/\s+/g, "-"),
                county: county.toLowerCase().replace(/\s+/g, "-"),
                town: town.toLowerCase().replace(/\s+/g, "-"),
                business: person.title.toLowerCase().replace(/\s+/g, "-")
              },
              props: { trade, county, town, person }
            });
            count++;
          }
        }
      }
    }
  } catch (error) {
    console.error("Error in getStaticPaths:", error);
  }
  console.log(`Generated ${paths.length} paths`);
  return paths;
}
const $$business$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$business$1;
  const { trade, county, town, person } = Astro2.props;
  const title = `${person.title} - ${trade} in ${town}, ${county}, Ireland`;
  const description = `${person.title} provides professional ${trade.toLowerCase()} services in ${town}, ${county}. View ratings, contact information, and service details.`;
  const canonicalURL = new URL(Astro2.url.pathname, Astro2.site || "https://www.findatradespersonireland.com").toString();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "description": description, "canonicalURL": canonicalURL }, { "default": ($$result2) => renderTemplate`
  ${maybeRenderHead()}<main itemscope itemtype="https://schema.org/LocalBusiness">
    <h1 itemprop="name">${person.title}</h1>
    <h2>${trade} in ${town}, ${county}, Ireland</h2>
    <p itemprop="description">${person.snippet}</p>
    <div itemprop="aggregateRating" itemscope itemtype="https://schema.org/AggregateRating">
      <p>Rating: <span itemprop="ratingValue">${person.rating?.value}</span> (<span itemprop="reviewCount">${person.rating?.votes_count}</span> votes)</p>
    </div>
    <p>Phone: <span itemprop="telephone">${person.phone}</span></p>
    <p>Address: <span itemprop="address" itemscope itemtype="https://schema.org/PostalAddress">
      <span itemprop="streetAddress">${person.address}</span>,
      <span itemprop="addressLocality">${town}</span>,
      <span itemprop="addressRegion">${county}</span>,
      <span itemprop="addressCountry">Ireland</span>
    </span></p>
    ${person.url && renderTemplate`<p>Website: <a${addAttribute(person.url, "href")} target="_blank" rel="noopener noreferrer" itemprop="url">${person.url}</a></p>`}
    ${person.main_image && renderTemplate`<img${addAttribute(person.main_image, "src")}${addAttribute(person.title, "alt")} itemprop="image">`}
  </main>
` })}`;
}, "/home/project/src/pages/[trade]/[county]/[town]/[business].astro", void 0);

const $$file$1 = "/home/project/src/pages/[trade]/[county]/[town]/[business].astro";
const $$url$1 = "/[trade]/[county]/[town]/[business]";

const _business_$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$business$1,
  file: $$file$1,
  getStaticPaths: getStaticPaths$1,
  url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro = createAstro();
async function getStaticPaths() {
  const paths = [];
  for (const trade of trades) {
    for (const county of counties) {
      const tradespeople = await fetchTradespeople(trade, county);
      for (const person of tradespeople) {
        paths.push({
          params: {
            trade: trade.toLowerCase().replace(/\s+/g, "-"),
            county: county.toLowerCase().replace(/\s+/g, "-"),
            business: person.title.toLowerCase().replace(/\s+/g, "-")
          },
          props: { trade, county, person }
        });
      }
    }
  }
  return paths;
}
const $$business = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$business;
  const { trade, county, person } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${person.title} - ${trade} in ${county}, Ireland` }, { "default": ($$result2) => renderTemplate`
  ${maybeRenderHead()}<main>
    <h1>${person.title}</h1>
    <h2>${trade} in ${county}, Ireland</h2>
    <p>${person.snippet}</p>
    <p>Rating: ${person.rating?.value} (${person.rating?.votes_count} votes)</p>
    <p>Phone: ${person.phone}</p>
    <p>Address: ${person.address}</p>
    ${person.url && renderTemplate`<p>Website: <a${addAttribute(person.url, "href")} target="_blank" rel="noopener noreferrer">${person.url}</a></p>`}
    ${person.main_image && renderTemplate`<img${addAttribute(person.main_image, "src")}${addAttribute(person.title, "alt")}>`}
  </main>
` })}`;
}, "/home/project/src/pages/[trade]/[county]/[business].astro", void 0);

const $$file = "/home/project/src/pages/[trade]/[county]/[business].astro";
const $$url = "/[trade]/[county]/[business]";

const _business_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$business,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Layout as $, _business_$1 as _, towns as a, _business_ as b, counties as c, fetchTradespeople as f, trades as t };
