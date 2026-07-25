#!/usr/bin/env python3
"""Upload remaining files to GitHub using the Contents API (one commit per file)."""
import base64, json, os, subprocess, urllib.parse

OWNER = "mondigrooming-shop"
REPO = "mondi-grooming"
PROJECT_DIR = "/home/user/workspace/mondi-next"
EXCLUDE = {".next", "node_modules", "out", ".git"}
# Already uploaded: package.json
EXCLUDE_FILES = {"push_github.py", "rewrite-paths.sh", ".env.local", "deploy_vercel.py", "upload_phase.py", "package-lock.json", "package.json"}

def curl_json(method, url, data=None):
    cmd = ["curl", "-s", "-X", method, url,
           "-H", "Content-Type: application/json",
           "-H", "Accept: application/vnd.github+json"]
    if data:
        cmd += ["-d", json.dumps(data)]
    result = subprocess.run(cmd, capture_output=True, text=True, timeout=30)
    try:
        return json.loads(result.stdout) if result.stdout else None
    except:
        return None

def collect_files():
    files = []
    for root, dirs, filenames in os.walk(PROJECT_DIR):
        dirs[:] = [d for d in dirs if d not in EXCLUDE]
        for fn in filenames:
            if fn in EXCLUDE_FILES or fn.startswith("screenshot-"):
                continue
            fp = os.path.join(root, fn)
            rp = os.path.relpath(fp, PROJECT_DIR)
            with open(fp, "rb") as f:
                content = f.read()
            files.append({"path": rp, "b64": base64.b64encode(content).decode()})
    return files

files = collect_files()
print(f"Uploading {len(files)} files via Contents API...")

success = 0
for i, f in enumerate(files):
    # URL-encode the path (handles [handle] etc.)
    encoded_path = urllib.parse.quote(f["path"], safe="/")
    url = f"https://api.github.com/repos/{OWNER}/{REPO}/contents/{encoded_path}"

    result = curl_json("PUT", url, {
        "message": f"Add {f['path']}",
        "content": f["b64"],
        "branch": "main"
    })

    if result and ("commit" in result or "content" in result):
        success += 1
        print(f"  [{i+1}/{len(files)}] OK: {f['path']}")
    else:
        print(f"  [{i+1}/{len(files)}] FAIL: {f['path']}")
        if result:
            print(f"    Error: {str(result)[:150]}")

print(f"\nDone: {success}/{len(files)} files uploaded")
print(f"Repo: https://github.com/{OWNER}/{REPO}")
