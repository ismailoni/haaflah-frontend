import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.svg";
interface NavItem {
  id: string;
  label: string;
}

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 50);

      const sections = document.querySelectorAll<HTMLElement>("section");
      let current = "home";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
          const id = section.getAttribute("id");
          if (id) current = id;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems: NavItem[] = [
    { id: "home", label: "Home" },
    { id: "features", label: "Features" },
    { id: "doc", label: "Docs" },
    { id: "product", label: "Product" },
    { id: "team", label: "Team" },
    { id: "faq", label: "FAQ" },
  ];

  return (
    <nav
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
    >
      <div className="lg:max-w-6xl max-lg:px-5 lg:px-6 mx-auto py-4 flex justify-between items-center">
        {/* Logo */}
        <a
          href="/"
          className="text-4xl flex items-center gap-5 text-[#0C1421] font-bold satisfy-regular"
        >
          <img src={Logo} alt="" className=" h-10" />
          Haaflah
        </a>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-5">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`${item.id == 'doc' ? '/doc' : `#${item.id}`}`}
                className={`transition-colors px-3 py-2 rounded-md font-semibold ${activeSection === item.id
                    ? "text-[#0C1421] bg-gray-300"
                    : "text-[#1F2937]"
                  }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Get Started Button (desktop only) */}
        <div className="hidden lg:block">
          <Link
            to="/sign-in"
            className="bg-[#0C1421] text-white px-7 py-2 rounded"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-gray-700"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white shadow-md h-screen">
          <ul className="flex flex-col space-y-2 px-6 py-4">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`${item.id == 'doc' ? '/doc' : `#${item.id}`}`}
                  onClick={() => setIsOpen(false)}
                  className={`block transition-colors px-3 py-2 rounded-sm font-semibold ${activeSection === item.id
                      ? "text-[] bg-gray-300"
                      : "text-[#1F2937]"
                    }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <Link
                to="/sign-in"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-[#0C1421] text-white px-7 py-2 rounded-lg"
              >
                Get Started
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
