import type { Metadata } from "next";
import Image from "next/image";
import { SubscribeForm } from "@/components/subscribe-form";

export const metadata: Metadata = {
  title: "订阅",
  description: "订阅搞着玩邮件，接收全球今日新奇信号、周刊摘要和搞选题 Pro 早鸟通知。"
};

export default function SubscribePage() {
  return (
    <section className="page-shell">
      <div className="page-title">
        <p className="eyebrow">订阅</p>
        <h1>告诉我们你想搞哪个方向</h1>
        <p>
          邮件列表不只发内容，也用来验证后续产品方向：搞选题、搞工具、搞项目还是搞副业。
        </p>
      </div>

      <div className="subscribe-band">
        <div className="value-list">
          <div className="value-row">
            <h3>先拿每日全球信号</h3>
            <p>先知道是什么、为什么火、国内能不能用。</p>
          </div>
          <div className="value-row">
            <h3>每周 1 封周刊摘要</h3>
            <p>免费版摘 3 条，Pro 版补全 10 条素材链。</p>
          </div>
          <div className="value-row">
            <h3>搞选题早鸟通知</h3>
            <p>前 100 名锁定 ¥99/年，适合创作者和内容团队试用。</p>
          </div>
          <div className="qr-box">
            <Image
              src="/wechat-qr-placeholder.svg"
              alt="搞着玩公众号二维码占位图"
              width={112}
              height={112}
            />
            <p>公众号二维码上线前替换这张占位图。</p>
          </div>
        </div>
        <SubscribeForm source="subscribe-page" />
      </div>
    </section>
  );
}

