// API para obtener estado del servidor FiveM
// Usa la API oficial de CFX.re

interface CfxServerData {
  Data?: {
    clients?: number;
    sv_maxclients?: number;
    maxClients?: number;
    hostname?: string;
    vars?: {
      sv_projectName?: string;
    };
  };
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
  joinCode: string
): Promise<ServerStatusResponse> {
  try {
    const url = `https://servers-frontend.fivem.net/api/servers/single/${joinCode}`;

    const data = await withTimeout(
      fetch(url, { cache: "no-store" })
        .then((r) => r.json() as Promise<CfxServerData>)
        .catch(() => null),
      6000
    );

    if (!data?.Data) {
      return {
        online: false,
        players: 0,
        maxPlayers: 0,
        hostname: null,
        error: "No se pudo conectar al servidor",
      };
    }

    const serverData = data.Data;
    const maxPlayers = Number(
      serverData.sv_maxclients ?? serverData.maxClients ?? 256
    );
    const hostname =
      serverData.vars?.sv_projectName ?? serverData.hostname ?? null;
    const players = Number(serverData.clients ?? 0);

    return {
      online: true,
      players,
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
