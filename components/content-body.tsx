import type { BodyBlock } from "@/lib/content";

type ContentBodyProps = {
  blocks: BodyBlock[];
  className?: string;
};

export function ContentBody({ blocks, className = "article-body" }: ContentBodyProps) {
  return (
    <div className={className}>
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;

        if (block.type === "heading") {
          return <h2 key={key}>{block.text}</h2>;
        }

        if (block.type === "paragraph") {
          return <p key={key}>{block.text}</p>;
        }

        if (block.type === "list") {
          return (
            <ul key={key}>
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }

        return (
          <aside className="callout" key={key}>
            <strong>{block.title}</strong>
            <p>{block.text}</p>
          </aside>
        );
      })}
    </div>
  );
}
