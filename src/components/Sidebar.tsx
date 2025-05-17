'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

<<<<<<< HEAD
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

=======
type NavItem = {
  href?: string;
  icon: string;
  label: string;
  children?: NavItem[];
};

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  // track open/closed state per section label
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const path = usePathname();

  const navItems: NavItem[] = [
    { href: '/', icon: '🏠', label: 'Home' },

    {
      icon: '🛠️',
      label: 'Maintenance',
      children: [
        { href: '/maintenance/shop-issue', icon: '📝', label: 'Shop Issue' },
      ],
    },

    {
      icon: '⚙️',
      label: 'Operations',
      children: [
        { href: '/operations/tray-scanner', icon: '🔍', label: 'Tray Scanner' },
        { href: '/operations/excel-upload', icon: '📄', label: 'Excel Upload' },
        { href: '/operations/tray-finder', icon: '🧭', label: 'Tray Finder' },
      ],
    },

    {
      icon: '📦',
      label: 'Packing–Dispatch',
      children: [
        { href: '/packing-dispatch/packing', icon: '📦', label: 'Packing Scans' },
        { href: '/packing-dispatch/dispatch', icon: '🚚', label: 'Dispatch Scans' },
        { href: '/packing-dispatch/upload', icon: '📁', label: 'Excel Upload' },
      ],
    },
  ];

  const toggleSection = (label: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

>>>>>>> 27c4a4a (Final changes before deployment)
  return (
    <div
      className={`
        ${collapsed ? 'w-16' : 'w-64'}
        bg-gray-800 text-white transition-all duration-300 flex flex-col
      `}
    >
      <button
<<<<<<< HEAD
        onClick={() => setCollapsed(!collapsed)}
=======
        onClick={() => setCollapsed((c) => !c)}
>>>>>>> 27c4a4a (Final changes before deployment)
        className="p-4 focus:outline-none"
      >
        ☰
      </button>

<<<<<<< HEAD
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
=======
      <nav className="mt-4 flex-1 overflow-auto">
        {navItems.map((item) => {
          // simple link
          if (item.href) {
            const isActive = path === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center px-4 py-2 rounded
                  ${isActive ? 'bg-gray-700 font-semibold' : 'hover:bg-gray-700'}
                  transition
                `}
              >
                <span className="text-lg">{item.icon}</span>
                {!collapsed && <span className="ml-2">{item.label}</span>}
              </Link>
            );
          }

          // section with children
          const isOpen = openSections[item.label] ?? true; // default open
          return (
            <div key={item.label} className="mt-2">
              {/* Section header */}
              <button
                onClick={() => toggleSection(item.label)}
                className="w-full flex items-center px-4 py-2 font-semibold hover:bg-gray-700 transition"
              >
                <span className="text-lg">{item.icon}</span>
                {!collapsed && (
                  <>
                    <span className="ml-2 flex-1 text-left">{item.label}</span>
                    <span>{isOpen ? '▾' : '▸'}</span>
                  </>
                )}
              </button>

              {/* Sub-menu */}
              {!collapsed && isOpen && (
                <ul className="ml-8">
                  {item.children!.map((child) => {
                    const isActive = path === child.href;
                    return (
                      <li key={child.href}>
                        <Link
                          href={child.href!}
                          className={`
                            flex items-center px-4 py-2 rounded
                            ${isActive ? 'bg-gray-700 font-semibold' : 'hover:bg-gray-700'}
                            transition
                          `}
                        >
                          <span className="text-lg">{child.icon}</span>
                          <span className="ml-2">{child.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
>>>>>>> 27c4a4a (Final changes before deployment)
          );
        })}
      </nav>
    </div>
  );
}
