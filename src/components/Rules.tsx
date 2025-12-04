import { useState } from "react";
import { CheckCircle2, XCircle, ChevronDown, ShieldCheck, ShieldAlert } from "lucide-react";

const rules = [
  {
    title: "Respeto a la comunidad",
    description: "Trata a todos los jugadores y staff con respeto. El acoso, discriminacion o comportamiento toxico no sera tolerado.",
    status: "success",
  },
  {
    title: "No Metagaming",
    description: "No uses informacion obtenida fuera de rol para beneficio dentro del juego.",
    status: "danger",
  },
  {
    title: "No Powergaming",
    description: "Evita acciones irreales o imposibles que rompan la inmersion del rol.",
    status: "danger",
  },
  {
    title: "Roleplay realista",
    description: "Mantener coherencia con el entorno y las reglas del servidor es obligatorio.",
    status: "success",
  },
  {
    title: "Sin hacks ni exploits",
    description: "El uso de software externo o abuso de bugs implica sanciones inmediatas.",
    status: "danger",
  },
  {
    title: "Valora la vida",
    description: "Tu vida y la de los demas personajes importan. Actua en consecuencia a cada situacion.",
    status: "success",
  },
];

const stats = [
  { label: "Reglas basicas", value: "6", color: "text-gta-green" },
  { label: "Staff activo", value: "24/7", color: "text-primary" },
  { label: "Tolerancia", value: "0", color: "text-gta-blue" },
];

const Rules = () => {
  const [openRule, setOpenRule] = useState(rules[0].title);

  return (
    <section id="rules" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-24 top-10 w-[520px] h-[520px] bg-gradient-radial from-primary/10 via-transparent to-transparent blur-3xl" />
        <div className="absolute right-0 bottom-0 w-[560px] h-[560px] bg-gradient-radial from-gta-blue/15 via-transparent to-transparent blur-4xl" />
      </div>

      <div className="container relative z-10 px-4">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-center">
          {/* Visual panel */}
          <div className="space-y-6">
            <div className="glass-dark relative overflow-hidden rounded-[32px] border border-border/20 p-8 min-h-[360px] flex flex-col justify-between">
              <div className="absolute inset-0">
                <div className="absolute -left-10 -top-10 w-64 h-64 bg-gradient-radial from-success/25 via-transparent to-transparent blur-3xl" />
                <div className="absolute right-0 top-1/3 w-48 h-48 bg-gradient-radial from-warning/20 via-transparent to-transparent blur-3xl" />
                <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-gradient-radial from-primary/20 via-transparent to-transparent blur-3xl" />
              </div>

              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Normativa</p>
                  <h3 className="text-4xl md:text-5xl font-heading text-foreground leading-tight">
                    Seguridad y <span className="text-gradient">orden</span>
                  </h3>
                  <p className="text-muted-foreground max-w-md mt-3">
                    Lineamientos claros para mantener el rol limpio, justo y divertido para todos.
                  </p>
                </div>
                <div className="w-16 h-16 rounded-full bg-success/15 border border-success/30 flex items-center justify-center">
                  <ShieldCheck className="w-8 h-8 text-success" />
                </div>
              </div>

              <div className="relative z-10 flex items-center gap-4">
                <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-background/40 border border-border/20">
                  <ShieldAlert className="w-7 h-7 text-warning" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-wider text-muted-foreground">Aplicacion inmediata</p>
                  <p className="text-lg text-foreground">Sanciones directas ante comportamientos toxicos o ilegales.</p>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {stats.map((item) => (
                <div key={item.label} className="card-gta">
                  <div className="skew-x-[3deg]">
                    <p className={`text-3xl font-heading ${item.color}`}>{item.value}</p>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rules list */}
          <div>
            <span className="status-badge mb-4 inline-flex">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span>Normas principales</span>
            </span>
            <h2 className="font-heading text-5xl md:text-6xl leading-tight mb-3">
              <span className="text-gradient">Reglas</span> del servidor
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              Para mantener la experiencia estable y justa, sigue las normas y respeta los limites de rol establecidos.
            </p>

            <div className="space-y-3">
              {rules.map((rule) => {
                const isOpen = openRule === rule.title;
                const isSuccess = rule.status === "success";

                return (
                  <button
                    key={rule.title}
                    type="button"
                    onClick={() => setOpenRule(isOpen ? "" : rule.title)}
                    className={`w-full text-left glass-dark rounded-2xl border transition-all duration-300 ${
                      isOpen
                        ? isSuccess
                          ? "border-success/60 shadow-glow"
                          : "border-destructive/60 shadow-glow"
                        : "border-border/20 hover:border-primary/50"
                    }`}
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center justify-between px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            isSuccess ? "bg-success/15 border border-success/40 text-success" : "bg-destructive/15 border border-destructive/40 text-destructive"
                          }`}
                        >
                          {isSuccess ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-lg font-heading text-foreground">{rule.title}</p>
                          <div
                            className={`grid transition-all duration-300 ease-out ${
                              isOpen ? "grid-rows-[1fr] opacity-100 mt-1" : "grid-rows-[0fr] opacity-0"
                            } overflow-hidden`}
                          >
                            <div className="text-sm text-muted-foreground leading-relaxed">
                              {rule.description}
                            </div>
                          </div>
                        </div>
                      </div>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : "text-muted-foreground"}`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rules;
