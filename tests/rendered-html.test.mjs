import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/website/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html", host: "localhost" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders Frederico Foini's portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Frederico Foini — Data Analytics, Growth &amp; Product<\/title>/i);
  assert.match(html, /Turning data into/);
  assert.match(html, /Sandbox Group/);
  assert.match(html, /Coca-Cola FEMSA/);
  assert.match(html, /Senior Data Analyst/);
  assert.match(html, /Google BigQuery/);
  assert.match(html, /Product Pulse/);
  assert.match(html, /Infinita/);
  assert.match(html, /monster-portrait-selective\.webp/);
  assert.match(html, /Across Sandbox Group and Coca-Cola FEMSA/);
  assert.match(html, /About me/);
  assert.match(html, /Write to me/);
  assert.doesNotMatch(html, /Frederico (connected|coordinated|redesigned|is actively shaping|is a Senior Product Owner)/);
  assert.doesNotMatch(html, /His work lives/);
  assert.match(html, /Frederico-Foini-Resume\.pdf/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("ships portfolio metadata and required downloadable assets", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /framer-motion/);
  assert.match(page, /prefers-reduced-motion|reducedMotion/);
  assert.match(layout, /Frederico Foini — Data Analytics, Growth & Product/);
  assert.match(layout, /openGraph/);
  assert.match(packageJson, /"framer-motion"/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);

  await Promise.all([
    access(new URL("../public/Frederico-Foini-Resume.pdf", import.meta.url)),
    access(new URL("../public/og.png", import.meta.url)),
    access(new URL("../public/favicon.png", import.meta.url)),
    access(new URL("../public/media/portrait.webp", import.meta.url)),
    access(new URL("../public/media/coca-cola-team.webp", import.meta.url)),
    access(new URL("../public/media/monster-portrait-selective.webp", import.meta.url)),
    access(new URL("../public/media/project-product-pulse.webp", import.meta.url)),
    access(new URL("../public/media/project-infinita.webp", import.meta.url)),
  ]);

  await assert.rejects(access(new URL("../app/_sites-preview/SkeletonPreview.tsx", import.meta.url)));
});
