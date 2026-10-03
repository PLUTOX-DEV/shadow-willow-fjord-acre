import { o as __toESM } from "../_runtime.mjs";
import { a as LINKS, l as TOKEN } from "./brand-CHxG2qhN.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as formatCompact, o as formatTokenAmount, r as formatCompactUsd } from "./utils-BvkpD05o.mjs";
import { f as ExternalLink, p as Copy } from "../_libs/lucide-react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { o as Button } from "./router-BvdbfeIy.mjs";
import { n as getMarketSnapshot, r as getTokenSupply, t as PriceChart } from "./price-chart-D7uyGZWH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/token-Bq26FHEG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TokenInfo() {
	const [copied, setCopied] = (0, import_react.useState)(false);
	const market = useQuery({
		queryKey: ["market"],
		queryFn: () => getMarketSnapshot()
	});
	const supply = useQuery({
		queryKey: ["supply"],
		queryFn: () => getTokenSupply()
	});
	async function copyMint() {
		try {
			await navigator.clipboard.writeText(TOKEN.mint);
			setCopied(true);
			toast.success("Contract address copied");
			setTimeout(() => setCopied(false), 1500);
		} catch {
			toast.error("Could not copy");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "glass rounded-xl p-5 md:p-7",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-[0.25em] text-cyan uppercase",
				children: "Solana"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "display mt-1 text-4xl text-fg",
				children: "ONE LOVE TOKEN"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-2xl text-sm text-muted",
				children: "$ONELOVE is the community token of One Love Sailing. Always verify the mint before swapping. This page only shows figures returned by live market and chain sources."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-6 grid gap-3 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-md bg-bg-deep/60 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-[11px] tracking-wide text-muted uppercase",
							children: "Network"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1 text-fg",
							children: TOKEN.network
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-md bg-bg-deep/60 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-[11px] tracking-wide text-muted uppercase",
							children: "Token"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
							className: "mt-1 text-fg",
							children: [
								TOKEN.ticker,
								" · ",
								TOKEN.name
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-md bg-bg-deep/60 p-4 sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-[11px] tracking-wide text-muted uppercase",
							children: "Contract address"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
							className: "mt-1 flex flex-wrap items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
								className: "font-mono text-xs break-all text-fg md:text-sm",
								children: TOKEN.mint
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "secondary",
								onClick: () => void copyMint(),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" }), copied ? "Copied" : "Copy"]
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-md bg-bg-deep/60 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] tracking-wide text-muted uppercase",
							children: "Current supply"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-mono text-lg tabular-nums",
							children: formatCompact(supply.data?.amount ?? null)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-md bg-bg-deep/60 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] tracking-wide text-muted uppercase",
							children: "Market cap"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-mono text-lg tabular-nums",
							children: formatCompactUsd(market.data?.marketCap)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-md bg-bg-deep/60 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] tracking-wide text-muted uppercase",
							children: "Liquidity"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-mono text-lg tabular-nums",
							children: formatCompactUsd(market.data?.liquidity)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-md bg-bg-deep/60 p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] tracking-wide text-muted uppercase",
								children: "Burned"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-mono text-lg tabular-nums",
								children: "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[11px] text-muted",
								children: "Shown only when independently verified on-chain."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-md bg-bg-deep/60 p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] tracking-wide text-muted uppercase",
								children: "Locked"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-mono text-lg tabular-nums",
								children: "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[11px] text-muted",
								children: "Shown only when independently verified on-chain."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-md bg-bg-deep/60 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] tracking-wide text-muted uppercase",
							children: "Decimals"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-mono text-lg tabular-nums",
							children: formatTokenAmount(TOKEN.decimals, 0)
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: LINKS.explorer,
							target: "_blank",
							rel: "noreferrer",
							children: ["View on Solana explorer ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5" })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "secondary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: LINKS.market,
							target: "_blank",
							rel: "noreferrer",
							children: "View market"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: LINKS.buy,
							target: "_blank",
							rel: "noreferrer",
							children: "Buy ONELOVE"
						})
					})
				]
			})
		]
	});
}
function TokenPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TokenInfo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceChart, { compact: true })]
	});
}
//#endregion
export { TokenPage as component };
