"use client";

import { Key, useState } from "react";
import { dropdownMenus } from "./servicesdata"
import { ChevronRight } from "react-feather";
import Link from "next/link";

type NavMegaDropdownProps = {
  section: keyof typeof dropdownMenus;
};

const NavMegaDropdown = ({ section }: NavMegaDropdownProps) => {
  const menu = dropdownMenus[section];
  const categories = Object.keys(menu);
  const [active, setActive] = useState(categories[0]);

  return (
    <div className="absolute top-full left-0 mt-4 w-[1100px] z-50 flex bg-[#f8f9fa] rounded shadow-lg p-6">
      {/* Left column */}
      <div className="w-1/3 pr-4 border-r border-gray-300">
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat}>
              <button
                onMouseEnter={() => setActive(cat)}
                className={`w-full text-left flex justify-between items-center px-4 py-2 rounded ${
                  active === cat
                    ? "bg-[#0f2557] text-white"
                    : "hover:bg-gray-200 text-gray-800"
                }`}
              >
                <span>{cat}</span>
                <ChevronRight
                  size={16}
                  className={`transition-transform ${
                    active === cat ? "rotate-90" : ""
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-2/3 pl-6">
        <h3 className="text-[#0f2557] text-xl font-semibold mb-3">{active}</h3>
        <ul className="space-y-2">
          {(menu as Record<string, { href: string }[]>)[active].map(
            (item, i) => {
              const path = item.href;
              const label =
                path
                  .split("/")
                  .pop()
                  ?.replace(/-/g, " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase()) ?? "Service";

              return (
                <li key={i}>
                  <Link
                    href={path}
                    className="text-gray-800 hover:text-[#0f2557] inline-block py-1 capitalize"
                  >
                    {label}
                  </Link>
                </li>
              );
            }
          )}
        </ul>
      </div>
    </div>
  );
};

export default NavMegaDropdown;
