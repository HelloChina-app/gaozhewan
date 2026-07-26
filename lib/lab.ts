export const LAB_FREE_SUBMISSION_ID = "idea-submission";

export const labServicePackages = [
  {
    id: "idea-diagnosis",
    name: "创意诊断包",
    amount: "29",
    delivery: "3 个工作日",
    summary: "先判断值不值得做，再决定要不要写代码。",
    deliverables: [
      "目标用户与核心问题校准",
      "竞品与替代方案快速核验",
      "MVP 范围、技术路线与变现建议",
      "一份可直接执行的诊断报告"
    ]
  },
  {
    id: "prototype-sprint",
    name: "原型冲刺",
    amount: "299",
    delivery: "7 天",
    summary: "把已经说清楚的想法做成可演示、可测试的第一版。",
    deliverables: [
      "一次范围确认",
      "核心流程与界面原型",
      "可访问的网页演示版本",
      "一轮集中修改"
    ]
  },
  {
    id: "mvp-build",
    name: "MVP 共建启动款",
    amount: "999",
    delivery: "14 天起",
    summary: "启动一个固定范围、可以真实交付给首批用户的 MVP。",
    deliverables: [
      "需求与验收边界确认",
      "核心功能开发与部署",
      "基础数据、支付或运营流程接入",
      "一轮验收与上线交接"
    ]
  }
] as const;
export type LabServicePackageId = (typeof labServicePackages)[number]["id"];
export type LabSelectionId =
  | typeof LAB_FREE_SUBMISSION_ID
  | LabServicePackageId;

export function getLabServicePackage(value: unknown) {
  if (typeof value !== "string") return null;
  return labServicePackages.find((item) => item.id === value) || null;
}

export function isLabSelectionId(value: unknown): value is LabSelectionId {
  return (
    value === LAB_FREE_SUBMISSION_ID ||
    Boolean(getLabServicePackage(value))
  );
}

export const labProjects = [
  {
    title: "搞着玩选题工作台",
    status: "已上线",
    summary: "把全球信号整理成可搜索、可核验、可直接开写的选题卡。",
    result: "每日内容生产、Pro 权限和公开素材链已经投入生产。",
    href: "/topics"
  },
  {
    title: "USDT 自动核验收银台",
    status: "已上线",
    summary: "只接受 TRC20 USDT，扫码付款后用交易哈希自动核验。",
    result: "支付、订单去重、Blob 私有存储和访问权发放已形成闭环。",
    href: "/checkout"
  },
  {
    title: "用户创意共建",
    status: "开放征集",
    summary: "从真实用户问题中甄选首批共建项目，公开进度由用户自行决定。",
    result: "首批保留 3 个项目席位，不承诺所有提交都会入选。",
    href: "#submit"
  }
] as const;
