import { ExternalLink } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    servidor: [
      { name: "Reglas", href: "#" },
      { name: "Aplicaciones", href: "#" },
      { name: "Whitelist", href: "#" },
      { name: "Staff", href: "#" },
    ],
    comunidad: [
      { name: "Discord", href: "#", external: true },
      { name: "Foros", href: "#" },
      { name: "Wiki", href: "#" },
      { name: "Actualizaciones", href: "#" },
    ],
    soporte: [
      { name: "FAQ", href: "#" },
      { name: "Contacto", href: "#" },
      { name: "Reportar Bug", href: "#" },
      { name: "Donaciones", href: "#" },
    ],
  };

  return (
    <footer className="relative pt-20 pb-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-card/50" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-primary" />

      <div className="container relative z-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#home" className="inline-block mb-6">
              <span className="font-heading text-4xl">
                <span className="text-gradient">OASIS</span>
                <span className="text-foreground ml-2">ROLEPLAY</span>
              </span>
            </a>
            <p className="text-muted-foreground mb-6 max-w-sm">
              La experiencia de roleplay FiveM definitiva. Crea tu historia, 
              construye tu legado y forma parte de nuestra comunidad.
            </p>
            <div className="flex gap-3">
              {["Discord", "Twitter", "YouTube", "TikTok"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 glass-dark flex items-center justify-center hover:bg-primary/20 transition-colors skew-x-[-5deg]"
                  aria-label={social}
                >
                  <span className="text-sm font-heading skew-x-[5deg]">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="font-heading text-xl mb-4 uppercase text-primary">
                {category}
              </h4>
              <ul className="space-y-3">
                {items.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                    >
                      {link.name}
                      {"external" in link && link.external && (
                        <ExternalLink className="w-3 h-3" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Oasis RP. Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Términos de Servicio
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;