import type { Metadata } from "next";
import { SubscribeForm } from "@/components/subscribe-form";

export const metadata: Metadata = {
  title: "搞副业",
  description:
    "搞副业帮你把全球工具、流量玩法和小生意案例，拆成能小成本验证的副业方案。"
};

const sideHustleSignals = [
  {
    title: "小生意案例",
    text: "观察全球独立开发、AI 工具、内容产品和微型服务，筛出普通人可理解的变现路径。"
  },
  {
    title: "工具组合",
    text: "把一个副业想法拆成获客渠道、交付工具、自动化流程和最低成本验证方式。"
  },
  {
    title: "风险边界",
    text: "不包装暴富故事，优先写清楚投入、周期、合规风险和不适合谁。"
  }
];

export default function SideHustlesPage() {
  return (
    <section className="page-shell">
      <div className="page-title">
        <p className="eyebrow">搞副业 · 规划中</p>
        <h1>把全球玩法拆成能验证的副业方案</h1>
        <p>
          这条线我们会慢慢做扎实。你可以先留下想做的副业方向，我们优先把你最需要的方案做出来。
        </p>
      </div>

      <div className="value-list topic-positioning">
        {sideHustleSignals.map((signal) => (
          <div className="value-row" key={signal.title}>
            <h3>{signal.title}</h3>
            <p>{signal.text}</p>
          </div>
        ))}
      </div>

      <section className="section">
        <div className="subscribe-band">
          <div>
            <p className="eyebrow">候补名单</p>
            <h2>如果你想搞副业，先告诉我们</h2>
            <p>后续会优先把副业案例拆解和工具组合发给选择“搞副业”的用户。</p>
          </div>
          <SubscribeForm source="side-hustles-page" defaultInterest="搞副业" />
        </div>
      </section>
    </section>
  );
}
