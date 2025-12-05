import { Crown, Shield, Headphones, Code, Users, Star, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

const Staff = () => {
  const staffCategories = [
    {
      title: "Dirección",
      icon: Crown,
      color: "from-yellow-500 to-amber-600",
      borderColor: "border-yellow-500/50",
      bgColor: "bg-yellow-500/10",
      members: [
        {
          name: "Fundador",
          role: "CEO & Fundador",
          avatar: "👑",
          description: "Fundador y líder del proyecto Oasis RP.",
          discord: "fundador"
        }
      ]
    },
    {
      title: "Administración",
      icon: Shield,
      color: "from-red-500 to-rose-600",
      borderColor: "border-red-500/50",
      bgColor: "bg-red-500/10",
      members: [
        {
          name: "Admin 1",
          role: "Administrador General",
          avatar: "🛡️",
          description: "Gestión general del servidor y comunidad.",
          discord: "admin1"
        },
        {
          name: "Admin 2",
          role: "Administrador",
          avatar: "🛡️",
          description: "Supervisión de moderación y eventos.",
          discord: "admin2"
        }
      ]
    },
    {
      title: "Moderación",
      icon: Users,
      color: "from-blue-500 to-cyan-600",
      borderColor: "border-blue-500/50",
      bgColor: "bg-blue-500/10",
      members: [
        {
          name: "Mod 1",
          role: "Moderador Senior",
          avatar: "⚔️",
          description: "Moderación y soporte a la comunidad.",
          discord: "mod1"
        },
        {
          name: "Mod 2",
          role: "Moderador",
          avatar: "⚔️",
          description: "Control de normativas y asistencia.",
          discord: "mod2"
        },
        {
          name: "Mod 3",
          role: "Moderador",
          avatar: "⚔️",
          description: "Gestión de tickets y reportes.",
          discord: "mod3"
        }
      ]
    },
    {
      title: "Soporte",
      icon: Headphones,
      color: "from-green-500 to-emerald-600",
      borderColor: "border-green-500/50",
      bgColor: "bg-green-500/10",
      members: [
        {
          name: "Soporte 1",
          role: "Soporte Técnico",
          avatar: "🎧",
          description: "Asistencia técnica y resolución de problemas.",
          discord: "soporte1"
        },
        {
          name: "Soporte 2",
          role: "Soporte",
          avatar: "🎧",
          description: "Atención al usuario y guía de nuevos jugadores.",
          discord: "soporte2"
        }
      ]
    },
    {
      title: "Desarrollo",
      icon: Code,
      color: "from-purple-500 to-violet-600",
      borderColor: "border-purple-500/50",
      bgColor: "bg-purple-500/10",
      members: [
        {
          name: "Dev 1",
          role: "Desarrollador Principal",
          avatar: "💻",
          description: "Desarrollo de scripts y sistemas del servidor.",
          discord: "dev1"
        },
        {
          name: "Dev 2",
          role: "Desarrollador",
          avatar: "💻",
          description: "Programación y mantenimiento técnico.",
          discord: "dev2"
        }
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-background overflow-x-hidden relative">
      <Navbar />
      
      {/* Header */}
      <div className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-40 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
        </div>
        
        <div className="container relative z-10 px-4">
          <div className="mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
              Volver al Inicio
            </Link>
          </div>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="relative">
                <Star className="w-10 h-10 text-primary animate-pulse" />
                <div className="absolute inset-0 w-10 h-10 bg-primary/30 rounded-full blur-xl animate-ping" />
              </div>
              <h1 className="font-heading text-5xl md:text-6xl">
                <span className="text-gradient">Nuestro</span> Staff
              </h1>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Conoce al equipo que hace posible Oasis RP. Profesionales dedicados a brindarte la mejor experiencia de roleplay.
            </p>
          </div>
        </div>
      </div>

      {/* Staff Categories */}
      <div className="container relative z-10 px-4 pb-20">
        <div className="max-w-6xl mx-auto space-y-16">
          {staffCategories.map((category, catIdx) => {
            const CategoryIcon = category.icon;
            return (
              <div 
                key={category.title}
                className="animate-fade-in-up"
                style={{ animationDelay: `${catIdx * 0.1}s` }}
              >
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg`}>
                    <CategoryIcon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="font-heading text-3xl text-foreground">{category.title}</h2>
                    <p className="text-muted-foreground">{category.members.length} miembro{category.members.length > 1 ? 's' : ''}</p>
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent ml-4" />
                </div>

                {/* Members Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.members.map((member, memberIdx) => (
                    <div
                      key={member.name}
                      className={`group glass-dark rounded-[24px] border ${category.borderColor} p-6 hover:scale-[1.02] transition-all duration-300 hover:shadow-xl hover:shadow-primary/10`}
                      style={{ animationDelay: `${(catIdx * 0.1) + (memberIdx * 0.05)}s` }}
                    >
                      {/* Avatar */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`relative w-16 h-16 rounded-xl ${category.bgColor} flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300`}>
                          {member.avatar}
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-heading text-xl text-foreground truncate">{member.name}</h3>
                          <p className={`text-sm font-medium bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                            {member.role}
                          </p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {member.description}
                      </p>

                      {/* Discord Tag */}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground/70">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                        </svg>
                        <span>@{member.discord}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Join Team CTA */}
      <div className="container relative z-10 px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="glass-dark rounded-[32px] border border-primary/30 p-12 text-center relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/20 mb-6">
                <Users className="w-10 h-10 text-primary" />
              </div>
              <h2 className="font-heading text-4xl mb-4">
                <span className="text-gradient">¿Quieres unirte</span> al equipo?
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
                Estamos siempre buscando personas apasionadas que quieran formar parte de Oasis RP. Si crees que puedes aportar al equipo, ¡postúlate!
              </p>
              <a 
                href="https://discord.oasisrp.es" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-gta inline-flex items-center gap-2 px-8 py-4 text-lg"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                <span>Postúlate en Discord</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Staff;
