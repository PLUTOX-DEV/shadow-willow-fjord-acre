import { l as TOKEN } from "./brand-CHxG2qhN.mjs";
import { t as createServerFn } from "./ssr.mjs";
import { i as object, t as _enum } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/queries-DPDv01gp.js
var RANGE_CONFIG = {
	"1H": {
		timeframe: "minute",
		aggregate: 1,
		limit: 60
	},
	"4H": {
		timeframe: "minute",
		aggregate: 5,
		limit: 48
	},
	"1D": {
		timeframe: "minute",
		aggregate: 15,
		limit: 96
	},
	"1W": {
		timeframe: "hour",
		aggregate: 1,
		limit: 168
	},
	"1M": {
		timeframe: "hour",
		aggregate: 4,
		limit: 180
	},
	ALL: {
		timeframe: "day",
		aggregate: 1,
		limit: 180
	}
};
var getMarketSnapshot_createServerFn_handler = createServerRpc({
	id: "0eca9a7863fb26c7b88441acc1f3b96a3a6221669a88a31c0fcbca7ec3fe0ff5",
	name: "getMarketSnapshot",
	filename: "src/lib/market/queries.ts"
}, (opts) => getMarketSnapshot.__executeServer(opts));
var getMarketSnapshot = createServerFn({ method: "GET" }).handler(getMarketSnapshot_createServerFn_handler, async () => {
	const empty = {
		priceUsd: null,
		priceChange24h: null,
		marketCap: null,
		volume24h: null,
		liquidity: null,
		fdv: null,
		pairUrl: null,
		pairAddress: TOKEN.pairAddress,
		dexId: null,
		txns24h: null,
		updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
		source: "dexscreener"
	};
	try {
		const res = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${TOKEN.mint}`, { headers: { accept: "application/json" } });
		if (!res.ok) return empty;
		const pairs = (await res.json()).pairs ?? [];
		if (pairs.length === 0) return empty;
		const pair = pairs.find((p) => p.pairAddress === TOKEN.pairAddress) ?? [...pairs].sort((a, b) => (b.liquidity?.usd ?? 0) - (a.liquidity?.usd ?? 0))[0];
		const buys = pair.txns?.h24?.buys ?? 0;
		const sells = pair.txns?.h24?.sells ?? 0;
		return {
			priceUsd: pair.priceUsd ? Number(pair.priceUsd) : null,
			priceChange24h: pair.priceChange?.h24 ?? null,
			marketCap: pair.marketCap ?? null,
			volume24h: pair.volume?.h24 ?? null,
			liquidity: pair.liquidity?.usd ?? null,
			fdv: pair.fdv ?? null,
			pairUrl: pair.url ?? null,
			pairAddress: pair.pairAddress ?? TOKEN.pairAddress,
			dexId: pair.dexId ?? null,
			txns24h: buys + sells,
			updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
			source: "dexscreener"
		};
	} catch {
		return empty;
	}
});
var getChartCandles_createServerFn_handler = createServerRpc({
	id: "35250486c2a3a8e0c87bc52dd57a101c7d74b52d088dbfe02dfab368d346abc6",
	name: "getChartCandles",
	filename: "src/lib/market/queries.ts"
}, (opts) => getChartCandles.__executeServer(opts));
var getChartCandles = createServerFn({ method: "GET" }).validator(object({ range: _enum([
	"1H",
	"4H",
	"1D",
	"1W",
	"1M",
	"ALL"
]) })).handler(getChartCandles_createServerFn_handler, async ({ data }) => {
	const cfg = RANGE_CONFIG[data.range];
	const url = `https://api.geckoterminal.com/api/v2/networks/solana/pools/${TOKEN.pairAddress}/ohlcv/${cfg.timeframe}?aggregate=${cfg.aggregate}&limit=${cfg.limit}&currency=usd`;
	try {
		const res = await fetch(url, { headers: {
			accept: "application/json",
			"User-Agent": "ONELOVE/1.0"
		} });
		if (!res.ok) return {
			candles: [],
			updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
			empty: true
		};
		const candles = ((await res.json()).data?.attributes?.ohlcv_list ?? []).map((row) => ({
			time: Number(row[0]) * 1e3,
			open: Number(row[1]),
			high: Number(row[2]),
			low: Number(row[3]),
			close: Number(row[4]),
			volume: Number(row[5] ?? 0)
		})).filter((c) => Number.isFinite(c.close)).sort((a, b) => a.time - b.time);
		return {
			candles,
			updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
			empty: candles.length === 0
		};
	} catch {
		return {
			candles: [],
			updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
			empty: true
		};
	}
});
var getTokenSupply_createServerFn_handler = createServerRpc({
	id: "2acebe86a55acc11afde0c3f42f1a9a392b24c11ce153c6e029805f79e1772d8",
	name: "getTokenSupply",
	filename: "src/lib/market/queries.ts"
}, (opts) => getTokenSupply.__executeServer(opts));
var getTokenSupply = createServerFn({ method: "GET" }).handler(getTokenSupply_createServerFn_handler, async () => {
	try {
		const res = await fetch("https://solana-rpc.publicnode.com", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				jsonrpc: "2.0",
				id: 1,
				method: "getTokenSupply",
				params: [TOKEN.mint]
			})
		});
		if (!res.ok) return {
			amount: null,
			decimals: TOKEN.decimals
		};
		const json = await res.json();
		return {
			amount: json.result?.value?.uiAmount ?? null,
			decimals: json.result?.value?.decimals ?? TOKEN.decimals
		};
	} catch {
		return {
			amount: null,
			decimals: TOKEN.decimals
		};
	}
});
//#endregion
export { getChartCandles_createServerFn_handler, getMarketSnapshot_createServerFn_handler, getTokenSupply_createServerFn_handler };
