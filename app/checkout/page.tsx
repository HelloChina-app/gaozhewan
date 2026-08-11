import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "付款入口已迁移",
  description: "搞选题内容现已免费，付费服务迁移至搞着玩实验室。",
  robots: { follow: true, index: false }
};

export default function CheckoutPage() {
  return (
    <section className="page-shell checkout-shell">
      <div className="order-success">
        <p className="eyebrow">商业模式已更新</p>
        <h1>搞选题已经全部免费</h1>
        <p>
          这里不再出售 Pro 订阅。历史订单和访问链接继续有效；新的 USDT 付款只用于实验室诊断、原型和 MVP 共建服务。
        </p>
        <div className="hero-actions">
          <Link className="button" href="/lab#submit">
            提交创意
          </Link>
          <Link className="text-button" href="/topics">
            打开免费选题工作台
          </Link>
        </div>
      </div>
    </section>
  );
}
