import Link from "next/link";
import Image from "next/image";
import { ArticleCard } from "@/components/article-card";
import { SubscribeForm } from "@/components/subscribe-form";
import { TopicCardPreview } from "@/components/topic-card-preview";
import {
  getAverageScore,
  getSortedPosts,
  posts,
  getSortedTopicCards,
  tools
} from "@/lib/content";
import { site } from "@/lib/site";

export default function HomePage() {
  const sortedPosts = getSortedPosts();
  const today = sortedPosts[0];
  const topPosts = [...posts]
    .sort((a, b) => getAverageScore(b.scores) - getAverageScore(a.scores))
    .slice(0, 3);
  const featuredTools = tools.filter((tool) => tool.featured).slice(0, 3);
  const recentCards = getSortedTopicCards().slice(0, 3);
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
      status: "MVP 内",
      href: "/tools"
    },
    {
      title: "搞项目",
      desc: "从新产品和开源趋势里找可做的小项目",
      status: "下一阶段",
      href: "/projects"
    },
    {
      title: "搞副业",
      desc: "把流量玩法、工具组合和案例变成可执行方案",
      status: "规划中",
      href: "/side-hustles"
    }
  ];

  return (
    <>
      <section className="section-inner hero">
        <div className="hero-copy">
          <p className="eyebrow">GAOZHEWAN · START WITH GLOBAL SIGNALS</p>
          <h1>你想搞什么？</h1>
          <p>
            搞着玩不是一个单一资讯站，而是把全球新奇事物变成选题、工具、项目和副业灵感的开搞入口。
          </p>
          <div className="hero-actions">
            <Link className="button" href={`/post/${today.slug}`}>
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
          <div className="hero-stats" aria-label="MVP 指标">
            <div>
              <strong>{posts.length}</strong>
              <span>篇全球信号</span>
            </div>
            <div>
              <strong>{tools.length}</strong>
              <span>个工具样本</span>
            </div>
            <div>
              <strong>48h</strong>
              <span>选题窗口</span>
            </div>
          </div>
        </div>
        <div className="radar-panel" aria-label="选题雷达预览">
          <div className="radar-header">
            <span>GAOZHEWAN RADAR</span>
            <span>GLOBAL SIGNALS</span>
          </div>
          <div className="radar-visual-wrap">
            <Image
              className="radar-visual"
              src="/global-signal-radar.jpg"
              alt="全球信号雷达与选题卡产品界面"
              width={1663}
              height={945}
              priority
            />
          </div>
          <div className="signal-list">
            {recentCards.map((card) => (
              <div className="signal-item" key={card.id}>
                <strong>{card.title}</strong>
                <span>{card.heat}</span>
              </div>
            ))}
          </div>
          <div className="signal-foot">
            <span>{site.slogan}</span>
            <div className="signal-meter" aria-hidden="true">
              <i />
            </div>
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="section-inner">
          <div className="section-head">
            <div>
              <p className="eyebrow">今日新奇</p>
              <h2>先看一个最值得抢占的全球信号</h2>
            </div>
            <Link className="text-button" href="/post">
              全部文章
            </Link>
          </div>
          <ArticleCard post={today} featured />
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
            <h2>搞着玩是母品牌，搞选题 Pro 是第一条商业闭环</h2>
            <p>
              每日 3 张选题卡，包含写作角度、标题模板、竞争度、时效窗口和素材包。
            </p>
          </div>
          <Link className="button" href="/pricing">
            查看早鸟价
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="section-head">
            <div>
              <p className="eyebrow">选题卡预览</p>
              <h2>Pro 核心交付长这样</h2>
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
            <h2>把全球新奇雷达发到你的邮箱</h2>
            <p>
              免费层用于验证选题和培养 Pro 转化。上线早期建议同步公众号和小红书，把邮件列表作为长期资产。
            </p>
          </div>
          <SubscribeForm source="home" />
        </div>
      </section>
    </>
  );
}
