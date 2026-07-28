import type { Metadata } from "next";
import Link from "next/link";
import { LabIdeaForm } from "@/components/lab-idea-form";
import { labProjects, labServicePackages } from "@/lib/lab";

export const metadata: Metadata = {
  title: "搞着玩实验室",
  description:
    "自己动手玩公开实验，或提交创意与搞着玩实验室共同做出第一版；首个实验从 SO-101 与 LeRobot 具身智能 DIY 开始。"
};

const selectionRules = [
  {
    title: "问题真实",
    text: "能说清楚谁在什么场景遇到问题，而不只是一句“做个某某平台”。"
  },
  {
    title: "首版可验收",
    text: "两周左右能交付一个可演示、可测试或可上线的核心结果。"
  },
  {
    title: "边界可控制",
    text: "不涉及违法、侵权、欺诈、博彩、高风险金融或无法验证的收益承诺。"
  },
  {
    title: "价值可复用",
    text: "解决方案最好能帮助一类人，而不仅是一次性的私人操作。"
  }
];

const steps = [
  ["01", "提交真实问题", "免费提交并获得私有创意编号，不会自动公开。"],
  ["02", "实验室甄选", "按真实性、可行性、变现与可复用性判断是否值得做。"],
  ["03", "确认范围与付款", "固定交付物、周期和验收边界，只接受 TRC20 USDT。"],
  ["04", "做出第一版", "按约定交付可检查的结果；新增需求重新评估，不无限修改。"]
];

const labPaths = [
  {
    eyebrow: "自己玩 · OPEN BUILD",
    title: "跟着公开实验动手",
    text: "我们先把真实选型、预算、失败和结果公开。你可以照着复现，也可以只挑自己感兴趣的一段来玩。",
    points: ["免费查看实验路线", "标明成本、版本与完成状态", "不把概念演示包装成成熟产品"],
    href: "/lab/embodied-ai",
    action: "进入具身智能 DIY"
  },
  {
    eyebrow: "一起玩 · CO-BUILD",
    title: "把你的创意一起做出来",
    text: "你负责说清真实问题和目标，我们一起拆范围、定验收，并把值得做的第一版交付出来。",
    points: ["免费提交，创意私有保存", "固定范围、周期与验收结果", "入选后只接受 TRC20 USDT"],
    href: "#submit",
    action: "提交创意"
  }
];

export default function LabPage() {
  return (
    <>
      <section className="section-inner lab-hero">
        <div>
          <p className="eyebrow">搞着玩实验室 · OPEN LAB</p>
          <h1>自己玩起来，也可以一起玩</h1>
          <p>
            这里不是正式立项大厅。我们先选一个真实、有趣、可以动手验证的问题，把过程和失败公开；你也可以带着自己的创意进来，和我们共同做出第一版。
          </p>
          <div className="hero-actions">
            <Link className="button" href="/lab/embodied-ai">
              看第一个公开实验
            </Link>
            <a className="text-button" href="#submit">
              提交创意一起玩
            </a>
          </div>
          <div className="lab-trust-row" aria-label="实验室承诺">
            <span>真实成本</span>
            <span>公开过程</span>
            <span>可复现路线</span>
            <span>USDT 共建</span>
          </div>
        </div>

        <aside className="lab-callout">
          <p className="eyebrow">自己玩 · 001</p>
          <strong>会动手的 AI</strong>
          <p>
            从 SO-101 + LeRobot 开始，公开采购、组装、示教、训练和第一次真实动作。
          </p>
          <Link className="text-button" href="/lab/embodied-ai">
            查看实验路线
          </Link>
        </aside>
      </section>

      <section className="section section-muted" id="play">
        <div className="section-inner">
          <div className="section-head">
            <div>
              <p className="eyebrow">TWO WAYS TO PLAY</p>
              <h2>你想自己玩，还是一起玩？</h2>
            </div>
          </div>
          <div className="project-path-grid">
            {labPaths.map((path) => (
              <article className="project-path-card" key={path.eyebrow}>
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
        </div>
      </section>

      <section className="section embodied-lab-preview">
        <div className="section-inner embodied-preview-grid">
          <div>
            <p className="eyebrow">FLAGSHIP OPEN BUILD</p>
            <h2>自己 DIY 一个会动手的 AI</h2>
            <p>
              不从“人形机器人改变世界”的新闻开始，而是从桌面机械臂、真实零件和第一个可验证动作开始。每一步都标注当前状态，没做完就写没做完。
            </p>
            <div className="hero-actions">
              <Link className="button" href="/lab/embodied-ai">
                查看完整路线
              </Link>
              <Link className="text-button" href="/subscribe">
                订阅搭建更新
              </Link>
            </div>
          </div>
          <div className="embodied-preview-stats" aria-label="具身智能实验概要">
            <div>
              <strong>SO-101</strong>
              <span>开源机械臂起点</span>
            </div>
            <div>
              <strong>LeRobot</strong>
              <span>数据与训练框架</span>
            </div>
            <div>
              <strong>6 步</strong>
              <span>从采购到首个动作</span>
            </div>
            <div>
              <strong>公开</strong>
              <span>预算、失败和进度</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="section-inner">
          <div className="section-head">
            <div>
              <p className="eyebrow">一起玩 · HOW IT WORKS</p>
              <h2>你的想法，怎样变成可验收结果</h2>
            </div>
          </div>
          <div className="lab-step-grid">
            {steps.map(([number, title, text]) => (
              <article className="value-row" key={number}>
                <strong>{number}</strong>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="submit">
        <div className="section-inner lab-submit-layout">
          <div>
            <p className="eyebrow">SUBMIT AN IDEA</p>
            <h2>先把问题说清楚</h2>
            <p>
              原始提交只保存在私有 Blob 中。即使你勾选允许公开，我们仍会在真正发布项目信息前再次确认。
            </p>
            <div className="lab-submit-notes">
              <p>不要填写私钥、密码、客户名单或未获授权的个人数据。</p>
              <p>免费提交不保证入选；付费只启动页面明确列出的服务范围。</p>
            </div>
          </div>
          <LabIdeaForm />
        </div>
      </section>

      <section className="section section-dark" id="services">
        <div className="section-inner">
          <div className="section-head">
            <div>
              <p className="eyebrow">USDT ONLY</p>
              <h2>三种固定范围的共建方式</h2>
              <p>先提交创意，再按创意编号付款。所有价格均为 TRC20 USDT。</p>
            </div>
          </div>
          <div className="lab-pricing-grid">
            {labServicePackages.map((item) => (
              <article className="lab-price-card" key={item.id}>
                <p className="eyebrow">{item.delivery}</p>
                <h3>{item.name}</h3>
                <div className="price">
                  <strong>{item.amount}</strong>
                  <span>USDT</span>
                </div>
                <p>{item.summary}</p>
                <ul>
                  {item.deliverables.map((deliverable) => (
                    <li key={deliverable}>{deliverable}</li>
                  ))}
                </ul>
                <a className="button" href="#submit">
                  先提交创意
                </a>
              </article>
            ))}
          </div>
          <p className="lab-price-note">
            999 USDT 是 MVP 共建启动款，不代表任何复杂度项目的无限范围总价。超出固定范围的功能会在开发前单独确认，不会自动扣款。
          </p>
        </div>
      </section>

      <section className="section" id="projects">
        <div className="section-inner">
          <div className="section-head">
            <div>
              <p className="eyebrow">LAB BOARD</p>
              <h2>实验室项目看板</h2>
              <p>只展示自研项目和经过明确同意公开的用户项目。</p>
            </div>
          </div>
          <div className="lab-project-grid">
            {labProjects.map((project) => (
              <article className="lab-project-card" key={project.title}>
                <span className="lab-status">{project.status}</span>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <small>{project.result}</small>
                <Link className="text-button" href={project.href}>
                  {project.status === "开放征集" ? "提交项目" : "查看项目"}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-muted" id="rules">
        <div className="section-inner">
          <div className="section-head">
            <div>
              <p className="eyebrow">SELECTION RULES</p>
              <h2>什么样的创意更容易入选</h2>
            </div>
          </div>
          <div className="topic-positioning">
            {selectionRules.map((rule) => (
              <article className="value-row" key={rule.title}>
                <h3>{rule.title}</h3>
                <p>{rule.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="lab-boundary">
            <div>
              <p className="eyebrow">BOUNDARIES</p>
              <h2>我们交付第一版，不出售成功保证</h2>
            </div>
            <ul>
              <li>不承诺收入、融资、流量或市场成功。</li>
              <li>不接受违法、侵权、欺诈、博彩和高风险金融项目。</li>
              <li>每个项目在付款前确认交付物、周期、修改次数与知识产权归属。</li>
              <li>用户可选择保密；未经再次确认，不公开原始创意与身份。</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
