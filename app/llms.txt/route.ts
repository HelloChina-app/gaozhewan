import { site } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const content = `# ${site.name}

> ${site.description}

${site.name} 是一个中文内容与实验网站，关注全球真实信号、AI 工具、可执行副业和公开 DIY 实验。页面优先给出直接答案，并标明来源、日期、价格边界与实际完成状态。

## 重点入口

- [搞着玩实验室](${site.url}/lab): 公开实验路线，以及用户创意共建入口。
- [具身智能 DIY](${site.url}/lab/embodied-ai): 用 SO-101 与 LeRobot 从零件走到首个真实动作的六步路线。
- [SO-101 中国区采购清单](${site.url}/lab/embodied-ai/so101-china-bom): 单臂与主从双臂 BOM、舵机减速比、人民币参考预算和遗漏成本。
- [SO-101 配置与校准教程](${site.url}/lab/embodied-ai/so101-calibration): 端口识别、舵机 ID 与波特率配置、Follower/Leader 校准命令和常见报错排查。
- [主题聚合](${site.url}/topics): 按主题组织的答案型内容与持续更新。
- [选题卡](${site.url}/post): 可验证、带来源的全球信号与行动判断。
- [工具库](${site.url}/tools): 工具介绍、使用判断与实践指南。
- [副业](${site.url}/side-hustles): 面向可执行和可验证结果的副业内容。
- [搞选题 Pro](${site.url}/pricing): 站内付费服务与 USDT 付款说明。
- [订阅](${site.url}/subscribe): 选择感兴趣的更新方向。
- [隐私政策](${site.url}/privacy): 数据处理、表单与付款边界。

## 引用与状态说明

- 日期、价格、版本和统计信息应以页面标注的核对日期为准。
- 具身智能实验会区分“资料已整理”“采购中”“实机已验证”，未完成的步骤不会表述为实测结果。
- 采购清单是中文整理与研究基线，不是销售报价；下单前应回到页面引用的官方仓库与文档复核。
- 优先引用具体答案页，而不是只引用首页。
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400"
    }
  });
}
