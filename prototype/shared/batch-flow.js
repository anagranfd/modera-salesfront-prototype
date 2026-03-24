// batch-flow.js — State machine for EP3 Batch Publishing Wizard

const BATCH_VEHICLES = [
  { id: 'v1', make: 'Volkswagen', model: 'Golf 1.6 TDI',   year: 2019, reg: 'ABC-123', status: 'ready' },
  { id: 'v2', make: 'Toyota',     model: 'RAV4 2.0 CVT',   year: 2021, reg: 'XYZ-789', status: 'issues', issues: { mobilede: ['Mileage (km)', 'Fuel type'] } },
  { id: 'v3', make: 'BMW',        model: '320d xDrive',    year: 2020, reg: 'BMW-555', status: 'ready' },
  { id: 'v4', make: 'Audi',       model: 'A4 2.0 TFSI',   year: 2018, reg: 'AUD-111', status: 'issues', issues: { mobilede: ['Reg. number'] } },
];

const BATCH_CHANNELS = [
  { id: 'auto24',   name: 'Auto24'   },
  { id: 'mobilede', name: 'Mobile.de'},
  { id: 'sslv',     name: 'SS.lv'   },
  { id: 'autoplius',name: 'Autoplius'},
  { id: 'city24',   name: 'City24'  },
];

let batchSelectedChannels = new Set(['auto24', 'mobilede', 'sslv']);
let batchStep = 'b1'; // b1→b2→b3→b3a→b4→b5/b6/b7
let batchProgressStep = 0;
let batchProgressInterval = null;

// Matrix: vehicleId → channelId → status
const batchMatrix = {};
BATCH_VEHICLES.forEach(v => {
  batchMatrix[v.id] = {};
  BATCH_CHANNELS.forEach(ch => {
    batchMatrix[v.id][ch.id] = 'waiting';
  });
});

// ─── Batch Wizard ────────────────────────────────────────────────────────────
function renderBatchStep(step) {
  batchStep = step;
  const container = document.getElementById('batch-wizard-container');
  if (!container) return;

  const renderers = {
    b2: renderBatchChannelSelect,
    b3: renderBatchValidation,
    b3a: renderBatchFixIssues,
    b4: renderBatchProgress,
    b5: renderBatchSuccess,
    b6: renderBatchPartialError,
    b7: renderBatchAllFailed,
  };
  if (renderers[step]) renderers[step](container);
  history.replaceState(null, '', '#' + step);
}

function wizardStepsHtml(active) {
  const steps = [
    { key: 'b2', label: '1. Channels' },
    { key: 'b3', label: '2. Validate' },
    { key: 'b4', label: '3. Publish' },
  ];
  return `<div class="wizard-steps">
    ${steps.map((s, i) => {
      const isDone = steps.findIndex(x => x.key === active) > i;
      const isActive = s.key === active;
      const cls = isDone ? 'wizard-steps__step--done' : isActive ? 'wizard-steps__step--active' : '';
      const dot = isDone ? '✓' : isActive ? '●' : '○';
      const html = `<span class="wizard-steps__step ${cls}">${dot} ${s.label}</span>`;
      return i < steps.length - 1 ? html + `<span class="wizard-steps__connector"></span>` : html;
    }).join('')}
  </div>`;
}

function renderBatchChannelSelect(container) {
  function updateBtn() {
    const n = batchSelectedChannels.size;
    const btn = document.getElementById('batch-next-btn');
    if (btn) {
      btn.textContent = n > 0 ? `Next: Validate (${n} channels) →` : 'Select at least 1';
      btn.disabled = n === 0;
      btn.className = 'jq-btn ' + (n > 0 ? 'jq-btn--primary' : 'jq-btn--disabled');
    }
  }
  container.innerHTML = `
    <div class="pub-backdrop">
      <div class="pub-dialog" style="min-width:540px;">
        <div class="pub-dialog__header">
          <div>
            <div class="pub-dialog__title">Publish 4 vehicles · Step 1 of 3: Select channels</div>
            ${wizardStepsHtml('b2')}
          </div>
          <button class="pub-dialog__close" onclick="closeBatchWizard()">✕</button>
        </div>
        <div class="pub-dialog__body">
          <div style="font-size:11.5px;color:#5a7080;margin-bottom:10px;">
            Select which portals to publish these 4 vehicles on.
          </div>
          <div style="display:flex;gap:10px;flex-direction:column;">
            ${BATCH_CHANNELS.map(ch => `
            <label style="display:flex;align-items:center;gap:8px;cursor:pointer;padding:5px 8px;border-radius:3px;border:1px solid ${batchSelectedChannels.has(ch.id)?'#5aaed0':'var(--border)'};background:${batchSelectedChannels.has(ch.id)?'#eef6fb':'#fafcfe'};">
              <input type="checkbox" class="jq-check" id="bch_${ch.id}"
                ${batchSelectedChannels.has(ch.id) ? 'checked' : ''}
                onchange="toggleBatchChannel('${ch.id}')">
              <span style="font-size:12px;font-weight:600;color:var(--text-main);">${ch.name}</span>
            </label>`).join('')}
          </div>
        </div>
        <div class="pub-dialog__footer">
          <button class="jq-btn" onclick="closeBatchWizard()">Cancel</button>
          <button id="batch-next-btn" class="jq-btn jq-btn--primary" onclick="renderBatchStep('b3')">
            Next: Validate (${batchSelectedChannels.size} channels) →
          </button>
        </div>
      </div>
    </div>`;

  window.toggleBatchChannel = function(id) {
    if (batchSelectedChannels.has(id)) batchSelectedChannels.delete(id);
    else batchSelectedChannels.add(id);
    const cb = document.getElementById('bch_' + id);
    if (cb) {
      const label = cb.closest('label');
      if (label) {
        label.style.borderColor = batchSelectedChannels.has(id) ? '#5aaed0' : 'var(--border)';
        label.style.background = batchSelectedChannels.has(id) ? '#eef6fb' : '#fafcfe';
      }
    }
    updateBtn();
  };
}

function getValidationMatrix() {
  const chans = [...batchSelectedChannels];
  return BATCH_VEHICLES.map(v => {
    const row = { vehicle: v, cells: {} };
    chans.forEach(cid => {
      if (v.issues && v.issues[cid]) {
        row.cells[cid] = { status: 'warn', missing: v.issues[cid] };
      } else {
        row.cells[cid] = { status: 'ready' };
      }
    });
    return row;
  });
}

function renderBatchValidation(container) {
  const matrix = getValidationMatrix();
  const chans = [...batchSelectedChannels].map(id => BATCH_CHANNELS.find(c => c.id === id)).filter(Boolean);
  const hasIssues = matrix.some(r => Object.values(r.cells).some(c => c.status === 'warn'));
  const issueVehicles = matrix.filter(r => Object.values(r.cells).some(c => c.status === 'warn')).map(r => r.vehicle.make + ' ' + r.vehicle.model.split(' ')[0]);

  container.innerHTML = `
    <div class="pub-backdrop">
      <div class="pub-dialog" style="min-width:580px;max-width:720px;">
        <div class="pub-dialog__header">
          <div>
            <div class="pub-dialog__title">Publish 4 vehicles · Step 2 of 3: Validation</div>
            ${wizardStepsHtml('b3')}
          </div>
          <button class="pub-dialog__close" onclick="closeBatchWizard()">✕</button>
        </div>
        <div class="pub-dialog__body">
          ${hasIssues ? `
          <div class="alert alert--warn" style="margin-bottom:10px;">
            <svg width="14" height="14" viewBox="0 0 12 12" style="flex-shrink:0;color:#b07820;"><path d="M6 1.5L11 10H1L6 1.5Z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M6 4.5v2.5M6 8.5v.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
            <div><strong>${issueVehicles.join(' and ')}</strong> will be skipped for Mobile.de due to missing required fields.</div>
          </div>` : ''}

          <table class="batch-matrix">
            <thead>
              <tr>
                <th>Vehicle</th>
                ${chans.map(ch => `<th>${ch.name}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${matrix.map(row => `
              <tr>
                <td style="font-weight:600;">${row.vehicle.make} ${row.vehicle.model.split(' ')[0]}</td>
                ${chans.map(ch => {
                  const cell = row.cells[ch.id];
                  if (cell.status === 'ready') {
                    return `<td class="batch-matrix__cell--ready">✓ Ready</td>`;
                  } else {
                    return `<td class="batch-matrix__cell--error" title="Missing: ${cell.missing.join(', ')}">⚠ Missing ${cell.missing.length}</td>`;
                  }
                }).join('')}
              </tr>`).join('')}
            </tbody>
          </table>
        </div>
        <div class="pub-dialog__footer">
          <button class="jq-btn" onclick="renderBatchStep('b2')">← Back</button>
          ${hasIssues ? `<button class="jq-btn" onclick="renderBatchStep('b3a')">Fix issues first</button>` : ''}
          <button class="jq-btn jq-btn--primary" onclick="renderBatchStep('b4')">Proceed anyway →</button>
        </div>
      </div>
    </div>`;
}

function renderBatchFixIssues(container) {
  container.innerHTML = `
    <div class="pub-backdrop">
      <div class="pub-dialog" style="min-width:580px;max-width:720px;">
        <div class="pub-dialog__header">
          <div>
            <div class="pub-dialog__title">Fix issues — Vehicle 1 of 2 · Toyota RAV4</div>
            ${wizardStepsHtml('b3')}
          </div>
          <button class="pub-dialog__close" onclick="closeBatchWizard()">✕</button>
        </div>
        <div class="pub-dialog__body">
          <div class="alert alert--warn" style="margin-bottom:12px;">
            <svg width="14" height="14" viewBox="0 0 12 12" style="flex-shrink:0;color:#b07820;"><path d="M6 1.5L11 10H1L6 1.5Z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M6 4.5v2.5M6 8.5v.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
            <div><strong>Mobile.de</strong> · Missing 2 fields: Mileage (km), Fuel type</div>
          </div>
          <div class="form-row form-row--2col">
            <div>
              <label class="jq-label">Make</label>
              <input class="jq-input" value="Toyota" disabled>
            </div>
            <div>
              <label class="jq-label">Model</label>
              <input class="jq-input" value="RAV4 2.0 CVT" disabled>
            </div>
          </div>
          <div class="form-row form-row--2col">
            <div>
              <label class="jq-label" style="color:#b03030;">Mileage (km) *</label>
              <input class="jq-input builder-form__field--highlighted" id="fix-mileage" placeholder="e.g. 45000" type="number">
              <div style="font-size:10px;color:#b03030;margin-top:2px;">Required by Mobile.de</div>
            </div>
            <div>
              <label class="jq-label" style="color:#b03030;">Fuel type *</label>
              <select class="jq-select builder-form__field--highlighted" id="fix-fuel">
                <option value="">Select fuel type…</option>
                <option>Diesel</option>
                <option>Petrol</option>
                <option>Hybrid</option>
                <option>Electric</option>
              </select>
              <div style="font-size:10px;color:#b03030;margin-top:2px;">Required by Mobile.de</div>
            </div>
          </div>
          <div class="form-row form-row--2col">
            <div>
              <label class="jq-label">Year</label>
              <input class="jq-input" value="2021" disabled>
            </div>
            <div>
              <label class="jq-label">Reg. number</label>
              <input class="jq-input" value="XYZ-789" disabled>
            </div>
          </div>
        </div>
        <div class="pub-dialog__footer">
          <button class="jq-btn" onclick="renderBatchStep('b3')">← Back to validation</button>
          <button class="jq-btn" onclick="renderBatchStep('b3')">Skip this vehicle</button>
          <button class="jq-btn jq-btn--green" onclick="renderBatchStep('b4')">Save & Next vehicle →</button>
        </div>
      </div>
    </div>`;
}

function renderBatchProgress(container) {
  const chans = [...batchSelectedChannels].map(id => BATCH_CHANNELS.find(c => c.id === id)).filter(Boolean);
  const total = BATCH_VEHICLES.length * chans.length;
  let done = 0;

  // Initialize matrix statuses
  BATCH_VEHICLES.forEach(v => {
    chans.forEach(ch => {
      batchMatrix[v.id][ch.id] = 'waiting';
    });
  });

  function renderProgressTable(currentV, currentCh) {
    const pct = Math.round((done / total) * 100);
    return `
      <div class="pub-backdrop">
        <div class="pub-dialog" style="min-width:580px;max-width:720px;">
          <div class="pub-dialog__header">
            <div>
              <div class="pub-dialog__title">Publishing ${BATCH_VEHICLES.length} vehicles · Step 3 of 3</div>
              ${wizardStepsHtml('b4')}
            </div>
          </div>
          <div class="pub-dialog__body">
            <div style="margin-bottom:12px;">
              <div style="display:flex;justify-content:space-between;font-size:11px;color:#5a7080;margin-bottom:4px;">
                <span>${done} of ${total} operations</span>
                <span>${pct}%</span>
              </div>
              <div class="overall-progress"><div class="overall-progress__fill" style="width:${pct}%"></div></div>
            </div>
            <table class="batch-matrix">
              <thead>
                <tr>
                  <th>Vehicle</th>
                  ${chans.map(ch => `<th>${ch.name}</th>`).join('')}
                </tr>
              </thead>
              <tbody>
                ${BATCH_VEHICLES.map(v => `
                <tr>
                  <td style="font-weight:600;">${v.make} ${v.model.split(' ')[0]}</td>
                  ${chans.map(ch => {
                    const st = batchMatrix[v.id][ch.id];
                    const isSkip = v.issues && v.issues[ch.id];
                    if (isSkip && st !== 'done') return `<td class="batch-matrix__cell--skipped">—</td>`;
                    if (st === 'done')    return `<td class="batch-matrix__cell--done">✓</td>`;
                    if (st === 'sending') return `<td class="batch-matrix__cell--sending"><span class="spin" style="display:inline-block;">⟳</span></td>`;
                    if (st === 'waiting') return `<td class="batch-matrix__cell--waiting">·</td>`;
                    return `<td>?</td>`;
                  }).join('')}
                </tr>`).join('')}
              </tbody>
            </table>
          </div>
          <div class="pub-dialog__footer">
            <button class="jq-btn jq-btn--disabled" disabled>Please wait…</button>
          </div>
        </div>
      </div>`;
  }

  // Flatten operations
  const ops = [];
  BATCH_VEHICLES.forEach(v => {
    chans.forEach(ch => {
      const isSkip = v.issues && v.issues[ch.id];
      if (!isSkip) ops.push({ vid: v.id, cid: ch.id });
    });
  });

  let opIdx = 0;
  container.innerHTML = renderProgressTable(null, null);

  if (batchProgressInterval) clearInterval(batchProgressInterval);
  batchProgressInterval = setInterval(() => {
    if (opIdx < ops.length) {
      if (opIdx > 0) {
        const prev = ops[opIdx - 1];
        batchMatrix[prev.vid][prev.cid] = 'done';
        done++;
      }
      const cur = ops[opIdx];
      batchMatrix[cur.vid][cur.cid] = 'sending';
      opIdx++;
      container.innerHTML = renderProgressTable(cur.vid, cur.cid);
    } else {
      if (opIdx > 0 && ops.length > 0) {
        const last = ops[opIdx - 1];
        batchMatrix[last.vid][last.cid] = 'done';
        done++;
      }
      clearInterval(batchProgressInterval);
      container.innerHTML = renderProgressTable(null, null);
      setTimeout(() => renderBatchStep('b5'), 600);
    }
  }, 600);
}

function renderBatchSuccess(container) {
  const chans = [...batchSelectedChannels].map(id => BATCH_CHANNELS.find(c => c.id === id)).filter(Boolean);
  const total = BATCH_VEHICLES.length * chans.length;
  const skipped = BATCH_VEHICLES.filter(v => v.issues).reduce((acc, v) => acc + Object.keys(v.issues || {}).filter(cid => batchSelectedChannels.has(cid)).length, 0);
  const successful = total - skipped;

  container.innerHTML = `
    <div class="pub-backdrop">
      <div class="pub-dialog" style="min-width:580px;max-width:720px;">
        <div class="pub-dialog__header" style="background:linear-gradient(180deg,#3a9a5a,#1d6a38);">
          <div>
            <div class="pub-dialog__title">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="vertical-align:-3px;"><circle cx="8" cy="8" r="7" fill="rgba(255,255,255,0.2)"/><path d="M5 8l2.5 2.5L11 6" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              Batch publish complete
            </div>
            ${wizardStepsHtml('b5')}
          </div>
          <button class="pub-dialog__close" style="color:rgba(255,255,255,0.8);" onclick="closeBatchWizard()">✕</button>
        </div>
        <div class="pub-dialog__body">
          <div class="alert alert--success" style="margin-bottom:10px;">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style="flex-shrink:0;"><circle cx="7" cy="7" r="6" fill="#2d8a4e"/><path d="M4.5 7l2 2L9.5 5.5" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <div><strong>${successful} of ${total} operations successful</strong>${skipped>0?` · ${skipped} skipped (missing fields)`:''}</div>
          </div>
          <table class="batch-matrix">
            <thead>
              <tr>
                <th>Vehicle</th>
                ${chans.map(ch => `<th>${ch.name}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${BATCH_VEHICLES.map(v => `
              <tr>
                <td style="font-weight:600;">${v.make} ${v.model.split(' ')[0]}</td>
                ${chans.map(ch => {
                  const isSkip = v.issues && v.issues[ch.id];
                  return isSkip
                    ? `<td class="batch-matrix__cell--skipped" title="Skipped: missing required fields">—</td>`
                    : `<td class="batch-matrix__cell--done">✓</td>`;
                }).join('')}
              </tr>`).join('')}
            </tbody>
          </table>
          ${skipped > 0 ? `<div style="font-size:10.5px;color:#5a7080;margin-top:8px;">Note: ${skipped} vehicle-channel combinations were skipped due to missing required fields.</div>` : ''}
        </div>
        <div class="pub-dialog__footer">
          <button class="jq-btn jq-btn--primary" onclick="closeBatchWizard()">Done</button>
        </div>
      </div>
    </div>`;
}

function renderBatchPartialError(container) {
  const chans = [...batchSelectedChannels].map(id => BATCH_CHANNELS.find(c => c.id === id)).filter(Boolean);
  container.innerHTML = `
    <div class="pub-backdrop">
      <div class="pub-dialog" style="min-width:580px;max-width:720px;">
        <div class="pub-dialog__header" style="background:linear-gradient(180deg,#c87820,#8a4a10);">
          <div>
            <div class="pub-dialog__title">
              ⚠ Batch publish: partial results
            </div>
            ${wizardStepsHtml('b6')}
          </div>
          <button class="pub-dialog__close" onclick="closeBatchWizard()">✕</button>
        </div>
        <div class="pub-dialog__body">
          <div class="alert alert--warn" style="margin-bottom:10px;">
            8 of 10 operations successful · 2 failed
          </div>
          <table class="batch-matrix">
            <thead>
              <tr>
                <th>Vehicle</th>
                ${chans.map(ch => `<th>${ch.name}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="font-weight:600;">VW Golf</td>
                <td class="batch-matrix__cell--done">✓</td>
                <td class="batch-matrix__cell--done">✓</td>
                <td class="batch-matrix__cell--done">✓</td>
              </tr>
              <tr>
                <td style="font-weight:600;">Toyota RAV4</td>
                <td class="batch-matrix__cell--done">✓</td>
                <td class="batch-matrix__cell--skipped">—</td>
                <td class="batch-matrix__cell--done">✓</td>
              </tr>
              <tr>
                <td style="font-weight:600;">BMW 320d</td>
                <td class="batch-matrix__cell--done">✓</td>
                <td class="batch-matrix__cell--error" title="Network timeout">✕</td>
                <td class="batch-matrix__cell--done">✓</td>
              </tr>
              <tr>
                <td style="font-weight:600;">Audi A4</td>
                <td class="batch-matrix__cell--done">✓</td>
                <td class="batch-matrix__cell--skipped">—</td>
                <td class="batch-matrix__cell--error" title="Server error 503">✕</td>
              </tr>
            </tbody>
          </table>
          <div style="font-size:10.5px;color:#5a7080;margin-top:8px;">Errors: BMW 320d – Mobile.de (network timeout); Audi A4 – SS.lv (server error 503)</div>
        </div>
        <div class="pub-dialog__footer">
          <button class="jq-btn" onclick="closeBatchWizard()">Close</button>
          <button class="jq-btn jq-btn--primary" onclick="renderBatchStep('b4')">Retry failed →</button>
        </div>
      </div>
    </div>`;
}

function renderBatchAllFailed(container) {
  const chans = [...batchSelectedChannels].map(id => BATCH_CHANNELS.find(c => c.id === id)).filter(Boolean);
  container.innerHTML = `
    <div class="pub-backdrop">
      <div class="pub-dialog" style="min-width:580px;max-width:720px;">
        <div class="pub-dialog__header" style="background:linear-gradient(180deg,#c83030,#801010);">
          <div>
            <div class="pub-dialog__title">✕ Batch publish failed</div>
            ${wizardStepsHtml('b7')}
          </div>
          <button class="pub-dialog__close" onclick="closeBatchWizard()">✕</button>
        </div>
        <div class="pub-dialog__body">
          <div class="alert alert--err" style="margin-bottom:10px;">
            All operations failed · Connection error or portal unavailable
          </div>
          <table class="batch-matrix">
            <thead>
              <tr>
                <th>Vehicle</th>
                ${chans.map(ch => `<th>${ch.name}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${BATCH_VEHICLES.map(v => `
              <tr>
                <td style="font-weight:600;">${v.make} ${v.model.split(' ')[0]}</td>
                ${chans.map(() => `<td class="batch-matrix__cell--error">✕</td>`).join('')}
              </tr>`).join('')}
            </tbody>
          </table>
          <div style="font-size:10.5px;color:#801010;margin-top:8px;">Connection timed out. Please check your network and try again.</div>
        </div>
        <div class="pub-dialog__footer">
          <button class="jq-btn" onclick="closeBatchWizard()">Close</button>
          <button class="jq-btn jq-btn--red" onclick="renderBatchStep('b4')">
            <svg width="13" height="13" viewBox="0 0 13 13"><path d="M6.5 1v8M3.5 3.5l3-2.5 3 2.5M2 10h9v2H2z" stroke="currentColor" stroke-width="1.3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Retry all
          </button>
        </div>
      </div>
    </div>`;
}

function closeBatchWizard() {
  const container = document.getElementById('batch-wizard-container');
  if (container) container.innerHTML = '';
  if (batchProgressInterval) { clearInterval(batchProgressInterval); batchProgressInterval = null; }
  history.replaceState(null, '', '#');
}

function openBatchWizard() {
  renderBatchStep('b2');
}

// Initialize from hash
function initBatchFlow() {
  const hash = location.hash.slice(1).toLowerCase();
  const validSteps = ['b2', 'b3', 'b3a', 'b4', 'b5', 'b6', 'b7'];
  if (validSteps.includes(hash)) {
    renderBatchStep(hash);
  }
}

window.addEventListener('load', initBatchFlow);
