import type { Metadata } from "next";
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
          选你最想搞的方向，我们就把那条线的信号、工具和案例优先发给你：搞选题、搞工具、搞项目还是搞副业。
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
        </div>
        <SubscribeForm source="subscribe-page" />
      </div>
    </section>
  );
}

