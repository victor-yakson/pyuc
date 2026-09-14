// Generates src/data/nigeriaLgas.ts from the naija-state-local-government package.
// Run from the project root:  node scripts/gen-lgas.js
const fs = require("fs");
const naija = require("naija-state-local-government");

const all = naija.all();
const map = {};
for (const s of all) {
  map[s.state] = [...s.lgas].sort((a, b) => a.localeCompare(b));
}
const states = Object.keys(map).sort((a, b) => a.localeCompare(b));

const out = `// AUTO-GENERATED — do not edit by hand.
// 36 states + FCT and their Local Government Areas.
// Source: the \`naija-state-local-government\` npm package.
// Regenerate: node scripts/gen-lgas.js

export const NG_STATE_NAMES: string[] = ${JSON.stringify(states)};

export const NG_LGAS: Record<string, string[]> = ${JSON.stringify(map)};
`;

fs.writeFileSync("src/data/nigeriaLgas.ts", out);
const total = Object.values(map).reduce((a, b) => a + b.length, 0);
console.log("states:", states.length, "| total LGAs:", total);
