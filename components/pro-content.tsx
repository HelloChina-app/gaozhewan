type ProContentProps = {
  angles: string[];
  headlines: string[];
};

export function ProContent({ angles, headlines }: ProContentProps) {
  return (
    <section className="pro-content" aria-label="Pro 专属内容">
      <div>
        <p className="eyebrow">Pro 已解锁</p>
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

