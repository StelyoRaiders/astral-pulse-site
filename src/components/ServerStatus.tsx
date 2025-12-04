import { useEffect, useState } from "react";
import { Users, Signal, Clock, RefreshCw, Wifi, WifiOff, Activity, Server } from "lucide-react";
import { Button } from "./ui/button";

interface ServerData {
  players: number;
  maxPlayers: number;
  isOnline: boolean;
  uptime: string;
  ping: number;
  queue: number;
}

const ServerStatus = () => {
  const [serverData, setServerData] = useState<ServerData>({
    players: 128,
    maxPlayers: 256,
    isOnline: true,
    uptime: "14d 6h 32m",
    ping: 24,
    queue: 12,
  });
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setServerData((prev) => ({
        ...prev,
        players: Math.floor(Math.random() * 50) + 100,
        ping: Math.floor(Math.random() * 20) + 15,
        queue: Math.floor(Math.random() * 20),
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setServerData((prev) => ({
        ...prev,
        players: Math.floor(Math.random() * 50) + 100,
        ping: Math.floor(Math.random() * 20) + 15,
        queue: Math.floor(Math.random() * 20),
      }));
      setIsRefreshing(false);
    }, 1000);
  };

  const playerPercentage = (serverData.players / serverData.maxPlayers) * 100;

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
                      {serverData.isOnline ? (
                        <Wifi className="w-8 h-8 text-success animate-pulse" />
                      ) : (
                        <WifiOff className="w-8 h-8 text-destructive" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground uppercase tracking-wider">Estado del Servidor</p>
                      <p className={`text-3xl font-heading ${serverData.isOnline ? 'text-success' : 'text-destructive'}`}>
                        {serverData.isOnline ? "ONLINE" : "OFFLINE"}
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
                    <span className="font-heading text-primary">{serverData.players}/{serverData.maxPlayers}</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-primary rounded-full transition-all duration-500 shadow-glow"
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
                <p className="text-2xl font-heading text-secondary">{serverData.ping}ms</p>
              </div>
              
              <div 
                className="glass-dark p-6 rounded-r-[40px] border-l-4 border-gta-green animate-fade-in-up opacity-0 mt-8"
                style={{ animationDelay: "0.3s" }}
              >
                <Clock className="w-8 h-8 text-gta-green mb-3" />
                <p className="text-sm text-muted-foreground uppercase tracking-wider">Uptime</p>
                <p className="text-2xl font-heading text-gta-green">{serverData.uptime}</p>
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
                  <p className="text-2xl font-heading text-gta-blue">{serverData.queue} jugadores</p>
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
              <div className="flex items-center gap-3">
                <Server className="w-6 h-6 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">IP del Servidor</p>
                  <p className="font-mono text-sm">play.novarp.com</p>
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

            <a href="#" className="btn-gta inline-block">
              <span>Conectarse Ahora</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServerStatus;