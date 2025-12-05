// API para obtener estado del servidor FiveM
// Usa un proxy CORS para evitar problemas de seguridad del navegador

interface InfoJson {
  server?: string;
  hostname?: string;
  clients?: number;
  vars?: {
    svMaxClients?: string | number;
    sv_maxClients?: string | number;
    sv_projectName?: string;
  };
  sv_maxclients?: string | number;
  svMaxclients?: string | number;
}

interface PlayersJson {
  // Array de jugadores, usamos solo length
}

interface ServerStatusResponse {
  online: boolean;
  players: number;
  maxPlayers: number;
  hostname: string | null;
  error?: string;
}

async function withTimeout<T>(p: Promise<T>, ms = 5000): Promise<T> {
  return Promise.race<T>([
    p,
    new Promise<T>((_, rej) =>
      setTimeout(() => rej(new Error("timeout")), ms)
    ),
  ]);
}

export async function fetchServerStatus(
  host: string
): Promise<ServerStatusResponse> {
  try {
    // Intentar múltiples proxies CORS
    const proxies = [
      "https://corsproxy.io/?",
      "https://cors-anywhere.herokuapp.com/",
    ];
    
    const baseUrl = `http://${host}`;
    let infoData: InfoJson | null = null;
    let playersData: PlayersJson[] | null = null;

    // Intentar con el primer proxy
    for (const proxyUrl of proxies) {
      try {
        const [info, players] = await Promise.all([
          withTimeout(
            fetch(`${proxyUrl}${baseUrl}/info.json`, {
              cache: "no-store",
            })
              .then((r) => r.json() as Promise<InfoJson>)
              .catch(() => null),
            6000
          ),
          withTimeout(
            fetch(`${proxyUrl}${baseUrl}/players.json`, {
              cache: "no-store",
            })
              .then((r) => r.json() as Promise<PlayersJson[]>)
              .catch(() => null),
            6000
          ),
        ]);

        if (info) {
          infoData = info;
          playersData = players;
          break; // Si funciona, salir del loop
        }
      } catch (e) {
        console.warn(`Proxy ${proxyUrl} falló, intentando siguiente...`);
        continue;
      }
    }

    if (!infoData) {
      return {
        online: false,
        players: 0,
        maxPlayers: 0,
        hostname: null,
        error: "No se pudo conectar al servidor",
      };
    }

    const maxPlayers =
      Number(
        infoData.vars?.svMaxClients ??
          infoData.vars?.sv_maxClients ??
          infoData.svMaxclients ??
          infoData.sv_maxclients ??
          0
      ) || 0;

    const hostname =
      infoData.vars?.sv_projectName ??
      infoData.hostname ??
      infoData.server ??
      null;

    const playersCount = Array.isArray(playersData)
      ? playersData.length
      : Number(infoData.clients ?? 0);

    return {
      online: true,
      players: playersCount,
      maxPlayers,
      hostname,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    console.error("Server status error:", message);
    return {
      online: false,
      players: 0,
      maxPlayers: 0,
      hostname: null,
      error: message,
    };
  }
}
