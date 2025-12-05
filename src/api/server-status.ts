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
    // Usar proxy CORS para evitar problemas de navegador
    const proxyUrl = "https://api.allorigins.win/raw?url=";
    const baseUrl = `http://${host}`;

    const [info, players] = await Promise.all([
      withTimeout(
        fetch(`${proxyUrl}${encodeURIComponent(`${baseUrl}/info.json`)}`, {
          cache: "no-store",
        })
          .then((r) => r.json() as Promise<InfoJson>)
          .catch(() => null),
        6000
      ),
      withTimeout(
        fetch(`${proxyUrl}${encodeURIComponent(`${baseUrl}/players.json`)}`, {
          cache: "no-store",
        })
          .then((r) => r.json() as Promise<PlayersJson[]>)
          .catch(() => null),
        6000
      ),
    ]);

    if (!info) {
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
        info.vars?.svMaxClients ??
          info.vars?.sv_maxClients ??
          info.svMaxclients ??
          info.sv_maxclients ??
          0
      ) || 0;

    const hostname =
      info.vars?.sv_projectName ?? info.hostname ?? info.server ?? null;

    const playersCount = Array.isArray(players)
      ? players.length
      : Number(info.clients ?? 0);

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
