import { c as createAstro, a as createComponent, r as renderTemplate, f as renderComponent } from '../astro.99384f8d.mjs';
import 'html-escaper';
import { f as fetchTradespeople, $ as $$Layout } from './_business_.astro.1107f622.mjs';
import 'node-fetch';
import 'fs';
import 'path';

const $$Astro = createAstro();
async function getStaticPaths() {
}
const $$county = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$county;
  const { trade, county } = Astro2.props;
  await fetchTradespeople(trade, county);
  const title = `Best ${trade} in ${county}, Ireland - Top-Rated Professionals`;
  const description = `Find the best ${trade} in ${county}, Ireland. Compare ratings, reviews, and contact information for local ${trade.toLowerCase()} professionals.`;
  const canonicalURL = new URL(Astro2.url.pathname, Astro2.site || "https://www.findatradespersonireland.com").toString();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "description": description, "canonicalURL": canonicalURL }, { "default": ($$result2) => renderTemplate`
  
` })}`;
}, "/home/project/src/pages/[trade]/[county].astro", void 0);

const $$file = "/home/project/src/pages/[trade]/[county].astro";
const $$url = "/[trade]/[county]";

export { $$county as default, $$file as file, getStaticPaths, $$url as url };
