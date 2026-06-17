"use client";

export default function ErrorPage({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="page-shell">
      <div className="page-title">
        <p className="eyebrow">ERROR</p>
        <h1>这次开搞失败了</h1>
        <p>{error.digest ? `错误编号：${error.digest}` : "页面加载时发生异常。"}</p>
        <button className="button" onClick={reset} type="button">
          再试一次
        </button>
      </div>
    </section>
  );
}
