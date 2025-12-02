import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";

interface DocSection {
  title: string;
  items: {
    label: string;
    path: string;
  }[];
}

const docSections: DocSection[] = [
  {
    title: "Getting Started",
    items: [
      { label: "Introduction", path: "/doc/getting-started/introduction" },
      { label: "Installation", path: "/doc/getting-started/installation" },
      { label: "Quick Start", path: "/doc/getting-started/quick-start" },
    ],
  },
  {
    title: "API Reference",
    items: [
      { label: "Authentication", path: "/doc/api/authentication" },
      { label: "Events", path: "/doc/api/events" },
      { label: "Participants", path: "/doc/api/participants" },
      { label: "Statistics", path: "/doc/api/statistics" },
    ],
  },
  {
    title: "How To",
    items: [
      { label: "Create an Event", path: "/doc/how-to/create-event" },
      { label: "Manage Participants", path: "/doc/how-to/manage-participants" },
      { label: "View Analytics", path: "/doc/how-to/view-analytics" },
      { label: "Export Data", path: "/doc/how-to/export-data" },
    ],
  },
  {
    title: "Guides",
    items: [
      { label: "Best Practices", path: "/doc/guides/best-practices" },
      { label: "Event Planning", path: "/doc/guides/event-planning" },
      { label: "Troubleshooting", path: "/doc/guides/troubleshooting" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "FAQ", path: "/doc/resources/faq" },
      { label: "Examples", path: "/doc/resources/examples" },
      { label: "Support", path: "/doc/resources/support" },
    ],
  },
];

const Sidebar = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "Getting Started",
    "API Reference",
  ]);
  const location = useLocation();

  const toggleSection = (title: string) => {
    setExpandedSections((prev) =>
      prev.includes(title)
        ? prev.filter((s) => s !== title)
        : [...prev, title]
    );
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200 p-6 overflow-y-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Documentation</h2>
        <p className="text-sm text-gray-500 mt-1">Learn how to use Haaflah</p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search docs..."
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Navigation Sections */}
      <nav className="space-y-2">
        {docSections.map((section) => (
          <div key={section.title} className="mb-2">
            {/* Section Header */}
            <button
              onClick={() => toggleSection(section.title)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-100 transition-colors group"
            >
              <span className="font-semibold text-gray-900 text-sm">
                {section.title}
              </span>
              <ChevronDown
                size={18}
                className={`text-gray-500 transition-transform ${
                  expandedSections.includes(section.title) ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Section Items */}
            {expandedSections.includes(section.title) && (
              <div className="ml-2 space-y-1 border-l border-gray-200 pl-3">
                {section.items.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                      isActive(item.path)
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Can't find what you need?{" "}
          <a href="mailto:hsanni507@gmail.com" className="text-blue-600 hover:text-blue-700 font-medium">
            Contact support
          </a>
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
