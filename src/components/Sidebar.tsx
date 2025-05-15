'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const path = usePathname();

  const navItems = [
    { href: '/',    label: '🏠 Home'      },
    { href: '/packing',  label: '📦 Packing'   },
    { href: '/dispatch', label: '🚚 Dispatch'  },
    { href: '/upload',   label: '📁 Excel'     },
    // tray later…
  ];

  return (
    <div
      className={`
        ${collapsed ? 'w-16' : 'w-64'}
        bg-gray-800 text-white transition-all duration-300 flex flex-col
      `}
    >
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="p-4 focus:outline-none"
      >
        ☰
      </button>

      <nav className="mt-4 flex-1">
        {navItems.map(({ href, label }) => {
          const isActive = path === href;
          return (
            <Link
              key={href}
              href={href}
              className={`
                block px-4 py-2 
                ${isActive ? 'bg-gray-700 font-semibold' : 'hover:bg-gray-700'} 
                transition
              `}
            >
              {collapsed ? label.charAt(0) : label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
