import { l as TOKEN } from "./brand-CHxG2qhN.mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { l as shortenAddress, o as formatTokenAmount } from "./utils-BvkpD05o.mjs";
import { n as useWallet } from "../_libs/@solana/wallet-adapter-react+[...].mjs";
import { a as useTokenBalances } from "./router-BvdbfeIy.mjs";
import { t as StakingCard } from "./staking-card-CWXgQAEy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/staking-C3vnODVk.js
var import_jsx_runtime = require_jsx_runtime();
function StakingPage() {
	const { publicKey, connected } = useWallet();
	const balances = useTokenBalances();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-3xl flex-col gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "display text-5xl text-fg",
				children: "ONE LOVE STAKING"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted",
				children: "Stake $ONELOVE and earn rewards over time."
			})] }),
			connected && publicKey ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass rounded-lg p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-muted uppercase",
							children: "Wallet"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-mono text-sm",
							children: shortenAddress(publicKey.toBase58())
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass rounded-lg p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[11px] text-muted uppercase",
							children: [TOKEN.symbol, " Balance"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-mono text-sm tabular-nums",
							children: balances.isError ? "Unavailable" : formatTokenAmount(balances.data?.onelove)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass rounded-lg p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-muted uppercase",
							children: "SOL Balance"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-mono text-sm tabular-nums",
							children: balances.isError ? "Unavailable" : `${formatTokenAmount(balances.data?.sol, 4)} SOL`
						})]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Connect a Solana wallet to read your live balances."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StakingCard, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-lg border border-border bg-surface p-4 text-sm text-muted",
				children: "Staking and game funds are designed as separate pools. Until a reviewed staking program is configured, Stake / Unstake / Claim will not submit a transaction and will never show a fake confirmation."
			})
		]
	});
}
//#endregion
export { StakingPage as component };
