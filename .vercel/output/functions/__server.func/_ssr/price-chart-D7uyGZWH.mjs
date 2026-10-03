import { o as __toESM } from "../_runtime.mjs";
import { a as LINKS, l as TOKEN } from "./brand-CHxG2qhN.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as createServerFn } from "./ssr.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { a as formatTimeAgo, i as formatPct, r as formatCompactUsd, s as formatUsd, t as cn } from "./utils-BvkpD05o.mjs";
import { i as object, t as _enum } from "../_libs/zod.mjs";
import { m as CircleAlert, y as Activity } from "../_libs/lucide-react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { o as Button, s as createSsrRpc } from "./router-BvdbfeIy.mjs";
import { t as Skeleton } from "./skeleton-mudxf3ZV.mjs";
import { a as ResponsiveContainer, i as Area, n as YAxis, o as Tooltip, r as XAxis, t as AreaChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/price-chart-D7uyGZWH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var badgeVariants = cva("inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium tracking-wide", {
	variants: { variant: {
		default: "border-transparent bg-primary/15 text-cyan",
		live: "border-transparent bg-live/15 text-live",
		muted: "border-border bg-surface-2 text-muted",
		gold: "border-transparent bg-gold/15 text-gold"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
var getMarketSnapshot = createServerFn({ method: "GET" }).handler(createSsrRpc("0eca9a7863fb26c7b88441acc1f3b96a3a6221669a88a31c0fcbca7ec3fe0ff5"));
var getChartCandles = createServerFn({ method: "GET" }).validator(object({ range: _enum([
	"1H",
	"4H",
	"1D",
	"1W",
	"1M",
	"ALL"
]) })).handler(createSsrRpc("35250486c2a3a8e0c87bc52dd57a101c7d74b52d088dbfe02dfab368d346abc6"));
var getTokenSupply = createServerFn({ method: "GET" }).handler(createSsrRpc("2acebe86a55acc11afde0c3f42f1a9a392b24c11ce153c6e029805f79e1772d8"));
var RANGES = [
	"1H",
	"4H",
	"1D",
	"1W",
	"1M",
	"ALL"
];
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md bg-bg-deep/60 px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[10px] tracking-wide text-muted uppercase",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-mono text-sm text-fg tabular-nums",
			children: value
		})]
	});
}
function PriceChart({ compact = false }) {
	const [range, setRange] = (0, import_react.useState)("1D");
	const market = useQuery({
		queryKey: ["market"],
		queryFn: () => getMarketSnapshot(),
		refetchInterval: 3e4
	});
	const chart = useQuery({
		queryKey: ["chart", range],
		queryFn: () => getChartCandles({ data: { range } })
	});
	const snap = market.data;
	const change = snap?.priceChange24h ?? null;
	const up = (change ?? 0) >= 0;
	const series = (0, import_react.useMemo)(() => (chart.data?.candles ?? []).map((c) => ({
		t: c.time,
		price: c.close,
		vol: c.volume
	})), [chart.data]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "glass flex h-full flex-col rounded-xl p-4 md:p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/logo/onelove.png",
						alt: "",
						className: "size-8 rounded-full"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "display text-2xl text-fg",
						children: [TOKEN.ticker, " LIVE"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						variant: "live",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "mr-1 size-3" }), "Live"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ml-auto hidden gap-2 sm:grid sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Market Cap",
								value: formatCompactUsd(snap?.marketCap)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "24h Volume",
								value: formatCompactUsd(snap?.volume24h)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Liquidity",
								value: formatCompactUsd(snap?.liquidity)
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap items-end gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: market.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-9 w-40" }) : market.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-center gap-2 text-sm text-danger",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "size-4" }), " Market data unavailable"]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-3xl text-fg tabular-nums",
					children: formatUsd(snap?.priceUsd)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: cn("text-sm tabular-nums", up ? "text-success" : "text-danger"),
					children: ["24h ", formatPct(change)]
				})] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-1",
					children: RANGES.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setRange(r),
						className: cn("h-8 min-w-10 rounded-full px-2.5 text-xs font-medium", range === r ? "bg-primary text-primary-fg" : "bg-bg-deep text-muted hover:text-fg"),
						children: r
					}, r))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid grid-cols-3 gap-2 sm:hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Market Cap",
						value: formatCompactUsd(snap?.marketCap)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "24h Volume",
						value: formatCompactUsd(snap?.volume24h)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Liquidity",
						value: formatCompactUsd(snap?.liquidity)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("mt-3 min-h-44 flex-1", compact ? "h-48" : "h-64 md:h-80"),
				children: chart.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-full w-full" }) : chart.isError || chart.data?.empty || series.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-full items-center justify-center rounded-md border border-dashed border-border text-sm text-muted",
					children: "No chart data for this range yet."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
						data: series,
						margin: {
							top: 8,
							right: 8,
							left: 0,
							bottom: 0
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
								id: "oneloveFill",
								x1: "0",
								y1: "0",
								x2: "0",
								y2: "1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "0%",
									stopColor: "#2b8fff",
									stopOpacity: .45
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "100%",
									stopColor: "#2b8fff",
									stopOpacity: 0
								})]
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "t",
								tickFormatter: (v) => new Date(v).toLocaleTimeString([], {
									hour: "2-digit",
									minute: "2-digit"
								}),
								tick: {
									fill: "#8aa3bb",
									fontSize: 11
								},
								axisLine: false,
								tickLine: false,
								minTickGap: 28
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								domain: ["auto", "auto"],
								tickFormatter: (v) => formatUsd(v, 4),
								tick: {
									fill: "#8aa3bb",
									fontSize: 11
								},
								axisLine: false,
								tickLine: false,
								width: 72
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								contentStyle: {
									background: "#0a223b",
									border: "1px solid #1c4a72",
									borderRadius: 12,
									color: "#f3f7fb"
								},
								labelFormatter: (v) => new Date(Number(v)).toLocaleString(),
								formatter: (value) => [formatUsd(Number(value)), "Price"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
								type: "monotone",
								dataKey: "price",
								stroke: "#5ee7ff",
								strokeWidth: 2,
								fill: "url(#oneloveFill)",
								isAnimationActive: false
							})
						]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-[11px] text-muted",
				children: [
					"Last updated ",
					snap?.updatedAt ? formatTimeAgo(snap.updatedAt) : "—",
					" · DexScreener"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: LINKS.buy,
							target: "_blank",
							rel: "noreferrer",
							children: "Buy ONELOVE"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "secondary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: LINKS.market,
							target: "_blank",
							rel: "noreferrer",
							children: "View Market"
						})
					}),
					compact ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "ghost",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/chart",
							children: "Open chart"
						})
					}) : null
				]
			})
		]
	});
}
//#endregion
export { getMarketSnapshot as n, getTokenSupply as r, PriceChart as t };
