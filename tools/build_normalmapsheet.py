import json
import os
from PIL import Image

# === SETTINGS ===
SPRITE_ATLAS_JSON = "./src/assets/atlas/spritesheet.json"
SPRITE_ATLAS_IMAGE = "./src/assets/atlas/spritesheet.png"
SPRITE_FOLDER = "./src/assets/normalmaps"
NORMAL_SUFFIX = "_n"

OUTPUT_ATLAS = "./src/assets/atlas/spritesheet_n.png"
OUTPUT_JSON = "./src/assets/atlas/spritesheet_n.json"

# === LOAD ORIGINAL ATLAS ===
with open(SPRITE_ATLAS_JSON, "r", encoding="utf-8") as f:
    atlas_data = json.load(f)

texture_data = atlas_data["textures"][0]
frames = texture_data["frames"]

base_atlas = Image.open(SPRITE_ATLAS_IMAGE)
atlas_image = Image.new("RGBA", base_atlas.size, (0, 0, 0, 0))

missing = []
new_frames = []

# === ASSEMBLY ===
for frame_data in frames:
    name = frame_data["filename"]
    frame = frame_data["frame"]

    base_name = os.path.splitext(name)[0]
    normal_name = base_name + NORMAL_SUFFIX + ".png"
    normal_path = os.path.join(SPRITE_FOLDER, normal_name)

    # Путь к кадру нормали
    new_frame_data = dict(frame_data)  # копируем оригинальные данные
    new_frame_data["filename"] = normal_name

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

    new_frames.append(new_frame_data)

# === SAVE IMAGE ===
atlas_image.save(OUTPUT_ATLAS)
print(f"\n🎯 Normalmap atlas created: {OUTPUT_ATLAS}")

# === CREATE JSON ===
normal_json = {
    "textures": [
        {
            "image": os.path.basename(OUTPUT_ATLAS),
            "format": texture_data.get("format", "RGBA8888"),
            "size": {
                "w": base_atlas.width,
                "h": base_atlas.height
            },
            "scale": texture_data.get("scale", 1),
            "frames": new_frames
        }
    ]
}

with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
    json.dump(normal_json, f, indent=4)

print(f"🧾 JSON saved: {OUTPUT_JSON}")

# === REPORT ===
if missing:
    print("\n⚠️ Missing normalmaps for:")
    for m in missing:
        print("  -", m)
else:
    print("✅ All normalmaps found and exported!")
