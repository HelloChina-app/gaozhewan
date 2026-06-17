import Link from "next/link";
import { navItems, site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="搞着玩首页">
        <span className="brand-mark">G</span>
        <span>
          <strong>{site.name}</strong>
          <small>{site.domain}</small>
        </span>
      </Link>
      <nav className="site-nav" aria-label="主导航">
        {navItems.map((item) => (
          <Link href={item.href} key={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
