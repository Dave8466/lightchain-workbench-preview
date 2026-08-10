(() => {
  const cases = window.HISTORY_CASES || {};
  let activeHistoryCaseId = null;
  let browserState = { mode: "", caseId: "", items: [], filters: {} };

  const overlay = document.createElement("div");
  overlay.className = "case-browser-overlay";
  overlay.id = "case-browser-overlay";
  overlay.hidden = true;
  overlay.innerHTML = `<div class="case-browser-dialog" role="dialog" aria-modal="true" aria-labelledby="case-browser-title"><header class="case-browser-head"><div><h2 id="case-browser-title">案例详情</h2><p id="case-browser-subtitle"></p></div><button class="case-browser-close" id="case-browser-close" type="button" aria-label="关闭案例详情">×</button></header><div class="case-browser-body" id="case-browser-body"></div></div>`;
  document.body.appendChild(overlay);

  const activeCase = () => cases[activeHistoryCaseId] || null;
  const artifactById = (caseData, id) => caseData?.artifacts.find((item) => item.id === id);
  const allCaseEvidence = () => Object.values(cases).flatMap((item) => item.evidenceGroups || []);
  const safe = (value) => escapeHtml(value == null ? "" : value);
  const nl = (value) => safe(value).replace(/\n/g, "<br>");

  function closeCaseBrowser() {
    overlay.hidden = true;
    browserState = { mode: "", caseId: "", items: [], filters: {} };
    document.querySelector("#candidate-detail-overlay").hidden = true;
  }

  function closeOtherOverlays() {
    closeCaseBrowser();
    ["candidate-overlay", "planning-material-overlay", "proposal-preview-overlay", "evidence-detail-overlay"].forEach((id) => {
      const node = document.getElementById(id);
      if (node) node.hidden = true;
    });
  }

  function confirmedCard(title, values) {
    return `<div class="task-message assistant"><div class="agent-message"><article class="case-confirmed-card"><header><h4>${safe(title)}</h4><span class="confirmed-state">✓ 已确认</span></header><div class="case-confirmed-values">${values.map((value) => `<span>${safe(value)}</span>`).join("")}</div></article></div></div>`;
  }

  function artifactQuote(caseData, artifact) {
    const canOpen = artifact.type !== "download";
    const open = canOpen ? `<button type="button" data-case-artifact-open="${safe(artifact.id)}">查看详情</button>` : "";
    const direct = artifact.url ? `<a href="${safe(artifact.url)}" ${artifact.type === "download" ? "download" : "target=\"_blank\" rel=\"noopener\""}>${artifact.type === "download" ? "下载" : "在线打开"}</a>` : "";
    return `<div class="task-message assistant"><div class="agent-message"><article class="case-artifact"><span class="case-artifact-icon">□</span><span class="case-artifact-copy"><strong>${safe(artifact.label)}</strong><small>${safe(artifact.status)} · ${safe(artifact.summary)}</small></span><span class="case-artifact-actions">${open}${direct}</span></article></div></div>`;
  }

  function renderCaseMessage(caseData, message) {
    if (message.type === "user") return `<div class="task-message user"><div class="user-message-bubble">${nl(message.text)}</div></div>`;
    if (message.type === "agent") return `<div class="task-message assistant"><div class="agent-message"><div class="agent-message-copy">${nl(message.text)}</div></div></div>`;
    if (message.type === "execution") return agentExecutionMessage({ copy: message.copy, label: message.label, details: message.details, state: "complete" });
    if (message.type === "selection") return confirmedCard(message.title, caseData.selectionStates[message.key] || []);
    if (message.type === "artifact") return artifactQuote(caseData, artifactById(caseData, message.artifactId));
    if (message.type === "contact") return `<div class="task-message assistant"><div class="agent-message"><article class="case-contact-sheet"><img loading="lazy" src="${safe(message.image)}" alt="${safe(message.title)}联系表"><span class="case-contact-copy"><strong>${safe(message.title)}</strong><span>${safe(message.summary)}</span><button type="button" data-case-artifact-open="${safe(message.artifactId)}">查看全部</button></span></article></div></div>`;
    return "";
  }

  function renderHistoryCase(caseId) {
    const caseData = cases[caseId];
    if (!caseData) return;
    activeHistoryCaseId = caseId;
    closeOtherOverlays();
    proposalFlow.active = false;
    planningFlow.active = false;
    const task = historyItems.find((item) => item.caseId === caseId);
    activeHistoryTaskId = task?.id || null;
    setTaskTitle(caseData.metadata.title);
    setTaskProfile(caseData.metadata.profile);
    constraintState.currentId = null;
    document.querySelector("#task-pause").hidden = true;
    document.querySelector("#task-condition").value = "";
    document.querySelector("#task-condition").placeholder = "已完成历史任务 · 可查看对话、产物和参考信息";
    const banner = `<div class="task-message assistant"><div class="agent-message"><div class="history-case-banner"><strong>已完成历史任务</strong><span>${safe(caseData.metadata.sceneLabel)} · ${safe(caseData.metadata.updated)} · 对话与产物为只读复现</span></div></div></div>`;
    document.querySelector("#task-chat-inner").innerHTML = banner + caseData.messages.map((message) => renderCaseMessage(caseData, message)).join("");
    renderTaskPanel({
      plans: caseData.steps.map((label) => ({ label, state: "已完成", className: "updated" })),
      outputs: caseData.artifacts,
      references: caseData.evidenceGroups
    });
    showTaskPage();
    renderHistory();
    requestAnimationFrame(() => { document.querySelector("#task-chat").scrollTop = 0; });
  }

  function crownStyleItems() {
    return (window.PROPOSAL_ITEMS || []).map((item) => {
      const numeric = Number(String(item.style_id).split("-").pop());
      const batch = `batch-${String(Math.ceil(numeric / 10)).padStart(2, "0")}`;
      return { ...item, code: item.style_id, image_url: `case-assets/crown-ivy/concepts/${batch}/${item.style_id}.png`, platform_line: "BELK / Crown & Ivy", launch_wave: "Fall Transition 2026", category: item.category, direction: item.direction, source_type: "AI-generated concept", evidence_id: (item.evidence_ids || []).join(" / "), silhouette: item.construction, color_pattern: item.material_story, key_details: item.modification_logic, cost_note: "AI concept; supplier quotation not included" };
    });
  }

  function caseStyleItems(caseId) {
    return caseId === "kaleshu" ? (window.KALESHU_STYLES || []).map((item) => ({ ...item, code: item.style_no })) : crownStyleItems();
  }

  function candidateItems() {
    return (window.CANDIDATES || []).map((item) => ({ ...item, code: item.id, localImage: `case-assets/crown-ivy/candidates/${item.id}.${item.id === "C14" ? "webp" : "jpg"}`, selected: true }));
  }

  function setBrowserHeader(title, subtitle) {
    document.querySelector("#case-browser-title").textContent = title;
    document.querySelector("#case-browser-subtitle").textContent = subtitle;
    overlay.hidden = false;
  }

  function renderGallery() {
    const body = document.querySelector("#case-browser-body");
    const directions = [...new Set(browserState.items.map((item) => item.direction))];
    const sources = [...new Set(browserState.items.map((item) => item.source))];
    const direction = browserState.filters.direction || "全部";
    const source = browserState.filters.source || "全部";
    const visible = browserState.items.filter((item) => (direction === "全部" || item.direction === direction) && (source === "全部" || item.source === source));
    body.innerHTML = `<div class="case-browser-toolbar"><select data-case-filter="direction"><option>全部</option>${directions.map((value) => `<option ${value === direction ? "selected" : ""}>${safe(value)}</option>`).join("")}</select><select data-case-filter="source"><option>全部</option>${sources.map((value) => `<option ${value === source ? "selected" : ""}>${safe(value)}</option>`).join("")}</select><span class="case-browser-count">${visible.length} 个真实市场参考 · 历史已选 30</span></div><div class="case-browser-grid">${visible.map((item) => `<article class="case-media-card selected" tabindex="0" data-case-gallery-item="${safe(item.id)}"><img loading="lazy" src="${safe(item.localImage)}" alt="${safe(item.title)}"><span class="case-source-type">真实市场参考 · ${safe(item.source)}</span><span class="case-selected-mark">✓</span><div class="case-media-info"><strong>${safe(item.id)} · ${safe(item.title)}</strong><small>${safe(item.reason)}</small><small>${safe(item.metrics)} · ${safe(item.evidence_id)}</small><a href="${safe(item.source_url)}" target="_blank" rel="noopener" data-case-source-link>查看原始来源</a></div></article>`).join("")}</div>`;
  }

  function renderStyleGrid() {
    const body = document.querySelector("#case-browser-body");
    const categories = [...new Set(browserState.items.map((item) => item.category).filter(Boolean))];
    const platforms = [...new Set(browserState.items.map((item) => item.platform_line).filter(Boolean))];
    const waves = [...new Set(browserState.items.map((item) => item.launch_wave).filter(Boolean))];
    const search = (browserState.filters.search || "").toLowerCase();
    const category = browserState.filters.category || "全部";
    const platform = browserState.filters.platform || "全部";
    const wave = browserState.filters.wave || "全部";
    const visible = browserState.items.filter((item) => (!search || JSON.stringify(item).toLowerCase().includes(search)) && (category === "全部" || item.category === category) && (platform === "全部" || item.platform_line === platform) && (wave === "全部" || item.launch_wave === wave));
    body.innerHTML = `<div class="case-browser-toolbar"><input type="search" data-case-filter="search" placeholder="搜索款号、方向或细节" value="${safe(browserState.filters.search || "")}"><select data-case-filter="platform"><option>全部</option>${platforms.map((value) => `<option ${value === platform ? "selected" : ""}>${safe(value)}</option>`).join("")}</select><select data-case-filter="wave"><option>全部</option>${waves.map((value) => `<option ${value === wave ? "selected" : ""}>${safe(value)}</option>`).join("")}</select><select data-case-filter="category"><option>全部</option>${categories.map((value) => `<option ${value === category ? "selected" : ""}>${safe(value)}</option>`).join("")}</select><span class="case-browser-count">显示 ${visible.length} / ${browserState.items.length} 款</span></div><div class="case-browser-grid">${visible.map((item) => `<article class="case-media-card" tabindex="0" data-case-style-item="${safe(item.code)}"><img loading="lazy" src="${safe(item.image_url)}" alt="${safe(item.code)}"><span class="case-source-type">AI 方向设计 · 不作为市场证据</span><div class="case-media-info"><strong>${safe(item.code)} · ${safe(item.category)}</strong><small>${safe(item.direction || item.silhouette)}</small><small>${safe(item.platform_line)} · ${safe(item.launch_wave)}</small></div></article>`).join("")}</div>`;
  }

  function openCaseGallery(caseId) {
    browserState = { mode: "gallery", caseId, items: candidateItems(), filters: { direction: "全部", source: "全部" } };
    setBrowserHeader("Crown & Ivy · 市场相似款候选池", "30 个真实市场商品参考 · 客户输入图仅作检索锚点 · 悬停或点击查看来源");
    renderGallery();
  }

  function openCaseStyles(caseId) {
    browserState = { mode: "styles", caseId, items: caseStyleItems(caseId), filters: { search: "", platform: "全部", wave: "全部", category: "全部" } };
    setBrowserHeader(caseId === "kaleshu" ? "卡乐鼠 · 50 款 AI 款式图" : "Crown & Ivy · 50 款 AI 概念图", "可筛选矩阵 · 点击单款查看结构与证据映射 · AI 图不作为市场证据");
    renderStyleGrid();
  }

  function openStyleDetail(code) {
    const item = browserState.items.find((entry) => entry.code === code);
    if (!item) return;
    document.querySelector("#case-browser-title").textContent = code;
    document.querySelector("#case-browser-subtitle").textContent = "AI 方向设计单款详情";
    const rows = [
      ["产品线", item.platform_line], ["波段", item.launch_wave], ["品类", item.category], ["方向", item.direction], ["廓形 / 结构", item.silhouette || item.construction], ["色彩 / 图案", item.color_pattern || item.material_story], ["面料", item.fabric_suggestion || "梭织方向，需供应链验证"], ["关键细节 / 改款逻辑", item.key_details || item.modification_logic], ["建议零售价", item.retail_usd ? `USD ${item.retail_usd}` : "客户提案不承诺售价"], ["成本 / 数据缺口", item.cost_note], ["证据映射", item.evidence_id || (item.evidence_ids || []).join(" / ")], ["参考款", (item.reference_ids || item.reference_assets || []).join(" / ")]
    ].filter(([, value]) => value);
    document.querySelector("#case-browser-body").innerHTML = `<div class="case-style-detail"><div class="case-style-detail-inner"><img src="${safe(item.image_url)}" alt="${safe(code)}"><div><h3>${safe(code)} · ${safe(item.category)}</h3><span class="case-ai-label">AI-generated concept · 不作为市场证据</span><dl class="case-detail-list">${rows.map(([label, value]) => `<div><dt>${safe(label)}</dt><dd>${safe(value)}</dd></div>`).join("")}</dl></div></div></div>`;
  }

  function openGalleryDetail(id) {
    const item = browserState.items.find((entry) => entry.id === id);
    if (!item) return;
    document.querySelector("#case-browser-title").textContent = `${item.id} · ${item.title}`;
    document.querySelector("#case-browser-subtitle").textContent = "真实市场参考 · 历史已选";
    const rows = [["来源", `${item.source} · ${item.source_type}`],["趋势方向",item.direction],["关键特征",item.features],["入选原因",item.reason],["市场字段",item.metrics],["证据ID",item.evidence_id],["采集时间",item.captured],["数据缺口","公开页面时点数据；社媒互动和平台售出量不等于全市场销量"]];
    document.querySelector("#case-browser-body").innerHTML = `<div class="case-style-detail"><div class="case-style-detail-inner"><img src="${safe(item.localImage)}" alt="${safe(item.title)}"><div><h3>${safe(item.id)} · ${safe(item.title)}</h3><span class="case-ai-label" style="color:#78d8cf;border-color:#35534d">真实市场参考 · 已选</span><dl class="case-detail-list">${rows.map(([label,value])=>`<div><dt>${safe(label)}</dt><dd>${safe(value)}</dd></div>`).join("")}</dl><p><a href="${safe(item.source_url)}" target="_blank" rel="noopener" style="color:#75dcd3;font-size:11px">打开原始来源</a></p></div></div></div>`;
  }

  function openSummaryArtifact(caseData, artifact) {
    setBrowserHeader(artifact.label, `${artifact.status} · 历史阶段产物`);
    const selections = Object.entries(caseData.selectionStates).map(([key, values]) => `<section class="preview-section"><h3>${safe(key)}</h3><p>${values.map(safe).join(" · ")}</p></section>`).join("");
    document.querySelector("#case-browser-body").innerHTML = `<div class="case-style-detail"><div style="width:min(820px,100%);margin:auto"><section class="preview-section"><h3>${safe(artifact.label)}</h3><p>${safe(artifact.summary)}</p><p>该产物为真实已完成任务的阶段结果；证据详情请从右侧“参考信息”打开。</p></section>${selections}</div></div>`;
  }

  function openCaseArtifact(artifact) {
    const caseData = activeCase();
    if (!artifact || !caseData) return;
    if (artifact.type === "gallery") { openCaseGallery(activeHistoryCaseId); return; }
    if (artifact.type === "styles") { openCaseStyles(activeHistoryCaseId); return; }
    if (artifact.type === "external" && artifact.url) { window.open(artifact.url, "_blank", "noopener"); return; }
    if (artifact.type === "download" && artifact.url) { const link = document.createElement("a"); link.href = artifact.url; link.download = ""; link.click(); return; }
    openSummaryArtifact(caseData, artifact);
  }

  const originalMakeHistoryRow = makeHistoryRow;
  makeHistoryRow = function(item) {
    const row = originalMakeHistoryRow(item);
    if (item.caseId) {
      row.classList.add("case-history");
      row.innerHTML = `<span class="history-icon">●</span><span class="history-row-copy"><span class="history-name">${safe(item.name)}</span><span class="history-row-meta"><span class="history-row-status">已完成</span><span class="history-row-scene">${safe(item.sceneLabel)}</span><span>${safe(item.updatedLabel)}</span></span></span>`;
    }
    return row;
  };

  const originalOpenHistoryTask = openHistoryTask;
  openHistoryTask = function(item) {
    if (item.caseId) { renderHistoryCase(item.caseId); return; }
    activeHistoryCaseId = null;
    closeOtherOverlays();
    originalOpenHistoryTask(item);
  };

  const originalStartTask = startTask;
  startTask = function(...args) {
    activeHistoryCaseId = null;
    closeOtherOverlays();
    return originalStartTask(...args);
  };

  const originalCurrentTaskArtifacts = currentTaskArtifacts;
  currentTaskArtifacts = function() { return activeCase()?.artifacts || originalCurrentTaskArtifacts(); };

  const originalRenderTaskArtifactPreview = renderTaskArtifactPreview;
  renderTaskArtifactPreview = function(artifact) { if (activeCase()) openCaseArtifact(artifact); else originalRenderTaskArtifactPreview(artifact); };

  const originalFindEvidenceGroup = findEvidenceGroup;
  findEvidenceGroup = function(id) { return allCaseEvidence().find((group) => group.id === id || group.items.some((item) => item.evidence_id === id)) || originalFindEvidenceGroup(id); };

  const originalRenderEvidenceDetail = renderEvidenceDetail;
  renderEvidenceDetail = function(id) {
    const group = allCaseEvidence().find((entry) => entry.id === id || entry.items.some((item) => item.evidence_id === id));
    if (!group) { originalRenderEvidenceDetail(id); return; }
    const metricLabels={price:"价格",sales:"销量/售出量",rating:"评分",review_count:"评价数",ranking:"排名",views:"浏览/播放/搜索量",likes:"点赞/互动",comments:"评论",shares:"分享",saves:"收藏",file_name:"文件名",file_page:"引用页码"};
    const items=group.items.map((item)=>`<article class="evidence-item"><div class="evidence-thumb">${safe(item.evidence_id.split("-").slice(-1)[0])}</div><div class="evidence-item-main"><h4>${safe(item.title_summary)}</h4><p>${safe(item.used_by)}<br>匹配原因：用于本任务的已确认趋势、方向或商品结构。</p><a href="${safe(item.source_url)}" target="_blank" rel="noopener">打开原始来源</a></div><dl class="evidence-item-fields">${[["evidence_id",item.evidence_id],["source_platform",item.source_platform],["source_type",item.source_type],["source_url_status",item.source_url_status],["captured_at",item.captured_at],["data_time",item.data_time],["used_by",item.used_by],["data_gap",item.data_gap],...Object.entries(item.metrics||{})].map(([key,value])=>`<div><dt>${safe(metricLabels[key]||key)}</dt><dd>${safe(value)}</dd></div>`).join("")}</dl></article>`).join("");
    document.querySelector("#evidence-detail-title").textContent=group.title;
    document.querySelector("#evidence-detail-subtitle").textContent=`${group.platform} · ${group.sourceType} · 真实任务证据`;
    document.querySelector("#evidence-detail-body").innerHTML=`<dl class="evidence-summary-grid"><div><dt>样本数</dt><dd>${group.sampleCount} 条</dd></div><div><dt>时间范围</dt><dd>${safe(group.dataTime)}</dd></div><div><dt>可溯源</dt><dd>${group.traceableCount} / ${group.sampleCount}</dd></div><div><dt>数据状态</dt><dd>${safe(group.status)}</dd></div><div><dt>调研范围</dt><dd>${safe(group.scope)}</dd></div></dl><p class="evidence-contract">固定字段按 evidence_id 关联对话、产物与右侧证据目录；平台未返回的按需字段不补 0，不使用其他平台数据代替。</p><div class="evidence-item-list">${items}</div><p class="evidence-limit"><b>数据限制：</b>${safe(group.gap)}</p>`;
    document.querySelector("#evidence-detail-overlay").hidden=false;
  };

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay || event.target.closest("#case-browser-close")) { closeCaseBrowser(); return; }
    const source = event.target.closest("[data-case-source-link]");
    if (source) { event.stopPropagation(); return; }
    const style = event.target.closest("[data-case-style-item]");
    if (style) { openStyleDetail(style.dataset.caseStyleItem); return; }
    const gallery = event.target.closest("[data-case-gallery-item]");
    if (gallery) { openGalleryDetail(gallery.dataset.caseGalleryItem); }
  });
  overlay.addEventListener("input", (event) => {
    const filter = event.target.dataset.caseFilter;
    if (!filter) return;
    browserState.filters[filter] = event.target.value;
    if (browserState.mode === "styles") renderStyleGrid(); else renderGallery();
    const next = document.querySelector(`[data-case-filter="${filter}"]`); next?.focus(); if (filter === "search") next?.setSelectionRange(next.value.length,next.value.length);
  });
  overlay.addEventListener("change", (event) => {
    const filter = event.target.dataset.caseFilter;
    if (!filter) return;
    browserState.filters[filter] = event.target.value;
    if (browserState.mode === "styles") renderStyleGrid(); else renderGallery();
  });

  document.querySelector("#task-chat").addEventListener("click", (event) => {
    const open = event.target.closest("[data-case-artifact-open]");
    if (open && activeCase()) { event.preventDefault(); event.stopImmediatePropagation(); openCaseArtifact(artifactById(activeCase(), open.dataset.caseArtifactOpen)); }
  }, true);

  document.querySelector("#check-task-boundary").addEventListener("click", (event) => {
    if (!activeCase()) return;
    event.preventDefault(); event.stopImmediatePropagation(); showToast("已完成历史任务为只读案例");
  }, true);
  document.querySelector("#task-condition").addEventListener("keydown", (event) => {
    if (!activeCase() || event.key !== "Enter" || event.shiftKey) return;
    event.preventDefault(); event.stopImmediatePropagation(); showToast("已完成历史任务为只读案例");
  }, true);

  document.addEventListener("keydown", (event) => { if (event.key === "Escape" && !overlay.hidden) closeCaseBrowser(); });

  historyItems.unshift(
    {id:"case-crown-ivy",type:"task",name:cases.crownIvy.metadata.title,parentId:null,editedAt:1786332253000,scene:"proposal",sceneLabel:"客户提案",updatedLabel:"08-10",caseId:"crownIvy"},
    {id:"case-kaleshu",type:"task",name:cases.kaleshu.metadata.title,parentId:null,editedAt:1786120804000,scene:"planning",sceneLabel:"新品企划",updatedLabel:"08-08",caseId:"kaleshu"}
  );
  renderHistory();
  window.historyCasePrototype = { cases, renderHistoryCase, openCaseGallery, openCaseStyles, closeCaseBrowser };
})();
