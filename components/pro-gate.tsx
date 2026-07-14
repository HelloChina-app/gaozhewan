import Link from "next/link";

type ProGateProps = {
  anglesCount?: number;
  templatesCount?: number;
};

export function ProGate({ anglesCount = 3, templatesCount = 3 }: ProGateProps) {
  return (
    <section className="pro-gate" aria-label="Pro 专属内容">
      <div>
        <p className="eyebrow">解锁完整选题</p>
        <h2>这篇还能直接拆成 {anglesCount} 个写作角度</h2>
        <p>
          搞选题 Pro 用户可见竞争度、时效窗口、素材链接和 {templatesCount} 个标题模板，适合直接改成公众号、小红书或视频脚本。
        </p>
      </div>
      <div className="locked-lines" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <Link className="button button-dark" href="/checkout">
        使用 USDT 开通 Pro
      </Link>
    </section>
  );
}
