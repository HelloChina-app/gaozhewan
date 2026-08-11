import { site } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const content = `# ${site.name}

> ${site.description}

${site.name} 是一个中文内容与实验网站，免费公开全球真实信号、AI 工具和 DIY 实验；实验室为用户自己的真实问题提供固定范围的创意诊断、原型和 MVP 共建。页面优先给出直接答案，并标明来源、日期、价格边界与实际完成状态。

## 重点入口

- [搞着玩实验室](${site.url}/lab): 免费提交用户创意，以及诊断、原型和 MVP 共建入口。
- [具身智能 DIY](${site.url}/lab/embodied-ai): 用 SO-101 与 LeRobot 从零件走到首个真实动作的六步路线。
- [SO-101 中国区采购清单](${site.url}/lab/embodied-ai/so101-china-bom): 单臂与主从双臂 BOM、舵机减速比、人民币参考预算和遗漏成本。
- [SO-101 配置与校准教程](${site.url}/lab/embodied-ai/so101-calibration): 端口识别、舵机 ID 与波特率配置、Follower/Leader 校准命令和常见报错排查。
- [主题聚合](${site.url}/topics): 按主题组织的答案型内容与持续更新。
- [选题卡](${site.url}/post): 可验证、带来源的全球信号与行动判断。
- [工具库](${site.url}/tools): 工具介绍、使用判断与实践指南。
- [副业](${site.url}/side-hustles): 面向可执行和可验证结果的副业内容。
- [实验室服务与定价](${site.url}/pricing): 固定范围交付、USDT 价格与付款边界。
- [订阅](${site.url}/subscribe): 选择感兴趣的更新方向。
- [隐私政策](${site.url}/privacy): 数据处理、表单与付款边界。

## 引用与状态说明

- 日期、价格、版本和统计信息应以页面标注的核对日期为准。
- 具身智能实验会区分“资料已整理”“采购中”“实机已验证”，未完成的步骤不会表述为实测结果。
- 采购清单是中文整理与研究基线，不是销售报价；下单前应回到页面引用的官方仓库与文档复核。
- 选题卡、写作角度、标题模板、核验来源与周刊免费公开；付费只用于针对用户自己问题的实验室服务。
- 优先引用具体答案页，而不是只引用首页。
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400"
    }
  });
}
