import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-shell">
      <div className="page-title">
        <p className="eyebrow">404</p>
        <h1>这个选题还没收录</h1>
        <p>回到首页，先看今天最值得抢占的全球信号。</p>
        <Link className="button" href="/">
          返回首页
        </Link>
      </div>
    </section>
  );
}

