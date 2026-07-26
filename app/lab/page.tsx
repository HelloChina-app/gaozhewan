import type { Metadata } from "next";
import Link from "next/link";
import { LabIdeaForm } from "@/components/lab-idea-form";
import { labProjects, labServicePackages } from "@/lib/lab";

export const metadata: Metadata = {
  title: "搞着玩实验室",
  description:
    "提交你的创意和真实问题，由搞着玩实验室甄选、验证并共建可以使用的第一版。只接受 USDT 付款。"
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

export default function LabPage() {
  return (
    <>
      <section className="section-inner lab-hero">
        <div>
          <p className="eyebrow">搞着玩实验室 · OPEN LAB</p>
          <h1>你出创意，我们把值得做的第一版做出来</h1>
          <p>
            从真实问题开始。你提交需求和目标，我们负责甄选、核验、拆范围，并和你一起把想法变成可以演示、测试或交付给首批用户的产品。
          </p>
          <p className="lab-path-note">
            实验室适合已经有明确问题、希望共同交付的人。还在找方向？
            <Link href="/side-hustles">先走免费自助路径</Link>。
          </p>
          <div className="hero-actions">
            <a className="button" href="#submit">
              提交创意
            </a>
            <a className="text-button" href="#projects">
              查看实验室项目
            </a>
          </div>
          <div className="lab-trust-row" aria-label="实验室承诺">
            <span>免费提交</span>
            <span>私有保存</span>
            <span>固定范围</span>
            <span>USDT ONLY</span>
          </div>
        </div>

        <aside className="lab-callout">
          <p className="eyebrow">首批开放</p>
          <strong>3 个共建席位</strong>
          <p>
            我们不会承诺实现所有愿望。首批只选择问题清楚、两周左右能验证核心价值的项目。
          </p>
          <a className="text-button" href="#rules">
            看甄选标准
          </a>
        </aside>
      </section>

      <section className="section section-muted">
        <div className="section-inner">
          <div className="section-head">
            <div>
              <p className="eyebrow">HOW IT WORKS</p>
              <h2>从一句想法到一个可验收结果</h2>
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
