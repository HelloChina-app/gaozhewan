import type { Metadata } from "next";
import Link from "next/link";
import { TopicsExplorer } from "@/components/topics-explorer";
import { getSortedTopicCards, topicClusters } from "@/lib/content";

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
          全部选题卡永久免费：搜索写作角度与标题模板，按竞争度、分数或时效窗口筛选，来源可回到原站核验。
        </p>
      </div>

      <section className="section topic-cluster-band">
        <div className="section-head">
          <div>
            <p className="eyebrow">主题指南</p>
            <h2>从一条热点，读成一套判断框架</h2>
          </div>
        </div>
        <div className="topic-cluster-grid">
          {topicClusters.map((cluster) => (
            <Link className="topic-cluster-card" href={`/topics/${cluster.slug}`} key={cluster.slug}>
              <span>{cluster.eyebrow}</span>
              <h3>{cluster.title}</h3>
              <p>{cluster.description}</p>
              <strong>{cluster.topicIds.length} 个相关选题 →</strong>
            </Link>
          ))}
        </div>
      </section>

      <TopicsExplorer cards={cards} />

      <section className="section">
        <div className="subscribe-band">
          <div>
            <p className="eyebrow">免费内容 · 实验室共建</p>
            <h2>内容拿走用；想把创意做出来，再来找我们</h2>
            <p>选题卡不再收费。实验室只为创意诊断、原型冲刺和 MVP 共建收取固定范围服务费，并且只接受 USDT。</p>
          </div>
          <Link className="button" href="/lab#submit">
            提交一个真实问题
          </Link>
        </div>
      </section>
    </section>
  );
}
