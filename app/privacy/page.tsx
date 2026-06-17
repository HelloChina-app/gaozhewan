import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "隐私政策",
  description: "搞着玩邮件订阅、Cookie 和用户数据使用说明。"
};

export default function PrivacyPage() {
  return (
    <section className="page-shell">
      <div className="page-title">
        <p className="eyebrow">隐私政策</p>
        <h1>只收集必要的数据</h1>
        <p>
          我们目前只收集你的邮箱订阅信息，用于发送今日信号、周刊摘要和搞选题 Pro 早鸟通知。
        </p>
      </div>

      <div className="value-list">
        <div className="value-row">
          <h3>我们收集什么</h3>
          <p>订阅邮箱、订阅来源、你选择的开搞方向、提交时间，以及基础站点访问统计。</p>
        </div>
        <div className="value-row">
          <h3>我们如何使用</h3>
          <p>用于发送邮件内容、优化选题方向、统计页面表现和处理用户反馈。</p>
        </div>
        <div className="value-row">
          <h3>我们不会做什么</h3>
          <p>不会出售邮箱，不会把订阅信息交给无关第三方，不会发送与搞着玩无关的推广。</p>
        </div>
        <div className="value-row">
          <h3>退订与删除</h3>
          <p>
            你可以通过邮件底部退订链接取消订阅，也可以发送邮件到{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a> 请求删除数据。
          </p>
        </div>
      </div>
    </section>
  );
}

