import Link from "next/link";
import { GzwScore } from "@/components/gzw-score";
import type { Tool } from "@/lib/content";

type ToolCardProps = {
  tool: Tool;
};

export function ToolCard({ tool }: ToolCardProps) {
  const href = tool.affiliateUrl || tool.url;
  const rel = tool.affiliateProvider
    ? "sponsored noopener noreferrer"
    : "noopener noreferrer";

  return (
    <article className="tool-card">
      <div className="tool-card-top">
        <span className="tool-icon">{tool.name.slice(0, 1).toUpperCase()}</span>
        <div>
          <p>{tool.category}</p>
          <h3>{tool.name}</h3>
        </div>
      </div>
      <p>{tool.description}</p>
      <div className="tag-row">
        {tool.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <GzwScore scores={tool.scores} compact />
      <div className="tool-card-actions">
        <Link className="text-button" href={`/tools/${tool.slug}`}>
          查看详情
        </Link>
        <a className="text-button" href={href} rel={rel} target="_blank">
          打开工具
        </a>
      </div>
      {tool.affiliateProvider ? <small className="sponsor-note">合作链接</small> : null}
    </article>
  );
}
