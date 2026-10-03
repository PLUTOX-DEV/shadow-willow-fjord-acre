import { o as __toESM } from "../_runtime.mjs";
import { l as TOKEN } from "./brand-CHxG2qhN.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as DialogOverlay$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { o as formatTokenAmount, t as cn } from "./utils-BvkpD05o.mjs";
import { l as Layers, t as X } from "../_libs/lucide-react.mjs";
import { n as useWallet } from "../_libs/@solana/wallet-adapter-react+[...].mjs";
import { n as useWalletModal } from "../_libs/@solana/wallet-adapter-react-ui+[...].mjs";
import { a as useTokenBalances, o as Button } from "./router-BvdbfeIy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/staking-card-CWXgQAEy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-bg-deep/70 backdrop-blur-sm", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("glass fixed top-1/2 left-1/2 z-50 w-[calc(100%-1.5rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl p-6", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute top-4 right-4 rounded-sm text-muted hover:text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
function DialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-1.5 pr-6", className),
		...props
	});
}
function DialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
		className: cn("display text-2xl tracking-wide text-fg", className),
		...props
	});
}
function DialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
		className: cn("text-sm text-muted", className),
		...props
	});
}
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-11 w-full rounded-md border border-border bg-bg-deep px-3 text-sm text-fg shadow-none transition-colors placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/60 disabled:cursor-not-allowed disabled:opacity-50", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
function StakingCard() {
	const { connected, publicKey } = useWallet();
	const { setVisible } = useWalletModal();
	const balances = useTokenBalances();
	const [action, setAction] = (0, import_react.useState)(null);
	const [amount, setAmount] = (0, import_react.useState)("");
	const walletBal = connected ? balances.data?.onelove ?? null : null;
	const programLive = Boolean(null);
	function open(next) {
		if (!connected) {
			setVisible(true);
			return;
		}
		setAmount("");
		setAction(next);
	}
	const parsed = Number(amount);
	const validAmount = Number.isFinite(parsed) && parsed > 0;
	const exceeds = walletBal !== null && validAmount && parsed > walletBal && action === "stake";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "glass flex h-full flex-col rounded-xl p-4 md:p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-9 items-center justify-center rounded-md bg-primary/15 text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "size-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "display text-2xl text-fg",
					children: "ONELOVE STAKING"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Stake $ONELOVE and earn rewards over time."
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid grid-cols-3 gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-md bg-bg-deep/60 p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] tracking-wide text-muted uppercase",
							children: "Your ONELOVE"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-mono text-lg text-fg tabular-nums",
							children: connected ? formatTokenAmount(walletBal) : "—"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-md bg-bg-deep/60 p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] tracking-wide text-muted uppercase",
							children: "Currently Staked"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-mono text-lg text-fg tabular-nums",
							children: "—"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-md bg-bg-deep/60 p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] tracking-wide text-muted uppercase",
							children: "APY"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-mono text-lg text-fg tabular-nums",
							children: "—"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 rounded-md bg-bg-deep/60 p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] tracking-wide text-muted uppercase",
					children: "Earned Rewards"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-mono text-lg text-fg tabular-nums",
					children: "—"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs leading-relaxed text-muted",
				children: "APY is set by the staking program once it is deployed. It is not a guaranteed return. Staked balances and claims will read from chain — they are not simulated here."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid grid-cols-3 gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => open("stake"),
						children: "Stake"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						onClick: () => open("unstake"),
						children: "Unstake"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: () => open("claim"),
						children: "Claim"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: action !== null,
				onOpenChange: (o) => !o && setAction(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, { children: [
						action === "stake" ? "Stake" : action === "unstake" ? "Unstake" : "Claim",
						" ",
						TOKEN.symbol
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: programLive ? "Review the amount, then approve the transaction in your wallet." : "The staking program is not connected yet. No transaction will be sent." })] }),
					action !== "claim" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted",
								children: "Amount"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								className: "mt-1",
								inputMode: "decimal",
								placeholder: "0.00",
								value: amount,
								onChange: (e) => setAmount(e.target.value)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "mt-1 block text-xs text-muted",
								children: [
									"Wallet: ",
									formatTokenAmount(walletBal),
									" ",
									TOKEN.symbol,
									publicKey ? ` · ${publicKey.toBase58().slice(0, 4)}…` : null
								]
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Claimable rewards: —"
					}),
					exceeds ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-danger",
						children: "Amount exceeds wallet balance."
					}) : null,
					!programLive ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-md border border-border bg-bg-deep p-3 text-sm text-muted",
						children: "Waiting for a reviewed staking program address. The site will never show a fake confirmation or a made-up APY."
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						disabled: !programLive || action !== "claim" && (!validAmount || exceeds),
						className: "w-full",
						children: programLive ? "Approve in wallet" : "Unavailable"
					})
				] })
			})
		]
	});
}
//#endregion
export { StakingCard as t };
