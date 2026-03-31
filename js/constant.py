import json


def convertNew(json_data):
    import math

    DIFF_MAP = {
        "Clear": "CL",
        "Cloudburst": "CB",
        "Sprinkle": "SK",
        "Drizzle": "DZ",
        "Cloudburst_Story": "CB_S",
        "Sprinkle_Story": "SK_S",
        "Drizzle_Story": "DZ_S",
        "Special": "SP"
    }

    def has(v):
        return v is not None and v != ""

    def def_value(k, obj):
        if k == "yct":
            v = obj.get("constantv3")
            if has(v):
                return math.ceil(float(v) * 20)
            return None

        if k == "ad":
            return 0

        if k == "ae" or k == "af":
            return 1

        if k == "ag":
            return 0

        return None

    constants = {}

    for title, song in json_data.items():
        diffs = song.get("difficulty", {}) or {}

        for diff, chart in diffs.items():
            chart_id = chart.get("chartid")

            if not has(chart_id):
                continue

            rader = chart.get("raderValue")

            obj = {
                "constant": chart.get("difficultyValue"),
                "constantv3": chart.get("difficultyValuev2"),
                "category": DIFF_MAP.get(diff, diff),
                "name": title,
                "yct": chart.get("AFDValue"),
                "ad": rader[0] if (rader and len(rader) > 0) else None,
                "ae": rader[1] if (rader and len(rader) > 1) else None,
                "af": rader[2] if (rader and len(rader) > 2) else None,
                "ag": rader[3] if (rader and len(rader) > 3) else None,
            }

            for k in ["constant", "constantv3", "category", "name", "yct", "ad", "ae", "af", "ag"]:
                if not has(obj.get(k)):
                    v = def_value(k, obj)
                    if v is not None:
                        obj[k] = v

            constants[chart_id] = obj

    return constants


def main():
    with open("../resources/resources.json", "r", encoding="utf-8") as f:
        data = json.load(f)

    constants = convertNew(data)

    with open("./constant.js", "w", encoding="utf-8") as f:
        f.write("const constants = ")
        json.dump(constants, f, ensure_ascii=False, separators=(',', ':'))
        f.write(";\n")


if __name__ == "__main__":
    main()