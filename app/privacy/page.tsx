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
          我们只收集提供内容订阅、USDT 订单核验和 Pro 访问所必需的信息。
        </p>
      </div>

      <div className="value-list">
        <div className="value-row">
          <h3>我们收集什么</h3>
          <p>
            订阅邮箱、订阅来源、你选择的开搞方向、提交时间、基础站点访问统计；购买 Pro 时还会收集订单号、接收访问链接的邮箱、USDT 网络、交易哈希、可选的付款钱包地址和备注。
          </p>
        </div>
        <div className="value-row">
          <h3>我们如何使用</h3>
          <p>
            用于发送邮件内容、核对 USDT 链上付款、发放和验证 Pro 访问权限、处理售后、优化选题方向及统计页面表现。
          </p>
        </div>
        <div className="value-row">
          <h3>我们不会做什么</h3>
          <p>
            不会索取或保存私钥、助记词，不会代用户发起链上转账；不会出售邮箱，不会把订单信息交给无关第三方，也不会接受页面指定 USDT 之外的资产。
          </p>
        </div>
        <div className="value-row">
          <h3>链上信息</h3>
          <p>
            区块链交易本身是公开且不可撤销的。我们提交给邮件服务商的订单通知包含核验所需的交易哈希和邮箱，因此请勿在备注中填写私钥、助记词或其他敏感信息。
          </p>
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

