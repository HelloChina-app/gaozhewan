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
  const lockedSamples = rest.slice(0, 2);

  return (
    <>
      <section className="page-shell">
        <div className="page-title">
          <p className="eyebrow">搞选题 · 把全球信号变成今天能发的内容</p>
          <h1>把全球信号拆成你今天能发的选题</h1>
          <p>
            免费层帮你判断一件事值不值得跟，搞选题 Pro
            交付角度、标题、时效、竞争度和素材包。
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
            <h3>Pro 可执行</h3>
            <p>每天 3 张选题卡，直接服务公众号、小红书、视频脚本和工具实测。</p>
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="section-inner">
          <div className="section-head">
            <div>
              <p className="eyebrow">完整样品</p>
              <h2>付费后拿到的不是资讯，是一张可执行选题卡</h2>
            </div>
            <Link className="text-button" href="/pricing">
              查看搞选题 Pro
            </Link>
          </div>
          <div className="topic-sample-grid">
            <TopicCardFull card={publicSample} />
            <div className="topic-preview-stack">
              {lockedSamples.map((card) => (
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
            <p className="eyebrow">早鸟名单</p>
            <h2>如果你要搞选题，先加入前 100 名</h2>
            <p>我们会优先把完整选题卡样品、早鸟价格和内测反馈入口发给你。</p>
          </div>
          <SubscribeForm source="topic-line" defaultInterest="搞选题" />
        </div>
      </section>
    </>
  );
}
