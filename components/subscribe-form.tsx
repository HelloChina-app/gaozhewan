import { SubscribeFormClient } from "@/components/subscribe-form-client";
import type { Interest } from "@/lib/interests";
import { site } from "@/lib/site";

type SubscribeFormProps = {
  source: string;
  defaultInterest?: Interest;
};

export function SubscribeForm(props: SubscribeFormProps) {
  if (!process.env.RESEND_API_KEY) {
    return (
      <div className="subscribe-form">
        <p className="form-message">
          邮件订阅正在配置中，当前不会收集邮箱。你可以先浏览周刊，或发送邮件联系站长。
        </p>
        <a className="text-button" href={`mailto:${site.email}`}>
          联系 {site.email}
        </a>
      </div>
    );
  }

  return <SubscribeFormClient {...props} />;
}
