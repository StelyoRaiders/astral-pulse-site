import { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Solo prevenir default si es un anchor y estamos en home
    if (href.startsWith("#") && isHomePage) {
      e.preventDefault();
      setIsMenuOpen(false);
      
      if (href === "#home") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        return;
      }
      
      const targetId = href.replace("#", "");
      const element = document.getElementById(targetId);
      
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 50);

      if (currentY < 10) {
        setIsHidden(false);
      } else if (currentY > lastScrollY.current + 10) {
        setIsHidden(true);
      } else if (currentY < lastScrollY.current - 10) {
        setIsHidden(false);
      }

      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Inicio", href: isHomePage ? "#home" : "/" },
    { name: "Tienda", href: isHomePage ? "#home" : "/" },
    { name: "Características", href: isHomePage ? "#features" : "/#features" },
    { name: "Galería", href: isHomePage ? "#gallery" : "/#gallery" },
    { name: "Estado", href: isHomePage ? "#status" : "/#status" },
    { name: "Normativa", href: isHomePage ? "#normativa" : "/#normativa" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-dark" : "bg-transparent"
      } ${isHidden ? "-translate-y-full" : "translate-y-0"} transform`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20 relative">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <span className="font-heading text-3xl text-gradient tracking-wider">
                OASIS
              </span>
              <span className="font-heading text-3xl text-foreground tracking-wider ml-1">
                RP
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="relative font-heading text-lg uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors duration-300 group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <a href="https://whitelist.oasisrp.es/" className="hidden md:block btn-gta text-sm py-2 px-6">
              <span>WHITELIST</span>
            </a>

            <a href="https://discord.oasisrp.es/" className="hidden md:block btn-gta text-sm py-2 px-6">
              <span>Discord</span>
            </a>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-80 pb-6" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-4 pt-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-heading text-lg uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors py-2"
              >
                {link.name}
              </a>
            ))}
            <a href="https://whitelist.oasisrp.es/" className="btn-gta text-sm text-center mt-2">
              <span>WHITELIST</span>
            </a>
            <a href="https://discord.oasisrp.es/" className="btn-gta text-sm text-center mt-2">
              <span>Discord</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
