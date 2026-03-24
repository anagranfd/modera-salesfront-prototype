// Modera Publishing Tool — Inline SVG Icons
// Fugue-style 12-16px inline SVG icons

const ICONS = {
  check: `<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  error: `<svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><circle cx="6" cy="6" r="5" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M6 3.5v3M6 8v.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  warning: `<svg width="12" height="12" viewBox="0 0 12 12"><path d="M6 1.5L11 10H1L6 1.5Z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M6 4.5v2.5M6 8.5v.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>`,
  spinner: `<svg width="14" height="14" viewBox="0 0 14 14" class="spin"><circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="22 8" stroke-linecap="round"/></svg>`,
  chevronRight: `<svg width="10" height="10" viewBox="0 0 10 10"><path d="M3 2l4 3-4 3" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  chevronDown: `<svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 3.5l3 3.5 3-3.5" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  chevronUp: `<svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 6.5l3-3.5 3 3.5" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  external: `<svg width="11" height="11" viewBox="0 0 11 11"><path d="M4.5 2H2v7h7V6.5M5.5 1h4.5v4.5M5.5 5.5L10 1" stroke="currentColor" stroke-width="1.3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  close: `<svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 2l6 6M8 2L2 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  back: `<svg width="10" height="10" viewBox="0 0 10 10"><path d="M7 2L3 5l4 3" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  publish: `<svg width="13" height="13" viewBox="0 0 13 13"><path d="M6.5 1v8M3.5 3.5l3-2.5 3 2.5M2 10h9v2H2z" stroke="currentColor" stroke-width="1.3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  dot_published: `<svg width="9" height="9" viewBox="0 0 9 9"><defs><radialGradient id="dp_${Math.random().toString(36).slice(2)}" cx="35%" cy="35%"><stop offset="0%" stop-color="#5cd47a"/><stop offset="100%" stop-color="#1d7a3a"/></radialGradient></defs><circle cx="4.5" cy="4.5" r="4" fill="url(#dp)" stroke="rgba(0,0,0,0.15)" stroke-width="0.5"/></svg>`,
  dot_pending: `<svg width="9" height="9" viewBox="0 0 9 9"><defs><radialGradient id="dpe" cx="35%" cy="35%"><stop offset="0%" stop-color="#f5c060"/><stop offset="100%" stop-color="#b07820"/></radialGradient></defs><circle cx="4.5" cy="4.5" r="4" fill="url(#dpe)" stroke="rgba(0,0,0,0.15)" stroke-width="0.5"/></svg>`,
  dot_error: `<svg width="9" height="9" viewBox="0 0 9 9"><defs><radialGradient id="de" cx="35%" cy="35%"><stop offset="0%" stop-color="#f07070"/><stop offset="100%" stop-color="#b03030"/></radialGradient></defs><circle cx="4.5" cy="4.5" r="4" fill="url(#de)" stroke="rgba(0,0,0,0.15)" stroke-width="0.5"/></svg>`,
  dot_unpublished: `<svg width="9" height="9" viewBox="0 0 9 9"><defs><radialGradient id="du" cx="35%" cy="35%"><stop offset="0%" stop-color="#ccdde8"/><stop offset="100%" stop-color="#8aabbd"/></radialGradient></defs><circle cx="4.5" cy="4.5" r="4" fill="url(#du)" stroke="rgba(0,0,0,0.15)" stroke-width="0.5"/></svg>`,
};

// Helper to get icon HTML
function icon(name) {
  return ICONS[name] || '';
}

// Export for module environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ICONS, icon };
}
