import { c as createAstro, a as createComponent, r as renderTemplate, f as renderComponent } from '../astro.99384f8d.mjs';
import 'html-escaper';
import { $ as $$Layout } from './_business_.astro.1107f622.mjs';
import 'node-fetch';
import 'fs';
import 'path';

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const title = "Find a Tradesperson in Ireland - Expert Services Near You";
  const description = "Discover skilled tradespeople across Ireland. From plumbers to electricians, find reliable professionals in your area for all your home improvement needs.";
  const canonicalURL = new URL(Astro2.url.pathname, Astro2.site || "https://www.findatradespersonireland.com").toString();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "description": description, "canonicalURL": canonicalURL }, { "default": ($$result2) => renderTemplate`
  
` })}`;
}, "/home/project/src/pages/index.astro", void 0);

const $$file = "/home/project/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
