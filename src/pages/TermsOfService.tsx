import { FileText, Store, Info, DollarSign, Package, CreditCard, Link2, MessageSquare, Shield, AlertTriangle, Ban, Scale, Users, FileCheck, Gavel, RefreshCw, Mail, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

const TermsOfService = () => {
  const sections = [
    {
      id: "section-1",
      title: "Sección 1 – Términos de la Tienda",
      icon: Store,
      content: [
        "Al utilizar este sitio, declaras que tienes al menos la mayoría de edad en tu estado o provincia de residencia, o que tienes la mayoría de edad en tu estado o provincia de residencia y que nos has dado tu consentimiento para permitir que cualquiera de tus dependientes menores use este sitio.",
        "No puedes usar nuestros productos con ningún propósito ilegal o no autorizado tampoco puedes, en el uso del Servicio, violar cualquier ley en tu jurisdicción (incluyendo pero no limitado a las leyes de derecho de autor).",
        "No debes transmitir gusanos, virus o cualquier código de naturaleza destructiva.",
        "El incumplimiento o violación de cualquiera de estos Términos darán lugar al cese inmediato de tus Servicios."
      ]
    },
    {
      id: "section-2",
      title: "Sección 2 – Condiciones Generales",
      icon: FileText,
      content: [
        "Nos reservamos el derecho de rechazar la prestación de servicio a cualquier persona, por cualquier motivo y en cualquier momento.",
        "Entiendes que tu contenido (sin incluir la información de tu tarjeta de crédito), puede ser transferida sin encriptar e involucrar transmisiones a través de varias redes y cambios para ajustarse o adaptarse a los requisitos técnicos de conexión de redes o dispositivos. La información de tarjetas de crédito está siempre encriptada durante la transferencia a través de las redes.",
        "Estás de acuerdo con no reproducir, duplicar, copiar, vender, revender o explotar cualquier parte del Servicio, uso del Servicio, o acceso al Servicio sin el expreso permiso por escrito de nuestra parte."
      ]
    },
    {
      id: "section-3",
      title: "Sección 3 – Exactitud de la Información",
      icon: Info,
      content: [
        "No nos hacemos responsables si la información disponible en este sitio no es exacta, completa o actual. El material en este sitio es provisto solo para información general y no debe confiarse en ella o utilizarse como la única base para la toma de decisiones.",
        "Este sitio puede contener cierta información histórica. La información histórica no es necesariamente actual y es provista únicamente para tu referencia.",
        "Nos reservamos el derecho de modificar los contenidos de este sitio en cualquier momento, pero no tenemos obligación de actualizar cualquier información en nuestro sitio."
      ]
    },
    {
      id: "section-4",
      title: "Sección 4 – Modificaciones al Servicio y Precios",
      icon: DollarSign,
      content: [
        "Los precios de nuestros productos están sujetos a cambio sin aviso.",
        "Nos reservamos el derecho de modificar o discontinuar el Servicio (o cualquier parte del contenido) en cualquier momento sin aviso previo.",
        "No seremos responsables ante ti o alguna tercera parte por cualquier modificación, cambio de precio, suspensión o discontinuidad del Servicio."
      ]
    },
    {
      id: "section-5",
      title: "Sección 5 – Productos o Servicios",
      icon: Package,
      content: [
        "Ciertos productos o servicios pueden estar disponibles exclusivamente en línea a través del sitio web. Estos productos o servicios pueden tener cantidades limitadas y estar sujetas a devolución o cambio de acuerdo a nuestra política de devolución solamente.",
        "Todos los productos son sujetos a disponibilidad. Las imágenes de los banners son ilustrativas.",
        "Todas las promociones no son acumulables con otras promociones. Aplican hasta agotar existencias y están restringidas a una por persona.",
        "El uso de cupones es personal, solo un cupón por usuario. Cupón por orden.",
        "Oasis RP se compromete a proporcionar los mejores productos que cumplan con nuestros estándares, así como cumplir con la más alta seguridad y los requisitos reglamentarios aplicables."
      ]
    },
    {
      id: "section-6",
      title: "Sección 6 – Facturación e Información de Cuenta",
      icon: CreditCard,
      content: [
        "Nos reservamos el derecho de rechazar cualquier pedido que realice con nosotros. Podemos, a nuestra discreción, limitar o cancelar las cantidades compradas por persona, por hogar o por pedido.",
        "Precios pueden variar sin previo aviso debido a factores externos: devaluaciones monetarias, alteraciones drásticas en el tipo de cambio, entre otras.",
        "Te comprometes a proporcionar información actual, completa y precisa de la compra y cuenta utilizada para todas las compras realizadas en nuestra tienda."
      ]
    },
    {
      id: "section-7",
      title: "Sección 7 – Herramientas Opcionales",
      icon: Link2,
      content: [
        "Es posible que te proporcionamos acceso a herramientas de terceros a los cuales no monitoreamos y sobre los que no tenemos control ni entrada.",
        "Reconoces y aceptas que proporcionamos acceso a este tipo de herramientas «tal cual» y «según disponibilidad» sin garantías, representaciones o condiciones de ningún tipo y sin ningún respaldo.",
        "Cualquier uso que hagas de las herramientas opcionales que se ofrecen a través del sitio bajo tu propio riesgo y discreción."
      ]
    },
    {
      id: "section-8",
      title: "Sección 8 – Enlaces de Terceras Partes",
      icon: Link2,
      content: [
        "Cierto contenido, productos y servicios disponibles vía nuestro Servicio puede incluir material de terceras partes.",
        "Enlaces de terceras partes en este sitio pueden redireccionarse a sitios web de terceras partes que no están afiliadas con nosotros.",
        "No nos hacemos responsables de cualquier daño o daños relacionados con la adquisición o utilización de bienes, servicios, recursos, contenidos, o cualquier otra transacción realizada en conexión con sitios web de terceros."
      ]
    },
    {
      id: "section-9",
      title: "Sección 9 – Comentarios de Usuarios",
      icon: MessageSquare,
      content: [
        "Si envías ideas creativas, sugerencias, proposiciones, planes, u otros materiales, aceptas que podamos, en cualquier momento, sin restricción, editar, copiar, publicar, distribuir, traducir o utilizar por cualquier medio comentarios que nos hayas enviado.",
        "No tenemos obligación de mantener ningún comentario confidencialmente, pagar compensación por comentarios, o responder a comentarios.",
        "Aceptas que tus comentarios no violarán los derechos de terceras partes, incluyendo derechos de autor, marca, privacidad, personalidad u otro derecho personal o de propiedad."
      ]
    },
    {
      id: "section-10",
      title: "Sección 10 – Información Personal",
      icon: Shield,
      content: [
        "Tu presentación de información personal a través del sitio se rige por nuestra Política de Privacidad.",
        "Para más información, consulta nuestro Aviso de Privacidad disponible en este sitio web."
      ]
    },
    {
      id: "section-11",
      title: "Sección 11 – Errores, Inexactitudes y Omisiones",
      icon: AlertTriangle,
      content: [
        "De vez en cuando puede haber información en nuestro sitio o en el Servicio que contiene errores tipográficos, inexactitudes u omisiones que puedan estar relacionadas con las descripciones de productos, precios, promociones, ofertas, gastos de envío del producto, el tiempo de tránsito y la disponibilidad.",
        "Nos reservamos el derecho de corregir los errores, inexactitudes u omisiones y de cambiar o actualizar la información o cancelar pedidos si alguna información en el Servicio es inexacta en cualquier momento sin previo aviso."
      ]
    },
    {
      id: "section-12",
      title: "Sección 12 – Usos Prohibidos",
      icon: Ban,
      content: [
        "Se prohíbe el uso del sitio para: propósitos ilegales, pedirle a otros que realicen actos ilícitos, violar regulaciones o leyes, infringir derechos de propiedad intelectual.",
        "No puedes: acosar, abusar, insultar, dañar, difamar, discriminar por razones de género, orientación sexual, religión, etnia, raza, edad, nacionalidad o discapacidad.",
        "Está prohibido: cargar virus o código malicioso, recopilar información personal de otros, generar spam, phishing, o interferir con los elementos de seguridad del Servicio."
      ]
    },
    {
      id: "section-13",
      title: "Sección 13 – Limitación de Responsabilidad",
      icon: Scale,
      content: [
        "No garantizamos que el uso de nuestro servicio será ininterrumpido, puntual, seguro o libre de errores.",
        "El servicio y todos los productos son proporcionados «tal cual» y «según esté disponible» para su uso, sin ningún tipo de garantías o condiciones.",
        "En ningún caso Oasis RP, nuestros directores, funcionarios, empleados, afiliados, agentes, contratistas, proveedores o licenciantes serán responsables por cualquier daño, pérdida o reclamo."
      ]
    },
    {
      id: "section-14",
      title: "Sección 14 – Indemnización",
      icon: Users,
      content: [
        "Aceptas indemnizar, defender y mantener indemne a Oasis RP y nuestras matrices, subsidiarias, afiliados, socios, funcionarios, directores, agentes, contratistas, proveedores y empleados.",
        "Esto incluye cualquier reclamo o demanda, incluyendo honorarios razonables de abogados, hechos por cualquier tercero a causa de tu incumplimiento de las Condiciones de Servicio."
      ]
    },
    {
      id: "section-15",
      title: "Sección 15 – Divisibilidad",
      icon: FileCheck,
      content: [
        "En el caso de que se determine que cualquier disposición de estas Condiciones de Servicio sea ilegal, nula o inejecutable, dicha disposición será efectiva a obtener la máxima medida permitida por la ley aplicable.",
        "La parte no exigible se considerará separada de estos Términos de Servicio, y dicha determinación no afectará la validez de las demás disposiciones restantes."
      ]
    },
    {
      id: "section-16",
      title: "Sección 16 – Rescisión",
      icon: Gavel,
      content: [
        "Las obligaciones y responsabilidades de las partes que hayan incurrido con anterioridad a la fecha de terminación sobrevivirán a la terminación de este acuerdo.",
        "Puedes terminar estos Términos de Servicio en cualquier momento por avisarnos que ya no deseas utilizar nuestros servicios.",
        "Si fallas en el cumplimiento de cualquier término, podemos terminar este acuerdo en cualquier momento sin previo aviso y seguirás siendo responsable de todos los montos adeudados."
      ]
    }
  ];

  const refundPolicy = {
    plazo: "El cliente puede cancelar pedidos dentro de los 14 días para obtener un reembolso completo, en caso de no haber utilizado los beneficios. En el momento que uses cualquier beneficio (Coches, organizaciones, negocios, VIP, etc) perderás la opción de obtener reembolso. Más allá de 14 días, no se aceptarán cancelaciones y/o devoluciones.",
    condiciones: [
      "El importe total del producto será reembolsado únicamente y exclusivamente cuando el vendedor (Oasis RP) no haya entregado este en un plazo de 7 días hábiles al pago.",
      "Para ser elegible para una devolución, el producto no debe haber sido utilizado."
    ],
    procedimiento: [
      "Devolución del dinero: Solo aplica para casos de garantía y ley de retracto, única y exclusivamente en caso de no entrega del producto total al cliente en un plazo de 7 días hábiles.",
      "Cupón para realizar una nueva compra: Este cupón tiene validez por seis meses a partir de la fecha de creación."
    ],
    plazoRespuesta: "Dependiendo del medio de pago que hayas utilizado para tu compra, el reembolso se hará a través de una transferencia electrónica o a tu tarjeta de crédito. Los cambios se despacharán aproximadamente en 3 días hábiles después de confirmar la devolución en un ticket de soporte.",
    costoEnvio: "Cualquier devolución será a coste 0, y se devolverá el importe completo."
  };

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
              <Gavel className="w-10 h-10 text-primary" />
              <h1 className="font-heading text-5xl md:text-6xl">
                <span className="text-gradient">Términos de</span> Servicio
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
            <h2 className="font-heading text-2xl mb-4 text-primary">Información General</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Este sitio web es operado por Oasis RP. En todo el sitio, los términos "nosotros", "nos" y "nuestro" se refieren a Oasis RP. Este sitio web, incluyendo toda la información, herramientas y servicios disponibles para ti, el usuario, está condicionado a la aceptación de todos los términos, condiciones, políticas y notificaciones aquí establecidos.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Al visitar nuestro sitio y/o comprar algo de nosotros, participas en nuestro "Servicio" y aceptas los siguientes términos y condiciones, incluidos todos los términos y condiciones adicionales y las políticas a las que se hace referencia en el presente documento.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Por favor, lee estos Términos de Servicio cuidadosamente antes de acceder o utilizar nuestro sitio web. Al acceder o utilizar cualquier parte del sitio, estás aceptando los Términos de Servicio. Si no estás de acuerdo con todos los términos y condiciones de este acuerdo, entonces no deberías acceder a la página web o usar cualquiera de los servicios.
            </p>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="container relative z-10 px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
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
                  <div className="space-y-3 pl-16">
                    {section.content.map((paragraph, idx) => (
                      <p key={idx} className="text-muted-foreground leading-relaxed">
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

      {/* Refund Policy */}
      <div className="container relative z-10 px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="glass-dark rounded-[24px] border border-primary/30 p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-lg bg-primary/20 flex items-center justify-center">
                <RefreshCw className="w-7 h-7 text-primary" />
              </div>
              <h2 className="font-heading text-3xl">
                <span className="text-gradient">Sección 18</span> – Política de Devoluciones
              </h2>
            </div>

            <div className="space-y-8">
              <div>
                <h4 className="font-heading text-lg text-foreground mb-3">Plazo</h4>
                <p className="text-muted-foreground leading-relaxed">{refundPolicy.plazo}</p>
              </div>

              <div>
                <h4 className="font-heading text-lg text-foreground mb-3">Condiciones</h4>
                <ul className="space-y-2">
                  {refundPolicy.condiciones.map((item, idx) => (
                    <li key={idx} className="text-muted-foreground leading-relaxed flex gap-2">
                      <span className="text-primary">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-heading text-lg text-foreground mb-3">Procedimiento</h4>
                <ul className="space-y-2">
                  {refundPolicy.procedimiento.map((item, idx) => (
                    <li key={idx} className="text-muted-foreground leading-relaxed flex gap-2">
                      <span className="text-primary">{idx + 1}.</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-heading text-lg text-foreground mb-3">Plazo de Respuesta</h4>
                <p className="text-muted-foreground leading-relaxed">{refundPolicy.plazoRespuesta}</p>
              </div>

              <div>
                <h4 className="font-heading text-lg text-foreground mb-3">Costos de Envío</h4>
                <p className="text-muted-foreground leading-relaxed">{refundPolicy.costoEnvio}</p>
              </div>

              <div className="p-6 bg-primary/10 border border-primary/30 rounded-lg mt-8">
                <h4 className="font-heading text-lg text-foreground mb-3 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary" />
                  Solicitar Devolución
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  Para solicitar una devolución, envía un correo a <span className="text-primary font-heading">ventas@oasisrp.es</span> con tus datos personales (nombre, apellidos, domicilio, correo electrónico) y el detalle del producto/servicio.
                </p>
              </div>
            </div>
          </div>

          {/* Contact & Final Sections */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="glass-dark rounded-[24px] border border-border/20 p-8">
              <h3 className="font-heading text-xl mb-4 text-foreground">Sección 19 – Ley Aplicable</h3>
              <p className="text-muted-foreground leading-relaxed">
                Para la interpretación y cumplimiento de los presentes términos y condiciones, las partes se someten a la jurisdicción de los tribunales correspondientes.
              </p>
            </div>

            <div className="glass-dark rounded-[24px] border border-border/20 p-8">
              <h3 className="font-heading text-xl mb-4 text-foreground">Sección 21 – Contacto</h3>
              <p className="text-muted-foreground leading-relaxed">
                Preguntas acerca de los Términos de Servicio deben ser enviadas a <span className="text-primary font-heading">ventas@oasisrp.es</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TermsOfService;
