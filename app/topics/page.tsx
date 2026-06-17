import type { Metadata } from "next";
import { SubscribeForm } from "@/components/subscribe-form";
import { TopicsExplorer } from "@/components/topics-explorer";
import { getSortedTopicCards } from "@/lib/content";

export const metadata: Metadata = {
  title: "选题工作台",
  description:
    "搞着玩选题工作台：全球信号拆出的可执行选题，按竞争度筛选、按搞着玩指数或时间排序，快速锁定今天值得写的那条。"
};

export default function TopicsPage() {
  const cards = getSortedTopicCards();

  return (
    <section className="page-shell">
      <div className="page-title">
        <p className="eyebrow">选题工作台</p>
        <h1>今天写哪条？</h1>
        <p>
          每张卡是一条全球信号拆出的可执行选题，含写作角度、标题模板、竞争度和时效窗口。按竞争度筛、按分数或时间排，挑出最值得写的那条。
        </p>
      </div>

      <TopicsExplorer cards={cards} />

      <section className="section">
        <div className="subscribe-band">
          <div>
            <p className="eyebrow">搞选题 Pro</p>
            <h2>每天 3 张选题卡发到你邮箱</h2>
            <p>免费层看摘要，Pro 给完整角度、标题模板和素材包。</p>
          </div>
          <SubscribeForm source="topics-archive" defaultInterest="搞选题" />
        </div>
      </section>
    </section>
  );
}
