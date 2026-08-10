window.HISTORY_CASES = {
  kaleshu: {
    metadata: {
      id: "kaleshu", title: "卡乐鼠｜美国女装 50 款新品企划", scene: "planning", sceneLabel: "新品企划", status: "已完成", updated: "2026-08-08 00:40",
      profile: { name: "卡乐鼠｜美国女装业务偏好", categories: ["女装", "连衣裙", "裤装", "上衣", "套装", "卫衣"], countries: ["美国"], ageRanges: ["Amazon 30+", "TikTok Shop 20-35岁"], channels: ["Amazon US", "TikTok Shop US"], referenceBrands: ["Kohl's"], priceRange: { currency: "USD", min: 10, max: 20 }, uploadedFileCount: 1, updatedAt: "2026-08-07" }
    },
    steps: ["需求解析与确认", "调研范围确认", "趋势分析与方向确认", "参考素材与视觉方向确认", "商品结构规划", "AI 款式图生成与确认", "新品企划案交付"],
    selectionStates: {
      requirement: ["中文交付", "Kohl's 仅作风格与品类参考"],
      scope: ["美国", "Amazon US", "TikTok Shop US", "TikTok", "Pinterest", "Instagram", "Google Trends", "趋势资料"],
      directions: ["A1 柔性轻商务上衣", "A2 易穿过渡季连衣裙", "A3 非牛仔非瑜伽易穿裤", "T1 宽腿通勤比例裤", "T2 日常协调套装", "T3 合体上衣 + oversize 卫衣"]
    },
    messages: [
      {type:"user",text:"请为卡乐鼠规划美国市场 50 款女装新品。Amazon US 和 TikTok Shop US 要拆成两条产品线；覆盖 2026 年 8 月、2027 年 2 月两个波段，零售价 USD 10-20，目标成本 35 元/件以内。"},
      {type:"execution",copy:"已完成需求资料解析。",label:"解析新品企划需求",details:["读取业务需求资料","识别两个平台的人群与版型差异","提取五个品类、波段、价格与供应链禁区"]},
      {type:"agent",text:"本次需求理解\n\n主市场为美国。Amazon US 面向 30+ 熟龄女性，强调日常休闲、轻商务与宽松易穿；TikTok Shop US 面向 20-35 岁初入职场女性，保留紧身与 oversize 两条表达。品类为连衣裙、裤装、上衣、套装、卫衣；不做皮衣、瑜伽、牛仔、外套、皮草、棉服，避免过度年轻、强辣妹和 SHEIN 式表达。最终 50 款不机械平均分配。"},
      {type:"selection",title:"需求解析确认",key:"requirement"},
      {type:"user",text:"确认。"},
      {type:"agent",text:"调研将分别验证 Amazon 30+ 易穿轻商务、TikTok Shop 年轻通勤比例表达、两个波段的品类落位，以及 35 元目标成本下的落地风险。电商、社媒、搜索趋势和专业趋势资料分开分析；平台销量和热度不合并。"},
      {type:"selection",title:"调研范围",key:"scope"},
      {type:"user",text:"确认，按这个范围开始。"},
      {type:"execution",copy:"已完成真实市场小样本扫描。",label:"采集并核对市场证据",details:["Amazon US：56 件有效商品，25/56 位于目标价带","TikTok Shop US：39 件有效商品，12/39 位于目标价带","TikTok：90 条内容样本","Kohl's：16 件部分样本，覆盖不足已披露"]},
      {type:"artifact",artifactId:"k-trend"},
      {type:"agent",text:"趋势与市场方向已形成。Amazon 的 blouse / tunic 搜索需求更强，轻商务上衣与易穿连衣裙证据较充分；非牛仔易穿裤有需求但目标价带承接偏弱。TikTok Shop 的宽腿裤内容信号最强，协调套装内容热度较高但价格和成本风险明显，合体上衣与 oversize 卫衣适合小批测试。以上为方向性判断，不等同于销量承诺。"},
      {type:"selection",title:"已确认趋势方向",key:"directions"},
      {type:"user",text:"这些方向可以，继续。"},
      {type:"execution",copy:"已按确认方向定向整理视觉参考。",label:"获取参考素材并完成硬过滤",details:["剔除牛仔、瑜伽、外套和不匹配人群结果","保留 Amazon、TikTok Shop、TikTok 与 Kohl's 真实来源图","逐图记录来源页、匹配方向和数据缺口"]},
      {type:"artifact",artifactId:"k-visual"},
      {type:"agent",text:"参考素材已按 Amazon / TikTok Shop × 2026 年 8 月 / 2027 年 2 月映射。真实市场图只用于趋势与方向依据，后续 AI 款式图单独标记，不作为市场证据。"},
      {type:"user",text:"视觉方向确认，继续做 50 款结构。"},
      {type:"artifact",artifactId:"k-structure"},
      {type:"agent",text:"50 款商品结构已锁定：Amazon 30 款、TikTok Shop 20 款；2026-08 快反波段 19 款、2027-02 波段 31 款。每款保留平台、人群、波段、品类、廓形、色彩图案、面料、售价、成本风险和 evidence_id。"},
      {type:"user",text:"结构确认，开始生成款式图。"},
      {type:"execution",copy:"已生成专业服装设计提示词。",label:"编制 50 款生图计划",details:["逐款锁定品类、廓形、领袖结构、面料、色彩和细节","区分 Amazon 与 TikTok Shop 的人群和视觉表达","加入供应链禁区、无文字与完整服装构图约束"]},
      {type:"artifact",artifactId:"k-prompts"},
      {type:"execution",copy:"50 款图片已完成生成与质量检查。",label:"生成并复核 AI 款式图",details:["50/50 款式图完成，统一 896×1200","精确重复 0，空白图 0","重做牛仔搭配、画面文字与条纹表现不足款"]},
      {type:"contact",artifactId:"k-styles",image:"case-assets/kaleshu/stage/stage_06_contact_sheet_1.jpg",title:"50 款 AI 款式图",summary:"两张联系表 · 50/50 通过 · 点击查看可筛选矩阵与单款详情"},
      {type:"agent",text:"款式图确认完成。AI 图仅作为本企划的方向设计表达，不作为市场证据。Amazon 与 TikTok Shop 的商品样本、价格与信号继续分开呈现。"},
      {type:"artifact",artifactId:"k-final-html"},
      {type:"artifact",artifactId:"k-final-ppt"},
      {type:"artifact",artifactId:"k-final-pdf"},
      {type:"agent",text:"《卡乐鼠｜美国女装 50 款新品企划案》已交付中文 HTML 主版本，并提供 PPT 与 PDF。最终报告包含需求范围、真实趋势证据、视觉方向、50 款商品矩阵、AI 款式图、成本风险和数据缺口。"}
    ],
    artifacts: [
      {id:"k-trend",label:"趋势与市场方向分析 V1",type:"summary",status:"已确认",summary:"Amazon 3 个方向 + TikTok Shop 3 个方向；真实样本、时间、证据与缺口"},
      {id:"k-visual",label:"参考素材与视觉方向 V1",type:"external",status:"已确认",summary:"真实市场参考图按平台与波段映射",url:"case-assets/kaleshu/stage/stage_04_visual_direction_v1.html"},
      {id:"k-structure",label:"50 款商品结构规划 V1",type:"external",status:"已确认",summary:"Amazon 30 款 / TikTok Shop 20 款",url:"case-assets/kaleshu/stage/stage_05_product_structure_v1.html"},
      {id:"k-prompts",label:"50 款专业生图提示词计划 V1",type:"external",status:"已完成",summary:"逐款结构、视觉与负向约束",url:"case-assets/kaleshu/stage/stage_06_ai_prompt_plan_v1.html"},
      {id:"k-styles",label:"50 款 AI 款式图",type:"styles",status:"已确认",summary:"50/50 · 896×1200 · 精确重复 0 · 空白图 0"},
      {id:"k-final-html",label:"新品企划案 · HTML",type:"external",status:"最终交付",summary:"中文主版本 · 50 款",url:"case-assets/kaleshu/deliverables/卡乐鼠_美国女装_50款新品企划案.html"},
      {id:"k-final-ppt",label:"新品企划案 · PPT",type:"download",status:"最终交付",summary:"可下载演示文件",url:"case-assets/kaleshu/deliverables/卡乐鼠_美国女装_50款新品企划案.pptx"},
      {id:"k-final-pdf",label:"新品企划案 · PDF",type:"download",status:"最终交付",summary:"可下载报告文件",url:"case-assets/kaleshu/deliverables/卡乐鼠_美国女装_50款新品企划案.pdf"}
    ],
    evidenceGroups: [
      {id:"K-EVG-AMZ",platform:"Amazon US",sourceType:"商品与列表页",title:"Amazon US 女装商品样本",sampleCount:56,traceableCount:56,dataTime:"采集于 2026-08-07",status:"真实任务数据 · 25/56 位于 USD 10-20",gap:"关键词分层小样本；搜索量、购买量字段不等于完整销量",scope:"美国女装；五个目标品类；30+轻商务与日常休闲",usedBy:"趋势方向、视觉参考、商品结构与最终企划",items:[{evidence_id:"EC-AMZ-PROD-002",source_platform:"Amazon US",source_type:"商品页",title_summary:"轻商务上衣与易穿连衣裙样本",source_url_status:"可溯源",source_url:"https://www.amazon.com/s?k=womens+business+casual+blouse",captured_at:"2026-08-07",data_time:"页面状态 2026-08-07",used_by:"A1/A2 方向与商品结构",data_gap:"单关键词 8 件；购买量为页面可见字段",metrics:{price:"中位数按关键词分别统计",sales:"41/56 返回过去一个月购买量",rating:"按商品保留",review_count:"按商品保留"}}]},
      {id:"K-EVG-TTS",platform:"TikTok Shop US",sourceType:"商品页",title:"TikTok Shop US 女装商品样本",sampleCount:39,traceableCount:39,dataTime:"采集于 2026-08-07",status:"真实任务数据 · 12/39 位于 USD 10-20",gap:"关键词结果量不均；sold 为平台页面字段，不与 Amazon 合并",scope:"美国站女装；20-35岁初入职场；紧身与 oversize",usedBy:"T1/T2/T3 方向、商品结构与最终企划",items:[{evidence_id:"EC-TTS-SHOP-002",source_platform:"TikTok Shop US",source_type:"商品页",title_summary:"非牛仔宽腿裤与轻商务商品样本",source_url_status:"可溯源",source_url:"https://shop.tiktok.com/us",captured_at:"2026-08-07",data_time:"页面状态 2026-08-07",used_by:"T1/T2/T3 方向",data_gap:"39 件分布偏斜；不推断全站份额",metrics:{price:"中位数 USD 20.99",sales:"39/39 返回 sold 字段",rating:"按商品保留"}}]},
      {id:"K-EVG-TIKTOK",platform:"TikTok",sourceType:"公开内容",title:"美国女装内容样本",sampleCount:90,traceableCount:90,dataTime:"近 6 个月 · 采集于 2026-08-07",status:"真实任务数据 · 仅作内容信号",gap:"含 19 条广告；无可靠创作者地域字段；互动不等于购买",scope:"6 组关键词各 15 条",usedBy:"宽腿裤、套装、合体上衣与 oversize 卫衣方向",items:[{evidence_id:"SOC-TIKTOK-001",source_platform:"TikTok",source_type:"公开帖子",title_summary:"wide leg pants / matching set 等内容样本",source_url_status:"条目保留原始帖子链接",source_url:"https://www.tiktok.com/",captured_at:"2026-08-07",data_time:"近 6 个月",used_by:"T1/T2/T3 方向",data_gap:"查询样本，不能代表平台总体",metrics:{views:"wide leg pants 播放中位数 142,300",likes:"按帖子保留",comments:"按帖子保留",saves:"收藏中位数 1,038"}}]},
      {id:"K-EVG-KOHLS",platform:"Kohl's",sourceType:"品牌/零售商品页",title:"Kohl's 女装部分样本",sampleCount:16,traceableCount:16,dataTime:"采集于 2026-08-07",status:"真实任务数据 · 覆盖不足",gap:"仅部分可访问样本；只作成熟休闲风格参考，不推断市场份额",scope:"美国大众女装与熟龄休闲参考",usedBy:"A1/A2 方向与视觉参考",items:[{evidence_id:"REF-KOHLS-001",source_platform:"Kohl's",source_type:"商品页",title_summary:"熟龄轻商务上衣与印花 midi dress",source_url_status:"可溯源",source_url:"https://www.kohls.com/catalog/womens-clothing.jsp",captured_at:"2026-08-07",data_time:"页面状态 2026-08-07",used_by:"风格与品类参考",data_gap:"16 件部分样本，覆盖不足",metrics:{price:"按商品保留",rating:"按商品保留",review_count:"按商品保留"}}]}
    ]
  },
  crownIvy: {
    metadata: {
      id:"crownIvy",title:"Crown & Ivy｜Fall 2026 客户提案",scene:"proposal",sceneLabel:"客户提案",status:"已完成",updated:"2026-08-10 09:24",
      profile:{name:"上海丝绸｜Crown & Ivy 客户档案",categories:["梭织上衣","连衣裙","裤装","套装"],countries:["美国"],ageRanges:["35-50岁女性"],channels:["BELK 官网","线下百货"],referenceBrands:["Talbots","Dillard's","Ann Taylor","Tuckernuck"],priceRange:{currency:"USD",min:0,max:0},uploadedFileCount:2,updatedAt:"2026-08-10"}
    },
    steps:["需求解析与确认","调研范围确认","趋势分析与方向确认","候选参考与客户确认","改款计划确认","AI 改款与分批图片确认","英文客户提案交付"],
    selectionStates:{requirement:["Fall Transition 2026","美国 / BELK","35-50 岁女性","英文单语","50 款"],scope:["BELK / Crown & Ivy","Dillard's","Ann Taylor","Talbots","TikTok","Pinterest","Instagram","美国搜索趋势"],directions:["Refined Ruffle Utility","Full Bloom Day Dresses","Crafted Texture","Placed Story Prints","Polished Woven Coordinates"],candidate:["C01-C30 全部确认"],structure:["上衣 18","连衣裙 20","裤装 6","套装 6"]},
    messages:[
      {type:"user",text:"请为 Crown & Ivy 做 Fall Transition 2026 英文客户提案。美国市场，BELK 官网和线下百货，35-50 岁女性；梭织上衣、连衣裙、裤装、套装，共 50 款。客户喜欢女性化、精致、舒适、得体的荷叶边和印花表达。"},
      {type:"execution",copy:"已完成客户资料解析。",label:"读取并解析客户资料",details:["读取飞书需求与 4 张趋势图","解析 6 页 PDF 和 CI2601-CI2618 共 18 个样衣参考","区分客户输入图、真实市场证据与后续 AI 图"]},
      {type:"agent",text:"本次需求理解\n\n上海丝绸为 Crown & Ivy 提供 Fall Transition 2026 女装梭织新品提案。目标为美国 BELK 官网及线下百货，面向 35-50 岁、稳定收入的女性。品牌偏好女性化、精致、舒适和得体，明确喜欢荷叶边；可使用有肌理梭织和少量绣花，但不能过度复杂。最终对外文件为英文单语，共 50 款。"},
      {type:"selection",title:"需求确认",key:"requirement"},{type:"user",text:"确认。"},
      {type:"agent",text:"调研范围将覆盖 Crown & Ivy / BELK 与 Dillard's、Ann Taylor、Talbots 等美国零售参照，另以 TikTok、Pinterest、Instagram 与美国搜索兴趣验证人群和视觉复现。客户趋势板与 PDF 只作为需求和检索锚点，不作为市场流行证据。"},
      {type:"selection",title:"调研范围",key:"scope"},{type:"user",text:"确认，继续。"},
      {type:"execution",copy:"已完成趋势与市场证据核对。",label:"采集零售、社媒与搜索证据",details:["核心零售：Crown & Ivy 3 页、Dillard's 8 条、Ann Taylor 8 条、Talbots 20 条","社媒：TikTok 40 条、Pinterest 40 条、Instagram 10 条","补充电商：Amazon 24 件、Walmart 40 件、TikTok Shop 15 件","未覆盖来源保留为数据缺口，不填造结论"]},
      {type:"artifact",artifactId:"c-trend"},
      {type:"agent",text:"趋势方向建议为五组：Refined Ruffle Utility、Full Bloom Day Dresses、Crafted Texture / Light Embroidery、Placed Story Prints、Polished Woven Coordinates。方向依据分别来自客户输入、零售复现、社媒视觉复现与美国搜索兴趣；单一帖子、商品或客户趋势图都不单独证明销量机会。"},
      {type:"selection",title:"已确认趋势方向",key:"directions"},{type:"user",text:"五个方向都可以，进入候选参考。"},
      {type:"execution",copy:"已按确认方向生成市场相似款候选池。",label:"定向检索并过滤候选参考",details:["保留目标年龄、梭织品类和美国市场硬约束","逐图记录来源、原始链接、入选原因与 evidence_id","候选池采用纯图片优先画廊"]},
      {type:"artifact",artifactId:"c-gallery"},
      {type:"user",text:"为什么候选池有那么多用户上传的图片？这里要的是符合用户上传图的类似流行款。"},
      {type:"agent",text:"已修正：客户上传图只保留为内部相似性检索锚点，全部退出候选卡。候选池已替换为 30 个真实市场商品参考，并移除客户原图、PDF 页面、创作者自拍和二手商品。"},
      {type:"artifact",artifactId:"c-gallery"},{type:"selection",title:"候选池历史确认结果",key:"candidate"},{type:"user",text:"都 OK。"},
      {type:"agent",text:"候选池 30 款全部确认。接下来按不同方向、品类和结构变量展开 50 款，不直接复刻客户样衣，也不做同版换色。"},
      {type:"artifact",artifactId:"c-plan"},{type:"selection",title:"50 款改款结构",key:"structure"},{type:"user",text:"OK。"},
      {type:"execution",copy:"已完成专业服装设计提示词计划。",label:"编制 50 款改款提示词",details:["逐款定义廓形、领袖结构、长度、面料、色彩、花型尺度与定位","记录候选参考映射、保留与修改逻辑","加入年龄、品牌、梭织、工艺与高发散约束"]},
      {type:"execution",copy:"第 1 批 10 款已生成并复核。",label:"生成 Batch 01 · CI26-001 至 CI26-010",details:["4 款定向重做后通过","完整服装主体、图案清晰、品牌适配"]},{type:"contact",artifactId:"c-styles",image:"case-assets/crown-ivy/contacts/06_batch_01_contact_sheet.jpg",title:"Batch 01 · 10 款",summary:"CI26-001 至 CI26-010 · 已确认"},{type:"user",text:"OK，继续。"},
      {type:"execution",copy:"第 2-3 批 20 款已生成并确认。",label:"生成 Batch 02-03 · CI26-011 至 CI26-030",details:["持续检查近似款、结构合理性和图案重复","款式与花型保持足够发散"]},{type:"user",text:"OK，继续做剩下的全部。"},
      {type:"execution",copy:"第 4-5 批 20 款已完成。",label:"生成 Batch 04-05 · CI26-031 至 CI26-050",details:["定位印、边框印、领口与袖口结构清晰","50 张图片全部通过文件、尺寸与视觉复核"]},
      {type:"contact",artifactId:"c-styles",image:"case-assets/crown-ivy/contacts/06_batch_05_contact_sheet.jpg",title:"50 款 AI 概念图",summary:"5 批 × 10 款 · 全部确认 · 点击查看矩阵与单款详情"},{type:"user",text:"OK。"},
      {type:"artifact",artifactId:"c-final"},
      {type:"artifact",artifactId:"c-final-ppt"},
      {type:"artifact",artifactId:"c-final-pdf"},
      {type:"agent",text:"最新版英文单语提案已交付。v2 前半部分重新加入封面视觉图、市场数据指标、客户趋势来源图和五个方向模块，后半部分保留完整 50 款矩阵与单款详情。所有 AI 图均标记为 AI-generated concept，不作为市场证据。"}
    ],
    artifacts:[
      {id:"c-trend",label:"Trend Analysis & Directions",type:"summary",status:"已确认",summary:"5 个方向 · 零售/社媒/搜索证据分层"},
      {id:"c-gallery",label:"Market Reference Candidate Pool",type:"gallery",status:"已确认",summary:"30 个真实市场相似款 · 客户图仅作检索锚点"},
      {id:"c-plan",label:"50-Style Modification Plan",type:"summary",status:"已确认",summary:"18 Tops / 20 Dresses / 6 Pants / 6 Sets"},
      {id:"c-styles",label:"50 AI Concept Styles",type:"styles",status:"已确认",summary:"5 批 × 10 款 · 高发散 · 全部确认"},
      {id:"c-final",label:"Crown & Ivy Fall 2026 Proposal · HTML",type:"external",status:"最终交付",summary:"English only · v2 · 50 styles",url:"case-assets/crown-ivy/final-v2/index.html"},
      {id:"c-final-ppt",label:"Crown & Ivy Fall 2026 Proposal · PPT",type:"download",status:"最终交付",summary:"English only · v2 · 10 slides",url:"case-assets/crown-ivy/deliverables/Crown_Ivy_Fall_Transition_2026_Proposal_v2.pptx"},
      {id:"c-final-pdf",label:"Crown & Ivy Fall 2026 Proposal · PDF",type:"download",status:"最终交付",summary:"English only · v2 · 11 pages",url:"case-assets/crown-ivy/deliverables/Crown_Ivy_Fall_Transition_2026_Proposal_v2.pdf"}
    ],
    evidenceGroups:[
      {id:"C-EVG-CLIENT",platform:"客户资料",sourceType:"飞书文档与 PDF",title:"Crown & Ivy 客户输入资料",sampleCount:28,traceableCount:28,dataTime:"资料读取于 2026-08-07",status:"真实任务资料 · 4 张趋势图 + 6 页 PDF + 18 个样衣编号",gap:"客户输入用于需求与检索锚点，不作为市场销量证据",scope:"Fall Transition 2026 色彩、样衣、荷叶边、印花与品类边界",usedBy:"需求解析、趋势适配、候选检索与最终提案",items:[{evidence_id:"REQ-CI-FS-001",source_platform:"客户资料",source_type:"飞书需求与趋势图",title_summary:"Crown & Ivy Fall 2026 需求与 4 张趋势图",source_url_status:"可溯源",source_url:"https://lightchain.feishu.cn/docx/Znn1dLlDGoxfCfx7TEac4ueLnX9",captured_at:"2026-08-07",data_time:"文档 revision 195",used_by:"需求解析、方向适配、最终提案",data_gap:"客户趋势图不是市场证据",metrics:{file_name:"飞书需求文档",file_page:"4 张趋势图"}}]},
      {id:"C-EVG-RETAIL",platform:"BELK / 美国零售商",sourceType:"品牌与商品页",title:"核心零售与竞品样本",sampleCount:37,traceableCount:37,dataTime:"采集于 2026-08-07",status:"真实任务数据 · 3 Crown & Ivy + 8 Dillard's + 8 Ann Taylor + 20 Talbots",gap:"BELK 动态页未稳定暴露完整在售梭织价格带；Tuckernuck 覆盖不足",scope:"美国 35-50 岁女性；梭织上衣、连衣裙、裤装、套装",usedBy:"五个趋势方向、候选池与最终提案",items:[{evidence_id:"RT-DIL-001",source_platform:"Dillard's",source_type:"商品页",title_summary:"CeCe woven floral ruffle-sleeve blouse",source_url_status:"可溯源",source_url:"https://www.dillards.com/",captured_at:"2026-08-07",data_time:"页面状态 2026-08-07",used_by:"Refined Ruffle Utility",data_gap:"价格为页面时点数据",metrics:{price:"USD 79 代表款",rating:"平台未返回",review_count:"平台未返回"}},{evidence_id:"RT-TAL-001",source_platform:"Talbots",source_type:"商品页",title_summary:"Ruffle Trim Blouse - Flourish Floral",source_url_status:"可溯源",source_url:"https://www.talbots.com/ruffle-trim-blouse---flourish-floral/55920865.html",captured_at:"2026-08-07",data_time:"页面状态 2026-08-07",used_by:"荷叶边与熟龄日常表达",data_gap:"价格和库存并非所有条目稳定返回",metrics:{price:"按页面可见字段保留"}}]},
      {id:"C-EVG-SOCIAL",platform:"TikTok / Pinterest / Instagram",sourceType:"公开内容与视觉样本",title:"目标人群与视觉复现样本",sampleCount:90,traceableCount:90,dataTime:"近 6 个月 / 采集于 2026-08-07",status:"真实任务数据 · TikTok 40 + Pinterest 40 + Instagram 10",gap:"查询样本不代表平台总体；广告内容已标记；互动不等于销售",scope:"fall floral / ruffle blouse / embroidered blouse / wide-leg coordinate",usedBy:"五个方向、候选池与最终提案",items:[{evidence_id:"SM-TT-003",source_platform:"TikTok",source_type:"公开帖子",title_summary:"Floral wrap dress for women over 40",source_url_status:"可溯源",source_url:"https://www.tiktok.com/@teacher_turns_trendy/video/7662366246981094686",captured_at:"2026-08-07",data_time:"近 6 个月",used_by:"Full Bloom Day Dresses",data_gap:"单帖只支持方向性复现",metrics:{views:"17,458",likes:"297",comments:"59",saves:"81"}},{evidence_id:"SM-PIN-002",source_platform:"Pinterest",source_type:"公开 Pin",title_summary:"Ecru embroidered Pauly shirt",source_url_status:"可溯源",source_url:"https://www.pinterest.com/pin/302656956857656543/",captured_at:"2026-08-07",data_time:"原 Pin 日期 2024",used_by:"Crafted Texture",data_gap:"较早样本，不单独证明 Fall 2026 优先级",metrics:{saves:"1,019",likes:"47 reactions"}}]},
      {id:"C-EVG-SEARCH",platform:"美国搜索兴趣",sourceType:"关键词趋势",title:"美国女装关键词兴趣",sampleCount:10,traceableCount:10,dataTime:"2025-07 至 2026-06",status:"真实任务数据 · 美国英语关键词",gap:"广告关键词搜索量为四舍五入字段，不等于销量",scope:"floral dress / shirt dress / wide leg pants / matching set / ruffle blouse 等",usedBy:"方向优先级与季节性判断",items:[{evidence_id:"SRCH-DFS-001",source_platform:"美国搜索兴趣",source_type:"关键词月搜索量",title_summary:"10 个 Fall 2026 相关女装关键词",source_url_status:"数据接口返回字段",source_url:"https://trends.google.com/trends/",captured_at:"2026-08-07",data_time:"2025-07 至 2026-06",used_by:"方向季节性与人群适配",data_gap:"搜索兴趣不等于交易",metrics:{views:"floral dress 49,500；shirt dress 40,500；wide leg pants 40,500；matching set 60,500"}}]}
    ]
  }
};
