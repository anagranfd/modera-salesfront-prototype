// publishing-panel.js — State machine for EP1 + EP2 Publishing Panel
// States: a1, a2, a3, a4, a5, b1, b2, b3, b4, c1, c2, c3, c4

const CHANNELS = [
  { id: 'auto24',    name: 'Auto24',    url: 'auto24.ee',       completeness: 96  },
  { id: 'mobilede',  name: 'Mobile.de', url: 'mobile.de',       completeness: 100 },
  { id: 'sslv',      name: 'SS.lv',     url: 'ss.lv',           completeness: 74  },
  { id: 'autoplius', name: 'Autoplius', url: 'autoplius.lt',    completeness: 88  },
  { id: 'city24',    name: 'City24',    url: 'city24.ee',       completeness: 91  },
];

const PUB_STATES = {
  a1: 'idle',
  a2: 'channel-select',
  a3: 'validation',
  a4: 'in-progress',
  a5: 'success',
  b1: 'mixed-state',
  b2: 'error-detail',
  b3: 'builder-highlight',
  b4: 'ready-retry',
  c1: 'all-published',
  c2: 'select-unpublish',
  c3: 'confirm-unpublish',
  c4: 'partial-result',
};

let currentPubState = 'a1';
let selectedChannels = new Set(['auto24', 'mobilede', 'sslv', 'autoplius']);
let expandedErrors = new Set();
let selectedUnpublish = new Set(['autoplius', 'city24']);
let progressInterval = null;
let progressStep = 0;

// ─── Dot HTML helpers ───────────────────────────────────────────────────────
function dotHtml(type) {
  return `<span class="ch-dot ch-dot--${type}"></span>`;
}

function completenessBarHtml(pct, withWarning) {
  let cls = pct >= 95 ? 'good' : pct >= 80 ? 'warn' : 'error';
  let warn = withWarning ? `<span style="color:#b07820;font-size:10px;" title="Warnings">⚠</span>` : '';
  return `
    <div class="completeness-row" style="margin-top:3px;">
      <div class="val-bar" style="width:80px;"><div class="val-bar__fill val-bar__fill--${cls}" style="width:${pct}%"></div></div>
      <span style="font-size:10px;color:#7a9aaa;min-width:24px;">${pct}%</span>
      ${warn}
    </div>`;
}

// ─── Render functions per state ─────────────────────────────────────────────
const STATE_RENDERERS = {

  a1(container) {
    container.innerHTML = `
      <div class="pub-panel">
        <div class="pub-panel__header">
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <span class="pub-panel__title">Publishing channels</span>
            <span style="font-size:10.5px;color:#5a7080;">Vehicle: 2019 VW Golf</span>
          </div>
        </div>
        <div class="pub-panel__body">
          ${CHANNELS.map(ch => {
            const warn = ch.completeness < 90;
            return `
            <div class="ch-row">
              <div style="padding-top:2px;">${dotHtml('unpublished')}</div>
              <div>
                <div class="ch-name">${ch.name}</div>
                <div class="ch-status-text ch-status-text--unpub">Not published</div>
                ${completenessBarHtml(ch.completeness, warn)}
              </div>
              <div></div>
            </div>`;
          }).join('')}
        </div>
        <div class="pub-panel__footer">
          <button class="jq-btn jq-btn--primary" onclick="setState('a2')">
            <svg width="13" height="13" viewBox="0 0 13 13"><path d="M6.5 1v8M3.5 3.5l3-2.5 3 2.5M2 10h9v2H2z" stroke="currentColor" stroke-width="1.3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Publish to channels
          </button>
        </div>
      </div>`;
  },

  a2(container) {
    function updateBtn() {
      const n = selectedChannels.size;
      const btn = document.getElementById('pub-btn-a2');
      if (btn) {
        btn.textContent = n > 0 ? `Publish ${n} channel${n > 1 ? 's' : ''} →` : 'Select at least 1';
        btn.disabled = n === 0;
        btn.className = 'jq-btn ' + (n > 0 ? 'jq-btn--primary' : 'jq-btn--disabled');
      }
    }
    container.innerHTML = `
      <div class="pub-panel">
        <div class="pub-panel__header">
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <span class="pub-panel__title">Select channels to publish</span>
            <div style="display:flex;gap:8px;">
              <span class="link" onclick="selectAll()">Select all</span>
              <span class="link" onclick="deselectAll()">Deselect all</span>
            </div>
          </div>
        </div>
        <div class="pub-panel__body">
          ${CHANNELS.map(ch => `
          <div class="ch-row" style="cursor:pointer;" onclick="toggleChannel('${ch.id}')">
            <div style="padding-top:2px;">
              <input type="checkbox" class="jq-check" id="ch_${ch.id}"
                ${selectedChannels.has(ch.id) ? 'checked' : ''}
                onclick="event.stopPropagation(); toggleChannel('${ch.id}')">
            </div>
            <div>
              <div class="ch-name">${ch.name}</div>
              <div style="font-size:10.5px;color:#5a7080;">${ch.url}</div>
            </div>
            <div>${completenessBarHtml(ch.completeness, ch.completeness < 90)}</div>
          </div>`).join('')}
        </div>
        <div class="pub-panel__footer">
          <button class="jq-btn" onclick="setState('a1')">Cancel</button>
          <button id="pub-btn-a2" class="jq-btn jq-btn--primary" onclick="setState('a3')">
            Publish ${selectedChannels.size} channels →
          </button>
        </div>
      </div>`;

    window.toggleChannel = function(id) {
      if (selectedChannels.has(id)) selectedChannels.delete(id);
      else selectedChannels.add(id);
      const cb = document.getElementById('ch_' + id);
      if (cb) cb.checked = selectedChannels.has(id);
      updateBtn();
    };
    window.selectAll = function() {
      CHANNELS.forEach(ch => selectedChannels.add(ch.id));
      document.querySelectorAll('.jq-check').forEach(cb => cb.checked = true);
      updateBtn();
    };
    window.deselectAll = function() {
      selectedChannels.clear();
      document.querySelectorAll('.jq-check').forEach(cb => cb.checked = false);
      updateBtn();
    };
  },

  a3(container) {
    const validationData = [
      { id: 'auto24',    name: 'Auto24',    pct: 96,  status: 'ready',   msg: '✓ Ready', cls: 'pub' },
      { id: 'mobilede',  name: 'Mobile.de', pct: 100, status: 'ready',   msg: '✓ Ready (100%)', cls: 'pub' },
      { id: 'sslv',      name: 'SS.lv',     pct: 74,  status: 'partial', msg: '✓ Accepts partial', cls: 'pub' },
      { id: 'autoplius', name: 'Autoplius', pct: 88,  status: 'warn',    msg: '⚠ Requires 100% — Missing:', cls: 'pend', missing: ['Interior color', 'Doors count'] },
    ].filter(ch => selectedChannels.has(ch.id));

    const readyCount = validationData.filter(c => c.status !== 'warn').length;
    container.innerHTML = `
      <div class="pub-panel">
        <div class="pub-panel__header">
          <span class="pub-panel__title" style="color:#b07820;">
            <svg width="12" height="12" viewBox="0 0 12 12" style="vertical-align:-1px;"><path d="M6 1.5L11 10H1L6 1.5Z" fill="none" stroke="#b07820" stroke-width="1.3" stroke-linejoin="round"/><path d="M6 4.5v2.5M6 8.5v.5" stroke="#b07820" stroke-width="1.3" stroke-linecap="round"/></svg>
            Validation warnings
          </span>
        </div>
        <div class="pub-panel__body">
          ${validationData.map(ch => `
          <div class="ch-row">
            <div style="padding-top:2px;">${dotHtml(ch.status === 'warn' ? 'pending' : 'published')}</div>
            <div>
              <div class="ch-name">${ch.name}</div>
              <div style="display:flex;align-items:center;gap:6px;margin-top:2px;">
                <div class="val-bar" style="width:80px;"><div class="val-bar__fill val-bar__fill--${ch.status==='warn'?'warn':'good'}" style="width:${ch.pct}%"></div></div>
                <span style="font-size:10px;color:#7a9aaa;">${ch.pct}%</span>
              </div>
              <div class="ch-status-text ch-status-text--${ch.cls}" style="margin-top:2px;">${ch.msg}</div>
              ${ch.missing ? `
              <div style="font-size:10.5px;color:#7a5010;margin-top:3px;padding-left:8px;">
                ${ch.missing.map(m => `<div>· ${m}</div>`).join('')}
              </div>
              <div style="margin-top:4px;">
                <button class="jq-btn jq-btn--sm" onclick="setState('b3')" style="font-size:10px;padding:1px 7px;">
                  Go to Vehicle Builder →
                </button>
              </div>` : ''}
            </div>
          </div>`).join('')}
        </div>
        <div class="pub-panel__footer">
          <button class="jq-btn" onclick="setState('a2')">← Back</button>
          <button class="jq-btn jq-btn--primary" onclick="startPublishing()">
            Publish anyway (${readyCount} of ${validationData.length}) →
          </button>
        </div>
      </div>`;
  },

  a4(container) {
    const channels = [...selectedChannels].map(id => CHANNELS.find(c => c.id === id)).filter(Boolean);
    let step = 0;
    const statuses = channels.map(() => 'waiting');

    function renderProgress() {
      const pct = Math.round((step / channels.length) * 100);
      const statusRows = channels.map((ch, i) => {
        let dot, txt;
        if (statuses[i] === 'done')    { dot = dotHtml('published');  txt = `<span class="ch-status-text ch-status-text--pub">✓ Published</span>`; }
        else if (statuses[i] === 'sending') { dot = `<span class="ch-dot ch-dot--pending dot-pulse"></span>`; txt = `<span class="ch-status-text ch-status-text--pend">⟳ Sending…</span>`; }
        else { dot = dotHtml('unpublished'); txt = `<span class="ch-status-text ch-status-text--unpub">Waiting…</span>`; }
        return `<div class="ch-row">${dot}<div class="ch-name">${ch.name}</div>${txt}</div>`;
      }).join('');

      container.innerHTML = `
        <div class="pub-panel">
          <div class="pub-panel__header">
            <span class="pub-panel__title">
              <span class="spin" style="display:inline-block;margin-right:5px;">⟳</span>
              Publishing… (${step}/${channels.length})
            </span>
          </div>
          <div class="pub-panel__body">
            <div style="margin-bottom:10px;">
              <div class="overall-progress"><div class="overall-progress__fill" style="width:${pct}%"></div></div>
              <div style="font-size:10.5px;color:#5a7080;margin-top:3px;text-align:right;">${pct}%</div>
            </div>
            ${statusRows}
          </div>
          <div class="pub-panel__footer">
            <button class="jq-btn jq-btn--disabled" disabled>Please wait…</button>
          </div>
        </div>`;
    }

    renderProgress();
    if (progressInterval) clearInterval(progressInterval);
    progressInterval = setInterval(() => {
      if (step < channels.length) {
        if (step > 0) statuses[step - 1] = 'done';
        statuses[step] = 'sending';
        step++;
        renderProgress();
      } else {
        statuses[channels.length - 1] = 'done';
        clearInterval(progressInterval);
        renderProgress();
        setTimeout(() => setState('a5'), 600);
      }
    }, 800);
  },

  a5(container) {
    const publishedAt = 'Today, 14:32';
    container.innerHTML = `
      <div class="pub-panel">
        <div class="pub-panel__header" style="background:linear-gradient(180deg,#d4f0da,#b8e4c4);">
          <span class="pub-panel__title" style="color:#1a5a30;">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style="vertical-align:-2px;"><circle cx="7" cy="7" r="6" fill="#2d8a4e"/><path d="M4 7l2.5 2.5L10 5" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Published successfully
          </span>
        </div>
        <div class="pub-panel__body">
          ${[...selectedChannels].map(id => {
            const ch = CHANNELS.find(c => c.id === id);
            if (!ch) return '';
            return `
            <div class="ch-row" style="position:relative;" onmouseenter="this.querySelector('.ext-link').style.opacity='1'" onmouseleave="this.querySelector('.ext-link').style.opacity='0'">
              ${dotHtml('published')}
              <div>
                <div class="ch-name">${ch.name}</div>
                <div class="ch-status-text ch-status-text--pub">● Published · ${publishedAt}</div>
              </div>
              <div class="ext-link tooltip-wrap" style="opacity:0;transition:opacity 0.15s;">
                <a href="https://${ch.url}" target="_blank" class="jq-btn jq-btn--xs" title="View live listing on ${ch.name}">
                  <svg width="11" height="11" viewBox="0 0 11 11"><path d="M4.5 2H2v7h7V6.5M5.5 1h4.5v4.5M5.5 5.5L10 1" stroke="currentColor" stroke-width="1.3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  View
                </a>
                <span class="tooltip">View live listing on ${ch.name}</span>
              </div>
            </div>`;
          }).join('')}
        </div>
        <div class="pub-panel__footer">
          <button class="jq-btn" onclick="setState('c2')" style="color:#b03030;">Unpublish from channels…</button>
        </div>
      </div>`;
  },

  b1(container) {
    const channelData = [
      { id: 'auto24',    name: 'Auto24',    type: 'published',   txt: '● Published · 2 days ago',    cls: 'pub',   hasError: false },
      { id: 'mobilede',  name: 'Mobile.de', type: 'error',       txt: '✕ Error · Click to expand',   cls: 'err',   hasError: true  },
      { id: 'sslv',      name: 'SS.lv',     type: 'published',   txt: '● Published · 2 days ago',    cls: 'pub',   hasError: false },
      { id: 'autoplius', name: 'Autoplius', type: 'unpublished', txt: '○ Not published',             cls: 'unpub', hasError: false },
      { id: 'city24',    name: 'City24',    type: 'error',       txt: '✕ Error · Click to expand',   cls: 'err',   hasError: true  },
    ];
    container.innerHTML = `
      <div class="pub-panel">
        <div class="pub-panel__header">
          <div class="pub-panel__title">Publishing channels</div>
          <div style="font-size:10.5px;margin-top:3px;display:flex;gap:8px;">
            <span style="color:#b03030;">2 errors</span>
            <span style="color:#8a9aaa;">·</span>
            <span style="color:#2d8a4e;">2 published</span>
            <span style="color:#8a9aaa;">·</span>
            <span style="color:#8a9aaa;">1 pending</span>
          </div>
        </div>
        <div class="pub-panel__body">
          ${channelData.map(ch => `
          <div>
            <div class="ch-row" style="${ch.hasError?'cursor:pointer;':''}" ${ch.hasError?`onclick="toggleError('${ch.id}')"`:''}>
              ${dotHtml(ch.type === 'published' ? 'published' : ch.type === 'error' ? 'error' : 'unpublished')}
              <div>
                <div class="ch-name">${ch.name}</div>
                <div class="ch-status-text ch-status-text--${ch.cls}">${ch.txt}</div>
              </div>
              ${ch.hasError ? `<button class="jq-btn jq-btn--xs" style="color:#b03030;" onclick="event.stopPropagation();toggleError('${ch.id}')">›</button>` : ''}
            </div>
            ${ch.hasError ? `
            <div id="err_${ch.id}" class="ch-error-expand ${expandedErrors.has(ch.id)?'ch-error-expand--open':''}">
              <div style="background:#fff8f8;border:1px solid #e8c0c0;border-radius:3px;padding:7px 9px;margin:0 0 6px 16px;font-size:11px;">
                <div style="color:#801010;font-weight:600;margin-bottom:4px;">Publishing failed</div>
                <div style="color:#a03030;margin-bottom:5px;">Missing required fields: <strong>${ch.id==='mobilede'?'Mileage (km), Fuel type':'Registration number'}</strong></div>
                <div style="display:flex;gap:5px;">
                  <button class="jq-btn jq-btn--sm" onclick="setState('b2')">View details</button>
                  <button class="jq-btn jq-btn--sm jq-btn--primary" onclick="setState('b3')">Go to Builder →</button>
                </div>
              </div>
            </div>` : ''}
          </div>`).join('')}
        </div>
        <div class="pub-panel__footer">
          <button class="jq-btn jq-btn--red" onclick="setState('b2')">Fix errors</button>
          <button class="jq-btn jq-btn--primary" onclick="startPublishing()">Publish remaining →</button>
        </div>
      </div>`;

    window.toggleError = function(id) {
      if (expandedErrors.has(id)) expandedErrors.delete(id);
      else expandedErrors.add(id);
      const el = document.getElementById('err_' + id);
      if (el) el.classList.toggle('ch-error-expand--open', expandedErrors.has(id));
    };
  },

  b2(container) {
    container.innerHTML = `
      <div class="pub-panel">
        <div class="pub-panel__header">
          <div class="pub-panel__title" style="color:#b03030;">Error details</div>
        </div>
        <div class="pub-panel__body">
          <!-- Mobile.de expanded -->
          <div class="ch-row" style="cursor:pointer;" onclick="toggleError('mobilede')">
            ${dotHtml('error')}
            <div>
              <div class="ch-name">Mobile.de</div>
              <div class="ch-status-text ch-status-text--err">✕ Publishing failed</div>
            </div>
            <button class="jq-btn jq-btn--xs" style="color:#b03030;">▾</button>
          </div>
          <div id="err_mobilede" class="ch-error-expand ch-error-expand--open">
            <div style="background:#fff0f0;border:1px solid #e0a0a0;border-radius:3px;padding:8px 10px;margin:0 0 6px 16px;">
              <div style="font-size:11.5px;color:#801010;font-weight:700;margin-bottom:4px;">Publishing failed</div>
              <div style="font-size:11px;color:#a03030;margin-bottom:6px;">
                Missing required fields:<br>
                <strong>· Mileage (km)</strong><br>
                <strong>· Fuel type</strong>
              </div>
              <div style="display:flex;gap:5px;">
                <button class="jq-btn jq-btn--sm jq-btn--primary" onclick="setState('b3')">Go to Vehicle Builder →</button>
                <button class="jq-btn jq-btn--sm">Retry channel</button>
              </div>
            </div>
          </div>

          <!-- Auto24 published -->
          <div class="ch-row">
            ${dotHtml('published')}
            <div>
              <div class="ch-name">Auto24</div>
              <div class="ch-status-text ch-status-text--pub">● Published · 2 days ago</div>
            </div>
          </div>
          <div class="ch-row">
            ${dotHtml('published')}
            <div>
              <div class="ch-name">SS.lv</div>
              <div class="ch-status-text ch-status-text--pub">● Published · 2 days ago</div>
            </div>
          </div>
          <div class="ch-row">
            ${dotHtml('unpublished')}
            <div>
              <div class="ch-name">Autoplius</div>
              <div class="ch-status-text ch-status-text--unpub">○ Not published</div>
            </div>
          </div>
          <!-- City24 collapsed -->
          <div>
            <div class="ch-row" style="cursor:pointer;" onclick="toggleError('city24')">
              ${dotHtml('error')}
              <div>
                <div class="ch-name">City24</div>
                <div class="ch-status-text ch-status-text--err">✕ Publishing failed</div>
              </div>
              <button class="jq-btn jq-btn--xs" style="color:#b03030;">›</button>
            </div>
            <div id="err_city24" class="ch-error-expand">
              <div style="background:#fff0f0;border:1px solid #e0a0a0;border-radius:3px;padding:8px 10px;margin:0 0 6px 16px;">
                <div style="font-size:11.5px;color:#801010;font-weight:700;margin-bottom:4px;">Publishing failed</div>
                <div style="font-size:11px;color:#a03030;margin-bottom:6px;">Missing: <strong>Registration number</strong></div>
                <div style="display:flex;gap:5px;">
                  <button class="jq-btn jq-btn--sm jq-btn--primary" onclick="setState('b3')">Go to Vehicle Builder →</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="pub-panel__footer">
          <button class="jq-btn" onclick="setState('b1')">← Back</button>
          <button class="jq-btn jq-btn--primary" onclick="setState('b3')">Go to Vehicle Builder →</button>
        </div>
      </div>`;

    window.toggleError = function(id) {
      const el = document.getElementById('err_' + id);
      if (el) el.classList.toggle('ch-error-expand--open');
    };
  },

  b3(container) {
    // This state redirects to builder view — handled by ep1 page
    container.innerHTML = `
      <div class="pub-panel">
        <div class="pub-panel__header">
          <div style="background:#fff3cd;border:1px solid #e0c060;border-radius:3px;padding:5px 8px;margin:-2px;">
            <span style="font-size:11px;color:#7a5010;font-weight:600;">
              ⚠ Complete these fields to publish on Mobile.de
            </span>
          </div>
        </div>
        <div class="pub-panel__body">
          <div style="font-size:11.5px;color:#5a7080;margin-bottom:8px;">Fields highlighted in the builder form:</div>
          <div style="display:flex;gap:5px;flex-direction:column;">
            <div style="background:#fff0f0;border:1px solid #e0b0b0;border-radius:3px;padding:5px 8px;font-size:11px;">
              <span style="color:#b03030;font-weight:600;">Mileage (km)</span> — Required by Mobile.de
            </div>
            <div style="background:#fff0f0;border:1px solid #e0b0b0;border-radius:3px;padding:5px 8px;font-size:11px;">
              <span style="color:#b03030;font-weight:600;">Fuel type</span> — Required by Mobile.de
            </div>
          </div>
        </div>
        <div class="pub-panel__footer">
          <button class="jq-btn" onclick="setState('b1')">← Back to Publishing</button>
          <button class="jq-btn jq-btn--green" onclick="setState('b4')">Save & Return →</button>
        </div>
      </div>`;
  },

  b4(container) {
    container.innerHTML = `
      <div class="pub-panel">
        <div class="pub-panel__header">
          <div class="pub-panel__title" style="color:#2d8a4e;">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style="vertical-align:-1px;"><path d="M2 6l3 3 5-5" stroke="#2d8a4e" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Fields updated · Ready to republish
          </div>
        </div>
        <div class="pub-panel__body">
          <div class="ch-row">
            ${dotHtml('published')}
            <div>
              <div class="ch-name">Auto24</div>
              <div class="ch-status-text ch-status-text--pub">● Published</div>
            </div>
          </div>
          <div class="ch-row">
            ${dotHtml('pending')}
            <div>
              <div class="ch-name">Mobile.de</div>
              <div class="ch-status-text ch-status-text--pend">○ Ready to retry</div>
            </div>
            <button class="jq-btn jq-btn--xs jq-btn--primary" onclick="startPublishing()">Retry</button>
          </div>
          <div class="ch-row">
            ${dotHtml('published')}
            <div>
              <div class="ch-name">SS.lv</div>
              <div class="ch-status-text ch-status-text--pub">● Published</div>
            </div>
          </div>
          <div class="ch-row">
            ${dotHtml('unpublished')}
            <div>
              <div class="ch-name">Autoplius</div>
              <div class="ch-status-text ch-status-text--unpub">○ Not published</div>
            </div>
          </div>
          <div class="ch-row">
            ${dotHtml('pending')}
            <div>
              <div class="ch-name">City24</div>
              <div class="ch-status-text ch-status-text--pend">○ Ready to retry</div>
            </div>
            <button class="jq-btn jq-btn--xs jq-btn--primary" onclick="startPublishing()">Retry</button>
          </div>
        </div>
        <div class="pub-panel__footer">
          <button class="jq-btn jq-btn--primary" onclick="startPublishing()">
            <svg width="13" height="13" viewBox="0 0 13 13"><path d="M6.5 1v8M3.5 3.5l3-2.5 3 2.5M2 10h9v2H2z" stroke="currentColor" stroke-width="1.3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Retry all failed channels
          </button>
        </div>
      </div>`;
  },

  c1(container) {
    const publishedAt = 'Today, 14:32';
    container.innerHTML = `
      <div class="pub-panel">
        <div class="pub-panel__header" style="background:linear-gradient(180deg,#d4f0da,#b8e4c4);">
          <span class="pub-panel__title" style="color:#1a5a30;">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style="vertical-align:-2px;"><circle cx="7" cy="7" r="6" fill="#2d8a4e"/><path d="M4 7l2.5 2.5L10 5" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Published on all channels
          </span>
        </div>
        <div class="pub-panel__body">
          ${CHANNELS.map(ch => `
          <div class="ch-row" style="position:relative;" onmouseenter="this.querySelector('.ext-link').style.opacity='1'" onmouseleave="this.querySelector('.ext-link').style.opacity='0'">
            ${dotHtml('published')}
            <div>
              <div class="ch-name">${ch.name}</div>
              <div class="ch-status-text ch-status-text--pub">● Published · ${publishedAt}</div>
            </div>
            <div class="ext-link tooltip-wrap" style="opacity:0;transition:opacity 0.15s;">
              <a href="https://${ch.url}" target="_blank" class="jq-btn jq-btn--xs" title="View on ${ch.name}">
                <svg width="11" height="11" viewBox="0 0 11 11"><path d="M4.5 2H2v7h7V6.5M5.5 1h4.5v4.5M5.5 5.5L10 1" stroke="currentColor" stroke-width="1.3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
                View
              </a>
              <span class="tooltip">View live on ${ch.name}</span>
            </div>
          </div>`).join('')}
        </div>
        <div class="pub-panel__footer">
          <button class="jq-btn" onclick="setState('c2')" style="color:#b03030;">Unpublish from channels…</button>
        </div>
      </div>`;
  },

  c2(container) {
    function updateUnpubBtn() {
      const n = selectedUnpublish.size;
      const btn = document.getElementById('unpub-btn');
      if (btn) {
        btn.textContent = n > 0 ? `Unpublish ${n} channel${n > 1 ? 's' : ''} →` : 'Select at least 1';
        btn.disabled = n === 0;
        btn.className = 'jq-btn ' + (n > 0 ? 'jq-btn--red' : 'jq-btn--disabled');
      }
    }
    container.innerHTML = `
      <div class="pub-panel">
        <div class="pub-panel__header">
          <span class="pub-panel__title">Select channels to unpublish</span>
        </div>
        <div class="pub-panel__body">
          ${CHANNELS.map(ch => `
          <div class="ch-row" style="cursor:pointer;" onclick="toggleUnpub('${ch.id}')">
            <input type="checkbox" class="jq-check" id="unpub_${ch.id}"
              ${selectedUnpublish.has(ch.id) ? 'checked' : ''}
              onclick="event.stopPropagation(); toggleUnpub('${ch.id}')">
            <div>
              <div class="ch-name">${ch.name}</div>
              <div class="ch-status-text ch-status-text--pub">● Published</div>
            </div>
          </div>`).join('')}
        </div>
        <div class="pub-panel__footer">
          <button class="jq-btn" onclick="setState('c1')">Cancel</button>
          <button id="unpub-btn" class="jq-btn jq-btn--red" onclick="setState('c3')">
            Unpublish ${selectedUnpublish.size} channels →
          </button>
        </div>
      </div>`;

    window.toggleUnpub = function(id) {
      if (selectedUnpublish.has(id)) selectedUnpublish.delete(id);
      else selectedUnpublish.add(id);
      const cb = document.getElementById('unpub_' + id);
      if (cb) cb.checked = selectedUnpublish.has(id);
      updateUnpubBtn();
    };
  },

  c3(container) {
    const toUnpublish = [...selectedUnpublish].map(id => CHANNELS.find(c => c.id === id)).filter(Boolean);
    // Show confirmation overlay — rendered by showConfirmUnpublish in ep1
    container.innerHTML = `
      <div class="pub-panel">
        <div class="pub-panel__header">
          <span class="pub-panel__title" style="color:#b03030;">Confirm unpublish</span>
        </div>
        <div class="pub-panel__body">
          <div class="alert alert--warn" style="margin-bottom:8px;">
            <svg width="14" height="14" viewBox="0 0 12 12" style="flex-shrink:0;color:#b07820;"><path d="M6 1.5L11 10H1L6 1.5Z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M6 4.5v2.5M6 8.5v.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
            <div>
              <div style="font-weight:700;margin-bottom:3px;">Unpublish from ${toUnpublish.length} channel${toUnpublish.length>1?'s':''}?</div>
              ${toUnpublish.map(ch => `<div>· ${ch.name} (${ch.url})</div>`).join('')}
              <div style="margin-top:5px;font-size:10.5px;">This will remove the listing immediately. Visitors will not see it anymore.</div>
            </div>
          </div>
        </div>
        <div class="pub-panel__footer">
          <button class="jq-btn" onclick="setState('c2')">← Cancel</button>
          <button class="jq-btn jq-btn--red" onclick="setState('c4')">
            Unpublish now
          </button>
        </div>
      </div>`;
  },

  c4(container) {
    const unpublishedIds = [...selectedUnpublish];
    container.innerHTML = `
      <div class="pub-panel">
        <div class="pub-panel__header">
          <span class="pub-panel__title">Publishing channels</span>
          <div style="font-size:10.5px;margin-top:3px;display:flex;gap:8px;">
            <span style="color:#2d8a4e;">${5 - unpublishedIds.length} published</span>
            <span>·</span>
            <span style="color:#8a9aaa;">${unpublishedIds.length} unpublished</span>
          </div>
        </div>
        <div class="pub-panel__body">
          ${CHANNELS.map(ch => {
            const isUnpub = unpublishedIds.includes(ch.id);
            return `
            <div class="ch-row">
              ${dotHtml(isUnpub ? 'unpublished' : 'published')}
              <div>
                <div class="ch-name">${ch.name}</div>
                ${isUnpub
                  ? `<div class="ch-status-text ch-status-text--unpub">○ Unpublished</div>`
                  : `<div class="ch-status-text ch-status-text--pub">● Published · Today, 14:32</div>`}
              </div>
            </div>`;
          }).join('')}
        </div>
        <div class="pub-panel__footer">
          <button class="jq-btn jq-btn--primary" onclick="setState('a2')">
            <svg width="13" height="13" viewBox="0 0 13 13"><path d="M6.5 1v8M3.5 3.5l3-2.5 3 2.5M2 10h9v2H2z" stroke="currentColor" stroke-width="1.3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Publish to channels →
          </button>
        </div>
      </div>`;
  },
};

// ─── State machine ──────────────────────────────────────────────────────────
function setState(key) {
  if (!PUB_STATES[key]) key = 'a1';
  currentPubState = key;
  if (progressInterval) { clearInterval(progressInterval); progressInterval = null; }
  const container = document.getElementById('pub-panel-container');
  if (container && STATE_RENDERERS[key]) {
    STATE_RENDERERS[key](container);
    container.classList.remove('panel-slide-in');
    void container.offsetWidth;
    container.classList.add('panel-slide-in');
  }
  history.replaceState(null, '', '#' + key);
  updateStatusPill(key);
}

function startPublishing() {
  selectedChannels = new Set(['auto24', 'mobilede', 'sslv', 'autoplius']);
  setState('a4');
}

function updateStatusPill(key) {
  const pill = document.getElementById('pub-status-pill');
  if (!pill) return;
  if (key === 'a4') {
    pill.className = 'pub-status-pill pub-status-pill--busy';
    pill.innerHTML = `<span class="spin" style="display:inline-block;">⟳</span> Publishing…`;
  } else if (key === 'a5' || key === 'c1') {
    pill.className = 'pub-status-pill pub-status-pill--done';
    pill.innerHTML = `✓ Published`;
  } else if (key === 'b1' || key === 'b2') {
    pill.className = 'pub-status-pill pub-status-pill--error';
    pill.innerHTML = `✕ 2 errors`;
  } else {
    pill.className = 'pub-status-pill pub-status-pill--idle';
    pill.innerHTML = `Publishing`;
  }
}

// Initialize from URL hash
function initPubPanel() {
  const hash = location.hash.slice(1).toLowerCase();
  const key = (hash && PUB_STATES[hash]) ? hash : 'a1';
  setState(key);
}

window.addEventListener('load', initPubPanel);
