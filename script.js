const slides = [
  {
    chapter: "01 / 结论先行",
    title: "增长不是问题，增长质量才是下季度关键",
    body: "本季度核心指标继续上行，但新增转化效率出现下滑。建议把下季度主线从“继续扩量”调整为“修复转化、保护复购、放大高质量渠道”。",
    metrics: ["+18%", "+11%", "-6%"],
    trace: "Q2 复盘记录 / 漏斗数据表 / 用户访谈摘要",
    regenerated: "已将当前页改写为更强的老板汇报口径，并保留原始三组指标。"
  },
  {
    chapter: "02 / 增长事实",
    title: "高质量渠道贡献了主要增量",
    body: "新增用户中，内容型渠道贡献最高 GMV 增量，且复购率高于均值。资源应从泛流量投放转向高意图内容场景。",
    metrics: ["42%", "+9%", "1.7x"],
    trace: "渠道日报 / 复购 cohort / 投放成本表",
    regenerated: "已补强证据表达，当前页只更新了增长事实章节。"
  },
  {
    chapter: "03 / 风险诊断",
    title: "转化漏斗的主要损耗发生在首购决策前",
    body: "用户访谈显示，价格理解、权益说明和案例证明不足，是首购前犹豫的主要原因。该问题会限制增长规模继续放大。",
    metrics: ["-6%", "38%", "24h"],
    trace: "漏斗数据表 / 客服问题标签 / 用户访谈摘要",
    regenerated: "已把风险诊断从现象描述改为原因链路，未改动其他已锁定页面。"
  },
  {
    chapter: "04 / 行动计划",
    title: "下季度用三条动作修复转化效率",
    body: "优先重构首购解释、强化高质量内容供给，并建立周度转化诊断机制。目标是在不牺牲复购质量的前提下恢复转化率。",
    metrics: ["3项", "4周", "+5%"],
    trace: "下季度 OKR 草案 / 运营排期 / 历史实验复盘",
    regenerated: "已将行动计划收敛为三条可执行动作，并保持老板视角。"
  }
];

const state = {
  current: 0,
  locks: [false, false, false, false],
  versions: [
    "v3 调整为老板视角，结论前置",
    "v2 强化风险诊断章节",
    "v1 从源材料生成初稿结构"
  ]
};

const outlineList = document.querySelector("#outlineList");
const slideChapter = document.querySelector("#slideChapter");
const slideTitle = document.querySelector("#slideTitle");
const slideBody = document.querySelector("#slideBody");
const metricOne = document.querySelector("#metricOne");
const metricTwo = document.querySelector("#metricTwo");
const metricThree = document.querySelector("#metricThree");
const traceBtn = document.querySelector("#traceBtn");
const lockBadge = document.querySelector("#lockBadge");
const lockBtn = document.querySelector("#lockBtn");
const regenBtn = document.querySelector("#regenBtn");
const scopeSelect = document.querySelector("#scopeSelect");
const audienceSelect = document.querySelector("#audienceSelect");
const toneSelect = document.querySelector("#toneSelect");
const emphasisRange = document.querySelector("#emphasisRange");
const emphasisText = document.querySelector("#emphasisText");
const messageBox = document.querySelector("#messageBox");
const versionList = document.querySelector("#versionList");
const statusText = document.querySelector("#statusText");
const audienceText = document.querySelector("#audienceText");

function render() {
  const slide = slides[state.current];
  slideChapter.textContent = slide.chapter;
  slideTitle.textContent = slide.title;
  slideBody.textContent = slide.body;
  [metricOne.textContent, metricTwo.textContent, metricThree.textContent] = slide.metrics;
  traceBtn.textContent = slide.trace;

  const isLocked = state.locks[state.current];
  lockBadge.textContent = isLocked ? "意图已锁定" : "可再生成";
  lockBadge.classList.toggle("locked", isLocked);
  lockBtn.textContent = isLocked ? "解除当前页锁定" : "锁定当前页";

  document.querySelectorAll(".outline-item").forEach((item) => {
    const index = Number(item.dataset.slide);
    item.classList.toggle("active", index === state.current);
    item.classList.toggle("locked", state.locks[index]);
    item.querySelector("em").textContent = state.locks[index] ? "已锁定" : "未锁定";
  });

  versionList.innerHTML = state.versions.map((version) => `<li>${version}</li>`).join("");
}

function setMessage(text) {
  messageBox.textContent = text;
}

outlineList.addEventListener("click", (event) => {
  const item = event.target.closest(".outline-item");
  if (!item) return;
  state.current = Number(item.dataset.slide);
  render();
  setMessage(`已选择“${slides[state.current].chapter}”。幻灯片预览随叙事节点联动更新。`);
});

lockBtn.addEventListener("click", () => {
  state.locks[state.current] = !state.locks[state.current];
  render();
  setMessage(state.locks[state.current]
    ? "当前页已锁定。后续局部再生成会保护这页的观点、数据与版式。"
    : "当前页已解除锁定，可以纳入选定范围再生成。");
});

regenBtn.addEventListener("click", () => {
  const slide = slides[state.current];
  const scope = scopeSelect.value;
  if (state.locks[state.current]) {
    setMessage("当前页处于意图锁定状态。请先解除锁定，或选择未锁定章节进行局部再生成。");
    return;
  }
  state.versions.unshift(`v${state.versions.length + 1} ${scope}再生成：${slide.chapter}`);
  statusText.textContent = "局部再生成完成";
  render();
  setMessage(slide.regenerated);
});

document.querySelector("#rollbackBtn").addEventListener("click", () => {
  if (state.versions.length > 1) {
    const removed = state.versions.shift();
    statusText.textContent = "已回退";
    render();
    setMessage(`已回退 ${removed}，恢复到上一版叙事和页面状态。`);
  } else {
    setMessage("当前只有初始版本，没有更多可回退记录。");
  }
});

document.querySelector("#traceBtn").addEventListener("click", () => {
  setMessage(`来源追溯已展开：${slides[state.current].trace}。用户可核查关键结论是否有证据支撑。`);
});

document.querySelector("#sourceBtn").addEventListener("click", () => {
  setMessage("源材料包括季度复盘记录、漏斗数据表、用户访谈摘要和下季度 OKR 草案。");
});

document.querySelector("#manualBtn").addEventListener("click", () => {
  setMessage("已进入手动细节编辑：用户可以确定性修改标题、数据、布局和备注，不依赖 AI 再生成。");
});

document.querySelector("#continueBtn").addEventListener("click", () => {
  setMessage("将带着当前结构、锁定项和来源证据进入传统逐页编辑器，保留老工作流兜底。");
});

document.querySelector("#generateBtn").addEventListener("click", () => {
  statusText.textContent = "结构已重新生成";
  setMessage("已根据源材料任务重新生成叙事大纲，并保持三栏编辑结构。");
});

audienceSelect.addEventListener("change", () => {
  audienceText.textContent = audienceSelect.value;
  statusText.textContent = "受众已更新";
  setMessage(`受众视角改为“${audienceSelect.value}”，后续页面表达将沿用该意图参数。`);
});

toneSelect.addEventListener("change", () => {
  statusText.textContent = "语气已更新";
  setMessage(`表达语气改为“${toneSelect.value}”，AI 会在局部再生成时保留该语气。`);
});

emphasisRange.addEventListener("input", () => {
  const labels = ["弱证据", "轻证据", "均衡", "偏重数据证据", "强数据证明"];
  emphasisText.textContent = labels[Number(emphasisRange.value) - 1];
});

render();
