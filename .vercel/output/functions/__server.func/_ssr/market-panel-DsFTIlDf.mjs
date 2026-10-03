import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as formatPct, r as formatCompactUsd, s as formatUsd, t as cn } from "./utils-BvkpD05o.mjs";
import { g as ChartColumn } from "../_libs/lucide-react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as Skeleton } from "./skeleton-mudxf3ZV.mjs";
import { n as getMarketSnapshot } from "./price-chart-D7uyGZWH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/market-panel-DsFTIlDf.js
var import_jsx_runtime = require_jsx_runtime();
function Row({ label, value, change }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex items-center gap-2 font-mono text-sm text-fg tabular-nums",
			children: [value, change === void 0 ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("text-xs", (change ?? 0) >= 0 ? "text-success" : "text-danger"),
				children: formatPct(change)
			})]
		})]
	});
}
function MarketPanel() {
	const market = useQuery({
		queryKey: ["market"],
		queryFn: () => getMarketSnapshot(),
		refetchInterval: 3e4
	});
	const s = market.data;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "glass rounded-xl p-4 md:p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "display text-xl text-fg",
					children: "LIVE MARKET"
				})]
			}),
			market.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-6 w-full" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-6 w-full" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-6 w-full" })
				]
			}) : market.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-muted",
				children: "Market feed unavailable."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 divide-y divide-border",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Price",
						value: formatUsd(s?.priceUsd),
						change: s?.priceChange24h
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Market Cap",
						value: formatCompactUsd(s?.marketCap)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "24h Volume",
						value: formatCompactUsd(s?.volume24h)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Liquidity",
						value: formatCompactUsd(s?.liquidity)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Holders",
						value: "—"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-[11px] text-muted",
				children: "Holder count is shown only when a reliable source is connected. Figures come from DexScreener, not estimates."
			})
		]
	});
}
//#endregion
export { MarketPanel as t };
