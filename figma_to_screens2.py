#!/usr/bin/env python3
"""
figma_to_screens2.py
Fetches all 29 frames from Figma page "Page 1.2 - 27.03.2026"
and generates pixel-accurate HTML files in screens2/
Each file uses absolute positioning based on Figma absoluteBoundingBox.
"""

import os
import json
import math
import re
import urllib.request
import urllib.parse
import time

FIGMA_TOKEN = os.environ.get("FIGMA_API_KEY", "")
FILE_KEY = "iaEhGu1Guoo4vbQW63BDmz"
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

SCREENS = [
    ("ep1", "a1-idle",               "33:34262", "EP1 · A1 · Idle"),
    ("ep1", "a2-channel-select",     "33:35624", "EP1 · A2 · Channel Select"),
    ("ep1", "a3-validation",         "33:43998", "EP1 · A3 · Validation"),
    ("ep1", "a4-progress",           "33:44588", "EP1 · A4 · Progress"),
    ("ep1", "a5-success",            "33:32482", "EP1 · A5 · Success"),
    ("ep1", "b1-mixed-state",        "33:33051", "EP1 · B1 · Mixed State"),
    ("ep1", "b2-error-detail",       "33:33658", "EP1 · B2 · Error Detail"),
    ("ep1", "b3-builder-highlight",  "33:34863", "EP1 · B3 · Builder Highlight"),
    ("ep1", "b4-ready-retry",        "33:31249", "EP1 · B4 · Ready / Retry"),
    ("ep1", "c1-all-published",      "33:31854", "EP1 · C1 · All Published"),
    ("ep1", "c2-select-unpublish",   "33:36284", "EP1 · C2 · Select Unpublish"),
    ("ep1", "c3-confirm-unpublish",  "33:36969", "EP1 · C3 · Confirm Unpublish"),
    ("ep1", "c4-partial-result",     "33:30166", "EP1 · C4 · Partial Result"),
    ("ep2", "a1-builder-idle",           "33:39446", "EP2 · A1 · Builder Idle"),
    ("ep2", "a2-validation-highlights",  "33:37988", "EP2 · A2 · Validation Highlights"),
    ("ep2", "a3-realtime-update",        "33:39081", "EP2 · A3 · Realtime Update"),
    ("ep2", "a4-channel-unlocked",       "33:37627", "EP2 · A4 · Channel Unlocked"),
    ("ep2", "a5-field-in-other-tab",     "33:38717", "EP2 · A5 · Field in Other Tab"),
    ("ep2", "a6-publishing-from-builder","33:38352", "EP2 · A6 · Publishing from Builder"),
    ("ep3", "s1-default-state",           "33:29724", "EP3 · S1 · Default State"),
    ("ep3", "s2-single-vehicle-modal",   "33:30744", "EP3 · S2 · Single Vehicle Modal"),
    ("ep3", "b1-batch-action-bar",       "33:39807", "EP3 · B1 · Batch Action Bar"),
    ("ep3", "b2-batch-channel-selector", "33:40257", "EP3 · B2 · Batch Channel Selector"),
    ("ep3", "b3-validation-summary",     "33:41356", "EP3 · B3 · Validation Summary"),
    ("ep3", "b3a-fix-issues-builder",    "33:40770", "EP3 · B3a · Fix Issues (Builder)"),
    ("ep3", "b4-batch-progress",         "33:43469", "EP3 · B4 · Batch Progress"),
    ("ep3", "b5-batch-success",          "33:42413", "EP3 · B5 · Batch Success"),
    ("ep3", "b6-batch-partial-errors",   "33:42941", "EP3 · B6 · Batch Partial Errors"),
    ("ep3", "b7-batch-all-failed",       "33:41885", "EP3 · B7 · Batch All Failed"),
]


# ─── Figma API helpers ────────────────────────────────────────────────────────

def figma_get(path):
    url = f"https://api.figma.com{path}"
    req = urllib.request.Request(url, headers={"X-Figma-Token": FIGMA_TOKEN})
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.load(r)


def fetch_node(node_id, depth=10):
    api_id = node_id.replace("-", ":")
    data = figma_get(f"/v1/files/{FILE_KEY}/nodes?ids={urllib.parse.quote(api_id)}&depth={depth}")
    return data["nodes"][api_id]["document"]


# ─── CSS helpers ──────────────────────────────────────────────────────────────

def clamp255(v):
    return max(0, min(255, int(round(v * 255))))


def figma_color_to_css(color, opacity=1.0):
    r = clamp255(color.get("r", 0))
    g = clamp255(color.get("g", 0))
    b = clamp255(color.get("b", 0))
    a = color.get("a", 1.0) * opacity
    if a >= 0.999:
        return f"rgb({r},{g},{b})"
    return f"rgba({r},{g},{b},{a:.3f})"


def figma_gradient_angle(handles):
    """Convert Figma gradient handle positions to CSS angle (degrees)."""
    if len(handles) < 2:
        return 180
    h0, h1 = handles[0], handles[1]
    dx = h1["x"] - h0["x"]
    dy = h1["y"] - h0["y"]
    angle_rad = math.atan2(dx, -dy)
    return round(math.degrees(angle_rad))


def get_background_css(node):
    """Return background CSS string for a node's fills."""
    fills = node.get("fills", [])
    if not fills:
        return ""

    css_parts = []
    for fill in reversed(fills):  # Figma renders first fill on top; CSS bg is layered in reverse
        if fill.get("visible") is False:
            continue
        ftype = fill.get("type", "")
        op = fill.get("opacity", 1.0)

        if ftype == "SOLID":
            css_parts.append(figma_color_to_css(fill["color"], op))

        elif ftype == "GRADIENT_LINEAR":
            handles = fill.get("gradientHandlePositions", [])
            stops = fill.get("gradientStops", [])
            angle = figma_gradient_angle(handles)
            stop_strs = []
            for s in stops:
                c = figma_color_to_css(s["color"], op)
                pct = round(s["position"] * 100)
                stop_strs.append(f"{c} {pct}%")
            if stop_strs:
                css_parts.append(f"linear-gradient({angle}deg,{','.join(stop_strs)})")

        elif ftype == "GRADIENT_RADIAL":
            stops = fill.get("gradientStops", [])
            stop_strs = []
            for s in stops:
                c = figma_color_to_css(s["color"], op)
                pct = round(s["position"] * 100)
                stop_strs.append(f"{c} {pct}%")
            if stop_strs:
                css_parts.append(f"radial-gradient(ellipse at center,{','.join(stop_strs)})")

    if not css_parts:
        return ""
    if len(css_parts) == 1:
        return f"background:{css_parts[0]};"
    return f"background:{','.join(css_parts)};"


def get_border_css(node):
    strokes = node.get("strokes", [])
    if not strokes:
        return ""
    s = strokes[0]
    if s.get("visible") is False:
        return ""
    if s.get("type") == "SOLID":
        sw = node.get("strokeWeight", 1)
        align = node.get("strokeAlign", "INSIDE")
        color = figma_color_to_css(s["color"])
        # INSIDE border → use inset box-shadow instead to avoid layout impact
        if align == "INSIDE":
            return f"box-shadow:inset 0 0 0 {sw}px {color};"
        return f"border:{sw}px solid {color};"
    return ""


def get_radius_css(node):
    r = node.get("cornerRadius")
    if r:
        return f"border-radius:{r}px;"
    radii = node.get("rectangleCornerRadii")
    if radii and any(radii):
        return f"border-radius:{radii[0]}px {radii[1]}px {radii[2]}px {radii[3]}px;"
    return ""


def get_shadow_css(node):
    effects = node.get("effects", [])
    shadows = []
    for e in effects:
        if e.get("visible") is False:
            continue
        if e["type"] == "DROP_SHADOW":
            c = figma_color_to_css(e["color"])
            ox = e.get("offset", {}).get("x", 0)
            oy = e.get("offset", {}).get("y", 0)
            blur = e.get("radius", 0)
            spread = e.get("spread", 0)
            shadows.append(f"{ox}px {oy}px {blur}px {spread}px {c}")
        elif e["type"] == "INNER_SHADOW":
            c = figma_color_to_css(e["color"])
            ox = e.get("offset", {}).get("x", 0)
            oy = e.get("offset", {}).get("y", 0)
            blur = e.get("radius", 0)
            spread = e.get("spread", 0)
            shadows.append(f"inset {ox}px {oy}px {blur}px {spread}px {c}")
    if shadows:
        return f"box-shadow:{';'.join(shadows)};"
    return ""


def css_class_from_name(name):
    """Extract CSS class name from Figma layer name like 'div.class-name'."""
    m = re.match(
        r'^(?:div|span|button|a|input|tr|td|th|table|h[1-6]|p|ul|li|ol|'
        r'header|footer|nav|section|article|aside|main)\.([\w-]+)',
        name
    )
    if m:
        return m.group(1)
    # Fallback: slugify
    slug = re.sub(r'[^\w-]', '-', name.lower()).strip('-')
    slug = re.sub(r'-+', '-', slug)
    return slug[:50] if slug else 'el'


def escape_html(text):
    return (text
            .replace("&", "&amp;")
            .replace("<", "&lt;")
            .replace(">", "&gt;")
            .replace('"', "&quot;"))


# ─── Core node-to-HTML renderer ───────────────────────────────────────────────

def node_to_html(node, parent_bbox, indent=0):
    """Recursively convert a Figma node to HTML string."""
    if node.get("visible") is False:
        return ""

    node_type = node.get("type", "FRAME")
    name = node.get("name", "")
    bbox = node.get("absoluteBoundingBox")

    if bbox is None:
        return ""

    x = bbox["x"] - parent_bbox["x"]
    y = bbox["y"] - parent_bbox["y"]
    w = bbox["width"]
    h = bbox["height"]

    css_class = css_class_from_name(name)
    op = node.get("opacity", 1.0)
    opacity_css = f"opacity:{op:.3f};" if op < 0.999 else ""

    pos_css = f"position:absolute;left:{x:.1f}px;top:{y:.1f}px;width:{w:.1f}px;height:{h:.1f}px;"

    # ── TEXT node ──
    if node_type == "TEXT":
        chars = node.get("characters", "")
        style_data = node.get("style", {})

        ff = style_data.get("fontFamily", "Segoe UI")
        fs = style_data.get("fontSize", 11.5)
        fw = style_data.get("fontWeight", 400)
        lh_px = style_data.get("lineHeightPx")
        lh_css = f"line-height:{lh_px:.1f}px;" if lh_px else ""
        ls = style_data.get("letterSpacing", 0)
        ls_css = f"letter-spacing:{ls:.2f}px;" if ls else ""
        decoration = style_data.get("textDecoration", "NONE")
        deco_css = "text-decoration:underline;" if decoration == "UNDERLINE" else ""

        ta_map = {"LEFT": "left", "CENTER": "center", "RIGHT": "right", "JUSTIFIED": "justify"}
        ta = ta_map.get(style_data.get("textAlignHorizontal", "LEFT"), "left")

        # Text color
        text_color_css = ""
        fills = node.get("fills", [])
        if fills:
            f = fills[0]
            if f.get("visible") is not False and f.get("type") == "SOLID":
                text_color_css = f"color:{figma_color_to_css(f['color'], f.get('opacity',1.0))};"

        # Handle newlines — preserve them
        lines = escape_html(chars).split("\n")
        content = "<br>".join(lines)

        style = (f"{pos_css}overflow:visible;white-space:pre-wrap;"
                 f"font-family:'{ff}',sans-serif;font-size:{fs}px;font-weight:{fw};"
                 f"text-align:{ta};{lh_css}{ls_css}{deco_css}{text_color_css}{opacity_css}")

        return f'<div class="{css_class}" style="{style}">{content}</div>\n'

    # ── VECTOR / BOOLEAN / SHAPE primitives ──
    if node_type in ("VECTOR", "BOOLEAN_OPERATION", "STAR", "POLYGON", "LINE", "ELLIPSE"):
        bg_css = get_background_css(node)
        border_css = get_border_css(node)
        radius_css = get_radius_css(node)
        shadow_css = get_shadow_css(node)
        if node_type == "ELLIPSE" and not radius_css:
            radius_css = "border-radius:50%;"
        style = f"{pos_css}overflow:hidden;{bg_css}{border_css}{radius_css}{shadow_css}{opacity_css}"
        return f'<div class="{css_class}" style="{style}"></div>\n'

    # ── RECTANGLE ──
    if node_type == "RECTANGLE":
        bg_css = get_background_css(node)
        border_css = get_border_css(node)
        radius_css = get_radius_css(node)
        shadow_css = get_shadow_css(node)
        style = f"{pos_css}overflow:hidden;{bg_css}{border_css}{radius_css}{shadow_css}{opacity_css}"
        return f'<div class="{css_class}" style="{style}"></div>\n'

    # ── Container nodes: FRAME, GROUP, COMPONENT, INSTANCE ──
    bg_css = get_background_css(node)
    border_css = get_border_css(node)
    radius_css = get_radius_css(node)
    shadow_css = get_shadow_css(node)

    children_html = ""
    for child in node.get("children", []):
        children_html += node_to_html(child, bbox, indent + 1)

    style = f"{pos_css}overflow:hidden;{bg_css}{border_css}{radius_css}{shadow_css}{opacity_css}"
    ind = "  " * indent
    return f'{ind}<div class="{css_class}" style="{style}">\n{children_html}{ind}</div>\n'


# ─── Full HTML document generation ───────────────────────────────────────────

def generate_html(frame_node, canonical_label):
    bbox = frame_node.get("absoluteBoundingBox", {"x": 0, "y": 0, "width": 1440, "height": 900})
    w = int(bbox["width"])
    h = int(bbox["height"])

    frame_bg = get_background_css(frame_node) or "background:#dce8f0;"

    children_html = ""
    for child in frame_node.get("children", []):
        children_html += node_to_html(child, bbox, 1)

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width={w}">
<title>{escape_html(canonical_label)} — Modera Publishing Tool</title>
<style>
*{{box-sizing:border-box;margin:0;padding:0;}}
html,body{{width:{w}px;height:{h}px;overflow:hidden;font-family:'Segoe UI',system-ui,sans-serif;}}
.screen-root{{position:relative;width:{w}px;height:{h}px;{frame_bg}overflow:hidden;}}
</style>
</head>
<body>
<div class="screen-root">
{children_html}</div>
</body>
</html>"""


# ─── Main ─────────────────────────────────────────────────────────────────────

def main():
    total = len(SCREENS)
    ok = 0
    failed = []

    for i, (ep, filename, node_id, label) in enumerate(SCREENS, 1):
        print(f"[{i:02d}/{total}] {label} ...", end=" ", flush=True)

        out_dir = os.path.join(BASE_DIR, "screens2", ep)
        os.makedirs(out_dir, exist_ok=True)
        out_path = os.path.join(out_dir, f"{filename}.html")

        try:
            frame = fetch_node(node_id, depth=10)
            html = generate_html(frame, label)

            with open(out_path, "w", encoding="utf-8") as f:
                f.write(html)

            size_kb = os.path.getsize(out_path) // 1024
            print(f"✓  {size_kb}KB → screens2/{ep}/{filename}.html")
            ok += 1

        except Exception as e:
            print(f"✗  ERROR: {e}")
            failed.append((label, str(e)))

        # Small delay to avoid hitting Figma rate limits
        if i < total:
            time.sleep(0.3)

    print(f"\n{'='*60}")
    print(f"Done: {ok}/{total} screens generated in screens2/")
    if failed:
        print(f"\nFailed ({len(failed)}):")
        for lbl, err in failed:
            print(f"  • {lbl}: {err}")


if __name__ == "__main__":
    main()
