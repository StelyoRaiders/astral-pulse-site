import { 
  Car, 
  Users, 
  Building2, 
  Briefcase, 
  Shield, 
  Wrench,
  Store,
  Headphones
} from "lucide-react";

const features = [
  {
    icon: Car,
    title: "Vehículos Premium",
    description: "Más de 500 vehículos únicos, desde supercoches hasta aviones",
    color: "primary",
  },
  {
    icon: Users,
    title: "Comunidad Activa",
    description: "Únete a miles de jugadores en nuestro mundo de roleplay",
    color: "secondary",
  },
  {
    icon: Building2,
    title: "Propiedades",
    description: "Posee negocios, casas y bienes raíces exclusivos",
    color: "gta-green",
  },
  {
    icon: Briefcase,
    title: "Economía Dinámica",
    description: "Sistema de trabajos realista con más de 50 carreras",
    color: "gta-blue",
  },
  {
    icon: Shield,
    title: "Sistema de Facciones",
    description: "Únete a la policía, EMS, pandillas o crea tu organización",
    color: "gta-red",
  },
  {
    icon: Wrench,
    title: "Scripts Únicos",
    description: "Características exclusivas que no encontrarás en otro lugar",
    color: "primary",
  },
  {
    icon: Store,
    title: "Negocios de Jugadores",
    description: "Administra tu tienda, restaurante o empresa criminal",
    color: "secondary",
  },
  {
    icon: Headphones,
    title: "Voice Chat",
    description: "Voz por proximidad con frecuencias de radio",
    color: "gta-green",
  },
];

const getColorClasses = (color: string) => {
  const colorMap: Record<string, { bg: string; text: string; border: string; glow: string }> = {
    primary: { 
      bg: "bg-primary/20", 
      text: "text-primary", 
      border: "border-primary",
      glow: "shadow-[0_0_20px_hsl(var(--primary)/0.3)]"
    },
    secondary: { 
      bg: "bg-secondary/20", 
      text: "text-secondary", 
      border: "border-secondary",
      glow: "shadow-[0_0_20px_hsl(var(--secondary)/0.3)]"
    },
    "gta-green": { 
      bg: "bg-gta-green/20", 
      text: "text-gta-green", 
      border: "border-gta-green",
      glow: "shadow-[0_0_20px_hsl(var(--gta-green)/0.3)]"
    },
    "gta-blue": { 
      bg: "bg-gta-blue/20", 
      text: "text-gta-blue", 
      border: "border-gta-blue",
      glow: "shadow-[0_0_20px_hsl(var(--gta-blue)/0.3)]"
    },
    "gta-red": { 
      bg: "bg-gta-red/20", 
      text: "text-gta-red", 
      border: "border-gta-red",
      glow: "shadow-[0_0_20px_hsl(var(--gta-red)/0.3)]"
    },
  };
  return colorMap[color] || colorMap.primary;
};

const Features = () => {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-muted/30" />
      
      <div className="container relative z-10 px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-sm font-heading uppercase tracking-widest text-primary/60 px-4 py-2 border border-primary/20 rounded-full">
              Características
            </span>
          </div>
          <h2 className="font-heading text-5xl md:text-6xl mb-4">
            <span className="text-gradient">QUÉ NOS HACE</span>
            <br />
            <span className="text-foreground">DIFERENTES</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Experimenta el roleplay de siguiente nivel con nuestras características únicas
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const colors = getColorClasses(feature.color);
            return (
              <div
                key={feature.title}
                className="group relative glass-dark p-6 border-l-4 hover:translate-y-[-4px] transition-all duration-300 animate-fade-in-up opacity-0 overflow-hidden"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  borderLeftColor: `hsl(var(--${feature.color}))`,
                  clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0 100%)'
                }}
              >
                {/* Efecto de brillo en hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div 
                    className="absolute inset-0 blur-xl"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, hsl(var(--${feature.color}) / 0.1) 0%, transparent 70%)`
                    }}
                  />
                </div>

                {/* Icon */}
                <div className="relative mb-4">
                  <div className={`w-14 h-14 rounded-lg ${colors.bg} flex items-center justify-center group-hover:scale-110 group-hover:${colors.glow} transition-all duration-300`}>
                    <feature.icon className={`w-7 h-7 ${colors.text}`} />
                  </div>
                  
                  {/* Círculo decorativo */}
                  <div 
                    className={`absolute -top-2 -right-2 w-6 h-6 rounded-full ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    style={{
                      animation: 'ripple 2s ease-out infinite'
                    }}
                  />
                </div>

                {/* Content */}
                <h3 className={`font-heading text-xl mb-2 ${colors.text} group-hover:translate-x-1 transition-transform duration-300`}>
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Línea decorativa inferior */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-500" style={{ backgroundColor: `hsl(var(--${feature.color}))` }} />
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a href="#" className="btn-gta inline-block relative overflow-hidden">
            <span>Explorar Todo</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Features;