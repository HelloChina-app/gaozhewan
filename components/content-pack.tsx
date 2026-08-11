type ContentPackProps = {
  angles: string[];
  headlines: string[];
};

export function ContentPack({ angles, headlines }: ContentPackProps) {
  return (
    <section className="content-pack" aria-label="免费创作包">
      <div>
        <p className="eyebrow">免费创作包</p>
        <h2>可直接改写的内容包</h2>
      </div>
      <div className="topic-section">
        <h3>推荐写作角度</h3>
        <ol>
          {angles.map((angle) => (
            <li key={angle}>{angle}</li>
          ))}
        </ol>
      </div>
      <div className="topic-section">
        <h3>标题模板</h3>
        <ul>
          {headlines.map((headline) => (
            <li key={headline}>「{headline}」</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
