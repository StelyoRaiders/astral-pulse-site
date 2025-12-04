import { useEffect, useState, useMemo } from "react";
import { Users, Signal, Clock, RefreshCw, Wifi, WifiOff, Activity, Server } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "@/hooks/use-toast";

interface ServerData {
  players: number;
  maxPlayers: number;
  isOnline: boolean;
  uptime: string;
  ping: number;
  queue: number;
  hostname?: string | null;
}

interface ServerStatusResponse {
  online: boolean;
  players: number;
  maxPlayers: number;
  hostname: string | null;
  endpoint: string | null;
  error?: string;
}

const FIVEM_HOST = import.meta.env.VITE_FIVEM_HOST as string | undefined;
const FIVEM_JOIN_CODE = import.meta.env.VITE_FIVEM_JOIN_CODE as string | undefined;

const ServerStatus = () => {
  const serverIp = "play.oasisrp.es:30120";
  const [serverData, setServerData] = useState<ServerData>({
    players: 128,
    maxPlayers: 256,
    isOnline: true,
    uptime: "14d 6h 32m",
    ping: 24,
    queue: 12,
    hostname: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [copied, setCopied] = useState(false);

  const playerPercentage = useMemo(() => {
    if (!serverData.maxPlayers) return 0;
    return Math.min((serverData.players / serverData.maxPlayers) * 100, 100);
  }, [serverData.players, serverData.maxPlayers]);

  // Helpers
  const withTimeout = async <T,>(p: Promise<T>, ms = 5000): Promise<T> => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), ms);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res = await (p as any);
      return res;
    } finally {
      clearTimeout(timeout);
    }
  };

  const normalizeHost = (host: string) => {
    // Si no incluye protocolo, usamos el del sitio para evitar mixed content
    const hasProtocol = host.startsWith("http://") || host.startsWith("https://");
    if (hasProtocol) return host;
    const protocol = window.location.protocol === "https:" ? "https" : "http";
    return `${protocol}://${host}`;
  };

  const fetchDirectHost = async (host: string): Promise<ServerStatusResponse> => {
    const base = normalizeHost(host);
    try {
      const [info, players] = await Promise.all([
        withTimeout(
          fetch(`${base}/info.json`, { cache: "no-store" }).then((r) => r.json()).catch(() => null),
          5000
        ),
        withTimeout(
          fetch(`${base}/players.json`, { cache: "no-store" }).then((r) => r.json()).catch(() => null),
          5000
        ),
      ]);

      if (!info) {
        return { online: false, players: 0, maxPlayers: 0, hostname: null, endpoint: host };
      }

      const maxPlayers =
        Number(
          info?.vars?.svMaxClients ??
            info?.vars?.sv_maxClients ??
            info?.svMaxclients ??
            info?.sv_maxclients ??
            0
        ) || 0;

      const hostname = info?.vars?.sv_projectName ?? info?.hostname ?? info?.server ?? null;
      const playersCount = Array.isArray(players) ? players.length : Number(info?.clients ?? 0);

      return {
        online: true,
        players: playersCount,
        maxPlayers,
        hostname,
        endpoint: host,
      };
    } catch {
      return { online: false, players: 0, maxPlayers: 0, hostname: null, endpoint: host };
    }
  };

  const fetchCfx = async (joinCode: string): Promise<ServerStatusResponse> => {
    try {
      const url = `https://servers-frontend.fivem.net/api/servers/single/${joinCode}`;
      const data = await withTimeout(fetch(url, { cache: "no-store" }).then((r) => r.json()), 6000).catch(
        () => null
      );

      const d = data?.Data;
      if (!d) {
        return { online: false, players: 0, maxPlayers: 0, hostname: null, endpoint: null };
      }

      const maxPlayers = Number(d.sv_maxclients ?? d.maxClients ?? 0) || 0;
      const endpoint = Array.isArray(d.connectEndPoints) ? d.connectEndPoints[0] ?? null : null;

      return {
        online: true,
        players: Number(d.clients ?? 0),
        maxPlayers,
        hostname: d.hostname ?? null,
        endpoint,
      };
    } catch {
      return { online: false, players: 0, maxPlayers: 0, hostname: null, endpoint: null };
    }
  };

  const loadStatus = async (showToast = false) => {
    if (!FIVEM_HOST && !FIVEM_JOIN_CODE) {
      setIsLoading(false);
      setIsRefreshing(false);
      if (showToast) {
        toast({
          title: "Configura el servidor",
          description: "Falta VITE_FIVEM_HOST o VITE_FIVEM_JOIN_CODE",
          variant: "destructive",
        });
      }
      return;
    }

    setIsRefreshing(true);
    if (isLoading) setIsLoading(true);
    const result = FIVEM_HOST ? await fetchDirectHost(FIVEM_HOST) : await fetchCfx(FIVEM_JOIN_CODE as string);

    setServerData((prev) => ({
      ...prev,
      players: result.players,
      maxPlayers: result.maxPlayers || prev.maxPlayers,
      isOnline: result.online,
      hostname: result.hostname ?? prev.hostname,
      // Fallbacks
      ping: result.online ? prev.ping : 0,
      queue: result.online ? prev.queue : 0,
    }));
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
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-gradient-radial from-primary/10 via-transparent to-transparent -translate-y-1/2" />
      </div>

      <div className="container relative z-10 px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Dynamic Cards */}
          <div className="space-y-6">
            {/* Main Status Card - Curved */}
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
                  >
                    <RefreshCw className={`w-5 h-5 ${isRefreshing ? "animate-spin" : ""}`} />
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
                <Signal className="w-8 h-8 text-secondary mb-3" />
                <p className="text-sm text-muted-foreground uppercase tracking-wider">Ping</p>
                <p className="text-2xl font-heading text-secondary">
                  {isLoading ? "..." : `${serverData.ping}ms`}
                </p>
              </div>
              
              <div 
                className="glass-dark p-6 rounded-r-[40px] border-l-4 border-gta-green animate-fade-in-up opacity-0 mt-8"
                style={{ animationDelay: "0.3s" }}
              >
                <Clock className="w-8 h-8 text-gta-green mb-3" />
                <p className="text-sm text-muted-foreground uppercase tracking-wider">Uptime</p>
                <p className="text-2xl font-heading text-gta-green">
                  {isLoading ? "..." : serverData.uptime}
                </p>
              </div>
            </div>

            {/* Queue Card */}
            <div 
              className="glass-dark p-6 rounded-r-[50px] border-l-4 border-gta-blue animate-fade-in-up opacity-0 max-w-[300px]"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="flex items-center gap-4">
                <Activity className="w-8 h-8 text-gta-blue" />
                <div>
                  <p className="text-sm text-muted-foreground uppercase tracking-wider">En Cola</p>
                  <p className="text-2xl font-heading text-gta-blue">
                    {isLoading ? "..." : `${serverData.queue} jugadores`}
                  </p>
                </div>
              </div>
            </div>
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
                  <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
                  </span>
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
