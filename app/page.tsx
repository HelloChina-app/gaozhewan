import Link from "next/link";
import { ArticleCard } from "@/components/article-card";
import { SubscribeForm } from "@/components/subscribe-form";
import { TopicCardPreview } from "@/components/topic-card-preview";
import {
  getAverageScore,
  getSortedPosts,
  posts,
  getSortedTopicCards,
  topicCards,
  tools
} from "@/lib/content";

export default function HomePage() {
  const sortedPosts = getSortedPosts();
  const latestPost = sortedPosts[0];
  const topPosts = [...posts]
    .sort((a, b) => getAverageScore(b.scores) - getAverageScore(a.scores))
    .slice(0, 3);
  const featuredTools = tools.filter((tool) => tool.featured).slice(0, 3);
  const recentCards = getSortedTopicCards().slice(0, 3);
  const signalFeed = getSortedTopicCards().slice(0, 4);
  const playLanes = [
    {
      title: "搞选题",
      desc: "把全球新奇信号拆成可发布内容",
      status: "当前开放",
      href: "/post"
    },
    {
      title: "搞工具",
      desc: "先测全球工具，再判断值不值得写",
      status: "已上线",
      href: "/tools"
    },
    {
      title: "实验室",
      desc: "自己动手玩实验，或把创意和我们一起做出来",
      status: "新实验",
      href: "/lab"
    }
  ];

  return (
    <>
      <section className="section-inner hero">
        <div className="hero-copy">
          <p className="eyebrow">GAOZHEWAN · START WITH GLOBAL SIGNALS</p>
          <h1>搞着玩</h1>
          <p>
            搞着玩帮你把全球新奇事物，变成可以立刻动手的选题、工具和公开实验。
          </p>
          <div className="hero-actions">
            <Link className="button" href={`/post/${latestPost.slug}`}>
              先搞选题
            </Link>
            <Link className="text-button" href="/pricing">
              了解搞选题 Pro
            </Link>
          </div>
          <div className="play-lanes" aria-label="搞着玩产品入口">
            {playLanes.map((lane) => (
              <Link className="lane-card" href={lane.href} key={lane.title}>
                <span>{lane.status}</span>
                <strong>{lane.title}</strong>
                <small>{lane.desc}</small>
              </Link>
            ))}
          </div>
          <div className="hero-stats" aria-label="内容概览">
            <div>
              <strong>{topicCards.length}</strong>
              <span>张选题卡</span>
            </div>
            <div>
              <strong>{posts.length}</strong>
              <span>篇免费深读</span>
            </div>
            <div>
              <strong>48h</strong>
              <span>选题窗口</span>
            </div>
          </div>
        </div>
        <div className="radar-panel" aria-label="最新全球信号">
          <div className="radar-header">
            <span className="signal-live">
              <i aria-hidden="true" />
              最新全球信号
            </span>
            <span>每日更新</span>
          </div>
          <div className="signal-list">
            {signalFeed.map((card, index) => (
              <Link className="signal-item" href={`/topic/${card.id}`} key={card.id}>
                <span className="signal-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="signal-body">
                  <strong>{card.title}</strong>
                  <span className="signal-heat">{card.heat}</span>
                  <span className="signal-tags">
                    <em>{card.publishedAt}</em>
                    <em>Pro 可解锁写作包</em>
                  </span>
                </span>
              </Link>
            ))}
          </div>
          <Link className="signal-cta" href="/topics">
            去选题工作台挑今天写哪条
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="section section-lab-cta">
        <div className="section-inner lab-home-cta">
          <div>
            <p className="eyebrow">实验室 · 自己玩 / 一起玩</p>
            <h2>先把东西玩出来，再讨论它有多大</h2>
            <p>
              第一个公开实验从 SO-101 + LeRobot 开始，自己 DIY
              一个会动手的 AI；你也可以提交创意，和我们共建第一版。
            </p>
          </div>
          <div className="hero-actions">
            <Link className="button" href="/lab/embodied-ai">
              看具身智能 DIY
            </Link>
            <Link className="text-button" href="/lab#submit">
              提交创意一起玩
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="section-inner">
          <div className="section-head">
            <div>
              <p className="eyebrow">最新深读</p>
              <h2>从全球信号到中文创作判断</h2>
            </div>
            <Link className="text-button" href="/post">
              全部文章
            </Link>
          </div>
          <ArticleCard post={latestPost} featured />
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="section-head">
            <div>
              <p className="eyebrow">本周高分</p>
              <h2>搞着玩指数最高的 3 篇</h2>
            </div>
          </div>
          <div className="article-grid">
            {topPosts.map((post) => (
              <ArticleCard post={post} key={post.slug} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="section-inner pro-cta">
          <div>
            <p className="eyebrow">搞选题 Pro</p>
            <h2>每天 3 张选题卡，打开就能写</h2>
            <p>
              每张卡含写作角度、标题模板、竞争度和时效窗口，免费版先看摘要。
            </p>
          </div>
          <Link className="button" href="/checkout">
            使用 USDT 开通
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="section-head">
            <div>
              <p className="eyebrow">选题卡预览</p>
              <h2>一张选题卡长什么样</h2>
            </div>
          </div>
          <div className="topic-grid">
            {recentCards.map((card) => (
              <TopicCardPreview card={card} key={card.id} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="section-inner">
          <div className="section-head">
            <div>
              <p className="eyebrow">工具库</p>
              <h2>全球工具，先测后写</h2>
            </div>
            <Link className="text-button" href="/tools">
              浏览工具库
            </Link>
          </div>
          <div className="tool-grid">
            {featuredTools.map((tool) => (
              <article className="value-row" key={tool.slug}>
                <h3>{tool.name}</h3>
                <p>{tool.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner subscribe-band">
          <div>
            <p className="eyebrow">邮件订阅</p>
            <h2>把全球新奇信号发到你的邮箱</h2>
            <p>
              每天一条最值得写的全球信号，直接发到你邮箱。免费，随时退订。
            </p>
          </div>
          <SubscribeForm source="home" />
        </div>
      </section>
    </>
  );
}
