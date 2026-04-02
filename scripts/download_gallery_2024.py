import json
import os
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "assets" / "gallery" / "2024"
MANIFEST_PATH = ROOT / "gallery" / "2024" / "images.json"

SPACE_ID = "8c53e86bdead4d3ea5e804057b711e8d"
ALBUM_ID = "c93dd5f82bca44f79412b572ab93890c"
API_KEY = "LightroomMobileWeb1"
BASE_API = f"https://photos.adobe.io/v2/spaces/{SPACE_ID}/"
START_URL = (
    BASE_API
    + f"albums/{ALBUM_ID}/assets?embed=asset&subtype=image%3Bvideo&api_key={API_KEY}"
)


def get_json(url: str) -> dict:
    req = urllib.request.Request(url, headers={"Accept": "application/json"})
    with urllib.request.urlopen(req) as response:
        text = response.read().decode("utf-8", errors="replace")

    if text.startswith("while (1) {}"):
        text = text[len("while (1) {}") :].lstrip()

    return json.loads(text)


def normalize_url(url: str) -> str:
    full = url if url.startswith("http") else BASE_API + url
    if "api_key=" not in full:
        full += ("&" if "?" in full else "?") + f"api_key={API_KEY}"
    return full


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    MANIFEST_PATH.parent.mkdir(parents=True, exist_ok=True)

    url = START_URL
    seen_pages = set()
    assets = {}

    while url and url not in seen_pages:
        seen_pages.add(url)
        payload = get_json(url)

        for item in payload.get("resources", []):
            asset = item.get("asset", {})
            if asset.get("subtype") != "image":
                continue

            links = asset.get("links", {})
            rendition_href = (
                links.get("/rels/rendition_type/1280", {}).get("href")
                or links.get("/rels/rendition_type/640", {}).get("href")
                or links.get("/rels/rendition_type/2048", {}).get("href")
            )

            if not rendition_href:
                continue

            source_name = (
                asset.get("payload", {})
                .get("importSource", {})
                .get("fileName", f"{asset.get('id', 'image')}.jpg")
            )

            assets[asset["id"]] = {
                "href": rendition_href,
                "name": source_name,
            }

        next_href = payload.get("links", {}).get("next", {}).get("href")
        if next_href:
            url = normalize_url(next_href)
        else:
            url = None

    manifest = []
    for index, (asset_id, data) in enumerate(sorted(assets.items(), key=lambda x: x[1]["name"].lower()), start=1):
        ext = os.path.splitext(data["name"])[1].lower()
        if ext not in {".jpg", ".jpeg", ".png", ".webp"}:
            ext = ".jpg"

        local_name = f"{index:03d}-{asset_id}{ext}"
        local_file = OUT_DIR / local_name

        if not local_file.exists():
            image_url = normalize_url(data["href"])
            req = urllib.request.Request(image_url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req) as response, open(local_file, "wb") as file_obj:
                file_obj.write(response.read())

        manifest.append(
            {
                "id": asset_id,
                "src": f"../../assets/gallery/2024/{local_name}",
                "name": data["name"],
            }
        )

    MANIFEST_PATH.write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    print(f"Downloaded {len(manifest)} images")
    print(f"Manifest written to {MANIFEST_PATH}")


if __name__ == "__main__":
    main()
