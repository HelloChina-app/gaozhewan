import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "隐私政策",
  description: "搞着玩邮件订阅、实验室创意、USDT 订单和用户数据使用说明。"
};

export default function PrivacyPage() {
  return (
    <section className="page-shell">
      <div className="page-title">
        <p className="eyebrow">隐私政策</p>
        <h1>只收集必要的数据</h1>
        <p>
          我们只收集提供内容订阅、实验室共建和 USDT 订单核验所必需的信息。历史 Pro 订单的最小访问记录仅用于继续履约。
        </p>
      </div>

      <div className="value-list">
        <div className="value-row">
          <h3>我们收集什么</h3>
          <p>
            订阅邮箱、订阅来源、你选择的开搞方向、提交时间、基础站点访问统计；购买实验室服务时还会处理联系邮箱、USDT
            网络、交易哈希、可选的付款钱包地址和备注。提交实验室创意时，我们还会收集创意标题、问题描述、目标用户、期望成果、当前阶段、预算区间、所选服务、可选联系方式和公开意愿。
          </p>
        </div>
        <div className="value-row">
          <h3>我们如何使用</h3>
          <p>
            用于发送邮件内容、甄选和联系实验室项目、确认共建范围与排期、通过
            TRON 公共链上事件核对 USDT 付款、阻止同一 TxID
            重复使用、处理售后、优化产品方向及统计页面表现。历史 Pro 访问令牌仍会继续验证，但不再面向新用户销售。
          </p>
        </div>
        <div className="value-row">
          <h3>我们不会做什么</h3>
          <p>
            不会索取或保存私钥、助记词，不会代用户发起链上转账；不会出售邮箱，不会把订单或未公开创意交给无关第三方，也不会接受页面指定
            USDT 之外的资产。实验室提交不会自动公开；即使勾选公开意愿，我们也会在正式发布项目信息前再次确认。
          </p>
        </div>
        <div className="value-row">
          <h3>实验室创意如何保存</h3>
          <p>
            实验室原始提交保存在私有 Blob
            中，用随机创意编号关联。为了甄选、联系和交付，我们会保存明文联系邮箱；公开项目看板不会直接读取或自动展示这些私有记录。请勿提交私钥、密码、客户名单、未获授权的个人数据或商业机密。
          </p>
        </div>
        <div className="value-row">
          <h3>链上信息</h3>
          <p>
            区块链交易本身是公开且不可撤销的。自动核验会把 TxID 发送到 TRON 公共查询接口；私有订单记录只保存 TxID、邮箱的密钥哈希、到账金额、区块信息和访问到期时间，不保存明文邮箱。转人工处理时，邮件通知可能包含核验所需的邮箱和交易资料。请勿在备注中填写私钥、助记词或其他敏感信息。
          </p>
        </div>
        <div className="value-row">
          <h3>退订与删除</h3>
          <p>
            你可以通过邮件底部退订链接取消订阅，也可以发送邮件到{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>{" "}
            请求删除数据。实验室项目进入履约后，法律、会计或争议处理所需的最小订单记录可能需要保留。
          </p>
        </div>
      </div>
    </section>
  );
}

