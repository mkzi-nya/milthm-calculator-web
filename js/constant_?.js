const constants = {};

const DIFF_MAP = {
  "Clear": "CL",
  "Cloudburst": "CB",
  "Sprinkle": "SK",
  "Drizzle": "DZ",
  "Cloudburst_Story": "CB_S",
  "Sprinkle_Story": "SK_S",
  "Drizzle_Story": "DZ_S",
  "Special": "SP"
};

function has(v) {
  return v !== undefined && v !== null && v !== "";
}

function def(k, obj) {
  if (k === "yct") {
    const v = obj.constantv3;
    if (has(v)) return Math.ceil(Number(v) * 20);
    return;
  }
  if (k === "ad") return 0;
  if (k === "ae" || k === "af") return 1;
  if (k === "ag") return 0;
}

fetch("../resources/resources.json")
  .then(r => r.json())
  .then(data => {
    for (const [title, song] of Object.entries(data)) {
      const diffs = song.difficulty || {};
      for (const [diff, chart] of Object.entries(diffs)) {
        const id = chart.chartid;
        if (!has(id)) continue;

        const obj = {
          constant: chart.difficultyValue,
          constantv3: chart.difficultyValuev2,
          category: DIFF_MAP[diff] || diff,
          name: title,
          yct: chart.AFDValue,
          ad: chart.raderValue && chart.raderValue[0],
          ae: chart.raderValue && chart.raderValue[1],
          af: chart.raderValue && chart.raderValue[2],
          ag: chart.raderValue && chart.raderValue[3]
        };

        for (const k of ["constant","constantv3","category","name","yct","ad","ae","af","ag"]) {
          if (!has(obj[k])) {
            const v = def(k, obj);
            if (v !== undefined) obj[k] = v;
          }
        }

        constants[id] = obj;
      }
    }
    console.log(constants);
  });