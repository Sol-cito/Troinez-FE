import Link from "next/link";
import React from "react";

function Header() {
  return (
    <header>
      <nav className="flex space-x-4 mb-2">
        <Link href="/" className="bg-blue-200 rounded px-4 py-2">
          SHOP
        </Link>
        <Link href="/about" className="bg-cyan-200 rounded px-4 py-2">
          ABOUT
        </Link>
        <Link href="/" className="bg-cyan-200 rounded px-4 py-2">
          LOGIN(LOGOUT)
        </Link>
        <Link href="/" className="bg-cyan-200 rounded px-4 py-2">
          CART
        </Link>
      </nav>
    </header>
  );
}

export default Header;
