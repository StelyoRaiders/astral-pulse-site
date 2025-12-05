import { useEffect, useState, useMemo } from "react";
import { Users, RefreshCw, Wifi, WifiOff, Server } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "@/hooks/use-toast";
import { fetchServerStatus } from "@/api/server-status";

interface ServerData {
  players: number;
  maxPlayers: number;
  isOnline: boolean;
  hostname?: string | null;
}

const FIVEM_JOIN_CODE = import.meta.env.VITE_FIVEM_JOIN_CODE as string | undefined;

const ServerStatus = () => {
  const serverIp = "play.oasisrp.es:30120";
  const [serverData, setServerData] = useState<ServerData>({
    players: 0,
    maxPlayers: 256,
    isOnline: false,
    hostname: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [copied, setCopied] = useState(false);

  const playerPercentage = useMemo(() => {
    if (!serverData.maxPlayers) return 0;
    return Math.min((serverData.players / serverData.maxPlayers) * 100, 100);
  }, [serverData.players, serverData.maxPlayers]);

  const loadStatus = async (showToast = false) => {
    if (!FIVEM_JOIN_CODE) {
      console.warn("VITE_FIVEM_JOIN_CODE no configurado");
      setIsLoading(false);
      setIsRefreshing(false);
      return;
    }

    setIsRefreshing(true);

    try {
      const result = await fetchServerStatus(FIVEM_JOIN_CODE);

      setServerData({
        players: result.players,
        maxPlayers: result.maxPlayers,
        isOnline: result.online,
        hostname: result.hostname,
      });

      if (showToast && result.online) {
        toast({
          title: "Estado actualizado",
          description: `${result.players}/${result.maxPlayers} jugadores en línea`,
        });
      }
    } catch (error) {
      console.error("Error al obtener estado del servidor:", error);
      setServerData((prev) => ({
        ...prev,
        isOnline: false,
        players: 0,
      }));

      if (showToast) {
        toast({
          title: "Error",
          description: "No se pudo conectar con el servidor",
          variant: "destructive",
        });
      }
    }

    setIsLoading(false);
    setIsRefreshing(false);
  };

  useEffect(() => {
    loadStatus();
    const interval = setInterval(() => {
      loadStatus();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    loadStatus(true);
  };

  const handleCopyIp = async () => {
    try {
      await navigator.clipboard.writeText(serverIp);
      setCopied(true);
      toast({
        title: "IP copiada",
        description: `${serverIp} guardada en tu portapapeles`,
      });
      setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      setCopied(false);
      toast({
        title: "No se pudo copiar",
        description: "Intenta nuevamente o copia manualmente.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="status" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-section-gradient opacity-50" />
      </div>

      <div className="container relative z-10 px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Dynamic Cards */}
          <div className="space-y-6">
            {/* Main Status Card */}
            <div 
              className="relative animate-fade-in-up opacity-0"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="glass-dark p-8 rounded-r-[60px] border-l-4 border-primary">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${serverData.isOnline ? 'bg-success/20' : 'bg-destructive/20'}`}>
                      {isLoading ? (
                        <RefreshCw className="w-8 h-8 text-primary animate-spin" />
                      ) : serverData.isOnline ? (
                        <Wifi className="w-8 h-8 text-success animate-pulse" />
                      ) : (
                        <WifiOff className="w-8 h-8 text-destructive" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground uppercase tracking-wider">Estado del Servidor</p>
                      <p className={`text-3xl font-heading ${serverData.isOnline ? 'text-success' : 'text-destructive'}`}>
                        {isLoading ? "Consultando..." : serverData.isOnline ? "ONLINE" : "OFFLINE"}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={handleRefresh}
                    variant="ghost"
                    size="icon"
                    className="hover:bg-primary/20"
                    disabled={isRefreshing}
                    aria-label="Actualizar estado del servidor"
                  >
                    <RefreshCw className={`w-5 h-5 ${isRefreshing ? "animate-spin" : ""}`} aria-hidden="true" />
                  </Button>
                </div>

                {/* Player Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Jugadores Conectados</span>
                    <span className="font-heading text-primary">
                      {isLoading ? "..." : `${serverData.players}/${serverData.maxPlayers || "?"}`}
                    </span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-primary rounded-full transition-all duration-500 shadow-glow ${isLoading ? "animate-pulse" : ""}`}
                      style={{ width: `${playerPercentage}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Cards - Staggered */}
            <div className="grid grid-cols-2 gap-4">
              <div 
                className="glass-dark p-6 rounded-r-[40px] border-l-4 border-secondary animate-fade-in-up opacity-0"
                style={{ animationDelay: "0.2s" }}
              >
                <Users className="w-8 h-8 text-secondary mb-3" />
                <p className="text-sm text-muted-foreground uppercase tracking-wider">Capacidad</p>
                <p className="text-2xl font-heading text-secondary">
                  {isLoading ? "..." : `${serverData.maxPlayers}`}
                </p>
              </div>
              
              <div 
                className="glass-dark p-6 rounded-r-[40px] border-l-4 border-gta-green animate-fade-in-up opacity-0 mt-8"
                style={{ animationDelay: "0.3s" }}
              >
                <Server className="w-8 h-8 text-gta-green mb-3" />
                <p className="text-sm text-muted-foreground uppercase tracking-wider">Estado</p>
                <p className="text-2xl font-heading text-gta-green">
                  {isLoading ? "..." : serverData.isOnline ? "✓ Activo" : "✗ Inactivo"}
                </p>
              </div>
            </div>

            {/* Hostname Card */}
            {serverData.hostname && (
              <div 
                className="glass-dark p-6 rounded-r-[50px] border-l-4 border-gta-blue animate-fade-in-up opacity-0"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="flex items-center gap-4">
                  <Users className="w-8 h-8 text-gta-blue" />
                  <div>
                    <p className="text-sm text-muted-foreground uppercase tracking-wider">Servidor</p>
                    <p className="text-lg font-heading text-gta-blue truncate">
                      {serverData.hostname}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Side - Content */}
          <div className="animate-fade-in-up opacity-0" style={{ animationDelay: "0.5s" }}>
            <h2 className="font-heading text-5xl md:text-6xl mb-6 leading-tight">
              <span className="text-gradient">ESTADO</span>
              <br />
              <span className="text-foreground">DEL SERVIDOR</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-md">
              Monitorea el estado del servidor en tiempo real. Información actualizada cada 10 segundos para mantenerte siempre conectado.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div
                className="flex items-center gap-3 glass-dark border border-border/30 rounded-lg px-4 py-3 cursor-pointer hover:border-primary hover:shadow-glow transition-colors"
                onClick={handleCopyIp}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    handleCopyIp();
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label="Copiar IP del servidor"
              >
                <Server className="w-6 h-6 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">IP del Servidor</p>
                  <p className="font-mono text-sm text-foreground">{serverIp}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-secondary" />
                <div>
                  <p className="text-sm text-muted-foreground">Capacidad</p>
                  <p className="font-heading text-lg">{serverData.maxPlayers} slots</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <a href="fivem://connect/play.oasisrp.es:30120" className="btn-gta inline-block">
                <span>Conectarse Ahora</span>
              </a>
              <a
                href="https://whitelist.oasisrp.es/"
                className="btn-gta inline-block"
                style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--gta-blue)), hsl(var(--gta-green)))" }}
              >
                <span>Solicita tu whitelist</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServerStatus;
