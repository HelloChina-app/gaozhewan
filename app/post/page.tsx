import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/article-card";
import { SubscribeForm } from "@/components/subscribe-form";
import { TopicCardFull } from "@/components/topic-card-full";
import { TopicCardPreview } from "@/components/topic-card-preview";
import { getAllTags, getSortedPosts, getSortedTopicCards } from "@/lib/content";

export const metadata: Metadata = {
  title: "搞选题",
  description:
    "搞选题帮中文创作者把全球新奇信号，快速变成今天就能发布的内容。"
};

export default function PostIndexPage() {
  const sortedPosts = getSortedPosts();
  const sortedCards = getSortedTopicCards();
  const tags = getAllTags();
  const [publicSample, ...rest] = sortedCards;
  const moreSamples = rest.slice(0, 2);

  return (
    <>
      <section className="page-shell">
        <div className="page-title">
          <p className="eyebrow">搞选题 · 把全球信号变成今天能发的内容</p>
          <h1>把全球信号拆成你今天能发的选题</h1>
          <p>
            每张选题卡都公开核验来源、写作角度、标题模板、时效与竞争度。内容免费，拿走就能改写。
          </p>
        </div>

        <div className="value-list topic-positioning">
          <div className="value-row">
            <h3>今日信号</h3>
            <p>快速判断全球产品、工具、社区讨论里哪一条最值得抢占。</p>
          </div>
          <div className="value-row">
            <h3>中文可写</h3>
            <p>不搬运资讯，重点补中国视角、国内可用性和创作者改写角度。</p>
          </div>
          <div className="value-row">
            <h3>完整可执行</h3>
            <p>每天 3 张完整选题卡，直接服务公众号、小红书、视频脚本和工具实测。</p>
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="section-inner">
          <div className="section-head">
            <div>
              <p className="eyebrow">完整示例</p>
              <h2>不是又一条资讯，是一张今天就能动手的选题卡</h2>
            </div>
            <Link className="text-button" href="/topics">
              打开免费选题工作台
            </Link>
          </div>
          <div className="topic-sample-grid">
            <TopicCardFull card={publicSample} />
            <div className="topic-preview-stack">
              {moreSamples.map((card) => (
                <TopicCardPreview card={card} key={card.id} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="section-head">
            <div>
              <p className="eyebrow">免费内容</p>
              <h2>先用文章验证你是否需要这个信号</h2>
            </div>
          </div>
          <div className="filter-row" aria-label="按标签浏览">
            {tags.map((tag) => (
              <Link href={`/tag/${encodeURIComponent(tag)}`} key={tag}>
                {tag}
              </Link>
            ))}
          </div>
          <div className="article-grid">
            {sortedPosts.map((post) => (
              <ArticleCard post={post} key={post.slug} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="section-inner subscribe-band">
          <div>
            <p className="eyebrow">免费邮件订阅</p>
            <h2>每周收一封值得继续跟的选题摘要</h2>
            <p>选择搞选题方向，我们会优先发送全球信号、中文创作角度和实验室新进展。</p>
          </div>
          <SubscribeForm source="topic-line" defaultInterest="搞选题" />
        </div>
      </section>
    </>
  );
}
