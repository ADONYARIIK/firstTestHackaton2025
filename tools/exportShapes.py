import json, os

INPUT_DIR = "./src/assets/physics/raw"
OUTPUT_FILE = "./src/assets/physics/shapes.json"

data = {"shapes": {}}

for filename in os.listdir(INPUT_DIR):
    if filename.endswith(".json"):
        name = os.path.splitext(filename)[0]
        with open(os.path.join(INPUT_DIR, filename), "r", encoding="utf-8") as f:
            shape_json = json.load(f)
            data["shapes"][name] = shape_json

with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=4)

print(f"✅ Exported all shapes → {OUTPUT_FILE}")
