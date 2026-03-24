#!/usr/bin/env python3
"""Generate all static screen HTML files for Modera Publishing Tool prototype."""
import os

BASE = "/root/EXPERIMENTS/Modera"
CSS_PATH = "../../prototype/shared"

def wrap(title, state_label, body_html, ep_class="ep1"):
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=1280">
<title>{title} — Modera Publishing Tool</title>
<link rel="stylesheet" href="{CSS_PATH}/tokens.css">
<link rel="stylesheet" href="{CSS_PATH}/components.css">
<style>
html,body{{height:100%;overflow:hidden;}}
.page-wrap{{display:flex;flex-direction:column;height:100vh;}}
.bg-dimmed{{filter:brightness(0.82);pointer-events:none;}}
.modal-overlay{{position:fixed;inset:0;background:rgba(20,40,60,0.55);z-index:100;display:flex;align-items:center;justify-content:center;}}
.spec-table{{width:100%;font-size:11px;border-collapse:collapse;}}
.spec-table td{{padding:3px 0;border-bottom:1px solid #eef2f5;}}
.spec-table td:first-child{{color:var(--text-muted);width:45%;}}
.screen-label{{position:fixed;top:6px;right:8px;background:rgba(20,40,60,0.8);color:#7de0f8;font-size:10px;padding:2px 8px;border-radius:10px;z-index:400;}}
</style>
</head>
<body>
<div class="screen-label">{state_label}</div>
<div class="page-wrap">
  <div class="modera-topnav bg-dimmed">
    <div class="modera-topnav__logo">MODERA</div>
    <div class="modera-topnav__module">Salesfront</div>
    <div class="modera-topnav__right">
      <span class="pub-status-pill pub-status-pill--idle">Publishing</span>
      <span class="topnav-icon">🔔</span>
      <span class="topnav-username">J. Tamm ▾</span>
    </div>
  </div>
  <div class="modera-subnav bg-dimmed">
    <a class="subnav-tab subnav-tab--active">Inventory</a>
    <a class="subnav-tab">Customers</a>
    <a class="subnav-tab">Deals</a>
  </div>
  <div style="flex:1;background:var(--page-bg);padding:10px;filter:brightness(0.82);pointer-events:none;overflow:hidden;">
    <table class="inv-table" style="width:100%;font-size:11px;">
      <thead><tr>
        <th style="width:30px;"><input type="checkbox" class="jq-check"></th>
        <th>Vehicle</th><th>Year</th><th>Reg. no.</th><th>Price</th><th>Channels</th><th>Status</th>
      </tr></thead>
      <tbody>
        <tr><td><input type="checkbox" class="jq-check"></td><td style="font-weight:600;">VW Golf 1.6 TDI</td><td>2019</td><td>ABC-123</td><td>€14,500</td><td><span class="ch-dot ch-dot--unpublished"></span><span class="ch-dot ch-dot--unpublished"></span><span class="ch-dot ch-dot--unpublished"></span></td><td><span class="status-badge status-badge--unpub">Unpublished</span></td></tr>
        <tr><td><input type="checkbox" class="jq-check"></td><td style="font-weight:600;">Toyota RAV4 2.0</td><td>2021</td><td>XYZ-789</td><td>€28,900</td><td><span class="ch-dot ch-dot--published"></span><span class="ch-dot ch-dot--published"></span><span class="ch-dot ch-dot--published"></span></td><td><span class="status-badge status-badge--pub">Published</span></td></tr>
      </tbody>
    </table>
  </div>
</div>
{body_html}
</body>
</html>"""

def ep1_modal_wrap(tab_content, state_label, subtitle="Publishing channels"):
    return f"""
<div class="modal-overlay">
  <div class="vc-modal">
    <div class="vc-modal__header">
      <div>
        <div class="vc-modal__title">2019 Volkswagen Golf 1.6 TDI — ABC-123</div>
        <div class="vc-modal__subtitle">Stock #VG-2019-001 · Added 12 Jan 2024</div>
      </div>
      <button class="vc-modal__close">✕</button>
    </div>
    <div class="vc-tabs">
      <div class="vc-tab">Extras</div>
      <div class="vc-tab">Trade-In</div>
      <div class="vc-tab">Notes</div>
      <div class="vc-tab">Details</div>
      <div class="vc-tab vc-tab--active">Publishing</div>
    </div>
    <div class="vc-modal__body">
      <div style="width:200px;flex-shrink:0;">
        <div style="width:100%;aspect-ratio:4/3;background:linear-gradient(135deg,#d0e8f4,#a8c8dc);border-radius:3px;display:flex;align-items:center;justify-content:center;color:#8aabbd;flex-direction:column;gap:6px;margin-bottom:10px;">
          <svg width="40" height="30" viewBox="0 0 40 30"><path d="M5 20 L8 12 L12 10 L28 10 L32 12 L35 20 L35 25 L5 25 Z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="25" r="3" fill="currentColor"/><circle cx="28" cy="25" r="3" fill="currentColor"/></svg>
          <span style="font-size:10px;">No photo</span>
        </div>
        <table class="spec-table">
          <tr><td>Make</td><td><strong>Volkswagen</strong></td></tr>
          <tr><td>Model</td><td>Golf 1.6 TDI</td></tr>
          <tr><td>Year</td><td>2019</td></tr>
          <tr><td>Mileage</td><td>78,200 km</td></tr>
          <tr><td>Fuel</td><td>Diesel</td></tr>
          <tr><td>Price</td><td><strong>€14,500</strong></td></tr>
        </table>
      </div>
      <div style="flex:1;">{tab_content}</div>
    </div>
    <div class="vc-modal__footer">
      <button class="jq-btn">Close</button>
      <div style="flex:1;"></div>
      <span style="font-size:10.5px;color:#5a7080;">State: {state_label}</span>
    </div>
  </div>
</div>"""

def ch_row(dot_type, name, status_cls, status_txt, extra=""):
    return f"""<div class="ch-row">
              <span class="ch-dot ch-dot--{dot_type}"></span>
              <div>
                <div class="ch-name">{name}</div>
                <div class="ch-status-text ch-status-text--{status_cls}">{status_txt}</div>
                {extra}
              </div>
            </div>"""

def completeness_bar(pct, warn=False):
    cls = "good" if pct >= 95 else "warn" if pct >= 80 else "error"
    w = f'<span style="color:#b07820;font-size:10px;">⚠</span>' if warn else ''
    return f"""<div class="completeness-row" style="margin-top:3px;">
                  <div class="val-bar" style="width:80px;"><div class="val-bar__fill val-bar__fill--{cls}" style="width:{pct}%;"></div></div>
                  <span style="font-size:10px;color:#7a9aaa;min-width:24px;">{pct}%</span>
                  {w}
                </div>"""

# ─── EP1 screens ─────────────────────────────────────────────────────────────

def make_ep1_a2():
    panel = f"""<div class="pub-panel">
          <div class="pub-panel__header">
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <span class="pub-panel__title">Select channels to publish</span>
              <div style="display:flex;gap:8px;"><span class="link">Select all</span><span class="link">Deselect all</span></div>
            </div>
          </div>
          <div class="pub-panel__body">
            {''.join([f"""<div class="ch-row">
              <input type="checkbox" class="jq-check" {'checked' if ch[2] else ''}>
              <div><div class="ch-name">{ch[0]}</div><div style="font-size:10.5px;color:#5a7080;">{ch[1]}</div></div>
              <div style="font-size:10px;color:#7a9aaa;">{ch[3]}%</div>
            </div>""" for ch in [('Auto24','auto24.ee',True,96),('Mobile.de','mobile.de',True,100),('SS.lv','ss.lv',True,74),('Autoplius','autoplius.lt',True,88),('City24','city24.ee',False,91)]])}
          </div>
          <div class="pub-panel__footer">
            <button class="jq-btn">Cancel</button>
            <button class="jq-btn jq-btn--primary">Publish 4 channels →</button>
          </div>
        </div>"""
    return wrap("EP1 · A-2 · Channel Select", "EP1 · A2 · Channel Select",
                ep1_modal_wrap(panel, "A2 · Channel Select"))

def make_ep1_a3():
    panel = f"""<div class="pub-panel">
          <div class="pub-panel__header">
            <span class="pub-panel__title" style="color:#b07820;">⚠ Validation warnings</span>
          </div>
          <div class="pub-panel__body">
            <div class="ch-row">
              <span class="ch-dot ch-dot--published"></span>
              <div>
                <div class="ch-name">Auto24</div>
                {completeness_bar(96)}
                <div class="ch-status-text ch-status-text--pub" style="margin-top:2px;">✓ Ready</div>
              </div>
            </div>
            <div class="ch-row">
              <span class="ch-dot ch-dot--published"></span>
              <div>
                <div class="ch-name">Mobile.de</div>
                {completeness_bar(100)}
                <div class="ch-status-text ch-status-text--pub" style="margin-top:2px;">✓ Ready (100%)</div>
              </div>
            </div>
            <div class="ch-row">
              <span class="ch-dot ch-dot--published"></span>
              <div>
                <div class="ch-name">SS.lv</div>
                {completeness_bar(74)}
                <div class="ch-status-text ch-status-text--pub" style="margin-top:2px;">✓ Accepts partial</div>
              </div>
            </div>
            <div class="ch-row">
              <span class="ch-dot ch-dot--pending"></span>
              <div>
                <div class="ch-name">Autoplius</div>
                {completeness_bar(88, warn=True)}
                <div class="ch-status-text ch-status-text--pend" style="margin-top:2px;">⚠ Requires 100% — Missing:</div>
                <div style="font-size:10.5px;color:#7a5010;padding-left:8px;">· Interior color<br>· Doors count</div>
                <button class="jq-btn jq-btn--sm" style="margin-top:4px;font-size:10px;">Go to Vehicle Builder →</button>
              </div>
            </div>
          </div>
          <div class="pub-panel__footer">
            <button class="jq-btn">← Back</button>
            <button class="jq-btn jq-btn--primary">Publish anyway (3 of 4) →</button>
          </div>
        </div>"""
    return wrap("EP1 · A-3 · Validation Warnings", "EP1 · A3 · Validation",
                ep1_modal_wrap(panel, "A3 · Validation"))

def make_ep1_a4():
    panel = """<div class="pub-panel">
          <div class="pub-panel__header">
            <span class="pub-panel__title">⟳ Publishing… (2/4)</span>
          </div>
          <div class="pub-panel__body">
            <div style="margin-bottom:10px;">
              <div class="overall-progress"><div class="overall-progress__fill" style="width:50%;"></div></div>
              <div style="font-size:10.5px;color:#5a7080;margin-top:3px;text-align:right;">50%</div>
            </div>
            <div class="ch-row"><span class="ch-dot ch-dot--published"></span><div><div class="ch-name">Auto24</div><div class="ch-status-text ch-status-text--pub">✓ Published</div></div></div>
            <div class="ch-row"><span class="ch-dot ch-dot--published"></span><div><div class="ch-name">Mobile.de</div><div class="ch-status-text ch-status-text--pub">✓ Published</div></div></div>
            <div class="ch-row"><span class="ch-dot ch-dot--pending"></span><div><div class="ch-name">SS.lv</div><div class="ch-status-text ch-status-text--pend">⟳ Sending…</div></div></div>
            <div class="ch-row"><span class="ch-dot ch-dot--unpublished"></span><div><div class="ch-name">Autoplius</div><div class="ch-status-text ch-status-text--unpub">Waiting…</div></div></div>
          </div>
          <div class="pub-panel__footer">
            <button class="jq-btn jq-btn--disabled" disabled>Please wait…</button>
          </div>
        </div>"""
    return wrap("EP1 · A-4 · Publishing In Progress", "EP1 · A4 · In Progress",
                ep1_modal_wrap(panel, "A4 · In Progress"))

def make_ep1_a5():
    panel = """<div class="pub-panel">
          <div class="pub-panel__header" style="background:linear-gradient(180deg,#d4f0da,#b8e4c4);">
            <span class="pub-panel__title" style="color:#1a5a30;">✓ Published successfully</span>
          </div>
          <div class="pub-panel__body">
            <div class="ch-row"><span class="ch-dot ch-dot--published"></span><div><div class="ch-name">Auto24</div><div class="ch-status-text ch-status-text--pub">● Published · Today, 14:32</div></div><button class="jq-btn jq-btn--xs" title="View live listing" style="opacity:0.6;">↗ View</button></div>
            <div class="ch-row"><span class="ch-dot ch-dot--published"></span><div><div class="ch-name">Mobile.de</div><div class="ch-status-text ch-status-text--pub">● Published · Today, 14:32</div></div><button class="jq-btn jq-btn--xs" style="opacity:0.6;">↗ View</button></div>
            <div class="ch-row"><span class="ch-dot ch-dot--published"></span><div><div class="ch-name">SS.lv</div><div class="ch-status-text ch-status-text--pub">● Published · Today, 14:32</div></div><button class="jq-btn jq-btn--xs" style="opacity:0.6;">↗ View</button></div>
            <div class="ch-row"><span class="ch-dot ch-dot--published"></span><div><div class="ch-name">Autoplius</div><div class="ch-status-text ch-status-text--pub">● Published · Today, 14:32</div></div><button class="jq-btn jq-btn--xs" style="opacity:0.6;">↗ View</button></div>
          </div>
          <div class="pub-panel__footer">
            <button class="jq-btn" style="color:#b03030;">Unpublish from channels…</button>
          </div>
        </div>"""
    return wrap("EP1 · A-5 · Published Successfully", "EP1 · A5 · Success",
                ep1_modal_wrap(panel, "A5 · Success"))

def make_ep1_b1():
    panel = """<div class="pub-panel">
          <div class="pub-panel__header">
            <div class="pub-panel__title">Publishing channels</div>
            <div style="font-size:10.5px;margin-top:3px;display:flex;gap:8px;">
              <span style="color:#b03030;">2 errors</span> <span style="color:#8a9aaa;">·</span>
              <span style="color:#2d8a4e;">2 published</span> <span style="color:#8a9aaa;">·</span>
              <span style="color:#8a9aaa;">1 pending</span>
            </div>
          </div>
          <div class="pub-panel__body">
            <div class="ch-row"><span class="ch-dot ch-dot--published"></span><div><div class="ch-name">Auto24</div><div class="ch-status-text ch-status-text--pub">● Published · 2 days ago</div></div></div>
            <div class="ch-row" style="cursor:pointer;"><span class="ch-dot ch-dot--error"></span><div><div class="ch-name">Mobile.de</div><div class="ch-status-text ch-status-text--err">✕ Error · Click to expand</div></div><button class="jq-btn jq-btn--xs" style="color:#b03030;">›</button></div>
            <div class="ch-row"><span class="ch-dot ch-dot--published"></span><div><div class="ch-name">SS.lv</div><div class="ch-status-text ch-status-text--pub">● Published · 2 days ago</div></div></div>
            <div class="ch-row"><span class="ch-dot ch-dot--unpublished"></span><div><div class="ch-name">Autoplius</div><div class="ch-status-text ch-status-text--unpub">○ Not published</div></div></div>
            <div class="ch-row" style="cursor:pointer;"><span class="ch-dot ch-dot--error"></span><div><div class="ch-name">City24</div><div class="ch-status-text ch-status-text--err">✕ Error · Click to expand</div></div><button class="jq-btn jq-btn--xs" style="color:#b03030;">›</button></div>
          </div>
          <div class="pub-panel__footer">
            <button class="jq-btn jq-btn--red">Fix errors</button>
            <button class="jq-btn jq-btn--primary">Publish remaining →</button>
          </div>
        </div>"""
    return wrap("EP1 · B-1 · Mixed State", "EP1 · B1 · Mixed State",
                ep1_modal_wrap(panel, "B1 · Mixed State"))

def make_ep1_b2():
    panel = """<div class="pub-panel">
          <div class="pub-panel__header">
            <div class="pub-panel__title" style="color:#b03030;">Error details</div>
          </div>
          <div class="pub-panel__body">
            <div class="ch-row"><span class="ch-dot ch-dot--error"></span><div><div class="ch-name">Mobile.de</div><div class="ch-status-text ch-status-text--err">✕ Publishing failed</div></div><button class="jq-btn jq-btn--xs" style="color:#b03030;">▾</button></div>
            <div style="background:#fff0f0;border:1px solid #e0a0a0;border-radius:3px;padding:8px 10px;margin:0 0 6px 16px;">
              <div style="font-size:11.5px;color:#801010;font-weight:700;margin-bottom:4px;">Publishing failed</div>
              <div style="font-size:11px;color:#a03030;margin-bottom:6px;">Missing required fields:<br><strong>· Mileage (km)</strong><br><strong>· Fuel type</strong></div>
              <div style="display:flex;gap:5px;">
                <button class="jq-btn jq-btn--sm jq-btn--primary">Go to Vehicle Builder →</button>
                <button class="jq-btn jq-btn--sm">Retry channel</button>
              </div>
            </div>
            <div class="ch-row"><span class="ch-dot ch-dot--published"></span><div><div class="ch-name">Auto24</div><div class="ch-status-text ch-status-text--pub">● Published</div></div></div>
            <div class="ch-row"><span class="ch-dot ch-dot--published"></span><div><div class="ch-name">SS.lv</div><div class="ch-status-text ch-status-text--pub">● Published</div></div></div>
            <div class="ch-row"><span class="ch-dot ch-dot--unpublished"></span><div><div class="ch-name">Autoplius</div><div class="ch-status-text ch-status-text--unpub">○ Not published</div></div></div>
            <div class="ch-row"><span class="ch-dot ch-dot--error"></span><div><div class="ch-name">City24</div><div class="ch-status-text ch-status-text--err">✕ Publishing failed</div></div><button class="jq-btn jq-btn--xs" style="color:#b03030;">›</button></div>
          </div>
          <div class="pub-panel__footer">
            <button class="jq-btn">← Back</button>
            <button class="jq-btn jq-btn--primary">Go to Vehicle Builder →</button>
          </div>
        </div>"""
    return wrap("EP1 · B-2 · Error Detail", "EP1 · B2 · Error Detail",
                ep1_modal_wrap(panel, "B2 · Error Detail"))

def make_ep1_b3():
    # Builder highlight state – show builder form with banner overlay
    content = """
<div class="modal-overlay">
  <div class="vc-modal" style="width:900px;max-width:98vw;">
    <div class="vc-modal__header">
      <div>
        <div class="vc-modal__title">Vehicle Builder — VW Golf 1.6 TDI (ABC-123)</div>
        <div class="vc-modal__subtitle">Complete highlighted fields to publish on Mobile.de</div>
      </div>
      <button class="vc-modal__close">✕</button>
    </div>
    <div style="background:linear-gradient(180deg,#fff3cd,#feeaa0);border-bottom:1px solid #e0c060;padding:7px 14px;font-size:11.5px;color:#7a5010;display:flex;align-items:center;gap:7px;">
      ⚠ Complete these fields to publish on Mobile.de
      <div style="flex:1;"></div>
      <button class="jq-btn jq-btn--sm">← Back to Publishing</button>
    </div>
    <div style="display:flex;flex:1;overflow:hidden;max-height:60vh;">
      <div style="flex:1;overflow-y:auto;padding:14px;background:var(--content-bg);">
        <div class="builder-section" style="background:#fff;border:1px solid var(--border);border-radius:3px;margin-bottom:10px;">
          <div style="background:linear-gradient(180deg,#eef6fb,#e0edf5);padding:6px 10px;border-bottom:1px solid var(--border);font-size:11.5px;font-weight:700;">Technical data</div>
          <div style="padding:10px;">
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;">
              <div>
                <label class="jq-label" style="color:#b03030;">Mileage (km) *</label>
                <input class="jq-input builder-form__field--highlighted" placeholder="e.g. 78200" type="number">
                <div style="font-size:10px;color:#b03030;margin-top:2px;">Required by Mobile.de</div>
              </div>
              <div>
                <label class="jq-label" style="color:#b03030;">Fuel type *</label>
                <select class="jq-select builder-form__field--highlighted">
                  <option value="">Select fuel type…</option>
                  <option>Diesel</option><option>Petrol</option><option>Hybrid</option>
                </select>
                <div style="font-size:10px;color:#b03030;margin-top:2px;">Required by Mobile.de</div>
              </div>
              <div>
                <label class="jq-label">Engine (cc)</label>
                <input class="jq-input" value="1598" type="number">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="width:260px;flex-shrink:0;padding:10px;background:var(--page-bg);border-left:1px solid var(--border);">
        <div class="pub-panel">
          <div class="pub-panel__header" style="background:#fff3cd;border:none;">
            <div style="font-size:11px;color:#7a5010;font-weight:600;">⚠ Missing for Mobile.de</div>
          </div>
          <div class="pub-panel__body">
            <div style="font-size:10.5px;color:#b03030;">· Mileage (km)</div>
            <div style="font-size:10.5px;color:#b03030;">· Fuel type</div>
          </div>
          <div class="pub-panel__footer">
            <button class="jq-btn jq-btn--sm">← Back</button>
            <button class="jq-btn jq-btn--sm jq-btn--green">Save & Return →</button>
          </div>
        </div>
      </div>
    </div>
    <div style="padding:8px 14px;border-top:1px solid var(--border);background:linear-gradient(180deg,#f0f6fa,#e4edf5);display:flex;gap:8px;align-items:center;">
      <button class="jq-btn">← Back to Publishing</button>
      <div style="flex:1;"></div>
      <button class="jq-btn jq-btn--green">Save & Return to Publishing</button>
    </div>
  </div>
</div>"""
    return wrap("EP1 · B-3 · Builder Highlight", "EP1 · B3 · Builder Highlight", content)

def make_ep1_b4():
    panel = """<div class="pub-panel">
          <div class="pub-panel__header">
            <div class="pub-panel__title" style="color:#2d8a4e;">✓ Fields updated · Ready to republish</div>
          </div>
          <div class="pub-panel__body">
            <div class="ch-row"><span class="ch-dot ch-dot--published"></span><div><div class="ch-name">Auto24</div><div class="ch-status-text ch-status-text--pub">● Published</div></div></div>
            <div class="ch-row"><span class="ch-dot ch-dot--pending"></span><div><div class="ch-name">Mobile.de</div><div class="ch-status-text ch-status-text--pend">○ Ready to retry</div></div><button class="jq-btn jq-btn--xs jq-btn--primary">Retry</button></div>
            <div class="ch-row"><span class="ch-dot ch-dot--published"></span><div><div class="ch-name">SS.lv</div><div class="ch-status-text ch-status-text--pub">● Published</div></div></div>
            <div class="ch-row"><span class="ch-dot ch-dot--unpublished"></span><div><div class="ch-name">Autoplius</div><div class="ch-status-text ch-status-text--unpub">○ Not published</div></div></div>
            <div class="ch-row"><span class="ch-dot ch-dot--pending"></span><div><div class="ch-name">City24</div><div class="ch-status-text ch-status-text--pend">○ Ready to retry</div></div><button class="jq-btn jq-btn--xs jq-btn--primary">Retry</button></div>
          </div>
          <div class="pub-panel__footer">
            <button class="jq-btn jq-btn--primary">Retry all failed channels</button>
          </div>
        </div>"""
    return wrap("EP1 · B-4 · Ready Retry", "EP1 · B4 · Ready Retry",
                ep1_modal_wrap(panel, "B4 · Ready Retry"))

def make_ep1_c1():
    panel = """<div class="pub-panel">
          <div class="pub-panel__header" style="background:linear-gradient(180deg,#d4f0da,#b8e4c4);">
            <span class="pub-panel__title" style="color:#1a5a30;">✓ Published on all channels</span>
          </div>
          <div class="pub-panel__body">
            <div class="ch-row"><span class="ch-dot ch-dot--published"></span><div><div class="ch-name">Auto24</div><div class="ch-status-text ch-status-text--pub">● Published · Today, 14:32</div></div><button class="jq-btn jq-btn--xs" title="View live">↗ View</button></div>
            <div class="ch-row"><span class="ch-dot ch-dot--published"></span><div><div class="ch-name">Mobile.de</div><div class="ch-status-text ch-status-text--pub">● Published · Today, 14:32</div></div><button class="jq-btn jq-btn--xs">↗ View</button></div>
            <div class="ch-row"><span class="ch-dot ch-dot--published"></span><div><div class="ch-name">SS.lv</div><div class="ch-status-text ch-status-text--pub">● Published · Today, 14:32</div></div><button class="jq-btn jq-btn--xs">↗ View</button></div>
            <div class="ch-row"><span class="ch-dot ch-dot--published"></span><div><div class="ch-name">Autoplius</div><div class="ch-status-text ch-status-text--pub">● Published · Today, 14:32</div></div><button class="jq-btn jq-btn--xs">↗ View</button></div>
            <div class="ch-row"><span class="ch-dot ch-dot--published"></span><div><div class="ch-name">City24</div><div class="ch-status-text ch-status-text--pub">● Published · Today, 14:32</div></div><button class="jq-btn jq-btn--xs">↗ View</button></div>
          </div>
          <div class="pub-panel__footer">
            <button class="jq-btn" style="color:#b03030;">Unpublish from channels…</button>
          </div>
        </div>"""
    return wrap("EP1 · C-1 · All Published", "EP1 · C1 · All Published",
                ep1_modal_wrap(panel, "C1 · All Published"))

def make_ep1_c2():
    panel = """<div class="pub-panel">
          <div class="pub-panel__header">
            <span class="pub-panel__title">Select channels to unpublish</span>
          </div>
          <div class="pub-panel__body">
            <div class="ch-row"><input type="checkbox" class="jq-check"><div><div class="ch-name">Auto24</div><div class="ch-status-text ch-status-text--pub">● Published</div></div></div>
            <div class="ch-row"><input type="checkbox" class="jq-check"><div><div class="ch-name">Mobile.de</div><div class="ch-status-text ch-status-text--pub">● Published</div></div></div>
            <div class="ch-row"><input type="checkbox" class="jq-check"><div><div class="ch-name">SS.lv</div><div class="ch-status-text ch-status-text--pub">● Published</div></div></div>
            <div class="ch-row"><input type="checkbox" class="jq-check" checked><div><div class="ch-name">Autoplius</div><div class="ch-status-text ch-status-text--pub">● Published</div></div></div>
            <div class="ch-row"><input type="checkbox" class="jq-check" checked><div><div class="ch-name">City24</div><div class="ch-status-text ch-status-text--pub">● Published</div></div></div>
          </div>
          <div class="pub-panel__footer">
            <button class="jq-btn">Cancel</button>
            <button class="jq-btn jq-btn--red">Unpublish 2 channels →</button>
          </div>
        </div>"""
    return wrap("EP1 · C-2 · Select Unpublish", "EP1 · C2 · Select Unpublish",
                ep1_modal_wrap(panel, "C2 · Select Unpublish"))

def make_ep1_c3():
    panel = """<div class="pub-panel">
          <div class="pub-panel__header">
            <span class="pub-panel__title" style="color:#b03030;">Confirm unpublish</span>
          </div>
          <div class="pub-panel__body">
            <div class="alert alert--warn">
              <svg width="14" height="14" viewBox="0 0 12 12" style="flex-shrink:0;color:#b07820;"><path d="M6 1.5L11 10H1L6 1.5Z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M6 4.5v2.5M6 8.5v.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
              <div>
                <div style="font-weight:700;margin-bottom:3px;">Unpublish from 2 channels?</div>
                <div>· Autoplius (autoplius.lt)</div>
                <div>· City24 (city24.ee)</div>
                <div style="margin-top:5px;font-size:10.5px;">This will remove the listing immediately.</div>
              </div>
            </div>
          </div>
          <div class="pub-panel__footer">
            <button class="jq-btn">← Cancel</button>
            <button class="jq-btn jq-btn--red">Unpublish now</button>
          </div>
        </div>"""
    return wrap("EP1 · C-3 · Confirm Unpublish", "EP1 · C3 · Confirm Unpublish",
                ep1_modal_wrap(panel, "C3 · Confirm Unpublish"))

def make_ep1_c4():
    panel = """<div class="pub-panel">
          <div class="pub-panel__header">
            <div class="pub-panel__title">Publishing channels</div>
            <div style="font-size:10.5px;margin-top:3px;display:flex;gap:8px;">
              <span style="color:#2d8a4e;">3 published</span> · <span style="color:#8a9aaa;">2 unpublished</span>
            </div>
          </div>
          <div class="pub-panel__body">
            <div class="ch-row"><span class="ch-dot ch-dot--published"></span><div><div class="ch-name">Auto24</div><div class="ch-status-text ch-status-text--pub">● Published · Today, 14:32</div></div></div>
            <div class="ch-row"><span class="ch-dot ch-dot--published"></span><div><div class="ch-name">Mobile.de</div><div class="ch-status-text ch-status-text--pub">● Published · Today, 14:32</div></div></div>
            <div class="ch-row"><span class="ch-dot ch-dot--published"></span><div><div class="ch-name">SS.lv</div><div class="ch-status-text ch-status-text--pub">● Published · Today, 14:32</div></div></div>
            <div class="ch-row"><span class="ch-dot ch-dot--unpublished"></span><div><div class="ch-name">Autoplius</div><div class="ch-status-text ch-status-text--unpub">○ Unpublished</div></div></div>
            <div class="ch-row"><span class="ch-dot ch-dot--unpublished"></span><div><div class="ch-name">City24</div><div class="ch-status-text ch-status-text--unpub">○ Unpublished</div></div></div>
          </div>
          <div class="pub-panel__footer">
            <button class="jq-btn jq-btn--primary">Publish to channels →</button>
          </div>
        </div>"""
    return wrap("EP1 · C-4 · Partial Result", "EP1 · C4 · Partial Result",
                ep1_modal_wrap(panel, "C4 · Partial Result"))

# ─── EP2 screens ─────────────────────────────────────────────────────────────

def ep2_builder_wrap(form_content, panel_content, tab_active="basic", banner_html="", state_label="", save_disabled=False):
    tabs = ["basic", "details", "media", "pricing", "extras"]
    tab_labels = {"basic":"Basic Info","details":"Details","media":"Media","pricing":"Pricing","extras":"Extras"}
    tab_html = "".join(f'<div class="builder-tab{" builder-tab--active" if t==tab_active else ""}">{tab_labels[t]}</div>' for t in tabs)
    save_btn = f'<button class="jq-btn jq-btn--primary" {"disabled" if save_disabled else ""}>Save changes</button>'
    return f"""
<style>
.builder-layout{{display:flex;flex:1;overflow:hidden;}}
.builder-form-col{{flex:1;overflow-y:auto;padding:12px;background:var(--content-bg);border-right:1px solid var(--border);}}
.builder-panel-col{{width:280px;flex-shrink:0;overflow-y:auto;padding:10px;background:var(--page-bg);}}
.builder-tabs{{display:flex;background:linear-gradient(180deg,#ddeef7,#c8dce8);border-bottom:1px solid var(--border-dark);flex-shrink:0;}}
.builder-tab{{font-size:11.5px;font-weight:600;padding:5px 14px;cursor:pointer;color:var(--text-muted);border-right:1px solid rgba(0,0,0,0.08);border-bottom:2px solid transparent;margin-bottom:-1px;}}
.builder-tab--active{{background:#fff;color:var(--text-main);border-bottom:2px solid #5aaed0;}}
.builder-section{{background:#fff;border:1px solid var(--border);border-radius:3px;margin-bottom:10px;}}
.builder-section__head{{background:linear-gradient(180deg,#eef6fb,#e0edf5);padding:6px 10px;border-bottom:1px solid var(--border);font-size:11.5px;font-weight:700;color:var(--text-main);}}
.builder-section__body{{padding:10px;}}
.field-hint--error{{font-size:10px;color:var(--status-err);margin-top:2px;display:flex;align-items:center;gap:3px;}}
</style>
<div class="modal-overlay" style="position:fixed;inset:0;background:rgba(0,0,0,0);">
  <div style="display:flex;flex-direction:column;height:100vh;width:100%;position:fixed;inset:0;background:var(--content-bg);">
    <div class="modera-topnav">
      <div class="modera-topnav__logo">MODERA</div>
      <div class="modera-topnav__module">Salesfront</div>
      <div style="color:rgba(255,255,255,0.5);padding:0 8px;display:flex;align-items:center;font-size:11px;">›</div>
      <div style="color:rgba(255,255,255,0.9);font-size:11.5px;display:flex;align-items:center;font-weight:600;">Vehicle Builder — VW Golf (ABC-123)</div>
      <div class="modera-topnav__right">
        <span class="pub-status-pill pub-status-pill--idle">Publishing</span>
        <span class="topnav-icon">🔔</span>
        <span class="topnav-username">J. Tamm ▾</span>
      </div>
    </div>
    <div class="modera-subnav">
      <a class="subnav-tab">← Inventory</a>
      <a class="subnav-tab">Vehicle Card</a>
      <a class="subnav-tab subnav-tab--active">Builder</a>
    </div>
    {banner_html}
    <div class="builder-tabs">{tab_html}</div>
    <div class="builder-layout">
      <div class="builder-form-col">{form_content}</div>
      <div class="builder-panel-col">
        <div style="font-size:11px;font-weight:700;color:var(--text-muted);margin-bottom:6px;text-transform:uppercase;letter-spacing:0.5px;">Publishing</div>
        {panel_content}
      </div>
    </div>
    <div style="background:linear-gradient(180deg,#f0f6fa,#e4edf5);border-top:1px solid var(--border);padding:7px 14px;display:flex;align-items:center;gap:8px;flex-shrink:0;">
      <button class="jq-btn">← Cancel</button>
      <div style="flex:1;"></div>
      <span style="font-size:10.5px;color:#5a7080;">State: {state_label}</span>
      {save_btn}
    </div>
  </div>
</div>"""

def basic_form(mileage_highlight=False, mileage_val="78200", fuel_highlight=False, fuel_val="Diesel", show_fuel_error=False, show_mileage_error=False, mileage_ok=False):
    mil_cls = " builder-form__field--highlighted" if mileage_highlight else ""
    fuel_cls = " builder-form__field--highlighted" if fuel_highlight else ""
    mil_error = '<div class="field-hint--error">Required by Mobile.de</div>' if show_mileage_error else ''
    fuel_error = '<div class="field-hint--error">Required by Mobile.de</div>' if show_fuel_error else ''
    mil_ok = '<div style="font-size:10px;color:#2d8a4e;margin-top:2px;display:flex;align-items:center;gap:3px;">✓ Saved</div>' if mileage_ok else ''
    mil_lbl = 'color:#b03030;' if mileage_highlight or show_mileage_error else ''
    fuel_lbl = 'color:#b03030;' if fuel_highlight or show_fuel_error else ''
    return f"""<div class="builder-section">
        <div class="builder-section__head">Vehicle identification</div>
        <div class="builder-section__body">
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;">
            <div><label class="jq-label">Make *</label><input class="jq-input" value="Volkswagen"></div>
            <div><label class="jq-label">Model *</label><input class="jq-input" value="Golf"></div>
            <div><label class="jq-label">Year *</label><input class="jq-input" value="2019" type="number"></div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:8px;">
            <div><label class="jq-label">Reg. number</label><input class="jq-input" value="ABC-123"></div>
            <div><label class="jq-label">VIN</label><input class="jq-input" value="WVWZZZ1KZ..."></div>
          </div>
        </div>
      </div>
      <div class="builder-section">
        <div class="builder-section__head">Technical data</div>
        <div class="builder-section__body">
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;">
            <div>
              <label class="jq-label" style="{mil_lbl}">Mileage (km) *</label>
              <input class="jq-input{mil_cls}" value="{mileage_val}" type="number">
              {mil_error}{mil_ok}
            </div>
            <div>
              <label class="jq-label" style="{fuel_lbl}">Fuel type *</label>
              <select class="jq-select{fuel_cls}">
                <option {'selected' if not fuel_highlight else ''} value="Diesel">{'Diesel' if not fuel_highlight else 'Select…'}</option>
                <option>Petrol</option><option>Hybrid</option>
              </select>
              {fuel_error}
            </div>
            <div><label class="jq-label">Engine (cc)</label><input class="jq-input" value="1598"></div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-top:8px;">
            <div><label class="jq-label">Power (hp)</label><input class="jq-input" value="115"></div>
            <div><label class="jq-label">Transmission</label><select class="jq-select"><option>Manual</option><option>Automatic</option></select></div>
            <div><label class="jq-label">Color</label><input class="jq-input" value="Deep Black Pearl"></div>
          </div>
        </div>
      </div>"""

def details_form(interior_highlight=False, doors_highlight=False):
    int_cls = " builder-form__field--highlighted" if interior_highlight else ""
    doors_cls = " builder-form__field--highlighted" if doors_highlight else ""
    int_err = '<div class="field-hint--error">Required by Autoplius</div>' if interior_highlight else ''
    doors_err = '<div class="field-hint--error">Required by Autoplius</div>' if doors_highlight else ''
    return f"""<div class="builder-section">
        <div class="builder-section__head">Additional details</div>
        <div class="builder-section__body">
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;">
            <div>
              <label class="jq-label" {'style="color:#b03030;"' if interior_highlight else ''}>Interior color</label>
              <input class="jq-input{int_cls}" placeholder="e.g. Black leather">{int_err}
            </div>
            <div>
              <label class="jq-label" {'style="color:#b03030;"' if doors_highlight else ''}>Doors count</label>
              <select class="jq-select{doors_cls}"><option value="">Select…</option><option>3</option><option selected>5</option></select>{doors_err}
            </div>
            <div><label class="jq-label">Seats</label><input class="jq-input" value="5"></div>
          </div>
          <div style="margin-top:8px;">
            <label class="jq-label">Description</label>
            <textarea class="jq-textarea" style="height:80px;">Well-maintained one-owner vehicle.</textarea>
          </div>
        </div>
      </div>"""

def pub_panel_a1_compact():
    return """<div class="pub-panel">
        <div class="pub-panel__header"><span class="pub-panel__title">Publishing channels</span></div>
        <div class="pub-panel__body">
          <div class="ch-row"><span class="ch-dot ch-dot--unpublished"></span><div><div class="ch-name">Auto24</div><div class="ch-status-text ch-status-text--unpub">Not published</div></div></div>
          <div class="ch-row"><span class="ch-dot ch-dot--unpublished"></span><div><div class="ch-name">Mobile.de</div><div class="ch-status-text ch-status-text--unpub">Not published</div></div></div>
          <div class="ch-row"><span class="ch-dot ch-dot--unpublished"></span><div><div class="ch-name">SS.lv</div><div class="ch-status-text ch-status-text--unpub">Not published</div></div></div>
          <div class="ch-row"><span class="ch-dot ch-dot--unpublished"></span><div><div class="ch-name">Autoplius</div><div class="ch-status-text ch-status-text--unpub">Not published</div></div></div>
        </div>
        <div class="pub-panel__footer">
          <button class="jq-btn jq-btn--primary">Publish to channels</button>
        </div>
      </div>"""

def pub_panel_a2_warn():
    return """<div class="pub-panel">
        <div class="pub-panel__header"><span class="pub-panel__title" style="color:#b07820;">⚠ Validation warnings</span></div>
        <div class="pub-panel__body">
          <div style="font-size:10.5px;color:#5a7080;margin-bottom:6px;">Fields highlighted in form:</div>
          <div class="ch-row"><span class="ch-dot ch-dot--published"></span><div><div class="ch-name">Auto24</div><div class="ch-status-text ch-status-text--pub">✓ Ready (96%)</div></div></div>
          <div class="ch-row"><span class="ch-dot ch-dot--pending"></span><div><div class="ch-name">Mobile.de</div><div style="font-size:10px;color:#b07820;">⚠ Missing: Mileage, Fuel type</div></div></div>
          <div class="ch-row"><span class="ch-dot ch-dot--published"></span><div><div class="ch-name">SS.lv</div><div class="ch-status-text ch-status-text--pub">✓ Accepts partial</div></div></div>
          <div class="ch-row"><span class="ch-dot ch-dot--pending"></span><div><div class="ch-name">Autoplius</div><div style="font-size:10px;color:#b07820;">⚠ Missing: Interior, Doors</div></div></div>
        </div>
        <div class="pub-panel__footer">
          <button class="jq-btn">Cancel</button>
          <button class="jq-btn jq-btn--primary">Publish 2 of 4 →</button>
        </div>
      </div>"""

def pub_panel_a3_updating():
    return """<div class="pub-panel">
        <div class="pub-panel__header"><span class="pub-panel__title" style="color:#b07820;">⚠ 1 issue remaining</span></div>
        <div class="pub-panel__body">
          <div class="ch-row"><span class="ch-dot ch-dot--published"></span><div><div class="ch-name">Auto24</div><div class="ch-status-text ch-status-text--pub">✓ Ready</div></div></div>
          <div class="ch-row"><span class="ch-dot ch-dot--pending"></span><div><div class="ch-name">Mobile.de</div>
            <div style="display:flex;align-items:center;gap:4px;margin-top:2px;"><div class="val-bar" style="width:70px;"><div class="val-bar__fill val-bar__fill--warn" style="width:94%;"></div></div><span style="font-size:10px;color:#7a9aaa;">94%</span></div>
            <div style="font-size:10px;color:#b07820;">⚠ 1 remaining: Fuel type</div>
          </div></div>
          <div class="ch-row"><span class="ch-dot ch-dot--published"></span><div><div class="ch-name">SS.lv</div><div class="ch-status-text ch-status-text--pub">✓ Accepts partial</div></div></div>
          <div style="font-size:10.5px;color:#2d8a4e;background:#eaf5ee;border:1px solid #a0d0b0;border-radius:2px;padding:4px 6px;margin-top:4px;">✓ Mileage saved · Mobile.de: 88% → 94%</div>
        </div>
        <div class="pub-panel__footer">
          <button class="jq-btn">Cancel</button>
          <button class="jq-btn jq-btn--primary">Publish →</button>
        </div>
      </div>"""

def pub_panel_a4_ready():
    return """<div class="pub-panel">
        <div class="pub-panel__header" style="background:linear-gradient(180deg,#d4f0da,#b8e4c4);">
          <span class="pub-panel__title" style="color:#1a5a30;">✓ All selected channels ready</span>
        </div>
        <div class="pub-panel__body">
          <div class="ch-row"><span class="ch-dot ch-dot--published"></span><div><div class="ch-name">Auto24</div><div class="ch-status-text ch-status-text--pub">✓ Ready (96%)</div></div></div>
          <div class="ch-row"><span class="ch-dot ch-dot--published"></span><div><div class="ch-name">Mobile.de</div><div class="ch-status-text ch-status-text--pub">✓ Ready (100%)</div></div></div>
          <div class="ch-row"><span class="ch-dot ch-dot--published"></span><div><div class="ch-name">SS.lv</div><div class="ch-status-text ch-status-text--pub">✓ Ready (74%)</div></div></div>
        </div>
        <div class="pub-panel__footer">
          <button class="jq-btn jq-btn--primary">Publish 3 channels →</button>
        </div>
      </div>"""

def pub_panel_a5_here():
    return """<div class="pub-panel">
        <div class="pub-panel__header">
          <div class="pub-panel__title" style="color:#b07820;">⚠ Autoplius: 2 missing</div>
          <div style="font-size:10px;color:#5aaed0;font-style:italic;margin-top:3px;background:#eef6fb;border-radius:2px;padding:1px 5px;display:inline-block;">← you are here (Details)</div>
        </div>
        <div class="pub-panel__body">
          <div class="ch-row"><span class="ch-dot ch-dot--pending"></span><div><div class="ch-name">Autoplius</div><div style="font-size:10px;color:#b07820;">Interior color, Doors count</div></div></div>
          <div style="border-top:1px solid #dce8f0;padding-top:6px;margin-top:2px;">
            <div class="ch-row"><span class="ch-dot ch-dot--published"></span><div><div class="ch-name">Auto24</div><div class="ch-status-text ch-status-text--pub">✓ Ready</div></div></div>
            <div class="ch-row"><span class="ch-dot ch-dot--published"></span><div><div class="ch-name">Mobile.de</div><div class="ch-status-text ch-status-text--pub">✓ Ready</div></div></div>
          </div>
        </div>
        <div class="pub-panel__footer">
          <button class="jq-btn">← Back</button>
          <button class="jq-btn jq-btn--primary">Publish 3 →</button>
        </div>
      </div>"""

def pub_panel_a6_progress():
    return """<div class="pub-panel">
        <div class="pub-panel__header">
          <span class="pub-panel__title">⟳ Publishing…</span>
        </div>
        <div class="pub-panel__body">
          <div class="overall-progress" style="margin-bottom:8px;"><div class="overall-progress__fill" style="width:66%;"></div></div>
          <div class="ch-row"><span class="ch-dot ch-dot--published"></span><div><div class="ch-name">Auto24</div><div class="ch-status-text ch-status-text--pub">✓ Published</div></div></div>
          <div class="ch-row"><span class="ch-dot ch-dot--published"></span><div><div class="ch-name">Mobile.de</div><div class="ch-status-text ch-status-text--pub">✓ Published</div></div></div>
          <div class="ch-row"><span class="ch-dot ch-dot--pending"></span><div><div class="ch-name">SS.lv</div><div class="ch-status-text ch-status-text--pend">⟳ Sending…</div></div></div>
        </div>
        <div class="pub-panel__footer">
          <button class="jq-btn jq-btn--disabled" disabled>Please wait…</button>
        </div>
      </div>"""

banner_warn = """<div style="background:linear-gradient(180deg,#fff3cd,#feeaa0);border-bottom:1px solid #e0c060;padding:7px 10px;font-size:11.5px;color:#7a5010;display:flex;align-items:center;gap:7px;">
      <svg width="14" height="14" viewBox="0 0 12 12" style="flex-shrink:0;"><path d="M6 1.5L11 10H1L6 1.5Z" fill="none" stroke="#b07820" stroke-width="1.3" stroke-linejoin="round"/><path d="M6 4.5v2.5M6 8.5v.5" stroke="#b07820" stroke-width="1.3" stroke-linecap="round"/></svg>
      Complete these fields to publish on Mobile.de
      <div style="flex:1;"></div>
      <button class="jq-btn jq-btn--sm">← Back to Publishing</button>
    </div>"""

banner_1_remaining = """<div style="background:linear-gradient(180deg,#fff3cd,#feeaa0);border-bottom:1px solid #e0c060;padding:7px 10px;font-size:11.5px;color:#7a5010;display:flex;align-items:center;gap:7px;">
      ⚠ 1 field remaining for Mobile.de (Fuel type)
      <div style="flex:1;"></div>
      <button class="jq-btn jq-btn--sm">← Back</button>
    </div>"""

def make_ep2_a1():
    content = ep2_builder_wrap(basic_form(), pub_panel_a1_compact(), "basic", "", "A1 · Builder Idle")
    return wrap("EP2 · A-1 · Builder Idle", "EP2 · A1 · Builder Idle", content)

def make_ep2_a2():
    content = ep2_builder_wrap(basic_form(mileage_highlight=True, mileage_val="", fuel_highlight=True, show_mileage_error=True, show_fuel_error=True), pub_panel_a2_warn(), "basic", banner_warn, "A2 · Validation Highlights")
    return wrap("EP2 · A-2 · Validation Highlights", "EP2 · A2 · Validation Highlights", content)

def make_ep2_a3():
    content = ep2_builder_wrap(basic_form(fuel_highlight=True, mileage_val="78200", show_fuel_error=True, mileage_ok=True), pub_panel_a3_updating(), "basic", banner_1_remaining, "A3 · Real-time Update")
    return wrap("EP2 · A-3 · Real-time Update", "EP2 · A3 · Real-time Update", content)

def make_ep2_a4():
    content = ep2_builder_wrap(basic_form(mileage_val="78200"), pub_panel_a4_ready(), "basic", "", "A4 · Channel Unlocked")
    return wrap("EP2 · A-4 · Channel Unlocked", "EP2 · A4 · Channel Unlocked", content)

def make_ep2_a5():
    banner_details = """<div style="background:linear-gradient(180deg,#fff3cd,#feeaa0);border-bottom:1px solid #e0c060;padding:7px 10px;font-size:11.5px;color:#7a5010;display:flex;align-items:center;gap:7px;">
      ⚠ Fill highlighted fields (Details tab) to unlock Autoplius
      <div style="flex:1;"></div>
      <button class="jq-btn jq-btn--sm">← Back</button>
    </div>"""
    content = ep2_builder_wrap(details_form(interior_highlight=True, doors_highlight=True), pub_panel_a5_here(), "details", banner_details, "A5 · Field in Other Tab")
    return wrap("EP2 · A-5 · Field in Other Tab", "EP2 · A5 · Field in Other Tab", content)

def make_ep2_a6():
    content = ep2_builder_wrap(basic_form(mileage_val="78200"), pub_panel_a6_progress(), "basic", "", "A6 · Publishing from Builder", save_disabled=True)
    return wrap("EP2 · A-6 · Publishing from Builder", "EP2 · A6 · Publishing from Builder", content)

# ─── EP3 screens ─────────────────────────────────────────────────────────────

def ep3_page_wrap(body_html, state_label, sel_count=0, batch_bar_visible=False):
    batch_bar = ""
    if batch_bar_visible:
        batch_bar = f"""<div class="batch-bar batch-bar--visible">
      <div class="batch-bar__count">{sel_count} vehicles selected</div>
      <span class="batch-bar__deselect">Deselect all</span>
      <div class="batch-bar__spacer"></div>
      <button class="jq-btn jq-btn--primary">Publish selected →</button>
      <button class="jq-btn">Cancel</button>
    </div>"""

    return f"""
<style>
html,body{{height:100%;overflow:hidden;}}
.page-wrap{{display:flex;flex-direction:column;height:100vh;}}
.toolbar{{background:linear-gradient(180deg,#eef6fb,#e4eef5);border:1px solid var(--border);border-radius:3px;padding:6px 10px;margin-bottom:8px;display:flex;align-items:center;gap:8px;}}
.inv-row--selected td{{background:#d4eaf8 !important;}}
.inv-row--selected td:first-child{{border-left:3px solid #3a9ec8;}}
.inv-row--hover td{{background:#e4f0f8 !important;}}
.screen-label{{position:fixed;top:6px;right:8px;background:rgba(20,40,60,0.8);color:#7de0f8;font-size:10px;padding:2px 8px;border-radius:10px;z-index:400;}}
</style>
<div class="screen-label">{state_label}</div>
<div class="page-wrap">
  <div class="modera-topnav">
    <div class="modera-topnav__logo">MODERA</div>
    <div class="modera-topnav__module">Salesfront</div>
    <div class="modera-topnav__right">
      <span class="pub-status-pill pub-status-pill--idle">Publishing</span>
      <span class="topnav-icon">🔔</span>
      <span class="topnav-username">J. Tamm ▾</span>
    </div>
  </div>
  <div class="modera-subnav">
    <a class="subnav-tab subnav-tab--active">Inventory</a>
    <a class="subnav-tab">Customers</a>
    <a class="subnav-tab">Deals</a>
  </div>
  <div style="flex:1;overflow:auto;padding:10px 12px 60px;background:var(--page-bg);">
    <div class="toolbar">
      <span style="font-size:13px;font-weight:700;color:var(--text-main);">Inventory</span>
      <input type="text" style="border:1px solid var(--border);border-radius:3px;padding:3px 8px;font-size:11.5px;width:200px;" placeholder="Search…">
      <div style="flex:1;"></div>
      {"<span style='font-size:11px;font-weight:700;color:#2a7ea8;background:linear-gradient(180deg,#5bbde0,#3a9ec8);color:#fff;padding:1px 8px;border-radius:10px;'>" + str(sel_count) + " selected</span>" if sel_count > 0 else ""}
      <button class="jq-btn jq-btn--primary">Publish selected</button>
      <button class="jq-btn">+ Add vehicle</button>
    </div>
    {body_html}
  </div>
  {batch_bar}
</div>"""

def inv_table_rows(selected_ids=None, hover_id=None, show_actions_id=None):
    selected_ids = selected_ids or []
    rows = [
      ('v1', 'Volkswagen Golf 1.6 TDI', '2019', 'ABC-123', '€14,500', '78,200 km', 'error', ['error','published','published','unpublished','error']),
      ('v2', 'Toyota RAV4 2.0 CVT',    '2021', 'XYZ-789', '€28,900', '32,100 km', 'unpublished', ['unpublished']*5),
      ('v3', 'BMW 320d xDrive',         '2020', 'BMW-555', '€31,200', '55,400 km', 'published', ['published']*5),
      ('v4', 'Audi A4 2.0 TFSI',       '2018', 'AUD-111', '€22,800', '95,000 km', 'pending', ['published','pending','unpublished','published','unpublished']),
      ('v5', 'Skoda Octavia 1.5 TSI',  '2022', 'SKO-222', '€19,900', '18,500 km', 'unpublished', ['unpublished']*5),
    ]
    status_map = {'published': ('pub','Published'), 'unpublished': ('unpub','Unpublished'), 'error': ('err','Error'), 'pending': ('pend','Pending')}
    html = """<table class="inv-table" style="width:100%;"><thead><tr>
      <th style="width:32px;"><input type="checkbox" class="jq-check"></th>
      <th>Vehicle</th><th>Year</th><th>Reg. no.</th><th>Price</th><th>Mileage</th><th>Channels</th><th>Status</th><th>Actions</th>
    </tr></thead><tbody>"""
    for vid, name, year, reg, price, mileage, status, chdots in rows:
        is_sel = vid in selected_ids
        is_hover = vid == hover_id
        row_cls = " inv-row--selected" if is_sel else (" inv-row--hover" if is_hover else "")
        dots = " ".join(f'<span class="ch-dot ch-dot--{t}"></span>' for t in chdots)
        sb_cls, sb_lbl = status_map.get(status, ('unpub','Unknown'))
        show_act = vid == show_actions_id or is_sel or is_hover
        act_html = ""
        if show_act:
            act_html = f'<button class="jq-btn jq-btn--sm jq-btn--primary">Publish</button>'
            if status == 'error': act_html += f' <button class="jq-btn jq-btn--sm jq-btn--red">Fix errors</button>'
        html += f"""<tr class="inv-row{row_cls}">
          <td><input type="checkbox" class="jq-check" {'checked' if is_sel else ''}></td>
          <td style="font-weight:600;">{name}</td>
          <td>{year}</td><td style="color:var(--text-muted);">{reg}</td>
          <td style="font-weight:600;">{price}</td><td style="color:var(--text-muted);">{mileage}</td>
          <td>{dots}</td>
          <td><span class="status-badge status-badge--{sb_cls}">{sb_lbl}</span></td>
          <td><div style="display:flex;gap:4px;">{act_html}</div></td>
        </tr>"""
    html += "</tbody></table>"
    return html

def make_ep3_s1():
    table = inv_table_rows(hover_id='v2', show_actions_id='v2')
    content = ep3_page_wrap(table, "EP3 · S1 · Hover State")
    return f"""<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=1280">
<title>EP3 · S-1 · Hover State — Modera Publishing Tool</title>
<link rel="stylesheet" href="{CSS_PATH}/tokens.css">
<link rel="stylesheet" href="{CSS_PATH}/components.css">
</head><body>{content}</body></html>"""

def make_ep3_s2():
    table = inv_table_rows()
    modal = """<div style="position:fixed;inset:0;background:rgba(20,40,60,0.55);z-index:200;display:flex;align-items:center;justify-content:center;">
      <div class="vc-modal" style="width:640px;">
        <div class="vc-modal__header">
          <div><div class="vc-modal__title">2019 VW Golf 1.6 TDI — ABC-123</div></div>
          <button class="vc-modal__close">✕</button>
        </div>
        <div class="vc-tabs">
          <div class="vc-tab">Details</div>
          <div class="vc-tab vc-tab--active">Publishing</div>
        </div>
        <div class="vc-modal__body" style="padding:14px;">
          <div class="pub-panel" style="flex:1;">
            <div class="pub-panel__header"><span class="pub-panel__title">Select channels to publish</span></div>
            <div class="pub-panel__body">
              <div class="ch-row"><input type="checkbox" class="jq-check" checked><div><div class="ch-name">Auto24</div><div style="font-size:10px;color:#7a9aaa;">auto24.ee · 96%</div></div></div>
              <div class="ch-row"><input type="checkbox" class="jq-check" checked><div><div class="ch-name">Mobile.de</div><div style="font-size:10px;color:#7a9aaa;">mobile.de · 100%</div></div></div>
              <div class="ch-row"><input type="checkbox" class="jq-check" checked><div><div class="ch-name">SS.lv</div><div style="font-size:10px;color:#7a9aaa;">ss.lv · 74%</div></div></div>
              <div class="ch-row"><input type="checkbox" class="jq-check"><div><div class="ch-name">Autoplius</div><div style="font-size:10px;color:#7a9aaa;">autoplius.lt · 88%</div></div></div>
              <div class="ch-row"><input type="checkbox" class="jq-check"><div><div class="ch-name">City24</div><div style="font-size:10px;color:#7a9aaa;">city24.ee · 91%</div></div></div>
            </div>
            <div class="pub-panel__footer">
              <button class="jq-btn">Cancel</button>
              <button class="jq-btn jq-btn--primary">Publish 3 channels →</button>
            </div>
          </div>
        </div>
        <div class="vc-modal__footer"><button class="jq-btn">Close</button></div>
      </div>
    </div>"""
    content = ep3_page_wrap(table, "EP3 · S2 · Single Vehicle Modal") + modal
    return f"""<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=1280">
<title>EP3 · S-2 · Single Vehicle Modal — Modera Publishing Tool</title>
<link rel="stylesheet" href="{CSS_PATH}/tokens.css">
<link rel="stylesheet" href="{CSS_PATH}/components.css">
</head><body>{content}</body></html>"""

def make_ep3_b1():
    table = inv_table_rows(selected_ids=['v1','v2','v3','v4'])
    content = ep3_page_wrap(table, "EP3 · B1 · Batch Action Bar", sel_count=4, batch_bar_visible=True)
    return f"""<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=1280">
<title>EP3 · B-1 · Batch Action Bar — Modera Publishing Tool</title>
<link rel="stylesheet" href="{CSS_PATH}/tokens.css">
<link rel="stylesheet" href="{CSS_PATH}/components.css">
</head><body>{content}</body></html>"""

def wizard_steps_html(active):
    steps = [('b2','1. Channels'),('b3','2. Validate'),('b4','3. Publish')]
    parts = []
    for i,(k,lbl) in enumerate(steps):
        idx_active = [s[0] for s in steps].index(active) if active in [s[0] for s in steps] else 0
        is_done = i < idx_active
        is_active = k == active
        cls = "wizard-steps__step--done" if is_done else ("wizard-steps__step--active" if is_active else "")
        dot = "✓" if is_done else ("●" if is_active else "○")
        parts.append(f'<span class="wizard-steps__step {cls}">{dot} {lbl}</span>')
        if i < len(steps)-1:
            parts.append('<span class="wizard-steps__connector"></span>')
    return f'<div class="wizard-steps">{"".join(parts)}</div>'

def batch_dialog_wrap(title, body, footer, header_style="", step_key="b2"):
    return f"""
<div style="position:fixed;inset:0;background:rgba(20,40,60,0.6);z-index:200;display:flex;align-items:center;justify-content:center;">
  <div class="pub-dialog" style="min-width:560px;max-width:720px;">
    <div class="pub-dialog__header" style="{header_style}">
      <div>
        <div class="pub-dialog__title">{title}</div>
        {wizard_steps_html(step_key)}
      </div>
      <button class="pub-dialog__close">✕</button>
    </div>
    <div class="pub-dialog__body">{body}</div>
    <div class="pub-dialog__footer">{footer}</div>
  </div>
</div>"""

def batch_matrix_html(rows, headers, caption=""):
    th = "".join(f"<th>{h}</th>" for h in headers)
    trs = ""
    for row in rows:
        tds = "".join(f'<td class="batch-matrix__{c}">{t}</td>' for c, t in row[1:])
        trs += f"<tr><td style='font-weight:600;'>{row[0]}</td>{tds}</tr>"
    return f"""<table class="batch-matrix"><thead><tr><th>Vehicle</th>{th}</tr></thead><tbody>{trs}</tbody></table>
    {f'<div style="font-size:10.5px;color:#5a7080;margin-top:6px;">{caption}</div>' if caption else ''}"""

def make_ep3_b2():
    body = """<div style="font-size:11.5px;color:#5a7080;margin-bottom:10px;">Select which portals to publish 4 vehicles on.</div>
    <div style="display:flex;gap:8px;flex-direction:column;">
      <label style="display:flex;align-items:center;gap:8px;cursor:pointer;padding:5px 8px;border-radius:3px;border:1px solid #5aaed0;background:#eef6fb;"><input type="checkbox" class="jq-check" checked><span style="font-size:12px;font-weight:600;">Auto24</span></label>
      <label style="display:flex;align-items:center;gap:8px;cursor:pointer;padding:5px 8px;border-radius:3px;border:1px solid #5aaed0;background:#eef6fb;"><input type="checkbox" class="jq-check" checked><span style="font-size:12px;font-weight:600;">Mobile.de</span></label>
      <label style="display:flex;align-items:center;gap:8px;cursor:pointer;padding:5px 8px;border-radius:3px;border:1px solid #5aaed0;background:#eef6fb;"><input type="checkbox" class="jq-check" checked><span style="font-size:12px;font-weight:600;">SS.lv</span></label>
      <label style="display:flex;align-items:center;gap:8px;cursor:pointer;padding:5px 8px;border-radius:3px;border:1px solid var(--border);background:#fafcfe;"><input type="checkbox" class="jq-check"><span style="font-size:12px;font-weight:600;">Autoplius</span></label>
      <label style="display:flex;align-items:center;gap:8px;cursor:pointer;padding:5px 8px;border-radius:3px;border:1px solid var(--border);background:#fafcfe;"><input type="checkbox" class="jq-check"><span style="font-size:12px;font-weight:600;">City24</span></label>
    </div>"""
    footer = '<button class="jq-btn">Cancel</button><button class="jq-btn jq-btn--primary">Next: Validate (3 channels) →</button>'
    table = inv_table_rows(selected_ids=['v1','v2','v3','v4'])
    bg = ep3_page_wrap(table, "EP3 · B2 · Batch Channel Selector", sel_count=4)
    dialog = batch_dialog_wrap("Publish 4 vehicles · Step 1 of 3: Select channels", body, footer, "", "b2")
    return f"""<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=1280">
<title>EP3 · B-2 · Batch Channel Selector — Modera Publishing Tool</title>
<link rel="stylesheet" href="{CSS_PATH}/tokens.css">
<link rel="stylesheet" href="{CSS_PATH}/components.css">
</head><body>{bg}{dialog}</body></html>"""

def make_ep3_b3():
    matrix = batch_matrix_html([
        ['VW Golf',     ('cell--ready','✓ Ready'), ('cell--ready','✓ Ready'),  ('cell--ready','✓ Ready')],
        ['Toyota RAV4', ('cell--ready','✓ Ready'), ('cell--error','⚠ Missing 2'), ('cell--ready','✓ Ready')],
        ['BMW 320d',    ('cell--ready','✓ Ready'), ('cell--ready','✓ Ready'),  ('cell--ready','✓ Ready')],
        ['Audi A4',     ('cell--ready','✓ Ready'), ('cell--error','⚠ Missing 1'), ('cell--ready','✓ Ready')],
    ], ['Auto24','Mobile.de','SS.lv'], "Toyota RAV4 and Audi A4 will be skipped for Mobile.de due to missing fields.")
    warn = """<div class="alert alert--warn" style="margin-bottom:10px;">
      <svg width="14" height="14" viewBox="0 0 12 12" style="flex-shrink:0;color:#b07820;"><path d="M6 1.5L11 10H1L6 1.5Z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M6 4.5v2.5M6 8.5v.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
      <div><strong>Toyota RAV4 and Audi A4</strong> will be skipped for Mobile.de (missing required fields).</div>
    </div>"""
    body = warn + matrix
    footer = '<button class="jq-btn">← Back</button><button class="jq-btn">Fix issues first</button><button class="jq-btn jq-btn--primary">Proceed anyway →</button>'
    table = inv_table_rows(selected_ids=['v1','v2','v3','v4'])
    bg = ep3_page_wrap(table, "EP3 · B3 · Validation Summary", sel_count=4)
    dialog = batch_dialog_wrap("Publish 4 vehicles · Step 2 of 3: Validation", body, footer, "", "b3")
    return f"""<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=1280">
<title>EP3 · B-3 · Validation Summary — Modera Publishing Tool</title>
<link rel="stylesheet" href="{CSS_PATH}/tokens.css">
<link rel="stylesheet" href="{CSS_PATH}/components.css">
</head><body>{bg}{dialog}</body></html>"""

def make_ep3_b3a():
    body = """<div class="alert alert--warn" style="margin-bottom:10px;">
      <svg width="14" height="14" viewBox="0 0 12 12" style="flex-shrink:0;color:#b07820;"><path d="M6 1.5L11 10H1L6 1.5Z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>
      <div><strong>Vehicle 1 of 2 with issues · Mobile.de</strong> · Missing 2 fields: Mileage (km), Fuel type</div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px;">
      <div><label class="jq-label">Make</label><input class="jq-input" value="Toyota" disabled></div>
      <div><label class="jq-label">Model</label><input class="jq-input" value="RAV4 2.0 CVT" disabled></div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
      <div>
        <label class="jq-label" style="color:#b03030;">Mileage (km) *</label>
        <input class="jq-input builder-form__field--highlighted" placeholder="e.g. 45000" type="number">
        <div style="font-size:10px;color:#b03030;margin-top:2px;">Required by Mobile.de</div>
      </div>
      <div>
        <label class="jq-label" style="color:#b03030;">Fuel type *</label>
        <select class="jq-select builder-form__field--highlighted">
          <option value="">Select fuel type…</option><option>Diesel</option><option>Hybrid</option>
        </select>
        <div style="font-size:10px;color:#b03030;margin-top:2px;">Required by Mobile.de</div>
      </div>
    </div>"""
    footer = '<button class="jq-btn">← Back to validation</button><button class="jq-btn">Skip this vehicle</button><button class="jq-btn jq-btn--green">Save & Next vehicle →</button>'
    table = inv_table_rows(selected_ids=['v1','v2','v3','v4'])
    bg = ep3_page_wrap(table, "EP3 · B3a · Fix Issues Builder", sel_count=4)
    dialog = batch_dialog_wrap("Fix issues — Vehicle 1 of 2 · Toyota RAV4", body, footer, "", "b3")
    return f"""<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=1280">
<title>EP3 · B-3a · Fix Issues Builder — Modera Publishing Tool</title>
<link rel="stylesheet" href="{CSS_PATH}/tokens.css">
<link rel="stylesheet" href="{CSS_PATH}/components.css">
</head><body>{bg}{dialog}</body></html>"""

def make_ep3_b4():
    matrix = batch_matrix_html([
        ['VW Golf',     ('cell--done','✓'), ('cell--sending','⟳'), ('cell--done','✓')],
        ['Toyota RAV4', ('cell--done','✓'), ('cell--skipped','—'), ('cell--done','✓')],
        ['BMW 320d',    ('cell--done','✓'), ('cell--done','✓'),    ('cell--waiting','·')],
        ['Audi A4',     ('cell--waiting','·'), ('cell--skipped','—'), ('cell--waiting','·')],
    ], ['Auto24','Mobile.de','SS.lv'])
    body = f"""<div style="margin-bottom:12px;">
      <div style="display:flex;justify-content:space-between;font-size:11px;color:#5a7080;margin-bottom:4px;"><span>8 of 10 operations</span><span>80%</span></div>
      <div class="overall-progress"><div class="overall-progress__fill" style="width:80%;"></div></div>
    </div>{matrix}"""
    footer = '<button class="jq-btn jq-btn--disabled" disabled>Please wait…</button>'
    table = inv_table_rows(selected_ids=['v1','v2','v3','v4'])
    bg = ep3_page_wrap(table, "EP3 · B4 · Batch Progress", sel_count=4)
    dialog = batch_dialog_wrap("Publishing 4 vehicles · Step 3 of 3", body, footer, "", "b4")
    return f"""<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=1280">
<title>EP3 · B-4 · Batch Progress — Modera Publishing Tool</title>
<link rel="stylesheet" href="{CSS_PATH}/tokens.css">
<link rel="stylesheet" href="{CSS_PATH}/components.css">
</head><body>{bg}{dialog}</body></html>"""

def make_ep3_b5():
    matrix = batch_matrix_html([
        ['VW Golf',     ('cell--done','✓'), ('cell--done','✓'),    ('cell--done','✓')],
        ['Toyota RAV4', ('cell--done','✓'), ('cell--skipped','—'), ('cell--done','✓')],
        ['BMW 320d',    ('cell--done','✓'), ('cell--done','✓'),    ('cell--done','✓')],
        ['Audi A4',     ('cell--done','✓'), ('cell--skipped','—'), ('cell--done','✓')],
    ], ['Auto24','Mobile.de','SS.lv'])
    success_alert = """<div class="alert alert--success" style="margin-bottom:10px;">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style="flex-shrink:0;"><circle cx="7" cy="7" r="6" fill="#2d8a4e"/><path d="M4.5 7l2 2L9.5 5.5" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <div><strong>10 of 10 operations successful</strong> · 2 skipped (missing fields for Mobile.de)</div>
    </div>"""
    body = success_alert + matrix + '<div style="font-size:10.5px;color:#5a7080;margin-top:6px;">Note: Toyota RAV4 and Audi A4 were skipped for Mobile.de.</div>'
    footer = '<button class="jq-btn jq-btn--primary">Done</button>'
    table = inv_table_rows(selected_ids=['v1','v2','v3','v4'])
    bg = ep3_page_wrap(table, "EP3 · B5 · Batch Success", sel_count=4)
    dialog = batch_dialog_wrap("✓ Batch publish complete", body, footer, "background:linear-gradient(180deg,#3a9a5a,#1d6a38);", "b5")
    return f"""<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=1280">
<title>EP3 · B-5 · Batch Success — Modera Publishing Tool</title>
<link rel="stylesheet" href="{CSS_PATH}/tokens.css">
<link rel="stylesheet" href="{CSS_PATH}/components.css">
</head><body>{bg}{dialog}</body></html>"""

def make_ep3_b6():
    matrix = batch_matrix_html([
        ['VW Golf',     ('cell--done','✓'), ('cell--done','✓'),   ('cell--done','✓')],
        ['Toyota RAV4', ('cell--done','✓'), ('cell--skipped','—'),('cell--done','✓')],
        ['BMW 320d',    ('cell--done','✓'), ('cell--error','✕'),  ('cell--done','✓')],
        ['Audi A4',     ('cell--done','✓'), ('cell--skipped','—'),('cell--error','✕')],
    ], ['Auto24','Mobile.de','SS.lv'])
    warn_alert = """<div class="alert alert--warn" style="margin-bottom:10px;">
      <svg width="14" height="14" viewBox="0 0 12 12" style="flex-shrink:0;color:#b07820;"><path d="M6 1.5L11 10H1L6 1.5Z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>
      <div><strong>8 of 10 operations successful</strong> · 2 failed (BMW 320d – Mobile.de, Audi A4 – SS.lv)</div>
    </div>"""
    body = warn_alert + matrix
    footer = '<button class="jq-btn">Close</button><button class="jq-btn jq-btn--primary">Retry failed →</button>'
    table = inv_table_rows(selected_ids=['v1','v2','v3','v4'])
    bg = ep3_page_wrap(table, "EP3 · B6 · Partial Errors", sel_count=4)
    dialog = batch_dialog_wrap("⚠ Batch publish: partial results", body, footer, "background:linear-gradient(180deg,#c87820,#8a4a10);", "b6")
    return f"""<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=1280">
<title>EP3 · B-6 · Batch Partial Errors — Modera Publishing Tool</title>
<link rel="stylesheet" href="{CSS_PATH}/tokens.css">
<link rel="stylesheet" href="{CSS_PATH}/components.css">
</head><body>{bg}{dialog}</body></html>"""

def make_ep3_b7():
    matrix = batch_matrix_html([
        ['VW Golf',     ('cell--error','✕'), ('cell--error','✕'), ('cell--error','✕')],
        ['Toyota RAV4', ('cell--error','✕'), ('cell--error','✕'), ('cell--error','✕')],
        ['BMW 320d',    ('cell--error','✕'), ('cell--error','✕'), ('cell--error','✕')],
        ['Audi A4',     ('cell--error','✕'), ('cell--error','✕'), ('cell--error','✕')],
    ], ['Auto24','Mobile.de','SS.lv'])
    err_alert = """<div class="alert alert--err" style="margin-bottom:10px;">
      <svg width="14" height="14" viewBox="0 0 12 12" style="flex-shrink:0;"><circle cx="6" cy="6" r="5" fill="none" stroke="#b03030" stroke-width="1.3"/><path d="M6 3.5v3M6 8v.5" stroke="#b03030" stroke-width="1.5" stroke-linecap="round"/></svg>
      <div>All operations failed · Connection error or portal unavailable. Check your network and try again.</div>
    </div>"""
    body = err_alert + matrix
    footer = '<button class="jq-btn">Close</button><button class="jq-btn jq-btn--red">Retry all</button>'
    table = inv_table_rows(selected_ids=['v1','v2','v3','v4'])
    bg = ep3_page_wrap(table, "EP3 · B7 · All Failed", sel_count=4)
    dialog = batch_dialog_wrap("✕ Batch publish failed", body, footer, "background:linear-gradient(180deg,#c83030,#801010);", "b7")
    return f"""<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=1280">
<title>EP3 · B-7 · Batch All Failed — Modera Publishing Tool</title>
<link rel="stylesheet" href="{CSS_PATH}/tokens.css">
<link rel="stylesheet" href="{CSS_PATH}/components.css">
</head><body>{bg}{dialog}</body></html>"""

# ─── Write all files ──────────────────────────────────────────────────────────

files = {
    f"{BASE}/screens/ep1/a2-channel-select.html": make_ep1_a2,
    f"{BASE}/screens/ep1/a3-validation.html": make_ep1_a3,
    f"{BASE}/screens/ep1/a4-progress.html": make_ep1_a4,
    f"{BASE}/screens/ep1/a5-success.html": make_ep1_a5,
    f"{BASE}/screens/ep1/b1-mixed-state.html": make_ep1_b1,
    f"{BASE}/screens/ep1/b2-error-detail.html": make_ep1_b2,
    f"{BASE}/screens/ep1/b3-builder-highlight.html": make_ep1_b3,
    f"{BASE}/screens/ep1/b4-ready-retry.html": make_ep1_b4,
    f"{BASE}/screens/ep1/c1-all-published.html": make_ep1_c1,
    f"{BASE}/screens/ep1/c2-select-unpublish.html": make_ep1_c2,
    f"{BASE}/screens/ep1/c3-confirm-unpublish.html": make_ep1_c3,
    f"{BASE}/screens/ep1/c4-partial-result.html": make_ep1_c4,
    f"{BASE}/screens/ep2/a1-builder-idle.html": make_ep2_a1,
    f"{BASE}/screens/ep2/a2-validation-highlights.html": make_ep2_a2,
    f"{BASE}/screens/ep2/a3-realtime-update.html": make_ep2_a3,
    f"{BASE}/screens/ep2/a4-channel-unlocked.html": make_ep2_a4,
    f"{BASE}/screens/ep2/a5-field-in-other-tab.html": make_ep2_a5,
    f"{BASE}/screens/ep2/a6-publishing-from-builder.html": make_ep2_a6,
    f"{BASE}/screens/ep3/s1-hover-state.html": make_ep3_s1,
    f"{BASE}/screens/ep3/s2-single-vehicle-modal.html": make_ep3_s2,
    f"{BASE}/screens/ep3/b1-batch-action-bar.html": make_ep3_b1,
    f"{BASE}/screens/ep3/b2-batch-channel-selector.html": make_ep3_b2,
    f"{BASE}/screens/ep3/b3-validation-summary.html": make_ep3_b3,
    f"{BASE}/screens/ep3/b3a-fix-issues-builder.html": make_ep3_b3a,
    f"{BASE}/screens/ep3/b4-batch-progress.html": make_ep3_b4,
    f"{BASE}/screens/ep3/b5-batch-success.html": make_ep3_b5,
    f"{BASE}/screens/ep3/b6-batch-partial-errors.html": make_ep3_b6,
    f"{BASE}/screens/ep3/b7-batch-all-failed.html": make_ep3_b7,
}

count = 0
for path, fn in files.items():
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(fn())
    count += 1
    print(f"  ✓ {path.replace(BASE+'/', '')}")

print(f"\nGenerated {count} screen files.")
