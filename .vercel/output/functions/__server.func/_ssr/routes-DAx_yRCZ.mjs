import { i as CAPTAIN, r as APP_TAGLINE, u as YACHT } from "./brand-CHxG2qhN.mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as MapPin, d as Gamepad2, n as Waves, v as Anchor } from "../_libs/lucide-react.mjs";
import { o as Button } from "./router-BvdbfeIy.mjs";
import { t as PriceChart } from "./price-chart-D7uyGZWH.mjs";
import { t as MarketPanel } from "./market-panel-DsFTIlDf.mjs";
import { t as ActivityFeed } from "./activity-feed-Vt2M2uUi.mjs";
import { t as LeaderboardCard } from "./leaderboard-card-CGrmBXkC.mjs";
import { t as StakingCard } from "./staking-card-CWXgQAEy.mjs";
import { t as CaptainCard } from "./captain-card-6bDaHZYz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DAx_yRCZ.js
var import_jsx_runtime = require_jsx_runtime();
function Hero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative overflow-hidden rounded-xl border border-border shadow-glow",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/images/hero-yacht.jpg",
				alt: "Sailing catamaran on turquoise Bahamian water",
				className: "absolute inset-0 size-full object-cover"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-linear-to-r from-bg-deep/92 via-bg/70 to-bg/20" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-linear-to-t from-bg-deep/80 via-transparent to-bg/30" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative grid items-center gap-6 px-5 py-8 md:grid-cols-[1.1fr_0.9fr] md:px-8 md:py-10 lg:px-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4 flex items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/logo/onelove.png",
								alt: "ONE LOVE skull and crossbones",
								width: 96,
								height: 96,
								className: "size-20 rounded-full border border-border md:size-24"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "script text-3xl text-fg md:text-4xl",
								children: "One Love Sailing"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "display text-5xl leading-none text-fg md:text-7xl",
							children: "ONE LOVE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-xs font-medium tracking-[0.28em] text-cyan uppercase",
							children: APP_TAGLINE
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-md text-sm leading-relaxed text-fg/85 md:text-base",
							children: "A Solana community built around One Love, sailing, adventure and a different kind of coin."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex flex-wrap gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									size: "lg",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/staking",
										children: "Stake ONELOVE"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									size: "lg",
									variant: "secondary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/game",
										children: "Play Game"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									size: "lg",
									variant: "outline",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/chart",
										children: "View Chart"
									})
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative hidden min-h-56 md:block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: CAPTAIN.photo,
						alt: "Captain Robbie Olson",
						className: "absolute top-0 right-24 h-[92%] rounded-lg object-cover shadow-glow lg:right-32"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/images/yacht-official.jpg",
						alt: YACHT.name,
						className: "absolute right-0 bottom-0 w-[58%] rounded-lg border border-border object-cover shadow-glow"
					})]
				})]
			})
		]
	});
}
function GameCard() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "glass flex h-full flex-col overflow-hidden rounded-xl",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative min-h-40 flex-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/images/sandbar.jpg",
					alt: "Exumas sandbar lagoon",
					className: "absolute inset-0 size-full object-cover"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-bg-deep/45" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex h-full flex-col justify-between p-4 md:p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-9 items-center justify-center rounded-md bg-bg/70 text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gamepad2, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "display text-2xl text-fg",
							children: "ONELOVE GAME"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-fg/80",
							children: "Stake to play. Skill, not chance."
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-xs rounded-lg border border-border bg-bg/80 p-4 text-center backdrop-blur-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "display text-xl text-fg",
								children: "STAKE TO PLAY"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted",
								children: "On-chain entry is not live. Sail the Exumas Passage skill challenge for the leaderboard."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								className: "mt-3 w-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/game",
									children: "Play Now"
								})
							})
						]
					})]
				})
			]
		})
	});
}
function SailingBand() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "glass overflow-hidden rounded-xl",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid lg:grid-cols-[1.1fr_1.2fr_0.9fr]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative min-h-52",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/images/yacht-anchor.jpg",
						alt: `${YACHT.name} at anchor`,
						className: "absolute inset-0 size-full object-cover"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col justify-center gap-4 p-5 md:p-7",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "display text-3xl text-fg",
							children: "ONE LOVE SAILING"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm font-medium tracking-wide text-cyan",
							children: "Real Adventures. Real People. Real Utility."
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed text-muted",
							children: "One Love isn't just a token. It's a real sailing operation in the Bahamas, connecting a global community through adventure, freedom and the ocean."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-3 sm:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-md bg-bg-deep/50 p-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Anchor, { className: "size-4 text-primary" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-sm font-medium text-fg",
											children: YACHT.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted",
											children: YACHT.spec
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-md bg-bg-deep/50 p-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4 text-primary" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-sm font-medium text-fg",
											children: "Bahamas / Exumas"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted",
											children: "Island hopping and sandbars"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-md bg-bg-deep/50 p-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Waves, { className: "size-4 text-primary" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-sm font-medium text-fg",
											children: "Sailing and diving"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted",
											children: "Snorkel, adventure, charters"
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "secondary",
							className: "w-fit",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/sailing",
								children: "Explore the sailing experience"
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative min-h-40",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/images/exumas-aerial.jpg",
						alt: "Aerial view of Exumas sandbars",
						className: "absolute inset-0 size-full object-cover"
					})
				})
			]
		})
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4 md:gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 xl:grid-cols-[1.35fr_1fr_0.9fr_0.9fr]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceChart, { compact: true }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StakingCard, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameCard, {})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketPanel, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivityFeed, {})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeaderboardCard, {}) })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SailingBand, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CaptainCard, {})
		]
	});
}
//#endregion
export { Home as component };
