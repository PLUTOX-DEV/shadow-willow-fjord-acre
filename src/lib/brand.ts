export const APP_NAME = "ONE LOVE";
export const APP_TAGLINE = "COMMUNITY • FREEDOM • ADVENTURE";
export const APP_DESCRIPTION =
  "ONE LOVE is a Solana-based community connected to One Love Sailing, bringing together sailing, adventure, community and Web3.";

export const TOKEN = {
  symbol: "ONELOVE",
  name: "One Love Sailing",
  ticker: "$ONELOVE",
  network: "Solana",
  mint: "F1r5AqRj8bJyzM4nUZpVBH1JQT8ToR4Rvjj2YwxHmoon",
  decimals: 6,
  pairAddress: "7WHn7pCovBeaUZ9J5PNoN8BwLpQWvVqycdFffLrtoj1c",
} as const;

/** Not yet deployed. Never invent a program id. */
export const STAKING_PROGRAM_ID: string | null = null;
export const GAME_PROGRAM_ID: string | null = null;

export const RPC_ENDPOINT = "https://solana-rpc.publicnode.com";

export const LINKS = {
  buy: `https://jup.ag/swap/SOL-${TOKEN.mint}`,
  market: `https://dexscreener.com/solana/${TOKEN.pairAddress}`,
  explorer: `https://solscan.io/token/${TOKEN.mint}`,
  gecko: `https://www.geckoterminal.com/solana/pools/${TOKEN.pairAddress}`,
  officialSite: "https://www.onelovesailingcoin.com/",
  sailingInstagram: "https://www.instagram.com/onelovesailing/",
} as const;

export const SOCIALS = [
  { id: "x", label: "X", href: "https://x.com/thecaptrobbie" },
  { id: "telegram", label: "Telegram", href: "https://t.me/ONELOVECoinCrew" },
  { id: "discord", label: "Discord", href: "https://discord.com/invite/h9MeFqvta" },
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/onelovesailing/" },
  { id: "facebook", label: "Facebook", href: "https://www.facebook.com/onelovesailing" },
  { id: "tiktok", label: "TikTok", href: "https://www.tiktok.com/@captain.robbie" },
] as const;

export const CAPTAIN = {
  name: "Captain Robbie Olson",
  shortName: "Captain Robbie",
  role: "Founder — One Love",
  photo: "/images/captain-robbie.jpg",
  square: "/images/captain-square.jpg",
  credentials: [
    "500-Ton Master Mariner (STCW II/2)",
    "US Sailing Keelboat Instructor",
    "PADI Divemaster",
    "SOLO Wilderness First Responder",
  ],
  education: [
    "Master of Arts in Journalism",
    "Bachelor of Arts in English",
    "Bachelor of Arts in Fine Arts",
    "Published author",
  ],
  bio: "A lifetime on the water, a passion for adventure, and a belief in building something real. After decades sailing the Bahamas and years running charters in the Exumas, Captain Robbie created $ONELOVE around the existing One Love Sailing family.",
  x: "https://x.com/thecaptrobbie",
} as const;

export const YACHT = {
  name: "S/Y One Love²",
  spec: "82' Nautitech sailing catamaran",
  note: "The largest sailing yacht available for charter in the Bahamas.",
  home: "Exumas, Bahamas",
} as const;

export const NAV = [
  { to: "/", label: "Overview" },
  { to: "/chart", label: "Chart" },
  { to: "/staking", label: "Staking" },
  { to: "/game", label: "Game" },
  { to: "/sailing", label: "Sailing" },
  { to: "/community", label: "Community" },
] as const;
