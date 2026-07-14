import type { Metadata } from "next";
import Link from "next/link";
import { TopicsExplorer } from "@/components/topics-explorer";
import { getSortedTopicCards } from "@/lib/content";
import { getProAccess } from "@/lib/pro-access";

export const metadata: Metadata = {
  title: "选题工作台",
  description:
    "搞着玩选题工作台：全球信号拆出的可执行选题，按竞争度筛选、按搞着玩指数或时间排序，快速锁定今天值得写的那条。"
};

export default async function TopicsPage() {
  const access = await getProAccess();
  const cards = getSortedTopicCards();
  const visibleCards = access
    ? cards
    : cards.map(({ id, title, heat, scores, publishedAt }) => ({
        id,
        title,
        heat,
        scores,
        publishedAt
      }));

  return (
    <section className="page-shell">
      <div className="page-title">
        <p className="eyebrow">选题工作台</p>
        <h1>今天写哪条？</h1>
        <p>
          {access
            ? "Pro 已解锁：搜索完整写作包，按竞争度、分数或时效窗口筛选。"
            : "免费版可浏览全球信号摘要和搞着玩指数；Pro 解锁写作角度、标题模板、素材包、竞争度与时效窗口。"}
        </p>
      </div>

      <TopicsExplorer cards={visibleCards} showPro={Boolean(access)} />

      <section className="section">
        <div className="subscribe-band">
          <div>
            <p className="eyebrow">{access ? "Pro 已生效" : "搞选题 Pro"}</p>
            <h2>{access ? "你的完整选题工作台已解锁" : "每天 3 张选题卡，打开就能写"}</h2>
            <p>
              {access
                ? `当前访问授权：${access.email}`
                : "只接受 USDT。付款经链上确认后，通过邮件发放一年期访问链接。"}
            </p>
          </div>
          {access ? null : (
            <Link className="button" href="/checkout">
              使用 USDT 开通
            </Link>
          )}
        </div>
      </section>
    </section>
  );
}
