import type { Metadata } from "next";
import Link from "next/link";
import { UsdtCheckoutForm } from "@/components/usdt-checkout-form";
import { getProAccess } from "@/lib/pro-access";
import { getUsdtCheckoutConfig } from "@/lib/usdt";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "USDT 收银台",
  description: "使用 USDT 开通搞选题 Pro 年度版。"
};

export default async function CheckoutPage() {
  const access = await getProAccess();
  const checkout = getUsdtCheckoutConfig();

  return (
    <section className="page-shell checkout-shell">
      <div className="page-title">
        <p className="eyebrow">USDT ONLY</p>
        <h1>开通搞选题 Pro</h1>
        <p>
          一次支付，解锁 365 天完整选题卡。本站只接受 USDT，不支持法币、银行卡或其他代币。
        </p>
      </div>

      {access ? (
        <div className="order-success">
          <p className="eyebrow">Pro 已生效</p>
          <h2>当前浏览器已解锁</h2>
          <p>授权邮箱：{access.email}</p>
          <Link className="button" href="/topics">
            进入完整选题工作台
          </Link>
        </div>
      ) : checkout.enabled ? (
        <UsdtCheckoutForm
          address={checkout.address}
          amount={checkout.amount}
          automaticVerification={checkout.automaticVerification}
          network={checkout.network}
        />
      ) : (
        <div className="order-success">
          <p className="eyebrow">收款配置中</p>
          <h2>USDT 收银台暂未开放</h2>
          <p>为避免用户转错链，网络和收款地址配置完成前不会展示付款入口。</p>
          <a className="text-button" href={`mailto:${site.email}`}>
            联系 {site.email}
          </a>
        </div>
      )}

      <div className="checkout-steps">
        <div className="value-row">
          <strong>01</strong>
          <h2>按页面指定网络付款</h2>
          <p>钱包转账手续费由付款方承担，到账金额必须不少于页面显示金额。</p>
        </div>
        <div className="value-row">
          <strong>02</strong>
          <h2>提交交易哈希</h2>
          <p>提交只代表申请核验，不代表订单已确认；我们会检查币种、网络、地址、金额和链上确认。</p>
        </div>
        <div className="value-row">
          <strong>03</strong>
          <h2>核验通过后站内解锁</h2>
          <p>
            已确认的官方 USDT 转账会直接生成一年期访问权；同一 TxID 只能开通一次。异常情况才转人工处理。
          </p>
        </div>
      </div>
    </section>
  );
}
