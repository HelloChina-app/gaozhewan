import Link from "next/link";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <strong>{site.name}</strong>
        <p>{site.description}</p>
      </div>
      <div className="footer-links">
        <Link href="/about">关于</Link>
        <Link href="/lab">实验室</Link>
        <Link href="/topics">选题卡</Link>
        <Link href="/weekly">周刊</Link>
        <Link href="/privacy">隐私政策</Link>
        <Link href="/pricing">搞选题 Pro</Link>
        <Link href="/subscribe">订阅</Link>
        <a href="/feed.xml">RSS</a>
        <a href="/llms.txt">AI 索引</a>
        <a href={`mailto:${site.email}`}>{site.email}</a>
      </div>
    </footer>
  );
}
