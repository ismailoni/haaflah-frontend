import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function BreadcrumbNav() {
  const location = useLocation();
  const pathname = location.pathname;
  const parts = pathname.split("/").filter(Boolean);

  const formatName = (segment: string): string =>
    segment
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  const isProbablyId = (s: string): boolean => {
    if (/^\d+$/.test(s)) return true; // numeric id
    if (/^[0-9a-fA-F]{24}$/.test(s)) return true; // Mongo ObjectId
    if (
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
        s
      )
    )
      return true; // UUID
    return false;
  };

  // build crumbs from original parts so paths include ids, but filter out ids from display
  const crumbs = parts
    .map((part, i) => ({
      name: isProbablyId(part) ? null : formatName(part),
      path: "/" + parts.slice(0, i + 1).join("/"),
      isId: isProbablyId(part),
    }))
    .filter((c) => !c.isId);

  return (
    <nav className="flex items-center gap-1 px-8 py-2 text-sm text-gray-500 bg-white border-b border-gray-200">
      <a
        href="/"
        className="flex items-center gap-1 font-medium text-gray-500 no-underline hover:text-gray-700"
      >
        Haaflah
      </a>

      {crumbs.map((crumb, i) => (
        <React.Fragment key={crumb.path}>
          <span className="mx-1 text-gray-400">›</span>
          {i === crumbs.length - 1 ? (
            <span className="font-semibold text-gray-900">{crumb.name}</span>
          ) : (
            <Link
              to={crumb.path}
              className="text-gray-500 no-underline hover:text-gray-700 hover:underline"
            >
              {crumb.name}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
