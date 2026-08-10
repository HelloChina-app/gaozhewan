import type { Metadata } from "next";
import Link from "next/link";
import { SubscribeForm } from "@/components/subscribe-form";
import { site } from "@/lib/site";

const pagePath = "/lab/embodied-ai/so101-calibration";
const pageUrl = `${site.url}${pagePath}`;
const officialTutorialUrl = "https://huggingface.co/docs/lerobot/so101";
const officialInstallUrl = "https://huggingface.co/docs/lerobot/installation";
const officialCheatSheetUrl = "https://huggingface.co/docs/lerobot/cheat-sheet";
const officialReleaseUrl =
  "https://github.com/huggingface/lerobot/releases/tag/v0.6.1";

export const metadata: Metadata = {
  title: "SO-101 校准教程：端口、舵机 ID 与 LeRobot 命令",
  description:
    "SO-101 从端口识别到校准完成的中文步骤：lerobot-find-port、舵机 ID 与波特率配置、Follower/Leader 校准命令、验收标准和常见报错排查。",
  alternates: {
    canonical: pagePath
  },
  openGraph: {
    title: "SO-101 校准教程：先配置舵机，再校准双臂",
    description:
      "分清 Follower 的 robot 参数和 Leader 的 teleop 参数，按官方顺序完成端口、舵机 ID、波特率与校准。",
    type: "article",
    url: pageUrl,
    locale: "zh_CN"
  }
};

const setupSteps = [
  {
    title: "安装 LeRobot 与 Feetech 依赖",
    text: "先按官方安装文档建立独立环境，并安装 Feetech 电机依赖。本文命令按 LeRobot v0.6.1 与 2026-08-10 的当前官方文档核对。"
  },
  {
    title: "给两臂和 12 个舵机贴标签",
    text: "把 Follower、Leader 分开，并提前标记关节 1–6。配置舵机时一次只连接一个舵机，避免多个默认 ID=1 的新舵机同时挂在总线上。"
  },
  {
    title: "识别两块控制板的 USB 端口",
    text: "控制板需要同时连接电脑 USB 与匹配的外部电源。运行 lerobot-find-port，按提示拔下对应控制板的 USB，再记录 Follower 和 Leader 各自的端口。"
  },
  {
    title: "分别写入舵机 ID 与波特率",
    text: "先配置 Follower，再配置 Leader。脚本会从夹爪开始提示你逐个连接舵机，并把关节 ID 与通信波特率写入舵机的非易失存储。"
  },
  {
    title: "装配后分别校准 Follower 与 Leader",
    text: "先把各关节放在大致中位，按回车后逐一走完完整活动范围。Follower 用 --robot 参数，Leader 用 --teleop 参数。"
  },
  {
    title: "固定并复用 calibration id",
    text: "把 my_follower_arm 与 my_leader_arm 换成自己的稳定命名；后续遥操作、采集和评估必须复用同一 id，LeRobot 才能找到对应校准文件。"
  }
];

const troubleshootingRows = [
  [
    "lerobot-find-port 没有找到端口",
    "控制板未同时接 USB 与外部电源、USB 线只有充电功能，或系统没有串口访问权限",
    "先换数据线并核对供电；Linux 再检查设备权限。端口名以工具实际输出为准，不要照抄示例。"
  ],
  [
    "配置停在 Connect ... motor only",
    "当前舵机不是唯一连接到控制板的设备，或 3 针线、USB、电源松动",
    "只保留提示中的一个舵机，断开它与其他舵机的串联，再逐项检查三类线缆。"
  ],
  [
    "Waveshare 控制板连不上舵机",
    "跳线没有切到官方教程要求的 B 通道（USB）",
    "断开操作并按控制板说明核对跳线位置；不要在电压或接线不确定时继续反复重试。"
  ],
  [
    "invalid choice: so101_leader",
    "把 Leader 当成 robot，误用了 --robot.type",
    "Leader 是 teleoperator：改用 --teleop.type=so101_leader；Follower 才使用 --robot.type=so101_follower。"
  ],
  [
    "校准完成后仍提示缺少 calibration",
    "后续命令使用了不同的 --robot.id 或 --teleop.id",
    "复用校准时的 id；不要把端口名、设备角色和 calibration id 混为一谈。"
  ],
  [
    "旧教程下 wrist_roll 对不上",
    "历史版本曾有 SO-101 wrist_roll 校准与电机配置问题",
    "先记录当前版本；官方 v0.6.0 已列出相关修复，本文核对基线为 v0.6.1。升级前先查看发布说明。"
  ]
];

const faqs = [
  {
    question: "SO-101 配置舵机和校准是一回事吗？",
    answer:
      "不是。lerobot-setup-motors 负责为舵机写入唯一 ID 与一致的波特率，通常只在新舵机或改作其他机械臂时执行；lerobot-calibrate 负责记录关节中位、活动范围与映射，让同一套动作值在机械臂上可复用。"
  },
  {
    question: "SO-101 每次开机都要重新校准吗？",
    answer:
      "通常不需要。官方速查表说明多数情况下每台 robot 和 teleoperation device 只需校准一次。更换舵机、改变机械结构、丢失校准文件或动作范围明显异常时，应重新检查并校准。"
  },
  {
    question: "为什么 Leader 不能使用 --robot.type=so101_leader？",
    answer:
      "在当前 LeRobot 命令体系中，Follower 是被控制的 robot，Leader 是 teleoperator。因此 Follower 使用 --robot.type=so101_follower，Leader 使用 --teleop.type=so101_leader。"
  },
  {
    question: "SO-101 校准时关节应该放在哪里？",
    answer:
      "先把所有关节放在各自活动范围的大致中位；开始记录后，再依次让每个关节走完完整活动范围。不要用蛮力越过机械限位。"
  },
  {
    question: "Windows 上应该填写哪个 SO-101 端口？",
    answer:
      "不要照抄 macOS 的 /dev/tty.usbmodem 或 Linux 的 /dev/ttyACM0。运行 lerobot-find-port，以本机实际返回的端口为准；如果没有返回结果，先排查数据线、供电、驱动与串口权限。"
  },
  {
    question: "校准命令里的 id 可以随便改吗？",
    answer:
      "第一次可以自定义，但之后不应随意变化。id 是 LeRobot 查找校准文件的键；遥操作、录制数据和评估同一套硬件时要复用相同 id。"
  }
];

export default function So101CalibrationPage() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "SO-101 校准教程：端口、舵机 ID 与 LeRobot 命令",
    description: metadata.description,
    datePublished: "2026-08-10",
    dateModified: "2026-08-10",
    inLanguage: "zh-CN",
    mainEntityOfPage: pageUrl,
    author: {
      "@type": "Organization",
      name: site.name,
      url: site.url
    },
    citation: [
      officialTutorialUrl,
      officialInstallUrl,
      officialCheatSheetUrl,
      officialReleaseUrl
    ],
    about: [
      "SO-101 校准",
      "LeRobot",
      "lerobot-find-port",
      "lerobot-setup-motors",
      "STS3215"
    ],
    proficiencyLevel: "Beginner"
  };
  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "如何配置并校准 SO-101 主从机械臂",
    description: metadata.description,
    inLanguage: "zh-CN",
    step: setupSteps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      text: step.text,
      url: `${pageUrl}#step-${index + 1}`
    }))
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "首页",
        item: site.url
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "实验室",
        item: `${site.url}/lab`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "具身智能 DIY",
        item: `${site.url}/lab/embodied-ai`
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "SO-101 校准教程",
        item: pageUrl
      }
    ]
  };

  return (
    <>
      <article className="article-shell bom-article">
        <header className="bom-hero">
          <p className="eyebrow">实验室 · 自己玩 001.2</p>
          <h1>SO-101 校准教程</h1>
          <p className="bom-answer">
            先说结论：正确顺序是<strong>识别端口 → 逐个配置舵机 → 完成装配 → 分别校准</strong>。
            Follower 使用 <code>--robot.type=so101_follower</code>，Leader 使用
            <code> --teleop.type=so101_leader</code>；两者的 calibration id
            必须在后续命令里保持一致。
          </p>
          <div className="hero-actions">
            <a className="button" href="#commands">
              直接复制 5 个命令
            </a>
            <Link
              className="text-button"
              href="/lab/embodied-ai/so101-china-bom"
            >
              还没采购？先看 BOM
            </Link>
          </div>
          <p className="bom-source-line">
            核验边界：本页根据
            <a href={officialTutorialUrl} rel="noreferrer" target="_blank">
              LeRobot SO-101 官方教程
            </a>
            、官方安装文档与发布说明整理，核对日期 2026-08-10；最新稳定版为
            <a href={officialReleaseUrl} rel="noreferrer" target="_blank">
              v0.6.1
            </a>
            。这是资料核验与操作清单，不是本站实机测试记录。
          </p>
        </header>

        <section className="bom-summary-grid" aria-label="SO-101 校准要点">
          <article>
            <p className="eyebrow">正确角色</p>
            <strong>robot ≠ teleop</strong>
            <h2>Follower 与 Leader 参数不同</h2>
            <p>最常见的命令错误，是把 Leader 写进 --robot.type。</p>
          </article>
          <article>
            <p className="eyebrow">正确顺序</p>
            <strong>先配置，再校准</strong>
            <h2>ID、波特率和活动范围缺一不可</h2>
            <p>新舵机默认 ID 可能相同，不能跳过逐个配置直接串联。</p>
          </article>
        </section>

        <section className="bom-section">
          <div className="section-head">
            <div>
              <p className="eyebrow">BEFORE POWER ON</p>
              <h2>先确认电压和供电，不要只插 USB</h2>
            </div>
          </div>
          <div className="bom-warning">
            <p>
              <strong>USB 不给舵机供电：</strong>控制板必须同时连接电脑 USB
              和外部电源，否则端口可能出现，但舵机不会正常响应。
            </p>
            <p>
              <strong>不要混用电压：</strong>官方资料要求 7.4V STS3215
              使用对应的 5V 供电方案，12V STS3215 使用 12V 5A+
              方案；SO-101 Leader 始终使用 7.4V 舵机。
            </p>
            <p>
              出现异常发热、异味、持续抖动或机械卡死时立即停止。本文没有替代万用表检查、控制板说明书或现场电气安全判断。
            </p>
          </div>
        </section>

        <section className="bom-section">
          <div className="section-head">
            <div>
              <p className="eyebrow">SIX STEPS</p>
              <h2>从空白舵机到校准文件</h2>
              <p>下面是官方流程的中文验收顺序；每一步通过后再进入下一步。</p>
            </div>
          </div>
          <ol className="so101-step-list">
            {setupSteps.map((step, index) => (
              <li id={`step-${index + 1}`} key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="bom-section" id="commands">
          <div className="section-head">
            <div>
              <p className="eyebrow">COPY-READY COMMANDS</p>
              <h2>SO-101 配置与校准命令</h2>
              <p>
                把示例端口和 id 换成你的实际值。macOS、Linux、Windows
                的端口写法不同，以 lerobot-find-port 输出为准。
              </p>
            </div>
          </div>

          <CommandBlock label="1. 找到每块 MotorBus 控制板的端口">
            lerobot-find-port
          </CommandBlock>
          <CommandBlock label="2. 配置 Follower 的舵机 ID 与波特率">
            {`lerobot-setup-motors \\
  --robot.type=so101_follower \\
  --robot.port=<FOLLOWER_PORT>`}
          </CommandBlock>
          <CommandBlock label="3. 配置 Leader 的舵机 ID 与波特率">
            {`lerobot-setup-motors \\
  --teleop.type=so101_leader \\
  --teleop.port=<LEADER_PORT>`}
          </CommandBlock>
          <CommandBlock label="4. 校准 Follower">
            {`lerobot-calibrate \\
  --robot.type=so101_follower \\
  --robot.port=<FOLLOWER_PORT> \\
  --robot.id=my_follower_arm`}
          </CommandBlock>
          <CommandBlock label="5. 校准 Leader">
            {`lerobot-calibrate \\
  --teleop.type=so101_leader \\
  --teleop.port=<LEADER_PORT> \\
  --teleop.id=my_leader_arm`}
          </CommandBlock>
        </section>

        <section className="bom-section">
          <div className="section-head">
            <div>
              <p className="eyebrow">ACCEPTANCE CHECK</p>
              <h2>怎样算校准完成</h2>
            </div>
          </div>
          <div className="bom-hidden-grid">
            <article className="value-row">
              <h3>端口映射可复述</h3>
              <p>你能明确说出哪个端口属于 Follower、哪个属于 Leader，而不是靠交换参数碰运气。</p>
            </article>
            <article className="value-row">
              <h3>舵机配置完整结束</h3>
              <p>脚本按关节顺序写入 1–6 的 ID，没有在某个舵机上反复报连接错误。</p>
            </article>
            <article className="value-row">
              <h3>活动范围全部记录</h3>
              <p>校准时每个关节都从中位出发并走完合理范围，没有用蛮力越过机械限位。</p>
            </article>
            <article className="value-row">
              <h3>id 已固定保存</h3>
              <p>Follower 与 Leader 的 id 被记录下来，后续遥操作和采集命令会继续复用。</p>
            </article>
          </div>
        </section>

        <section className="bom-section">
          <div className="section-head">
            <div>
              <p className="eyebrow">TROUBLESHOOTING</p>
              <h2>SO-101 找不到端口或校准失败怎么排查</h2>
              <p>从供电、线缆和参数角色开始，不要先怀疑模型或训练代码。</p>
            </div>
          </div>
          <div className="bom-table-wrap">
            <table className="bom-table so101-troubleshooting-table">
              <thead>
                <tr>
                  <th>现象</th>
                  <th>优先原因</th>
                  <th>下一步</th>
                </tr>
              </thead>
              <tbody>
                {troubleshootingRows.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell) => (
                      <td key={cell}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="bom-table-note">
            以上是依据官方教程、速查表和发布说明整理的排查顺序，不代表本站已复现每一种硬件故障。涉及烧毁、异味或物理损坏时应停止通电并联系硬件供应商或官方社区。
          </p>
        </section>

        <section className="bom-section">
          <div className="section-head">
            <div>
              <p className="eyebrow">SO-101 FAQ</p>
              <h2>配置与校准常见问题</h2>
            </div>
          </div>
          <div className="bom-faq-list">
            {faqs.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="bom-official-note">
          <div>
            <p className="eyebrow">VERIFY AGAINST YOUR VERSION</p>
            <h2>执行前再对照一次官方教程</h2>
            <p>
              LeRobot 的命令、参数和硬件支持会随版本变化。本文保留可搜索的中文答案与排错顺序，真正执行时仍以你安装版本的帮助输出和官方文档为准。
            </p>
          </div>
          <div className="hero-actions">
            <a
              className="button"
              href={officialTutorialUrl}
              rel="noreferrer"
              target="_blank"
            >
              查看官方 SO-101 教程
            </a>
            <a
              className="text-button"
              href={officialCheatSheetUrl}
              rel="noreferrer"
              target="_blank"
            >
              查看命令速查表
            </a>
          </div>
        </section>
      </article>

      <section className="section section-lab-cta">
        <div className="section-inner subscribe-band">
          <div>
            <p className="eyebrow">FOLLOW THE BUILD</p>
            <h2>从资料清单继续走到真实校准</h2>
            <p>
              本页先解决可核验的官方流程。后续只有在硬件真实采购、组装和执行后，才会补充本站实机结果与失败记录。
            </p>
            <Link className="text-button" href="/lab/embodied-ai">
              返回具身智能 DIY 路线
            </Link>
          </div>
          <SubscribeForm
            source="so101-calibration"
            defaultInterest="自己玩 DIY"
          />
        </div>
      </section>

      {[articleJsonLd, howToJsonLd, faqJsonLd, breadcrumbJsonLd].map(
        (schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        )
      )}
    </>
  );
}

function CommandBlock({
  label,
  children
}: {
  label: string;
  children: string;
}) {
  return (
    <div className="so101-command-block">
      <p>{label}</p>
      <pre>
        <code>{children}</code>
      </pre>
    </div>
  );
}
