import json
import os
from PIL import Image

# === SETTINGS ===
SPRITE_ATLAS_JSON = "./src/assets/atlas/spritesheet.json"
SPRITE_FOLDER = "./src/assets/normalmaps"
NORMAL_SUFFIX = "_n"
OUTPUT_ATLAS = "./src/assets/atlas/normalmapsheet.png"

# === LOAD ATLAS ===
with open(SPRITE_ATLAS_JSON, "r", encoding="utf-8") as f:
    atlas_data = json.load(f)

texture_data = atlas_data["textures"][0]
frames = texture_data["frames"]

base_atlas = Image.open("./src/assets/atlas/spritesheet.png")
atlas_image = Image.new("RGBA", base_atlas.size, (0, 0, 0, 0))

missing = []

# === ASSEMBLY ===
for frame_data in frames:
    name = frame_data["filename"]
    frame = frame_data["frame"]

    base_name = os.path.splitext(name)[0]
    normal_name = base_name + NORMAL_SUFFIX + ".png"
    normal_path = os.path.join(SPRITE_FOLDER, normal_name)

    if os.path.exists(normal_path):
        try:
            normal_img = Image.open(normal_path).convert("RGBA")
            normal_resized = normal_img.resize((frame["w"], frame["h"]))
            atlas_image.paste(normal_resized, (frame["x"], frame["y"]))
            print(f"✅ Added: {normal_name}")
        except Exception as e:
            print(f"⚠️ Error with {normal_name}: {e}")
    else:
        missing.append(normal_name)

# === SAVE ===
atlas_image.save(OUTPUT_ATLAS)
print(f"\n🎯 Atlas succesfully created: {OUTPUT_ATLAS}")

if missing:
    print("\n⚠️ Absent normalmaps for:")
    for m in missing:
        print("  -", m)
else:
    print("✅ All normalmaps find!")

