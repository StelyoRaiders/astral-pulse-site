import { Shield, Lock, Eye, Users, Database, AlertCircle, Mail, FileText, Server, Cookie, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

const PrivacyPolicy = () => {
  const sections = [
    {
      id: "intro",
      title: "Información que Recopilamos",
      icon: Database,
      content: [
        "Información personal que nos proporcionas voluntariamente al registrarte en nuestra tienda o servicios, como nombre, apellidos, domicilio, código postal, provincia, correo electrónico y datos de contacto.",
        "Información de pago y facturación necesaria para procesar tus compras (la información de tarjetas de crédito está siempre encriptada durante la transferencia).",
        "Datos de uso y navegación del sitio web para mejorar nuestros servicios."
      ]
    },
    {
      id: "data-usage",
      title: "Uso de tu Información",
      icon: Eye,
      content: [
        "Procesar y gestionar tus pedidos y transacciones en nuestra tienda.",
        "Comunicarnos contigo sobre el estado de tus pedidos, cambios en el servicio o cancelaciones.",
        "Enviarte información sobre productos, promociones y actualizaciones (solo si has dado tu consentimiento).",
        "Cumplir con obligaciones legales y reglamentarias aplicables.",
        "Atender tus peticiones como cliente, siendo la base legal para ello el contrato."
      ]
    },
    {
      id: "data-protection",
      title: "Protección de Datos",
      icon: Lock,
      content: [
        "La información de tarjetas de crédito está siempre encriptada durante la transferencia a través de las redes.",
        "Implementamos medidas de seguridad técnicas y organizativas para proteger tus datos contra acceso no autorizado.",
        "Tu contenido (sin incluir información de tarjeta de crédito) puede ser transferido a través de varias redes y adaptarse a los requisitos técnicos de conexión."
      ]
    },
    {
      id: "data-sharing",
      title: "Compartir Información",
      icon: Users,
      content: [
        "No vendemos, comerciamos ni transferimos tu información personal a terceros sin tu consentimiento.",
        "Podemos compartir información con proveedores de servicios que nos ayudan a operar nuestro sitio web y procesar pagos.",
        "Podemos divulgar información cuando sea requerido por ley o para proteger nuestros derechos."
      ]
    },
    {
      id: "third-party",
      title: "Enlaces de Terceros",
      icon: Server,
      content: [
        "Nuestro sitio puede incluir enlaces a sitios web de terceras partes que no están afiliadas con nosotros.",
        "No nos responsabilizamos de examinar o evaluar el contenido o exactitud de estos sitios de terceros.",
        "Te recomendamos revisar las políticas de privacidad de cualquier sitio que visites."
      ]
    },
    {
      id: "cookies",
      title: "Cookies y Tecnologías",
      icon: Cookie,
      content: [
        "Utilizamos cookies y tecnologías similares para mejorar tu experiencia de navegación.",
        "Las cookies nos ayudan a recordar tus preferencias y optimizar el funcionamiento del sitio.",
        "Puedes configurar tu navegador para rechazar cookies, aunque esto puede afectar algunas funcionalidades."
      ]
    }
  ];

  const rights = [
    {
      title: "Derecho de Acceso",
      description: "Puedes solicitar información sobre los datos personales que tenemos sobre ti."
    },
    {
      title: "Derecho de Rectificación",
      description: "Puedes solicitar la corrección de datos personales inexactos o incompletos."
    },
    {
      title: "Derecho de Supresión",
      description: "Puedes solicitar la eliminación de tus datos personales cuando ya no sean necesarios."
    },
    {
      title: "Derecho de Portabilidad",
      description: "Puedes solicitar recibir tus datos en un formato estructurado y de uso común."
    },
    {
      title: "Derecho de Oposición",
      description: "Puedes oponerte al tratamiento de tus datos en determinadas circunstancias."
    },
    {
      title: "Derecho de Limitación",
      description: "Puedes solicitar la limitación del tratamiento de tus datos en ciertos casos."
    }
  ];

  return (
    <main className="min-h-screen bg-background overflow-x-hidden relative">
      <Navbar />
      {/* Header */}
      <div className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        
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
              <Shield className="w-10 h-10 text-primary" />
              <h1 className="font-heading text-5xl md:text-6xl">
                <span className="text-gradient">Política de</span> Privacidad
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">
              Última actualización: 21 de agosto de 2025
            </p>
          </div>
        </div>
      </div>

      {/* Intro */}
      <div className="container relative z-10 px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="glass-dark rounded-[24px] border border-border/20 p-8 mb-12">
            <h2 className="font-heading text-2xl mb-4 text-primary">Compromiso con tu Privacidad</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              En Oasis RP, valoramos tu privacidad y nos comprometemos a proteger tus datos personales. Esta política de privacidad explica cómo recopilamos, usamos, protegemos y compartimos tu información cuando utilizas nuestro sitio web y servicios.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Al utilizar nuestros servicios, aceptas las prácticas descritas en esta política. Te recomendamos leer este documento detenidamente para comprender cómo tratamos tu información.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Esta política se aplica a toda la información recopilada a través de nuestro sitio web, tienda online y cualquier servicio relacionado ofrecido por Oasis RP.
            </p>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="container relative z-10 px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <div
                  key={section.id}
                  className="glass-dark rounded-[24px] border border-border/20 p-8 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-heading text-xl text-foreground pt-2">
                      {section.title}
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {section.content.map((paragraph, idx) => (
                      <p key={idx} className="text-muted-foreground leading-relaxed text-sm">
                        • {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Rights Section */}
      <div className="container relative z-10 px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="glass-dark rounded-[24px] border border-primary/30 p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-lg bg-primary/20 flex items-center justify-center">
                <FileText className="w-7 h-7 text-primary" />
              </div>
              <h2 className="font-heading text-3xl">
                <span className="text-gradient">Tus</span> Derechos
              </h2>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-8">
              De acuerdo con la normativa de protección de datos, tienes los siguientes derechos sobre tu información personal. Puedes ejercer estos derechos en cualquier momento contactándonos a través de los medios indicados.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {rights.map((right, idx) => (
                <div key={idx} className="p-4 bg-card/50 rounded-lg border border-border/20">
                  <h4 className="font-heading text-foreground mb-2">{right.title}</h4>
                  <p className="text-muted-foreground text-sm">{right.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Data Retention & Changes */}
      <div className="container relative z-10 px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-dark rounded-[24px] border border-border/20 p-8">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-primary" />
                <h3 className="font-heading text-xl text-foreground">Retención de Datos</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Conservamos tus datos personales mientras tu cuenta esté activa o según sea necesario para proporcionarte nuestros servicios. También retenemos información para cumplir con obligaciones legales, resolver disputas y hacer cumplir nuestros acuerdos.
              </p>
            </div>

            <div className="glass-dark rounded-[24px] border border-border/20 p-8">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-6 h-6 text-primary" />
                <h3 className="font-heading text-xl text-foreground">Cambios en la Política</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Nos reservamos el derecho de modificar esta política de privacidad en cualquier momento. Los cambios serán efectivos inmediatamente después de su publicación en el sitio web. Te recomendamos revisar esta página periódicamente.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="container relative z-10 px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="glass-dark rounded-[24px] border border-primary/30 p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-lg bg-primary/20 flex items-center justify-center">
                <Mail className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h2 className="font-heading text-2xl text-foreground">Contacto</h2>
                <p className="text-muted-foreground">¿Tienes preguntas sobre tu privacidad?</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6">
              Si tienes preguntas sobre esta política de privacidad, deseas ejercer tus derechos o tienes cualquier inquietud relacionada con el tratamiento de tus datos personales, puedes contactarnos a través de:
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Correo electrónico</p>
                <p className="text-primary font-heading">ventas@oasisrp.es</p>
              </div>
              <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Discord</p>
                <p className="text-primary font-heading">discord.oasisrp.es</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
