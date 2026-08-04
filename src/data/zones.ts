export type Zone = {
  id: string;
  name: string;
  short: string;
  team: string;
  color: string; // accent
  glow: string;
  states: string[];
  captain: string;
  form: ("W" | "D" | "L")[];
  seed: number;
  blurb: string;
};

/** The six geo-political zones of Nigeria, with the FCT held as the unifying centre. */
export const ZONES: Zone[] = [
  {
    id: "nc",
    name: "North Central",
    short: "NC",
    team: "Middle Belt Lions",
    color: "#12c46b",
    glow: "rgba(18,196,107,0.55)",
    states: ["Benue", "Kogi", "Kwara", "Nasarawa", "Niger", "Plateau"],
    captain: "Emeka Ochgwu",
    form: ["W", "W", "D", "W", "L"],
    seed: 3,
    blurb: "The heartland engine — relentless midfield running and set-piece steel.",
  },
  {
    id: "ne",
    name: "North East",
    short: "NE",
    team: "Sahel Eagles",
    color: "#f4c430",
    glow: "rgba(244,196,48,0.55)",
    states: ["Adamawa", "Bauchi", "Borno", "Gombe", "Taraba", "Yobe"],
    captain: "Musa Ibrahim",
    form: ["W", "L", "W", "W", "W"],
    seed: 2,
    blurb: "Rising force from the plains — pace on the break and fearless pressing.",
  },
  {
    id: "nw",
    name: "North West",
    short: "NW",
    team: "Savannah Stallions",
    color: "#00a860",
    glow: "rgba(0,168,96,0.55)",
    states: ["Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Sokoto", "Zamfara"],
    captain: "Abdullahi Sani",
    form: ["W", "W", "W", "D", "W"],
    seed: 1,
    blurb: "Powerhouse of the north — the deepest talent pool in the competition.",
  },
  {
    id: "se",
    name: "South East",
    short: "SE",
    team: "Coal City Flames",
    color: "#ff7a3c",
    glow: "rgba(255,122,60,0.5)",
    states: ["Abia", "Anambra", "Ebonyi", "Enugu", "Imo"],
    captain: "Chidi Nwosu",
    form: ["D", "W", "W", "L", "W"],
    seed: 4,
    blurb: "Flair, tempo and one-touch football forged in the Coal City.",
  },
  {
    id: "ss",
    name: "South South",
    short: "SS",
    team: "Delta Dolphins",
    color: "#2dd4bf",
    glow: "rgba(45,212,191,0.5)",
    states: ["Akwa Ibom", "Bayelsa", "Cross River", "Delta", "Edo", "Rivers"],
    captain: "Tamuno George",
    form: ["W", "W", "L", "W", "D"],
    seed: 5,
    blurb: "Wave after wave of attacking football from the delta creeks.",
  },
  {
    id: "sw",
    name: "South West",
    short: "SW",
    team: "Atlantic Warriors",
    color: "#38bdf8",
    glow: "rgba(56,189,248,0.5)",
    states: ["Ekiti", "Lagos", "Ogun", "Ondo", "Osun", "Oyo"],
    captain: "Ayotunde Bello",
    form: ["W", "D", "W", "W", "W"],
    seed: 6,
    blurb: "Coastal swagger and a academy pipeline that never stops producing.",
  },
];

export const FCT = {
  id: "fct",
  name: "FCT Abuja",
  short: "FCT",
  team: "Capital Guardians",
  color: "#f4c430",
  glow: "rgba(244,196,48,0.7)",
  blurb:
    "The seat of the nation and the beating centre of the PYUC — where the six zones converge as one.",
};

/** Royalty-free imagery (Unsplash). Used as CSS backgrounds so failures degrade to gradients. */
export const IMG = {
  heroPoster:
    "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1920&q=80",
  crowd:
    "https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&w=1600&q=80",
  stadium:
    "https://images.unsplash.com/photo-1540552965541-49da2f5ab30c?auto=format&fit=crop&w=1600&q=80",
  celebrate:
    "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=1600&q=80",
  ball:
    "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1200&q=80",
  player:
    "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=1200&q=80",
  boots:
    "https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&w=1200&q=80",
  fans:
    "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?auto=format&fit=crop&w=1200&q=80",
  action:
    "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=1600&q=80",
  youth:
    "https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?auto=format&fit=crop&w=1200&q=80",
};

/** Hero background video (Mixkit — free to use). Progressive enhancement over the poster. */
export const HERO_VIDEO =
  "https://assets.mixkit.co/videos/preview/mixkit-soccer-player-training-alone-42631-large.mp4";
