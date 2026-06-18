import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "关于",
  description: "搞着玩在做什么、选题怎么挑、以及怎么联系我们。"
};

const principles = [
  {
    title: "为你能直接用而做",
    text: "每条都按「看完就能开写」打磨：不堆信息，只留你用得上的角度、模板和素材。"
  },
  {
    title: "快过全",
    text: "24–48 小时内捕捉全球互联网刚冒头的热议，帮你赶在话题被写烂之前下手，而不是等它变旧闻。"
  },
  {
    title: "可直接改写",
    text: "每条选题都附写作角度、标题模板和素材链，能直接变成你账号里的稿件，省掉从零起步的时间。"
  },
  {
    title: "好玩但靠谱",
    text: "调性可以轻松，但每条都讲真实来源、不编造、不标题党到失真——你转出去的东西得站得住。"
  }
];

export default function AboutPage() {
  return (
    <section className="page-shell">
      <div className="page-title">
        <p className="eyebrow">关于搞着玩</p>
        <h1>全球新奇信号，搞着玩</h1>
        <p>{site.description}</p>
      </div>

      <div className="value-list">
        {principles.map((principle) => (
          <div className="value-row" key={principle.title}>
            <h3>{principle.title}</h3>
            <p>{principle.text}</p>
          </div>
        ))}
        <div className="value-row">
          <h3>联系</h3>
          <p>
            合作、工具推荐、使用反馈：{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </div>
      </div>
    </section>
  );
}

