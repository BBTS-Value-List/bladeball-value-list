const CATEGORY_COLORS = {
  LTM: "#a389f4",
  Ranked: "#e8b94f",
  "Top Spenders": "#4fd1a5",
  "Other Swords": "#5fc2ff",
  Explosions: "#ff6a6a"
};

const TREND_ICONS = {
  Rising: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M4 17L10 11L14 15L20 7"/><path d="M14 7H20V13"/></svg>',
  Falling: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7L10 13L14 9L20 17"/><path d="M14 17H20V11"/></svg>',
  Stable: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M4 12H20"/></svg>',
  Manipulated: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V13"/><circle cx="12" cy="16.5" r="0.9" fill="currentColor" stroke="none"/><path d="M10.3 3.8L2.6 18a1.6 1.6 0 0 0 1.4 2.4h16a1.6 1.6 0 0 0 1.4-2.4L13.7 3.8a1.6 1.6 0 0 0-2.8 0Z"/></svg>',
  "N/A": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M8 12H16"/></svg>'
};

const VALUE_BAR_STOPS = ["#4a5a78", "#5573c9", "#7d5fd9", "#a34fd0", "#d94f9e", "#e8636b", "#e88a4f", "#efab4a", "#f4cf5c"];
const CATEGORY_ORDER = ["All", "LTM", "Ranked", "Top Spenders", "Other Swords", "Explosions"];
const API_BASE = "/api";
const HOVER_DELAY_MS = 240;
const GRID_SKELETON_COUNT = 16;
const GRID_INITIAL_CARD_COUNT = 12;
const GRID_CARD_BATCH_SIZE = 12;
const GRID_BATCH_ROOT_MARGIN = "768px 0px";
const CARD_MEDIA_ROOT_MARGIN = "0px";
const HIGH_QUALITY_IDLE_TIMEOUT_MS = 1_000;
const CARD_ORIGINAL_UPGRADE_DELAY_MS = 750;
const AUDIO_UPLOAD_TYPES = new Set(["audio/mpeg", "audio/x-mpeg", "audio/mpeg3", "audio/mp3", "audio/ogg", "audio/wav", "audio/x-wav"]);
const AUDIO_UPLOAD_EXTENSIONS = new Map([
  [".mpeg", "audio/mpeg"],
  [".mp3", "audio/mpeg"],
  [".ogg", "audio/ogg"],
  [".wav", "audio/wav"]
]);
const VISUAL_MEDIA_UPLOAD_TYPES = new Set(["image/png", "image/jpeg", "image/webp", "image/gif", "video/mp4"]);
const MAX_SFX_UPLOAD_BYTES = 1 * 1024 * 1024;
const MAX_VISUAL_PREVIEW_UPLOAD_BYTES = 10 * 1024 * 1024;
const MEDIA_UPLOAD_VARIANTS = {
  img: "card-image",
  detailMedia: "detail",
  slashMedia: "slash",
  slashAudio: "slash-audio"
};
const LOGOUT_ICON = `
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M14 4H7.75A1.75 1.75 0 0 0 6 5.75v12.5C6 19.216 6.784 20 7.75 20H14" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M10 12h8" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>
    <path d="m15.5 8.5 3.5 3.5-3.5 3.5" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`;
const EDIT_ICON = `
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M17.5 2.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M14.5 5.5l4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`;
const CONFIRMATIONS = {
  reset: { phrase: "I confirm the Reset", purpose: "reauth", button: "Confirm Reset" },
  revert: { phrase: "I confirm the revert", purpose: "reauth", button: "Confirm Revert" }
};

const dom = {
  body: document.body,
  chips: document.getElementById("chips"),
  search: document.getElementById("search"),
  sortSelect: document.getElementById("sortSelect"),
  grid: document.getElementById("grid"),
  gridSentinel: document.getElementById("gridSentinel"),
  empty: document.getElementById("empty"),
  lastUpdated: document.getElementById("lastUpdated"),
  roleToolbar: document.getElementById("roleToolbar"),
  identityDock: document.getElementById("identityDock"),
  mobileIdentityDock: document.getElementById("mobileIdentityDock"),
  auditDock: document.getElementById("auditDock"),
  mobileAuditDock: document.getElementById("mobileAuditDock"),
  mobileUtilityTrigger: document.getElementById("mobileUtilityTrigger"),
  mobileUtilityOverlay: document.getElementById("mobileUtilityOverlay"),
  mobileUtilityCloseBtn: document.getElementById("mobileUtilityCloseBtn"),
  shortcutLoginOverlay: document.getElementById("shortcutLoginOverlay"),
  shortcutLoginCloseBtn: document.getElementById("shortcutLoginCloseBtn"),
  shortcutLoginCancelBtn: document.getElementById("shortcutLoginCancelBtn"),
  shortcutLoginBtn: document.getElementById("shortcutLoginBtn"),
  editorSystemOverlay: document.getElementById("editorSystemOverlay"),
  editorSystemCloseBtn: document.getElementById("editorSystemCloseBtn"),
  editorSystemV1Btn: document.getElementById("editorSystemV1Btn"),
  editorSystemV2Btn: document.getElementById("editorSystemV2Btn"),
  detailModalOverlay: document.getElementById("detailModalOverlay"),
  detailModal: document.querySelector("#detailModalOverlay .modal-split"),
  uploadingIndicator: document.getElementById("uploadingIndicator"),
  detailCloseBtn: document.getElementById("detailCloseBtn"),
  editPanel: document.getElementById("editPanel"),
  editForm: document.getElementById("editForm"),
  deleteBtn: document.getElementById("deleteBtn"),
  cancelBtn: document.getElementById("cancelBtn"),
  editSaveBtn: document.getElementById("editSaveBtn"),
  editFormError: document.getElementById("editFormError"),
  detailCardId: document.getElementById("detailCardId"),
  detailTitle: document.getElementById("detailTitle"),
  detailThumbWrap: document.getElementById("detailThumbWrap"),
  detailCategory: document.getElementById("detailCategory"),
  detailUpdated: document.getElementById("detailUpdated"),
  detailValue: document.getElementById("detailValue"),
  detailDemand: document.getElementById("detailDemand"),
  detailTrend: document.getElementById("detailTrend"),
  detailCount: document.getElementById("detailCount"),
  detailDescription: document.getElementById("detailDescription"),
  detailMediaGrid: document.getElementById("detailMediaGrid"),
  detailPrimaryCard: document.getElementById("detailPrimaryCard"),
  detailSlashCard: document.getElementById("detailSlashCard"),
  detailPrimaryDownload: document.getElementById("detailPrimaryDownload"),
  detailSlashDownload: document.getElementById("detailSlashDownload"),
  detailPrimaryMedia: document.getElementById("detailPrimaryMedia"),
  detailSlashMedia: document.getElementById("detailSlashMedia"),
  detailSlashAudio: document.getElementById("detailSlashAudio"),
  auditModalOverlay: document.getElementById("auditModalOverlay"),
  auditCloseBtn: document.getElementById("auditCloseBtn"),
  auditSearch: document.getElementById("auditSearch"),
  auditActionType: document.getElementById("auditActionType"),
  auditCardId: document.getElementById("auditCardId"),
  auditActorUserWrap: document.getElementById("auditActorUserWrap"),
  auditActorUser: document.getElementById("auditActorUser"),
  auditRefreshBtn: document.getElementById("auditRefreshBtn"),
  auditList: document.getElementById("auditList"),
  confirmModalOverlay: document.getElementById("confirmModalOverlay"),
  confirmCloseBtn: document.getElementById("confirmCloseBtn"),
  confirmCancelBtn: document.getElementById("confirmCancelBtn"),
  confirmModalCopy: document.getElementById("confirmModalCopy"),
  confirmPhraseInput: document.getElementById("confirmPhraseInput"),
  confirmSubmitBtn: document.getElementById("confirmSubmitBtn"),
  confirmReauthBtn: document.getElementById("confirmReauthBtn"),
  fields: {
    name: document.getElementById("f-name"),
    category: document.getElementById("f-cat"),
    value: document.getElementById("f-value"),
    demand: document.getElementById("f-demand"),
    trend: document.getElementById("f-trend"),
    count: document.getElementById("f-count"),
    description: document.getElementById("f-desc"),
    image: document.getElementById("f-image"),
    detailMedia: document.getElementById("f-detail-media"),
    slashMedia: document.getElementById("f-slash-media"),
    slashAudio: document.getElementById("f-slash-audio"),
    imagePreview: document.getElementById("f-image-preview"),
    detailPreview: document.getElementById("f-detail-preview"),
    slashPreview: document.getElementById("f-slash-preview"),
    audioPreview: document.getElementById("f-audio-preview"),
    imageRemove: document.getElementById("f-image-remove"),
    detailRemove: document.getElementById("f-detail-remove"),
    slashRemove: document.getElementById("f-slash-remove"),
    audioRemove: document.getElementById("f-audio-remove")
  }
};

const state = {
  swords: [],
  auth: { authenticated: false, user: null, permissions: [], reauthFresh: false },
  searchTerm: "",
  activeCategory: "All",
  sortMode: "value-desc",
  isGridLoading: true,
  minValue: 0,
  maxValue: 0,
  activeSwordId: null,
  editingSwordId: null,
  pendingEditSwordId: null,
  editorSystem: "v1",
  isAddingSword: false,
  activeModal: null,
  pendingMedia: {
    img: undefined,
    detailMedia: undefined,
    slashMedia: undefined,
    slashAudio: undefined
  },
  auditUsers: [],
  auditLogs: [],
  hoverTimers: new Map(),
  confirmState: null,
  selectedCardId: null,
  openingCardId: null,
  renderedSwordCount: 0
};

const mediaRuntime = {
  cardObserver: null,
  gridObserver: null,
  visibleCardTasks: new Set(),
  modalLoadToken: 0,
  highQualityCache: new Set()
};

function hasPermission(permission) {
  return state.auth.permissions.includes(permission) || state.auth.permissions.includes("owner:all");
}

async function api(path, options = {}) {
  const headers = { ...(options.headers || {}) };
  if (options.body !== undefined) {
    headers["content-type"] = "application/json";
  }
  if ((options.method || "GET") !== "GET") {
    headers["x-bbts-request"] = "1";
  }

  const response = await fetch(`${API_BASE}${path}`, {
    credentials: "same-origin",
    ...options,
    headers
  });

  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(body.error || "Request failed.");
    error.status = response.status;
    throw error;
  }
  return body;
}

async function initialize() {
  renderShell();
  renderGrid();
  attachEvents();
  handleLoginFlags();
  await refreshSwords();
}

async function refreshSwords() {
  const { swords, auth } = await api(`/swords?sort=${encodeURIComponent(state.sortMode)}`);
  state.swords = (swords || []).map(normalizeSwordRecord);
  state.isGridLoading = false;
  if (auth) {
    state.auth = auth;
  }
  const values = swords.map((item) => item.v);
  state.minValue = values.length ? Math.min(...values) : 0;
  state.maxValue = values.length ? Math.max(...values) : 0;
  renderGrid();
  renderLastUpdated();
  renderShell();
}

function renderShell() {
  renderToolbar();
  renderIdentityDock();
  renderAuditDock();
}

function renderToolbar() {
  const parts = [];
  if (hasPermission("sword:create")) {
    parts.push('<button class="tbtn ghost" id="addSwordBtn" type="button">Add Sword</button>');
  }
  if (hasPermission("data:export")) {
    parts.push('<button class="tbtn" id="exportBtn" type="button">Export Data</button>');
  }
  if (hasPermission("data:reset")) {
    parts.push('<button class="tbtn warn" id="resetBtn" type="button">Reset Data</button>');
  }

  const toolbarMarkup = parts.join("");
  if (!toolbarMarkup) {
    dom.roleToolbar?.remove();
    dom.roleToolbar = null;
    return;
  }

  if (!dom.roleToolbar) {
    const controlsShell = document.querySelector(".controls-shell");
    const temperLabels = controlsShell?.querySelector(".temper-labels");
    if (temperLabels) {
      temperLabels.insertAdjacentHTML("afterend", '<div class="role-toolbar" id="roleToolbar"></div>');
      dom.roleToolbar = document.getElementById("roleToolbar");
    }
  }

  dom.roleToolbar.innerHTML = toolbarMarkup;
  document.getElementById("addSwordBtn")?.addEventListener("click", openAddModal);
  document.getElementById("exportBtn")?.addEventListener("click", exportData);
  document.getElementById("resetBtn")?.addEventListener("click", () => openProtectedConfirmation("reset", async () => {
    await api("/reset", {
      method: "POST",
      body: JSON.stringify({ confirmation: CONFIRMATIONS.reset.phrase })
    });
    await refreshSwords();
    closeConfirmModal();
  }));
}

function renderIdentityDock() {
  const markup = !state.auth.authenticated ? "" : `
    <div class="identity-card">
      <div class="identity-info">
        ${state.auth.user.avatarUrl ? `<img class="identity-avatar" src="${escapeHtmlAttr(state.auth.user.avatarUrl)}" alt="${escapeHtmlAttr(state.auth.user.displayName)}">` : '<div class="identity-avatar identity-avatar-fallback">?</div>'}
        <div>
          <div class="identity-name">${escapeHtml(state.auth.user.displayName)}</div>
          <div class="identity-role">${escapeHtml(state.auth.user.role)}</div>
        </div>
      </div>
      <button class="identity-logout" type="button" data-logout-trigger aria-label="Log out">${LOGOUT_ICON}</button>
    </div>
  `;
  [dom.identityDock, dom.mobileIdentityDock].forEach((target) => {
    if (target) {
      target.innerHTML = markup;
    }
  });
  document.querySelectorAll("[data-logout-trigger]").forEach((button) => {
    button.addEventListener("click", logout);
  });
  syncMobileUtilityVisibility();
}

function renderAuditDock() {
  const markup = hasPermission("audit:view")
    ? `<button class="audit-gear-card" type="button" data-audit-open aria-label="Open audit console">⚙</button>`
    : "";
  [dom.auditDock, dom.mobileAuditDock].forEach((target) => {
    if (target) {
      target.innerHTML = markup;
    }
  });
  document.querySelectorAll("[data-audit-open]").forEach((button) => {
    button.addEventListener("click", async () => {
      if (dom.mobileUtilityOverlay && state.activeModal === dom.mobileUtilityOverlay.id) {
        closeModal(dom.mobileUtilityOverlay);
      }
      await prepareAuditFilters();
      await refreshAudit();
      openModal(dom.auditModalOverlay);
    });
  });
  syncMobileUtilityVisibility();
}

function openMobileUtilityModal() {
  if (!dom.mobileUtilityOverlay) {
    return;
  }
  openModal(dom.mobileUtilityOverlay);
}

function closeMobileUtilityModal() {
  if (!dom.mobileUtilityOverlay) {
    return;
  }
  closeModal(dom.mobileUtilityOverlay);
}

function syncMobileUtilityVisibility() {
  const hasUtilityContent = Boolean(state.auth.authenticated);
  if (dom.mobileUtilityTrigger) {
    dom.mobileUtilityTrigger.hidden = !hasUtilityContent;
  }
  if (!hasUtilityContent && dom.mobileUtilityOverlay && !dom.mobileUtilityOverlay.hidden) {
    closeMobileUtilityModal();
  }
}

function bindMobileUtilityControls() {
  dom.mobileUtilityTrigger?.addEventListener("click", openMobileUtilityModal);
  dom.mobileUtilityCloseBtn?.addEventListener("click", closeMobileUtilityModal);
}

async function prepareAuditFilters() {
  if (!hasPermission("team:manage")) {
    dom.auditActorUserWrap.hidden = true;
    dom.auditActorUser.value = "";
    return;
  }
  if (!state.auditUsers.length) {
    const body = await api("/team");
    state.auditUsers = body.team || [];
  }
  dom.auditActorUserWrap.hidden = false;
  const selectedValue = dom.auditActorUser.value;
  dom.auditActorUser.innerHTML = [
    '<option value="">All users</option>',
    ...state.auditUsers.map((member) => `<option value="${member.id}">${escapeHtml(member.displayName)} (${escapeHtml(member.role)})</option>`)
  ].join("");
  dom.auditActorUser.value = selectedValue;
}

function getFilteredSwords() {
  return state.swords
    .filter((sword) => (state.activeCategory === "All" ? true : sword.c === state.activeCategory))
    .filter((sword) => sword.n.toLowerCase().includes(state.searchTerm.toLowerCase()))
    .sort(compareSwords);
}

function compareSwords(left, right) {
  switch (state.sortMode) {
    case "value-asc":
      return left.v - right.v || left.id - right.id;
    case "name-asc":
      return left.n.localeCompare(right.n) || left.id - right.id;
    case "updated-desc":
      return right.u.localeCompare(left.u) || left.id - right.id;
    case "value-desc":
    default:
      return right.v - left.v || left.id - right.id;
  }
}

function renderChips() {
  dom.chips.innerHTML = CATEGORY_ORDER.map((category) => {
    const activeClass = category === state.activeCategory ? "active" : "";
    return `<button class="chip ${activeClass}" type="button" data-cat="${category}">${category}</button>`;
  }).join("");
}

function renderGrid() {
  renderChips();
  cleanupManagedMedia(dom.grid);
  disconnectCardObserver();
  disconnectGridObserver();
  dom.grid.setAttribute("aria-busy", state.isGridLoading ? "true" : "false");
  if (state.isGridLoading) {
    dom.empty.classList.remove("show");
    dom.grid.innerHTML = buildGridSkeletonMarkup();
    return;
  }
  const swords = getFilteredSwords();
  state.renderedSwordCount = Math.min(GRID_INITIAL_CARD_COUNT, swords.length);
  if (!swords.length) {
    dom.grid.innerHTML = "";
    dom.empty.classList.add("show");
    dom.empty.textContent = state.swords.length ? "No swords match the current filters." : "No swords are available right now.";
    return;
  }

  dom.empty.classList.remove("show");
  dom.grid.innerHTML = swords.slice(0, state.renderedSwordCount).map((sword, index) => buildCardMarkup(sword, index)).join("");
  updateSelectedCardState();
  hydrateGridMedia();
  observeGridContinuation();
}

function appendGridCards() {
  const swords = getFilteredSwords();
  const nextCount = Math.min(state.renderedSwordCount + GRID_CARD_BATCH_SIZE, swords.length);
  if (nextCount === state.renderedSwordCount) {
    return;
  }
  const start = state.renderedSwordCount;
  dom.grid.insertAdjacentHTML("beforeend", swords.slice(start, nextCount).map((sword, index) => buildCardMarkup(sword, start + index)).join(""));
  state.renderedSwordCount = nextCount;
  hydrateGridMedia();
}

function disconnectGridObserver() {
  mediaRuntime.gridObserver?.disconnect();
  mediaRuntime.gridObserver = null;
}

function observeGridContinuation() {
  if (!dom.gridSentinel || state.renderedSwordCount >= getFilteredSwords().length) {
    return;
  }
  mediaRuntime.gridObserver = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) {
      return;
    }
    requestAnimationFrame(() => {
      appendGridCards();
      if (state.renderedSwordCount >= getFilteredSwords().length) {
        disconnectGridObserver();
      }
    });
  }, { rootMargin: GRID_BATCH_ROOT_MARGIN });
  mediaRuntime.gridObserver.observe(dom.gridSentinel);
}

function buildCardMarkup(sword, index = 0) {
  const categoryColor = CATEGORY_COLORS[sword.c] || "#7d8aa3";
  const trendClassName = sword.t.replace(/[^A-Za-z]/g, "") || "NA";
  const trendIcon = TREND_ICONS[sword.t] || TREND_ICONS["N/A"];
  const canEdit = canEditSword();
  return `
    <article class="card" data-card="${sword.id}" style="--tcolor:${getValueAccent(sword.v)}; --ccolor:${categoryColor}" aria-label="${escapeHtmlAttr(sword.n)} value card. Open for more information." tabindex="0">
      <div class="card-flip">
        <div class="card-face card-face-front${canEdit ? " card-face-front-has-actions" : ""}">
          ${buildCardMediaMarkup(sword.img, sword.n, index)}
          <div class="card-body">
            <div class="card-top">
              <div class="card-name">${escapeHtml(sword.n)}</div>
              <div class="cat-badge" style="color:${categoryColor}">${escapeHtml(sword.c)}</div>
            </div>
            <div class="card-meta">
              <div class="meta-item"><span class="k">Demand</span>${escapeHtml(sword.d)}</div>
              <div class="meta-item"><span class="k">Trend</span><span class="trend ${trendClassName}">${trendIcon}${escapeHtml(sword.t)}</span></div>
              <div class="meta-item"><span class="k">Count</span>${sword.ct ?? "-"}</div>
            </div>
            <div class="card-value"><img class="value-token" src="/token.svg" alt="" aria-hidden="true">${formatValue(sword.v)}</div>
            <div class="card-description">${escapeHtml(sword.descr || "No description added yet.")}</div>
          </div>
          <div class="card-footer">
            <div class="card-meta-row">
              <div class="card-updated">UPDATED ${formatShortDate(sword.u).toUpperCase()}</div>
              <div class="card-id">${escapeHtml(sword.cardId || "#------")}</div>
            </div>
          </div>
        </div>
        <div class="card-face card-face-back card-hover-overlay" aria-hidden="true">
          <div class="card-hover-backdrop"><div class="card-hover-icon">?</div><div class="card-hover-copy">Click for more info</div></div>
        </div>
      </div>
      ${canEdit ? `<div class="card-floating-actions"><button class="edit-btn" type="button" data-edit="${sword.id}" title="Edit ${escapeHtmlAttr(sword.n)}"><span class="edit-btn-label">Edit Card</span><span class="edit-btn-icon">${EDIT_ICON}</span></button></div>` : ""}
    </article>
  `;
}

function canEditSword() {
  return hasPermission("sword:update");
}

function buildCardMediaMarkup(media, name, index = 0, options = {}) {
  const includeInitialSrc = options.includeInitialSrc !== false;
  if (!media) {
    return '<div class="card-thumb"><img src="/images/unavailable.webp" alt="Unavailable" width="512" height="512" decoding="async" loading="lazy" fetchpriority="low"></div>';
  }
  if (media.kind === "video") {
    return `<div class="card-thumb"><video data-inline-video="1" data-src="${escapeHtmlAttr(getMediaUrl(media, "low"))}" muted loop playsinline preload="none" aria-label="${escapeHtmlAttr(name)} media"></video></div>`;
  }
  if (media.kind === "audio") {
    return '<div class="card-thumb"><img src="/images/unavailable.webp" alt="Unavailable" width="512" height="512" decoding="async" loading="lazy" fetchpriority="low"></div>';
  }
  const lowUrl = getMediaUrl(media, "low");
  const eagerClass = index === 0 ? " eager-card-media" : "";
  const fetchPriority = index === 0 ? "high" : "low";
  const loading = index === 0 ? "eager" : "lazy";
  const initialSrcAttribute = includeInitialSrc ? `src="${escapeHtmlAttr(lowUrl)}"` : "";
  return `
    <div class="card-thumb${eagerClass}">
      <img
        alt="${escapeHtmlAttr(name)}"
        width="512"
        height="512"
        decoding="async"
        loading="${loading}"
        fetchpriority="${fetchPriority}"
        ${initialSrcAttribute}
        data-managed-image="card"
        data-low-url="${escapeHtmlAttr(getMediaUrl(media, "low"))}"
        data-medium-url="${escapeHtmlAttr(getMediaUrl(media, "medium"))}"
        data-original-url="${escapeHtmlAttr(getMediaUrl(media, "original"))}"
        data-loaded-quality="low"
      >
    </div>
  `;
}

function normalizeSwordRecord(sword) {
  return {
    ...sword,
    img: normalizeMediaField(sword.img),
    detailMedia: normalizeMediaField(sword.detailMedia),
    slashMedia: normalizeMediaField(sword.slashMedia),
    slashAudio: normalizeMediaField(sword.slashAudio)
  };
}

function normalizeMediaField(media) {
  if (!media) {
    return null;
  }
  if (typeof media === "object" && media.kind && media.original) {
    return {
      key: media.key || null,
      kind: media.kind,
      low: media.low || media.original,
      medium: media.medium || media.original,
      original: media.original
    };
  }
  if (typeof media !== "string") {
    return null;
  }
  const kind = inferMediaKind(media);
  return {
    key: kind === "image" ? null : media,
    kind,
    low: media,
    medium: media,
    original: media
  };
}

function inferMediaKind(value) {
  const normalized = String(value || "").toLowerCase();
  if (normalized.startsWith("data:audio/") || /\.(mpeg|mp3|ogg|wav)$/i.test(normalized)) {
    return "audio";
  }
  if (normalized.startsWith("data:video/") || /\.mp4$/i.test(normalized)) {
    return "video";
  }
  return "image";
}

function getMediaUrl(media, quality = "original") {
  if (!media) {
    return "";
  }
  return media[quality] || media.original || media.medium || media.low || "";
}

function buildGridSkeletonMarkup() {
  return Array.from({ length: GRID_SKELETON_COUNT }, () => `
    <article class="card skeleton-card" aria-hidden="true">
      <div class="card-flip">
        <div class="card-face card-face-front">
          <div class="card-thumb skeleton-block"></div>
          <div class="card-body">
            <div class="card-top">
              <div class="skeleton-line skeleton-line-title"></div>
              <div class="skeleton-pill skeleton-pill-badge"></div>
            </div>
            <div class="card-meta">
              <div class="meta-item">
                <div class="skeleton-line skeleton-line-kicker"></div>
                <div class="skeleton-line skeleton-line-stat"></div>
              </div>
              <div class="meta-item">
                <div class="skeleton-line skeleton-line-kicker"></div>
                <div class="skeleton-line skeleton-line-stat"></div>
              </div>
              <div class="meta-item">
                <div class="skeleton-line skeleton-line-kicker"></div>
                <div class="skeleton-line skeleton-line-stat"></div>
              </div>
            </div>
            <div class="skeleton-value-row">
              <div class="skeleton-coin"></div>
              <div class="skeleton-line skeleton-line-value"></div>
            </div>
            <div class="card-description skeleton-description">
              <div class="skeleton-line skeleton-line-copy"></div>
              <div class="skeleton-line skeleton-line-copy skeleton-line-copy-wide"></div>
              <div class="skeleton-line skeleton-line-copy skeleton-line-copy-short"></div>
            </div>
          </div>
          <div class="card-footer">
            <div class="card-meta-row">
              <div class="skeleton-line skeleton-line-footer"></div>
              <div class="skeleton-line skeleton-line-id"></div>
            </div>
          </div>
        </div>
      </div>
    </article>
  `).join("");
}

function disconnectCardObserver() {
  mediaRuntime.cardObserver?.disconnect();
  mediaRuntime.cardObserver = null;
}

function hydrateGridMedia(container = dom.grid) {
  const managedImages = [...container.querySelectorAll("[data-managed-image='card']")];
  if (!managedImages.length) {
    hydrateManagedContainer(container);
    return;
  }

  if (!mediaRuntime.cardObserver) {
    mediaRuntime.cardObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) {
          continue;
        }
        const image = entry.target;
        if (image.dataset.mediaUpgradeActive === "1") {
          continue;
        }
        image.dataset.mediaUpgradeActive = "1";
        const task = loadCardImageProgressively(image);
        trackVisibleCardTask(task);
        task.finally(() => {
          delete image.dataset.mediaUpgradeActive;
          if (!image.isConnected || image.dataset.loadedQuality === "original" || image.dataset.loadedQuality === "failed") {
            mediaRuntime.cardObserver?.unobserve(image);
          }
        });
      }
    }, { rootMargin: CARD_MEDIA_ROOT_MARGIN });
  }

  managedImages.forEach((image) => {
    mediaRuntime.cardObserver.observe(image);
  });
  hydrateManagedContainer(container);
}

function hydrateManagedContainer(container) {
  container?.querySelectorAll("[data-inline-video='1']").forEach((video) => {
    if (video.dataset.hydrated === "1") {
      return;
    }
    video.dataset.hydrated = "1";
    video.src = video.dataset.src || "";
    const playAttempt = video.play?.();
    playAttempt?.catch?.(() => {});
  });
}

function trackVisibleCardTask(task) {
  mediaRuntime.visibleCardTasks.add(task);
  task.finally(() => {
    mediaRuntime.visibleCardTasks.delete(task);
  });
}

async function waitForVisibleCardMedia() {
  const tasks = [...mediaRuntime.visibleCardTasks];
  if (!tasks.length) {
    return;
  }
  await Promise.allSettled(tasks);
}

function waitForBrowserIdle() {
  return new Promise((resolve) => {
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(resolve, { timeout: HIGH_QUALITY_IDLE_TIMEOUT_MS });
      return;
    }
    window.setTimeout(resolve, 80);
  });
}

function isCardImageVisible(image) {
  const bounds = image.getBoundingClientRect();
  return bounds.bottom > 0 && bounds.top < window.innerHeight;
}

async function loadCardImageProgressively(image) {
  try {
    if (applyCachedHighQualityImage(image)) {
      return image.dataset.loadedQuality;
    }
    await loadManagedImage(image, "low");
    await waitForBrowserIdle();
    if (!image.isConnected || !isCardImageVisible(image)) {
      return image.dataset.loadedQuality;
    }
    await loadManagedImage(image, "medium");
    await new Promise((resolve) => window.setTimeout(resolve, CARD_ORIGINAL_UPGRADE_DELAY_MS));
    await waitForBrowserIdle();
    if (!image.isConnected || !isCardImageVisible(image)) {
      return image.dataset.loadedQuality;
    }
    await loadManagedImage(image, "original");
    return image.dataset.loadedQuality;
  } catch {
    image.src = "/images/unavailable.webp";
    image.dataset.loadedQuality = "failed";
    return "failed";
  }
}

async function scheduleModalHighRes(image, modalToken) {
  if (!image) {
    return;
  }
  try {
    if (applyCachedHighQualityImage(image)) {
      return;
    }
    await waitForVisibleCardMedia();
    if (mediaRuntime.modalLoadToken !== modalToken || !image.isConnected) {
      return;
    }
    await loadManagedImage(image, "medium");
    if (mediaRuntime.modalLoadToken !== modalToken || !image.isConnected) {
      return;
    }
    await loadManagedImage(image, "original");
  } catch {
    image.src = "/images/unavailable.webp";
  }
}

async function loadManagedImage(image, quality) {
  if (!image || !image.dataset) {
    return;
  }
  if (applyCachedHighQualityImage(image)) {
    return;
  }
  const url = image.dataset[`${quality}Url`];
  if (!url || image.dataset.loadedQuality === quality) {
    return;
  }
  await applyManagedImageSource(image, url, quality, {
    cacheKey: quality === "original" ? (image.dataset.originalUrl || url) : ""
  });
  if (quality === "original") {
    cacheHighQualityMedia(image.dataset.originalUrl || url);
  }
}

function cleanupManagedMedia(container) {
  container?.querySelectorAll("[data-managed-image]").forEach((image) => {
    delete image.dataset.highQualityCacheKey;
  });
}

function findGridThumbImage(swordId) {
  if (!swordId) {
    return null;
  }
  return dom.grid.querySelector(`[data-card="${Number(swordId)}"] [data-managed-image='card']`);
}

function adoptManagedImageState(targetImage, sourceImage) {
  if (!targetImage || !sourceImage) {
    return false;
  }
  const sourceQuality = sourceImage.dataset.loadedQuality || "low";
  const sourceUrl = sourceQuality === "original"
    ? (sourceImage.dataset.originalUrl || sourceImage.currentSrc || sourceImage.src || "")
    : (sourceImage.currentSrc || sourceImage.src || "");
  if (!sourceUrl) {
    return false;
  }
  void applyManagedImageSource(targetImage, sourceUrl, sourceQuality, {
    cacheKey: sourceImage.dataset.highQualityCacheKey || sourceImage.dataset.originalUrl || ""
  });
  return true;
}

async function applyManagedImageSource(image, sourceUrl, quality, options = {}) {
  if (!image) {
    return;
  }
  await waitForImageSource(image, sourceUrl);
  image.dataset.loadedQuality = quality;
  image.classList.remove("is-loading-media");
  if (options.cacheKey) {
    image.dataset.highQualityCacheKey = options.cacheKey;
  } else {
    delete image.dataset.highQualityCacheKey;
  }
}

function applyCachedHighQualityImage(image) {
  if (!image?.dataset) {
    return false;
  }
  const cacheKey = image.dataset.originalUrl || "";
  if (!cacheKey) {
    return false;
  }
  if (!mediaRuntime.highQualityCache.has(cacheKey)) {
    return false;
  }
  void applyManagedImageSource(image, cacheKey, "original", { cacheKey });
  return true;
}

function cacheHighQualityMedia(cacheKey) {
  if (!cacheKey) {
    return;
  }
  mediaRuntime.highQualityCache.add(cacheKey);
}

function waitForImageSource(image, sourceUrl) {
  if (!image || !sourceUrl) {
    return Promise.resolve();
  }
  const currentUrl = image.currentSrc || image.src || "";
  if (currentUrl === sourceUrl && image.complete) {
    return Promise.resolve();
  }
  return new Promise((resolve, reject) => {
    const handleLoad = () => {
      cleanup();
      resolve();
    };
    const handleError = () => {
      cleanup();
      reject(new Error("Failed to load image source."));
    };
    const cleanup = () => {
      image.removeEventListener("load", handleLoad);
      image.removeEventListener("error", handleError);
    };
    image.addEventListener("load", handleLoad, { once: true });
    image.addEventListener("error", handleError, { once: true });
    image.src = sourceUrl;
  });
}

function scheduleCardOverlay(card, swordId) {
  clearCardOverlay(card, swordId);
  const timer = window.setTimeout(() => {
    card.classList.add("show-hover-overlay");
  }, HOVER_DELAY_MS);
  state.hoverTimers.set(swordId, timer);
}

function clearCardOverlay(card, swordId) {
  if (state.openingCardId === swordId || state.selectedCardId === swordId) {
    return;
  }
  const timer = state.hoverTimers.get(swordId);
  if (timer) {
    clearTimeout(timer);
  }
  state.hoverTimers.delete(swordId);
  card.classList.remove("show-hover-overlay");
}

function getValueAccent(value) {
  const range = state.maxValue - state.minValue;
  const position = range <= 0 ? 0 : (value - state.minValue) / range;
  const index = Math.min(VALUE_BAR_STOPS.length - 1, Math.floor(position * (VALUE_BAR_STOPS.length - 1)));
  return VALUE_BAR_STOPS[index];
}

function formatValue(value) {
  return Number(value).toLocaleString("en-US");
}

function formatShortDate(dateString) {
  const date = new Date(`${dateString}T00:00:00`);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function renderLastUpdated() {
  if (!state.swords.length) {
    dom.lastUpdated.textContent = "Unavailable";
    return;
  }
  const latestDate = state.swords.reduce((latest, sword) => sword.u > latest ? sword.u : latest, state.swords[0].u);
  dom.lastUpdated.textContent = new Date(`${latestDate}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}

function openDetailModal(swordId) {
  state.openingCardId = swordId;
  state.activeSwordId = swordId;
  state.editingSwordId = null;
  state.selectedCardId = swordId;
  updateSelectedCardState();
  dom.editPanel.hidden = true;
  updateDetailModalMode();
  fillDetailPanel(findSword(swordId));
  openModal(dom.detailModalOverlay);
}

function lockSelectedCardOpen(card, swordId) {
  if (!card) {
    return;
  }
  state.openingCardId = swordId;
  state.selectedCardId = swordId;
  card.classList.add("selected-open-card");
  updateSelectedCardState();
  card.getBoundingClientRect();
}

function openEditorChooser(swordId) {
  const sword = findSword(swordId);
  if (!sword || !canEditSword()) {
    return;
  }
  state.pendingEditSwordId = swordId;
  openModal(dom.editorSystemOverlay);
  dom.editorSystemV1Btn?.focus();
}

function openEditModal(swordId, editorSystem = "v1") {
  const sword = findSword(swordId);
  if (!sword || !canEditSword()) {
    return;
  }
  state.editorSystem = editorSystem;
  state.activeSwordId = swordId;
  state.editingSwordId = swordId;
  state.selectedCardId = swordId;
  updateSelectedCardState();
  state.isAddingSword = false;
  state.pendingMedia = { img: undefined, detailMedia: undefined, slashMedia: undefined, slashAudio: undefined };
  fillDetailPanel(sword);
  fillEditForm(sword);
  clearEditFormError();
  dom.editPanel.hidden = false;
  updateDetailModalMode();
  dom.deleteBtn.hidden = !hasPermission("sword:delete");
  openModal(dom.detailModalOverlay);
}

function openAddModal() {
  state.editorSystem = "v1";
  state.activeSwordId = null;
  state.editingSwordId = null;
  state.selectedCardId = null;
  updateSelectedCardState();
  state.isAddingSword = true;
  state.pendingMedia = { img: undefined, detailMedia: undefined, slashMedia: undefined, slashAudio: undefined };
  fillDetailPanel({
    cardId: "#------",
    n: "New Sword",
    c: "Other Swords",
    v: 0,
    d: "Medium",
    t: "Stable",
    ct: null,
    u: new Date().toISOString().slice(0, 10),
    descr: "",
    img: null,
    detailMedia: null,
    slashMedia: null,
    slashAudio: null
  });
  clearEditForm();
  clearEditFormError();
  dom.editPanel.hidden = false;
  updateDetailModalMode();
  dom.deleteBtn.hidden = true;
  openModal(dom.detailModalOverlay);
}

function fillDetailPanel(sword) {
  if (!sword) {
    return;
  }
  mediaRuntime.modalLoadToken += 1;
  const categoryColor = CATEGORY_COLORS[sword.c] || "#7d8aa3";
  const valueAccent = getValueAccent(sword.v);
  dom.detailCardId.textContent = sword.cardId || "#------";
  dom.detailTitle.textContent = sword.n;
  cleanupManagedMedia(dom.detailThumbWrap);
  dom.detailThumbWrap.innerHTML = buildCardMediaMarkup(sword.img, sword.n, 0, { includeInitialSrc: false });
  dom.detailThumbWrap.querySelector(".card-thumb")?.style.setProperty("--ccolor", categoryColor);
  hydrateManagedContainer(dom.detailThumbWrap);
  const detailThumbImage = dom.detailThumbWrap.querySelector("[data-managed-image='card']");
  const gridThumbImage = findGridThumbImage(sword.id);
  if (detailThumbImage) {
    const reusedThumb = adoptManagedImageState(detailThumbImage, gridThumbImage);
    if (!reusedThumb || detailThumbImage.dataset.loadedQuality !== "original") {
      void loadCardImageProgressively(detailThumbImage);
    }
  }
  dom.detailCategory.textContent = sword.c;
  dom.detailCategory.style.color = categoryColor;
  dom.detailModalOverlay.style.setProperty("--detail-category-color", categoryColor);
  dom.detailModal?.style.setProperty("--detail-category-color", categoryColor);
  dom.detailModalOverlay.style.setProperty("--detail-value-accent", valueAccent);
  dom.detailModal?.style.setProperty("--detail-value-accent", valueAccent);
  dom.detailUpdated.textContent = `UPDATED ${formatShortDate(sword.u).toUpperCase()}`;
  dom.detailValue.innerHTML = `<img class="value-token" src="/token.svg" alt="" aria-hidden="true">${escapeHtml(formatValue(sword.v))}`;
  dom.detailDemand.textContent = sword.d;
  dom.detailTrend.className = `trend ${sword.t.replace(/[^A-Za-z]/g, "") || "NA"}`;
  dom.detailTrend.innerHTML = `${TREND_ICONS[sword.t] || TREND_ICONS["N/A"]}${escapeHtml(sword.t)}`;
  dom.detailCount.textContent = sword.ct ?? "-";
  dom.detailDescription.textContent = sword.descr || "No description is available for this item yet.";
  const isExplosion = sword.c === "Explosions";
  dom.detailMediaGrid?.classList.toggle("is-explosion", isExplosion);
  dom.detailSlashCard.hidden = isExplosion;
  dom.detailSlashCard?.classList.toggle("is-hidden-card", isExplosion);
  syncDetailMediaDownload(dom.detailPrimaryDownload, sword.detailMedia, `${sword.n || "media"}-vfx`);
  const primaryControl = renderMediaShell(dom.detailPrimaryMedia, sword.detailMedia, sword.n, false, true);
  hydrateManagedContainer(dom.detailPrimaryMedia);
  if (!isExplosion) {
    syncDetailMediaDownload(dom.detailSlashDownload, sword.slashMedia, `${sword.n || "media"}-slash`);
    renderMediaShell(dom.detailSlashMedia, sword.slashMedia, `${sword.n} slash preview`, false, true);
    hydrateManagedContainer(dom.detailSlashMedia);
  } else {
    syncDetailMediaDownload(dom.detailSlashDownload, null, "");
    cleanupManagedMedia(dom.detailSlashMedia);
    dom.detailSlashMedia.innerHTML = "";
  }
  renderMediaShell(dom.detailSlashAudio, sword.slashAudio, `${sword.n} slash audio`, true);
  const modalToken = mediaRuntime.modalLoadToken;
  void scheduleModalHighRes(primaryControl, modalToken);
  if (!isExplosion) {
    void scheduleModalHighRes(dom.detailSlashMedia.querySelector("[data-managed-image='modal']"), modalToken);
  }
}

function syncDetailMediaDownload(link, media, fallbackName) {
  if (!link) {
    return;
  }
  const originalUrl = media ? getMediaUrl(normalizeMediaField(media), "original") : "";
  if (!originalUrl) {
    link.hidden = true;
    link.removeAttribute("href");
    link.removeAttribute("download");
    return;
  }
  const extension = detectMediaExtension(originalUrl, media?.kind || inferMediaKind(originalUrl));
  link.href = originalUrl;
  link.download = `${slugifyDownloadName(fallbackName)}.${extension}`;
  link.hidden = false;
}

function slugifyDownloadName(value) {
  return String(value || "media")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "media";
}

function detectMediaExtension(url, kind = "image") {
  const cleanUrl = String(url || "").split("?")[0].toLowerCase();
  const match = cleanUrl.match(/\.([a-z0-9]+)$/i);
  if (match?.[1]) {
    return match[1];
  }
  if (kind === "video") {
    return "mp4";
  }
  if (kind === "audio") {
    return "mp3";
  }
  return "webp";
}

function renderMediaShell(target, source, label, audioOnly = false, loadLowImmediately = false) {
  cleanupManagedMedia(target);
  if (!source) {
    target.innerHTML = `<div class="detail-media-empty">${audioOnly ? "No audio available." : "No media available."}</div>`;
    return null;
  }
  if (audioOnly || source.kind === "audio") {
    target.innerHTML = `<audio controls preload="none" src="${escapeHtmlAttr(getMediaUrl(source, "original"))}"></audio>`;
    return null;
  }
  if (source.kind === "video") {
    target.innerHTML = `<video controls muted loop playsinline preload="metadata" src="${escapeHtmlAttr(getMediaUrl(source, "low"))}" aria-label="${escapeHtmlAttr(label)}"></video>`;
    return null;
  }
  target.innerHTML = `
    <img
      alt="${escapeHtmlAttr(label)}"
      loading="eager"
      src="${escapeHtmlAttr(getMediaUrl(source, "low"))}"
      data-managed-image="modal"
      data-low-url="${escapeHtmlAttr(getMediaUrl(source, "low"))}"
      data-medium-url="${escapeHtmlAttr(getMediaUrl(source, "medium"))}"
      data-original-url="${escapeHtmlAttr(getMediaUrl(source, "original"))}"
      data-loaded-quality="low"
    >
  `;
  const image = target.querySelector("[data-managed-image='modal']");
  if (loadLowImmediately && applyCachedHighQualityImage(image)) {
    return image;
  }
  return image;
}

function fillEditForm(sword) {
  dom.fields.name.value = sword.n;
  dom.fields.category.value = sword.c;
  dom.fields.value.value = sword.v;
  dom.fields.demand.value = sword.d;
  dom.fields.trend.value = sword.t;
  dom.fields.count.value = sword.ct ?? "";
  dom.fields.description.value = sword.descr || "";
  dom.fields.image.value = "";
  dom.fields.detailMedia.value = "";
  dom.fields.slashMedia.value = "";
  dom.fields.slashAudio.value = "";
  setPreview(dom.fields.imagePreview, sword.img, "No media");
  setPreview(dom.fields.detailPreview, sword.detailMedia, "No VFX preview");
  setPreview(dom.fields.slashPreview, sword.slashMedia, "No slash preview");
  setPreview(dom.fields.audioPreview, sword.slashAudio, "No SFX preview", true);
  dom.fields.imageRemove.hidden = !sword.img;
  dom.fields.detailRemove.hidden = !sword.detailMedia;
  dom.fields.slashRemove.hidden = !sword.slashMedia;
  dom.fields.audioRemove.hidden = !sword.slashAudio;
  syncDetailPreviewFromEditor();
}

function clearEditForm() {
  dom.fields.name.value = "";
  dom.fields.category.value = state.activeCategory !== "All" ? state.activeCategory : "Other Swords";
  dom.fields.value.value = "";
  dom.fields.demand.value = "Medium";
  dom.fields.trend.value = "Stable";
  dom.fields.count.value = "";
  dom.fields.description.value = "";
  dom.fields.image.value = "";
  dom.fields.detailMedia.value = "";
  dom.fields.slashMedia.value = "";
  dom.fields.slashAudio.value = "";
  setPreview(dom.fields.imagePreview, null, "No media");
  setPreview(dom.fields.detailPreview, null, "No VFX preview");
  setPreview(dom.fields.slashPreview, null, "No slash preview");
  setPreview(dom.fields.audioPreview, null, "No SFX preview");
  dom.fields.imageRemove.hidden = true;
  dom.fields.detailRemove.hidden = true;
  dom.fields.slashRemove.hidden = true;
  dom.fields.audioRemove.hidden = true;
  syncDetailPreviewFromEditor();
}

function setPreview(target, source, emptyText, forceAudio = false) {
  target.classList.remove("is-audio-preview");
  if (!source) {
    target.textContent = emptyText;
    return;
  }
  const media = normalizeMediaField(source);
  if (forceAudio || target === dom.fields.audioPreview || media.kind === "audio") {
    target.classList.add("is-audio-preview");
    target.innerHTML = `<audio controls preload="none" src="${escapeHtmlAttr(getMediaUrl(media, "original"))}"></audio>`;
    return;
  }
  if (media.kind === "video") {
    target.innerHTML = `<video controls muted preload="metadata" src="${escapeHtmlAttr(getMediaUrl(media, "low"))}"></video>`;
    return;
  }
  target.innerHTML = `<img src="${escapeHtmlAttr(getMediaUrl(media, "medium"))}" alt="">`;
}

async function handleEditSubmit(event) {
  event.preventDefault();
  clearEditFormError();
  setEditFormBusy(true, hasPendingMediaUpload());

  try {
    const payload = await uploadPendingMedia({
      n: dom.fields.name.value.trim(),
      c: dom.fields.category.value,
      v: Number(dom.fields.value.value),
      d: dom.fields.demand.value,
      t: dom.fields.trend.value,
      ct: dom.fields.count.value === "" ? null : Number(dom.fields.count.value),
      descr: dom.fields.description.value,
      img: state.pendingMedia.img,
      detailMedia: state.pendingMedia.detailMedia,
      slashMedia: state.pendingMedia.slashMedia,
      slashAudio: state.pendingMedia.slashAudio
    });

    if (state.isAddingSword) {
      const { sword } = await api("/swords", { method: "POST", body: JSON.stringify(payload) });
      state.swords.unshift(sword);
    } else {
      await api(`/swords/${state.editingSwordId}`, { method: "PUT", body: JSON.stringify(payload) });
    }
    await refreshSwords();
    closeModal(dom.detailModalOverlay);
  } catch (error) {
    showEditFormError(error);
  } finally {
    setEditFormBusy(false);
  }
}

async function handleDeleteSword() {
  if (!state.editingSwordId || !hasPermission("sword:delete")) {
    return;
  }
  if (!window.confirm("Delete this sword?")) {
    return;
  }
  clearEditFormError();
  setEditFormBusy(true);

  try {
    await api(`/swords/${state.editingSwordId}`, { method: "DELETE" });
    await refreshSwords();
    closeModal(dom.detailModalOverlay);
  } catch (error) {
    showEditFormError(error);
  } finally {
    setEditFormBusy(false);
  }
}

function setEditFormBusy(isBusy, isUploading = false) {
  dom.editSaveBtn.disabled = isBusy;
  dom.deleteBtn.disabled = isBusy;
  dom.cancelBtn.disabled = isBusy;
  dom.detailCloseBtn.disabled = isBusy;
  dom.editForm.classList.toggle("is-busy", isBusy);
  dom.editForm.setAttribute("aria-busy", String(isBusy));
  setUploadIndicator(isBusy && isUploading);
}

function setUploadIndicator(isBusy) {
  dom.uploadingIndicator.hidden = !isBusy;
}

function hasPendingMediaUpload() {
  return Object.values(state.pendingMedia).some((media) => media !== undefined && media !== null);
}

async function uploadPendingMedia(payload) {
  const uploaded = { ...payload };
  for (const [field, variant] of Object.entries(MEDIA_UPLOAD_VARIANTS)) {
    const media = uploaded[field];
    if (media === undefined || media === null || (typeof media === "object" && typeof media.key === "string")) {
      continue;
    }
    const { mediaKey } = await api("/media", {
      method: "POST",
      body: JSON.stringify({ n: uploaded.n, variant, media })
    });
    uploaded[field] = { key: mediaKey };
  }
  return uploaded;
}

function clearEditFormError() {
  dom.editFormError.textContent = "";
  dom.editFormError.hidden = true;
}

function showEditFormError(error) {
  dom.editFormError.textContent = error instanceof Error ? error.message : "The request failed. Try again.";
  dom.editFormError.hidden = false;
}

async function exportData() {
  const { swords } = await api("/export");
  const blob = new Blob([JSON.stringify(swords, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "bbtsl-export.json";
  anchor.click();
  URL.revokeObjectURL(url);
}

async function refreshAudit() {
  const search = encodeURIComponent(dom.auditSearch.value.trim());
  const actionType = encodeURIComponent(dom.auditActionType.value);
  const cardId = encodeURIComponent(dom.auditCardId.value.trim());
  const actorUserId = encodeURIComponent(hasPermission("team:manage") ? dom.auditActorUser.value : "");
  const { logs } = await api(`/audit?search=${search}&actionType=${actionType}&cardId=${cardId}&actorUserId=${actorUserId}`);
  state.auditLogs = logs;
  renderAuditList();
}

function renderAuditList() {
  if (!state.auditLogs.length) {
    dom.auditList.innerHTML = `<div class="audit-empty">No audit entries matched the current filters.</div>`;
    return;
  }

  dom.auditList.innerHTML = state.auditLogs.map((log) => `
    <article class="audit-entry">
      <header class="audit-entry-head">
        <div>
          <div class="audit-entry-title">${escapeHtml(log.summary || log.actionType)}</div>
          <div class="audit-entry-meta">${escapeHtml(log.actionType)} · ${escapeHtml(formatAuditActor(log))} · ${escapeHtml(log.entityPublicId || "No card ID")} · ${escapeHtml(log.createdAt)}</div>
        </div>
        ${hasPermission("audit:revert") && log.entityType === "sword" ? `
          <div class="audit-entry-actions">
            <button class="tbtn audit-revert-btn" type="button" data-revert-log="${log.id}" data-revert-mode="snapshot">Revert Snapshot</button>
          </div>
        ` : ""}
      </header>
      <div class="audit-diff-list">
        ${(log.diff || []).map((diff) => `
          <div class="audit-diff-row">
            <span>${escapeHtml(diff.field)}</span>
            <code>${escapeHtml(JSON.stringify(diff.from))}</code>
            <code>${escapeHtml(JSON.stringify(diff.to))}</code>
            ${hasPermission("audit:revert") && log.entityType === "sword" && diff.field !== "*" ? `
              <button class="tbtn audit-field-revert-btn" type="button" data-revert-log="${log.id}" data-revert-mode="field" data-revert-field="${escapeHtmlAttr(diff.field)}">Revert Field</button>
            ` : ""}
          </div>
        `).join("")}
      </div>
    </article>
  `).join("");

  dom.auditList.querySelectorAll("[data-revert-log]").forEach((button) => {
    button.addEventListener("click", () => openProtectedConfirmation("revert", async () => {
      await api("/audit/revert", {
        method: "POST",
        body: JSON.stringify({
          logId: Number(button.dataset.revertLog),
          mode: button.dataset.revertMode,
          fieldName: button.dataset.revertField,
          confirmation: CONFIRMATIONS.revert.phrase
        })
      });
      await Promise.all([refreshAudit(), refreshSwords()]);
      closeConfirmModal();
    }));
  });
}

function formatAuditActor(log) {
  const displayName = log.actorGlobalName || "";
  const handle = log.actorUsername ? `@${log.actorUsername}` : "";
  const identity = [displayName, handle].filter(Boolean).join(" ");
  if (identity && log.actorRole) {
    return `${identity} · ${log.actorRole}`;
  }
  if (identity) {
    return identity;
  }
  return log.actorRole || "Unknown";
}

function openProtectedConfirmation(type, onConfirm) {
  const config = CONFIRMATIONS[type];
  state.confirmState = { type, onConfirm };
  dom.confirmModalCopy.textContent = `Complete Discord re-authentication and type "${config.phrase}" exactly before the action can run.`;
  dom.confirmPhraseInput.value = "";
  dom.confirmSubmitBtn.disabled = true;
  dom.confirmSubmitBtn.textContent = config.button;
  openModal(dom.confirmModalOverlay);
}

function closeConfirmModal() {
  state.confirmState = null;
  closeModal(dom.confirmModalOverlay);
}

function startDiscordAuth(purpose = "login") {
  const returnTo = encodeURIComponent(window.location.pathname + window.location.search);
  window.location.href = `/api/auth/start?purpose=${encodeURIComponent(purpose)}&returnTo=${returnTo}`;
}

function handleLoginFlags() {
  const url = new URL(window.location.href);
  const login = url.searchParams.get("login");
  if (!login) {
    return;
  }
  url.searchParams.delete("login");
  window.history.replaceState({}, "", url.toString());
}

async function logout() {
  await api("/auth/logout", { method: "POST" });
  state.auth = { authenticated: false, user: null, permissions: [], reauthFresh: false };
  renderShell();
  renderGrid();
}

function handleShortcutAuth(event) {
  if (!event.ctrlKey || !event.shiftKey || event.code !== "KeyL") {
    return;
  }
  event.preventDefault();
  if (state.auth.authenticated) {
    void logout();
    return;
  }
  openShortcutLoginModal();
}

function openShortcutLoginModal() {
  openModal(dom.shortcutLoginOverlay);
  dom.shortcutLoginBtn?.focus();
}

function closeShortcutLoginModal() {
  closeModal(dom.shortcutLoginOverlay);
}

function openModal(overlay) {
  overlay.hidden = false;
  overlay.classList.add("show");
  state.activeModal = overlay.id;
  document.body.classList.add("modal-open");
}

function closeModal(overlay) {
  overlay.classList.remove("show");
  overlay.hidden = true;
  if (state.activeModal === overlay.id) {
    state.activeModal = null;
    document.body.classList.remove("modal-open");
  }
  if (overlay === dom.detailModalOverlay) {
    state.openingCardId = null;
    mediaRuntime.modalLoadToken += 1;
    [dom.detailThumbWrap, dom.detailPrimaryMedia, dom.detailSlashMedia].forEach((target) => cleanupManagedMedia(target));
    state.selectedCardId = null;
    updateSelectedCardState();
    dom.grid.querySelectorAll(".show-hover-overlay").forEach((card) => {
      card.classList.remove("show-hover-overlay");
    });
    state.hoverTimers.forEach((timer) => clearTimeout(timer));
    state.hoverTimers.clear();
    dom.editPanel.hidden = true;
    updateDetailModalMode();
  }
  if (overlay === dom.editorSystemOverlay) {
    state.pendingEditSwordId = null;
  }
}

function updateSelectedCardState() {
  dom.grid.querySelectorAll("[data-card]").forEach((card) => {
    card.classList.toggle("selected-open-card", Number(card.dataset.card) === state.selectedCardId);
  });
}

function updateDetailModalMode() {
  const isEditing = !dom.editPanel.hidden;
  dom.detailModal?.classList.toggle("is-editing", isEditing && state.editorSystem === "v1");
  dom.detailModal?.classList.toggle("is-editingv2", isEditing && state.editorSystem === "v2");
}

function findSword(id) {
  return state.swords.find((item) => item.id === id) || null;
}

function getFileExtension(fileName) {
  const match = String(fileName || "").toLowerCase().match(/(\.[a-z0-9]+)$/);
  return match?.[1] || "";
}

function getSlashAudioContentType(file) {
  return AUDIO_UPLOAD_EXTENSIONS.get(getFileExtension(file.name)) || file.type.toLowerCase();
}

function getUploadFormatLabel(file) {
  const extension = getFileExtension(file.name);
  return extension ? extension.slice(1).toUpperCase() : (file.type || "this");
}

function validateUploadFile(file, key) {
  const contentType = key === "slashAudio" ? getSlashAudioContentType(file) : file.type.toLowerCase();
  if (key === "slashAudio") {
    if (!AUDIO_UPLOAD_TYPES.has(contentType)) {
      throw new Error(`SFX Preview does not support ${getUploadFormatLabel(file)} format. Use MPEG, MP3, OGG, or WAV.`);
    }
    if (file.size > MAX_SFX_UPLOAD_BYTES) {
      throw new Error("SFX Preview must be 1 MB or smaller.");
    }
    return;
  }
  if (!VISUAL_MEDIA_UPLOAD_TYPES.has(contentType)) {
    const labels = {
      img: "Card Media",
      detailMedia: "VFX Preview",
      slashMedia: "Slash Preview"
    };
    throw new Error(`${labels[key] || "Media"} does not support ${getUploadFormatLabel(file)} format. Use an image or MP4 video.`);
  }
  if ((key === "detailMedia" || key === "slashMedia") && file.size > MAX_VISUAL_PREVIEW_UPLOAD_BYTES) {
    const label = key === "detailMedia" ? "VFX Preview" : "Slash Preview";
    throw new Error(`${label} must be 10 MB or smaller.`);
  }
}

async function fileToDataUrl(file, contentType = file.type) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || "");
      resolve(contentType && contentType !== file.type ? result.replace(/^data:[^;]+/i, `data:${contentType}`) : result);
    };
    reader.onerror = () => reject(new Error("Could not read the selected file."));
    reader.readAsDataURL(file);
  });
}

async function buildUploadMediaPayload(file, key) {
  validateUploadFile(file, key);
  const contentType = key === "slashAudio" ? getSlashAudioContentType(file) : file.type;
  if (!contentType.startsWith("image/") || key === "slashAudio") {
    return fileToDataUrl(file, contentType);
  }
  if (file.type === "image/gif" || file.type === "image/svg+xml") {
    const original = await fileToDataUrl(file, contentType);
    return {
      kind: "image",
      low: original,
      medium: original,
      original
    };
  }

  const original = await fileToDataUrl(file, contentType);
  const bitmap = await createImageBitmap(file);
  try {
    const low = await renderImageVariant(bitmap, 192, 0.34);
    const medium = await renderImageVariant(bitmap, 512, 0.68);
    return {
      kind: "image",
      low,
      medium,
      original
    };
  } finally {
    bitmap.close();
  }
}

async function renderImageVariant(bitmap, targetSize, quality) {
  const scale = Math.min(1, targetSize / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d", { alpha: true });
  context.drawImage(bitmap, 0, 0, width, height);
  return canvas.toDataURL("image/webp", quality);
}

async function handleFileInput(event, key, previewTarget, emptyText) {
  const file = event.target.files?.[0];
  if (!file) {
    return;
  }
  clearEditFormError();
  try {
    const mediaPayload = await buildUploadMediaPayload(file, key);
    state.pendingMedia[key] = mediaPayload;
    setPreview(previewTarget, mediaPayload, emptyText, key === "slashAudio");
    getRemoveButtonForKey(key)?.removeAttribute("hidden");
    syncDetailPreviewFromEditor();
  } catch (error) {
    event.target.value = "";
    showEditFormError(error);
  }
}

function clearPendingMedia(key, previewTarget, emptyText, removeButton) {
  state.pendingMedia[key] = null;
  setPreview(previewTarget, null, emptyText);
  removeButton.hidden = true;
  syncDetailPreviewFromEditor();
}

function syncDetailPreviewFromEditor() {
  if (dom.editPanel.hidden) {
    return;
  }
  const baseSword = state.isAddingSword ? null : findSword(state.activeSwordId);
  const previewSword = {
    cardId: baseSword?.cardId || "#------",
    n: dom.fields.name.value.trim() || baseSword?.n || "New Sword",
    c: dom.fields.category.value || baseSword?.c || "Other Swords",
    v: dom.fields.value.value === "" ? (baseSword?.v ?? 0) : Number(dom.fields.value.value),
    d: dom.fields.demand.value || baseSword?.d || "Medium",
    t: dom.fields.trend.value || baseSword?.t || "Stable",
    ct: dom.fields.count.value === "" ? (baseSword?.ct ?? null) : Number(dom.fields.count.value),
    u: baseSword?.u || new Date().toISOString().slice(0, 10),
    descr: dom.fields.description.value || baseSword?.descr || "",
    img: state.pendingMedia.img !== undefined ? state.pendingMedia.img : (baseSword?.img || null),
    detailMedia: state.pendingMedia.detailMedia !== undefined ? state.pendingMedia.detailMedia : (baseSword?.detailMedia || null),
    slashMedia: state.pendingMedia.slashMedia !== undefined ? state.pendingMedia.slashMedia : (baseSword?.slashMedia || null),
    slashAudio: state.pendingMedia.slashAudio !== undefined ? state.pendingMedia.slashAudio : (baseSword?.slashAudio || null)
  };
  fillDetailPanel(previewSword);
}

function getRemoveButtonForKey(key) {
  switch (key) {
    case "img":
      return dom.fields.imageRemove;
    case "detailMedia":
      return dom.fields.detailRemove;
    case "slashMedia":
      return dom.fields.slashRemove;
    case "slashAudio":
      return dom.fields.audioRemove;
    default:
      return null;
  }
}

function attachEvents() {
  dom.chips.addEventListener("click", (event) => {
    const button = event.target.closest("[data-cat]");
    if (!button) {
      return;
    }
    state.activeCategory = button.dataset.cat;
    renderGrid();
  });

  dom.grid.addEventListener("click", (event) => {
    const editButton = event.target.closest("[data-edit]");
    if (editButton) {
      event.stopPropagation();
      openEditorChooser(Number(editButton.dataset.edit));
      return;
    }
    const card = event.target.closest("[data-card]");
    if (card) {
      lockSelectedCardOpen(card, Number(card.dataset.card));
      openDetailModal(Number(card.dataset.card));
    }
  });

  dom.grid.addEventListener("pointerdown", (event) => {
    const card = event.target.closest("[data-card]");
    if (!card) {
      return;
    }
    lockSelectedCardOpen(card, Number(card.dataset.card));
  });

  dom.grid.addEventListener("keydown", (event) => {
    const card = event.target.closest("[data-card]");
    if (!card) {
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      lockSelectedCardOpen(card, Number(card.dataset.card));
      openDetailModal(Number(card.dataset.card));
    }
  });

  dom.grid.addEventListener("mouseover", (event) => {
    const card = event.target.closest("[data-card]");
    if (!card || card.contains(event.relatedTarget)) {
      return;
    }
    scheduleCardOverlay(card, Number(card.dataset.card));
  });

  dom.grid.addEventListener("mouseout", (event) => {
    const card = event.target.closest("[data-card]");
    if (!card || card.contains(event.relatedTarget)) {
      return;
    }
    clearCardOverlay(card, Number(card.dataset.card));
  });

  dom.grid.addEventListener("focusin", (event) => {
    const card = event.target.closest("[data-card]");
    if (card) {
      scheduleCardOverlay(card, Number(card.dataset.card));
    }
  });

  dom.grid.addEventListener("focusout", (event) => {
    const card = event.target.closest("[data-card]");
    if (card) {
      clearCardOverlay(card, Number(card.dataset.card));
    }
  });

  dom.search.addEventListener("input", (event) => {
    state.searchTerm = event.target.value;
    renderGrid();
  });
  dom.sortSelect.addEventListener("change", (event) => {
    state.sortMode = event.target.value;
    refreshSwords();
  });

  dom.detailCloseBtn.addEventListener("click", () => closeModal(dom.detailModalOverlay));
  dom.cancelBtn.addEventListener("click", () => closeModal(dom.detailModalOverlay));
  dom.editorSystemCloseBtn?.addEventListener("click", () => closeModal(dom.editorSystemOverlay));
  dom.editorSystemV1Btn?.addEventListener("click", () => {
    const swordId = state.pendingEditSwordId;
    closeModal(dom.editorSystemOverlay);
    if (swordId !== null) {
      openEditModal(swordId, "v1");
    }
  });
  dom.editorSystemV2Btn?.addEventListener("click", () => {
    const swordId = state.pendingEditSwordId;
    closeModal(dom.editorSystemOverlay);
    if (swordId !== null) {
      openEditModal(swordId, "v2");
    }
  });
  dom.deleteBtn.addEventListener("click", handleDeleteSword);
  dom.editForm.addEventListener("submit", handleEditSubmit);
  [dom.fields.name, dom.fields.category, dom.fields.value, dom.fields.demand, dom.fields.trend, dom.fields.count, dom.fields.description].forEach((field) => {
    field.addEventListener("input", syncDetailPreviewFromEditor);
    field.addEventListener("change", syncDetailPreviewFromEditor);
  });

  dom.fields.image.addEventListener("change", (event) => handleFileInput(event, "img", dom.fields.imagePreview, "No media"));
  dom.fields.detailMedia.addEventListener("change", (event) => handleFileInput(event, "detailMedia", dom.fields.detailPreview, "No VFX preview"));
  dom.fields.slashMedia.addEventListener("change", (event) => handleFileInput(event, "slashMedia", dom.fields.slashPreview, "No slash preview"));
  dom.fields.slashAudio.addEventListener("change", (event) => handleFileInput(event, "slashAudio", dom.fields.audioPreview, "No SFX preview"));

  dom.fields.imageRemove.addEventListener("click", () => clearPendingMedia("img", dom.fields.imagePreview, "No media", dom.fields.imageRemove));
  dom.fields.detailRemove.addEventListener("click", () => clearPendingMedia("detailMedia", dom.fields.detailPreview, "No VFX preview", dom.fields.detailRemove));
  dom.fields.slashRemove.addEventListener("click", () => clearPendingMedia("slashMedia", dom.fields.slashPreview, "No slash preview", dom.fields.slashRemove));
  dom.fields.audioRemove.addEventListener("click", () => clearPendingMedia("slashAudio", dom.fields.audioPreview, "No SFX preview", dom.fields.audioRemove));

  dom.auditCloseBtn.addEventListener("click", () => closeModal(dom.auditModalOverlay));
  dom.auditRefreshBtn.addEventListener("click", refreshAudit);
  dom.auditSearch.addEventListener("keydown", (event) => { if (event.key === "Enter") { event.preventDefault(); refreshAudit(); } });
  dom.auditCardId.addEventListener("keydown", (event) => { if (event.key === "Enter") { event.preventDefault(); refreshAudit(); } });
  dom.auditActorUser?.addEventListener("change", refreshAudit);

  dom.confirmCloseBtn.addEventListener("click", closeConfirmModal);
  dom.confirmCancelBtn.addEventListener("click", closeConfirmModal);
  dom.confirmReauthBtn.addEventListener("click", () => startDiscordAuth("reauth"));
  dom.confirmPhraseInput.addEventListener("input", () => {
    const confirmType = state.confirmState?.type;
    if (!confirmType) {
      dom.confirmSubmitBtn.disabled = true;
      return;
    }
    dom.confirmSubmitBtn.disabled = dom.confirmPhraseInput.value.trim() !== CONFIRMATIONS[confirmType].phrase;
  });
  dom.confirmSubmitBtn.addEventListener("click", async () => {
    await state.confirmState?.onConfirm?.();
  });

  [dom.detailModalOverlay, dom.editorSystemOverlay, dom.auditModalOverlay, dom.confirmModalOverlay, dom.mobileUtilityOverlay, dom.shortcutLoginOverlay].filter(Boolean).forEach((overlay) => {
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        closeModal(overlay);
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (state.activeModal === dom.detailModalOverlay.id) {
        closeModal(dom.detailModalOverlay);
      } else if (dom.editorSystemOverlay && state.activeModal === dom.editorSystemOverlay.id) {
        closeModal(dom.editorSystemOverlay);
      } else if (state.activeModal === dom.auditModalOverlay.id) {
        closeModal(dom.auditModalOverlay);
      } else if (dom.mobileUtilityOverlay && state.activeModal === dom.mobileUtilityOverlay.id) {
        closeModal(dom.mobileUtilityOverlay);
      } else if (dom.shortcutLoginOverlay && state.activeModal === dom.shortcutLoginOverlay.id) {
        closeShortcutLoginModal();
      } else if (state.activeModal === dom.confirmModalOverlay.id) {
        closeConfirmModal();
      }
    }
  });
  document.addEventListener("keydown", handleShortcutAuth);
  dom.shortcutLoginCloseBtn?.addEventListener("click", closeShortcutLoginModal);
  dom.shortcutLoginCancelBtn?.addEventListener("click", closeShortcutLoginModal);
  dom.shortcutLoginBtn?.addEventListener("click", () => startDiscordAuth("login"));
  bindMobileUtilityControls();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeHtmlAttr(value) {
  return escapeHtml(value);
}

initialize().catch((error) => {
  console.error(error);
  state.isGridLoading = false;
  renderGrid();
  dom.empty.classList.add("show");
  dom.empty.textContent = error.message || "Could not load the value list.";
});
