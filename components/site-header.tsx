"use client";

import Link from "next/link";
import { useState } from "react";
import { navItems, site } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="搞着玩首页" onClick={close}>
        <span className="brand-mark">G</span>
        <span>
          <strong>{site.name}</strong>
          <small>{site.domain}</small>
        </span>
      </Link>
      <button
        type="button"
        className="nav-toggle"
        aria-label={open ? "关闭菜单" : "打开菜单"}
        aria-expanded={open}
        aria-controls="site-nav"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="nav-toggle-bar" aria-hidden="true" />
        <span className="nav-toggle-bar" aria-hidden="true" />
        <span className="nav-toggle-bar" aria-hidden="true" />
      </button>
      <nav
        id="site-nav"
        className={open ? "site-nav site-nav-open" : "site-nav"}
        aria-label="主导航"
      >
        {navItems.map((item) => (
          <Link href={item.href} key={item.href} onClick={close}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
