import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "搞项目",
  description:
    "选择自己验证副业方向，或者把明确创意提交给搞着玩实验室共同做出第一版。"
};

const projectPaths = [
  {
    eyebrow: "FREE · SELF-SERVICE",
    title: "自己做：搞副业",
    text: "适合还在找方向、想控制投入的人。看案例、选工具、拆最小验证方案，由你自己执行。",
    points: ["免费浏览与订阅", "先验证需求，再投入开发", "不包装暴富和收益保证"],
    href: "/side-hustles",
    action: "从免费路径开始"
  },
  {
    eyebrow: "USDT · CO-BUILD",
    title: "一起做：实验室",
    text: "适合已经能说清问题和目标用户、希望有人一起拆范围并交付第一版的人。",
    points: ["免费提交创意，私有保存", "固定范围、周期和验收结果", "入选后使用 TRC20 USDT 付款"],
    href: "/lab",
    action: "提交创意给实验室"
  }
];

export default function ProjectsPage() {
  return (
    <div className="page-shell project-hub">
      <div className="page-title">
        <p className="eyebrow">搞项目 · CHOOSE YOUR PATH</p>
        <h1>想自己做，还是一起做？</h1>
        <p>
          两条路径解决的是同一件事：把想法变成可以验证的结果。区别只在于由谁来执行。
        </p>
      </div>

      <div className="project-path-grid">
        {projectPaths.map((path) => (
          <article className="project-path-card" key={path.href}>
            <p className="eyebrow">{path.eyebrow}</p>
            <h2>{path.title}</h2>
            <p>{path.text}</p>
            <ul>
              {path.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <Link className="button" href={path.href}>
              {path.action}
            </Link>
          </article>
        ))}
      </div>

      <section className="section">
        <div className="project-decision-note">
          <div>
            <p className="eyebrow">HOW TO CHOOSE</p>
            <h2>还不确定，就先自己验证</h2>
          </div>
          <p>
            当你已经验证有人需要、也能说清第一版要解决什么，再进入实验室，通常能减少返工和不必要的付费。
          </p>
        </div>
      </section>
    </div>
  );
}
