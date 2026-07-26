import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { UsdtCheckoutForm } from "@/components/usdt-checkout-form";
import { getLabServicePackage } from "@/lib/lab";
import { site } from "@/lib/site";
import { getUsdtCheckoutConfigForProduct } from "@/lib/usdt";

export const metadata: Metadata = {
  title: "实验室 USDT 收银台",
  description: "使用 TRC20 USDT 启动搞着玩实验室共建服务。",
  robots: {
    follow: false,
    index: false
  }
};

type LabCheckoutPageProps = {
  searchParams: Promise<{ idea?: string; product?: string }>;
};

export default async function LabCheckoutPage({
  searchParams
}: LabCheckoutPageProps) {
  const { idea, product } = await searchParams;
  const labPackage = getLabServicePackage(product);
  const ideaId = idea?.trim().toUpperCase() || "";

  if (!labPackage || !/^GZL-\d{8}-[0-9A-F]{8}$/.test(ideaId)) {
    redirect("/lab#submit");
  }

  const checkout = getUsdtCheckoutConfigForProduct(labPackage.id);

  return (
    <section className="page-shell checkout-shell">
      <div className="page-title">
        <p className="eyebrow">实验室 · USDT ONLY</p>
        <h1>启动{labPackage.name}</h1>
        <p>
          本次付款绑定创意编号 {ideaId}。只接受 TRC20 USDT，不支持法币、银行卡、其他网络或代币。
        </p>
      </div>

      {checkout?.enabled ? (
        <UsdtCheckoutForm
          address={checkout.address}
          amount={checkout.amount}
          automaticVerification={checkout.automaticVerification}
          network={checkout.network}
          productId={checkout.productId}
          productName={checkout.planName}
          referenceId={ideaId}
        />
      ) : (
        <div className="order-success">
          <p className="eyebrow">收款配置中</p>
          <h2>实验室 USDT 收银台暂未开放</h2>
          <p>你的创意已经保存。收款入口恢复后可以使用同一创意编号继续。</p>
          <a className="text-button" href={`mailto:${site.email}`}>
            联系 {site.email}
          </a>
        </div>
      )}

      <div className="checkout-steps">
        <div className="value-row">
          <strong>01</strong>
          <h2>核对创意与服务</h2>
          <p>
            创意编号、联系邮箱和服务档位必须与提交记录一致，否则不会接受该交易哈希。
          </p>
        </div>
        <div className="value-row">
          <strong>02</strong>
          <h2>按唯一网络付款</h2>
          <p>只发送页面金额的 USDT，并严格使用 TRON（TRC20）网络。</p>
        </div>
        <div className="value-row">
          <strong>03</strong>
          <h2>核验后确认排期</h2>
          <p>链上核验通过后订单与创意绑定；实验室按提交范围确认交付与排期。</p>
        </div>
      </div>

      <p className="checkout-back">
        <Link className="text-button" href="/lab">
          返回实验室
        </Link>
      </p>
    </section>
  );
}
