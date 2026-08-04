import fs from "fs";
import { geoIdentity, geoPath } from "d3-geo";

// Run from the project root:  node scripts/gen-map.mjs
const GEO = "./scripts/nga-adm1.geojson";
const OUT = "./src/data/nigeriaMap.ts";

const gj = JSON.parse(fs.readFileSync(GEO, "utf8"));

const ZONE = {};
const add = (z, arr) => arr.forEach((s) => (ZONE[s] = z));
add("nw", ["Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Sokoto", "Zamfara"]);
add("ne", ["Adamawa", "Bauchi", "Borno", "Gombe", "Taraba", "Yobe"]);
add("nc", ["Benue", "Kogi", "Kwara", "Nasarawa", "Niger", "Plateau"]);
add("sw", ["Ekiti", "Lagos", "Ogun", "Ondo", "Osun", "Oyo"]);
add("se", ["Abia", "Anambra", "Ebonyi", "Enugu", "Imo"]);
add("ss", ["Akwa Ibom", "Bayelsa", "Cross River", "Delta", "Edo", "Rivers"]);
const FCT_NAME = "Abuja Federal Capital Territory";

// Treat lon/lat as planar (geoIdentity) — Nigeria sits near the equator so
// distortion is negligible, and this sidesteps the dataset's ring-winding issue.
const proj = geoIdentity().reflectY(true).fitSize([800, 800], gj);
const path = geoPath(proj);
const round = (d) => d.replace(/-?\d+\.\d+/g, (m) => (+m).toFixed(1));
const n1 = (v) => +v.toFixed(1);

const b = path.bounds(gj);
const vb = `${n1(b[0][0])} ${n1(b[0][1])} ${n1(b[1][0] - b[0][0])} ${n1(b[1][1] - b[0][1])}`;

const states = [];
let fct = null;
const zoneGeoms = {};

for (const f of gj.features) {
  const nm = f.properties.shapeName;
  const d = round(path(f));
  const c = path.centroid(f);
  if (nm === FCT_NAME) {
    fct = { state: "FCT Abuja", d, cx: n1(c[0]), cy: n1(c[1]) };
    continue;
  }
  const z = ZONE[nm];
  if (!z) {
    console.error("UNMAPPED:", nm);
    continue;
  }
  states.push({ state: nm, zone: z, d, cx: n1(c[0]), cy: n1(c[1]) });
  (zoneGeoms[z] = zoneGeoms[z] || []).push(f);
}

const zoneCentroids = {};
for (const z in zoneGeoms) {
  const coords = [];
  for (const f of zoneGeoms[z]) {
    const g = f.geometry;
    if (g.type === "Polygon") coords.push(g.coordinates);
    else if (g.type === "MultiPolygon") g.coordinates.forEach((p) => coords.push(p));
  }
  const c = path.centroid({ type: "Feature", geometry: { type: "MultiPolygon", coordinates: coords } });
  zoneCentroids[z] = { x: n1(c[0]), y: n1(c[1]) };
}

const header = `// AUTO-GENERATED — do not edit by hand.
// Source: geoBoundaries gbOpen NGA ADM1 (state boundaries), simplified.
// © geoBoundaries, CC BY 4.0 (https://www.geoboundaries.org). States merged into
// Nigeria's six geo-political zones + FCT. Regenerate: node scripts/gen-map.mjs

export type NgFeature = { state: string; zone: string; d: string; cx: number; cy: number };

export const NG_VIEWBOX = ${JSON.stringify(vb)};

export const NG_STATES: NgFeature[] = ${JSON.stringify(states)};

export const NG_FCT = ${JSON.stringify(fct)};

export const NG_ZONE_CENTROIDS: Record<string, { x: number; y: number }> = ${JSON.stringify(zoneCentroids)};
`;

fs.writeFileSync(OUT, header);
console.log("viewBox:", vb);
console.log("states:", states.length, "| fct:", !!fct);
console.log("zone centroids:", JSON.stringify(zoneCentroids));
console.log("output KB:", (fs.statSync(OUT).size / 1024).toFixed(1));
